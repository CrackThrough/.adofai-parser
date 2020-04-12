// require over .adofai-parser
const adofai = require("../index");

// defining map and keys alternatively
var map = adofai.map,
  keys = adofai.keys;

// random char function
function randomString(charArray, stringLength) {
  var result = "";
  for (var i = 0; i < stringLength; i++) {
    var random = Math.floor(Math.random() * (charArray.length - 1));
    result += charArray[random];
  }
  return result;
}

// pick random function
function pickRandom(array) {
  var random = Math.floor(Math.random() * (array.length - 1));
  return array[random];
}

// set pathData
map.pathData = randomString(keys._pathData, 20);

// charArray for hex codes
let hexChars = "0123456789abcdef".split("");

// mostly randomized map.settings
map.settings.author = ".adofai-parser";
map.settings.backgroundColor = randomString(hexChars, 6);
map.settings.beatsAhead = Math.floor(Math.random() * 19);
map.settings.beatsBehind = Math.floor(Math.random() * 13);
map.settings.bgDisplayMode = pickRandom(
  keys.actions.eventType.CustomBackground._bgDisplayMode
);
map.settings.bgImageColor = randomString(hexChars, 6);
map.settings.bpm = Math.floor(Math.random() * 1000);
map.settings.floorIconOutlines = Math.random() * 2 > 1;
map.settings.hitsound = pickRandom(keys.actions.eventType._SetHitsound);
map.settings.hitsoundVolume = Math.floor(Math.random() * 100);
map.settings.lockRot = Math.random() * 2 > 1;
map.settings.loopBG = Math.random() * 2 > 1;
map.settings.loopVideo = Math.random() * 2 > 1;
map.settings.offset = 0;
map.settings.parallax = [0, 0];
map.settings.pitch = 100;
map.settings.planetEase = "Linear";
map.settings.planetEaseParts = 0;
map.settings.position = [0, 0];
map.settings.relativeTo = "Player";
map.settings.rotation = 0;
map.settings.secondaryTrackColor = randomString(hexChars, 6);
map.settings.separateCountdownTime = Math.random() * 2 > 1;
map.settings.stickToFloors = Math.random() * 2 > 1;
map.settings.trackAnimation = pickRandom(
  keys.actions.eventType.AnimateTrack._trackAnimation
);
map.settings.trackColor = randomString(hexChars, 6);
map.settings.trackColorAnimDuration = Math.floor(Math.random() * 24);
map.settings.trackColorPulse = pickRandom(
  keys.actions.eventParameters._trackColorPulse
);
map.settings.trackColorType = pickRandom(
  keys.actions.eventParameters._trackColorType
);
map.settings.trackDisappearAnimation = pickRandom(
  keys.actions.eventType.AnimateTrack._trackDisappearAnimation
);
map.settings.trackPulseLength = Math.floor(Math.random() * 3);
map.settings.trackStyle = pickRandom(keys.actions.eventParameters._trackStyle);
map.settings.unscaledSize = 100;
map.settings.version = 2;
map.settings.vidOffset = 0;
map.settings.volume = 100;
map.settings.zoom = 130;

// export with callback
adofai.export("./exports/newTestOutput.adofai", map, (_callback, err) => {
  if (err) throw err;
  console.log("Exported map file!");

  // done
});
