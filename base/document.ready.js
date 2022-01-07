//Ready
document.check = {
    schedule: [],
    interval: setInterval(function() {
        if (
            typeof exportRoot !== "undefined" &&
            exportRoot.children.length >= 1
        ) {
            clearInterval(document.check.interval);
            document.check.execute();
        }
    }, 10),
    execute: function(){
        for(var i = 0; i < document.check.schedule.length; i++){
            document.check.schedule[i]();
        }
    },
};
document.ready = function(newFunc){
    document.check.schedule.push(newFunc);
};
