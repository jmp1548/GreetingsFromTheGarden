"use strict";
var app = app || {};

//get Mouse app

app.mouse = {
	getX : function (e){
		return e.pageX - e.target.offsetLeft;
	},

	getY : function (e){
		return e.pageY - e.target.offsetTop;
	},

	isMouseDown : false,

	//Add Event Listeners
	init : function (){
		app.main.canvas.addEventListener("mousedown", this.handleMousedown);
		app.main.canvas.addEventListener("mousemove", this.handleMousemove);
		app.main.canvas.addEventListener("mouseup", this.handleMouseup);
		app.main.canvas.addEventListener("mouseleave", this.handleMouseleave);
	},

	//Mouse Down
	handleMousedown : function(e){
		var mouseX = app.mouse.getX(e);
   		var mouseY = app.mouse.getY(e);
   		app.main.startX = mouseX;
		app.main.startY = mouseY;
		app.main.setDragging(app.main.startX, app.main.startY);
		this.isMouseDown = true;
	},

	//Mouse Move
	handleMousemove : function(e){
		var mouseX = app.mouse.getX(e);
   		var mouseY = app.mouse.getY(e);

	       if (this.isMouseDown) {
	   		   	app.main.dragX = mouseX - app.main.startX;
	        	app.main.dragY = mouseY - app.main.startY;

	      	}

	},

	//Mouse Up
	handleMouseup : function(e){
		var mouseX = app.mouse.getX(e);
   		var mouseY = app.mouse.getY(e);
		this.isMouseDown = false;
    	app.main.clearDragging();
	},

	//Mouse Leave
	handleMouseleave : function(e){
		var mouseX = app.mouse.getX(e);
   		var mouseY = app.mouse.getY(e);
		this.isMouseDown = false;
    	app.main.clearDragging();
	}

};

app.main = {
	WIDTH : 800,
    CANVAS_HEIGHT: 900,
    CARD_HEIGHT: 500,
    ICONS_HEIGHT: 500,

    canvas: undefined,
    canvas2: undefined,
    ctx: undefined,
    ctx2: undefined,
    drawHandler: undefined,
    app: undefined,

    dragX : 0,
    dragY : 0,
	startX : 0,
	startY : 0,
	txt : "txt",
	fSize : 22,
	col : "black",

	//Setting initial values and adding some onclick functions
	init : function() {
			this.canvas = document.querySelector('canvas');
			this.canvas2 = document.querySelector('#exportCanvas');
			this.canvas.width = this.WIDTH;
			this.canvas.height = this.CANVAS_HEIGHT;
			this.canvas2.width = this.WIDTH;
			this.canvas2.height = this.CARD_HEIGHT;
			this.ctx = this.canvas.getContext('2d');
			this.ctx2 = this.canvas2.getContext('2d');

			document.querySelector('#rightArrow').onclick = function(){
				app.drawHandler.changeBackground(-1);
			}

			document.querySelector('#leftArrow').onclick = function(){
				app.drawHandler.changeBackground(+1);
			}

			createjs.Sound.play("soundtrack", {loop: -1, volume: .5});
			//commented out export code that errored out due to security issue
			document.querySelector('#exportButton').onclick = function(){
				app.main.doExport();
			}


			//Bootstrap js to add modal
			$("#myModal").modal("show");

			this.drawHandler.init();
			this.draw();
	},

	//function that detects if mouse hits the icons
	setDragging : function (x, y) {
   			for (var i = 0; i < this.drawHandler.icons.length; i++) {
	       		var icon = this.drawHandler.icons[i];

	       		if (x >= icon.x && x <= icon.x + icon.width && y >= icon.y && y <= icon.y + icon.height) {
	           		icon.isDragging = true;
	            }
    		}
		},

	//Sets dragging to false when not hitting icons
	clearDragging : function (x, y) {
  			for (var i = 0; i < this.drawHandler.icons.length; i++) {
        		var icon = this.drawHandler.icons[i];

	        	if (icon.isDragging) {
	            	icon.isDragging = false;
	            }
    		}
		},

	//Handles the dragging and value changes
	moveDragging : function (x, y) {
  			for (var i = 0; i < this.drawHandler.icons.length; i++) {
        		var icon = this.drawHandler.icons[i];

	        	if (icon.isDragging) {
	            	icon.x += this.dragX;
	            	icon.y += this.dragY;
	            	this.startX += this.dragX;
	            	this.startY += this.dragY;
	            	this.dragX = 0;
	            	this.dragY = 0;
	            	this.drawHandler.dashedRect(this.ctx, icon.x, icon.y, icon.width, icon.height, "black", 6);
	         	}
    		}
		},

	//issue with export code (unused)
	doExport : function(){
		var data = app.main.canvas2.toDataURL();
		var windowName = "canvasImage";
		var windowOptions = "left=0,top=0,width=" + app.main.canvas2.width + ",height=" + app.main.canvas2.height +",toolbar=0,resizable=0";
		var myWindow = window.open(data,windowName,windowOptions);
		myWindow.resizeTo(app.main.canvas2.width, app.main.canvas2.height);
	 },

	//draw function that animates at 60 FPS
	draw : function(){
		requestAnimationFrame(this.draw.bind(this));
		this.ctx2.drawImage(this.canvas, 0, 0);
		this.drawHandler.clear(this.ctx, 0, 0, this.WIDTH, this.CANVAS_HEIGHT);
		this.drawHandler.draw(this.ctx);
		this.mouse.init();
		this.moveDragging();
	}
};
