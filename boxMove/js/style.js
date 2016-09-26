function boxMove(opt) {
    this.size      = opt.size;
    this.speed     = opt.speed;
    this.len       = opt.len;
    this.timing    = opt.timing;
    this.direction = opt.direction;
    this.cnt = [];
    this.boxbox;
    $list = $(".boxMove__list");
    $line = $("<div>", {class:"line"})
    this.init();
}


/*初期設定
*******************************/
boxMove.prototype.init       = function() {
  this.template();
};

/*ボックリスト作成
*******************************/
boxMove.prototype.template   = function(){
  var self   = this;
  var boxMax = 0;
  var diff   = 0;
  
  var cont = function(){
    var color = '#' + ("00000"+Math.floor(Math.random() * 0x1000000).toString(16)).substr(-6);
    var box   = Math.floor(Math.random() * 20) + 1;

    diff      = boxMax;
    boxMax    = boxMax + box;
    if(boxMax > 100){
      diff = (100 - diff);
      start(color,diff);
      boxMax = 0;
      diff = 0;
      $BODY.append($line);
    }else{
      start(color,box);
    }

    setTimeout(cont,1000);
  }
  setTimeout(cont,0);

  function start(color,box){
    $list = $("<dl/>",{class:"boxMove__list"}).css({
      "background-color":color,
      "width":box + "%"
    });
    self.render($list);
  }
};

/*レンダリング
*******************************/
boxMove.prototype.render     = function(ele){
  $BODY.append($line.append(ele));
  this.appearance(ele);
};

/*移動
*******************************/
boxMove.prototype.appearance = function(ele){
  ele.animate({
    opacity:1
  });
};

/*初期設定
*******************************/
boxMove.prototype.vanish     = function(){

};

/*イベント登録
*******************************/
boxMove.prototype.handle     = function(){

};