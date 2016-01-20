/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
module.exports = {
    get_parts: function() {
        return [TOUGH, TOUGH, ATTACK, ATTACK, MOVE];
    },
    run: function (creep) {
        var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
            filter: function(hostile) {
                return hostile.owner.username !== 'Source Keeper';
            }
        });
        // filter if there is a target and this guard can still attack
        if(target && creep.hits > creep.hitsMax - 400) {
            creep.moveTo(target);
            creep.attack(target);
        } else {
            if (!creep.pos.inRangeTo(Game.spawns.Spawn1, 3)) {
                creep.moveTo(Game.spawns.Spawn1);
            }
        }
    }
}
