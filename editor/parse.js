const lineReader = require("line-reader");
const keys = require("./allkeys");
const fs = require("fs");

module.exports = {
  import: function (file, ignoreError) {
    return new Promise((resolve, reject) => {
      ignoreError = ignoreError != null;
      var map = require("./skeletons").map;

      var progress = {
        lineCount: 0,
        foundActions: false,
        foundSettings: false,
        inActions: false,
        fullfile: "",
        wasColorHistory: [],
      };

      lineReader.eachLine(file, function (line, last) {
        progress.lineCount++;
        var rawline = line;
        var valueAsString = false;

        if (!line.includes("[") && !progress.foundActions) {
          line = line.replace(/[﻿ 	,"]/g, "");
        } else if (!progress.foundActions && progress.foundSettings) {
          line = line.replace(/[﻿ 	"]/g, "").substr(0, line.length - 8);
        }

        if (line.includes("settings:")) progress.foundSettings = true;
        if (line.includes("actions:")) progress.foundActions = true;
        if (!progress.foundActions) {
          if (!line.includes("pathData") && progress.foundSettings) {
            if (
              line.split(":")[1] != undefined &&
              !line.includes("settings:")
            ) {
              setValueRaw = eval(`"${line.split(":")[0]}"`);
              isTypeColor = keys._hexKeys.includes(setValueRaw);
              if (isTypeColor) {
                progress.wasColorHistory.push(true);
              } else {
                progress.wasColorHistory.push(false);
              }

              if (line.split(":")[1] == "") {
                var value = "### EMPTY STRING ###";
              } else {
                var value = line.split(":")[1];
              }
              if (
                line.split(":")[1].indexOf("[") <
                line.split(":")[1].indexOf("]")
              ) {
                value = line.split(":")[1];
              } else if (value == "Enabled" || value == "Disabled") {
                value = value == "Enabled";
              } else if (value.toString().startsWith("[")) {
                value = eval(value);
              } else if (!isTypeColor && !isNaN(Number(value))) {
                value = Number(value);
              } else {
                valueAsString = true;
              }
              if (value == "false" || value == "true") {
                value = value == "true";
                valueAsString = false;
              }
              setValue = eval(`"map.settings.${line.split(":")[0]}"`);
              setValueRaw = eval(`"${line.split(":")[0]}"`);
              isTypeColor = keys._hexKeys.includes(setValueRaw);
              if (isTypeColor) {
                progress.wasColorHistory.push(true);
              } else {
                progress.wasColorHistory.push(false);
              }

              if (value == "### EMPTY STRING ###") {
                eval(`${setValue} = ""`);
              } else if (isTypeColor) {
                if (value == undefined) value = "000000";
                value = value + "";
                value = value.substr(0, 6);
                while (value.length != 6) {
                  value = value.repeat(value.length + 1);
                }
                eval(`${setValue} = "${value}"`);
              } else if (valueAsString) {
                if (!keys._numberKeys.includes(setValueRaw)) {
                  if (value == 0) {
                    eval(`${setValue} = ""`);
                  } else {
                    eval(`${setValue} = "${value}"`);
                  }
                } else {
                  eval(`${setValue} = ${value}`);
                }
              } else {
                if (typeof value == "boolean") {
                  eval(`${setValue} = ${value == "true" || value == true}`);
                } else {
                  eval(`${setValue} = ${value}`);
                }
              }
            }
          } else {
            if (line.split(":")[1] != null) {
              eval(`map.${line.split(":")[0]} = "${line.split(":")[1]}"`);
            }
          }
        } else if (!line.includes("actions:")) {
          line = line.replace(/[﻿ 	"]/g, "");
          if (line == "[") {
            progress.inActions = true;
          } else if (line == "]") {
            progress.inActions = false;
          } else if (progress.inActions) {
            var event = {};
            var eventLine = line;
            if (eventLine.includes("[")) {
              var eventLineSplit = [];
              while (eventLine.includes("[")) {
                var open = eventLine.indexOf("[");
                var close = eventLine.indexOf("]");
                var split = eventLine.indexOf(",");
                if (split < open) {
                  eventLineSplit.push(eventLine.substr(0, split));
                  eventLine = eventLine.substr(split + 1, eventLine.length);
                } else if (split > close) {
                  eventLineSplit.push(eventLine.substr(0, split));
                  eventLine = eventLine.substr(split + 1, eventLine.length);
                } else if (open < split && split < close) {
                  eventLine = eventLine.replace(
                    ",",
                    "###thisisatemporarytextjusttoreplaceacommaitsgonnaberolledbacktocommajustsoon###"
                  );
                  eventLine = eventLine.substr(0, eventLine.length);
                } else if (
                  (open > -1 && close == -1) ||
                  (open == -1 && close > -1)
                ) {
                  reject(
                    new Error(
                      `File has misplaced bracket at line ${progress.lineCount}`
                    )
                  );
                }
              }
              var RestEventLine = eventLine.split(",");
              RestEventLine.forEach((ev) => {
                eventLineSplit.push(ev);
              });
              var anotherEventLineSplit = [];
              eventLineSplit.forEach((thisline) => {
                thisline = thisline.replace(
                  /(\#\#\#thisisatemporarytextjusttoreplaceacommaitsgonnaberolledbacktocommajustsoon\#\#\#)/g,
                  ","
                );
                anotherEventLineSplit.push(thisline);
              });
              eventLineSplit = anotherEventLineSplit;
            } else {
              var eventLineSplit = eventLine.split(",");
            }
            eventLineSplit.forEach((thisline) => {
              thisline = thisline.replace(/[{}]/g, "").split(":");

              setValue = eval(`"event.${thisline[0]}"`);
              setValueRaw = eval(`"${thisline[0]}"`);
              isTypeColor = keys._hexKeys.includes(setValueRaw);
              if (isTypeColor) {
                progress.wasColorHistory.push(true);
              } else {
                progress.wasColorHistory.push(false);
              }

              if (thisline.length == 2) {
                thislineValue = thisline[1];
                if (thislineValue == "### EMPTY STRING ###") {
                  eval(`${setValue} = ""`);
                } else if (isTypeColor) {
                  if (thislineValue == undefined) thislineValue = "000000";
                  thislineValue = thislineValue + "";
                  thislineValue = thislineValue.substr(0, 6);
                  while (thislineValue.length != 6) {
                    thislineValue = thislineValue.repeat(
                      thislineValue.length + 1
                    );
                  }
                  eval(`${setValue} = "${thislineValue}"`);
                } else if (keys._numberKeys.includes(setValueRaw)) {
                  eval(`${setValue} = ${thislineValue}`);
                } else if (
                  thislineValue.includes("Enabled") ||
                  thisline.includes("Disabled")
                ) {
                  eval(`${setValue} = ${thislineValue.includes("Enabled")}`);
                } else if (
                  thislineValue.includes("[") &&
                  thislineValue.includes("]")
                ) {
                  var arr = thislineValue.replace(/[\[\]]/g, "").split(",");
                  if (isNaN(Number(arr[0])) && isNaN(Number(arr[1]))) {
                    eval(`${setValue} = [ "${arr[0]}", "${arr[1]}" ]`);
                  } else if (isNaN(Number(arr[0])) && !isNaN(Number(arr[1]))) {
                    eval(`${setValue} = [ "${arr[0]}", ${arr[1]} ]`);
                  } else if (!isNaN(Number(arr[0])) && isNaN(Number(arr[1]))) {
                    eval(`${setValue} = [ ${arr[0]}, "${arr[1]}" ]`);
                  } else {
                    eval(`${setValue} = ${thislineValue}`);
                  }
                } else {
                  if (thislineValue == 0) {
                    eval(`${setValue} = ""`);
                  } else {
                    eval(`${setValue} = "${thislineValue}"`);
                  }
                }
              }
            });
            map.actions.push(event);
          }
        }

        progress.fullfile += rawline + "\n";
        if (last) {
          if (ignoreError) {
            return resolve(map);
          } else {
            keys._map.forEach((key) => {
              if (!progress.fullfile.includes(key))
                reject(new Error(`File does not have a key "${key}"`));
            });
          }
          return resolve(map);
        }
      });
    });
  },
  export: function (location, parsedData) {
    return new Promise((resolve, reject) => {
      try {
        var data = JSON.stringify(parsedData);
        data = data
          .replace(/(},{)/g, "},\n		{")
          .replace('{"pathData":"', '{\n	"pathData":"');

        var execute = true;

        while (execute) {
          var actionsIndex = data.indexOf('"actions":[') + '"actions":['.length;
          var settingsIndex =
            data.indexOf('"settings":{') + '"settings":{'.length;
          if (data.indexOf(',"') < settingsIndex) {
            data = data.replace(/(,")/, ',\n	"');
          } else if (data.indexOf(',"') < actionsIndex) {
            data = data.replace(/(,")/, ',\n		"');
          } else execute = false;
        }
        /**
         * },\n		"actions": [
         */
        data = data
          .replace('"settings":{', '"settings":\n	{\n		')
          .replace('},\n		"actions":[', '\n	},\n	"actions":\n	[\n		')
          .replace("]}", "\n	]\n}")
          .replace(/({")/g, '{ "')
          .replace(/[,]/g, ", ")
          .replace(/(":)/g, '": ')
          .replace(/[}]/g, " }")
          .replace(/(false)/g, '"Disabled"')
          .replace(/(true)/g, '"Enabled"');

        fs.writeFileSync(location, data);
        resolve();
      } catch (e) {
        reject(new Error(e));
      }
    });
  },
};
