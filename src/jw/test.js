function test() {
    var Engine = require("famous/core/Engine");
    var Surface = require("famous/core/Surface");
    var Transform = require("famous/core/Transform");
    var Modifier = require("famous/core/Modifier");
    var Easing           = require("famous/transitions/Easing");

    var surface = new Surface({
      size: [100, 100],
      content: "<span>Click To Move</span>",
      classes: ["jw-test-surface"]
    });

    var mainCtx = Engine.createContext();
    var startPos = Transform.translate(20,20,0);
    var endPos = Transform.translate(150,200,0);
    var transform = new Modifier({
      transform: startPos
    });

    var easeTransition = { duration:500, curve: Easing.inOutCubic };

    // Apply the transition on click and switch start/end
    surface.on("click", function (e) {
      transform.setTransform(endPos, easeTransition);
      startPos = [endPos, endPos = startPos][0];
    });

    mainCtx.add(transform).add(surface);
  }


  function scroll() {

    var Engine = require("famous/core/Engine");
    var Surface = require("famous/core/Surface");
    var Scrollview = require("famous/views/Scrollview");
    var ImageSurface = require("famous/surfaces/ImageSurface");
    var VideoSurface = require("famous/surfaces/VideoSurface");

    var mainCtx = Engine.createContext();
    var scrollView = new Scrollview({
      pagePeriod: 5000
    });
    var surfaces = [];

    function createSurface(number){

      var s = new Surface({
        size: [ undefined, 100],
        content: '<img src="https://famo.us/assets/famous_symbol_white.svg"/>',
        classes: ["jw-test-scrollview", (number % 2 ? "odd" : "even")]
      });

      var i =  new ImageSurface({
        content: "https://famo.us/images/famous_symbol_white.svg",
        size:[ undefined, 100],
        classes: ["jw-test-image", (number % 2 ? "odd" : "even") ]
      });

      var v = new VideoSurface({
        content: "https://github.com/somnuk-wk/jwlive/blob/master/videos/bunny.webm"
      });

      return i;
    };


    for(var i=0;i< 11000;i++){
      surfaces.push(createSurface(i));
    }

    scrollView.sequenceFrom(surfaces);
    scrollView.subscribe(Engine);
    mainCtx.add(scrollView);
  }


  function physic() {
    var Engine = require("famous/core/Engine");
    var PhysicsEngine = require("famous/physics/PhysicsEngine");
    var Surface = require("famous/core/Surface");
    var PE = new PhysicsEngine();
    var mainCtx = Engine.createContext();
    var Particle = require("famous/physics/bodies/Particle");
    var Spring = require("famous/physics/forces/Spring");
    var Modifier = require("famous/core/Modifier");
    var Vector = require("famous/math/Vector");

    var mainCtx = Engine.createContext();
    var PE = new PhysicsEngine();

    // Create a surface, content is html
    var surface = new Surface({
      size: [100, 100],
      content: "<span>Click To<br/>Spring<br/>Surface</span>",
      classes: ["test-surface"]
    });

    // Create a physical particle with position (p), velocity (v), mass(m)
    var particle = new Particle({
      mass: 1,
      position: [0, 0, 0],
      velocity: [0, 0, 0]
    });

    // Create a spring that will act on the particle
    var spring = new Spring({
      anchor: [0, 0, 0],
      period: 400,  // <= Play with these values :-)
      dampingRatio: 0.07, // <=
      length: 0
    });

    // Apply a force on the surface when its clicked
    surface.on("click", function (e) {
      particle.applyForce(new Vector(0, 0, -0.005 * 100));
    });

    // Link the spring, particle and surface together
    PE.attach(spring, particle);
    PE.addBody(particle);

    // Create the scene, applying a top level modifier to center
    // the scene vertically in the viewport
    mainCtx.add(new Modifier({ origin: [.5, .5] })).add(particle).add(surface);
    mainCtx.setPerspective(1000);

  }

//   physic();
//   scroll();
