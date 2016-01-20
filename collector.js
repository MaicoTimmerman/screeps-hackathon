module.exports = function(creep) {
    function compare(a,b) {
        // Used for sort() sorts descending
        if (a.value < b.value) {
            return 1
        }
        if (a.value > b.value) {
            return -1
        }
        return 0
    }
    var allEnergy = creep.room.find(FIND_DROPPED_ENERGY, {
        filter: function(obj) {
            obj.value = obj.energy / creep.pos.getRangeTo(obj)
            return obj
        }
    })
    allEnergy.sort(compare)
    var bestEnergy = allEnergy[0]
    // console.log(bestEnergy)
    var spawn = Game.spawns.Spawn1
    var roomController = creep.room.find(FIND_MY_STRUCTURES, {
        filter: function(obj) {
            return obj.structureType == STRUCTURE_CONTROLLER
        }
    })
    if (spawn.energy < spawn.energyCapacity) {
        if (bestEnergy && creep.carry.energy < creep.carryCapacity) {
            if (creep.pickup(bestEnergy) == ERR_NOT_IN_RANGE && creep.pos.getRangeTo(35,20) > 1) {
                creep.moveTo(bestEnergy)
            }
        }
        else if (creep.transferEnergy(spawn) == ERR_NOT_IN_RANGE){
            creep.moveTo(spawn)
        } 
    } else {
        console.log('spawn full')
        // console.log(creep.upgradeController(roomController))
        if (bestEnergy && creep.carry.energy < creep.carryCapacity) {
            if (creep.pickup(bestEnergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(bestEnergy)
            }
        
        } else if (creep.upgradeController(roomController) == ERR_NOT_IN_RANGE) {
            creep.moveTo(roomController)
        }
    }
}