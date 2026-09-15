class Hero {
    constructor(name){
        this.name = name;
        this.hp = 10;
        this.strength = 5;
        this.level = 1;
    }
    train(){
        this.strength++;
        this.hp -= 2;
    }
    rest(){
        if (this.hp == 10) return; 
        else this.hp = 10;
    }
    fight(monstro = new Monster()){
        if (this.strength > monstro.strength){
            this.strength++;
            this.level++;
        }
        else if (this.strength < monstro.strength) this.hp -=2;
        else return;
        console.log(monstro);
    }    
}

class Monster {
    constructor (name){
        this.name = name;
        this.hp = 10;
        this.strength = 4;
    }
}


const heroi = new Hero("Bruno");
const monstro = new Monster("Caio");
console.log(heroi);
console.log(monstro);
heroi.fight(monstro);
console.log(heroi);