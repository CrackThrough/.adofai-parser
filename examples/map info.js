// require over .adofai-parser
const adofai = require("../index");

// import with callback
adofai.import("./imports/test.adofai", (_callback, err) => {
  if (err) throw err;
  // defining map as alternate variable
  var map = _callback.map;

  // fixed map length (! means tab key, and it is not a saperate tile so removing !)
  var mapLength = map.pathData.replace(/!/g, "").length;

  // event length
  var eventLength = map.actions.length;

  // twirl + bpm tiles are bad. this shows overlapped tiles
  var twirlFloors = [],
    bpmFloors = [],
    overlappingFloors = [];

  // tiles count in console.log
  console.log(
    `There ${mapLength > 1 ? "are" : "is"} ${mapLength} tile${
      mapLength > 1 ? "s" : ""
    } in this map!`
  );

  // events count in console.log
  console.log(
    `There ${eventLength > 1 ? "are" : "is"} ${eventLength} event${
      eventLength > 1 ? "s" : ""
    } in this map!`
  );

  // if there are twirl + bpm tiles, console.log them
  if (map.actions.length > 0) {
    map.actions.forEach((evt) => {
      if (evt.eventType == "Twirl") {
        twirlFloors.push(evt.floor);
      }
      if (evt.eventType == "SetSpeed") {
        bpmFloors.push(evt.floor);
      }
    });

    twirlFloors.forEach((floor) => {
      if (bpmFloors.includes(floor)) overlappingFloors.push(floor);
    });

    if (overlappingFloors.length > 0) {
      console.log(
        "In these tile numbers in order has overlapping BPM Change + Twirls.\n" +
          "I do not recommend that unless it is REALLY needed.\n" +
          JSON.stringify(overlappingFloors)
      );
    }
  }
});
