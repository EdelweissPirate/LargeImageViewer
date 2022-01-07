//Sim created by Josh Evans 2021

var props = {
    grab: {
        obj: null,
    },

    grabberCoords: {x: 0, y: 0},
    grabberCoordsHome: {x: 0, y: 0},
    animCoords: {x: 0, y: 0},
    animCoordsHome: {x: 46.31, y: -30},//{x: 316, y: 478},

    mouseCoords: {x: 0, y: 0},
    coordsRatioX: 0,
    coordsRatioY: 0,
    mouseDelta: 0,

    startScale: 0.065,//0.15,
    currentScale: 0,
    targetScale: 0,
    minScale: 0.029,
    quickZoomScale: 0.28,
    zoomed: false,

    currentX: 0,
    targetX: 0,
    currentY: 0,
    targetY: 0,

    image: {
        baseWidth: 15209,
        baseHeight: 13060
    },

    visibleWidth: 1563,
    visibleHeight: 880
};

function onEnterFrame() {
    grab.update();
    props.zoomed = (_.holder_image.content.scale > props.startScale);
};

document.ready(function(){
    init_touch()

    init_();

    controls.init();
});
