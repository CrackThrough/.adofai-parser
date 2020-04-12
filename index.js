module.exports = {
  map: require("./editor/mapSkeleton"),
  keys: require("./editor/mapKeys"),
  import: require("./editor/parse").import,
  export: require("./editor/parse").export,
};
