var Bubble = (function () {
    function Bubble() {
        var div = document.createElement("bubble");
        document.body.appendChild(div);
        var startx = (Math.random() * window.innerWidth);
        div.style.left = startx + "px";
        div.style.top = "0px";
    }
    return Bubble;
}());
var Fish = (function () {
    function Fish() {
        this.x = 0;
        this.y = 0;
        this.speed = 5;
        this.flip = 0;
        this.createElement();
    }
    Fish.prototype.createElement = function () {
        this.div = document.createElement("fish");
        document.body.appendChild(this.div);
        var startx = (Math.random() * window.innerWidth);
        var starty = (Math.random() * window.innerHeight);
        this.x = startx;
        this.y = starty;
        var color = Math.random() * 360;
        this.div.style.webkitFilter = "hue-rotate(" + color + "deg)";
        this.div.style.filter = "hue-rotate(" + color + "deg)";
    };
    Fish.prototype.update = function () {
        this.x -= this.speed;
        this.checkCollision();
    };
    Fish.prototype.checkCollision = function () {
        if (this.x + this.div.clientWidth > window.innerWidth || this.x < 0) {
            this.speed *= -1;
            this.flip = this.flip == 0 ? 180 : 0;
        }
    };
    Fish.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) rotatey(" + this.flip + "deg)";
    };
    return Fish;
}());
var IRotateBehaviour = (function () {
    function IRotateBehaviour() {
        this.x = 0;
        this.y = 0;
        this.speed = 5;
        this.flip = 0;
        this.createElement();
    }
    IRotateBehaviour.prototype.createElement = function () {
        this.div = document.createElement("fish");
        document.body.appendChild(this.div);
        var startx = (Math.random() * window.innerWidth);
        var starty = (Math.random() * window.innerHeight);
        this.x = startx;
        this.y = starty;
        var color = Math.random() * 360;
        this.div.style.webkitFilter = "hue-rotate(" + color + "deg)";
        this.div.style.filter = "hue-rotate(" + color + "deg)";
    };
    IRotateBehaviour.prototype.update = function () {
        this.x -= this.speed;
        this.checkCollision();
    };
    IRotateBehaviour.prototype.checkCollision = function () {
        if (this.x + this.div.clientWidth > window.innerWidth || this.x < 0) {
            this.speed *= -1;
            this.flip = this.flip == 0 ? 180 : 0;
        }
    };
    IRotateBehaviour.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) rotatey(" + this.flip + "deg)";
    };
    IRotateBehaviour.prototype.execute = function () {
        console.log("rotate");
    };
    return IRotateBehaviour;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.fishlist = [];
        this.numBubbles = 0;
        this.timer = 0;
        this.fishTimer = 0;
        this.normalFish = new Fish();
        requestAnimationFrame(function () { return _this.update(); });
    }
    Game.prototype.update = function () {
        this.normalFish.update();
        if (this.numBubbles < 15 && this.timer % 20 == 0) {
            new Bubble();
            this.numBubbles++;
        }
        this.timer++;
        this.addFish();
        this.fishlist.forEach(function (element) {
            element.update();
        });
        this.draw();
    };
    Game.prototype.draw = function () {
        var _this = this;
        this.normalFish.draw();
        this.fishlist.forEach(function (element) {
            element.draw();
        });
        requestAnimationFrame(function () { return _this.update(); });
    };
    Game.prototype.addFish = function () {
        this.fishTimer++;
        if (this.fishTimer >= (60 * 10)) {
            this.fishTimer = 0;
            this.fishlist.push(new Fish, IRotateBehaviour);
        }
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
//# sourceMappingURL=main.js.map