// require over .adofai-parser
const adofai = require("../index");

// import with callback
adofai.import("../imports/test.adofai", (_callback1, err1) => {
  if (err1) throw err1;
  console.log("Imported map file!");

  // export with callback
  adofai.export(
    "../exports/testOutput.adofai",
    _callback1.map,
    (_callback2, err2) => {
      if (err2) throw err2;
      console.log("Exported map file!");

      // done
    }
  );
});
