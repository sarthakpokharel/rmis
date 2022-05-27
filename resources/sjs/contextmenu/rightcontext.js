var RightContext = {
    //some final vars:
    TYPE_MENU: 0,       // menu item
    TYPE_TEXT: 1,       // inline text (non-mutable hard coded)
    TYPE_TEXT_EXT: 2,   // external text (retrived via rpc call)
    TYPE_SEPERATOR:3,   // separator line
    TYPE_ATTRIBUTES:4,  // menu attributes.

    // set the event to trigger the menus: RIGHT,LEFT (right/left click) or mouse MOVE 
    menuTriggerEvent: "RIGHT",
    
    // object to hold temp mouse position
    mousePos: {x:0, y:0},

    // offset for menu from mouse pointer
    rightOffset: 5,

    // type of html tags that can have context menus. You can edit this to 
    // allow more tags into the party.
    allowedContexts: ["a","div","span","input","img","tr"],

    // object to hold a collection of menus indexed by name
    menuCollection: new Object(),

    // the currently visible context menu DIV element
    contextMenu: null,
    
    // some state machine: is the menu showing (LEFT), and should killing it be aborted (MOVE)
    isShowing: false,
    abortKill: false,
    
    // image cache
    images: new Object(),
    
    // var to hold external requests
    req: null,
    
    // initialize RightContext object 
    initialize: function () {
        this.attachContextEvents();   
    },

    // adds a menu to the menuCollection
    addMenu: function (n, m) { 
        this.menuCollection[n] = m;
    },

    // return a menu from the menu collection
    getMenu: function (n) {
        return this.menuCollection[n];
    },

    // loop all context allowed tags in the document and attach menu events to 
    // those that contain the menu attribute
    attachContextEvents: function () {
      
	   var tagContext, thisTag;
        for (var t=0; t<this.allowedContexts.length; t++) {
            tags = document.getElementsByTagName(this.allowedContexts[t]);

            for (e=0; e<tags.length; e++) {
                thisTag = tags[e];
                tagContext = thisTag.getAttribute("context");
                if (tagContext!=null && tagContext != "undefined") {
                	this.bindEvent('mousemove', tags[e], function(e) { return RightContext.locateMousePos(e); });
					if (this.menuTriggerEvent=="RIGHT") {
						
                    	tags[e].oncontextmenu = function() {   return RightContext.render(this);   }; 
                    } else if (this.menuTriggerEvent=="LEFT") {
						//this.bindEvent('click', tags[e],  function() {  return RightContext.render(this, tagContext);  });
                        tags[e].onclick = function(e) { 
                                                        RightContext.killBubble(e); 
                                                        return RightContext.render(this)
                                                       };
                    } else if (this.menuTriggerEvent=="MOVE") {
                        if (!document.all) {
                            this.bindEvent('mouseover', tags[e], function(e) { RightContext.locateMousePos(e); return RightContext.render(this); });
	    					this.bindEvent('mouseout',  tags[e], function(e) { setTimeout("RightContext.killMenu()", 100); });
                        } else {
                            tags[e].onmouseover =  function(e) { RightContext.locateMousePos(e); return RightContext.render(this); };
                            tags[e].onmouseout = function(e) { setTimeout("RightContext.killMenu()", 100); };
                        }
                    }
                }
            }
        }
    },
    
    killBubble: function(e) {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
    },
    
    // binds an event handler to an object
    bindEvent: function (evt, obj, act, bubble) {
        if (!bubble) bubble = false;
        if (obj.addEventListener) {
            obj.addEventListener(evt, act, bubble);
        } else if (obj.attachEvent) {
            obj.attachEvent('on'+evt, act);
        }
    },
    
 
    /*
     renders a given menu and attaches it to the caller object.
     The caller is responsible to contain a few extra attributes
     that will help construct the links for this menu (i.e., provide the Context)
    */
    render: function (caller, name) {
        var url, title;
        // if name was not specified, grab it from the caller
        // v0.2 - changed to getAttribute (used direct nodeValue access before my mistake). pointed out by JDG.
		//alert(caller);->window.location
        var name = name || caller.getAttribute("context");
//alert(name);
        // get the requested menu
        var thisMenu = this.getMenu(name);
         //alert("right clicked")
		 
		//return false;
        // extracts this menus attributes list and items
        var attributes = thisMenu["attributes"].split(',');   
        var items = thisMenu.items;

        // constructs a map from the callers attributes
        var objMap = this.buildAttributeMap(attributes, caller);

        // start building the menu itself, but first remove menu if visible
        this.killMenu();
        this.buildMenu(caller);
       
        // create a table to build the menu items in
        tbl = document.createElement("TABLE");
        tbl.id = "rcRightContextTable";
		
        
        // loop the menu items and render each according to its type
        for (var m=0; m<items.length; m++) {
		   switch (items[m]["type"]) {
                case this.TYPE_MENU:
                    // add the menu item
					
                    if (this.isDisplayed(items[m], objMap)) {
                        this.addMenuItem(items[m], objMap, tbl);
                    }
                    break;

                case this.TYPE_TEXT:
                    // add fixed text
					
                    text = this.transform(items[m]["text"], objMap);
                    cell = this.addTableCell(tbl, "rcMenuItemText", text);
                    break;

                case this.TYPE_TEXT_EXT:
				    cell = this.addTableCell(tbl, "rcMenuItemTextExt");
                    url = this.transform(items[m]["url"], objMap);
                    this.request(url, function() { if (RightContext.req.readyState == 4 && RightContext.req.status == 200) { cell.innerHTML = RightContext.req.responseText } });
					

                    break;

                case this.TYPE_SEPERATOR:
                    cell = this.addTableCell(tbl);
                    cell.appendChild(this.getSeparator());
                    break;
                
                default:
                    // no default behaviour
                    break;
            }
            
        }
        // append the menu item table to the menu itself
        this.contextMenu.appendChild(tbl);
        // make sure we're not overflowed to the edge of the screen.
        this.repositionMenu();
        
        if (this.menuTriggerEvent=="MOVE") {
            this.bindEvent('mouseout',  this.contextMenu, function(e) { RightContext.abortKill = false; setTimeout("RightContext.killMenu()",100); });
			this.bindEvent('mouseover', this.contextMenu, function(e) { RightContext.abortKill = true;  });
        } else if (this.menuTriggerEvent=="LEFT" || this.menuTriggerEvent=="RIGHT") {
        	this.bindEvent('click', document.body, function(e) { setTimeout("RightContext.killMenu();", 100); }, false);
        } 
        this.isShowing = true;
        
        return false;
    },

    isDisplayed : function(item, objMap) {
        var reqVar, reqVal;
        var shown = true; // by default all items are shown, unless they require something 
        // lets make sure this item does not require any condition to be true in order to display
        if (item["requires"] != null && item["requires"] != "undefined") {
            // yep, this one has a requirement...
            reqVar = item["requires"][0];
            reqVal = item["requires"][1];
            if (objMap[reqVar] != null && objMap[reqVar] != "undefined") {
                // if the condition is not met, do not show this item.
                if (objMap[reqVar] != reqVal) {
                    shown = false;    
                }
            } else {
                // if the condition is not defined do not show the item
                shown = false;
            }
        }
        return shown;
    },
    
    // check if the menu goes outside the window boundries and adjust its 
    // location if so
    repositionMenu: function() {
        var mPos = this.findPosition(this.contextMenu);
        var mDim = this.getDimensions(this.contextMenu);
        var winHeight = window.innerHeight || document.body.clientHeight;   
        var winWidth = window.innerWidth || document.body.clientWidth;
        if (mPos.y + mDim.height > winHeight-30 ) {
            this.position(this.contextMenu, mPos.x, mPos.y - mDim.height);
            mPos = this.findPosition(this.contextMenu);
        } 
        if (mPos.x + mDim.width > winWidth - 30 ) {
            this.position(this.contextMenu, mPos.x-mDim.width, mPos.y);
        } 
    },
    
    // returns an HR sepearator which uses the rcMenuSeparator style
    getSeparator: function () {
        var sep = document.createElement("HR");
        sep.className = "rcMenuSeparator";
        return sep;
    },
    
    // adds a table cell to the provided table and returns it.
    // attached a class if provided and initializes the cell with some content 
    // where applicable
    addTableCell: function (table, className, content) {
        //className="qm0";
		
		row = table.insertRow(-1);
        cell = row.insertCell(0);
		 if (className) { 
            cell.className = className;
            if (content) {
                cell.innerHTML = content;
            }
        }
        return cell;
    },

    // adds a menu item to the provided table. transforms all data as defined 
    // in the objMap argument
    addMenuItem: function (item, objMap, tbl) {
        var title = this.transform(item["text"], objMap);
		var url, frame, img, imgAlign, itemSrc, tmp, itemAction; 
        var cell = this.addTableCell(tbl, "rcMenuItem", title); 
        cell.style.cursor = document.all?'hand':'pointer';
		 this.bindEvent('mouseover', cell, function(e) { cell.className="rcMenuItemHover";});
		// this.bindEvent('mousemove', cell, function(e) { this.className="rcMenuItemHover";});
        this.bindEvent('mouseout',  cell, function(e) { cell.className="rcMenuItem";     });
        
        // deal with image if applicable
        if (item["image"]!=null && item["image"]!="undefined") {
        	// get image alignment or default to absmiddle
        	imgAlign = (item["align"]!=null && item["align"]!="undefined") ? item["align"] : "absmiddle";
        	// load the image from the cache, or from disk (and then cache it)
        	if (this.images[item["image"]] != null && this.images[item["image"]] != "undefined") {
        		img = this.images[item["image"]];
        	} else {
        		img = this.loadImage(item["image"]);
        	}
        	// set image alignment
        	img.align=imgAlign;
        	// insert the image as first child of the cell
        	cell.insertBefore(this.images[item["image"]], cell.childNodes[0]);
        }
        
        if (item["url"]!=null && item["url"] != "undefined") {
            url   = this.transform(item["url"],  objMap);
            frame = false;
            if (item["frame"] != null && item["frame"] != "undefined") {
                frame = item["frame"];
            }
            cell.onclick = function () { RightContext.redirect(url, frame); }
        } else {
            // we first need to find out if the event handler contains a potential 
            // tag. if so, we grab its source, transform it and re-evaluate it. 
            // if this fails, the value reverts back to its original function
            itemAction = item["onclick"]; 
            try {

	    itemSrc = item["onclick"].toString();
	    if (itemSrc.indexOf('[')>-1) {
                itemSrc = this.transform(itemSrc, objMap);
                if (document.all) { // IE's eval won't return a parsed function.. we need to tell it to set it and then eval
                    eval('itemAction = ' + itemSrc);
                } else { // firefox allows this. 
                    itemAction = eval(itemSrc);
                }
            }
         
            } catch (e) {
               // nothing...
            }

            // set the cell onclick event handler.
            cell.onclick=itemAction;
        }

    },

    // transforms a string based on the provided map
    transform: function (str, map) {
        var tStr, tmp;
        tStr = str;
        for (p in map) {
            tmp = "[" + p + "]";
            tStr = tStr.replace(tmp, map[p]);
        }
        return tStr;
    },

    // returns the menu's attributes collection that will be used to construct 
    // the transformation map
    getMenuAttributeArray: function (menu) {
        for (var i=0; i<menu.length; i++) {
            if (menu[i].type == this.TYPE_ATTRIBUTES) {
                return menu[i]["attributes"].split(',');
            }
        }
        return new Array(0);
    },

    // construct the transformation map for a given object based on the tags in 
    // attribs
    buildAttributeMap: function (attribs, obj) {
        var thisAttr, thisValue;
        var attrMap = new Object();

        for (var a=0; a<attribs.length; a++) {
            thisAttr = attribs[a];
            thisValue = obj.getAttribute(attribs[a]);
            if (typeof thisValue != "undefined") {
                attrMap[thisAttr] = thisValue;
            }
        }
        return attrMap;
    },

    // find the position of an element on the screen and returns an array of [x,y]
    findPosition: function (obj) {
        var lft = 0;
        var top = 0;
        if (obj.offsetParent) {
            lft = obj.offsetLeft
            top = obj.offsetTop
            while (obj = obj.offsetParent) {
                lft += obj.offsetLeft
                top += obj.offsetTop
            }
        }
        return {x:lft,y:top};
    },

    // Returns the dimensions of an element on screen. Lifted from the wonderful 
    // prototype framework
    getDimensions: function(obj) {
        //var display = obj.getStyle('display');
        //if (display != 'none' && display != null) // Safari bug
        //  return {width: element.offsetWidth, height: element.offsetHeight};

        // All *Width and *Height properties give 0 on elements with display none,
        // so enable the element temporarily
        var objStyle = obj.style;
        var originalVisibility = objStyle.visibility;
        var originalPosition = objStyle.position;
        var originalDisplay = objStyle.display;
        objStyle.visibility = 'hidden';
        objStyle.position = 'absolute';
        objStyle.display = 'block';
		var originalWidth = obj.clientWidth;
        var originalHeight = obj.clientHeight;
        objStyle.display = originalDisplay;
        objStyle.position = originalPosition;
        objStyle.visibility = originalVisibility;
        return {width: originalWidth, height: originalHeight};
    },

    // positions object at x,y coordinates
    // v0.2 - added px to the position coordinate (provided by JDG)
    position: function (obj, x, y) {
        obj.style.left = x + 'px';
        obj.style.top  = y + 'px';
    },

    // builds a menu for parent object
    buildMenu: function (parent) {
        var pos, dim, tbl;
        //document.onmousemove  = RightContext.getMousePos;
        this.contextMenu = document.createElement("DIV");
        this.contextMenu.id = "rcRightContext";
        this.contextMenu.className = 'rcMenuContainer';
		this.contextMenu.style.zIndex=2600;
        // get the position and dimensions of the parent
        pos = this.findPosition(parent);
        dim = this.getDimensions(parent);

        // position the container to the bottom right of the element.
        this.position (this.contextMenu, this.mousePos.x + this.rightOffset, pos.y+dim.height);

        // set some event handlers
        // if the menu is triggered by a right click, disable the right click on the menu itself
        if (this.menuTriggerEvent == "RIGHT") {
	        this.contextMenu.oncontextmenu = function () { return false; };
	    }
  		
        // add the container to the body of the document
        document.body.appendChild(this.contextMenu);
         
    },


    // kills the currently visible context menu
    killMenu: function () {
        if (!this.abortKill && this.isShowing) {
        try {
            rc = this.contextMenu;
            document.body.removeChild(rc);
        } catch (e) {
            // already removed?
        }
        this.contextMenu = null;
        this.isShowing = false;
        this.abortKill = false;
        }
    },

    // locate the mouse cursor position 
    locateMousePos: function(e) {
        var posx = 0, posy =0;
        if(e==null) e=window.event;
        if(e.pageX || e.pageY) {
            posx=e.pageX; posy=e.pageY;
        } else if (e.clientX || e.clientY) {
            if(document.documentElement.scrollTop){
                posx=e.clientX+document.documentElement.scrollLeft;
                posy=e.clientY+document.documentElement.scrollTop;
            } else {
                posx=e.clientX+document.body.scrollLeft;
                posy=e.clientY+document.body.scrollTop;
            }
        }
        this.mousePos = {x:posx , y:posy};

    },
    
    // redirects the browser to given url
    // if frame!=false, it will open in provided frame (or new win if _blank)
    redirect: function (u, frame) {
        if (!frame) {
            document.location = u;  
        } else {
            if (frame=="_blank") {
                w = window.open(u, 'w');
            } else {
                window.frames[frame].document.location = u;
            }
        }
    },
    
    // performs a request - ajax style
    request: function (url, callBack) {
        if (window.XMLHttpRequest) { // native XMLHttpRequest
            this.req = new XMLHttpRequest();
            this.req.onreadystatechange =  callBack; 
            this.req.open("GET", url, true);
            this.req.send(null);
         } else if (window.ActiveXObject) { // The M$ 'standard'
            this.req = new ActiveXObject("Microsoft.XMLHTTP");
            if (this.req) { 
                this.req.onreadystatechange =   callBack;
                this.req.open("GET", url, true);
                this.req.send();
             }
         }
    },
    
    loadImage: function (url) {
    	var img = new Image();
    	img.src = url; 
    	img.className = "rcImage";
    	this.images[url] = img;
    	return img;
    }

};