// JavaScript Document

$(document).ready(function() { 
	
	// Dynamically load the navigation bar and change log
	$("#navbar").load("./_navigationbar.html");
	// $("#changelog").load("./_changelog.html");
	// $("#eventscolumn").load("./_events.html");

	// Flipping Panels
	// - Set initial state
	$(document).find(".panel").slideUp();
	// - Click function toggles
	$(".flip").click(function() {
		$(this).parent().find(".panel").slideToggle("slow");
		if ($(this).find(".expansion").filter("a").text() == "Expand") {
			$(this).find(".expansion").filter("a").text("Collapse");
			$(this).find(".expansion").filter("i").removeClass("fa-angle-double-down");
			$(this).find(".expansion").filter("i").addClass("fa-angle-double-up");
		} else {
			$(this).find(".expansion").filter("a").text("Expand");
			$(this).find(".expansion").filter("i").removeClass("fa-angle-double-up");
			$(this).find(".expansion").filter("i").addClass("fa-angle-double-down");
		}
	});

	// Flipping Panels (Multi-Tiered - Outer)
	$(".flip-outer").click(function() {
		$(this).parent().parent().find(".events").slideToggle("slow");
		if ($(this).text() == "Expand") {
			$(this).text("Collapse");
			$(this).siblings("i").removeClass("fa-angle-double-down");
			$(this).siblings("i").addClass("fa-angle-double-up");
		} else {
			$(this).text("Expand");
			$(this).siblings("i").removeClass("fa-angle-double-up");
			$(this).siblings("i").addClass("fa-angle-double-down");
		}
	});
	
	// Flipping Panels (Multi-Tiered - Inner)
	$(".flip-inner").click(function() {
		//$(this).parent().parent().find(".panel-inner").css({"border":"2px solid red"});
		$(this).parent().parent().find(".panel-inner").slideToggle("slow");
		if ($(this).text() == "Expand") {
			$(this).text("Collapse");
			$(this).siblings("i").removeClass("fa-angle-double-down");
			$(this).siblings("i").addClass("fa-angle-double-up");
		} else {
			$(this).text("Expand");
			$(this).siblings("i").removeClass("fa-angle-double-up");
			$(this).siblings("i").addClass("fa-angle-double-down");
		}
	});
	
	// Hide grading purposes if on a live site
	if( $(location).attr("protocol") === "http:" || $(location).attr("protocol") === "https:" ) {
		$("#gradingpurposes").hide();
	}
});