module.exports = {
  skeletons: require("./editor/skeletons"),
  keys: require("./editor/allkeys"),
  import: require("./editor/parse").import,
  export: require("./editor/parse").export,
};
