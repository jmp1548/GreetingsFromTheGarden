"use strict";

var app = app || {};

//setting properties of icons
app.ICON = function(){
	return{
	x : undefined,
	y : undefined,
	width : undefined,
	height : undefined,
	image : undefined,
	isDragging : false
	}
}

//images used for scene
app.IMAGES = {
	1 : "image/tomato.png",
	2 : "image/carrot.png",
	3 : "image/corn.png",
	4 : "image/broccoli.png",
	5 : "image/sun.png"
}

//images used for backgrounds
app.BACKGROUNDS = {
	1 : "image/farm.png",
	2 : "image/outterspace.png",
	3 : "image/underdasea.png"
}

//setting up arrays and drawhandler properties and methods
app.drawHandler = {
	icons : [],
	backgrounds : [],
	background : 1,

	//Populate arrays with the other apps
	init : function(){
		for(var img in app.BACKGROUNDS){
			this.backgrounds.push(img);
		}

		for(var img in app.IMAGES){
			var temp = new app.ICON();
			temp.x = img * 200;
			temp.y = 550;
			temp.width = 175;
			temp.height = 175;
			temp.image = img;
			this.icons.push(temp);
			temp.x -= 185;
		}
		var tmp = new app.ICON();
		tmp.x = 475;
		tmp.y = 800;
		tmp.height = 70;
		tmp.width = 100;
		tmp.image = "";
		this.icons.push(tmp);

	},

	//code for changing the background image (slideshow) cycles through array of backgrounds
	changeBackground : function (val){
		this.background += val;
		if(this.background > this.backgrounds.length){
			this.background = 1;
		}
		if(this.background < 1){
			this.background = this.backgrounds.length;
		}
	},

	//draw function that updates everything and then is called in the main update
	draw : function (ctx) {
		var bg = new Image();
		bg.src = app.BACKGROUNDS[this.background];
		ctx.drawImage(bg, 0, 0, app.main.WIDTH, app.main.CARD_HEIGHT);
		this.line(ctx, 0, 500, 1200, 500, 5, "#6BAEED");	
		app.main.txt = document.querySelector("#text").value;
		app.main.fSize = document.querySelector("#size").value;
		app.main.col = document.querySelector("#color").value;

		//tells canvas to draw images, but if it is not an image draw text instead
		for(var icon in this.icons){
			if(!app.IMAGES[this.icons[icon].image]){
					app.main.ctx.fillStyle = app.main.col;
					app.main.ctx.font = app.main.fSize + "px Arial";
					app.main.ctx.fillText(app.main.txt, this.icons[icon].x, this.icons[icon].y);
					app.main.ctx.textBaseline = "top";
			}
			else{
				var img = new Image();
				img.src = app.IMAGES[this.icons[icon].image];
				ctx.drawImage(img, this.icons[icon].x, this.icons[icon].y, this.icons[icon].width, this.icons[icon].height);
			}
		}
		
	},

	//clears the canvas
	clear: function(ctx, x, y, w, h){
		ctx.clearRect(x, y, w, h);
	},

	//draws a simple line
	line: function(ctx, x1, y1, x2, y2, w, col){
		ctx.save();
		ctx.lineWidth = w;
     	ctx.strokeStyle = col;
		ctx.beginPath();
     	ctx.moveTo(x1, y1);
      	ctx.lineTo(x2, y2);
      	ctx.stroke();
	    ctx.restore();
	},

	//draws a dashed rectangle stroke. used to soround objects in the application
	dashedRect: function(ctx, x, y, w, h, col, dash){
		ctx.save();
		ctx.setLineDash([dash]);
		ctx.strokeStyle = col;
	    ctx.strokeRect(x, y, w, h);
	    ctx.restore();
	},

	//draws a rectangle
	rect: function(ctx, x, y, w, h, col){
		ctx.save();
		ctx.fillStyle = col;
		ctx.fillRect(x, y, w, h);
		ctx.restore();
	}

	
};