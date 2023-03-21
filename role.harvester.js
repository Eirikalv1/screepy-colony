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
			let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
				filter: (s) => (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_TOWER) && s.energy < s.energyCapacity
			});
			if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(structure);
			}
		} else {
			let source = creep.pos.findClosestByPath(FIND_SOURCES, {
				filter: (s) => s.pos.x == 34 && s.pos.y == 17,
			});
			if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source);
			}
		}
	},
};
