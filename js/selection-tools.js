/**
 * Selection tools module.
 * @module selectionTools
 * @since 1.0.0
 * @link #
 * @author Vertim Coders
 */
var selectionTools = new Object() || {};
selectionTools.isAdmin = false;
selectionTools.on = new Document();
selectionTools.selecter = {};
selectionTools.selecter.center = {};
selectionTools.selecter.right = {};
selectionTools.selecter.left = {};
selectionTools.e = {};
selectionTools.unit = "px";
selectionTools.init = false;
selectionTools.index = {};
selectionTools.index.text = 9999999999;
selectionTools.index.group = 9999999999;
selectionTools.index.textbox = 9999999999;
selectionTools.index.selecter = 9;
selectionTools.index.image = 8;
selectionTools.index.rect = 6;
selectionTools.toolsObj = [];
selectionTools.lockId = false;
selectionTools.disabled_selector = "aworan-disabled";

selectionTools.setLockId = function(lock) {
  selectionTools.lockId = lock;
}

/**
 * Initialize the selection tools.
 * @param {* int} _id  The selecter container id.
 */
selectionTools.initSelectionTools = function (_id) {  
  if(selectionTools.lockId) {
    return;
  }

  selectionTools.setId(_id);

  _id = selectionTools.getId();
  var toolsContainer = document.querySelector("#selection-tools-own"), toolsOffset = {};

  if(toolsContainer == null && selectionTools.isAdmin) {
    toolsContainer = document.querySelector("#"+_id);
  }

  if (typeof toolsContainer === "undefined" || toolsContainer == null) {
    return;
  }

  selectionTools.selecter.move = toolsContainer.querySelector(".awl-tools3");
  selectionTools.selecter.center.top = toolsContainer.querySelector(".awl-tools1");
  selectionTools.selecter.center.left = toolsContainer.querySelector(".awl-tools5");
  selectionTools.selecter.center.right = toolsContainer.querySelector(".awl-tools2");
  selectionTools.selecter.center.bottom = toolsContainer.querySelector(".awl-tools4");

  selectionTools.selecter.left.top = toolsContainer.querySelector(".awl-tools9");
  selectionTools.selecter.right.top = toolsContainer.querySelector(".awl-tools8");
  selectionTools.selecter.left.bottom = toolsContainer.querySelector(".awl-tools6");
  selectionTools.selecter.right.bottom = toolsContainer.querySelector(".awl-tools7");
  selectionTools.selecter.container = toolsContainer.querySelector(".awl-select-tools");
  selectionTools.selecter.containerAll = toolsContainer.querySelector(".awl-select-container");
  selectionTools.selecter.edition = toolsContainer.querySelector(".awl-select-tools-editon-btn");
  selectionTools.container = toolsContainer;
  selectionTools.init = true;

  selectionTools.hide();
  selectionTools.selecter.container.style.zIndex = selectionTools.index.selecter;
  selectionTools.selecter.move.onmousedown = function (e) {
    e = e || window.event;
    // get the mouse cursor position at startup:

    toolsOffset.x = e.clientX;
    toolsOffset.y = e.clienty;

    document.documentElement.addEventListener("mousemove", doDrag, false);
    document.documentElement.addEventListener("onMove", doDrag, false);
    document.documentElement.addEventListener("mouseup", stopDrag, false);

    function doDrag(e) {
      var elmnt = selectionTools.selecter.container;

      if (typeof toolsOffset.x === "undefined" || typeof toolsOffset.y === "undefined") {
        toolsOffset.x = e.clientX;
        toolsOffset.y = e.clientY;
      }

      if (!elmnt) {
        return;
      }

      e = e || window.event;
      // calculate the new cursor position:
      toolsOffset.xe = toolsOffset.x - e.clientX;
      toolsOffset.ye = toolsOffset.y - e.clientY;
      toolsOffset.x = e.clientX;
      toolsOffset.y = e.clientY;
      // set the element's new position:
      selectionTools.setTop(elmnt.offsetTop - toolsOffset.ye);
      selectionTools.setLeft(elmnt.offsetLeft - toolsOffset.xe);
      selectionTools.selecter.containerAll.style.left = selectionTools.getLeft();
      selectionTools.selecter.containerAll.style.top = selectionTools.getTop();
      selectionTools.selecter.edition.style.left = elmnt.offsetLeft - toolsOffset.xe + selectionTools.unit;
      selectionTools.selecter.edition.style.top = elmnt.offsetTop + toolsOffset.ye + parseFloat(selectionTools.getHeight()) + selectionTools.unit;
      var dragE = {
        detail: {
          width: selectionTools.getWidth(),
          height: selectionTools.getHeight(),
          top: selectionTools.getTop(),
          left: selectionTools.getLeft()
        }
      }

      var toolsEvent = new CustomEvent("onMove", dragE);
      selectionTools.on.dispatchEvent(toolsEvent);
    }

    function stopDrag() {
      document.documentElement.removeEventListener("mousemove", doDrag, false);
      document.documentElement.removeEventListener("mouseup", stopDrag, false);
    }
  }

  selectionTools.selecter.center.right.onmousedown = function (e) {
    var element = null;
    var startX, startWidth;

    element = selectionTools.selecter.container;

    startX = e.clientX;

    startWidth = parseInt(
      document.defaultView.getComputedStyle(element).width,
      10
    );

    document.documentElement.addEventListener("mousemove", doDrag, false);
    document.documentElement.addEventListener("mouseup", stopDrag, false);

    function doDrag(e) {
      selectionTools.setWidth(startWidth + e.clientX - startX);
      selectionTools.setResizeEvent();
      selectionTools.setModifiedEvent();
    }

    function stopDrag() {
      document.documentElement.removeEventListener("mousemove", doDrag, false);
      document.documentElement.removeEventListener("mouseup", stopDrag, false);
    }
  }

  selectionTools.selecter.center.left.onmousedown = function (e) {
    var element = null;
    var startX, startWidth;

    element = selectionTools.selecter.container;

    startX = e.clientX;

    startWidth = parseInt(
      document.defaultView.getComputedStyle(element).width,
      10
    );

    document.documentElement.addEventListener("mousemove", doDrag, false);
    document.documentElement.addEventListener("mouseup", stopDrag, false);

    function doDrag(e) {
      selectionTools.setWidth(startWidth - (e.clientX - startX));
      selectionTools.setResizeEvent();
    }

    function stopDrag() {
      document.documentElement.removeEventListener("mousemove", doDrag, false);
      document.documentElement.removeEventListener("mouseup", stopDrag, false);
    }

  }

  selectionTools.selecter.center.top.onmousedown = function (e) {
    var element = null;
    var startY, startHeight;

    element = selectionTools.selecter.container;

    startY = e.clientY;

    startHeight = parseInt(
      document.defaultView.getComputedStyle(element).height,
      10
    );

    document.documentElement.addEventListener("mousemove", doDrag, false);
    document.documentElement.addEventListener("mouseup", stopDrag, false);
    function doDrag(e) {
      selectionTools.setHeight(startHeight - (e.clientY - startY));
      selectionTools.setResizeEvent();
    }

    function stopDrag() {
      document.documentElement.removeEventListener("mousemove", doDrag, false);
      document.documentElement.removeEventListener("mouseup", stopDrag, false);
    }

  }

  selectionTools.selecter.center.bottom.onmousedown = function (e) {
    var element = null;
    var startY, startHeight;

    element = selectionTools.selecter.container;

    startY = e.clientY;

    startHeight = parseInt(
      document.defaultView.getComputedStyle(element).height,
      10
    );

    document.documentElement.addEventListener("mousemove", doDrag, false);
    document.documentElement.addEventListener("mouseup", stopDrag, false);
    function doDrag(e) {
      selectionTools.setHeight(startHeight + (e.clientY - startY));
      selectionTools.setResizeEvent();
    }

    function stopDrag() {
      document.documentElement.removeEventListener("mousemove", doDrag, false);
      document.documentElement.removeEventListener("mouseup", stopDrag, false);
    }
  }

  selectionTools.selecter.left.top.onmousedown = function (e) {
    var element = null;
    var startX, startY, startHeight, startWidth;

    element = selectionTools.selecter.container;

    startY = e.clientY;
    startX = e.clientX;

    startHeight = parseInt(
      document.defaultView.getComputedStyle(element).height,
      10
    );

    startWidth = parseInt(
      document.defaultView.getComputedStyle(element).width,
      10
    );

    document.documentElement.addEventListener("mousemove", doDrag, false);
    document.documentElement.addEventListener("mouseup", stopDrag, false);
    function doDrag(e) {
      selectionTools.setHeight(startHeight - (e.clientY - startY));
      selectionTools.setWidth(startWidth - (e.clientX - startX));
      selectionTools.setResizeEvent();
    }

    function stopDrag() {
      document.documentElement.removeEventListener("mousemove", doDrag, false);
      document.documentElement.removeEventListener("mouseup", stopDrag, false);
    }
  }

  selectionTools.selecter.right.top.onmousedown = function (e) {
    var element = null;
    var startX, startY, startHeight, startWidth;

    element = selectionTools.selecter.container;

    startY = e.clientY;
    startX = e.clientX;

    startHeight = parseInt(
      document.defaultView.getComputedStyle(element).height,
      10
    );

    startWidth = parseInt(
      document.defaultView.getComputedStyle(element).width,
      10
    );

    document.documentElement.addEventListener("mousemove", doDrag, false);
    document.documentElement.addEventListener("mouseup", stopDrag, false);
    function doDrag(e) {
      selectionTools.setHeight(startHeight + (e.clientY - startY));
      selectionTools.setWidth(startWidth + (e.clientX - startX));
      selectionTools.setResizeEvent();
    }

    function stopDrag() {
      document.documentElement.removeEventListener("mousemove", doDrag, false);
      document.documentElement.removeEventListener("mouseup", stopDrag, false);
    }
  }

  selectionTools.selecter.right.bottom.onmousedown = function (e) {
    var element = null;
    var startX, startY, startHeight, startWidth;

    element = selectionTools.selecter.container;

    startY = e.clientY;
    startX = e.clientX;

    startHeight = parseInt(
      document.defaultView.getComputedStyle(element).height,
      10
    );

    startWidth = parseInt(
      document.defaultView.getComputedStyle(element).width,
      10
    );

    document.documentElement.addEventListener("mousemove", doDrag, false);
    document.documentElement.addEventListener("mouseup", stopDrag, false);
    function doDrag(e) {
      selectionTools.setHeight(startHeight + (e.clientY - startY));
      selectionTools.setWidth(startWidth + (e.clientX - startX));
      selectionTools.setResizeEvent();
    }

    function stopDrag() {
      document.documentElement.removeEventListener("mousemove", doDrag, false);
      document.documentElement.removeEventListener("mouseup", stopDrag, false);
    }
  }

  selectionTools.selecter.left.bottom.onmousedown = function (e) {
    var element = null;
    var startX, startY, startHeight, startWidth;

    element = selectionTools.selecter.container;

    startY = e.clientY;
    startX = e.clientX;

    startHeight = parseInt(
      document.defaultView.getComputedStyle(element).height,
      10
    );

    startWidth = parseInt(
      document.defaultView.getComputedStyle(element).width,
      10
    );

    document.documentElement.addEventListener("mousemove", doDrag, false);
    document.documentElement.addEventListener("mouseup", stopDrag, false);
    function doDrag(e) {
      selectionTools.setHeight(startHeight + (e.clientY - startY));
      selectionTools.setWidth(startWidth - (e.clientX - startX));
      selectionTools.setResizeEvent();
    }

    function stopDrag() {
      document.documentElement.removeEventListener("mousemove", doDrag, false);
      document.documentElement.removeEventListener("mouseup", stopDrag, false);
    }
  }
}

/**
 * Add box selecter.
 * @param {* object} obj The box.
 * @param {* string} ratio The canvas ratio.
 */
selectionTools.addSelecter = function (obj, ratio) {
  if (typeof obj === "undefined") {
    return;
  }
  var _id = obj.boxid, stype = obj.type, w = obj.width * obj.scaleX * ratio, h = obj.height * obj.scaleY, top = obj.top, left = obj.left * ratio;
  selectionTools.toolsObj[_id] = obj;
  selectionTools.objId = _id;
  var sText = "<span>Cliquez ici pour ajouter une image</span>";
  if (stype === "i-text" || stype === "textbox") {
    var sText = "<span></span>";
  }
  
  var sDiv = document.createElement("div");
  sText.innerHTML = sText;
  var sDivStyle = "";
  sDivStyle += 'width: ' + w + selectionTools.unit + '; ';
  sDivStyle += 'height: ' + h + selectionTools.unit + '; ';
  sDivStyle += 'left: ' + left + selectionTools.unit + '; ';
  sDivStyle += 'top: ' + top + selectionTools.unit + '; ';
  sDivStyle += 'position: ' + 'absolute' + '; ';
  sDivStyle += 'z-index: ' + selectionTools.index[stype] + '; ';
  sDiv.setAttribute("style", sDivStyle);
  sDiv.setAttribute("id", _id);
  sDiv.setAttribute("tools", selectionTools.getId());
  sDiv.setAttribute("class", "selection-tools-selecter-btn aw-select-tools-center");
  sDiv.innerHTML = sText;
  if( typeof selectionTools.container !== "undefined" || selectionTools.container != null) {
    selectionTools.container.prepend(sDiv);
  }
}

/**
 * Remove the box selecter.
 * @param {* string} _id The selecter box id.
 */
selectionTools.removeSelecter = function (_id) {
  document.getElementById(_id).remove();
}

/**
 * Set selection tools height.
 * @param {* int} toolsHeight The height size.
 */
selectionTools.setHeight = function (toolsHeight) {
  if (!selectionTools.init) return;
  toolsHeight = parseFloat(toolsHeight);
  if (!isNaN(toolsHeight)) {
    selectionTools.selecter.container.style.height = toolsHeight + selectionTools.unit;
    selectionTools.setModifiedEvent();
  }
}

/**
 * Get selection tools height.
 * @returns {* int} Selection tools height.
 */
selectionTools.getHeight = function () {
  if (!selectionTools.init) return;
  return parseFloat(selectionTools.selecter.container.style.height) || 0;
}

/**
 * Set width height.
 * @param {* int} toolsWidth Set width height.
 */
selectionTools.setWidth = function (toolsWidth) {
  if (!selectionTools.init) return;
  toolsWidth = parseFloat(toolsWidth);
  if (!isNaN(toolsWidth)) {
    selectionTools.selecter.container.style.width = toolsWidth + selectionTools.unit;
    selectionTools.setModifiedEvent();
  }
}

/**
 * Get selection tools width.
 * @returns {* int} Selection tools width.
 */
selectionTools.getWidth = function () {
  if (!selectionTools.init) return;
  return parseFloat(selectionTools.selecter.container.style.width) || 0;
}

/**
 * Set selection tools top position.
 * @param {* int} toolsTop Selection tools top value.
 */
selectionTools.setTop = function (toolsTop) {
  if (!selectionTools.init) return;
  toolsTop = parseFloat(toolsTop);
  if (!isNaN(toolsTop)) {
    selectionTools.selecter.container.style.top = toolsTop + selectionTools.unit;
    selectionTools.selecter.edition.style.top = toolsTop + parseFloat(selectionTools.getHeight()) + selectionTools.unit;
    selectionTools.setModifiedEvent();
  }
}

/**
 * Set selection tools left position.
 * @param {* int} toolsLeft Selection tools left value.
 */
selectionTools.setLeft = function (toolsLeft) {
  if (!selectionTools.init) return;
  toolsLeft = parseFloat(toolsLeft);
  if (!isNaN(toolsLeft)) {
    selectionTools.selecter.edition.style.left = toolsLeft + selectionTools.unit;
    selectionTools.selecter.container.style.left = toolsLeft + selectionTools.unit;
    selectionTools.setModifiedEvent();
  }
}

/**
 * Get selection tools top position.
 * @returns {* int} Selection tools top position.
 */
selectionTools.getTop = function () {
  if (!selectionTools.init) return;
  return parseFloat(selectionTools.selecter.container.style.top) || 0;
}

/**
 * Get selection tools left postion.
 * @returns {* int} Selection tools left position.
 */
selectionTools.getLeft = function () {
  if (!selectionTools.init) return;
  return parseFloat(selectionTools.selecter.container.style.left) || 0;
}

/**
 * Define event onResize on resize selection tools.
 */
selectionTools.setResizeEvent = function () {
  var dragE = {
    detail: {
      id:selectionTools.objId || null,
      width: selectionTools.getWidth(),
      height: selectionTools.getHeight(),
      top: selectionTools.getTop(),
      left: selectionTools.getLeft(),
    }
  }

  var toolsEvent = new CustomEvent("onResize", dragE);
  selectionTools.on.dispatchEvent(toolsEvent);
}

/**
 * Define event onModified on modified selection tools.
 */
selectionTools.setModifiedEvent = function () {
  var dragE = {
    detail: {
      id:selectionTools.objId || null,
      width: selectionTools.getWidth(),
      height: selectionTools.getHeight(),
      top: selectionTools.getTop(),
      left: selectionTools.getLeft(),
    }
  }

  var toolsEvent = new CustomEvent("onModified", dragE);
  selectionTools.on.dispatchEvent(toolsEvent);
}

/**
 * Set active object.
 * @param {* object} obj 
 */
selectionTools.setActiveObject = function (obj) {
  selectionTools.obj = obj || false;
}

/**
 * Get active object.
 * @returns {* object} Active object.
 */
selectionTools.getActiveObject = function () {
  return selectionTools.obj || null;
}

/**
 * Hide selection tools.
 */
selectionTools.hide = function () {
  if (!selectionTools.init) return;
  selectionTools.selecter.containerAll.classList.add(selectionTools.disabled_selector);
}

/**
 * Display selection tools.
 */
selectionTools.show = function () {
  if (!selectionTools.init) return;
  selectionTools.selecter.containerAll.classList.remove(selectionTools.disabled_selector);
}

/** 
 * Set selection tools id.
 * @param {* string} _id 
 */
selectionTools.setId = function (_id) {
  selectionTools.id = _id || false;
}

/**
 * Get selection tools id.
 * @returns {* string} Selection tools id.
 */
selectionTools.getId = function () {
  return selectionTools.id || false;
}

window.onclick = function (event) {
  if (event.target) {
    var parent = event.target.parentNode.classList;
    parent = parent.value.split(" ");
    var allClass = event.target.classList;
    allClass = allClass.value.split(" ");
    if (allClass.indexOf('selection-tools-selecter-btn') === -1
      && allClass.indexOf('awl-select-tools') === -1
      && (parent.indexOf("active-canvas") !== -1
        || parent.indexOf("canvas-container") !== -1)
    ) {
      selectionTools.hide();
    }
  }
}