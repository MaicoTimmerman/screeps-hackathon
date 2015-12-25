var spawn_controller = require('spawn_controller');
var harvester = require('harvester');

function managed_current_creeps() {
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        switch (creep.memory.role) {
            case 'harvester': harvester.run(creep); break;
            default:
                console.log('Unknown creep type; ' + creep + ': '+creep.memory.role);
                continue;
        }
    }
}

module.exports.loop = function () {

    managed_current_creeps();
    spawn_controller.spawn_next_creep();

}
//        if(creep.memory.role == 'builder') {
//
//            if(creep.carry.energy == 0) {
//                if(Game.spawns.Spawn1.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
//                    creep.moveTo(Game.spawns.Spawn1);
//                }
//            }
//            else {
//                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
//                if(targets.length) {
//                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
//                        creep.moveTo(targets[0]);
//                    }
//                }
//            }
//        }
//        if(creep.memory.role == 'guard') {
//            var targets = creep.room.find(FIND_HOSTILE_CREEPS);
//            if(targets.length) {
//                if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
//                    creep.moveTo(targets[0]);
//                }
//            }
//        }
//    }
