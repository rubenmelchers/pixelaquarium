abstract class fishBehaviour {

    protected _fish : Fish;
    protected _timer : number = 0;
    protected _behaviourTime = 0;


    public updateTimer() {
        this._timer++;

        if(this._timer > this._behaviourTime) this.onTimerFinished();
    }

    public abstract updatePosition() : void;
    public abstract onTimerFinished() : void;
}