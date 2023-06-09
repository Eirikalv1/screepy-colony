let roleHarvester = require("role.harvester");
let roleUpgrader = require("role.upgrader");
let roleBuilder = require("role.builder");
let roleRepairer = require("role.repairer");

module.exports.loop = function () {
	clearDeadMemory();

	let minHarvesters = 5;
	let minUpgraders = 2;
	let minBuilders = 1;
	let minRepairers = 2;

	let harvesterAmount = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
	let upgraderAmount = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
	let builderAmount = _.sum(Game.creeps, (c) => c.memory.role == "builder");
	let repairerAmount = _.sum(Game.creeps, (c) => c.memory.role == "repairer");

	if (harvesterAmount < minHarvesters) {
		spawnCreep("harvester");
	} else if (upgraderAmount < minUpgraders) {
		spawnCreep("upgrader");
	} else if (builderAmount < minBuilders) {
		spawnCreep("builder");
	} else if (repairerAmount < minRepairers) {
		spawnCreep("repairer");
	} else {
		spawnCreep("builder");
	}

	for (let name in Game.creeps) {
		let creep = Game.creeps[name];
		if (creep.memory.role == "harvester") {
			roleHarvester.run(creep);
		} else if (creep.memory.role == "upgrader") {
			roleUpgrader.run(creep);
		} else if (creep.memory.role == "builder") {
			roleBuilder.run(creep);
		} else if (creep.memory.role == "repairer") {
			roleRepairer.run(creep);
		}
	}
};

function clearDeadMemory() {
	for (let name in Memory.creeps) {
		if (Game.creeps[name] == undefined) {
			delete Memory.creeps[name];
		}
	}
}

function spawnCreep(role) {
	if (_.sum(Game.creeps, (c) => c.memory.role == "harvester") > 2) {
		var properties = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
	} else {
		var properties = [WORK, WORK, CARRY, MOVE];
	}


	let name = Game.spawns["Spawn1"].spawnCreep(
		properties,
		role + Math.floor(Math.random() * 1000),
		{
			memory: {
				role,
				working: false,
			},
		}
	);

	if (!(name < 0)) {
		console.log("Spawned new " + role);
	}
}
