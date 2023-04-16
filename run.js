const fs = require("fs");
const config = require("./config.json");
const eventPopper = require("./");

eventPopper.updateEventDescription(
  fs.readFileSync(".data/description.html", "utf8"),
  config
);
