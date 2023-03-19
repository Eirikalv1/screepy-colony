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
			if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller);
			}
		} else {
			var source = creep.pos.findClosestByPath(FIND_SOURCES);
			if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source);
			}
		}
	},
};