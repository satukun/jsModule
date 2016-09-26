var CA = CA || {};
CA = {
    circleFall:function(opt){
        for(var i = 1; opt.len >= i; i++ ){
              new circleFall(opt);
        }
    },
    boxMove:function(opt){
        $BODY   = $('body');
        var i = 0;
        var yousuke = function(){
            if(opt.len >= i){
                new boxMove(opt);
                i++;
                setTimeout(yousuke,opt.speed);
            }
        };
        setTimeout(yousuke,0);
    },
    targetPost:function(opt){
        for (var i = 1; opt.lane >= i; i++) {
          new targetPost(opt, i);
        }
    },
    postTime:function(){
        postTime();
    },
    userAgent:function(root){
        decision(root);
    },
    slotMacine:function(){
        start();
    }
}