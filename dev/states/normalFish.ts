/// <reference path="fishBehaviour.ts" />

class normalFish extends fishBehaviour {
    
	private _startY : number;
    private _speed : number = 1;

    constructor(fish : Fish) {
        super();
        this._fish          = fish;
        this._behaviourTime  = 600;

        this._startY = this._fish.y;
	}
    
    public updatePosition() {
        this.updateTimer();

        this._fish.y += this._speed;

        if(this._fish.y > this._startY + 50 ||
            this._fish.y < this._startY - 50) { 
            this._speed *= -1;
        }
        
    }

    public onTimerFinished() {
        this.hungry();
    }

    private hungry(){
        this._fish.setFishBehaviour(new hangryFish(this._fish));
    }
}