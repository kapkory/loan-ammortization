class Planet{
    name: string;
    mass?: string;

    constructor(message: string){
        this.name = message
    }
    public printName(){console.log('name is '+this.name)}
}

new Planet('Earth');