class concreteFactory extends abstractFactory {
    public createFish(type: fishTypes) : Fish {
        let fish: Fish = new Fish();
        let behaviour : fishBehaviour;

        switch(type) {
            case fishTypes.normalFish:
                behaviour = new normalFish(fish);
                console.log("normal fish spawned");
                break;
            
            case fishTypes.hangryFish:
                console.log("hangryfish spawned");
                behaviour = new hangryFish(fish);
                break;
            
            default:
                fish = null;
                break;
        }

        fish.setFishBehaviour(behaviour)
        return fish;
    };
}