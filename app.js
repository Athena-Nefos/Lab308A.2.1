//Simple Adventurer with basic Properties

// const adventurer = {
//    name: "Robin",
//    health: 10,
//    inventory: ["sword", "potion", "artifact"],
//    companion: {
//        name: "Leo",
//        type: "Cat",
//        companion: {
//            name: "Frank",
//            type: "Flea",
//            inventory: ["small hat", "sunglasses"]
//        }
//    },

//method for dice roll.  mod is a modifying number, can be used in the call

// roll (mod = 0) {// 
//    const result = 
//    Math.floor(Math.random() * 20) + 1 + mod;
//
//    console.log(`${this.name} rolled a ${result}.`);
// }
// }
// adventurer.roll();
// adventurer.roll();
// adventurer.roll();

//Accessing items in the inventory using dot notation and square bracket syntax
// console.log("Welcome, " + adventurer.name + "!");

// Access the items in the inventory using the index counter and square brackets, in this case [0, 1, 2]

// console.log("Your first item is: " + adventurer.inventory[0]);

// console.log("Your second item is: " + adventurer.inventory[1]);

// console.log("Your third item is: " + adventurer.inventory[2]);

// For Loop to loop through all the inventory items

// console.log("\nHere is a list of your inventory:");
// for (let i = 0; i < adventurer.inventory.length; i++) {
//     console.log(`${i + 1}. ${adventurer.inventory[i]}`);
// }



//now we are using classes to re-create characters.  also, ensure they all share common methods and properties such as roll(). 
class Character {
    constructor (name) {
        this.name = name;
        this.health = Character.MAX_HEALTH; //use static property
        this.inventory = [];
    }

    roll (mod = 0) {
        const result = 
        Math.floor(Math.random() * 20) + 1 + mod;
    
        console.log(`${this.name} rolled a ${result}.`);
    }
        static MAX_HEALTH = 100; //static property on the class
}

// const robin = new Character("Robin");
// robin.inventory = ["sword", "potion", "artifact"];

// robin.companion = new Character("Leo");
// robin.companion.type = "Cat";

// robin.companion.companion = new Character("Frank");
// robin.companion.companion.type = "Flea";
// robin.companion.companion.inventory = ["small hat", "sunglasses"];

// robin.roll();
// robin.companion.roll();
// robin.companion.companion.roll();

class Adventurer extends Character {
    constructor (name, role, skill) {
        super(name);
        //Add ROLES ARRAY for Adventurers
        if (!Adventurer.ROLES.includes(role)) {
            throw new Error(`Invalid role: ${role}. Choose from: ${Adventurer.ROLES.join(", ")}`);
        }
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
    static ROLES = ["Fighter", "Wizard", "Healer", "Ranger", "Warrior"]
}
console.log(Adventurer.ROLES);

const ariana = new Adventurer("Ariana", "Ranger", "Stealth");

//Call methods to test Ariana
console.log(ariana); //View Ariana's Properties
ariana.scout();   //Call the scout method
ariana.displaySkill();  //Call display skill method

class Companion extends Character {
    constructor(name, type, specialAbility) {
        super(name); //Call the Character constructor to initialize basic properties
        this.type = type; //Type of companion (e.g. cat, wolf, etc.)
        this.specialAbility = specialAbility; //Unique ability of the companion
        this.loyalty = 100; //Companions start with full loyalty by default
    }
    //Method for using the specical ability
    useAbility() {
        console.log(`${this.name} the ${this.type} uses ${this.specialAbility}!`);
    } 
    //Method for decreasing loyalty (e.g. due to neglect or poor treatment)
    decreaseLoyalty(amount) {
        this.loyalty = Math.max(0, this.loyalty - amount); //Loyalty can not go below 0
        console.log(`${this.name}'s loyalty is now ${this.loyalty}.`);
    }
    //Method for increasing loyalty (e.g. due to care or bonding)
    increaseLoyalty(amount) {
        this.loyalty = Math.min(100, this.loyalty + amount);  // Loyalty maxes out at 100
        console.log(`${this.name}'s loyalty is now ${this.loyalty}`);
    }
}

const leo = new Companion("Leo", "Cat", "Keen Senses");
const frank = new Companion("Frank", "Flea", "Tiny Escape");

//add companions to Ariana
ariana.companion = leo;
leo.companion = frank; //Leo has his own companion, Frank

//Test companion abilities and loyalty
leo.useAbility();
leo.decreaseLoyalty(20);
leo.increaseLoyalty(15);

frank.useAbility();

//Display the adventurer details
console.log(ariana);
console.log(ariana.companion);
console.log(ariana.companion.companion);

// new declaration of Robin and companions
const robin = new Adventurer ("Robin", "Warrior", "Swordsmanship");

//Robin's inventory
robin.inventory.push("sword", "potion", "artifact");

//create Robin's companions
const leoge = new Companion("Leoge", "Cat", "Keen Senses");
const frankie = new Companion("Frankie", "Flea", "Tiny Escape");

//build companion hierarchy
robin.companion = leoge;
leoge.companion = frankie;

// Test functnionality
console.log(robin);
robin.scout();
robin.displaySkill();

leo.useAbility();
leo.decreaseLoyalty(30);
leo.increaseLoyalty(20);

frank.useAbility();

//View the companion structure 
console.log(robin.companion);
console.log(robin.companion.companion);

