/// <reference path="../interface/ISwimBehaviour.ts" />

class deadFish implements ISwimBehaviour{

    private speed:number = 0.3;

    public horizontalSwim() {
        return this.speed;
    }

    public verticalSwim() {
        return 0;
    }

    public appearance() {
        return "deadfish";
    }

    public startY() {
        return 0;
    }

    public collision() {
        this.speed *= -1;
    }

    public verticalCollision() {
        
    }
}