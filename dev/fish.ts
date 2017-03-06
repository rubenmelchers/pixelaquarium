/// <reference path="interface/ISwimBehaviour.ts" />

class Fish {

    private swimbehaviour:ISwimBehaviour;

    private div : HTMLElement;
    public x : number = 0;
    public y : number = 0;
    public speed : number = 5;
    public flip : number = 0;

    constructor(behaviour: ISwimBehaviour) {
        this.swimbehaviour = behaviour;

        this.createElement();
    }

    private createElement() : void{
        this.div = document.createElement(this.swimbehaviour.appearance());
        document.body.appendChild(this.div);

        // random positie
        let startx:number = (Math.random() * window.innerWidth);
        let starty:number = this.swimbehaviour.startY();      
        
        this.x = startx;
        this.y = starty;
        
        // random kleur
        let color:number = Math.random() * 360;
        
        this.div.style.webkitFilter = "hue-rotate("+color+"deg)";
        this.div.style.filter = "hue-rotate("+color+"deg)";
    }
 
    public update() : void {
        // this.x -= this.speed;

        this.performSwim();
        this.checkCollision();
    }

    private checkCollision() : void {
        if(this.x + this.div.clientWidth >= window.innerWidth || this.x <= 0) {
            this.swimbehaviour.collision();
            
            this.flip = this.flip == 0 ? 180 : 0;
        }
        if(this.y + this.div.clientHeight >= window.innerHeight || this.y <= 0) {
            this.swimbehaviour.verticalCollision();
        }
    }

    public draw() : void {
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) rotatey(" + this.flip + "deg)";
    }

    private performSwim(): void {
        this.x -= this.swimbehaviour.horizontalSwim();
        this.y -= this.swimbehaviour.verticalSwim();
    }
}