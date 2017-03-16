
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

function populateURLParams(){
//populateURLParams = function () {
	var v_bd_raid = getParameterByName("bd_raid");
	if (v_bd_raid != null & v_bd_raid != ""){
		//Means a url parameter was received with specific data
		console.log("bd_raid parameter value:" + v_bd_raid);
		$('#bd_raid').val(v_bd_raid);
		//Now that the raid has been selected, need to populate the levels drop down
		bd_raidChange();
		//See if there is a Level Paramater Supplied
		var v_bd_level = getParameterByName("bd_level");
		if (v_bd_level != ""){
			console.log("bd_level: " + v_bd_level);
			$('#bd_level').val(v_bd_level);
			bd_levelChange();
			//See if there is a phase Parameter
			var v_bd_phase = getParameterByName("bd_phase");
			if (v_bd_phase != ""){
				console.log("bd_phase: " + v_bd_phase);
				$('#bd_phase').val(v_bd_phase);
				//If there is a damage amount set, now run the calculate code
				var v_bd_damage = getParameterByName("bd_damage");
				if (v_bd_damage != "") {
					console.log("bd_damage: " + v_bd_damage);
					$('#bd_damage').val(v_bd_damage);
					calcPercentDamage();
				}
			}
		}
	}
	var v_bp_raid = getParameterByName("bp_raid");
	if (v_bp_raid != ""){
		//Means a url parameter was received with specific data
		console.log("bp_raid parameter value:" + v_bp_raid);
		$('#bp_raid').val(v_bp_raid);
		//Now that the raid has been selected, need to populate the levels drop down
		bp_raidChange();
		//See if there is a Level Paramater Supplied
		var v_bp_level = getParameterByName("bp_level");
		if (v_bp_level != ""){
			console.log("bp_level: " + v_bp_level);
			$('#bp_level').val(v_bp_level);
			bp_levelChange();
			//See if there is a phase Parameter
			var v_bp_phase = getParameterByName("bp_phase");
			if (v_bp_phase != ""){
				console.log("bp_phase: " + v_bp_phase);
				$('#bp_phase').val(v_bp_phase);
				//If there is a damage amount set, now run the calculate code
				var v_bp_percent = getParameterByName("bp_percent");
				if (v_bp_percent != "") {
					console.log("bp_percent: " + v_bp_percent);
					$('#bp_percent').val(v_bp_percent);
					calcTotalDamage();
				}
			}
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
		$("#bd_answer").val(stringPercentDamage);
	}
	
	//Now we want to provide a URL for this
	//var pathname = window.location.pathname;
	var pathname = $(location).attr('protocol')
				 + "//"
				 + $(location).attr('host')
				 + "/"
				 + $(location).attr('pathname');
	pathname += "?bd_raid=" + encodeURIComponent(raidSelection) 
				+ "&bd_level=" + encodeURIComponent(levelSelection) 
				+ "&bd_phase=" + encodeURIComponent(phaseSelection)
				+ "&bd_damage=" + encodeURIComponent(txtDamage);
	console.log(pathname);
	$('#bd_url').val(pathname);
	$("#bd_url_div").removeClass('hidden');
}

// file:////C:/Users/Matthew/git/swgoh_calc/WebContent/index.html?bd_raid=AAT&bd_level=Heroic&bd_phase=Phase%201&bd_damage=100000

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
		$("#bp_answer").val(stringTotalDamage);
	}
	
	//Now we want to provide a URL for this
	var pathname = $(location).attr('protocol')
				 + "//"
				 + $(location).attr('host')
				 + "/"
				 + $(location).attr('pathname');
	pathname += "?bp_raid=" + encodeURIComponent(raidSelection) 
				+ "&bp_level=" + encodeURIComponent(levelSelection) 
				+ "&bp_phase=" + encodeURIComponent(phaseSelection)
				+ "&bp_percent=" + encodeURIComponent(txtPercent);
	console.log(pathname);
	$('#bp_url').val(pathname);
	$("#bp_url_div").removeClass('hidden');
}
/* Function to get Parameters and try to populate form values.*/
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}