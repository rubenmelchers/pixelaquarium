/// <reference path="fishBehaviour.ts" />

class deadFish extends fishBehaviour{

    
    private _speed : number = 1;

	constructor(fish : Fish) {
        super();
        this._fish = fish;
        
        this._fish.div.style.backgroundImage = "url(images/deadfish.png)";

	}

    public updatePosition(): void {
        this._fish.y -= this._speed;

        if (this.checkTop()) {
            this._fish.y = 0;
            this._speed = 0;
        }
    }

    private checkTop() {
        return (this._fish.y < 0);
    }

    public onTimerFinished() {

    }
}