const lineReader = require("line-reader");
const keys = require("./allkeys");
module.exports = {
  parse: function (file) {
    return new Promise((resolve, reject) => {
      var map = require("./skeletons").map;

      var progress = {
        lineCount: 0,
        foundActions: false,
        foundSettinds: false,
        inActions: false,
        fullfile: "",
      };

      var debug = false;

      lineReader.eachLine(file, function (line, last) {
        progress.lineCount++;
        var rawline = line;
        var valueAsString = false;

        if (debug) console.log(`[DEBUG] Line ${progress.lineCount} | ${line}`);

        if (!line.includes("[") && !progress.foundActions) {
          line = line.replace(/[﻿ 	,"]/g, "");
          if (debug)
            console.log(
              `[DEBUG] Re-reading Line ${progress.lineCount} | ${line}`
            );
        } else if (!progress.foundActions && progress.foundSettings) {
          line = line.replace(/[﻿ 	"]/g, "").substr(0, line.length - 8);
          if (debug)
            console.log(
              `[DEBUG] Re-reading Line ${progress.lineCount} | ${line}`
            );
        }

        if (line.includes("settings:")) progress.foundSettings = true;
        if (line.includes("actions:")) progress.foundActions = true;
        if (!progress.foundActions) {
          if (!line.includes("pathData") && progress.foundSettings) {
            if (line.split(":")[1] != null && !line.includes("settings:")) {
              var value = line.split(":")[1];
              if (
                line.split(":")[1].indexOf("[") <
                line.split(":")[1].indexOf("]")
              ) {
                value = line.split(":")[1];
              } else if (value == "Enabled" || value == "Disabled") {
                value = value == "Enabled";
              } else if (value.toString().startsWith("[")) {
                value = eval(value);
              } else if (!isNaN(Number(value))) {
                value = Number(value);
              } else {
                valueAsString = true;
              }
              if (value == "false" || value == "true") {
                value = value == "true";
                valueAsString = false;
              }
              if (valueAsString) {
                if (isNaN(Number(value))) {
                  eval(`map.settings.${line.split(":")[0]} = "${value}"`);
                } else {
                  eval(`map.settings.${line.split(":")[0]} = ${value}`);
                }
              } else {
                if (typeof value == "boolean") {
                  eval(
                    `map.settings.${line.split(":")[0]} = ${
                      value == "true" || value == true
                    }`
                  );
                } else {
                  eval(`map.settings.${line.split(":")[0]} = ${value}`);
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
          if (debug)
            console.log(
              `[DEBUG] Re-reading Line ${progress.lineCount} | ${line}`
            );
          if (line == "[") {
            progress.inActions = true;
          } else if (line == "]") {
            progress.inActions = false;
          } else if (progress.inActions) {
            console.log(`event line (${progress.lineCount}) | ${line}`);
            var event = {};
            var eventLine = line.split(",");
            eventLine.forEach((thisline) => {
              thisline = thisline.replace(/[{}]/g, "").split(":");
              if (thisline.length == 2) {
                // eval(`event.${thisline[0]} = ${thisline[1]}`);
                if (!isNaN(Number(thisline[1]))) {
                  eval(`event.${thisline[0]} = ${thisline[1]}`);
                } else if (
                  thisline[1].includes("Enabled") ||
                  thisline.includes("Disabled")
                ) {
                  eval(
                    `event.${thisline[0]} = ${thisline[1].includes("Enabled")}`
                  );
                } else if (
                  thisline[1].indexOf("[") < thisline[1].indexOf("]")
                ) {
                  eval(`event.${thisline[0]} = ${thisline[1]}`);
                } else {
                  eval(`event.${thisline[0]} = "${thisline[1]}"`);
                }
              }
            });
            console.log(`event parsed :\n`);
            console.log(event);
          }
        }

        progress.fullfile += rawline + "\n";
        if (last) {
          keys._map.forEach((key) => {
            if (!progress.fullfile.includes(key))
              reject(new Error(`File does not have a key "${key}"`));
          });
          return resolve(map);
        }
      });
    });
  },
};
