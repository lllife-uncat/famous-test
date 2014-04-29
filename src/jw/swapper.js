define(function(require, exports, module) {

  var Engine      = require("famous/core/Engine");
  var Surface     = require("famous/core/Surface");
  var EdgeSwapper = require("famous/views/EdgeSwapper");

  var mainContext = Engine.createContext();
  var edgeswapper = new EdgeSwapper();

  var primary = new Surface({
    size: [undefined, undefined],
    content: "Primary",
    classes: ["red-bg"],
    properties: {
      lineHeight: window.innerHeight + "px",
      textAlign: "center"
    }
  });

  var secondary = new Surface({
    size: [undefined, undefined],
    content: "Secondary",
    classes: ["grey-bg"],
    properties: {
      lineHeight: window.innerHeight + "px",
      textAlign: "center"
    }
  });

  mainContext.add(edgeswapper);
  edgeswapper.show(primary);

  var showing = true;
  Engine.on("click", function() {
    if (showing) {
      edgeswapper.show(secondary);
      showing = false;
    } else {
      edgeswapper.show(primary);
      showing = true;
    }
  });


});
