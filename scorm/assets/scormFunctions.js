// Keep track of location in content by div number
var CurrentPage;
// Track initialized status so it is only called once
var AlreadyInitialized = false;

let startTime
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

	startTime = Date.now();

	// check whether resuming SCO
	if (entryMode == "resume") {
		// check if a prior location was set
		location = retrieveDataValue( "cmi.location" );

		// get the Error code from the last call
		let errorCode = retrieveLastErrorCode();

        //Save route and state for bookmark
	} else {
		//currentPage = location;
	}
	// present page to learner
	console.log("Initialized")
}

function Terminate() {
    if(retrieveDataValue("cmi.completion_status") == "incomplete") {
        storeDataValue("cmi.suspend_data", "suspended");
		storeDataValue("cmi.success_status", "unknown");
		storeDataValue("adl.nav.request", "suspendAll");
		persistData();
    } else {
		storeDataValue("cmi.success_status", "passed");
	}
	terminateCommunication();
}

function doExit() {
	/*endTime = Date.now();
	let sessionTime = endTime - startTime; 
  	sessionTime = Math.round(sessionTime/100)/10;
	
	storeDataValue("cmi.session_time", `P${sessionTime}S`);*/
	storeDataValue("cmi.exit", "normal");
	storeDataValue("adl.nav.request", "exitAll");

	Terminate();
	console.log("Did Exit")
}

function openLRC() {
	const newWindow = window.open("https://ssilrc.army.mil/resources/FMS/GFEBS/GFEBSLegacy/Launchers/L210E/html/index.html", "LRC", "width: 860, height: 600");
	//storeDataValue("cmi.location", CurrentPage);
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

