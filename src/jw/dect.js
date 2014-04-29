define(function(require, exports, module) {

  var Engine = require('famous/core/Engine');
  var Transform = require('famous/core/Transform');
  var Modifier = require('famous/core/Modifier');
  var Surface = require('famous/core/Surface');
  var Transitionable = require('famous/transitions/Transitionable');
  var Deck = require('famous/views/Deck');
  var GridLayout = require('famous/views/GridLayout');
  var Scrollview = require("famous/views/Scrollview");
  var ImageSurface = require("famous/surfaces/ImageSurface");
  var SpringTransition = require('famous/transitions/SpringTransition');
  var WallTransition = require('famous/transitions/WallTransition');
  var WallTransition = require('famous/transitions/SnapTransition');

  function registerTransition() {
    Transitionable.registerMethod('spring', SpringTransition);
    Transitionable.registerMethod('wall', WallTransition);
    Transitionable.registerMethod('snap', SpringTransition);
  }

  function createDect(surfaces) {
    var dect = new Deck({
      itemSpacing: 10,
      transition: {
        method: 'snap',
        period: 300,
        dampingRatio: 0.5
      },
      stackRotation: 0.1
    });

    dect.sequenceFrom(surfaces);
    return dect;
  }

  function appendSurface(surfaces, dect){

    var imgs = [
      "//static.ettoday.net/images/527/d527496.jpg" ,
//       "http:images.tienphong.vn/Uploaded/Images/b/515/b51543c1ae8f57aa98191b11b4ba5420.jpg"
    ];

    for(var i = 0; i < 20; i++) {
      var random = Math.floor(Math.random() * imgs.length);
      var temp = new ImageSurface({
         size: [230,300],
//         size: ["10%", "10%"],
        classes: ['test'],
        properties: {
          backgroundColor: 'hsla(' + ((i*5 + i)*15 % 360) + ', 60%, 50%, 0.8)'
        },
        content: imgs[random]
      });

      temp.on('click', function() {
        dect.toggle();
      });
      surfaces.push(temp);
    }
  }

  function createScrollview() {
    var options = {
       pagePeriod: 5000
    };
    var scrollview = new Scrollview(options);

    return scrollview;
  }

  function start() {
    registerTransition();

    var mainContext = Engine.createContext();
    var surfaces = [];
    var dect = createDect(surfaces);
    appendSurface(surfaces, dect);

    var containerModifier = new Modifier({
      origin: [0.5, 0.5]
    });

    var scrollview = createScrollview();
    scrollview.sequenceFrom([dect]);

//     var image = new ImageSurface({
//       size: [100,100],
//       content: "http://images.tienphong.vn/Uploaded/Images/b/515/b51543c1ae8f57aa98191b11b4ba5420.jpg"
//     });

    scrollview.subscribe(Engine);
    mainContext.add(containerModifier).add(scrollview);
    //mainContext.add(scrollview);
  }

  start();

});
