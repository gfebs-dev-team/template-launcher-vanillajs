// Keep track of location in content by div number
var CurrentPage;
// Track initialized status so it is only called once
var AlreadyInitialized = false;

let startTime;
let endTime;

function CallInitialize(){
	if(!AlreadyInitialized){
		initializeCommunication();
		AlreadyInitialized = true;
	}
}

/*******************************************************************************
**
** This function sets the state of the sco.
**
** Inputs:  None
**
** Return:  None
**
*******************************************************************************/
function Initialize() {
	// make initialize call
	CallInitialize();

	// set completion status to incomplete
	SetIncomplete();

	// set exit to suspended
	storeDataValue( "cmi.exit","suspend" );

	// check for resumed entry state
	let entryMode = retrieveDataValue( "cmi.entry" );

	// set a local variable to page 1
	let location = 1;

	startTime = new Date;

	// check whether resuming SCO
	if (entryMode == "resume") {
		// check if a prior location was set
		location = retrieveDataValue( "cmi.location" );

		// get the Error code from the last call
		let errorCode = retrieveLastErrorCode();

        //Save route and state for bookmark
	} else {
		CurrentPage = location;
		storeDataValue("cmi.location", CurrentPage);
	}
	// present page to learner
	console.log("Initialized")
}

function Terminate() {
    if(retrieveDataValue("cmi.completion_status") == "incomplete") {
		storeDataValue("cmi.success_status", "unknown");
		storeDataValue("adl.nav.request", "suspendAll");
    } else {
		storeDataValue("cmi.success_status", "passed");
	}
	terminateCommunication();
}

function doExit() {
	endTime = new Date();
	let totalMilliseconds = (endTime.getTime() - startTime.getTime());
	let scormTime = ConvertMilliSecondsIntoSCORM2004Time(totalMilliseconds);
	
	storeDataValue("cmi.session_time", scormTime);
	storeDataValue("cmi.exit", "normal");
	storeDataValue("adl.nav.request", "exitAll");
	persistData();

	Terminate();
	console.log("Did Exit")
}

function openLRC() {
	const newWindow = window.open("https://ssilrc.army.mil/resources/FMS/GFEBS/GFEBSLegacy/Launchers/L210E/html/index.html", "LRC", "width: 860, height: 600");
	//storeDataValue("cmi.location", CurrentPage);
	storeDataValue("cmi.suspend_data", "suspended");
	persistData();
	newWindow.focus();
	SetComplete();
}

/*******************************************************************************
**
** Sets the SCO completion status to incomplete.
**
** Inputs:  None
**
** Return:  None
**
*******************************************************************************/
function SetIncomplete (){
	const status = retrieveDataValue( "cmi.completion_status" );
	if (status != "completed"){
		storeDataValue( "cmi.completion_status", "incomplete" );
	}
}

/*******************************************************************************
**
** Sets the SCO completion status to complete.
**
** Inputs:  None
**
** Return:  None
**
*******************************************************************************/
function SetComplete (){
	storeDataValue( "cmi.completion_status", "completed" );
	console.log("Set Complete")
}

function DisplayPage(location) {
    return 0;
}

function ConvertMilliSecondsIntoSCORM2004Time(intTotalMilliseconds){
	
	var ScormTime = "";
	
	var HundredthsOfASecond;	//decrementing counter - work at the hundreths of a second level because that is all the precision that is required
	
	var Seconds;	// 100 hundreths of a seconds
	var Minutes;	// 60 seconds
	var Hours;		// 60 minutes
	var Days;		// 24 hours
	var Months;		// assumed to be an "average" month (figures a leap year every 4 years) = ((365*4) + 1) / 48 days - 30.4375 days per month
	var Years;		// assumed to be 12 "average" months
	
	var HUNDREDTHS_PER_SECOND = 100;
	var HUNDREDTHS_PER_MINUTE = HUNDREDTHS_PER_SECOND * 60;
	var HUNDREDTHS_PER_HOUR   = HUNDREDTHS_PER_MINUTE * 60;
	var HUNDREDTHS_PER_DAY    = HUNDREDTHS_PER_HOUR * 24;
	var HUNDREDTHS_PER_MONTH  = HUNDREDTHS_PER_DAY * (((365 * 4) + 1) / 48);
	var HUNDREDTHS_PER_YEAR   = HUNDREDTHS_PER_MONTH * 12;
	
	HundredthsOfASecond = Math.floor(intTotalMilliseconds / 10);
	
	Years = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_YEAR);
	HundredthsOfASecond -= (Years * HUNDREDTHS_PER_YEAR);
	
	Months = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_MONTH);
	HundredthsOfASecond -= (Months * HUNDREDTHS_PER_MONTH);
	
	Days = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_DAY);
	HundredthsOfASecond -= (Days * HUNDREDTHS_PER_DAY);
	
	Hours = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_HOUR);
	HundredthsOfASecond -= (Hours * HUNDREDTHS_PER_HOUR);
	
	Minutes = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_MINUTE);
	HundredthsOfASecond -= (Minutes * HUNDREDTHS_PER_MINUTE);
	
	Seconds = Math.floor(HundredthsOfASecond / HUNDREDTHS_PER_SECOND);
	HundredthsOfASecond -= (Seconds * HUNDREDTHS_PER_SECOND);
	
	if (Years > 0) {
		ScormTime += Years + "Y";
	}
	if (Months > 0){
		ScormTime += Months + "M";
	}
	if (Days > 0){
		ScormTime += Days + "D";
	}
	
	//check to see if we have any time before adding the "T"
	if ((HundredthsOfASecond + Seconds + Minutes + Hours) > 0 ){
		
		ScormTime += "T";
		
		if (Hours > 0){
			ScormTime += Hours + "H";
		}
		
		if (Minutes > 0){
			ScormTime += Minutes + "M";
		}
		
		if ((HundredthsOfASecond + Seconds) > 0){
			ScormTime += Seconds;
			
			if (HundredthsOfASecond > 0){
				ScormTime += "." + HundredthsOfASecond;
			}
			
			ScormTime += "S";
		}
		
	}
	
	if (ScormTime == ""){
		ScormTime = "0S";
	}
	
	ScormTime = "P" + ScormTime;
	
	return ScormTime;
}

