    var CA;
    var CP_DIR              = 'muchakoslot' + '/'; //毎回のcontentのurl
    var BACK_TO_CP_TEXT     = '回して！答えて！お題スロット'; //エディタに貼付されるCPに戻るテキスト
    var HASH_TITLE          = '回して答えてお題スロット'; //固定でくっつくハッシュタグ
    var ENTRY_TITLE         = 'ムチャブリお題に参加中'  //エディタタイトル
    var MISTRAL_URL         = 'http://lo.ameba.jp/v1/yZYfRdEgpGtjYbamvGmM';
    var CPN_STAMP_STAT      = 'http://stat100.ameba.jp/blog/img/lp/' + CP_DIR;
    var CMN_EDIT_URL        = 'http://blog.ameba.jp/ucs/entry/srventryinsertinput.do';
    var ENTRY_TITLE_OPTION  = '?entry_title=';
    var ENTRY_TEXT_OPTION   = '&entry_text=';
    var HASH_OPTION         = '&hashtag=';
    var $TEXT_BOX           = $(textBox);
    var $SLOT_BUTTON        = $(".u-rouletteButton");
    //slot回転情報
    var DELAY               = 200;
    var ACCELE              = 4;
    var DECELE              = 1.4;
    var ACCELE_ADD          = 150;
    var DECELE_ADD          = 10;
    var FLAME_HEIGHT        = 250;
    //遷移先の吹き出しむちゃ子の総数
    var MUCHAKO_IMG         = 10;
    //多重防止
    var defense             = false;
    var slotCnt             = [];
    var boxbox;
    function slotMacine(word, spec) {
        var self = this
        this.word = word;
        this.speed = spec;
        self._init();
    }
    slotMacine.prototype = {
        /************************************************
        //init
        ************************************************/
        _init: function() {
            var self = this;
            if (!self.word) {
                console.log("error..");
                return false;
            }
            self._shuffle(self.word);
            self._count();
        },
        /************************************************
        //count
        ************************************************/
        _count: function() {
            var self = this;
            self._render(template(self.word));

            function template(array) {
                var listall = [];
                listall += '<div class="u-rouletteBox"><ul>';
                $.each($(array), function(index, elem) {
                    listall += '<li class="u-rouletteBox__list"><span>' + elem + '</span></li>';
                });
                listall += '</ul></div>';
                return listall;
            }
        },
        /*************************************************
        //render
        ************************************************/
        _render: function(elmentBox) {
            var self = this;
            $(".u-roulette").append(elmentBox);
            self._move(true);
        },
        /************************************************
        //shuffle
        ************************************************/
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
        /************************************************
        //move
        ************************************************/
        _move: function(flag) {
            var self = this;
            rotation = function(self) {
                var $slot = $(".u-rouletteBox").eq(self.speed.num);
                var clone = $slot.find("li:first").clone(true);
                $slot.find("li:first").animate({
                    marginTop: "-" + FLAME_HEIGHT + "px"
                }, {
                    duration: self.speed.delay,
                    easing: "linear",
                    complete: function() {
                        $slot.find("li:first").remove();
                        clone.clone(true).insertAfter($slot.find("li:last"));
                        if (!flag) {
                            if (self.speed.delay > DECELE_ADD) {
                                clearInterval(slotCnt.shift());
                                if (slotCnt.length == 0) {
                                    slotCnt.length = 0;
                                    $(".u-slotbtn__Start").css("display", "none");
                                    $(".u-slotbtn__Retry").css("display", "inline-block");
                                    $(".u-slotbtn__Def").css("display", "none");
                                    $(".u-slotbtn__Active").css("display", "inline-block");
                                    defense = false;
                                    self._theme();
                                }
                            } else {
                                self.speed.delay = self.speed.delay * self.speed.decele;
                            }
                        } else {
                            if (self.speed.delay > ACCELE_ADD) {
                                self.speed.delay = self.speed.delay / self.speed.accele;
                            } else {
                                self.speed.delay = ACCELE_ADD;
                                $(".u-slotbtn__Start").css("display", "inline-block");
                                $(".u-slotbtn__Retry").css("display", "none");
                                $(".u-slotbtn__Def").css("display", "inline-block");
                                $(".u-slotbtn__Active").css("display", "none");
                            }
                        }
                    }
                });
            }
            slotCnt.push(boxbox = setInterval(function() {
                rotation(self)
            }, 0));
        },
        /************************************************
        //theme
        ************************************************/
        _theme: function() {
            var self = this;
            var themebox = [];
            $(".u-rouletteBox").each(function() {
                themebox.push($(this).find("li:first").text());
            });
            self._muchako(themebox);
        },
        /************************************************
        //muchako
        ************************************************/
        _muchako: function(themebox) {
            var self = this;
            var MuchakoImg = Math.floor(Math.random() * (MUCHAKO_IMG + 1 - 1)) + 1;
            if (MuchakoImg < 10) {
                MuchakoImg = "0" + MuchakoImg + ".png";
            } else {
                MuchakoImg = MuchakoImg + ".png";
            }
            self._editUrl(MuchakoImg, themebox);
        },
        /************************************************
        //encode
        ************************************************/
        _encode: function(data) {
            var self = this;
            return encodeURIComponent(data);
        },
        /************************************************
        //editUrl
        ************************************************/
        _editUrl: function(stanp, text) {
            var self = this;
            var CPN_STAMP_DATA = {
                url: CPN_STAMP_STAT + stanp,
                theme: text,
                wd: '220',
                ht: '360'
            };
            var editData = {
                url: CMN_EDIT_URL,
                backCpthemeUrl: '<div>********************<br><span>' + CPN_STAMP_DATA.theme[0] + '</span><br><span>' + CPN_STAMP_DATA.theme[1] + '</span><br><span>' + CPN_STAMP_DATA.theme[2] + '</span><br>********************<br><br><br></div>',
                backCpBnrUrl: '<div><a href="' + MISTRAL_URL + '" target="_blank"><img src="' + CPN_STAMP_DATA.url + '" width="' + CPN_STAMP_DATA.wd + ' "></a></div>',
                backCpTxtUrl: '<div><a href="' + MISTRAL_URL + '" target="_blank"><img src="' + CPN_STAMP_STAT + 'card_bnr.png" alt="' + BACK_TO_CP_TEXT + '" width="' + CPN_STAMP_DATA.wd + ' "></a><br><br><br></div>',
            };
            var editUrlLead = self._encode(editData.backCpthemeUrl + editData.backCpBnrUrl + editData.backCpTxtUrl);

            function editUrl(val) {
                var headTitle = ENTRY_TITLE_OPTION + self._encode('「' + CPN_STAMP_DATA.theme[0] + CPN_STAMP_DATA.theme[1] + CPN_STAMP_DATA.theme[2] + '」に答えてみた');
                var editTitle = ENTRY_TEXT_OPTION + self._encode('<p>' + ENTRY_TITLE + '</p>');
                var setUrl = editData.url + headTitle + editTitle + editUrlLead + HASH_OPTION + self._encode(HASH_TITLE);
                $('#blog').attr('href', setUrl);
            }
            editUrl();
        },
        /************************************************
        //scroll
        ************************************************/
        _scroll: function() {
            $(window).scroll(function(e) {
                var $window = $(e.currentTarget),
                    scrollTop = $window.scrollTop(),
                    offset = $(".sb-summary").offset();
                if (scrollTop > (offset.top * 0.8)) {
                    $(".u-muchako--a").addClass("u-muchako--a-escape");
                    $(".u-muchako--b").addClass("u-muchako--b-escape");
                } else {
                    $(".u-muchako--a").removeClass("u-muchako--a-escape");
                    $(".u-muchako--b").removeClass("u-muchako--b-escape");

                }
            });
        },
        /************************************************
        //button
        ************************************************/
        _button: function() {
            $SLOT_BUTTON.find("li").on("click", function() {
                var btnType = $(this).attr("class");
                switch (btnType) {
                    case 'u-slotbtn__Start':
                        if (!defense) {
                            defense = true;
                            CA._move(false);
                        }
                        break;
                    case 'u-slotbtn__Retry':
                        if (!defense) {
                            start();
                        }
                        break;
                }
            });
        }
    }

    //start
    /*****************/
    function start() {
        CA = "";
        $(".u-roulette").html("");
        $.each($TEXT_BOX, function(val, array) {
            CA = new slotMacine(array, {
                "delay": DELAY * (val + 1),
                "accele": ACCELE,
                "decele": DECELE,
                "num": val
            });
            if ($TEXT_BOX.length - 1 == val) {
                $(".u-slotbtn__Def").css("display", "inline-block");
                $(".u-slotbtn__Active").css("display", "none");
            }
        });
    }
    //controller
    /*****************/
    $SLOT_BUTTON.find("li").on("click", function() {
        var btnType = $(this).attr("class");
        switch (btnType) {
            case 'u-slotbtn__Start':
                if (!defense) {
                    defense = true;
                    CA._move(false);
                }
                break;
            case 'u-slotbtn__Retry':
                if (!defense) {
                    start();
                }
                break;
        }
    });