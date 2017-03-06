/// <reference path="fish.ts"/>
/// <reference path="bubble.ts"/>

class Game {
    
    private fishlist:Array<Fish> = [];
    private customFish:Fish;
    private thirdFish:Fish;

    private normalFish:Fish;
    private numBubbles:number = 0;
    private timer : number = 0;
    private fishTimer : number = 0;
        
    constructor() {
       this.normalFish = new Fish(new normalFish);
       this.customFish = new Fish(new fastFish);
       this.thirdFish = new Fish(new deadFish);

       this.fishlist.push(this.normalFish);
       this.fishlist.push(this.customFish);
       this.fishlist.push(this.thirdFish);

       requestAnimationFrame(() => this.update());
    }
    
    private update(){
        this.addFish();

        if (this.numBubbles < 15 && this.timer % 20 == 0) {
            new Bubble();
            this.numBubbles++; 
        }
        this.timer++;


        this.fishlist.forEach(fish => {
            fish.update();
        });

        this.draw();
    }

    private draw() {
        this.fishlist.forEach(fish => {
            fish.draw();
        });

        // hiermee wordt de update opnieuw aangeroepen
        requestAnimationFrame(() => this.update());
    }

    private addFish() {
        this.fishTimer++;
        if(this.fishTimer >= (60 * 5)) { //60 fps, 10 seconds
            this.fishTimer = 0;

            this.fishlist.push(new Fish(new normalFish));
        }
    }
}