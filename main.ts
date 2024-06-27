#! /usr/bin/env node

import inquirer from "inquirer";

class Player {
    name: string;
    health: number = 100;

    constructor(name: string) {
        this.name = name;
    }

    decreaseHealth() {
        this.health -= 20;
    }

    increaseHealth() {
        if (this.health < 100) {
            this.health += 20;
        }
    }
}

class Enemy {
    name: string;
    health: number = 100;

    constructor(name: string) {
        this.name = name;
    }

    decreaseHealth() {
        this.health -= 20;
    }

    increaseHealth() {
        if (this.health < 100) {
            this.health += 20;
        }
    }
}

async function main() {
    const { playerName } = await inquirer.prompt([
        {
            type: "input",
            name: "playerName",
            message: "Enter Your Player Name:"
        }
    ]);

    const { enemyType } = await inquirer.prompt([
        {
            type: "list",
            name: "enemyType",
            choices: ["alien", "witch", "zombie"],
            message: "Select the enemy you fight with:"
        }
    ]);

    const player = new Player(playerName);
    const enemy = new Enemy(enemyType);

    console.log(`${enemy.name} v/s ${player.name}`);

    do {
        const { action } = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                choices: ["attack", "defend", "range target", "run"],
                message: "Choose the attack type to perform action"
            }
        ]);

        switch (action) {
            case "attack":
                const randomNum = Math.random();
                if (randomNum > 0.5) {
                    enemy.decreaseHealth();
                    console.log(`${enemy.name} health: ${enemy.health}`);
                } else {
                    player.decreaseHealth();
                    console.log(`${player.name} health: ${player.health}`);
                }

                // Check if player or enemy health is zero or below
                if (player.health <= 0) {
                    console.log("You lost! Try again.");
                    return;
                } else if (enemy.health <= 0) {
                    console.log("Congratulations! You won.");
                    return;
                }
                break;

            case "defend":
                // Implement defend logic
                console.log("Defend action chosen.");
                break;

            case "range target":
                // Implement range target logic
                console.log("Range target action chosen.");
                break;

            case "run":
                // Implement run logic
                console.log("Run action chosen.");
                break;

            default:
                console.log("Invalid action!");
        }

    } while (player.health > 0 && enemy.health > 0); // Continue loop while both player and enemy are alive
}

main();