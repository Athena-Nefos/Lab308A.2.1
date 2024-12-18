//Simple Adventurer with basic Properties

 const adventurer = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion", "artifact"],
    companion: {
        name: "Leo",
        type: "Cat",
        companion: {
            name: "Frank",
            type: "Flea",
            inventory: ["small hat", "sunglasses"]
        }
    },

//method for dice roll.  mod is a modifying number, can be used in the call

roll (mod = 0) {
    const result = 
    Math.floor(Math.random() * 20) + 1 + mod;

    console.log(`${this.name} rolled a ${result}.`);
}
}
adventurer.roll();
adventurer.roll();
adventurer.roll();

//Accessing items in the inventory using dot notation and square bracket syntax
console.log("Welcome, " + adventurer.name + "!");

// Access the items in the inventory using the index counter and square brackets, in this case [0, 1, 2]

console.log("Your first item is: " + adventurer.inventory[0]);

console.log("Your second item is: " + adventurer.inventory[1]);

console.log("Your third item is: " + adventurer.inventory[2]);

// For Loop to loop through all the inventory items

console.log("\nHere is a list of your inventory:");
for (let i = 0; i < adventurer.inventory.length; i++) {
    console.log(`${i + 1}. ${adventurer.inventory[i]}`);
}



//now we are using classes to re-create characters.  also, ensure they all share common methods and properties such as roll(). 
class Character {
    constructor (name) {
        this.name = name;
        this.health = 100;
        this.inventory = [];
    }

    roll (mod = 0) {
        const result = 
        Math.floor(Math.random() * 20) + 1 + mod;
    
        console.log(`${this.name} rolled a ${result}.`);
    }

}

const robin = new Character("Robin");
robin.inventory = ["sword", "potion", "artifact"];

robin.companion = new Character("Leo");
robin.companion.type = "Cat";

robin.companion.companion = new Character("Frank");
robin.companion.companion.type = "Flea";
robin.companion.companion.inventory = ["small hat", "sunglasses"];

robin.roll();
robin.companion.roll();
robin.companion.companion.roll();

class Adventurer extends Character {
    constructor (name, role, skill) {
        super(name);
        //Adventurers have specialized roles.
        this.role = role;
        //Every adventurer starts with a bed and 50 gold coins
        this.inventory.push("bedroll", "50 gold coins");
        this.skillset = skill;
    }
    //Adventurers have the ability to scout ahead of them.
    scout() {
        console.log(`${this.name} is scouting ahead...`);    

        super.roll();
    }
    displaySkill() {
        console.log(`${this.name}'s skill set is: ${this.skillset}`);
    } 
    
}

const ariana = new Adventurer("Ariana", "Ranger", "Stealth");

//Call methods to test Ariana
console.log(ariana); //View Ariana's Properties
ariana.scout();   //Call the scout method
ariana.displaySkill();  //Call display skill method