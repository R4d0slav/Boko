"use strict";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

$(document).ready(() => {


    let mouseX, mouseY;
    let moving = false;
    let started = false;


    $(".target").on("mouseup", function(e) {
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

    console.log($(canvas).position());
    // ctx.beginPath();
    // ctx.fillStyle = "red";
    // ctx.rect(0, 100, 500, 500);
    // ctx.stroke();
    // ctx.fill();
    // ctx.closePath();

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
                const newX = parseInt(dragValue.style.left.substr(0, dragValue.style.left.length-2));
                const newY = parseInt(dragValue.style.top.substr(0, dragValue.style.top.length-2));

                // const newY = parseInt(dragValue.style.top.replace(/\D/g, ""));
                if (newX+60<canvas.offsetLeft || newX+dragValue.width>canvas.clientWidth+canvas.offsetLeft ||
                    newY<0 || newY+dragValue.height/2>canvas.clientHeight) {
                    // alert(canvas.offsetLeft);
                    // alert(canvas.clientWidth+canvas.offsetLeft)
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
        

        // console.log(x0, y0);
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

        if (e.code == "ArrowUp" || e.key == "+") {
            $(dragValue).width(dragValue.width + 5);
            $(dragValue).height(dragValue.height + 5);

            dragValue.style.left = parseInt(dragValue.style.left.replace(/\D/g, "")) - 2 + "px";
            dragValue.style.top = parseInt(dragValue.style.top.replace(/\D/g, "")) - 2 + "px";
            x0+=2;
            y0+=2;

        }

        if (e.code == "ArrowDown" || e.key == "-") {
            $(dragValue).width(dragValue.width - 5);
            $(dragValue).height(dragValue.height - 5);
            
            dragValue.style.left = parseInt(dragValue.style.left.replace(/\D/g, "")) + 2 + "px";
            dragValue.style.top = parseInt(dragValue.style.top.replace(/\D/g, "")) + 2 + "px";
            x0-=2;
            y0-=2;
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


        if (e.code == "KeyS") {
            // localStorage.setItem("my-canvas", JSON.stringify($(".target")));
            capture();
        }

        // if (e.code == "KeyW") {
        //     $(".target").replaceWith(JSON.parse(localStorage.getItem("my-canvas")));
        // }


    }
    
});

const capture = async() => {

    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");

    const video = document.createElement("video");

    try {
        const captureStream = await navigator.mediaDevices.getDisplayMedia();
        video.srcObject = captureStream;
        context.drawImage(video, 0, 0, window.width, window.height);
        const frame = canvas.toDataURL("image/png");
        captureStream.getTracks().forEach(track => track.stop());
        window.location.href = frame;
    } catch (err) {
        console.log("Error: " + err);
    }
}