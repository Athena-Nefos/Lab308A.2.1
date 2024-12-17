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

