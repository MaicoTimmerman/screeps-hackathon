var _ = require('lodash')

module.exports = {
    init_spawn_queue: function() {
        if (Memory.spawn_queue === undefined)
            Memory.spawn_queue = [
                'harvester',
                'guard',
                'harvester',
                'guard',
                'healer',
                'guard',
                'harvester',
                'guard',
                'guard',
                'guard',
                'guard',
                'healer',
                'guard',
                'guard',
                'guard',
                'guard',
                'healer',
                'guard',
                'guard',
                'guard',
                'guard',
                'guard',
                'guard',
                'guard',
                'guard',
                'healer',
                'guard',
                'guard',
                'guard',
                'guard',
                'guard',
                'guard',
                'healer',
                'guard',
                'guard',
                'guard',
                'guard',
                'guard',
                'healer',
                'guard',
                'guard',
                'guard',
                'guard',
                'guard',
                'healer',
                'guard',
                'guard',
                'guard',
            ];
    },
    check_spawn_queue: function() {
    },
    add_spawn_queue: function(creep_type, priority) {
        this.init_spawn_queue();

        if(priority != undefined && priority === true)
            Memory.spawn_queue.push(creep_type);
        else
            Memory.spawn_queue.unshift(creep_type);
    },
    gen_creep_name: function(creep_type) {
        var name_count = 0;
        var name = null;
        while(true) {
            name = creep_type + name_count;
            if(Game.creeps[name] == undefined) break;
            name_count++;
        }
        return name;
    },
    spawn_next_creep: function() {
        this.init_spawn_queue();

        if(!Memory.spawn_queue.length) return;

        var creep_type = Memory.spawn_queue[0];
        var creep_parts = require('creep_' + creep_type).get_parts();
        var creep_name = this.gen_creep_name(creep_type);

        var spawn_points = _.filter(Game.spawns, function(spawn) {
            return spawn.canCreateCreep(creep_parts) == OK;
        });

        if(!spawn_points.length) return;

        var spawn_point = spawn_points[0];
        this._spawn_creep(creep_type, creep_parts, creep_name, spawn_point);
    },
    _spawn_creep: function(creep_type, creep_parts, creep_name, spawnPoint) {
        if(!spawnPoint) spawnPoint = Game.spawns.Spawn1;
        console.log('Spawning ' + creep_type + ' (' + creep_parts + ')');
        spawnPoint.createCreep(creep_parts, creep_name, {role: creep_type});
        Memory.spawn_queue.shift();
    },
}
