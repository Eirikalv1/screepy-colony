let roleHarvester = require("role.harvester");

module.exports.loop = function () {
	clearDeadMemory();
	spawnCreep("harvester");

	for (let name in Game.creeps) {
		let creep = Game.creeps[name];
		roleHarvester.run(creep);
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
	let name = Game.spawns["Spawn1"].spawnCreep(
		[WORK, WORK, CARRY, MOVE],
		role + Math.floor(Math.random() * 100),
		{
			memory: {
				role: role,
				working: false,
			},
		}
	);

	if (!(name < 0)) {
		console.log("Spawned new " + role);
	}
}
