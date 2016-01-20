module.exports = function(creep) {
    var target = creep.pos.findClosestByRange(FIND_SOURCES)
    var spawn = Game.spawns.Spawn1;
    var collectors =  creep.room.find(FIND_MY_CREEPS, {
        filter: function(obj){
            if (obj.memory.role == 'collector') {
                return obj
            }
        }
    })
    
   
    if (creep.harvest(target) == ERR_NOT_IN_RANGE 
    && creep.carry.energy < creep.carryCapacity) {
        creep.moveTo(target)
        // console.log(creep.moveTo(target))
    } 
    if (collectors.length == 0) {
        if ( creep.transferEnergy(spawn) == ERR_NOT_IN_RANGE 
        && creep.carry.energy == creep.carryCapacity) {
            creep.moveTo(spawn)
        }
    }
    else {
        creep.dropEnergy(creep.carry.energy)
    }
    
 }