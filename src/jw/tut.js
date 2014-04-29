define(function(require, exports, module) {
  function init() {

//     require("famous-polyfills");
//     require("famous/core/famous");

    var Engine = require("famous/core/Engine");
    var Modifier = require("famous/core/Modifier");
    var Surface = require("famous/core/Surface");
    var Transform = require("famous/core/Transform");
    var SpringTransition = require("famous/transitions/SpringTransition");
    var StateModifier = require("famous/modifiers/StateModifier");

    var element1 = document.getElementById("c1");
    var element2 = document.getElementById("c2");

    var c1 = Engine.createContext();
    var c2 = Engine.createContext(element2);



    var options = {
      content: 'Hello',
      size: [100,100],
      properties: {
        lineHeight: "100px",
        textAlign: "center",
        backgroundColor: "orange"
      }
    };

    var m1 = new StateModifier({
      origin: [0.5, 0.5]
    });


    var s1 = new Surface(options);
    var s2 = new Surface(options);

    c1.add(m1).add(s1);

    var x = 0;

    s1.on("click", function(){
      x += Math.PI/2;
      m1.setTransform(Transform.rotateZ(x), {
        method: SpringTransition
      });

      console.log(x);
    });
  }

  init();

});
