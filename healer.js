module.exports = function(creep) {
    function healSort(a,b) {
        if (a.healVal < b.healVal) {
            return -1
        }
        if (a.healVal > b.healVal) {
            return 1
        }
        return 0
    }
    
    var allWounded = creep.room.find(FIND_MY_CREEPS, {
        filter: function(obj) {
            if (obj.hits < obj.hitsMax){
                var healVal = obj.hits/ obj.hitsMax * (creep.pos.getRangeTo(obj) +1)
                obj.healVal = healVal
                // console.log(healVal)
                return obj
            }
            
        }
    })
    allWounded.sort(healSort)
    var wounded = allWounded[0]
    var squad = Memory.squad[creep.memory.squad]
    for (var i in squad) {
        if (squad[i].role == "leader" ) {
            var leader = Game.getObjectById(squad[i].id)
            if (leader) {
                var target = leader.memory.target
            } else {
                console.log("cant find leader")
            }
        }
    }

    var rallyPoint = Game.flags.RallyPoint

    if (wounded) {
        if (creep.rangedHeal(wounded) == ERR_NOT_IN_RANGE){
            console.log("RANGED_HEAL")
            creep.moveTo(wounded)
        } else if (creep.heal(wounded) == ERR_NOT_IN_RANGE && creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3).length == 0) {
            console.log("HEAL")
            creep.moveTo(wounded)
        }
    } else {
        
        if (leader && creep.pos.getRangeTo(rallyPoint) < 9) {
            creep.moveTo(leader)
        }
        else{
            creep.moveTo(rallyPoint)    
        }
    }
}

// id183080