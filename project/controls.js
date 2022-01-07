const controls = {
	init: () => {
		document.getElementById('canvas').addEventListener('wheel', readZoom.bind(this));

		controls.init_grabber();
		controls.buttons.init();
		init_image();
	},

	init_grabber: () => {
		_.grabber.on('mousedown', function(){
			grab.start(_.grabber);
		});

		_.grabber.on('pressup', function(){
			grab.stop();
			_.grabber.x = props.grabberCoordsHome.x;
			_.grabber.y = props.grabberCoordsHome.y;

			props.animCoords.x = _.holder_image.content.x;
			props.animCoords.y =  _.holder_image.content.y;

			props.currentX = 
			props.targetX = _.holder_image.content.x;
			props.currentY =
			props.targetY = _.holder_image.content.y;
		});

		_.grabber.on('dblclick', function(){
			quickZoom();
		});

		props.grabberCoordsHome.x = _.grabber.x;
		props.grabberCoordsHome.y =  _.grabber.y;
	},

	reset: () => {
		// Resets image zoom
		if(_.holder_image.tween_zoom){
			_.holder_image.tween_zoom.pause();
		};

		_.holder_image.tween_zoom = Tween(_.holder_image.content, 'scale', 'inOut', props.startScale, .5, function(){
			props.currentScale =
			props.targetScale = _.holder_image.content.scale;
		});

		props.animCoordsHome = {x: 46.31, y: -30}; //{x: 316, y: 478},
		controls.shift_pos('reset');
	},

	set_zoom: (type) => {
		let scaleDelta = 0.02;

		let globalPoint = _.localToGlobal(_.centreMark.x, _.centreMark.y);
		let constant_centre = _.holder_image.content.globalToLocal(globalPoint.x, globalPoint.y);

		let offsetX = -(constant_centre.x * scaleDelta);
		let offsetY = -(constant_centre.y * scaleDelta);

		switch(type){
			case 'in':
				props.targetScale += scaleDelta;

				props.targetX += offsetX;
				props.targetY += offsetY;
				break;

			case 'out':
				props.targetScale -= scaleDelta;

				props.targetX -= offsetX;
				props.targetY -= offsetY;
				break;
		};

		_.holder_image.content.scale = props.targetScale;
		controls.set_pos('zoom');

		props.currentScale =
		props.targetScale = _.holder_image.content.scale;
		props.isZooming = false;
	},
	shift_zoom: (type, scaleDelta) => {
		if(scaleDelta == undefined){
			scaleDelta = 0.02;
		};

		let globalPoint = _.localToGlobal(_.centreMark.x, _.centreMark.y);
		let constant_centre = _.holder_image.content.globalToLocal(globalPoint.x, globalPoint.y);

		let offsetX = -(constant_centre.x * scaleDelta);
		let offsetY = -(constant_centre.y * scaleDelta);

		switch(type){
			case 'in':
				props.targetScale += scaleDelta;

				props.targetX += offsetX;
				props.targetY += offsetY;
				break;

			case 'out':
				if(props.targetScale > props.minScale){
					props.targetScale -= scaleDelta;

					props.targetX -= offsetX;
					props.targetY -= offsetY;
				};
				break;

			case 'dblclicked':
				if(_.holder_image.content.scale > props.startScale){
					controls.reset();
					controls.shift_pos('zoom');
					return;
				};
				break;
		};

		if(props.currentScale != props.targetScale && props.isZooming){
			if(_.holder_image.tween_zoom){
				_.holder_image.tween_zoom.pause();
			};

			_.holder_image.tween_zoom = Tween(_.holder_image.content, 'scale', 'inOut', props.targetScale, .5, function(){
				props.currentScale =
				props.targetScale = _.holder_image.content.scale;
				props.isZooming = false;
			});

			controls.shift_pos('zoom');
		};
	},

	set_pos: (type) => {
		switch(type){
			case 'zoom':
				break;

			case 'up':
				props.targetY += 1000 * _.holder_image.content.scale;
				break;

			case 'down':
				props.targetY -= 1000 * _.holder_image.content.scale;
				break;

			case 'left':
				props.targetX += 1500 * _.holder_image.content.scale;
				break;

			case 'right':
				props.targetX -= 1500 * _.holder_image.content.scale;
				break;
		};

		_.holder_image.content.x = props.targetX;
		_.holder_image.content.y = props.targetY;

		props.animCoords.x = _.holder_image.content.x;
		props.currentX = 
		props.targetX = _.holder_image.content.x;
		props.animCoords.y = _.holder_image.content.y;
		props.currentY = 
		props.targetY = _.holder_image.content.y;
	},
	shift_pos: (type) => {
		switch(type){
			case 'reset':
				props.targetX = props.animCoordsHome.x;
				props.targetY = props.animCoordsHome.y;
				break;

			case 'zoom':
				break;

			case 'up':
				props.targetY += 1000 * _.holder_image.content.scale;
				break;

			case 'down':
				props.targetY -= 1000 * _.holder_image.content.scale;
				break;

			case 'left':
				props.targetX += 1500 * _.holder_image.content.scale;
				break;

			case 'right':
				props.targetX -= 1500 * _.holder_image.content.scale;
				break;
		};

		if(_.holder_image.tween_posX){
			_.holder_image.tween_posX.pause();
		};

		if(_.holder_image.tween_posY){
			_.holder_image.tween_posY.pause();
		};

		_.holder_image.tween_posX = Tween(_.holder_image.content, 'x', 'inOut', props.targetX, .5, function(){
			props.animCoords.x = _.holder_image.content.x;

			props.currentX = 
			props.targetX = _.holder_image.content.x;
		});
		_.holder_image.tween_posY = Tween(_.holder_image.content, 'y', 'inOut', props.targetY, .5, function(){
			props.animCoords.y =  _.holder_image.content.y;

			props.currentY =
			props.targetY = _.holder_image.content.y;
		});

		setTimeout(function(){
			_.zoomIn.mouseEnabled = true;
			_.zoomOut.mouseEnabled = true;

			_.up.mouseEnabled = true;
			_.down.mouseEnabled = true;
			_.left.mouseEnabled = true;
			_.right.mouseEnabled = true;
		}, 500)
	},

	buttons: {
		init: () => {
			//reset
			_.reset.on('mousedown', function(){
				controls.reset();
			});

			//zoom
			_.zoomIn.on('mousedown', function(){
				this.mouseEnabled = false;
				props.zoomType = 'in';
				props.isZooming = true;
				controls.shift_zoom('in');
			});

			_.zoomOut.on('mousedown', function(){
				this.mouseEnabled = false;
				props.zoomType = 'out';
				props.isZooming = true;
				controls.shift_zoom('out');
			});

			//position
			_.up.on('mousedown', function(){
				this.mouseEnabled = false;
				controls.shift_pos('up');
			});

			_.down.on('mousedown', function(){
				this.mouseEnabled = false;
				controls.shift_pos('down');
			});

			_.left.on('mousedown', function(){
				this.mouseEnabled = false;
				controls.shift_pos('left');
			});

			_.right.on('mousedown', function(){
				this.mouseEnabled = false;
				controls.shift_pos('right');
			});
		},
	},
};

function readZoom(action) {
	props.isZooming = true;
	if(action.wheelDelta > 0 || action.detail > 0) {
		controls.shift_zoom('in');
	} else if(action.wheelDelta < 0 || action.detail < 0) {
		controls.shift_zoom('out');
	};
};

function quickZoom(){
	//set the target zoom or ignore if already zoomed
	if(!props.zoomed){
		props.targetScale = props.quickZoomScale;
	};

	//set anim coords to calc coord delta  
	props.animCoords.x = _.holder_image.content.x;
	props.animCoords.y = _.holder_image.content.y;

	//calcs offset so clicked point is always centered, even if user moves image
	let delta_x = props.animCoordsHome.x - props.animCoords.x;
	let delta_y = props.animCoordsHome.y - props.animCoords.y;
	
	//convert mouse coords to relative coords to the image.
	//subtract that position from the images position to get target destination. 
	props.mouseCoords = _.globalToLocal(stage.mouseX, stage.mouseY);
	let globalPoint = _.localToGlobal(props.mouseCoords.x, props.mouseCoords.y);
	let constant_centre = _.holder_image.content.globalToLocal(globalPoint.x, globalPoint.y);

	let offsetX = (constant_centre.x * props.targetScale);
	let offsetY = -(constant_centre.y * props.targetScale);

	let new_x = props.animCoords.x - offsetX + delta_x;
	let new_y = props.animCoords.y + offsetY + delta_y;

	//centres the 'value' section
	if(new_x < 1970 && new_x > -480){
		if(new_y < 160 && new_y > -400){
			new_x = 1192;
			new_y = -91.84;
		};
	};

	props.targetX = new_x;
	props.targetY = new_y;

	//do zoom, also. shifts position
	props.zoomType = 'in';
	props.isZooming = true;
	controls.shift_zoom('dblclicked');
};

function init_image(){
	_.holder_image.content.x = props.animCoordsHome.x;
	_.holder_image.content.y = props.animCoordsHome.y;

	_.holder_image.content.scale = props.startScale;
	props.currentScale =
	props.targetScale = _.holder_image.content.scale;

	props.currentX = 
	props.targetX = _.holder_image.content.x;
	props.currentY =
	props.targetY = _.holder_image.content.y;

	props.animCoords = props.animCoordsHome;
};

function bringToFront(obj) {
    obj.parent.stop();
    obj.parent.setChildIndex(obj, obj.parent.children.length-1);
};
