module.exports = function(creep) {
    var squad = Memory.squad[creep.memory.squad]
    for (var i in squad) {
        if (squad[i].role == "leader" ) {
            var leader = Game.getObjectById(squad[i].id)
            if (leader) {
                var target = leader.memory.target
            } else {
                var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
                    filter: function(obj) {
                        if( obj.owner.username != 'Source Keeper' && Game.flags.RallyPoint.pos.getRangeTo(obj) < 20 ) {
                            return obj
                        }
                }});
            }
        } else {
            var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
                filter: function(obj) {
                    if( obj.owner.username != 'Source Keeper' && Game.flags.RallyPoint.pos.getRangeTo(obj) < 20 ) {
                        return obj
                    }
            }});
        }
    }
    var closeEnemies = creep.pos.findInRange(FIND_HOSTILE_CREEPS,3)
    if (closeEnemies.length > 1) {
        creep.rangedMassAttack()
    } else  if (closeEnemies.length == 1) {
        creep.rangedAttack(closeEnemies[0])
    }

    var rallyPoint = Game.flags.RallyPoint
    
    if (target && leader){
        // console.log(target)
        if (creep.rangedAttack(target) == ERR_NOT_IN_RANGE && 
            creep.pos.getRangeTo(rallyPoint) < 8 && 
            creep.pos.getRangeTo(leader) < 10) {
                
            creep.moveTo(target)
        } else if (creep.rangedAttack(target) == ERR_NOT_IN_RANGE && creep.pos.getRangeTo(target) <= 3 ) {
            creep.moveTo(target)
        } else {
            creep.moveTo(leader)
        }
    } else if (target) {
        if (creep.rangedAttack(target) == ERR_NOT_IN_RANGE && creep.pos.getRangeTo(rallyPoint) < 8) {
            creep.moveTo(target)
        } else if (creep.rangedAttack(target) == ERR_NOT_IN_RANGE && creep.pos.getRangeTo(target) <= 3 ) {
            creep.moveTo(target)
        }
    }
    
    else {
        
        if (leader && creep.pos.getRangeTo(rallyPoint) < 9) {
            creep.moveTo(leader)
        }
        else{
            creep.moveTo(rallyPoint)    
        }
    }
}