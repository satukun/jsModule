function boxMove(opt) {
    this.size      = opt.size;
    this.speed     = opt.speed;
    this.len       = opt.len;
    this.timing    = opt.timing;
    this.direction = opt.direction;
    this.cnt = [];
    this.boxbox;

    $list = $(".boxMove__list");

    this.text = "ハゲ丸くん";

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
  var self = this;
  var boxMax = 0;


  while(100 >= boxMax){
    var color = '#' + ("00000"+Math.floor(Math.random() * 0x1000000).toString(16)).substr(-6);
    var box = Math.floor(Math.random() * 60) + 1;
    boxMax = boxMax + box;
    if(boxMax > 100){
      console.log(boxMax);
      diff = (boxMax - 100)
      console.log("over↓");
      console.log(diff);
      start(color,diff);
    }else{
      start(color,box);
    }
  }

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
  $BODY.append(ele);
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