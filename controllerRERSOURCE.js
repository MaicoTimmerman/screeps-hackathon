var collector = require('collector')
var harvester = require('harvester')
var builder = require('builder')

 module.exports = function(creepList) {
    
    var waveSource2 = 5
    
    for (var creepIndex in creepList) {
        var creep = creepList[creepIndex]
        if (creep.memory.role == 'harvester') {
            harvester(creep)
	    }
	    if (creep.memory.role == 'builder') {
	        builder(creep)
	    }
	    if (creep.memory.role == 'collector') {
	        collector(creep)
	    }
    }
}