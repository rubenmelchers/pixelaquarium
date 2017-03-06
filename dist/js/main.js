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
    function Fish(behaviour) {
        this.x = 0;
        this.y = 0;
        this.speed = 5;
        this.flip = 0;
        this.swimbehaviour = behaviour;
        this.createElement();
    }
    Fish.prototype.createElement = function () {
        this.div = document.createElement(this.swimbehaviour.appearance());
        document.body.appendChild(this.div);
        var startx = (Math.random() * window.innerWidth);
        var starty = this.swimbehaviour.startY();
        this.x = startx;
        this.y = starty;
        var color = Math.random() * 360;
        this.div.style.webkitFilter = "hue-rotate(" + color + "deg)";
        this.div.style.filter = "hue-rotate(" + color + "deg)";
    };
    Fish.prototype.update = function () {
        this.performSwim();
        this.checkCollision();
    };
    Fish.prototype.checkCollision = function () {
        if (this.x + this.div.clientWidth >= window.innerWidth || this.x <= 0) {
            this.swimbehaviour.collision();
            this.flip = this.flip == 0 ? 180 : 0;
        }
        if (this.y + this.div.clientHeight >= window.innerHeight || this.y <= 0) {
            this.swimbehaviour.verticalCollision();
        }
    };
    Fish.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) rotatey(" + this.flip + "deg)";
    };
    Fish.prototype.performSwim = function () {
        this.x -= this.swimbehaviour.horizontalSwim();
        this.y -= this.swimbehaviour.verticalSwim();
    };
    return Fish;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.fishlist = [];
        this.numBubbles = 0;
        this.timer = 0;
        this.fishTimer = 0;
        this.normalFish = new Fish(new normalFish);
        this.customFish = new Fish(new fastFish);
        this.thirdFish = new Fish(new deadFish);
        this.fishlist.push(this.normalFish);
        this.fishlist.push(this.customFish);
        this.fishlist.push(this.thirdFish);
        requestAnimationFrame(function () { return _this.update(); });
    }
    Game.prototype.update = function () {
        this.addFish();
        if (this.numBubbles < 15 && this.timer % 20 == 0) {
            new Bubble();
            this.numBubbles++;
        }
        this.timer++;
        this.fishlist.forEach(function (fish) {
            fish.update();
        });
        this.draw();
    };
    Game.prototype.draw = function () {
        var _this = this;
        this.fishlist.forEach(function (fish) {
            fish.draw();
        });
        requestAnimationFrame(function () { return _this.update(); });
    };
    Game.prototype.addFish = function () {
        this.fishTimer++;
        if (this.fishTimer >= (60 * 5)) {
            this.fishTimer = 0;
            this.fishlist.push(new Fish(new normalFish));
        }
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var deadFish = (function () {
    function deadFish() {
        this.speed = 0.3;
    }
    deadFish.prototype.horizontalSwim = function () {
        return this.speed;
    };
    deadFish.prototype.verticalSwim = function () {
        return 0;
    };
    deadFish.prototype.appearance = function () {
        return "deadfish";
    };
    deadFish.prototype.startY = function () {
        return 0;
    };
    deadFish.prototype.collision = function () {
        this.speed *= -1;
    };
    deadFish.prototype.verticalCollision = function () {
    };
    return deadFish;
}());
var fastFish = (function () {
    function fastFish() {
        this.speed = 10;
        this.verticalSpeed = 3;
    }
    fastFish.prototype.horizontalSwim = function () {
        return this.speed;
    };
    fastFish.prototype.verticalSwim = function () {
        return this.verticalSpeed;
    };
    fastFish.prototype.appearance = function () {
        return "fish";
    };
    fastFish.prototype.startY = function () {
        return (Math.random() * window.innerHeight);
    };
    fastFish.prototype.collision = function () {
        this.speed *= -1;
    };
    fastFish.prototype.verticalCollision = function () {
        this.verticalSpeed *= -1.01;
    };
    return fastFish;
}());
var normalFish = (function () {
    function normalFish() {
        this.speed = 5;
    }
    normalFish.prototype.horizontalSwim = function () {
        return this.speed;
    };
    normalFish.prototype.verticalSwim = function () {
        return 0;
    };
    normalFish.prototype.appearance = function () {
        return "fish";
    };
    normalFish.prototype.startY = function () {
        return (Math.random() * window.innerHeight);
    };
    normalFish.prototype.collision = function () {
        this.speed *= -1;
    };
    normalFish.prototype.verticalCollision = function () {
    };
    return normalFish;
}());
//# sourceMappingURL=main.js.map