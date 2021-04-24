"use strict";

$(document).ready(() => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");


    let mouseX, mouseY;
    let moving = false;
    let started = false;


    $(".target").on("mousedown", function(e) {
        if (mouseX+e.target.width < canvas.offsetLeft && !started) {
            let newElement = e.target.cloneNode(true, true);
            $(e.target).parents()[0].append(newElement);
        } 
        started = true;
        move(e.target);
    })
    let dragValue;
    let oldX, oldY, x0, y0;

    console.log(canvas.offsetLeft, canvas.clientWidth)
    console.log(canvas.offsetTop, canvas.clientHeight)


    function move(element) {
        element.style.position = "absolute";
        element.onclick = function(e) {
            x0 = e.pageX-this.offsetLeft;
            y0 = e.pageY-this.offsetTop;

            if (!moving) {
                // started = true;
                dragValue = element;
                let x = e.pageX;
                let y = e.pageY;

                oldX = x-x0;
                oldY = y-y0;
                dragValue.style.left = x-x0 + "px";
                dragValue.style.top = y-y0 + "px";

            } else {
                started = false;
                const newX = parseInt(dragValue.style.left.replace(/\D/g, ""));
                const newY = parseInt(dragValue.style.top.replace(/\D/g, ""));
                if (newX<canvas.offsetLeft || newX+dragValue.offsetWidth>canvas.clientWidth+canvas.offsetLeft
                    || newY<canvas.offsetTop || newY+dragValue.offsetHeight>canvas.clientHeight+canvas.offsetTop) {
                    dragValue.style.left = oldX+"px";
                    dragValue.style.top = oldY+"px";
                    // alert("out");
                    // $(dragValue).remove();
                }
                dragValue = null;
            }
            if (moving) {
                moving = false;
            } else {
                moving = true;
            }
        }
    }

    // document.onclick = function() {
    //     if (!moving) {
    //         // moving = true;
    //         dragValue = null;
    //     }
    // }

    document.onmousemove = function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;

        if (dragValue) {
            // var x0 = e.pageX-this.offsetLeft;
            // var y0 = e.pageY-this.offsetTop;
            dragValue.style.left = mouseX-x0 + "px";
            dragValue.style.top = mouseY-y0 + "px";
        }
    }

    document.onkeydown = function(e) {
        if (e.code == "ArrowLeft") {
            dragValue.style.transform += "rotate(5deg)";
        }

        if (e.code == "ArrowRight") {
            dragValue.style.transform += "rotate(-5deg)";
        }

        if (e.code == "ArrowUp") {
            $(dragValue).width(dragValue.width + 5);
            $(dragValue).height(dragValue.height + 5);
        }

        if (e.code == "ArrowDown") {
            $(dragValue).width(dragValue.width - 5);
            $(dragValue).height(dragValue.height - 5);
        }

        if (e.code == "Backspace") {
            $(dragValue).remove();
            dragValue = null;
            moving = false;
            started = false;
        }

        if (e.code == "Space") {
            dragValue = null;
            moving = false;
        }
    }
    
});

