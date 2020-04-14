# .adofai parser

This is a nodejs package parsing custom .adofai files*(most likely called "levels")* from a steam game called **"[A Dance of Fire and Ice](https://store.steampowered.com/app/977950/A_Dance_of_Fire_and_Ice/)"** developed by **"[7th Beat Games](http://7thbe.at/)"**.

It is a simple tool making parsing more easier.

## Examples

### When importing a file :

```javascript
const adofai = require("adofai-parser");

var adofaiOptions = { verboseLevel: 0 }; // optional, can be 0 to 2

adofai.import(
  "file path",
  (cb, err) => {
    if (err) throw err;
    console.log(`Parsing is finished! It took ${cb.time}ms!`);
  },
  adofaiOptions
);
```

### When exporting a file :

```javascript
const adofai = require('adofai-parser');

var adofaiOptions = { verboseLevel: 0 }; // optional, can be 0 to 2

adofai.export(
  "file path", /* Object or JSON here */, (cb, err) => {
    if(err) throw err;
    else console.log("done!")
  }, adofaiOptions
);
```

## Author Informations

#### Discord: @CrackThrough#5067

#### Discord Server: [Invition link](https://discord.gg/wQKvwcV)

##

I hope this can help some people trying to make a better editor or a simple macro!
I am open to any kind of feedbacks.. please give me any ideas to improve this creation!
