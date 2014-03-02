$(function(){
	$("#exportToPdf").click(function(){
		var doc = new jsPDF();

		// We'll make our own renderer to skip this editor
		var specialElementHandlers = {
			'#editor': function(element, renderer){
				return true;
			}
		};

		// All units are in the set measurement for the document
		// This can be changed to "pt" (points), "mm" (Default), "cm", "in"
		doc.fromHTML($('#contentToExport').html(), 15, 15, {
			'width': 170, 
			'elementHandlers': specialElementHandlers
		});
		doc.save("marcell_kiss_it_engineer.pdf");
	});
	
	//initial loading
	var dataContainer = $("#dataContainer");
	dataContainer.html("");
	$.each(cvData, function(index, value){

		dataContainer.append($("<div>").addClass("sectionTitle").html(value.title));
		
		if (value.type == "timeline") {
			var colorArray = value.colorArray;
			
			$.each(value.data, function(dIndex, dValue){
				var eventContainer = $("<div>").addClass("lifeEvent " + colorArray[dIndex % colorArray.length]);
				
				var eventDate = $("<div>").addClass("eventDate");
				eventDate.append($("<div>").html(dValue.level));
				eventDate.append($("<div>").html(dValue.from));
				eventDate.append($("<div>").html(dValue.to));
				eventDate.append($("<div>").addClass("normal").html(dValue.duration));
				
				var eventData = $("<div>").addClass("eventData");
				eventData.append($("<div>").addClass("timelineDot").html($("<div>")));
				eventData.append($("<div>").addClass("eventPosition").html(dValue.position));
				eventData.append($("<div>").addClass("eventCompany").html(dValue.company));
				eventData.append($("<div>").addClass("eventLocation").html(dValue.location));
				eventData.append($("<div>").addClass("eventDescription").html(dValue.description));
				eventData.append($("<div>").addClass("clear"));
				eventData.append($("<div>").addClass("eventLongDescription").html(dValue.lDescription));
				
				eventContainer.append(eventDate);
				eventContainer.append(eventData);
				dataContainer.append(eventContainer);
			});
		} else if (value.type == "custom") {
			var result = "";
			if ($.isArray(value.content)) {
				var result = $("<ul>");
				$.each(value.content, function(index, value){
					result.append($("<li>").html(value));
				});
			} else {
				result = value.content;
			}
			console.log(result);
			dataContainer.append($("<div>").addClass("customContent").html(result));
		}
	});
	
	$(".lifeEvent").click(function(){
		
		// Target element
		var el = $(this).find(".eventLongDescription");
		if (el.is(":hidden")) {
			// Open the target description
			var autoHeight = el.css("height", "auto").height();
			el.height(0).show().animate(
				{ height: autoHeight },
				200,
				function(){
					$(this).css("height","auto");
				}
			);

			// Close all descriptions
			$(".eventLongDescription").not(
				$(this).find(".eventLongDescription")
			).animate(
				{height: "0px"},
				200,
				function(){
					$(this).hide();
				}
			);
		} else {
			// Hide the target element
			el.animate(
				{height: "0px"},
				200,
				function(){
					$(this).hide();
				}
			);
		}
	});

});
