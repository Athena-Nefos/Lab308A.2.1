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

        static calculateDamage(attack, defense) {
            const damage = Math.max(0, attack - defense);
            return damage;
        }
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
        this.inventory = [...Adventurer.DEFAULT_INVENTORY]; 
        //new static property for inventory
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
    duel(opponent) {
        if (!(opponent instanceof Adventurer)) {
            throw new Error("Opponent must be an instance of Adeventurer.");
        }
        console.log(`Duel initiated between ${this.name} and ${opponent.name}!`);

        while (this.health > 50 && opponent.health > 50) {
            //Each adventurer rolls
            const myRoll = Math.floor(Math.random() * 20) + 1;
            const opponentRoll = Math.floor(Math.random() * 20) + 1;

            console.log(`${this.name} rolls ${myRoll} and ${opponent.name} rolls ${opponentRoll}.`);

            //Deduct health from the one with the lower roll
            if (myRoll > opponentRoll) {
                opponent.health -= 1;
                console.log(`${opponent.name} loses 1 health.  Current health: ${opponent.health}`);
            } else if (opponentRoll > myRoll) {
                this.health -= 1;
                console.log(`${this.name} loses 1 health.  Current health: ${this.health}`);
            } else {
                console.log("It's a tie! No damage dealt this round.");
            }
        }

        //Determine the winner
        const winner = this.health > 50 ? this.name : opponent.name;
        console.log(`${winner} wins the duel!`);
    } 

    static ROLES = ["Fighter", "Wizard", "Healer", "Ranger", "Warrior"]

    static DEFAULT_INVENTORY = ["bedroll", "50 gold coins"] 
    //static default inventory

    static describeRole(role) {
        const descriptions = {
            Fighter: "A versatile warrior trained in the use of weapons and armor.",
            Wizard: "A powerful spellcaster who weilds the forces of magic to shape reality.",
            Healer: "A compassionate and dedicaed supporter who focuses on restoring health, curing ailments and protecting the party from harm.",
            Ranger: "A wilderness expert with exceptional skills in archery, survival and tracking.",
            Warrior: "A battle-hardened veteran who focuses on brute strength and mastery of physical combat.",
        };
        return descriptions[role] || "Unknown role";
    }
}
console.log(Adventurer.ROLES);

class AdventurerFactory {
    constructor(role) {
        this.role = role; //shared property
        this.adventurers = []; //store created adventurers
    }

    //Method to generate a new adventurer
    generate(name) {
        const newAdventurer = new Adventurer(name, this.role);
        this.adventurers.push(newAdventurer);
        return newAdventurer; //return the created adventurer
    }

    //find adventurer by index
    findByIndex(index) {
        return this.adventurers[index];
    }

    //FInd adventurer by name
    findByName(name) {
        return this.adventurers.find((a) => a.name === name);
    }
    listAll() {
        return this.adventurers.map((a) => a.name).join(", ");
    }
    removeByName(name) {
        this.adventurers = this.adventurers.filter((a) => a.name !== name);
    }
}

class Healer extends Adventurer {
    constructor(name) {
        super(name, "Healer");
    }
    heal(target) {
        console.log(`${this.name} heals ${target.name}.`);
        target.health += 10; //increase targets health
    }
}

class HealerFactory extends AdventurerFactory {
    generate(name) {
        const newHealer = new Healer(name);
        this.adventurers.push(newHealer);
        return newHealer;
    }
}

const healers = new AdventurerFactory("Healer");

const lobin = healers.generate("Lobin"); //create a healer named Lobin
const lily = healers.generate("Lily"); //create another healer named Lily

console.log(healers.findByIndex(0));
console.log(healers.findByName("Lily"));

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

console.log(Character.MAX_HEALTH);
console.log(Adventurer.ROLES);
console.log(Adventurer.describeRole("Healer"));

console.log(ariana);

const alice = new Adventurer("Alice", "Fighter", "Swordsmanship");
const bob = new Adventurer("Bob", "Wizard", "Spellcasting");

alice.duel(bob);



