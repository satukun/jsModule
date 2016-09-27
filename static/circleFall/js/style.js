function circleFall(opt) {
    this.size      = opt.size;
    this.speed     = opt.speed;
    this.len       = opt.len;
    this.timing    = opt.timing;
    this.direction = opt.direction;
    this.cnt = [];
    this.boxbox;
    $MAIN    = $('#start');
    $SCREEN  = {
      wH : $('#start').height(),
      wW : $('#start').width()
    }
    this.init();
    this.handle();
}


/*初期設定
*******************************/
circleFall.prototype.init      = function() {
    this.resize();
    this.position(false);
};


/*サークルポジション
*******************************/
circleFall.prototype.position  = function(flag,ele) {
    var circleSize = Math.floor(Math.random() * this.size);
    var opt = {
        width  : circleSize + "px",
        height : circleSize + "px",
        top    : Math.floor(Math.random() * $SCREEN.wH) + "px",
        left   : Math.floor(Math.random() * $SCREEN.wW) + "px"
    }

    if(!flag && !ele){
      $circle  = $("<span/>",{class:"md"}).css(opt);
      this.render($circle);
    }else{
      if(this.direction == "top"){
        opt.top  = - (circleSize + 100) + "px";
      }else{
        opt.left = - (circleSize + 100) + "px";
      }
      ele.css(opt);
      this.animation(ele);
    }
};


/*レンダリング
*******************************/
circleFall.prototype.render    = function(ele) {
    $MAIN.append(ele);
    this.animation(ele);
};


/*アニメーション
*******************************/
circleFall.prototype.animation = function(ele) {
    // ele.addClass("ini");
    this.move(ele);
};


/*移動させる
*******************************/
circleFall.prototype.move      = function(ele) {
    var self   = this;
    fall = function(){
      if(self.direction == "top"){
        check($SCREEN.wH);
      }else{
        check($SCREEN.wW);
      }

      function check(vh){
        var check = eval(ele.css(self.direction).replace("px",""));
        if(vh >= check){
          ele.css(self.direction,"+=" + self.speed + "px");
        }else{
          clearInterval(self.cnt.shift());
          self.position(true,ele);
        }
      }
    }
    self.cnt.push(self.box = setInterval(fall, Math.floor(Math.random() * self.timing)));
};


circleFall.prototype.resize      = function() {
    $('#main,#start').removeAttr("style").css({
      "height" : $(document).height() + "px"
    });
};


/*イベント登録
*******************************/
circleFall.prototype.handle    = function() {
  var self = this;
  $(window).on('resize scroll',function(){
    $SCREEN = {
      wH : $(document).height(),
      wW : $(document).width()
    }
    self.resize();
  });
};