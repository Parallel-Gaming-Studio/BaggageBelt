// JavaScript Document

$(document).ready(function() { 
	
	// Declare variables
	var page = $("#pagename").text();
		
	// Hide the page name
	// Note: If hidden within the html, the full text does not read properly
	$("#pagename").attr("style", "display:none");
	
	// Activate the appropriate NavBar item
	if (page == "index.html") {
		$("#nav_index").addClass("active");
	} else if (page == "lab01.html") {
		$("#nav_lab01").addClass("active");
	} else if (page == "lab02.html") {
		$("#nav_lab02").addClass("active");
	} else if (page == "lab03.html") {
		$("#nav_lab03").addClass("active");
	} else if (page == "lab04.html") {
		$("#nav_lab04").addClass("active");
	} else if (page == "lab05.html") {
		$("#nav_lab05").addClass("active");
	} else if (page == "lab06.html") {
		$("#nav_lab06").addClass("active");
	} else if (page == "project.html") {
		$("#nav_prjct").addClass("active");
	} else if (page == "rpg.html") {
		$("#nav_rpg").addClass("active");
	} else if (page == "rts.html") {
		$("#nav_rts").addClass("active");
	}
});