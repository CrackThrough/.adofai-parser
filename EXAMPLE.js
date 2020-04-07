const adofai = require("./index");

async function getMap(file) {
  return await adofai.parseFile(file).then(
    (map) => {
      console.log(map);
    },
    (err) => {
      throw Error(err);
    }
  );
}

getMap("./adofai files/eventTest2.adofai");
