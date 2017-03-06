interface ISwimBehaviour {
    startY(): number;
    horizontalSwim(): number;
    verticalSwim(): number;
    appearance(): string;
    collision(): void;
    verticalCollision(): void;
}