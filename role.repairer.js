let roleBuilder = require("role.builder");

module.exports = {
	run: function (creep) {
		if (creep.memory.working && creep.store.energy == 0) {
			creep.memory.working = false;
		} else if (
			!creep.memory.working &&
			creep.store.energy == creep.store.getCapacity()
		) {
			creep.memory.working = true;
		}

		if (creep.memory.working) {
			var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL,
			});

			if (structure != undefined) {
				if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
					creep.moveTo(structure);
				}
			}
		} else {
			roleBuilder.run(creep);
		}
	},
};
