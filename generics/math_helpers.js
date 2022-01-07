function sqrt(x){
    return Math.sqrt(x);
}
function sq(x){
    return Math.pow(x,2);
}
function atan(x){
    return Math.atan(x);
}
function atan2(y,x){
    return Math.atan2(y,x);
}
function asin(x){
    return Math.asin(x);
}
function sin(x){
    return Math.sin(x);
}
function cos(x){
    return Math.cos(x);
}
function tan(x){
    return Math.tan(x);
}
function round(x){
    return Math.round(x);
}
function roundTo(x,places){
    var rounder = pow(10,places);
    return round(x * rounder)/rounder;
}

function floor(x){
    return Math.floor(x);
}
function ceil(x){
    return Math.ceil(x);
}

function max(x,y){
    return Math.max(x,y);
}
function min(x,y){
    return Math.min(x,y);
}
function mid(x,y){
    return x + (y - x)/2;
}
function between(min,max,n){
    return line_y(n,min,min,max);
}
function inverse_between(min,max,val){
    return 1 - (max - val)/(max - min);
}
function limit(l_bound,u_bound,x){
    var l = min(l_bound,u_bound);
    var u = max(l_bound,u_bound);
    return min(u,max(l,x));
}

function exp(x){
    return Math.exp(x);
}

function log(x){
    return Math.log(x);
}
function pow(x,n){
    return Math.pow(x,n);
}
function log_10(x){
    return log(x)/log(10);
}

function abs(x){
    return Math.abs(x);
}
function dir(x){
    return x/abs(x);
}
function dif(x,y){
    return abs(x - y);
}

function pi(){
    return Math.PI;
}
function radToDeg(angle){
    return angle*180/pi();
}
function degToRad(angle){
    return angle*pi()/180;
}

function toDeg(angle){
    return radToDeg(angle);
}
function toRad(angle){
    return degToRad(angle);
}






function line_y(m,x0,y0,x){
    return m * (x - x0) + y0;
}
function quadratic_formula(A,B,C){
    var desc = sq(B) - 4 * A * C;
    var solutions = [];
    if(desc > 0){
        //2 real solutions
        solutions[0] = (-B + sqrt(desc))/(2 * A);
        solutions[1] = (-B - sqrt(desc))/(2 * A);
    }else if(desc === 0){
        //1 real solution
        solutions[0] = (-B + sqrt(desc))/(2 * A)
    }else{
        //No real solutions
    }
    return solutions;
}

function distance_between(x1,y1,x2,y2){
    return sqrt(sq(x2 - x1) + sq(y2 - y1));
}


function line_y_fromPoints(x1,y1,x2,y2,x){
    var m = (y2 - y1)/(x2 - x1);
    return line_y(m,x1,y1,x);
}
