$(document).on('touchstart touchmove', function (e) {
    e.preventDefault();
});
let cubeRender = (function ($) {
    let $cubeBox = $('.cubeBox'),
        $box = $cubeBox.find('.box');

    let touchBegin = function (e) {
        //=>this:box
        let point = e.changedTouches[0];
        $(this).attr({
            strX: point.clientX,
            strY: point.clientY,
            isMove: false,
            changeX: 0,
            changeY: 0
        });
    };

    let touching = function (e) {
        let point = e.changedTouches[0],
            $this = $(this);
        let changeX = point.clientX - parseFloat($this.attr('strX')),
            changeY = point.clientY - parseFloat($this.attr('strY'));
        if (Math.abs(changeX) > 10 || Math.abs(changeY) > 10) {
            $this.attr({
                isMove: true,
                changeX: changeX,
                changeY: changeY
            });
        }
    };

    let touchEnd = function (e) {
        let point = e.changedTouches[0],
            $this = $(this);
        let isMove = $this.attr('isMove'),
            changeX = parseFloat($this.attr('changeX')),
            changeY = parseFloat($this.attr('changeY')),
            rotateX = parseFloat($this.attr('rotateX')),
            rotateY = parseFloat($this.attr('rotateY'));
        if (isMove === 'false') return;

        rotateX = rotateX - changeY / 3;
        rotateY = rotateY + changeX / 3;
        $this.css(`transform`, `scale(.6) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`).attr({
            rotateX: rotateX,
            rotateY: rotateY
        });
    };

    return {
        init: function () {
            $box.attr({
                rotateX: -30,
                rotateY: 45
            }).on({
                touchstart: touchBegin,
                touchmove: touching,
                touchend: touchEnd
            });
        }
    }
})(Zepto);
cubeRender.init();