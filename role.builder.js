let roleUpgrader = require("role.upgrader");

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
			let constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
			if (constructionSite != undefined) {
				if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
					creep.moveTo(constructionSite);
				}
			} else {
				roleUpgrader.run(creep);
			}
		} else {
			var source = creep.pos.findClosestByPath(FIND_SOURCES);
			if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source);
			}
		}
	},
};
