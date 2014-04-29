define(function(require, exports, module) {

  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Easing = require('famous/transitions/Easing');
  var mainContext = Engine.createContext();

  var surface = new Surface({
    size: [100, 100],
    content: 'ball',
    properties: {
      color: 'black',
      textAlign: 'center',
      //     backgroundColor: '#FF0000',
      borderRadius:'100px'
    }
  });

  surface.on("click", function(){
    stateModifier.setTransform(
      Transform.translate(0, 100, 0),
      { duration : 800, curve: Easing.inBounce}
    );
  });

  var stateModifier = new StateModifier({
    origin: [0.5, 0]
  });

  mainContext.add(stateModifier).add(surface);

  stateModifier.setTransform(
    Transform.translate(0, 400, 0),
    { duration : 100, curve: Easing.outBounce}
  );

});
