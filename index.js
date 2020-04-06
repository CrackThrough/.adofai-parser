const lineReader = require("line-reader");

function parse(file, _callback) {
  console.log(`Parsing '${file}'..`);
  var map = {
    pathData: "",
    settings: {
      version: NaN,
      artist: "",
      song: "",
      author: "",
      separateCountdownTime: null,
      songFilename: "",
      bpm: NaN,
      volume: NaN,
      offset: NaN,
      pitch: NaN,
      hitsound: "",
      hitsoundVolume: NaN,
      trackColorType: "",
      trackColor: "",
      secondaryTrackColor: "",
      trackColorAnimDuration: NaN,
      trackColorPulse: "",
      trackPulseLength: NaN,
      trackStyle: "",
      trackAnimation: "",
      beatsAhead: NaN,
      trackDisappearAnimation: "",
      beatsBehind: NaN,
      backgroundColor: "",
      bgImage: "",
      bgImageColor: "",
      parallax: [NaN, NaN],
      bgDisplayMode: "",
      lockRot: null,
      loopBG: null,
      unscaledSize: NaN,
      relativeTo: "",
      position: [NaN, NaN],
      rotation: NaN,
      zoom: NaN,
      bgVideo: "",
      loopVideo: null,
      vidOffset: NaN,
      floorIconOutlines: null,
      stickToFloors: null,
      planetEase: "",
      planetEaseParts: NaN,
    },
  };

  var lineCount = 0;
  lineReader.eachLine(file, function (line, last) {
    lineCount++;
    if (!line.includes("[") && lineCount < 49)
      line = line.replace(/[ 	,"]/g, "");
    else if (lineCount < 49)
      line = line.replace(/[ 	"]/g, "").substr(0, line.length - 8);
    console.log(`[DEBUG] Line ${lineCount} | ${line}`);

    if (lineCount == 1) {
      if (!line.includes("{")) throw new Error("This is not a valid format");
    }
    if (lineCount == 2) {
      if (!line.includes("pathData:"))
        throw new Error("Could not parse pathData");
      map.pathData = line.split(":")[1];
    }
    if (lineCount == 3) {
      if (!line.includes("settings:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
    }
    if (lineCount == 4) {
      if (!line.includes("{"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
    }
    if (lineCount == 5) {
      if (!line.includes("version:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.version = Number(line.split(":")[1]);
      if (map.settings.version != "2")
        throw new Error(
          `This map version is not supported. (Version : ${map.settings.version})`
        );
    }
    if (lineCount == 6) {
      if (!line.includes("artist:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.artist = line.split(":")[1];
    }
    if (lineCount == 7) {
      if (!line.includes("song:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.song = line.split(":")[1];
    }
    if (lineCount == 8) {
      if (!line.includes("author:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.author = line.split(":")[1];
    }
    if (lineCount == 9) {
      if (!line.includes("separateCountdownTime:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.separateCountdownTime = line.split(":")[1] == "Enabled";
    }
    if (lineCount == 10) {
      if (!line.includes("songFilename:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.songFilename = line.split(":")[1];
    }
    if (lineCount == 11) {
      if (!line.includes("bpm:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.bpm = Number(line.split(":")[1]);
    }
    if (lineCount == 12) {
      if (!line.includes("volume:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.volume = Number(line.split(":")[1]);
    }
    if (lineCount == 13) {
      if (!line.includes("offset:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.offset = Number(line.split(":")[1]);
    }
    if (lineCount == 14) {
      if (!line.includes("pitch:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.pitch = Number(line.split(":")[1]);
    }
    if (lineCount == 15) {
      if (!line.includes("hitsound:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.hitsound = line.split(":")[1];
    }
    if (lineCount == 16) {
      if (!line.includes("hitsoundVolume:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.hitsoundVolume = Number(line.split(":")[1]);
    }
    if (lineCount == 17) {
      if (!line.includes("trackColorType:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.trackColorType = line.split(":")[1];
    }
    if (lineCount == 18) {
      if (!line.includes("trackColor:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.trackColor = line.split(":")[1];
    }
    if (lineCount == 19) {
      if (!line.includes("secondaryTrackColor:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.secondaryTrackColor = line.split(":")[1];
    }
    if (lineCount == 20) {
      if (!line.includes("trackColorAnimDuration:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.trackColorAnimDuration = Number(line.split(":")[1]);
    }
    if (lineCount == 21) {
      if (!line.includes("trackColorPulse:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.trackColorPulse = line.split(":")[1];
    }
    if (lineCount == 22) {
      if (!line.includes("trackPulseLength:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.trackPulseLength = Number(line.split(":")[1]);
    }
    if (lineCount == 23) {
      if (!line.includes("trackStyle:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.trackStyle = line.split(":")[1];
    }
    if (lineCount == 24) {
      if (!line.includes("trackAnimation:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.trackAnimation = line.split(":")[1];
    }
    if (lineCount == 25) {
      if (!line.includes("beatsAhead:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.beatsAhead = Number(line.split(":")[1]);
    }
    if (lineCount == 26) {
      if (!line.includes("trackDisappearAnimation:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.trackDisappearAnimation = line.split(":")[1];
    }
    if (lineCount == 27) {
      if (!line.includes("beatsBehind:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.beatsBehind = Number(line.split(":")[1]);
    }
    if (lineCount == 28) {
      if (!line.includes("backgroundColor:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.backgroundColor = line.split(":")[1];
    }
    if (lineCount == 29) {
      if (!line.includes("bgImage:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.bgImage = line.split(":")[1];
    }
    if (lineCount == 30) {
      if (!line.includes("bgImageColor:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.bgImageColor = line.split(":")[1];
    }
    if (lineCount == 31) {
      if (!line.includes("parallax:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.parallax = eval(line.split(":")[1]);
    }
    if (lineCount == 32) {
      if (!line.includes("bgDisplayMode:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.bgDisplayMode = line.split(":")[1];
    }
    if (lineCount == 33) {
      if (!line.includes("lockRot:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.lockRot = line.split(":")[1] == "Enabled";
    }
    if (lineCount == 34) {
      if (!line.includes("loopBG:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.loopBG = line.split(":")[1] == "Enabled";
    }
    if (lineCount == 35) {
      if (!line.includes("unscaledSize:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.unscaledSize = Number(line.split(":")[1]);
    }
    if (lineCount == 36) {
      if (!line.includes("relativeTo:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.relativeTo = line.split(":")[1];
    }
    if (lineCount == 37) {
      if (!line.includes("position:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.position = eval(line.split(":")[1]);
    }
    if (lineCount == 38) {
      if (!line.includes("rotation:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.rotation = Number(line.split(":")[1]);
    }
    if (lineCount == 39) {
      if (!line.includes("zoom:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.zoom = Number(line.split(":")[1]);
    }
    if (lineCount == 40) {
      if (!line.includes("bgVideo:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.bgVideo = line.split(":")[1];
    }
    if (lineCount == 41) {
      if (!line.includes("loopVideo:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.loopVideo = line.split(":")[1] == "Enabled";
    }
    if (lineCount == 42) {
      if (!line.includes("vidOffset:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.vidOffset = Number(line.split(":")[1]);
    }
    if (lineCount == 43) {
      if (!line.includes("floorIconOutlines:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.floorIconOutlines = line.split(":")[1] == "Enabled";
    }
    if (lineCount == 44) {
      if (!line.includes("stickToFloors:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.stickToFloors = line.split(":")[1] == "Enabled";
    }
    if (lineCount == 45) {
      if (!line.includes("planetEase:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.planetEase = line.split(":")[1];
    }
    if (lineCount == 46) {
      if (!line.includes("planetEaseParts:"))
        throw new Error(`Couldn't parse map.settings at ${lineCount}`);
      map.settings.planetEaseParts = Number(line.split(":")[1]);
    }
    if (last) {
      console.log("Parse completed successfully!");
      _callback(map);
    }
  });
}

parse("./adofai files/all tile types.adofai", function (map) {
  console.log("recieved callback with " + map);
});
