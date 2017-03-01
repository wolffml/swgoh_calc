
//Code to fix the IE console issue
//I've had this code for a while and tried to find where I originally got it from, but the best I can come up with  is a guy at work named Jason McIntire.
if (!"console" in window || typeof console == "undefined") {
	var methods = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
	var emptyFn = function () {};
	window.console = {};
	for (var i = 0; i < methods.length; ++i) {
		window.console[methods[i]] = emptyFn;
	}
}

populateRaids = function () {
	var raids = data.getRaids();
	for (var i = 0; i < raids.items.length; i++) {
		if ( raids.items[i].valueOf() != "" ) {
			$('#bd_raid').append(new Option(raids.items[i], raids.items[i]));
			$('#bp_raid').append(new Option(raids.items[i], raids.items[i]));
		}
	}
}

bd_raidChange = function() {
	//First clear the Options list of entries
	$("#bd_level option").remove();
	$('#bd_level').append(new Option("Select Level", null));
	var selection = $("#bd_raid").val();
	var levels = data.getLevels(selection);
	for (var i = 0; i < levels.items.length; i++) {
		if ( levels.items[i].valueOf() != "" ) {
			$('#bd_level').append(new Option(levels.items[i], levels.items[i]));
		}
	}
	
}
bd_levelChange = function() {
	//First clear the Options list of entries
	$("#bd_phase option").remove();
	$('#bd_phase').append(new Option("Select Phase", null))
	var raidSelection = $("#bd_raid").val();
	var levelSelection = $("#bd_level").val();
	var phases = data.getPhases(raidSelection, levelSelection);
	console.log("Phases length:" + phases.items.length)
	for (var i = 0; i < phases.items.length; i++) {
		if ( phases.items[i].valueOf() != "" ) {
			$('#bd_phase').append(new Option(phases.items[i], phases.items[i]));
		}
	}
}

bp_raidChange = function() {
	//First clear the Options list of entries
	$("#bp_level option").remove();
	$('#bp_level').append(new Option("Select Level", null))
	var selection = $("#bp_raid").val();
	var levels = data.getLevels(selection);
	for (var i = 0; i < levels.items.length; i++) {
		if ( levels.items[i].valueOf() != "" ) {
			$('#bp_level').append(new Option(levels.items[i], levels.items[i]));
		}
	}
}
bp_levelChange = function() {
	//First clear the Options list of entries
	$("#bp_phase option").remove();
	$('#bp_phase').append(new Option("Select Phase", null))
	var raidSelection = $("#bp_raid").val();
	var levelSelection = $("#bp_level").val();
	var phases = data.getPhases(raidSelection, levelSelection);
	for (var i = 0; i < phases.items.length; i++) {
		if ( phases.items[i].valueOf() != "" ) {
			$('#bp_phase').append(new Option(phases.items[i], phases.items[i]));
		}
	}
}

function calcPercentDamage() {
	//Remove any error message if there is one.
	$("#bd_error").html("");
	//Set some variables
	var raidSelection = $("#bd_raid").val();
	var levelSelection = $("#bd_level").val();
	var phaseSelection = $("#bd_phase").val();
	
	var dmg =  data.getDamage(raidSelection, levelSelection, phaseSelection);
	console.log("Phase damage: " + dmg);
	var txtDamage = $("#bd_damage").val();
	console.log("Damage input: " + txtDamage);
	//try to convert txtDamage to a numeric value
	var numberDamage = parseInt(txtDamage);
	console.log("Damage converted: " + numberDamage);
	if (isNaN(numberDamage)){
		console.log("Invalid input.");
		//Display Error message
		$("#bd_error").html("Error with input \"Damage\".  Could not convert to integer.");
	} else {
		//do the math
		var percentDam = 100 * numberDamage / dmg;
		var stringPercentDamage = Math.round(100*percentDam)/100 + "%";
		$("#bd_answer").html(stringPercentDamage);
	}
}


function calcTotalDamage() {
	//Remove any error message if there is one.
	$("#bp_error").html("");
	//Set some variables
	var raidSelection = $("#bp_raid").val();
	var levelSelection = $("#bp_level").val();
	var phaseSelection = $("#bp_phase").val();
	
	var dmg =  data.getDamage(raidSelection, levelSelection, phaseSelection);
	console.log("Phase damage: " + dmg);
	var txtPercent = $("#bp_percent").val();
	console.log("Percent input: " + txtPercent + " (%)");
	//try to convert txtDamage to a numeric value
	var numberPercent = parseFloat(txtPercent) / 100;
	console.log("Percent converted: " + numberPercent);
	if (isNaN(numberPercent)){
		console.log("Invalid input.");
		//Display Error message
		$("#bp_error").html("Error with input \"Percentage\".  Could not convert to number.");
	} else {
		//do the math
		var totalDam = dmg * numberPercent;
		var stringTotalDamage = totalDam;
		$("#bp_answer").html(stringTotalDamage);
	}
}