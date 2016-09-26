function decision(root){
  var ua = root.navigator.userAgent.toLowerCase();
  if((ua.indexOf('iphone') > -1 && ua.indexOf('ipad') < 0) || ua.indexOf('ipod') > -1 || ua.indexOf('android') > -1){
    console.log("sp");
  }else{
    console.log("pc");
  }
}