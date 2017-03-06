/// <reference path="fish.ts"/>
/// <reference path="bubble.ts"/>

class Game {
    private fishlist:Array<Fish>;
    private numBubbles:number = 0;
    private timer : number = 0;
        
    constructor() {

       this.fishlist = new Array<Fish>();

       setInterval(() => this.generateFish(), 3000);

       requestAnimationFrame(() => this.update());
    }

    private getRandomElementOfEnum<E>(e: any): E {
        var keys = Object.keys(e),
            index = Math.floor(Math.random() * keys.length),
            k = keys[index];
        if (typeof e[k] === 'number')
            return <any>e[k];
        return <any>parseInt(k, 10);
    }

    private generateFish() : void {      
        let fishFactory : abstractFactory = new concreteFactory();
        let fish2 : Fish = fishFactory.createFish(this.getRandomElementOfEnum<fishTypes>(fishTypes));

        this.fishlist.push(fish2);
    }
    
    private update(){
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
}