module.exports = function() {
    var squads = []
    for (var creepName in Game.creeps) {
        var creep = Game.creeps[creepName]
        
        var creepSquad = creep.memory.squad
        if (creepSquad) {
            
            while(squads[creepSquad] ==  undefined) {
                squads.push([])
            }
            var memberObj = {
                "role" : creep.memory.role,
                "id" : creep.id
            }
            // squads[creepSquad].push(creep.memory.role)
            squads[creepSquad].push(memberObj)

        }
    }
    var squadMem = Memory.squad
    Memory.squad = squads
    
    // Memory.squad = squads
    
}