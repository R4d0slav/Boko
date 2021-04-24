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


    $(".target").on("mousedown", function(e) {
        move(e.target.id);
    })
    let dragValue;
    let oldX, oldY, x0, y0;
    let moving = false;
    move("slika1");

    console.log(canvas.offsetLeft, canvas.clientWidth)
    console.log(canvas.offsetTop, canvas.clientHeight)


    function move(id) {
        let element = document.getElementById(id);
        // let oldX = parseInt(element.style.left.replace(/\D/g, ""));
        // let oldY = parseInt(element.style.top.replace(/\D/g, ""));

        element.style.position = "absolute";
        element.onclick = function(e) {
            x0 = e.pageX-this.offsetLeft;
            y0 = e.pageY-this.offsetTop;

            if (!moving) {
                dragValue = element;
                let x = e.pageX;
                let y = e.pageY;

                oldX = x-x0;
                oldY = y-y0;
                dragValue.style.left = x-x0 + "px";
                dragValue.style.top = y-y0 + "px";

            } else {
                const newX = parseInt(dragValue.style.left.replace(/\D/g, ""));
                const newY = parseInt(dragValue.style.top.replace(/\D/g, ""));
                if (newX<canvas.offsetLeft || newX+dragValue.offsetWidth>canvas.clientWidth+canvas.offsetLeft
                    || newY<canvas.offsetTop || newY+dragValue.offsetHeight>canvas.clientHeight+canvas.offsetTop) {
                    dragValue.style.left = oldX+"px";
                    dragValue.style.top = oldY+"px";
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
        document.onmouseup = function() {
            // clicked = false;
            // if (dragValue) {
            //     const newX = parseInt(dragValue.style.left.replace(/\D/g, ""));
            //     const newY = parseInt(dragValue.style.top.replace(/\D/g, ""));
            //     if (newX<canvas.offsetLeft || newX+dragValue.offsetWidth>canvas.clientWidth+canvas.offsetLeft
            //         || newY<canvas.offsetTop || newY+dragValue.offsetHeight>canvas.clientHeight+canvas.offsetTop) {
            //         dragValue.style.left = oldX+"px";
            //         dragValue.style.top = oldY+"px";
            //         dragValue = null;
            //     }
            // }
            // dragValue = null;
        }
    
        document.onmousemove = function (e) {
            let x = e.pageX;
            let y = e.pageY;
    
            if (dragValue) {
                // var x0 = e.pageX-this.offsetLeft;
                // var y0 = e.pageY-this.offsetTop;
                dragValue.style.left = x-x0 + "px";
                dragValue.style.top = y-y0 + "px";
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

