/// <reference path="../interface/ISwimBehaviour.ts" />
/// <reference path="../fish.ts" />


class fastFish implements ISwimBehaviour{

    private speed:number = 10;
    private verticalSpeed:number = 3;

    public horizontalSwim(){
        return this.speed;
    }

    public verticalSwim() {
        return this.verticalSpeed;
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
        this.verticalSpeed *= -1.01;
    }
}