/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
module.exports = {

    get_parts: function() {
        return [HEAL, MOVE];
    },
    run: function (creep) {
        // Always prioritize healing self
        if (creep.hits < creep.hitsMax) {
            creep.moveTo(Game.spawns.Spawn1);
            creep.heal(creep);
            return;
        }

        var damaged_creep = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
            filter: function(object) {
                return object !== creep && object.hits < object.hitsMax;
            }
        });

        if(damaged_creep) {
            creep.moveTo(damaged_creep);
            if (creep.heal(damaged_creep) == ERR_NOT_IN_RANGE) {
                creep.rangedHeal(damaged_creep);
            }
            return;
        }

        // No damaged creeps are found
        var guard = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
            filter: function(creep) {
                return creep.memory.role === 'guard';
            }
        });
        if (guard) {
            creep.moveTo(guard);
        } else {
            creep.moveTo(Game.spawns.Spawn1);
        }
    }
}
