var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstractFactory = (function () {
    function abstractFactory() {
    }
    return abstractFactory;
}());
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
var concreteFactory = (function (_super) {
    __extends(concreteFactory, _super);
    function concreteFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    concreteFactory.prototype.createFish = function (type) {
        var fish = new Fish();
        var behaviour;
        switch (type) {
            case fishTypes.normalFish:
                behaviour = new normalFish(fish);
                console.log("normal fish spawned");
                break;
            case fishTypes.hangryFish:
                console.log("hangryfish spawned");
                behaviour = new hangryFish(fish);
                break;
            default:
                fish = null;
                break;
        }
        fish.setFishBehaviour(behaviour);
        return fish;
    };
    ;
    return concreteFactory;
}(abstractFactory));
var Fish = (function () {
    function Fish() {
        this.x = 0;
        this.y = 0;
        this.flip = 0;
        this.createElement();
    }
    Fish.prototype.setFishBehaviour = function (behavior) {
        this.fishBehavior = behavior;
    };
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
        this.fishBehavior.updatePosition();
    };
    Fish.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) rotatey(" + this.flip + "deg)";
    };
    return Fish;
}());
var fishTypes;
(function (fishTypes) {
    fishTypes[fishTypes["normalFish"] = 0] = "normalFish";
    fishTypes[fishTypes["hangryFish"] = 1] = "hangryFish";
})(fishTypes || (fishTypes = {}));
var Game = (function () {
    function Game() {
        var _this = this;
        this.numBubbles = 0;
        this.timer = 0;
        this.fishlist = new Array();
        setInterval(function () { return _this.generateFish(); }, 3000);
        requestAnimationFrame(function () { return _this.update(); });
    }
    Game.prototype.getRandomElementOfEnum = function (e) {
        var keys = Object.keys(e), index = Math.floor(Math.random() * keys.length), k = keys[index];
        if (typeof e[k] === 'number')
            return e[k];
        return parseInt(k, 10);
    };
    Game.prototype.generateFish = function () {
        var fishFactory = new concreteFactory();
        var fish2 = fishFactory.createFish(this.getRandomElementOfEnum(fishTypes));
        this.fishlist.push(fish2);
    };
    Game.prototype.update = function () {
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
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var FoodObserver = (function () {
    function FoodObserver() {
    }
    return FoodObserver;
}());
var fishBehaviour = (function () {
    function fishBehaviour() {
        this._timer = 0;
        this._behaviourTime = 0;
    }
    fishBehaviour.prototype.updateTimer = function () {
        this._timer++;
        if (this._timer > this._behaviourTime)
            this.onTimerFinished();
    };
    return fishBehaviour;
}());
var deadFish = (function (_super) {
    __extends(deadFish, _super);
    function deadFish(fish) {
        var _this = _super.call(this) || this;
        _this._speed = 1;
        _this._fish = fish;
        _this._fish.div.style.backgroundImage = "url(images/deadfish.png)";
        return _this;
    }
    deadFish.prototype.updatePosition = function () {
        this._fish.y -= this._speed;
        if (this.checkTop()) {
            this._fish.y = 0;
            this._speed = 0;
        }
    };
    deadFish.prototype.checkTop = function () {
        return (this._fish.y < 0);
    };
    deadFish.prototype.onTimerFinished = function () {
    };
    return deadFish;
}(fishBehaviour));
var hangryFish = (function (_super) {
    __extends(hangryFish, _super);
    function hangryFish(fish) {
        var _this = _super.call(this) || this;
        _this.speedX = 7;
        _this.speedY = 2;
        _this._fish = fish;
        _this._behaviourTime = 400;
        _this._fish.div.classList.add('normal-fish');
        return _this;
    }
    hangryFish.prototype.updatePosition = function () {
        this.updateTimer();
        this._fish.x -= this.speedX;
        this._fish.y -= this.speedY;
        this.checkCollision();
    };
    hangryFish.prototype.checkCollision = function () {
        if (this._fish.x + this._fish.div.clientWidth > window.innerWidth || this._fish.x < 0) {
            this.speedX *= -1;
            this._fish.flip = this._fish.flip == 0 ? 180 : 0;
        }
        if (this._fish.y + this._fish.div.clientHeight > window.innerHeight || this._fish.y < 0) {
            this.speedY *= -1;
        }
    };
    hangryFish.prototype.onTimerFinished = function () {
        this.veryHangry();
    };
    hangryFish.prototype.veryHangry = function () {
        this._fish.setFishBehaviour(new veryHangryFish(this._fish));
    };
    return hangryFish;
}(fishBehaviour));
var normalFish = (function (_super) {
    __extends(normalFish, _super);
    function normalFish(fish) {
        var _this = _super.call(this) || this;
        _this._speed = 1;
        _this._fish = fish;
        _this._behaviourTime = 600;
        _this._startY = _this._fish.y;
        return _this;
    }
    normalFish.prototype.updatePosition = function () {
        this.updateTimer();
        this._fish.y += this._speed;
        if (this._fish.y > this._startY + 50 ||
            this._fish.y < this._startY - 50) {
            this._speed *= -1;
        }
    };
    normalFish.prototype.onTimerFinished = function () {
        this.hungry();
    };
    normalFish.prototype.hungry = function () {
        this._fish.setFishBehaviour(new hangryFish(this._fish));
    };
    return normalFish;
}(fishBehaviour));
var veryHangryFish = (function (_super) {
    __extends(veryHangryFish, _super);
    function veryHangryFish(fish) {
        var _this = _super.call(this) || this;
        _this.speedX = 10;
        _this.speedY = 10;
        _this._fish = fish;
        _this._behaviourTime = 400;
        _this._fish.div.classList.add('normal-fish');
        return _this;
    }
    veryHangryFish.prototype.updatePosition = function () {
        this.updateTimer();
        this._fish.x -= this.speedX;
        this._fish.y -= this.speedY;
        this.checkCollision();
    };
    veryHangryFish.prototype.checkCollision = function () {
        if (this._fish.x + this._fish.div.clientWidth > window.innerWidth || this._fish.x < 0) {
            this.speedX *= -1;
            this._fish.flip = this._fish.flip == 0 ? 180 : 0;
        }
        if (this._fish.y + this._fish.div.clientHeight > window.innerHeight || this._fish.y < 0) {
            this.speedY *= -1;
        }
    };
    veryHangryFish.prototype.onTimerFinished = function () {
        this.die();
    };
    veryHangryFish.prototype.die = function () {
        this._fish.setFishBehaviour(new deadFish(this._fish));
    };
    return veryHangryFish;
}(fishBehaviour));
//# sourceMappingURL=main.js.map