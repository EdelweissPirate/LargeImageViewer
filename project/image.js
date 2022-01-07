function init_hitAreas(){
    _.holder_image.hitArea = new createjs.Shape();
    _.holder_image.addChild(_.grabber.hitArea);
    _.holder_image.hitArea.graphics.beginFill('rgba(255, 0, 0, 1)').drawRect(0, 0, 1024, 880);
};