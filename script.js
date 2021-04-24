"use strict";



// let offset = $("#canvas").offset();
// let offsetX = offset.left;
// let offsetY = offset.top;

// let target = $(".target");

// $(".target").draggable({
//     helper: 'clone',
// });

// $(".target").each(function(index, element) {
//     $(this).data("targetIndex", index);
// });

// $("#canvas").droppable({
//     drop: dragDrop,
// });

// function dragDrop(e, ui) {
//     let x = parseInt(ui.offset.left-offsetX)-1;
//     let y = parseInt(ui.offset.top-offsetY);
//     let width = ui.helper[0].width;
//     let height = ui.helper[0].height;

//     let index = ui.draggable.data("targetIndex");

//     ctx
// }

$(document).ready(() => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");


    let mouseX, mouseY;
    let moving = false;
    let started = false;


    $(".target").on("mousedown", function(e) {
        console.log(e.target);
        if (mouseX < canvas.offsetLeft && !started) {
            let newElement = e.target.cloneNode(true, true);
            $(e.target).parents()[0].append(newElement);
            started = true;
        }
        move(e.target);
    })
    let dragValue;
    let oldX, oldY, x0, y0;
    // move("slika1");

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
        }
    }
    



    // $("#slika1").on("dblclick", function() {
    //     alert($(this).getPropertyValue("transform"))
    //     $(this).animate(
    //         { deg: $(this).data("angle")+45 },
    //         {
    //             duration: 1000,
    //             step: function(now) {
    //                 $(this).css({ transform: 'rotate(' + now + 'deg' });
    //             }
    //     });
    // })
});

