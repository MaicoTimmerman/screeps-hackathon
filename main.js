var spawner = require('spawner')
var squadUpdater = require('squadUpdater')
// v2.0
var controllerCOMBAT = require('controllerCOMBAT')
var controllerRESOURCE = require('controllerRESOURCE')
var controllerSPAWN = require('controllerSPAWN')

// Init
var thisRoom = Game.spawns.Spawn1.room
thisRoom.createFlag(20,25, "RallyPoint", COLOR_ORANGE)
thisRoom.createFlag(35,20, "Source1", COLOR_YELLOW)
thisRoom.createFlag(35,2, "Source2", COLOR_YELLOW)
thisRoom.createFlag(43,44, "Source3", COLOR_YELLOW)
thisRoom.createFlag(6,44, "Source4", COLOR_YELLOW)

module.exports.loop = function () {
    if (Game.spawns.Spawn1.room.controller.level == 2 && Memory.extensions != "True") {
        var thisRoom = Game.spawns.Spawn1.room
        thisRoom.createConstructionSite(30,21, STRUCTURE_EXTENSION)
        thisRoom.createConstructionSite(29,22, STRUCTURE_EXTENSION)
        thisRoom.createConstructionSite(29,24, STRUCTURE_EXTENSION)
        thisRoom.createConstructionSite(30,25, STRUCTURE_EXTENSION)
        thisRoom.createConstructionSite(31,25, STRUCTURE_EXTENSION)
        Memory.extensions = "True"
    }
    var resourceRoles = ['harvester', 'collector', 'builder']
    var resourceCreeps = []
    var combatRoles = ['guard','ranger','healer','leader']
    var combatCreeps = []
    for (var creepName in Game.creeps) {
        var creep = Game.creeps[creepName]
        if (creep != null) {
            if (resourceRoles.indexOf(creep.memory.role) != -1) {
                resourceCreeps.push(creep)
            }
            if (combatRoles.indexOf(creep.memory.role) != -1) {
                combatCreeps.push(creep)
            }
        }
    }
    controllerRESOURCE(resourceCreeps)
    controllerCOMBAT(combatCreeps)

	squadUpdater()
	for (var spawn in Game.spawns) {
	    spawner(Game.spawns[spawn])
	}
}