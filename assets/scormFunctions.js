// Keep track of location in content by div number
var CurrentPage;
// Track initialized status so it is only called once
var AlreadyInitialized = false;

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
	var entryMode = retrieveDataValue( "cmi.entry" );

	// set a local variable to page 1
	var location = 1;

	// check whether resuming SCO
	if (entryMode == "resume") {
		// check if a prior location was set
		location = retrieveDataValue( "cmi.location" );

		// get the Error code from the last call
		var errorCode = retrieveLastErrorCode();

        //Save route and state for bookmark
	}
	// present page to learner
	console.log("Initialized")
}

function Terminate() {
    if(retrieveDataValue("cmi.completion_status") == "incomplete") {
        persistData();
		storeDataValue("cmi.success_status", "unknown");
		storeDataValue("adl.nav.request", "suspendAll");
    } else {
		storeDataValue("cmi.success_status", "passed");
	}
	terminateCommunication();
}

function doExit() {
	storeDataValue("cmi.exit", "normal");
	storeDataValue("adl.nav.request", "exitAll");

	Terminate();
	console.log("Did Exit")
}

function openLRC() {
	const newWindow = window.open("https://ssilrc.army.mil/resources/FMS/GFEBS/GFEBSLegacy/Launchers/L210E/html/index.html", "LRC", "width: 860, height: 600");
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

