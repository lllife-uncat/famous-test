define(function(require, exports, module) {

  function init() {
    var self = {};
    self.Engine = require("famous/core/Engine");
    self.Surface = require("famous/core/Surface");
    self.Transform = require("famous/core/Transform");
    self.Scrollview = require("famous/views/Scrollview");
    self.ImageSurface = require("famous/surfaces/ImageSurface");
    self.GridLayout = require("famous/views/GridLayout");
    self.Modifier = require("famous/core/Modifier");
    self.EdgeSwapper = require("famous/views/EdgeSwapper");
    self.SpringTransition = require("famous/transitions/SpringTransition");
    self.Transitionable = require("famous/transitions/Transitionable");
    self.WallTransition = require("famous/transitions/WallTransition");
    self.SnapTransition = require("famous/transitions/SnapTransition");

    self.context = self.Engine.createContext();
    return self;
  }

  function createElement(tag, classes) {
    if (classes == undefined) {
      classes = [];
    }
    var el = document.createElement(tag);

    classes.forEach(function(cl){
      el.classList.add(cl);
    });

    return el;
  }

  function createAvatar() {

    var avatar = createElement("div", ["item", "item-avatar", "animated","bounceInDown"]);
    var image = createElement("img");
    image.setAttribute("src", "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/t1.0-1/c3.0.200.200/p200x200/10007437_512874678818624_1067226486_n.jpg");

    var h2 = createElement("h2");
    h2.innerHTML = "Hello world";

    var p = createElement("p");
    p.innerHTML = "2014";

    avatar.appendChild(image);
    avatar.appendChild(h2);
    avatar.appendChild(p);

    return avatar;
  }

  function createBody() {
    var el = createElement("div", ["item", "item-body", "animated", "bounceIn"]);
    var p = createElement("p");
    var img = createElement("img", ["full-image"]);
    img.setAttribute("src", "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/t1.0-1/c3.0.200.200/p200x200/10007437_512874678818624_1067226486_n.jpg")

    el.appendChild(p);
    el.appendChild(img);
    return el;
  }

  function createContent() {
    var el= createElement("div", ["list"]);
    var avatar = createAvatar();
    var body = createBody();
    el.appendChild(avatar);
    el.appendChild(body);

    var wrapper = createElement("div");
    wrapper.appendChild(el);
    return wrapper.innerHTML;
  }

  function createItem() {

    createItem.count = createItem.count || 1;

    var el = createElement("div", ["jw-item", "item", "item-thumbnail-left", "animated", "bounceIn"]);

    var text = createElement("h2", ["animated"]);
    text.innerHTML = "Hello " + createItem.count++ ;
    var desc = createElement("p");
    desc.innerHTML = "Hello this is description.";

    var image = createElement("img", ["animated"]);
    image.setAttribute("src", "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/t1.0-1/c3.0.200.200/p200x200/10007437_512874678818624_1067226486_n.jpg");
    image.classList.add("jw-image");

    el.appendChild(image);
    el.appendChild(text);
    el.appendChild(desc);

    var temp = document.createElement("div");
    temp.appendChild(el);
    temp.classList.add("list");

    var outter = document.createElement("div");
    outter.appendChild(temp);

    return outter.innerHTML;
  }

  function createLayout(self) {

    self.Transitionable.registerMethod('spring', self.SpringTransition);
    self.Transitionable.registerMethod('wall', self.WallTransition);
    self.Transitionable.registerMethod('snap', self.SnapTransition);
    var spring = {
        method: "spring",
        period: 1000,
        dampingRatio: .7,
        velocity: 0
    }

    var snap = {
        method: "snap",
        period: 1000,
        dampingRatio: .8,
        velocity: 0.009
    };

    var wall = {
      method: 'wall',
      period: 1000,
      dampingRatio : 0,
      velocity: 0,
      restitution : 0 //how bouncy the wall is
    };

    var items = [];
    var edge = new self.EdgeSwapper({
      inTransition: snap,
      outTransition: spring
//       overlap: false
    });
    var scrollview = new self.Scrollview({
       pagePeriod: 5000
    });

    scrollview.sequenceFrom(items);

    for(var i=0; i<20; i++){

      var title = new self.Surface({
        content: createItem(),
        size: [undefined, 105],
        properties: {
        }
      });

      title.on("click", function(){
        edge.show(surface);
      });

      title.pipe(scrollview);
      items.push(title);

    }

    var surface = new self.Surface({
      content: createContent(),
      properties : {
      }
    });

    surface.on("click", function(){
      edge.show(scrollview);
    });

    edge.show(scrollview);


    self.context.add(edge);
//     self.context.add(scrollview);
  }

  var self = init();
  createLayout(self);

});

