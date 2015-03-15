"use strict";

var app = app || {};

window.onload = function(){
	//hooking up 
	app.main.app = app;
	app.main.drawHandler = app.drawHandler;
	app.main.mouse = app.mouse;

	//adding sounds to the que
	app.queue = new createjs.LoadQueue(false);
	app.queue.installPlugin(createjs.Sound);
	app.queue.on("complete", function(){
		app.main.init();
	});

	app.queue.loadManifest([
		{id:"soundtrack", src:"sounds/Happy music - Daydreaming.mp3"}
	]);
}