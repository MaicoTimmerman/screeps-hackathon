module.exports = function(spawn) {

    // Array.prototype.diff = function(a) {
    //     return this.filter(function(i) {return a.indexOf(i) < 0;});
    // };
    
    // Amount of collecters to source:
    // ceil(2*distToSource*9/carry)
    
    var squadMem = Memory.squad
    for (i in squadMem) {
        if (squadMem[i].length < 5) {
            console.log(i+": "+squadMem[i].length)
        }
    }
    if (squadMem.length == 0) {
        squadMem = [[]]
    }
    // console.log(squadMem)
    var body = {'guard':[TOUGH,MOVE,ATTACK,MOVE,ATTACK],
                'harvester':[WORK,WORK,CARRY,MOVE],
                'collector':[CARRY,MOVE],
                'ranger':[MOVE,RANGED_ATTACK,ATTACK],
                'healer':[MOVE,HEAL],
                'builder':[WORK,CARRY,CARRY,MOVE,MOVE],
                'leader':[TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,ATTACK]
    }
    var squadMakeUp = ['leader','guard','healer','guard','ranger'] // ALSO USED IN controllerCOMBAT!!!
    var roomContrl = spawn.room.controller
    var maxSquads = 10 * roomContrl.level
    var squadSoftCap = 1
    var maxCollectors = 2
    var maxHarvesters = 3
    var maxBuilders = 2
    
    var harvesters = []
    var collectors = []
    var guards = []
    var builders = []

    for (var i in squadMem) {
        if (squadMem[i].length < squadMakeUp.length) {
            var currentSquad = squadMem[i]
            var squadIndex = i
            // console.log("build more")
            break
        } else if (i == (squadMem.length -1) && squadMem.length != maxSquads){
            var currentSquad = []
            var squadIndex = squadMem.length
            squadMem.push(currentSquad)
        } else {
            var currentSquad = null
            var squadIndex = null
        }
    }
    for (var creepName in Game.creeps) {
        var creep = Game.creeps[creepName]
        if (creep){
            var role = creep.memory.role
            if (role == 'harvester') {
                harvesters.push(creep)
            }
            if (role == 'collector') {
                collectors.push(creep)
            }
            if (role == 'guard' || role == 'leader') {
                guards.push(creep)
            }
            if (role == 'builder') {
                builders.push(creep)
                
            }
        }
    }
    if (harvesters.length <= guards.length && harvesters.length < maxHarvesters) {
        if (spawn.canCreateCreep(body['harvester']) == OK) {
            spawn.createCreep(body['harvester'],null, {role:'harvester'})
            console.log("Building: harvester")
        }
        // console.log(JSON.stringify(JSON.parse(RawMemory.get())))
        
    }
    else if (guards.length > collectors.length && collectors.length < maxCollectors) {
        if (spawn.canCreateCreep(body['collector']) == OK) {
            spawn.createCreep(body['collector'], null, {role:'collector'})
            console.log("Building: collector")
        }
    }
    else if (builders.length < maxBuilders && squadMem.length > squadSoftCap){ 
        if (spawn.canCreateCreep(body['builder']) == OK) {
            spawn.createCreep(body['builder'],null,{role:'builder'})
            console.log('Building: builder')
        }
    }
    // TODO: Build diverse creeps (healers and ranged)
    else if (currentSquad != null) {
        var tempQ = squadMakeUp
        for (var i in currentSquad) {
            for (var j in tempQ) {
                // console.log(currentSquad[i])
                // console.log(tempQ[j])
                if (tempQ[j] == currentSquad[i].role) {
                    tempQ.splice(j, 1)
                    break;
                }
            }
        }
        
        var toBuild = tempQ[0]
        // var toBuild = squadMakeUp[currentSquad.length]
        if (spawn.canCreateCreep(body[toBuild]) == OK) {
            spawn.createCreep(body[toBuild],null, {role:toBuild, squad:squadIndex})
            // currentSquad.push(toBuild)
            // squadMem[squadIndex] = currentSquad
            console.log("Building: "+toBuild)
            // Memory.squad = squadMem
        }
    }
}