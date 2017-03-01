//Damage by phase

var data = {};

data.damage = [
	{"type": "Rancor", "level": "Level 6", "phaseName": "Phase 1", "phaseDamage": 6000000}, 
	{"type": "Rancor", "level": "Level 6", "phaseName": "Phase 2", "phaseDamage": 10000000}, 
	{"type": "Rancor", "level": "Level 6", "phaseName": "Phase 3", "phaseDamage": 11000000}, 
	{"type": "Rancor", "level": "Level 6", "phaseName": "Phase 4", "phaseDamage": 7000000},
	
	{"type": "Rancor", "level": "Level 7 - Heroic", "phaseName": "Phase 1", "phaseDamage": 1872000}, 
	{"type": "Rancor", "level": "Level 7 - Heroic", "phaseName": "Phase 2", "phaseDamage": 3036000}, 
	{"type": "Rancor", "level": "Level 7 - Heroic", "phaseName": "Phase 3", "phaseDamage": 3288000}, 
	{"type": "Rancor", "level": "Level 7 - Heroic", "phaseName": "Phase 4", "phaseDamage": 2109000},
	
	{"type": "AAT", "level": "Normal", "phaseName": "Phase 1", "phaseDamage": 15600000}, 
	{"type": "AAT", "level": "Normal", "phaseName": "Phase 2", "phaseDamage": 22700000}, 
	{"type": "AAT", "level": "Normal", "phaseName": "Phase 3", "phaseDamage": 12250000}, 
	{"type": "AAT", "level": "Normal", "phaseName": "Phase 4", "phaseDamage": 13550000},
	
	{"type": "AAT", "level": "Heroic", "phaseName": "Phase 1", "phaseDamage": 4300000}, 
	{"type": "AAT", "level": "Heroic", "phaseName": "Phase 2", "phaseDamage": 19200000}, 
	{"type": "AAT", "level": "Heroic", "phaseName": "Phase 3", "phaseDamage": 12000000}, 
	{"type": "AAT", "level": "Heroic", "phaseName": "Phase 4", "phaseDamage": 12000000}
]

data.getRaids = function(){

	var raidTypes = JSLINQ(data.damage)
					.OrderBy(function(item){return item.type;})
					.Distinct(function(item){return item.type;});
	//funcAreasDist.items.sort( ascending );
	return raidTypes;
};

data.getLevels = function(raidType){
	console.log("Finding Levels for Raid Type: " + raidType);
	var levels = JSLINQ(data.damage)
						.Where(function(item){return item.type == raidType;})
						.OrderBy(function(item){return item.level;})
						.Distinct(function(item){return item.level;});
	return levels;
};

data.getPhases = function(raidType, level){
	console.log("Finding Phases for Raid Type: " + raidType + " and Level: " + level);
	var phases = JSLINQ(data.damage)
						.Where(function(item){return item.type == raidType;})
						.Where(function(item){return item.level == level;})
						.OrderBy(function(item){return item.phaseName;})
						.Distinct(function(item){return item.phaseName;});
	return phases;
};

data.getDamage = function(raidType, level, phase){
	console.log("Finding Damage for Raid Type: " + raidType + " Level: " + level + " Phase: " + phase);
	var damage = JSLINQ(data.damage)
						.Where(function(item){return item.type == raidType;})
						.Where(function(item){return item.level == level;})
						.Where(function(item){return item.phaseName == phase;})
						.OrderBy(function(item){return item.phaseDamage;})
						.Distinct(function(item){return item.phaseDamage;});
	return damage.items[0];
}
