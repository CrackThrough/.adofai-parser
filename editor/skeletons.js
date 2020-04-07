module.exports = {
  map: {
    pathData: "",
    settings: {
      version: NaN,
      artist: "",
      song: "",
      author: "",
      separateCountdownTime: false,
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
      lockRot: false,
      loopBG: false,
      unscaledSize: NaN,
      relativeTo: "",
      position: [NaN, NaN],
      rotation: NaN,
      zoom: NaN,
      bgVideo: "",
      loopVideo: false,
      vidOffset: NaN,
      floorIconOutlines: false,
      stickToFloors: false,
      planetEase: "",
      planetEaseParts: NaN,
    },
    actions: [],
  },
  mapinfo: {
    fixedTilesLength: NaN,
    mapLength: {
      hour: NaN,
      minute: NaN,
      second: NaN,
      milisecond: NaN,
    },
    /**bad tile means there are speed change + twirl in same time. even if it changes just A BIT of bpm, it is not a good thing tbh.
     * structures:
     *  [
     *    @number , ...
     *  ]
     *
     * amount is measured with .length value
     */
    // Maybe i should just make a filter to find specific tile
    badTiles: [],
  },
};
