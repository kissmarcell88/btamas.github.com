$(function(){
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

var cvData = [
	{
		"type" : "timeline",
		"title" : "Professional experience",
		"colorArray" : ["blue", "red", "yellow", "green"],
		"data" : [{
			"position" : "WEB Developer",
			"company" : "freenet Group",
			"description" : "",
			"lDescription" : "Working on the server-side (keywords: Linux, PHP, MySQL), optimizing existing functions and developing new ones. Also analysing, implementing and testing new technologies. Work is going according to Scrum.",
			"level" : "",
			"location" : "Hamburg, Germany",
			"from" : "June 2013 -",
			"to" : "",
			"duration" : "",
		},{
			"position" : "PHP Developer",
			"company" : "Brozie Kft.",
			"description" : "",
			"lDescription" : "As a PHP developer I'm the responsible person for the business part (my.brozie.com) and also for the administration system (admin.brozie.com). Beside developing the backend, I'm coding the client-side also. I find my job really challanging, it's a great oppertunity to try and learn new things.",
			"level" : "",
			"location" : "Budapest, Hungary",
			"from" : "August 2012 -",
			"to" : "June 2013",
			"duration" : "(11 months)",
		},{
			"position" : "Software Developer and Project Manager",
			"company" : "Self Employed",
			"description" : "",
			"lDescription" : "Development and Project Management of web and mobile (iOS, android) applications",
			"level" : "",
			"location" : "Budapest, Hungary",
			"from" : "February 2012 -",
			"to" : "August 2012",
			"duration" : "(7 months)",
		},{
			"position" : "Java Developer",
			"company" : "Ramasoft Zrt.",
			"description" : "",
			"lDescription" : "At Ramasoft I took part in the development of a portfolio management system, which was built on Java EE (Tomcat server), using complex data-structures (MySQL, MSSQL, Oracle SQL) and great client-side technics. I found the work really interesting, because my programming knowledge could met my interest in financial area perfectly.",
			"level" : "",
			"from" : "January 2011 -",
			"to" : "January 2012",
			"location" : "Budapest, Hungary",
			"duration" : "(1 year 1 month)",
		},{
			"position" : "Software Engineer",
			"company" : "Hewlett-Packard",
			"description" : "",
			"lDescription" : "I worked here on my Project Laboratory Research - using ABAP and WebDynpro.",
			"level" : "",
			"from" : "February 2009 -",
			"to" : "June 2010",
			"location" : "Budapest, Hungary",
			"duration" : "(1 year 5 month)",
		},{
			"position" : "English Interpreter",
			"company" : "Filtrona Filters",
			"description" : "",
			"lDescription" : "Interpretation of foreign trainers for employees.",
			"level" : "",
			"from" : "September 2008 -",
			"to" : "February 2009",	
			"location" : "Budapest, Hungary",
			"duration" : "(6 month)",
		},{
			"position" : "WEB Developer",
			"company" : "Gaia Kft.",
			"description" : "",
			"lDescription" : "Development of a video technology company’s e-commerce system.",
			"level" : "",
			"from" : "January 2007 -",
			"to" : "March 2008",
			"location" : "Budapest, Hungary",
			"duration" : "(1 year 3 month)",
		}]
	},
	{
		"type" : "timeline",
		"title" : "Educational background",
		"colorArray" : ["blue", "red", "yellow", "green"],
		"data" : [{
			"position" : "Budapest University of Technology and Economics",
			"company" : "Master of Science, Business Informatics",
			"description" : "Specialization: Service Sciences Management and Engineering",
			"lDescription" : "Thesis topic: Flexible portfolio management (Java)<br/>Activities and Societies: Computer Graphics lecturer",
			"level" : "",
			"from" : "2011 - 2013",
			"to" : "",
			"duration" : "",
		},{
			"position" : "Budapest University of Technology and Economics",
			"company" : "Bachelor of Science, IT Engineering",
			"description" : "Specialization: Enterprise Information Systems",
			"lDescription" : "Thesis topic: Performance test and master data synchronization of a financial system<br/>Activities and Societies: University Judo Team member",
			"level" : "",
			"from" : "2007 - 2010",
			"to" : "",
			"duration" : "",
		}]
	},
	{
		"type" : "timeline",
		"title" : "Languages",
		"colorArray" : ["blue", "red", "yellow", "green"],
		"data" : [{
			"position" : "Hungarian",
			"company" : "Native proficiency",
			"description" : "",
			"lDescription" : "",
			"level" : "Native",
			"from" : "",
			"to" : "",
			"duration" : "",
		},{
			"position" : "English",
			"company" : "Full professional proficiency",
			"description" : "",
			"lDescription" : "",
			"level" : "Type: C1",
			"from" : "",
			"to" : "",
			"duration" : "",
		},{
			"position" : "German",
			"company" : "Professional working proficiency",
			"description" : "",
			"lDescription" : "",
			"level" : "Type: B2+",
			"from" : "",
			"to" : "",
			"duration" : "",
		}]
	},
	{
		"type" : "timeline",
		"title" : "Professional Knowledge",
		"colorArray" : ["blue", "red", "yellow", "green"],
		"data" : [{
			"position" : "Fundamental Knowledge",
			"company" : "OOP, MVC, ORM, TDD, SQL, IT Security, Design Patterns, Linux, Eclipse IDE, Git",
			"description" : "",
			"lDescription" : "",
			"level" : "",
			"from" : "",
			"to" : "",
			"duration" : "",
		},{
			"position" : "PHP",
			"company" : "Kohana, Yii, Codeigniter, Lithium, Zend Framework, Wordpress",
			"description" : "",
			"lDescription" : "",
			"level" : "",
			"from" : "",
			"to" : "",
			"duration" : "",
		},{
			"position" : "JavaScript",
			"company" : "NodeJS, jQuery, jQuery UI, AJAX, Backbone",
			"description" : "",
			"lDescription" : "",
			"level" : "",
			"from" : "",
			"to" : "",
			"duration" : "",
		},{
			"position" : "General Web Development",
			"company" : "HTML5, CSS3, Sitebuild, Twitter Bootstrap, Jade, LESS",
			"description" : "",
			"lDescription" : "",
			"level" : "",
			"from" : "",
			"to" : "",
			"duration" : "",
		},{
			"position" : "Other Languages, Tools and Knowledge",
			"company" : "Phonegap, C++, OpenGL, Java EE, Hibernate, <br/>Project Management, Scrum, Entrepreneurship, Lean Startup, Google Analytics",
			"description" : "",
			"lDescription" : "",
			"level" : "",
			"from" : "",
			"to" : "",
			"duration" : "",
		}]
	},
//	{
//		"type" : "timeline",
//		"title" : "Qualifications",
//		"colorArray" : ["blue", "red", "yellow", "green"],
//		"data" : [{
//			"position" : "Driver License",
//			"company" : "Category B",
//			"description" : "",
//			"lDescription" : "",
//			"level" : "",
//			"from" : "2005 -",
//			"to" : "",
//			"duration" : "",
//		}]
//	},
	{
		"type" : "timeline",
		"title" : "Organizations",
		"colorArray" : ["blue", "red", "yellow", "green"],
		"data" : [{
			"position" : "Member of Mensa HungarIQa",
			"company" : "<a href='http://www.mensa.org' target='_blank'>http://www.mensa.org</a>",
			"description" : "",
			"lDescription" : "",
			"level" : "",
			"from" : "2010 -",
			"to" : "",
			"duration" : "",
		}]
	},
	{
		"type" : "custom",
		"title" : "Interests",
		"content" : "Reading, Travelling, Different sportarts, Photography"
	}
//	,
//	{
//		"type" : "custom",
//		"title" : "Interests",
//		"content" : [1,2,3,4]
//	}
	
]