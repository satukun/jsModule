  var POINT = [100, 300, 800, 1500];
  var $rouletteBoxList = "<li class='sb-stage__target'></li>";
  var intervalCnt = [];
  var boxbox;　
  var tete;
  var point = 0;
  var total = 0;

  function targetPost(arg, i) {
    this.num = i - 1;
    this.speed = arg.speed;
    this.target = arg.target;
    this.width = 100 / arg.target;
    if (arg) {
      this._init(this);
    } else {
      console.log("設定してください。。");
    }
  }

  targetPost.prototype = {
    /***********
    //Init
    ************/
    _init: function() {
      var self = this;
      self._count();
    },
    /***********
    //Count
    ************/
    _count: function() {
      var self = this;
      self._render(template());

      function template() {
        var listall = [];
        for (var i = 0; self.target - 1 >= i; i++) {
          listall += $rouletteBoxList;
        };
        listall = '<ul class="sb-stage__item">' + listall + '</ul>';
        return listall;
      }
    },
    /************
    //Render
    ************/
    _render: function(listBox) {
      var self = this;
      var $stage = $('<div class="sb-stage">');
      $(".sb-topic__list").append($stage.append(listBox));
      $(".sb-stage__target").css("width", Math.floor(self.width) + '%');
      // $(".sb-stage__target").css("width", '8%');
      self._position();
    },
    /************
    //position
    ************/
    _position: function() {
      var self = this;
      $(".sb-stage:eq(" + self.num + ")").find(".sb-stage__target").each(function(i, elem) {
        self._move(self._lefts($(elem)));
      });
    },
    /************
    //lefts
    ************/
    _lefts: function(leftTarget) {
      var self = this;
      return leftTarget.css({
        "left": Math.floor(Math.random() * (100 - self.width)) + 0 + "%",
        "background-color": self._color()
      });
    },
    /***********
    //Shuffle
    ************/
    _shuffle: function(array) {
      var m = array.length,
        t, i;
      while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
      return m;
    },
    /***********
    //Move
    ************/
    _move: function(elem) {
      var self = this;
      rotation = function(post) {
        post.animate({
          top: "0%"
        }, {
          complete: function() {
            post.animate({
              left: Math.floor(Math.random() * (100 - self.width)) + 0 + "%"
            },{
              duration:1500,
              complete:function(){
                post.animate({
                  top: "100%"
                },{
                 complete:function(){
                    post.css("background-color", self._color());
                    self._lefts(post);
                  }
                });
              }
            });
          }
        });
      }
      // clearInterval(intervalCnt.shift());
      // var interBox;
      intervalCnt.push(boxbox = setInterval(function() {
        rotation($(elem));
      }, Math.floor(Math.random() * self.speed) + self.speed-1000));
    },
    /***********
    //colors
    ************/
    _color: function() {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      return strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
    }
  }



  $(document).on("click", ".sb-stage__target", function() {
    $(this).css("background-color", "black");
    total = total + 30;
    var mame = function() {
      point++;
      if (total >= point) {
        $(".sb-header__point").html(point)
        setTimeout(mame, 0);
      }
    }
    setTimeout(mame, 0);
  });


