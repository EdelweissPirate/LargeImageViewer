(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.chartViewerImage = function() {
	this.initialize(img.chartViewerImage);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,15209,13060);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.image_content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.chartViewerImage();
	this.instance.setTransform(-7605,-6530);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.image_content, new cjs.Rectangle(-7605,-6530,15209,13060), null);


(lib.grabber = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#80DED0").s().p("EhP/BEwMAAAiJfMCf/AAAMAAACJfg");
	this.shape.setTransform(0,0.0048,1,1.0001);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-512,-440,1024,880);


(lib.centreMark = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#80DED0").s().p("AjjDlQhfhfAAiGQAAiFBfheQBehfCFAAQCGAABeBfQBfBeAACFQAACGhfBfQheBeiGAAQiFAAheheg");
	this.shape.setTransform(-0.0247,-0.0112,0.774,0.774);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.centreMark, new cjs.Rectangle(-25,-25,50,50), null);


(lib.blocker = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(128,222,208,0.008)").s().p("Am3N5IAA7xINvAAIAAbxg");
	this.shape.setTransform(0.005,0.0102,1.4288,1.141);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.9,-101.4,125.8,202.9);


(lib.bg_button_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ABQC3IieAAIgMAAQgPgDgNgFQgOgEgLgLIgOgPQgGgHgFgIIgEgJIgDgJIgCgJIgCgUIAAilIACgUQAFgdAWgUQAPgOASgJIAbgIIAMAAICeAAIAKAAIAcAIQASAJAPAOQAWAUAFAdIACAUIAAClIgCAUIgCAJIgDAJIgEAJQgFAIgGAHIgOAPQgLALgOAEQgNAFgQADIgKAAg");
	this.shape.setTransform(-0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg_button_2, new cjs.Rectangle(-18,-18.3,36,36.6), null);


(lib.bg_button = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ai2BuIAAh3QAAgpAegeQAdgdApAAIClAAQApAAAdAdQAeAeAAApIAAB3g");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg_button, new cjs.Rectangle(-18.3,-11,36.6,22), null);


(lib.holder_image = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// mask_Content (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eh6GBEwMAAAiJfMD0NAAAMAAACJfg");

	// content
	this.content = new lib.image_content();
	this.content.name = "content";
	this.content.setTransform(0.15,0);

	var maskedShapeInstanceList = [this.content];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.content).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.holder_image, new cjs.Rectangle(-781.5,-440,1563,880), null);


(lib.button_zoomOut = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2B333C").s().p("AgOA8IAAh3IAdAAIAAB3g");
	this.shape.setTransform(0,0,1,1,0,-90,90);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},3).wait(1));

	// frame
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#9A9A9A","#D9D9D9"],[0,0.686],17.4,4.7,-17.3,-4.6).s().p("AizBcIAAhTQAAgoAdgeQAegdApAAIEDAAIAAAUIgUAAIjvAAQghAAgXAYQgXAXgBAgIAABTg");
	this.shape_1.setTransform(0,-9.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#9A9A9A","#D9D9D9"],[0.655,1],17.4,4.6,-17.3,-4.7).s().p("AhPBbQgpAAgegdQgdgeAAgoIAAhTIAUAAIAABTQABAgAXAXQAXAXAhABIDvAAIAUAAIAAAUg");
	this.shape_2.setTransform(0,9.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#9A9A9A").s().p("AgJCjIAAlFIATAAIAAFFg");
	this.shape_3.setTransform(17,0);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["#A6D494","#BCEBA9"],[0,0.686],17.4,4.7,-17.3,-4.6).s().p("AizBcIAAhTQAAgoAdgeQAegdApAAIEDAAIAAAUIgUAAIjvAAQghAAgXAYQgXAXgBAgIAABTg");
	this.shape_4.setTransform(0,-9.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.lf(["#A6D494","#BCEBA9"],[0.655,1],17.4,4.6,-17.3,-4.7).s().p("AhPBbQgpAAgegdQgdgeAAgoIAAhTIAUAAIAABTQABAgAXAXQAXAXAhABIDvAAIAUAAIAAAUg");
	this.shape_5.setTransform(0,9.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#A6D494").s().p("AgJCjIAAlFIATAAIAAFFg");
	this.shape_6.setTransform(17,0);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.lf(["#98DA7D","#B4F29B"],[0,0.686],17.4,4.7,-17.3,-4.6).s().p("AizBcIAAhTQAAgoAdgeQAegdApAAIEDAAIAAAUIgUAAIjvAAQghAAgXAYQgXAXgBAgIAABTg");
	this.shape_7.setTransform(0,-9.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.lf(["#98DA7D","#B4F29B"],[0.655,1],17.4,4.6,-17.3,-4.7).s().p("AhPBbQgpAAgegdQgdgeAAgoIAAhTIAUAAIAABTQABAgAXAXQAXAXAhABIDvAAIAUAAIAAAUg");
	this.shape_8.setTransform(0,9.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#98DA7D").s().p("AgJCjIAAlFIATAAIAAFFg");
	this.shape_9.setTransform(17,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},1).to({state:[]},1).wait(1));

	// bg_button
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F2F2F2").s().p("Ah7CNQgYgWgBhAQgChAAChDQABhDA+gLIDrAAIAAExIjvAAQgDAEgFAAQgKAAgQgOg");
	this.shape_10.setTransform(0.9922,1.1815);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#E7F3E1").s().p("Ah7CNQgYgWgBhAQgChAAChDQABhDA+gLIDrAAIAAExIjvAAQgDAEgFAAQgKAAgQgOg");
	this.shape_11.setTransform(0.9922,1.1815);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10}]}).to({state:[{t:this.shape_11}]},2).to({state:[]},1).wait(1));

	// bg_copy
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#EEFAE9").s().p("AhwCkQg1gVgNguQABhXgChcQAAg0A2gaQA2gbBNAFICuAAIAAFtIiuAAIgJAAQg7AAgygTg");
	this.shape_12.setTransform(0,-0.0322);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#E0FCD3").s().p("AhwCkQg1gVgNguQABhXgChcQAAg0A2gaQA2gbBNAFICuAAIAAFtIiuAAIgJAAQg7AAgygTg");
	this.shape_13.setTransform(0,-0.0322);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[]},1).wait(1));

	// bg
	this.instance = new lib.bg_button();
	this.instance.setTransform(-17.85,0,1,1.5455,0,-90,90,0,-10.9);
	this.instance.shadow = new cjs.Shadow("rgba(51,51,51,0.298)",2,2,4);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgOC3QhAAAgugeQgtgdAAgpIAAilQAAgpAtgdQAugeBAAAIC4AAIAAFtg");
	this.shape_14.setTransform(-1,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape_14}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21,-21.3,48,50);


(lib.button_zoomIn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// icon_b
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2B333C").s().p("AgOA8IAAh3IAdAAIAAB3g");
	this.shape.setTransform(0,0,1,1,90);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},3).wait(1));

	// icon_a
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2B333C").s().p("AgOA8IAAh3IAdAAIAAB3g");

	this.timeline.addTween(cjs.Tween.get(this.shape_1).to({_off:true},3).wait(1));

	// frame
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#9A9A9A","#D9D9D9"],[0.655,1],17.4,10.9,-17.3,1.7).s().p("AizBbIAAgUIAUAAIDvAAQAhgBAXgXQAXgXABggIAAhTIAUAAIAABTQAAAogdAeQgeAdgpAAg");
	this.shape_2.setTransform(0,9.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["#9A9A9A","#D9D9D9"],[0,0.686],17.8,2.4,-17.8,-2.3).s().p("ACgBcIAAhTQgBgggXgXQgXgYghAAIjvAAIgUAAIAAgUIEDAAQApAAAeAdQAdAeAAAoIAABTg");
	this.shape_3.setTransform(0,-9.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D9D9D9").s().p("AgJCjIAAlFIATAAIAAFFg");
	this.shape_4.setTransform(-17,0);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#BCEBA9").s().p("AgJCjIAAlFIATAAIAAFFg");
	this.shape_5.setTransform(-17,0);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.lf(["#A6D494","#BCEBA9"],[0.655,1],17.4,10.9,-17.3,1.7).s().p("AizBbIAAgUIAUAAIDvAAQAhgBAXgXQAXgXABggIAAhTIAUAAIAABTQAAAogdAeQgeAdgpAAg");
	this.shape_6.setTransform(0,9.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.lf(["#A6D494","#BCEBA9"],[0,0.686],17.8,2.4,-17.8,-2.3).s().p("ACgBcIAAhTQgBgggXgXQgXgYghAAIjvAAIgUAAIAAgUIEDAAQApAAAeAdQAdAeAAAoIAABTg");
	this.shape_7.setTransform(0,-9.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#B4F29B").s().p("AgJCjIAAlFIATAAIAAFFg");
	this.shape_8.setTransform(-17,0);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.lf(["#98DA7D","#B4F29B"],[0.655,1],17.4,10.9,-17.3,1.7).s().p("AizBbIAAgUIAUAAIDvAAQAhgBAXgXQAXgXABggIAAhTIAUAAIAABTQAAAogdAeQgeAdgpAAg");
	this.shape_9.setTransform(0,9.15);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.lf(["#98DA7D","#B4F29B"],[0,0.686],17.8,2.4,-17.8,-2.3).s().p("ACgBcIAAhTQgBgggXgXQgXgYghAAIjvAAIgUAAIAAgUIEDAAQApAAAeAdQAdAeAAAoIAABTg");
	this.shape_10.setTransform(0,-9.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).to({state:[]},1).wait(1));

	// bg_button
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F2F2F2").s().p("AiYCRIAAkyIDaAAQA+ABAOBNQAPBNgEBDQgEBEgeAFQgdADgDAag");
	this.shape_11.setTransform(1.8432,1.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#E7F3E1").s().p("AiYCRIAAkyIDaAAQA+ABAOBNQAPBNgEBDQgEBEgeAFQgdADgDAag");
	this.shape_12.setTransform(1.8432,1.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11}]}).to({state:[{t:this.shape_12}]},2).to({state:[]},1).wait(1));

	// bg_copy
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#EEFAE9").s().p("AipC3IAAltIC4AAQBAAAAuAeQAtAdAAApIAAClQAAApgtAdQguAehAAAg");
	this.shape_13.setTransform(1,0);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#E0FCD3").s().p("AipC3IAAltIC4AAQBAAAAuAeQAtAdAAApIAAClQAAApgtAdQguAehAAAg");
	this.shape_14.setTransform(1,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[]},1).wait(1));

	// bg
	this.instance = new lib.bg_button();
	this.instance.setTransform(17.85,0,1,1.5455,90,0,0,0,-10.9);
	this.instance.shadow = new cjs.Shadow("rgba(51,51,51,0.298)",2,2,4);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AipC3IAAltIC4AAQBAAAAuAeQAtAdAAApIAAClQAAApgtAdQguAehAAAg");
	this.shape_15.setTransform(1,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape_15}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19,-21.3,48,50);


(lib.button_up = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// arrow
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2B333C").s().p("AgdAUIAdgnIAeAng");
	this.shape.setTransform(0,0,2,2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2).to({_off:true},1).wait(1));

	// frame
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#9A9A9A","#D9D9D9"],[0.58,1],16.2,1.5,-16.2,-1.5).s().p("AiiAKIAAgTIFFAAIAAATg");
	this.shape_1.setTransform(0,10);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#9A9A9A","#9A9A9A","#D9D9D9"],[0,0,1],9.2,0,-9.1,0).s().p("ABHBuIAAgUIAAhjQgBghgXgXQgXgXgggBIhTAAIAAgUIBTAAQAoAAAeAdQAdAeAAApIAAB3g");
	this.shape_2.setTransform(9.15,0);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D9D9D9").s().p("AhaBuIAAh3QAAgpAdgeQAegdAoAAIBTAAIAAAUIhTAAQggABgXAXQgYAXAAAhIAABjIAAAUg");
	this.shape_3.setTransform(-9.15,0);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["#A6D494","#BCEBA9"],[0.58,1],16.2,1.5,-16.2,-1.5).s().p("AiiAKIAAgTIFFAAIAAATg");
	this.shape_4.setTransform(0,10);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#BCEBA9").s().p("AhaBuIAAh3QAAgpAdgeQAegdAoAAIBTAAIAAAUIhTAAQggABgXAXQgYAXAAAhIAABjIAAAUg");
	this.shape_5.setTransform(-9.15,0);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.lf(["#A6D494","#BCEBA9"],[0,1],9.2,0,-9.1,0).s().p("ABHBuIAAgUIAAhjQgBghgXgXQgXgXgggBIhTAAIAAgUIBTAAQAoAAAeAdQAdAeAAApIAAB3g");
	this.shape_6.setTransform(9.15,0);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#B4F29B").s().p("AhaBuIAAh3QAAgpAdgeQAegdAoAAIBTAAIAAAUIhTAAQggABgXAXQgYAXAAAhIAABjIAAAUg");
	this.shape_7.setTransform(-9.15,0);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.lf(["#98DA7D","#B4F29B"],[0.58,1],16.2,1.5,-16.2,-1.5).s().p("AiiAKIAAgTIFFAAIAAATg");
	this.shape_8.setTransform(0,10);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.lf(["#98DA7D","#B4F29B"],[0,1],9.2,0,-9.1,0).s().p("ABHBuIAAgUIAAhjQgBghgXgXQgXgXgggBIhTAAIAAgUIBTAAQAoAAAeAdQAdAeAAApIAAB3g");
	this.shape_9.setTransform(9.15,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},1).to({state:[]},1).wait(1));

	// bg_button
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F2F2F2").s().p("AiZBQIAAhnQAJg4BIAAQBHgBA2ABQA3AAATAQQATAQAIAcIAABjg");
	this.shape_10.setTransform(0.9,0.975);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#E7F3E1").s().p("AiZBQIAAhnQAJg4BIAAQBHgBA2ABQA3AAATAQQATAQAIAcIAABjg");
	this.shape_11.setTransform(0.9,0.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10}]}).to({state:[{t:this.shape_11}]},2).to({state:[]},1).wait(1));

	// bg_green
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#EEFAE9").s().p("Ai2BuIAAh3QAAgpAegeQAdgdApAAIClAAQApAAAdAdQAeAeAAApIAAB3g");

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#E0FCD3").s().p("Ai2BuIAAh3QAAgpAegeQAdgdApAAIClAAQApAAAdAdQAeAeAAApIAAB3g");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[]},1).wait(1));

	// bg
	this.instance = new lib.bg_button();
	this.instance.shadow = new cjs.Shadow("rgba(51,51,51,0.298)",2,2,4);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#80DED0").s().p("Ai2BuIAAh3QAAgpAegeQAdgdApAAIClAAQApAAAdAdQAeAeAAApIAAB3g");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape_14}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.3,-14,50,36);


(lib.button_right = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// arrow
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2B333C").s().p("AgdAUIAdgnIAeAng");
	this.shape.setTransform(0,0,2,2,90);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},3).wait(1));

	// frame
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#9A9A9A","#D9D9D9"],[0.075,0.78],7.8,7.8,-7.7,-7.7).s().p("ABaBcIAAhTQgBgggXgXQgXgYghAAIhjAAIgUAAIAAgUIB3AAQApAAAeAdQAdAeAAAoIAABTg");
	this.shape_1.setTransform(0,-9.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#9A9A9A","#D9D9D9"],[0.584,1],13.6,-1.1,-8.4,-1.1).s().p("AhtBbIAAgUIAUAAIBjAAQAhgBAXgXQAXgXABggIAAhTIAUAAIAABTQAAAogdAeQgeAdgpAAg");
	this.shape_2.setTransform(0,9.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D9D9D9").s().p("AgJCjIAAlFIATAAIAAFFg");
	this.shape_3.setTransform(-10,0);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["#A6D494","#BCEBA9"],[0.584,1],13.6,-1.1,-8.4,-1.1).s().p("AhtBbIAAgUIAUAAIBjAAQAhgBAXgXQAXgXABggIAAhTIAUAAIAABTQAAAogdAeQgeAdgpAAg");
	this.shape_4.setTransform(0,9.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.lf(["#A6D494","#BCEBA9"],[0.075,0.78],7.8,7.8,-7.7,-7.7).s().p("ABaBcIAAhTQgBgggXgXQgXgYghAAIhjAAIgUAAIAAgUIB3AAQApAAAeAdQAdAeAAAoIAABTg");
	this.shape_5.setTransform(0,-9.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#BCEBA9").s().p("AgJCjIAAlFIATAAIAAFFg");
	this.shape_6.setTransform(-10,0);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.lf(["#98DA7D","#B4F29B"],[0.075,0.78],7.8,7.8,-7.7,-7.7).s().p("ABaBcIAAhTQgBgggXgXQgXgYghAAIhjAAIgUAAIAAgUIB3AAQApAAAeAdQAdAeAAAoIAABTg");
	this.shape_7.setTransform(0,-9.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.lf(["#98DA7D","#B4F29B"],[0.584,1],13.6,-1.1,-8.4,-1.1).s().p("AhtBbIAAgUIAUAAIBjAAQAhgBAXgXQAXgXABggIAAhTIAUAAIAABTQAAAogdAeQgeAdgpAAg");
	this.shape_8.setTransform(0,9.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#B4F29B").s().p("AgJCjIAAlFIATAAIAAFFg");
	this.shape_9.setTransform(-10,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},1).to({state:[]},1).wait(1));

	// bg_button
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F2F2F2").s().p("AhVCRIABkyIBUAAQA9ABAOBNQAOBMgDBEQgEBEgeAEQgdAFgDAZg");
	this.shape_10.setTransform(1.5416,1.75);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#E7F3E1").s().p("AhVCRIABkyIBUAAQA9ABAOBNQAOBMgDBEQgEBEgeAEQgdAFgDAZg");
	this.shape_11.setTransform(1.5416,1.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10}]}).to({state:[{t:this.shape_11}]},2).to({state:[]},1).wait(1));

	// bg_green
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#EEFAE9").s().p("AhtC3IAAltIB3AAQApAAAeAeQAdAdAAApIAAClQAAApgdAdQgeAegpAAg");

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#E0FCD3").s().p("AhtC3IAAltIB3AAQApAAAeAeQAdAdAAApIAAClQAAApgdAdQgeAegpAAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[]},1).wait(1));

	// bg
	this.instance = new lib.bg_button();
	this.instance.setTransform(0,0,1,1,90);
	this.instance.shadow = new cjs.Shadow("rgba(51,51,51,0.298)",2,2,4);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AhtC3IAAltIB3AAQApAAAeAeQAdAdAAApIAAClQAAApgdAdQgeAegpAAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape_14}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14,-21.3,36,50);


(lib.button_reset_new = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// icon
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#2B333C").ss(3,2,1).p("ABNgBQAAAjgWAYQgXAYggAAQgfAAgWgYQgXgYAAgiQAAghAXgYQAWgXAfAAQAGAAAGAA");
	this.shape.setTransform(-0.0245,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2B333C").s().p("AgLgcIAwAmIglAKIgkAJg");
	this.shape_1.setTransform(7.65,-2.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[]},3).wait(1));

	// frame
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#9A9A9A","#D9D9D9"],[0,1],12.8,12.8,-12.7,-12.7).s().p("ABQC3IieAAIgMAAQgPgDgNgFQgOgEgLgLIgOgPQgGgHgFgIIgEgJIgDgJIgCgJIgCgUIAAilIACgUQAFgdAWgUQAPgOASgJIAbgIIAMAAICeAAIAKAAIAcAIQASAJAPAOQAWAUAFAdIACAUIAAClIgCAUIgCAJIgDAJIgEAJQgFAIgGAHIgOAPQgLALgOAEQgNAFgQADIgKAAgAhfigQgXAGgRAQQgRAQgFAZIgCAPIAAClIAAAIQACASAMASQAGAIAKAIQAJAHALAGIAOAFIARACICeAAIAQgCIAOgFQALgGAJgHQAKgIAGgIQAMgSACgSIAAgIIAAilIgCgPQgFgZgRgQQgRgQgXgGIgQgCIieAAIgRACg");
	this.shape_2.setTransform(-0.025,0);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["#A6D494","#BCEBA9"],[0,1],12.8,12.8,-12.7,-12.7).s().p("ABQC3IieAAIgMAAQgPgDgNgFQgOgEgLgLIgOgPQgGgHgFgIIgEgJIgDgJIgCgJIgCgUIAAilIACgUQAFgdAWgUQAPgOASgJIAbgIIAMAAICeAAIAKAAIAcAIQASAJAPAOQAWAUAFAdIACAUIAAClIgCAUIgCAJIgDAJIgEAJQgFAIgGAHIgOAPQgLALgOAEQgNAFgQADIgKAAgAhfigQgXAGgRAQQgRAQgFAZIgCAPIAAClIAAAIQACASAMASQAGAIAKAIQAJAHALAGIAOAFIARACICeAAIAQgCIAOgFQALgGAJgHQAKgIAGgIQAMgSACgSIAAgIIAAilIgCgPQgFgZgRgQQgRgQgXgGIgQgCIieAAIgRACg");
	this.shape_3.setTransform(-0.025,0);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["#98DA7D","#B4F29B"],[0,1],12.8,12.8,-12.7,-12.7).s().p("ABQC3IieAAIgMAAQgPgDgNgFQgOgEgLgLIgOgPQgGgHgFgIIgEgJIgDgJIgCgJIgCgUIAAilIACgUQAFgdAWgUQAPgOASgJIAbgIIAMAAICeAAIAKAAIAcAIQASAJAPAOQAWAUAFAdIACAUIAAClIgCAUIgCAJIgDAJIgEAJQgFAIgGAHIgOAPQgLALgOAEQgNAFgQADIgKAAgAhfigQgXAGgRAQQgRAQgFAZIgCAPIAAClIAAAIQACASAMASQAGAIAKAIQAJAHALAGIAOAFIARACICeAAIAQgCIAOgFQALgGAJgHQAKgIAGgIQAMgSACgSIAAgIIAAilIgCgPQgFgZgRgQQgRgQgXgGIgQgCIieAAIgRACg");
	this.shape_4.setTransform(-0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2}]}).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[]},1).wait(1));

	// bg_button
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F2F2F2").s().p("AhMCjIgRgBIgOgGQgLgFgJgHQgKgJgGgIQgMgRgCgTIAAgIIAAilIACgPQAFgZARgQQARgQAXgGIARgCICeAAIAQACQAXAGAMAPQALAPAEARQAEAQgNAJIATCkQgIAHgCAMQgCALgMAJQgNAJgFAIQgGAIgLADQgLAEgGAKg");
	this.shape_5.setTransform(2.075,1.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E7F3E1").s().p("AhMCjIgRgBIgOgGQgLgFgJgHQgKgJgGgIQgMgRgCgTIAAgIIAAilIACgPQAFgZARgQQARgQAXgGIARgCICeAAIAQACQAXAGAMAPQALAPAEARQAEAQgNAJIATCkQgIAHgCAMQgCALgMAJQgNAJgFAIQgGAIgLADQgLAEgGAKg");
	this.shape_6.setTransform(2.075,1.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5}]}).to({state:[{t:this.shape_6}]},2).to({state:[]},1).wait(1));

	// bg_copy
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EEFAE9").s().p("AhOCjIgRgCIgOgFQgLgGgJgHQgKgIgGgIQgMgSgCgSIAAgIIAAilIACgPQAFgZARgQQARgQAXgGIARgCICeAAIAQACQAXAGARAQQARAQAFAZIACAPIAAClIAAAIQgCASgMASQgGAIgKAIQgJAHgLAGIgOAFIgQACg");
	this.shape_7.setTransform(-0.025,0);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#E0FCD3").s().p("AhOCjIgRgCIgOgFQgLgGgJgHQgKgIgGgIQgMgSgCgSIAAgIIAAilIACgPQAFgZARgQQARgQAXgGIARgCICeAAIAQACQAXAGARAQQARAQAFAZIACAPIAAClIAAAIQgCASgMASQgGAIgKAIQgJAHgLAGIgOAFIgQACg");
	this.shape_8.setTransform(-0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[]},1).wait(1));

	// bg
	this.instance = new lib.bg_button_2();
	this.instance.shadow = new cjs.Shadow("rgba(51,51,51,0.298)",2,2,4);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AhOCjIgRgCIgOgFQgLgGgJgHQgKgIgGgIQgMgSgCgSIAAgIIAAilIACgPQAFgZARgQQARgQAXgGIARgCICeAAIAQACQAXAGARAQQARAQAFAZIACAPIAAClIAAAIQgCASgMASQgGAIgKAIQgJAHgLAGIgOAFIgQACg");
	this.shape_9.setTransform(-0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape_9}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21,-21.3,50,50);


(lib.button_left = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// arrow
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2B333C").s().p("AgdAUIAdgnIAeAng");
	this.shape.setTransform(0,0,2,2,0,-90,90);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},3).wait(1));

	// frame
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#9A9A9A","#D9D9D9"],[0.153,1],7.8,7.8,-7.7,-7.7).s().p("AgJBbQgpAAgegdQgdgeAAgoIAAhTIAUAAIAABTQABAgAXAXQAXAXAhABIBjAAIAUAAIAAAUg");
	this.shape_1.setTransform(0,9.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#9A9A9A","#D9D9D9"],[0,0.561],11,0,-11,0).s().p("AhtBcIAAhTQAAgoAdgeQAegdApAAIB3AAIAAAUIgUAAIhjAAQghAAgXAYQgXAXgBAgIAABTg");
	this.shape_2.setTransform(0,-9.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#9A9A9A").s().p("AgJCjIAAlFIATAAIAAFFg");
	this.shape_3.setTransform(10,0);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["#A6D494","#BCEBA9"],[0,0.561],11,0,-11,0).s().p("AhtBcIAAhTQAAgoAdgeQAegdApAAIB3AAIAAAUIgUAAIhjAAQghAAgXAYQgXAXgBAgIAABTg");
	this.shape_4.setTransform(0,-9.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.lf(["#A6D494","#BCEBA9"],[0.153,1],7.8,7.8,-7.7,-7.7).s().p("AgJBbQgpAAgegdQgdgeAAgoIAAhTIAUAAIAABTQABAgAXAXQAXAXAhABIBjAAIAUAAIAAAUg");
	this.shape_5.setTransform(0,9.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#A6D494").s().p("AgJCjIAAlFIATAAIAAFFg");
	this.shape_6.setTransform(10,0);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.lf(["#98DA7D","#B4F29B"],[0,0.561],11,0,-11,0).s().p("AhtBcIAAhTQAAgoAdgeQAegdApAAIB3AAIAAAUIgUAAIhjAAQghAAgXAYQgXAXgBAgIAABTg");
	this.shape_7.setTransform(0,-9.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.lf(["#98DA7D","#B4F29B"],[0.153,1],7.8,7.8,-7.7,-7.7).s().p("AgJBbQgpAAgegdQgdgeAAgoIAAhTIAUAAIAABTQABAgAXAXQAXAXAhABIBjAAIAUAAIAAAUg");
	this.shape_8.setTransform(0,9.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#98DA7D").s().p("AgJCjIAAlFIATAAIAAFFg");
	this.shape_9.setTransform(10,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},1).to({state:[]},1).wait(1));

	// bg_button
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F2F2F2").s().p("AgTCaQgcgIgQgTQgQgTAAg3QgBg2ABhHQAAhIA4gJIBnAAIAAEzg");
	this.shape_10.setTransform(0.975,0.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#E7F3E1").s().p("AgTCaQgcgIgQgTQgQgTAAg3QgBg2ABhHQAAhIA4gJIBnAAIAAEzg");
	this.shape_11.setTransform(0.975,0.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10}]}).to({state:[{t:this.shape_11}]},2).to({state:[]},1).wait(1));

	// bg_green
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#EEFAE9").s().p("AgJC3QgpAAgegeQgdgdAAgpIAAilQAAgpAdgdQAegeApAAIB3AAIAAFtg");

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#E0FCD3").s().p("AhtC3IAAltIB3AAQApAAAeAeQAdAdAAApIAAClQAAApgdAdQgeAegpAAg");
	this.shape_13.setTransform(0,0,1,1,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[]},1).wait(1));

	// bg
	this.instance = new lib.bg_button();
	this.instance.setTransform(0,0,1,1,-90);
	this.instance.shadow = new cjs.Shadow("rgba(51,51,51,0.298)",2,2,4);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgJC3QgpAAgegeQgdgdAAgpIAAilQAAgpAdgdQAegeApAAIB3AAIAAFtg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape_14}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14,-21.3,36,50);


(lib.button_down = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// arrow
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2B333C").s().p("AgdAUIAdgnIAeAng");
	this.shape.setTransform(0,0,2,2,0,180,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2).to({_off:true},1).wait(1));

	// frame
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#9A9A9A","#D9D9D9"],[0.227,1],8.9,11.2,8.9,-33.2).s().p("AhbBuIAAgUIBTAAQAggBAXgXQAXgXABghIAAhjIAAgUIAUAAIAAB3QAAApgdAeQgeAdgoAAg");
	this.shape_1.setTransform(9.15,0);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#9A9A9A","#D9D9D9"],[0,0.447],11.6,-11.4,-11.5,11.6).s().p("AiiAKIAAgTIFFAAIAAATg");
	this.shape_2.setTransform(0,-10);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["#9A9A9A","#D9D9D9"],[0,0.447],-8.8,11.2,-8.8,-33.2).s().p("AAJBuQgoAAgegdQgdgeAAgpIAAh3IAUAAIAAAUIAABjQAAAhAYAXQAXAXAgABIBTAAIAAAUg");
	this.shape_3.setTransform(-9.15,0);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.lf(["#A6D494","#BCEBA9"],[0,0.447],-8.8,11.2,-8.8,-33.2).s().p("AAJBuQgoAAgegdQgdgeAAgpIAAh3IAUAAIAAAUIAABjQAAAhAYAXQAXAXAgABIBTAAIAAAUg");
	this.shape_4.setTransform(-9.15,0);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.lf(["#A6D494","#BCEBA9"],[0.227,1],8.9,11.2,8.9,-33.2).s().p("AhbBuIAAgUIBTAAQAggBAXgXQAXgXABghIAAhjIAAgUIAUAAIAAB3QAAApgdAeQgeAdgoAAg");
	this.shape_5.setTransform(9.15,0);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.lf(["#A6D494","#BCEBA9"],[0,0.447],11.6,-11.4,-11.5,11.6).s().p("AiiAKIAAgTIFFAAIAAATg");
	this.shape_6.setTransform(0,-10);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.lf(["#98DA7D","#B4F29B"],[0,0.447],-8.8,11.2,-8.8,-33.2).s().p("AAJBuQgoAAgegdQgdgeAAgpIAAh3IAUAAIAAAUIAABjQAAAhAYAXQAXAXAgABIBTAAIAAAUg");
	this.shape_7.setTransform(-9.15,0);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.lf(["#98DA7D","#B4F29B"],[0.227,1],8.9,11.2,8.9,-33.2).s().p("AhbBuIAAgUIBTAAQAggBAXgXQAXgXABghIAAhjIAAgUIAUAAIAAB3QAAApgdAeQgeAdgoAAg");
	this.shape_8.setTransform(9.15,0);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.lf(["#98DA7D","#B4F29B"],[0,0.447],11.6,-11.4,-11.5,11.6).s().p("AiiAKIAAgTIFFAAIAAATg");
	this.shape_9.setTransform(0,-10);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},1).to({state:[]},1).wait(1));

	// bg_button
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F2F2F2").s().p("AhIBGQhIAAgJg4IAAhSIEzgCIAABQQgIAcgTAQQgTAQg3AAIg6ABIhDgBg");
	this.shape_10.setTransform(0.9,-0.025);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#E7F3E1").s().p("AhIBGQhIAAgJg4IAAhSIEzgCIAABQQgIAcgTAQQgTAQg3AAIg6ABIhDgBg");
	this.shape_11.setTransform(0.9,-0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10}]}).to({state:[{t:this.shape_11}]},2).to({state:[]},1).wait(1));

	// bg_green
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#EEFAE9").s().p("AhSBuQgpAAgdgdQgegeAAgpIAAh3IFtAAIAAB3QAAApgeAeQgdAdgpAAg");

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#E0FCD3").s().p("AhSBuQgpAAgdgdQgegeAAgpIAAh3IFtAAIAAB3QAAApgeAeQgdAdgpAAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[]},1).wait(1));

	// bg
	this.instance = new lib.bg_button();
	this.instance.setTransform(0,0,1,1,180);
	this.instance.shadow = new cjs.Shadow("rgba(51,51,51,0.298)",2,2,4);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AhSBuQgpAAgdgdQgegeAAgpIAAh3IFtAAIAAB3QAAApgeAeQgdAdgpAAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_14}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.3,-14,50,36);


// stage content:
(lib.LargeImageViewer = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// centreMark
	this.centreMark = new lib.centreMark();
	this.centreMark.name = "centreMark";
	this.centreMark.setTransform(781.5,440);
	this.centreMark.alpha = 0.0117;

	this.timeline.addTween(cjs.Tween.get(this.centreMark).wait(1));

	// zoomIn
	this.zoomIn = new lib.button_zoomIn();
	this.zoomIn.name = "zoomIn";
	this.zoomIn.setTransform(1496.3,36.65,1.003,0.9463,0,0,0,-17.8,0);
	new cjs.ButtonHelper(this.zoomIn, 0, 1, 2, false, new lib.button_zoomIn(), 3);

	this.timeline.addTween(cjs.Tween.get(this.zoomIn).wait(1));

	// zoomOut
	this.zoomOut = new lib.button_zoomOut();
	this.zoomOut.name = "zoomOut";
	this.zoomOut.setTransform(1485.75,36.65,1.003,0.9472,0,0,0,17.9,0);
	new cjs.ButtonHelper(this.zoomOut, 0, 1, 2, false, new lib.button_zoomOut(), 3);

	this.timeline.addTween(cjs.Tween.get(this.zoomOut).wait(1));

	// up
	this.up = new lib.button_up();
	this.up.name = "up";
	this.up.setTransform(1490.95,85.3,1.1279,1.0773);
	new cjs.ButtonHelper(this.up, 0, 1, 2, false, new lib.button_up(), 3);

	this.timeline.addTween(cjs.Tween.get(this.up).wait(1));

	// down
	this.down = new lib.button_down();
	this.down.name = "down";
	this.down.setTransform(1490.95,132.7,1.1279,1.0773);
	new cjs.ButtonHelper(this.down, 0, 1, 2, false, new lib.button_down(), 3);

	this.timeline.addTween(cjs.Tween.get(this.down).wait(1));

	// left
	this.left = new lib.button_left();
	this.left.name = "left";
	this.left.setTransform(1449.7,106.2,1.1279,1.0773);
	new cjs.ButtonHelper(this.left, 0, 1, 2, false, new lib.button_left(), 3);

	this.timeline.addTween(cjs.Tween.get(this.left).wait(1));

	// right
	this.right = new lib.button_right();
	this.right.name = "right";
	this.right.setTransform(1532.2,106.2,1.1279,1.0773);
	new cjs.ButtonHelper(this.right, 0, 1, 2, false, new lib.button_right(), 3);

	this.timeline.addTween(cjs.Tween.get(this.right).wait(1));

	// reset
	this.reset = new lib.button_reset_new();
	this.reset.name = "reset";
	this.reset.setTransform(1490.95,181.35,1.003,0.9463);
	new cjs.ButtonHelper(this.reset, 0, 1, 2, false, new lib.button_reset_new(), 3);

	this.timeline.addTween(cjs.Tween.get(this.reset).wait(1));

	// control_block
	this.blocker = new lib.blocker();
	this.blocker.name = "blocker";
	this.blocker.setTransform(1490.9,108.3);
	new cjs.ButtonHelper(this.blocker, 0, 1, 2, false, new lib.blocker(), 3);

	this.timeline.addTween(cjs.Tween.get(this.blocker).wait(1));

	// grabber
	this.grabber = new lib.grabber();
	this.grabber.name = "grabber";
	this.grabber.setTransform(781.5,440,1.5264,1);
	this.grabber.alpha = 0.0117;
	new cjs.ButtonHelper(this.grabber, 0, 1, 2, false, new lib.grabber(), 3);

	this.timeline.addTween(cjs.Tween.get(this.grabber).wait(1));

	// holder_image
	this.holder_image = new lib.holder_image();
	this.holder_image.name = "holder_image";
	this.holder_image.setTransform(781.5,440);

	this.timeline.addTween(cjs.Tween.get(this.holder_image).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-6041.8,-5650,14427.5,12620);
// library properties:
lib.properties = {
	id: '59BB34E549C94B40A38DA30882751662',
	width: 1563,
	height: 880,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/chartViewerImage.png", id:"chartViewerImage"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['59BB34E549C94B40A38DA30882751662'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;