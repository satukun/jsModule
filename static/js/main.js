var CA = CA || {};
CA = {
    circleFall: function(opt) {
        for (var i = 1; opt.len >= i; i++) {
            new circleFall(opt);
        }
    },
    boxLinking: function() {
        boxLinking();
    },
    targetPost: function(opt) {
        for (var i = 1; opt.lane >= i; i++) {
            new targetPost(opt, i);
        }
    },
    postTime: function() {
        postTime();
    },
    userAgent: function(root) {
        decision(root);
    },
    slotMacine: function() {
        start();
    }
}