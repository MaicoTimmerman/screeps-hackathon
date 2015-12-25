var _ = require('lodash')
module.exports = {
    init_spawn_queue: function() {
        if (Memory.spawn_queue === undefined)
            Memory.spawn_queue = ['harvester', 'guard', 'harvester', 'guard'];
    },
    add_spawn_queue: function(creep_type, priority) {
        this.init_spawn_queue();

        if(priority != undefined && priority === true)
            Memory.spawn_queue.push(creep_type);
        else
            Memory.spawn_queue.unshift(creep_type);
    },

    spawn_next_creep: function() {
        this.init_spawn_queue();

        if(!Memory.spawn_queue.length) return;

        var creep_type = Memory.spawn_queue[0];
        var creep_parts = require('creep_' + creep_type).get_parts();
        var creep_name = this.gen_creep_name(creep_type);

        var spawns = _.filter(Game.spawns, {owner: 'MaicoTimmerman'});
        console.log(spawns);
        if(!spawns.length) return;




        var available_spawn_points = spawns.filter(function(spawn) {
            // TODO: canCreateCreep()
            return spawn.canCreateCreep(creep_parts, creep_name);
        });
        if(!available_spawn_points.length) return;

        spawn_point = available_spawn_points[0];
        this._spawn_creep(creep_type, spawn_point);

        Memory.spawnQue.pop();
    },
    gen_creep_name: function(creep_type) {
        var name_count = 0;
        var name = null;
        while(true) {
            name = creep_type + nameCount;
            if(Game.creeps[name] == undefined) break;
            name_count++;
        }
        return name;
    },
    _spawn_creep: function(creep_type, creep_parts, spawnPoint) {
        if(!spawnPoint) spawnPoint = Game.spawns.Spawn1;
        console.log('Spawning ' + role);
        spawnPoint.createCreep(creep_parts, creep_name, {role: creep_type});
    },
}
