$(document).ready(function(){
    let canvas = new fabric.Canvas("canvas", {
        fill:"blue",
        width:700,
        height:300,
        selectabel:false
    });

    canvas.setBackgroundColor("blue")

    let rect = new fabric.Rect({
        fill:"#fff",
        height:100,
        width:100,
        top:20,
        left:30
    });

    canvas.add(rect);

    selectionTools.initSelectionTools("canvas");
    selectionTools.setHeight(rect.height);
    selectionTools.setWidth(rect.width);
    selectionTools.setTop(rect.top);
    selectionTools.setLeft(rect.left);
    selectionTools.on.addEventListener("onResize", function (e) {
        resizeObj(e.detail);
    });

    selectionTools.on.addEventListener("onMove", function (e) {
        resizeObj(e.detail);
    });

    function resizeObj(detail) {
        rect.set({
            height:detail.height,
            width:detail.width,
            top:detail.top,
            left:detail.left
        });
 
        rect.setCoords();
        canvas.calcOffset();
        canvas.renderAll();
    }
    //selectionTools.addSelecter(rect, 1);
});