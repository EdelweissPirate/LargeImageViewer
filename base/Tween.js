function Tween(object,property,ease,newVal,duration,callback) {

    var ease_obj;
    switch(ease){
        case 'none':
            ease_obj = createjs.Ease.none;
            break;
        case 'in':
            ease_obj = createjs.Ease.getPowIn(4);
            break;
        case 'out':
            ease_obj = createjs.Ease.getPowOut(4);
            break;
        case 'inOut':
            ease_obj = createjs.Ease.getPowInOut(4);
            break;
    }

    var tween_props = {};
    tween_props[property] = newVal;
    var tweenObject =  createjs.Tween.get(object,{override:false}).to(tween_props, duration * 1000, ease_obj).call(do_motionFinished);
    if(typeof callback === 'undefined'){
        tweenObject.onMotionFinished = function(){};
    }else{
        tweenObject.onMotionFinished = callback;
    }
    function do_motionFinished(){
            tweenObject.onMotionFinished();
    }
    return tweenObject;



}

