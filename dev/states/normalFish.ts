/// <reference path="../interface/ISwimBehaviour.ts" />

class normalFish implements ISwimBehaviour{
    private speed:number = 5;

    public horizontalSwim() {
        return this.speed;
    }

    public verticalSwim() {
        return 0;
    }

    public appearance() {
        return "fish";
    }

    public startY() {
        return (Math.random() * window.innerHeight);
    }

    public collision() {
        this.speed *= -1;
    }

    public verticalCollision() {
        
    }
}