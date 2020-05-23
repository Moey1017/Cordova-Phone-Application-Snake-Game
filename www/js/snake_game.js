// reference from https://www.youtube.com/watch?v=21eSpMtJwrc
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
var snake;
var highestScore = 0;
var previousScore = 0;
//local storage 
var storage = window.localStorage;
var localHistory;

if (localStorage.getItem("localHistory") === null)
{
    localHistory = [];
} else
{
    localHistory = JSON.parse(localStorage.getItem("localHistory"));
}

(function playGame() {
    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();

    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();

        if (snake.eat(fruit)) {
            loadEatSoundEffect();
            fruit.pickLocation();
        }

        snake.checkCollision();
        document.querySelector('.score')
                .innerText = previousScore;
        document.querySelector('.highest')
                .innerText = highestScore;
    }, 250);
}());

jQuery(document).ready(function ()  //reference from https://stackoverflow.com/questions/17131815/how-to-swipe-top-down-jquery-mobile
{
    (function () {
        var supportTouch = $.support.touch,
                scrollEvent = "touchmove scroll",
                touchStartEvent = supportTouch ? "touchstart" : "mousedown",
                touchStopEvent = supportTouch ? "touchend" : "mouseup",
                touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
        $.event.special.swipeupdown = {
            setup: function () {
                var thisObject = this;
                var $this = $(thisObject);
                $this.bind(touchStartEvent, function (event) {
                    var data = event.originalEvent.touches ?
                            event.originalEvent.touches[ 0 ] :
                            event,
                            start = {
                                time: (new Date).getTime(),
                                coords: [data.pageX, data.pageY],
                                origin: $(event.target)
                            },
                            stop;

                    function moveHandler(event) {
                        if (!start) {
                            return;
                        }
                        var data = event.originalEvent.touches ?
                                event.originalEvent.touches[ 0 ] :
                                event;
                        stop = {
                            time: (new Date).getTime(),
                            coords: [data.pageX, data.pageY]
                        };

                        // prevent scrolling
                        if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                            event.preventDefault();
                        }
                    }
                    $this
                            .bind(touchMoveEvent, moveHandler)
                            .one(touchStopEvent, function (event) {
                                $this.unbind(touchMoveEvent, moveHandler);
                                if (start && stop) {
                                    if (stop.time - start.time < 1000 &&
                                            Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                            Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                                        start.origin
                                                .trigger("swipeupdown")
                                                .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                                    }
                                }
                                start = stop = undefined;
                            });
                });
            }
        };
        $.each({
            swipedown: "swipeupdown",
            swipeup: "swipeupdown"
        }, function (event, sourceEvent) {
            $.event.special[event] = {
                setup: function () {
                    $(this).bind(sourceEvent, $.noop);
                }
            };
        });



        $('canvas').on('swipeup', function ()
        {
            swipeUp();
        }
        );

        $('canvas').on('swipedown', function ()
        {
            swipeDown();
        }
        );

    })();
    function swipeUp()
    {
        snake.swipeDirection(1);
    }
    function swipeDown()
    {
        snake.swipeDirection(2);
    }

    $(document).on('swipeleft', swipeLeft);
    $(document).on('swiperight', swipeRight);
    function swipeLeft()
    {
        snake.swipeDirection(3);
    }

    function swipeRight()
    {
        snake.swipeDirection(4);
    }
});

//for window 
window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
}));