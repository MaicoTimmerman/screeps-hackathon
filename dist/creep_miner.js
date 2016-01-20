module.exports = {
    get_parts: function() {
        return [WORK, WORK, MOVE];
    },
    run: function(creep) {
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
}
