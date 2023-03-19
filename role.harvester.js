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
			let spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
			if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(spawn);
			}
		} else {
			var source = creep.pos.findClosestByPath(FIND_SOURCES);
			if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source);
			}
		}
	},
};
