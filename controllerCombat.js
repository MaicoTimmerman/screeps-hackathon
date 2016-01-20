var guard = require('guard')
var leader = require('leader')
var healer = require('healer')
var ranger = require('ranger')

module.exports = function(creepList) {
    // console.log(creepList)
    function compare(a,b) {
        // Used for sort() sorts descending
        if (a.score < b.score) {
            return 1
        }
        if (a.score > b.score) {
            return -1
        }
        return 0
    }
    
    var enemies = Game.rooms.sim.find(FIND_HOSTILE_CREEPS, {
        filter: function(obj) {
            if( obj.owner.username != 'Source Keeper' && Game.flags.RallyPoint.pos.getRangeTo(obj) < 20 ) {
                return obj
            }
        }
    });
    
    var threatLevel = {
        'heal':15,
        'ranged_attack':5,
        'attack':5
    }
    
    for (var i in enemies) {
        var enemy = enemies[i]
        var distance = Game.flags.RallyPoint.pos.getRangeTo(enemy)
        var bodyparts = enemy.body
        var score = 0
        for (var i in bodyparts) {
            score += threatLevel[bodyparts[i].type]
        }
        enemy.score = score / distance
        enemy.distance = distance
    }
    enemies.sort(compare)

    var squadMem = Memory.squad
    var targetObj = {}
    if (enemies.length != 0) {
        for (var i in squadMem) {
            for (var j in squadMem[i]) {
                if (squadMem[i][j].role == "leader") {
                    targetObj[i] = enemies[0]
                    enemies.shift()
                    console.log(i + " " + targetObj[i])
                }
            }
        }
    }
    for (var creepIndex in creepList) {
        var creep = creepList[creepIndex]
        if (creep) {
            if (creep.memory.role == 'leader') {
                var target = targetObj[creep.memory.squad]
                leader(creep, target)
            }
            if (creep.memory.role == 'guard') {
                guard(creep)
            }
            if (creep.memory.role == 'healer') {
                healer(creep)
            }
            if (creep.memory.role == 'ranger') {
                ranger(creep)
            }
        }
    }
}





