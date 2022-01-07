//Must be included AFTER document.ready.js

var FrameUpdate = {
    updateFunctions: [],
    refresh: function(){
        for(var r = 0; r < FrameUpdate.updateFunctions.length; r++){
            FrameUpdate.updateFunctions[r]();
        }
    },
    addFunction: function(newFunction){
        if(typeof newFunction === 'function'){
            switch(newFunction.name){
                case 'onEnterFrame':
                    this.updateFunctions.push(newFunction);
                    break;
                case 'updateDrag':
                default:
                    this.updateFunctions.unshift(newFunction);
                    break;
            }
        }
    }
}


document.ready(function(){
    if(typeof updateDrag !== 'undefined'){
        FrameUpdate.addFunction(updateDrag);
    }
    if(typeof onEnterFrame !== 'undefined'){
        FrameUpdate.addFunction(onEnterFrame);
    }
    createjs.Ticker.addEventListener("tick",FrameUpdate.refresh.bind(exportRoot));
});