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
			
			$.each(value.data, function(dIndex, eventData){
				var eventContainer = $("<div>").addClass("lifeEvent " + colorArray[dIndex % colorArray.length]);
				
				var eventDate = $("<div>").addClass("eventDate");
				eventDate.append($("<div>").html(eventData.level));
				eventDate.append($("<div>").html(eventData.from));
				eventDate.append($("<div>").html(eventData.to));
				eventDate.append($("<div>").addClass("normal").html(eventData.duration));
				
				var eventHtml = $("<div>").addClass("eventData");
				eventHtml.append($("<div>").addClass("timelineDot").html($("<div>")));
				eventHtml.append($("<div>").addClass("eventPosition").html(eventData.title));
				eventHtml.append($("<div>").addClass("eventCompany").html(eventData.subtitle));
				eventHtml.append($("<div>").addClass("eventLocation").html(eventData.location));
				eventHtml.append($("<div>").addClass("eventDescription").html(eventData.description));
				eventHtml.append($("<div>").addClass("clear"));
				eventHtml.append($("<div>").addClass("eventLongDescription").html(eventData.lDescription));
				
				eventContainer.append(eventDate);
				eventContainer.append(eventHtml);
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
