const adofai = require("./index");

var adofaiOptions = {
  verboseLevel: 0,
};

adofai.import(
  "./imports/filename.adofai",
  (_callback1, err) => {
    if (err) throw err;
    else console.log(`File reading successful, took ${_callback1.time}ms!`);

    adofai.export(
      "./exports/filename.adofai",
      _callback1.map,
      (_callback2, err) => {
        if (err) throw err;
        else
          console.log(`File exporting successful, took ${_callback2.time}ms!`);
      }
    );
  },
  adofaiOptions
);
