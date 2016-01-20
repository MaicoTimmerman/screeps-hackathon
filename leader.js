/* Guard module to controll attacking creeps
 * 
 * 
 */
module.exports = function(creep, target) {
    // To Do's: prioritize helealers
    if (target == undefined) {
        // console.log('undefined!')
        var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
            filter: function(obj) {
                if( obj.owner.username != 'Source Keeper' && Game.flags.RallyPoint.pos.getRangeTo(obj) < 20 ) {
                    return obj
                }
        }});
    }
    // console.log(inputTarget)
    var rallyPoint = Game.flags.RallyPoint
    
    creep.memory.target = target
    // console.log(target)
    if (target){
        
        if (creep.attack(target) == ERR_NOT_IN_RANGE && creep.pos.getRangeTo(rallyPoint) < 8 ) {
            creep.moveTo(target)
        } else if (creep.attack(target) == ERR_NOT_IN_RANGE && creep.pos.getRangeTo(target) <= 3 ) {
            creep.moveTo(target)
        } else if (creep.pos.getRangeTo(rallyPoint) >= 10) {
            creep.moveTo(rallyPoint)
        }
    }
    
    else {
        if (creep.pos.getRangeTo(rallyPoint) > 2) {
            creep.moveTo(rallyPoint)
        }
    }
}