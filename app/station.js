
var dialogs = require("ui/dialogs");
var http = require("http");
var observableModule = require("data/observable");

var song = {};
var pageData = new observableModule.Observable();
var page;

exports.pageNavigatedTo = function (navigationEntry) {
	console.log('NAVIGATED!');
	
	http.request({ 
		url: "http://musicdiver.ru/Ajax/GetStreamedTitle", 
		method: "POST",		
		headers: { "Content-Type": "application/json; charset=utf-8" },		
		content: '{ "stationId": "5" }'
	}).then(function (response) {
		// Argument (response) is HttpResponse!
		//stationsJson = response.content.toJSON();
		//song = response.content.toJSON();
		pageData.set("song", response.content.toJSON().artist);
		//console.log(response.content.toString());
	}, function (e) {
		console.log('HTTP ' + e);
	});
	
    //dialogs.alert(navigationEntry.context.stationId);
}

exports.onPageLoaded = function(args) {
    page = args.object;
    pageData.set("song", "abc");
    page.bindingContext = pageData;
};

exports.testTap = function () {
	dialogs.alert('TAP');
 }