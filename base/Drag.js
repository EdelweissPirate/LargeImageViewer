function startDrag(target,lockCenter){
    Drag.object = target;
    if(lockCenter){
        Drag.offsetX = 0;
        Drag.offsetY = 0;
    }else{
        Drag.offsetX = stage.mouseX/stage.scaleX - Drag.object.x;
        Drag.offsetY = stage.mouseY/stage.scaleY - Drag.object.y;
    }
}
function updateDrag(){
    if(Drag.object){
        Drag.object.x = stage.mouseX/stage.scaleX - Drag.offsetX;
        Drag.object.y = stage.mouseY/stage.scaleY - Drag.offsetY;
    }
}
function stopDrag(){
    Drag.object = null;
}

var Drag = {
    object: null,
    offsetX: 0,
    offsetY: 0
};