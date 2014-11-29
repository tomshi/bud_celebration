var getReadyByIE = function () {
    controlFlow();
};

var dataReadyByIE = function () {
    var today = ugc_date.split('/');
    var month = today[0];
    var day = today[1];
    today = DATA_HISTORY.find(function (element, index, array) {
        return element.date == ugc_date
    });
    $(".ugc-name").text(ugc_name);
    $(".ugc-purpose").text(ugc_purpose);
    $(".month").text(month);
    $(".day").text(day);
    var formatHistory = function (history) {
        var history = history.split('|');
        return '<div class="today">' + history.shift() + '</div>' + history.join('<br/>');
    };
    $("#ie-frame2-text").html(formatHistory(today.history1));
    $("#ie-frame3-text").html(formatHistory(today.history2));

    $('#form').fadeOut(800);
    $("#ie-frame1").fadeIn(800, function(){
        setTimeout(function(){
            $('#ie-frame1').fadeOut(800);
            $('#ie-frame2').fadeIn(800, function(){
                setTimeout(function(){
                    $('#ie-frame2').fadeOut(800);
                    $('#ie-frame3').fadeIn(800, function(){
                        setTimeout(function(){
                            $('#ie-frame3').fadeOut(800);
                            $('#ie-frame4').fadeIn(800, function(){
                                setTimeout(function(){
                                    $('#ie-frame4').fadeOut(800);
                                    $('#ie-frame5').fadeIn(800, function(){
                                        setTimeout(function(){
                                            $('#ie-frame5').fadeOut(800);
                                            $('#ie-frame6').fadeIn(800, function(){
                                                setTimeout(function(){
                                                    $('#ie-frame6').fadeOut(800);
                                                    $('#ie-frame7').fadeIn(800, function(){
                                                        setTimeout(function(){
                                                            $('#ie-frame7').fadeOut(800);
                                                            $('#ie-frame8').fadeIn(800, function(){
                                                                setTimeout(function(){
                                                                    $('#ie-frame8').fadeOut(800);
                                                                    $('#ie-frame9').fadeIn(800, function(){
                                                                        setTimeout(function(){
                                                                            $('#ie-frame9').fadeOut(800);
                                                                            $('#ie-frame10').fadeIn(800, function() {
                                                                                setTimeout(function () {
                                                                                    $('#ie-frame10').fadeOut(800);
                                                                                    $('#ending').fadeIn(800);
                                                                                }, 1500)
                                                                            });
                                                                        }, 1500)
                                                                    });
                                                                }, 1500)
                                                            });
                                                        }, 1500)
                                                    });
                                                }, 1500)
                                            });
                                        }, 1500)
                                    });
                                }, 1500)
                            });
                        }, 1500)
                    });
                }, 1500)
            });
        }, 1500)
    });


    /*("#ie-frame1").show();
    $("#ie-frame2").show();
    TweenMax.to("#ie-frame1" , 2, {
        opacity: 1,
        delay: 0,
        ease: Sine.SineIn,
        onComplete: function(){
            TweenMax.to("#ie-frame1" , 2, {
                opacity: 0,
                delay: 1.5,
                ease: Sine.SineIn
            });
            TweenMax.to("#ie-frame2" , 2, {
                opacity: 1,
                delay: 1.5,
                ease: Sine.SineIn,
                onComplete: function(){
    $("#ie-frame3").show();
    $("#ie-frame4").show();
                    TweenMax.to("#ie-frame2" , 2, {
                        opacity: 0,
                        delay: 1.5,
                        ease: Sine.SineIn
                    });
                    TweenMax.to("#ie-frame3" , 2, {
                        opacity: 1,
                        delay: 1.5,
                        ease: Sine.SineIn,
                        onComplete: function(){
                            TweenMax.to("#ie-frame3" , 2, {
                                opacity: 0,
                                delay: 1.5,
                                ease: Sine.SineIn
                            });
                            TweenMax.to("#ie-frame4" , 2, {
                                opacity: 1,
                                delay: 1.5,
                                ease: Sine.SineIn,
                                onComplete: function(){
    $("#ie-frame5").show();
    $("#ie-frame6").show();
                                    TweenMax.to("#ie-frame4" , 1, {
                                        opacity: 0,
                                        delay: 0.8,
                                        ease: Sine.SineIn
                                    });
                                    TweenMax.to("#ie-frame5" , 1, {
                                        opacity: 1,
                                        delay: 0.8,
                                        ease: Sine.SineIn,
                                        onComplete: function(){
                                            TweenMax.to("#ie-frame5" , 1, {
                                                opacity: 0,
                                                delay: 0.8,
                                                ease: Sine.SineIn
                                            });
                                            TweenMax.to("#ie-frame6" , 1, {
                                                opacity: 1,
                                                delay: 0.8,
                                                ease: Sine.SineIn,
                                                onComplete: function(){

    $("#ie-frame7").show();
    $("#ie-frame8").show();
                                                    TweenMax.to("#ie-frame6" , 1, {
                                                        opacity: 0,
                                                        delay: 0.8,
                                                        ease: Sine.SineIn
                                                    });
                                                    TweenMax.to("#ie-frame7" , 1, {
                                                        opacity: 1,
                                                        delay: 0.8,
                                                        ease: Sine.SineIn,
                                                        onComplete: function(){
                                                            TweenMax.to("#ie-frame7" , 1, {
                                                                opacity: 0,
                                                                delay: 0.8,
                                                                ease: Sine.SineIn
                                                            });
                                                            TweenMax.to("#ie-frame8" , 1, {
                                                                opacity: 1,
                                                                delay: 0.8,
                                                                ease: Sine.SineIn,
                                                                onComplete: function(){

    $("#ie-frame9").show();
    $("#ie-frame10").show();
                                                                    TweenMax.to("#ie-frame8" , 1, {
                                                                        opacity: 0,
                                                                        delay: 0.8,
                                                                        ease: Sine.SineIn
                                                                    });
                                                                    TweenMax.to("#ie-frame9" , 1, {
                                                                        opacity: 1,
                                                                        delay: 0.8,
                                                                        ease: Sine.SineIn,
                                                                        onComplete: function(){
                                                                            TweenMax.to("#ie-frame9" , 1, {
                                                                                opacity: 0,
                                                                                delay: 0.8,
                                                                                ease: Sine.SineIn
                                                                            });
                                                                            TweenMax.to("#ie-frame10" , 1, {
                                                                                opacity: 1,
                                                                                delay: 0.8,
                                                                                ease: Sine.SineIn,
                                                                                onComplete: function(){
    $("#ending").show();
                                                                                    TweenMax.to("#ie-frame10" , 2, {
                                                                                        opacity: 0,
                                                                                        delay: 2,
                                                                                        ease: Sine.SineIn
                                                                                    });
                                                                                    TweenMax.to("#ending" , 2, {
                                                                                        opacity: 1,
                                                                                        delay: 2,
                                                                                        ease: Sine.SineIn,
                                                                                        onComplete: function(){
                                                                                            TweenMax.to(".endtext", 1, {
                                                                                                opacity: 1,
                                                                                                delay: 0.7,
                                                                                                ease: Sine.SineIn
                                                                                            });
                                                                                            TweenMax.to(".btns .item", 1, {
                                                                                                opacity: 1,
                                                                                                delay: 1.8,
                                                                                                ease: Sine.SineIn
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });*/
};