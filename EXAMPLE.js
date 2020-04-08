const adofai = require("./index");

async function getMap(file) {
  return await adofai.import(file, true).then(
    (map) => {
      adofai.export("./exports/ultra-blazuresConvert.adofai", map);
      console.log("done!");
    },
    (err) => {
      throw Error(err);
    }
  );
}

getMap("./imports/ultra-blazures.adofai");
