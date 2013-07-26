$(function () {
   aSalmon.bmwx1.init();
});

aSalmon.bmwx1 = {

    init: function () {
        aSalmon.bmwx1.containerWidth = parseInt($('#container').width());
        aSalmon.bmwx1.containerCenter = aSalmon.bmwx1.containerWidth / 2;
        aSalmon.bmwx1.containerOffset = parseInt($('#container').offset().left);
        aSalmon.bmwx1.setupHomeAnimation();
    },
    containerWidth: 0,
    containerCenter: 0,
    containerOffset: 0,
    mouseFollowDelay: 0,
    thinkComplete: false,
    moveComplete: false,
    tlHome: null,
    tlHomeMove: null,
    tlHomeThink: null,
    tlMove: null,
    tlThink: null,
    setupFlickNavAnimationDone: false,
    setupHomeAnimation: function () {
        // setup the Move home tweens
        aSalmon.bmwx1.tlHomeMove = new TimelineMax({
            onReverseComplete: function () {
                aSalmon.bmwx1.setupCarSlider();
            }
        });
        var homeTweensMove = [
            TweenMax.to($('#home-container'), 1, { css: { left: '+=2000px', opacity: 0 }, ease: Power2.easeInOut }),
            TweenMax.to($('#new-gen-bmwx1'), 2, { css: { left: '400px' }, ease: Power2.easeInOut })
        ];
        aSalmon.bmwx1.tlHomeMove.appendMultiple(homeTweensMove);
        aSalmon.bmwx1.tlHomeMove.pause();
        


        // setup the Think Home tween
        aSalmon.bmwx1.tlHomeThink = new TimelineMax({
            onReverseComplete: function () {
                aSalmon.bmwx1.setupCarSlider();
            }
        });
        var homeTweensThink = [
            TweenMax.to($('#home-container'), 1, { css: { left: '-=2000px', opacity: 0 }, ease: Power2.easeInOut }),
            TweenMax.to($('#new-gen-bmwx1'), 1, { css: { left: '400px' }, ease: Power2.easeInOut })
        ];
        aSalmon.bmwx1.tlHomeThink.appendMultiple(homeTweensThink);
        aSalmon.bmwx1.tlHomeThink.pause();


        aSalmon.bmwx1.setupCarSlider();
        TweenMax.to($('.loading'), .5, {
            css: {
                opacity: 0
            },
            ease: Power2.easeInOut,
            yoyo: true,
            repeat: -1
        });
        aSalmon.bmwx1.getMoveAndThinkContent();
    },
    getMoveAndThinkContent: function () {
        $.ajax({
            url: 'Home/Move',
            data: '',
            success: function (data) {
                $('#move-container').html(data);
                aSalmon.bmwx1.setupMoveAnimation();
                $('#move-arrow').removeClass('disabled');
                $('#move-arrow .loading').remove();
            },
            dataType: 'html',
            error: function (r, t, e) {
                //console.log(t);
            }
        });
        $.ajax({
            url: 'Home/Think',
            data: '',
            success: function (data) {
                $('#page-fullcircle').html(data);
                aSalmon.bmwx1.setupThinkAnimation();
                $('#think-arrow').removeClass('disabled');
                $('#think-arrow .loading').remove();
            },
            dataType: 'html',
            error: function (r, t, e) {
                //console.log(t);
            }
        });
    },
    setupCarSlider: function () {
        var moveCarTween = TweenMax.to($('#move-car'), 1, { css: { width: 312 }, ease: Power1.easeOut });
        $('#container').on('mousemove', function (e) {
            var mousePos = e.pageX - aSalmon.bmwx1.containerOffset;
            var diff = mousePos - aSalmon.bmwx1.containerCenter;
            var diffAbs = Math.abs(diff);
            if (diffAbs > aSalmon.bmwx1.mouseFollowDelay && diffAbs < 308) {
                aSalmon.bmwx1.moveComplete = false;
                aSalmon.bmwx1.thinkComplete = false;
                $('#move-arrow').removeClass('active');
                $('#think-arrow').removeClass('active');
                moveCarTween.updateTo({
                    css: { width: (308 + diff) }
                }, true).play();
            } else if (diffAbs > 308) {
                if (diff > 0 && !aSalmon.bmwx1.moveComplete) {
                    aSalmon.bmwx1.moveComplete = true;
                    moveCarTween.updateTo({
                        css: { width: 308 + diff }                     
                    });
                    $('#move-arrow').addClass('active');
                } else if (diff < 0 && !aSalmon.bmwx1.thinkComplete) {
                    aSalmon.bmwx1.thinkComplete = true;
                    $('#think-arrow').addClass('active');
                    moveCarTween.updateTo({ css: { width: Math.max(9, 308 + diff) }, ease: Power1.easeOut });
                }
            }
        });
    },
    turnOffCarSlider: function () {
        $('#container').off('mousemove');
    },
    setupMoveAnimation: function () {
        // setup the Move car tweens
        aSalmon.bmwx1.tlMove = new TimelineMax({
            onComplete: function () {
                $('#page-fullcircle').css('zIndex', '1');
                $('#move-container').css('zIndex', '2');
            }
        });
        var slideParams = {
            css: { left: '-1000px', opacity: 0 },
            ease: Power2.easeInOut,
            onStart: function () {
                this.target.css('visibility', 'visible');
            }
        };
        var slideParamsUp = {
            css: { left: '-1000px', top: '+=600px', opacity: 0 },
            ease: Power2.easeInOut,
            onStart: function () {
                this.target.css('visibility', 'visible');
            }
        };
        var slideParamsDown = {
            css: { left: '-1000px', top: '-=800px', opacity: 0 },
            ease: Power2.easeInOut,
            onStart: function () {
                this.target.css('visibility', 'visible');
            }
        };
        var moveTweens = [
            TweenMax.to($('#x1-large-move'), 1, { css: { left: '40px', opacity: 1 }, ease: Power2.easeInOut }),
            TweenMax.to($('#move-car-small'), 1, { css: { opacity: 1 }, ease: Power2.easeInOut }),
            TweenMax.from($('#move-k-shape'), 1.2, {
                css: {
                    left: '-1000px',
                    top: '-=800px',
                    opacity: 0
                },
                ease: Power2.easeInOut,
                onStart: function () {
                    this.target.css('visibility', 'visible');
                },
                onComplete: function () {
                    this.target.find('.grey-hex').css('visibility', 'visible');
                }
            }),
            TweenMax.from($('.move-hex'), 1.2, slideParamsUp),
            //TweenMax.from($('#intro .vid-cont'), 1.4, {
            //    css: { left: '-1000px', top: '+=600px', opacity: 0 },
            //    ease: Power2.easeInOut,
            //    onStart: function () {
            //        this.target.css('visibility', 'visible');
            //        $('#intro .vid-cont').html('<iframe width="500" height="281" src="http://www.youtube.com/embed/sFvEN3CZzps" frameborder="0" allowfullscreen></iframe>');
            //    },
            //    onReverseComplete: function () {
            //        $('#intro iframe').remove();
            //    }
            //}).delay(0.2),
            TweenMax.from($('.move-small-hex'), 1.4, slideParamsUp).delay(0.2),
            TweenMax.to($('#move-large-text-bg'), 1, { css: { left: '67px', opacity: 1 }, ease: Power2.easeInOut }).delay(0.4),
            //TweenMax.from($('#move-buttons'), 1.4, slideParams).delay(0.6),
            TweenMax.from($('.move-text h2'), 1.4, {
                css: { left: '-1000px', opacity: 0 },
                ease: Power2.easeInOut
            }).delay(0.6),
            TweenMax.from($('.move-text .text'), 1.4, {
                css: { left: '-1000px', opacity: 0 },
                ease: Power2.easeInOut,
                delay: 0.9
            }),
            TweenMax.from($('.move-more-information'), 1.4, slideParams).delay(0.9),
            TweenMax.from($('#move-slogan'), 1.4, slideParams).delay(0.9),
            TweenMax.from($('#move-cta'), 1, {
                css: {
                    opacity: 0
                },
                delay: 2.2,
                ease: Power2.easeInOut,
                onStart: function () {
                    this.target.css('visibility', 'visible');
                }
            })
        
        ];
        aSalmon.bmwx1.tlMove.appendMultiple(moveTweens);
        aSalmon.bmwx1.tlMove.insert(TweenMax.staggerFrom($('#move-nav .nav'), 1.2, {
            css: { left: '-300px', opacity: 0 },
            ease: Power2.easeInOut,
            onStart: function () {
                $('#move-nav').css('visibility', 'visible');
            }
        }, 0.3, function () {
            $('#move-nav').css('zIndex', 101);
            aSalmon.bmwx1.setupFlickNavAnimation();
        }, [], null),
            1.0
        );
        aSalmon.bmwx1.tlMove.pause();
        $('#move-car-small').each(function () {
            var car = $(this).find('.front');
            var text = $(this).find('.home');
            $(this).hover(function () {
                TweenMax.killTweensOf('.front');
                TweenMax.to(car, .6, { css: { width: 0 }, ease: Power2.easeOut });
                //TweenMax.to(text, .6, { css: { opacity: 1 }, ease: Power2.easeOut });
            }, function () {
                TweenMax.killTweensOf('.front');
                TweenMax.to(car, .6, { css: { width: 185 }, ease: Power2.easeOut });
                //TweenMax.to(text, .6, { css: { opacity: 0 }, ease: Power2.easeOut });
            });
        });

        $('#move-car-small').on('click', function (e) {
            e.preventDefault();
            $('#move-nav').css('zIndex', 99);
            $('.grey-hex').css('visibility', 'hidden');
            $('.yt-vid:visible').fadeOut(1000, function () {
                $('.yt-vid .player').empty();
            });
            // setupCarSlider() will be called when tlHome is done reversing
            aSalmon.bmwx1.tlHomeMove.reverse().delay(1.5);
            aSalmon.bmwx1.tlMove.reverse();
        });

        $('#move-arrow, #move-copy-bg').on('click', function (e) {
            e.preventDefault();
            aSalmon.bmwx1.turnOffCarSlider();
            aSalmon.bmwx1.tlHomeMove.play();
            aSalmon.bmwx1.tlMove.play();
        });

        $('#intro .move-small-hex a, #agile-style .move-small-hex a, #statement .move-small-hex a').on('click', function (e) {
            e.preventDefault();
            var cont = $(this).parents('.move-content');
            var vidCont = cont.find('.yt-vid');
            var player = vidCont.find('.player');
            if (cont.attr('id') == 'intro') {
                player.html('<iframe width="400" height="225" src="http://www.youtube.com/embed/sFvEN3CZzps?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>');
            } else if (cont.attr('id') == 'agile-style') {
                player.html('<iframe width="400" height="225" src="http://www.youtube.com/embed/u9pNH_YSMVU?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>');
            } else if (cont.attr('id') == 'statement') {
                player.html('<iframe width="400" height="225" src="http://www.youtube.com/embed/SFoB6zzqGnM?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>');
            }
            vidCont.fadeIn();
            cont.find('.move-hex').animate({
                'opacity': 0.3
            });
        });
        $('.yt-vid .close').on('click', function () {
            $(this).parent().fadeOut(1000, function () {
                $('.yt-vid .player').empty();
            });
            $(this).parents('.move-content').find('.move-hex').animate({
                'opacity': 1
            });
        });
        $('#ultimate .back').on('click', function (e) {
            e.preventDefault();
            var fadeTime = 800;
            $('#ultimate .thumb').removeClass('active');
            $('#ultimate .item.active, #ultimate .move-text.active').fadeOut(fadeTime);
            $('#ultimate .item').eq(0).addClass('active').fadeIn(fadeTime);
            $('#ultimate .move-text').eq(0).addClass('active').fadeIn(fadeTime);
            $('#ultimate .tag').fadeIn(fadeTime);
            $('#ultimate .back').fadeOut(fadeTime);
        });
        $('#ultimate .thumb').on('click', function (e) {
            e.preventDefault();
            var fadeTime = 800;
            var name = $(this).attr('rel');
            $('#ultimate .tag').fadeOut(fadeTime);
            $('#ultimate .back').fadeIn(fadeTime);
            $('#ultimate .thumb').removeClass('active');
            $(this).addClass('active');
            $('#ultimate .item.active, #ultimate .move-text.active').fadeOut(fadeTime, function () {
                $(this).removeClass('active');
            });
            $('#ultimate .' + name).fadeIn(fadeTime, function () {
                $(this).addClass('active');
            });
        });

        aSalmon.bmwx1.baconizeText();

    },
    setupThinkAnimation: function () {
        // setup the Think car tweens
        aSalmon.bmwx1.tlThink = new TimelineMax({
            onComplete: function () {
                $('#page-fullcircle').css('zIndex', '2');
                $('#move-container').css('zIndex', '1');
            }
        });
        var thinkTweens = [
            TweenMax.to($('#x1-large-think'), 1, {
                css: { left: '40px', opacity: 1 }, ease: Power2.easeInOut,
                onStart: function () {
                    this.target.css('left', 1400);
                }
            }),
            TweenMax.to($('#think-car-small'), 1, { css: { opacity: 1 }, ease: Power2.easeInOut }),
            TweenMax.from($('.txt-container'), 1.2, {
                css: {
                    opacity: 0,
                    left: '+=1000px',
                    top: '-=400px'
                },
                ease: Power2.easeInOut,
                onStart: function () {
                    this.target.css('visibility', 'visible');
                }
            }),
            TweenMax.from($('.circle-container'), 1.2, {
                css: {
                    opacity: 0,
                    left: '+=1000px',
                    top: '+=800px'
                },
                ease: Power2.easeInOut,
                onStart: function () {
                    this.target.css('visibility', 'visible');
                }
            }),
            TweenMax.from($('#circle-slogan'), 1, {
                css: {
                    left: '+=2000px',
                    opacity: 0
                },
                delay: 0.9,
                ease: Power2.easeInOut,
                onStart: function () {
                    this.target.css('visibility', 'visible');
                }
            }),

            //TweenMax.from($('#circle-buttons'), 1.2, {
            //    css: {
            //        opacity: 0,
            //        left: '+=1000px',
            //        top: '+=800px'
            //    },
            //    ease: Power2.easeInOut,
            //    onStart: function () {
            //        this.target.css('visibility', 'visible');
            //    }
            //}),
            TweenMax.from($('#circle-cta'), 1, {
                css: {
                    opacity: 0
                },
                delay: 2.2,
                ease: Power2.easeInOut,
                onStart: function () {
                    this.target.css('visibility', 'visible');
                }
            })
        ];
        aSalmon.bmwx1.tlThink.appendMultiple(thinkTweens);
        aSalmon.bmwx1.tlThink.insert(TweenMax.staggerFrom($('#circle-nav .nav'), 1.2, {
            css: { right: '-=215px', opacity: 0 },
            ease: Power2.easeInOut,
            onStart: function () {
                $('#circle-nav').css('visibility', 'visible');
            }
        }, 0.3, function () {
            $('#circle-nav').css({
                'zIndex': 101
            });
            aSalmon.bmwx1_circle.setupFlickNavAnimation();
        }, [], null),
            1.0
        );
        aSalmon.bmwx1.tlThink.pause();
        $('#think-car-small').each(function () {
            var car = $(this).find('.front');
            var text = $(this).find('.home');
            $(this).hover(function () {
                TweenMax.killTweensOf('.front');
                TweenMax.to(car, .6, { css: { width: 0, left: 185 }, ease: Power2.easeOut });
                //TweenMax.to(text, .6, { css: { opacity: 1 }, ease: Power2.easeOut });
            }, function () {
                TweenMax.killTweensOf('.front');
                TweenMax.to(car, .6, { css: { width: 185, left: 0 }, ease: Power2.easeOut });
                //TweenMax.to(text, .6, { css: { opacity: 0 }, ease: Power2.easeOut });
            });
        });
        $('#think-car-small').on('click', function (e) {
            e.preventDefault();
            $('#circle-nav').css('zIndex', 99);
            // setupCarSlider() will be called when tlHomeThink is done reversing
            aSalmon.bmwx1.tlHomeThink.reverse().delay(1.5);
            aSalmon.bmwx1.tlThink.reverse();
        });
        $('#think-arrow, #think-copy-bg').on('click', function (e) {
            e.preventDefault();
            aSalmon.bmwx1.turnOffCarSlider();
            aSalmon.bmwx1.tlHomeThink.play();
            aSalmon.bmwx1.tlThink.play();
        });
        aSalmon.bmwx1_circle.init();
    },
    baconizeText: function () {
        $('#intro, #agile-style, #ultimate').each(function() {
            $(this).find('.move-text h2').each(function () {
                if (!$(this).hasClass('no-bacon')) {
                    $(this).bacon({
                        type: 'line',
                        step: -20,
                        'align': 'right'
                    });
                }
            });
            $(this).find('.move-text .text').each(function () {
                if (!$(this).hasClass('no-bacon')) {
                    $(this).bacon({
                        type: 'line',
                        step: -13,
                        'align': 'right'
                    });
                }
            });
        });
        $('#statement').each(function () {
            $(this).find('.move-text h2').bacon({
                type: 'line',
                step: 20,
                'align': 'right'
            });
            $(this).find('.move-text .text').bacon({
                type: 'line',
                step: 13,
                'align': 'right'
            });
        });

        $('.move-content').eq(0).addClass('active');
        $('.move-content.pre-active').removeClass('pre-active');
    },
    setupFlickNavAnimation: function (flDist) {
        var flickDistance = flDist || 20;
        if (aSalmon.bmwx1.setupFlickNavAnimationDone) {
            $('#move-nav .active').animate({
                'left': ($('#move-nav .active').data('left') - flickDistance)
            });
            return;
        }
        $('#move-nav .nav').each(function () {
            $(this).attr('style', '');
            var left = parseInt($(this).css('left'));
            $(this).data('left', left);
            var btn = $(this);
            var text = $(this).find('span');
            if (!$('#move-nav .nav').is('.active')) {
                $('#move-nav .nav').eq(0).addClass('no-hover');
                slideNavBtn($('#move-nav .nav0')[0], true);
            }
            // setup hover states for the nav buttons
            $(this).hover(function () {
                if (!$(this).hasClass('no-hover')) {
                    slideNavBtn(this, true);
                }
            }, function () {
                if (!$(this).hasClass('no-hover')) {
                    slideNavBtn(this, false);
                }
            });
        });
        $('#move-nav .nav').on('click', function(e) {
            e.preventDefault();
            if (!$(this).hasClass('no-hover')) {
                var activeBtn = $('#move-nav .no-hover');
                var newBtn = $(this);
                //if ($(this).is('.nav0')) {
                //    $('#intro .vid-cont').fadeIn().html('<iframe width="500" height="281" src="http://www.youtube.com/embed/sFvEN3CZzps" frameborder="0" allowfullscreen></iframe>');
                //} else {
                //    $('#intro .vid-cont').fadeOut(400, function () {
                //        $(this).empty();
                //    });
                //}
                $('.yt-vid').fadeOut(200, function () {
                    $('.yt-vid .player').empty();
                });
                //if ($(this).is('.nav1')) {
                //    $('#move-buttons .prev').addClass('disabled');
                //    $('#move-buttons .next').removeClass('disabled');
                //}
                //if ($(this).is('.nav2')) {
                //    $('#move-buttons .prev').removeClass('disabled');
                //    $('#move-buttons .next').removeClass('disabled');
                //}
                //if ($(this).is('.nav3')) {
                //    $('#move-buttons .prev').removeClass('disabled');
                //    $('#move-buttons .next').addClass('disabled');
                //}
                slideNavBtn(this, true);
                newBtn.addClass('no-hover');
                slideNavBtn(activeBtn, false);
                // get the id from the button
                var tab = $(this).prop('rel');
                // fade the current content
                $('.move-content.active').fadeOut(200, function() {
                    $(this).removeClass('active').attr('style', '');
                    $('#' + tab).fadeIn(200, function () {
                        $(this).addClass('active');
                    });

                });
            }
        });
        function slideNavBtn(el, forward, fd) {
            var flDist = fd || flickDistance;
            var _el = $(el);
            var _elText = $(el).find('span');
            var l = _el.data('left');
            TweenMax.killTweensOf('.nav');
            if (forward) {
                TweenMax.to(_el, .4, {
                    css: { left: (l - flDist) },
                    ease: Power2.easeOut,
                    onStart: function() {
                        this.target.addClass('active');
                    }
                });
                //TweenMax.to(_elText, .4, { css: { opacity: 1 }, ease: Power2.easeOut });
            } else {
                TweenMax.to(_el, .4, {
                    css: { left: l },
                    ease: Power2.easeOut,
                    onStart: function () {
                        this.target.removeClass('active no-hover');
                    }
                });
                //TweenMax.to(_elText, .4, { css: { opacity: 0 }, ease: Power2.easeOut });
            }
        }
        //$('#move-buttons .prev').bindIf('click', function (e) {
        //    e.preventDefault();
        //    $('#move-nav .nav').filter('.active').prev().click();
        //}, function () {
        //    return !$('#move-buttons .prev').hasClass('disabled');
        //});
        //$('#move-buttons .next').bindIf('click', function (e) {
        //    e.preventDefault();
        //    $('#move-nav .nav').filter('.active').next().click();
        //}, function () {
        //    return !$('#move-buttons .next').hasClass('disabled');
        //});
        
        $('#move-cta .nav').each(function () {
            $(this).attr('style', '');
            var left = parseInt($(this).css('left'));
            $(this).data('left', left);
            var btn = $(this);
            var text = $(this).find('span');

            // setup hover states for the nav buttons
            $(this).hover(function () {
                if (!$(this).hasClass('no-hover')) {
                    slideNavBtn(this, true, 14);
                }
            }, function () {
                if (!$(this).hasClass('no-hover')) {
                    slideNavBtn(this, false, 14);
                }
            });
        });

        aSalmon.bmwx1.setupFlickNavAnimationDone = true;
    }
    //,
    //setupScroller: function () {
    //    var tl = new TimelineMax();
    //    var items = $('#scroller .item');
    //    $('#scroller .btn').click(function () {
    //        var eleW = items.eq(0).width();
    //        var eleH = items.eq(0).height();
    //        var len = items.length;
    //        var prevInx = 0;
    //        var currentInx = prevInx = items.index();
    //        items.eq(currentInx).addClass('pre-active');
    //        if ($(this).hasClass('next')) {
    //            if (currentInx < (len - 1)) {
    //                currentInx++;
    //            } else {
    //                currentInx = 0;
    //            }
    //        } else {
    //            if (currentInx > 0) {
    //                currentInx--;
    //            } else {
    //                currentInx = len - 1;
    //            }
    //            eleW *= -1;
    //        }
    //        TweenMax.killAll(true);
    //        items.removeClass('active');
    //        items.eq(currentInx).addClass('active');
    //        var Element = items.eq(currentInx);
    //        tl.from(Element, 3, { css: { left: eleW }, onComplete: addActiveItem, onCompleteParams: [currentInx, prevInx] });
    //    });
    //    function addActiveItem(inx, pinx) {
    //        items.eq(pinx).removeClass('pre-active');
    //    };
    //}
    
};


aSalmon.bmwx1_circle = {
    rotationTime: 2,
    setupFlickNavAnimationDone: false,
    init: function() {
        var _this = this;

        if (!Modernizr.csstransforms3d) {
            _this.rotationTime = 0;
        }
        $(".txtitem").each(function () {
            if ($(this).find('h2.bcl').length > 0) {
                $(this).find('h2.bcl').bacon({
                    'type': 'line',
                    'step': 15,
                    'align': 'left'
                });
            }
            if ($(this).find('.textr').length > 0) {
                $(this).find('.textr').bacon({
                    'type': 'line',
                    'step': 10,
                    'align': 'left'
                });
            } else if ($(this).find('.text').length > 0) {
                if (!$(this).find('.text').hasClass('no-bacon')) {
                    $(this).find('.text').bacon({
                        'type': 'line',
                        'step': -10,
                        'align': 'left'
                    });
                }
            }
            //$(this).addClass('inactive');
        });

        $('.internal-page').eq(0).addClass('active');
        $('.internal-page.pre-active').removeClass('pre-active');


        $("#full-circle .navi a").click(function(e) {
            e.preventDefault();
            var Element = $(".circles .circle.active");
            $("#full-circle .navi a").removeClass('active');
            $(this).addClass('active');
            _this.swapCircles(Element, $(".circles .circle").eq($(this).index()));
        });

        $("#full-circle .map0").click(function(e) {
            e.preventDefault();
            _this.rotationDirection = 'right';
            var Element = $(".circles .circle.active");
            var id = Element.attr('id');
            if (id == 'benefits') {
                $('.navi a').eq(1).click();
                return;
            } else if (id == 'choice') {
                if ($(this).index() == 1) {
                    _this.rotationDirection = 'left';
                    $('.navi a').eq(2).click();
                } else if ($(this).index() == 3) {
                    $('.navi a').eq(3).click();
                }
                return;
            }
            _this.changeCircleText(Element.find("." + $(this).attr('rel')));

        });
        $("#full-circle .navBtn").click(function(e) {
            e.preventDefault();
            var Element = $(".circles .circle.active");
            if ($(this).hasClass('next')) {
                _this.swapCircles(Element, Element.next());
            } else {
                _this.swapCircles(Element, Element.prev());
            }
        });

        _this.rotationComplete();

    },
    rotationDirection: 'right',
    rotationComplete: function() {
        var _this = this;
        $("#move-more-information").removeClass('benefits');
        if ($('.circles .circle.active').index() == 0) {
            $("#full-circle .back").hide();
            $("#full-circle .next").show();
            $(".circle-container h4").html("&nbsp;");
            $("#move-more-information").addClass('benefits');
            $(".fullcircle-logo").show();
            $('#BmwFullCircle .top-img').addClass('hidden');
            $('.navi .tod, .navi .tom').addClass('hidden');
        } else if ($('.circles .circle.active').index() == 1) {
            $('#BmwFullCircle .top-img').removeClass('hidden');
            $(".fullcircle-logo").hide();
            $("#full-circle .back").show();
            $("#full-circle .next").show();
            $(".circle-container h4").html("&nbsp;");
            $('.navi .tod, .navi .tom').addClass('hidden');
        } else if ($('.circles .circle.active').index() == 2) {
            $('#BmwFullCircle .top-img').removeClass('hidden');
            $("#full-circle .back").show();
            $("#full-circle .next").show();
            $(".circle-container h4").text("TODAY");
            $(".fullcircle-logo").hide();
            $('.navi .tod, .navi .tom').removeClass('hidden');
        } else if ($('.circles .circle.active').index() == 3) {
            $('#BmwFullCircle .top-img').removeClass('hidden');
            $("#full-circle .back").show();
            $("#full-circle .next").hide();
            $(".circle-container h4").text("TOMORROW");
            $(".fullcircle-logo").hide();
            $('.navi .tod, .navi .tom').removeClass('hidden');
        }
        $("#full-circle .navi a").removeClass('active');
        $("#full-circle .navi a").eq($('.circles .circle.active').index()).addClass('active');
        $(".circles .circle .txt").removeClass('active');

        _this.changeRightText($('.circles .circle.active'));

    },
    swapCircles: function(curr, nextElem) {
        var _this = this;
        var Element = curr;
        var next = nextElem;
        var rt = _this.rotationTime;
        var rotationEnd = 1440;
        if (_this.rotationDirection == 'left') {
            rotationEnd = -1440;
        }
        var myRotationObject = {
            start: 0,
            end: rotationEnd,
            duration: rt,
            delay: 0,
            perspective: 1500,
            ease: Power3.easeOut,
            repeat: 0,
            onComplete: function() {
                _this.rotationComplete();
            }
        };
        if (rt == 0) {
            next.addClass('active');
            Element.removeClass('active');
            _this.rotationComplete();
        } else {
            TweenMax.to(next, 0, { css: { className: '+=active' }, delay: rt / 2 });
            TweenMax.to(Element, 0, { css: { className: '-=active' }, delay: rt / 2 });
            Element.rotateY(myRotationObject);
            next.rotateY(myRotationObject);
        }
    },
    changeCircleText: function(ele) {
        var _this = this;
        $(".circles .circle.active").find('.txt').removeClass('active');
        ele.addClass('active');
        _this.changeRightText(ele);
    },
    changeRightText: function(tar) {
        $('.txtdata .txtitem,#move-more-information').not('#CircleIntro .txtitem').css('display', 'none');
        var nTar = $('.txtdata').find("#" + tar.attr('data-txtrel'));
        nTar.fadeIn(100).removeClass('inactive');
        $("#move-more-information").fadeIn(100);
    },
    setupFlickNavAnimation: function (flickDist) {
        var flickDistance = flickDist || 20;
        if (aSalmon.bmwx1_circle.setupFlickNavAnimationDone) {
            $('#circle-nav .active').animate({
                'right': ($('#circle-nav .active').data('right') - flickDistance)
            });
            return;
        }
        $('#circle-nav .nav').each(function () {
            $(this).attr('style', '');
            var right = parseInt($(this).css('right'));
            $(this).data('right', right);
            var btn = $(this);
            var text = $(this).find('span');
            // add active state after the hover effect is inited so the left attr calc is correct
            if (!$('#circle-nav .nav').is('.active')) {
                $('#circle-nav .nav').eq(0).addClass('no-hover');
                slideNavBtn($('#circle-nav .nav')[0], true);
            }

            // setup hover states for the nav buttons
            $(this).hover(function () {
                if (!$(this).hasClass('no-hover')) {
                    slideNavBtn(this, true);
                }
            }, function () {
                if (!$(this).hasClass('no-hover')) {
                    slideNavBtn(this, false);
                }
            });
        });

        $('#circle-nav .nav').on('click', function (e)
        {
            e.preventDefault();
            $('#tncs').hide(0);
            if (!$(this).hasClass('no-hover')) {
                var activeBtn = $('#circle-nav .no-hover');
                var newBtn = $(this);
                //if ($(this).is('.nav1')) {
                //    $('#circle-buttons .prev').addClass('disabled');
                //    $('#circle-buttons .next').removeClass('disabled');
                //}
                //if ($(this).is('.nav2')) {
                //    $('#circle-buttons .prev').removeClass('disabled');
                //    $('#circle-buttons .next').removeClass('disabled');
                //}
                //if ($(this).is('.nav3')) {
                //    $('#circle-buttons .prev').removeClass('disabled');
                //    $('#circle-buttons .next').addClass('disabled');
                //}
                slideNavBtn(this, true);
                newBtn.addClass('no-hover');
                slideNavBtn(activeBtn, false);
                // get the id from the button
                var tab = $(this).prop('rel');
                //console.log(tab);
                // fade the current content
                $('.internal-page.active').fadeOut(400, function () {
                    $(this).removeClass('active').attr('style', '');
                });
                $('#' + tab).delay(400).fadeIn(800, function () {
                    $(this).addClass('active');
                });

                if ($(this).hasClass('nav1'))
                {
                    $('#tncs').fadeIn(400);
                }
            }

        });

        function slideNavBtn(el, forward, fd) {
            var flDist = fd || flickDistance;
            var _el = $(el);
            var _elText = $(el).find('span');
            var r = _el.data('right');
            TweenMax.killTweensOf('.nav');
            if (forward) {
                TweenMax.to(_el, .4, {
                    css: { right: (r - flDist) },
                    ease: Power2.easeOut,
                    onStart: function () {
                        this.target.addClass('active');
                    }
                });
                //TweenMax.to(_elText, .4, { css: { opacity: 1 }, ease: Power2.easeOut });
            } else {
                TweenMax.to(_el, .4, {
                    css: { right: r },
                    ease: Power2.easeOut,
                    onStart: function () {
                        this.target.removeClass('active no-hover');
                    }
                });
                //TweenMax.to(_elText, .4, { css: { opacity: 0 }, ease: Power2.easeOut });
            }
        }
        //$('#circle-buttons .prev').bindIf('click', function (e) {
        //    e.preventDefault();
        //    $('#circle-nav .nav').filter('.active').prev().click();
        //}, function () {
        //    return !$('#circle-buttons .prev').hasClass('disabled');
        //});
        //$('#circle-buttons .next').bindIf('click', function (e) {
        //    e.preventDefault();
        //    $('#circle-nav .nav').filter('.active').next().click();
        //}, function () {
        //    return !$('#circle-buttons .next').hasClass('disabled');
        //});

        $('#circle-cta .nav').each(function () {
            $(this).attr('style', '');
            var right = parseInt($(this).css('right'));
            $(this).data('right', right);
            var btn = $(this);
            var text = $(this).find('span');

            // setup hover states for the nav buttons
            $(this).hover(function () {
                if (!$(this).hasClass('no-hover')) {
                    slideNavBtn(this, true, 14);
                }
            }, function () {
                if (!$(this).hasClass('no-hover')) {
                    slideNavBtn(this, false, 14);
                }
            });
        });

        aSalmon.bmwx1_circle.setupFlickNavAnimationDone = true;
    }
};

// binding with condition plugin for jQuery
// Wrap the plugin definition in a callback bubble so we can bind
// it to the dollar sign.
(function ($) {

    // This jQuery plugin creates proxied event handlers that
    // consult with an additional conditional callback to see if
    // the original event handler should be executed.
    $.fn.bindIf = function (
    eventType,
    eventHandler,
    ifCondition
    ) {
        // Create a new proxy function that wraps around the
        // given bind callback.
        var proxy = function (event) {
            event.preventDefault();

            // Execute the IF condition callback first to see if
            // the event handler should be executed.
            if (ifCondition()) {

                // Pass the event onto the original event
                // handler.
                eventHandler.apply(this, arguments);

}

        };

        // Bind the proxy method to the target.
        this.bind(eventType, proxy);

        // Return this to keep jQuery method chaining.
        return (this);
    };

})(jQuery);
