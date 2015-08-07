var observableModule = require("data/observable");
var observableArray = require("data/observable-array");
var viewModule = require("ui/core/view");

// To import the "ui/frame" module:
var frames = require("ui/frame");

var http = require("http");

var tasks = new observableArray.ObservableArray([]);
var pageData = new observableModule.Observable();
var page;

var stationsJson = [];

http.request({ 
	url: "http://musicdiver.ru/Home/GetStationsJson", 
	method: "POST",
	headers: { "Content-Type": "application/json; charset=utf-8" }
	//,		content: { 'stationId': 4 }
}).then(function (response) {
	// Argument (response) is HttpResponse!
	//var statusCode = response.statusCode;
	stationsJson = response.content.toJSON();
	for (var i = 0; i < stationsJson.length; i++) {
		tasks.push({ 
			name: stationsJson[i].Name,			
			logoPath: 'http://musicdiver.ru' + stationsJson[i].AbsoluteLogoImgPath
		});
	}
}, function (e) {
	console.log('HTTP ' + e);
});

exports.onPageLoaded = function(args) {
    page = args.object;
    pageData.set("task", "");
    pageData.set("tasks", tasks);
    page.bindingContext = pageData;
};

exports.add = function() {
	//var parameters = JSON.stringify({ 'stationId': 4 });
	//console.log('PARAMETERS', parameters);
	
	//global.player.setDataSource('http://streaming.radionomy.com/parisonedeeper');
	//global.player.prepare();
	//global.player.start();
	
    //tasks.push({ name: pageData.get("task") });
    //pageData.set("task", "");
    //viewModule.getViewById( page, "task" ).dismissSoftInput();
};

exports.taskTap = function (args) {
	//var view = args.view;
	//console.log('Item Clicked!');
	
	frames.topmost().navigate('station');
}