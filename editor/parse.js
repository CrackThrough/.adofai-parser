const readline = require("readline");
const fs = require("fs");

module.exports = {
  /**
   * Imports a .adofai map file
   * @param {path} file
   * @param {callback} callback
   */
  import: function (file, callback, options) {
    if (options == null) options = { verboseLevel: 0 };

    // variables
    var timeStarted = new Date().getTime();
    var timeEnded = NaN;
    var mapData = "";
    var runEvent = true;
    var lineCount = 0;
    var _chars = ['"', "{", "}", "[", "]", ",", ":"];
    var _isQuoteOpen = false;
    var _getValue = false;

    // check file
    if (!fs.existsSync(file)) {
      runEvent = false;
      timeEnded = new Date().getTime();
      var $callback = {
        time: timeEnded - timeStarted,
        map: null,
      };
      return callback($callback, Error(`File '${file}' does not exist`));
    }

    // read file
    var rl = readline.createInterface({
      input: fs.createReadStream(file),
      terminal: false,
    });

    rl.on("line", (line) => {
      lineCount++;
      if (options.verboseLevel > 0) {
        console.log(`\nLine ${lineCount} |`, line);
      }

      var charOrder = "";
      var charList = [];
      var lastIndex = -1;

      while (true) {
        var indexList = [];
        if (_isQuoteOpen) {
          // char " ------------------------------------------------------------------------------------------------------
          var addChar = '"';
          charOrder += line.substr(
            lastIndex,
            line.indexOf('"', lastIndex) - lastIndex + 1
          );
          if (options.verboseLevel > 1) {
            console.log(
              `[33mEscape Quote, got ${line.substr(
                lastIndex,
                line.indexOf('"', lastIndex) - lastIndex + 1
              )}[0m`
            );
            console.log(`Changing lastIndex:\n{ before: ${lastIndex}`);
          }
          lastIndex = line.indexOf('"', lastIndex) + 1;
          if (options.verboseLevel > 1) {
            console.log(`  after: ${lastIndex} }`);
          }
        } else if (_getValue) {
          // char : ------------------------------------------------------------------------------------------------------
          var addChar = ",";
          if (
            line
              .substr(lastIndex, line.length)
              .replace(/[ ]/g, "")
              .startsWith("[")
          ) {
            // ARRAY??
            var addstr = line.substr(
              lastIndex,
              line.indexOf("]", lastIndex) - lastIndex
            );
            if (!addstr.endsWith("]")) addstr += "]";
            charOrder += addstr;
            if (options.verboseLevel > 1) {
              console.log(`[33mEscape getValue, got ${addstr}[0m`);
              console.log(`Changing lastIndex:\n{ before: ${lastIndex}`);
            }
            lastIndex = line.indexOf("]", lastIndex) + 1;
            if (options.verboseLevel > 1) {
              console.log(`  after: ${lastIndex} }`);
            }
          } else {
            if (line.indexOf(",", lastIndex) < 0) {
              // NON ARRAY??
              charOrder += line.substr(lastIndex, line.length) + ",";
              if (options.verboseLevel > 1) {
                console.log(
                  `[33mEscape getValue, got ${
                    line.substr(lastIndex, line.length) + ","
                  }[0m`
                );
                console.log(`Changing lastIndex:\n{ before: ${lastIndex}`);
              }
              lastIndex = Infinity;
              if (options.verboseLevel > 1) {
                console.log(`  after: ${lastIndex} }`);
              }
            } else {
              charOrder += line.substr(
                lastIndex,
                line.indexOf(",", lastIndex) - lastIndex + 1
              );
              if (options.verboseLevel > 1) {
                console.log(
                  `[33mEscape getValue, got ${line.substr(
                    lastIndex,
                    line.indexOf(",", lastIndex) - lastIndex + 1
                  )}[0m`
                );
                console.log(`Changing lastIndex:\n{ before: ${lastIndex}`);
              }
              lastIndex = line.indexOf(",", lastIndex) + 1;
              if (options.verboseLevel > 1) {
                console.log(`  after: ${lastIndex} }`);
              }
            }
          }
        } else {
          // else anything ------------------------------------------------------------------------------------------------------
          _chars.forEach((char) => {
            if (line.includes(char)) {
              if (line.indexOf(char, lastIndex) >= 0) {
                charList.push({
                  index: line.indexOf(char, lastIndex),
                  char: char,
                });
                indexList.push(line.indexOf(char, lastIndex));
              }
            }
          });

          if (indexList.length > 0) {
            var addChar = charList.find(
              (charObj) => charObj.index == Math.min(...indexList)
            ).char;

            charOrder += addChar == null ? "" : addChar;
            if (options.verboseLevel > 1) {
              console.log(
                `[33mEscape General Char ${addChar} at ${
                  line.indexOf(addChar, lastIndex) - lastIndex
                }[0m`
              );
            }
          }

          if (options.verboseLevel > 1) {
            console.log(`Changing lastIndex:\n{ before: ${lastIndex}`);
          }
          lastIndex = Math.min(...indexList) + 1;
          if (options.verboseLevel > 1) {
            console.log(`  after: ${lastIndex} }`);
          }
        }
        if (addChar == '"') _isQuoteOpen = !_isQuoteOpen;
        if (addChar == ":") _getValue = true;
        if (addChar == ",") _getValue = false;

        if (lastIndex <= 0 || lastIndex >= line.length || !isFinite(lastIndex))
          break;
      }

      mapData += charOrder;
    });

    rl.on("close", () => {
      if (runEvent) {
        mapData = mapData
          .replace(/(,})/g, "}")
          .replace(/({,)/g, "{")
          .replace(/(,])/g, "]")
          .replace(/(]{)/g, "[{");
        try {
          mapData = JSON.parse(mapData);
          timeEnded = new Date().getTime();
          var $callback = {
            time: timeEnded - timeStarted,
            map: mapData,
          };
          return callback($callback);
        } catch (err) {
          timeEnded = new Date().getTime();
          var $callback = {
            time: timeEnded - timeStarted,
            map: null,
          };
          return callback($callback, Error(err));
        }
      }
    });
  },

  /* ================================================================================================================== */

  export: function (file, mapData, callback, options) {
    if (options == null) options = { verboseLevel: 0 };
    mapData = JSON.stringify(mapData);

    // variables
    var timeStarted = new Date().getTime();
    var indentStr = "	";
    var settingsIndex = mapData.indexOf("settings");
    var actionsIndex = mapData.indexOf("actions");

    if (actionsIndex > 0) {
      // fetch file
      mapData = mapData.replace(/(:)/g, ": ").replace(/[,]/g, ", ");
      while (true) {
        actionsIndex = mapData.indexOf("actions");
        if (mapData.indexOf('{"') < settingsIndex) {
          mapData = mapData.replace('{"', `{\n${indentStr}"`); // { and {\n overlaps.
        } else if (mapData.indexOf(', "') < actionsIndex) {
          mapData = mapData.replace(
            ', "',
            `, \n${indentStr.repeat(
              mapData.indexOf(', "') > settingsIndex ? 2 : 1
            )}"`
          );
        } else {
          mapData = mapData
            .replace(`}, \n		"actions": [{`, `\n	}, \n	"actions":\n	[\n		{ `)
            .replace(`	"settings": {`, `"settings":\n	{\n		`)
            .replace(/(}, {)/g, " }, \n		{ ")
            .replace("}]}", " }\n	]\n}");
          break;
        }
      }

      // end
      fs.writeFileSync(file, mapData);
      var timeEnded = new Date().getTime();
      var $callback = {
        time: timeEnded - timeStarted,
        map: mapData,
      };
      callback($callback);
    } else {
      // end
      fs.writeFileSync(file, mapData);
      var timeEnded = new Date().getTime();
      var $callback = {
        time: timeEnded - timeStarted,
        map: mapData,
      };
      callback($callback);
    }
  },
};

/**
 *
 * {
 *    "start": "end"
 * }
 *
 *
 *
 */
