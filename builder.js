module.exports = function(creep) {
    var spawn = Game.spawns.Spawn1
    var constructions = creep.room.find(FIND_CONSTRUCTION_SITES);
    var roomController = creep.room.controller
    var source2
    var objList = Game.rooms.sim.lookAt(Game.flags.Source2.pos)
    objList.forEach(function(lookObject) {
        if(lookObject.type == 'source') {
            source2 = lookObject.source
        }
    })
    // creep.memory.state = 'full'
    var squadMem = Memory.squad
    var dmgdSquads = 0
    for (i in squadMem) {
        if (squadMem[i].length < 5) {
            dmgdSquads += 1
        }
    }
    if (creep.carry.energy == creep.carryCapacity) {
        creep.memory.state = 'full'
    }
    if (creep.carry.energy == 0) {
        creep.memory.state = 'empty'
    }
    if(creep.harvest(source2) == ERR_NOT_IN_RANGE && creep.memory.state == 'empty') {
        creep.moveTo(source2);
    } else if (creep.harvest(source2) == OK && creep.memory.state == 'empty') {
        console.log('harvest')
    }
    
    else if(creep.pos.findInRange(FIND_HOSTILE_CREEPS, 7).length == 0 && creep.memory.state == 'full') {
        if (roomController.level < 2) {
            if (creep.upgradeController(roomController) == ERR_NOT_IN_RANGE) {
                creep.moveTo(roomController)
            }
        }
        else if(constructions.length) {
            if(creep.build(constructions[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(constructions[0]);                 
            }
        }
        else {
            if (creep.upgradeController(roomController) == ERR_NOT_IN_RANGE) {
                creep.moveTo(roomController)
            }
        }
    }
    else {
        creep.moveTo(Game.flags.RallyPoint)
    }
}