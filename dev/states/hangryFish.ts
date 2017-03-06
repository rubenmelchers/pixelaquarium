class hangryFish extends fishBehaviour {

    private speedX : number = 7;
    private speedY : number = 2;

    constructor(fish : Fish) {
        super();

        this._fish          = fish;
        this._behaviourTime  = 400;

        this._fish.div.classList.add('normal-fish');
	}
    
    public updatePosition() : void {
        this.updateTimer();

        this._fish.x -= this.speedX;
        this._fish.y -= this.speedY;
        
        this.checkCollision();
    }

    private checkCollision() : void {
        if(this._fish.x + this._fish.div.clientWidth > window.innerWidth || this._fish.x < 0) {
            this.speedX *= -1;
            
            
            this._fish.flip = this._fish.flip == 0 ? 180 : 0;
        }

        if(this._fish.y + this._fish.div.clientHeight > window.innerHeight || this._fish.y < 0) {
            this.speedY *= -1;
        }
    }

    public onTimerFinished() {
        this.veryHangry();
    }

    private veryHangry() : void {
        this._fish.setFishBehaviour(new veryHangryFish(this._fish));
    }
}