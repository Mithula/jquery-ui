!function(a){a=a||{};var b={shadow:function(a){return a?a.shadowRoot||a.webkitShadowRoot:void 0},canTarget:function(a){return a&&Boolean(a.elementFromPoint)},targetingShadow:function(a){var b=this.shadow(a);return this.canTarget(b)?b:void 0},searchRoot:function(a,b,c){if(a){var d,e,f,g=a.elementFromPoint(b,c);for(e=this.targetingShadow(g);e;){if(d=e.elementFromPoint(b,c)){var h=this.targetingShadow(d);return this.searchRoot(h,b,c)||d}f=e.querySelector("shadow"),e=f&&f.olderShadowRoot}return g}},findTarget:function(a){var b=a.clientX,c=a.clientY;return this.searchRoot(document,b,c)}};a.targetFinding=b,a.findTarget=b.findTarget.bind(b),window.PointerEventsPolyfill=a}(window.PointerEventsPolyfill),function(){function a(a){return'[touch-action="'+a+'"]'}function b(a){return"{ -ms-touch-action: "+a+"; touch-action: "+a+"; }"}var c=["none","pan-x","pan-y",{rule:"pan-x pan-y",selectors:["scroll","pan-x pan-y","pan-y pan-x"]}],d="";c.forEach(function(c){d+=String(c)===c?a(c)+b(c):c.selectors.map(a)+b(c.rule)});var e=document.createElement("style");e.textContent=d;var f=document.querySelector("head");f.insertBefore(e,f.firstChild)}(),function(a){function b(a,b){var b=b||{},e=b.buttons;if(void 0===e)switch(b.which){case 1:e=1;break;case 2:e=4;break;case 3:e=2;break;default:e=0}var f;if(c)f=new MouseEvent(a,b);else{f=document.createEvent("MouseEvent");var g={bubbles:!1,cancelable:!1,view:null,detail:null,screenX:0,screenY:0,clientX:0,clientY:0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,button:0,relatedTarget:null};Object.keys(g).forEach(function(a){a in b&&(g[a]=b[a])}),f.initMouseEvent(a,g.bubbles,g.cancelable,g.view,g.detail,g.screenX,g.screenY,g.clientX,g.clientY,g.ctrlKey,g.altKey,g.shiftKey,g.metaKey,g.button,g.relatedTarget)}d||Object.defineProperty(f,"buttons",{get:function(){return e},enumerable:!0});var h=0;return h=b.pressure?b.pressure:e?.5:0,Object.defineProperties(f,{pointerId:{value:b.pointerId||0,enumerable:!0},width:{value:b.width||0,enumerable:!0},height:{value:b.height||0,enumerable:!0},pressure:{value:h,enumerable:!0},tiltX:{value:b.tiltX||0,enumerable:!0},tiltY:{value:b.tiltY||0,enumerable:!0},pointerType:{value:b.pointerType||"",enumerable:!0},hwTimestamp:{value:b.hwTimestamp||0,enumerable:!0},isPrimary:{value:b.isPrimary||!1,enumerable:!0}}),f}var c=!1,d=!1;try{var e=new MouseEvent("click",{buttons:1});c=!0,d=1===e.buttons}catch(f){}a.PointerEvent=b}(window),function(a){function b(){this.ids=[],this.pointers=[]}b.prototype={set:function(a,b){var c=this.ids.indexOf(a);c>-1?this.pointers[c]=b:(this.ids.push(a),this.pointers.push(b))},has:function(a){return this.ids.indexOf(a)>-1},"delete":function(a){var b=this.ids.indexOf(a);b>-1&&(this.ids.splice(b,1),this.pointers.splice(b,1))},get:function(a){var b=this.ids.indexOf(a);return this.pointers[b]},get size(){return this.pointers.length},clear:function(){this.ids.length=0,this.pointers.length=0}},a.PointerMap=b}(window.PointerEventsPolyfill),function(a){var b;if("undefined"!=typeof WeakMap&&navigator.userAgent.indexOf("Firefox/")<0)b=WeakMap;else{var c=Object.defineProperty,d=Object.hasOwnProperty,e=(new Date).getTime()%1e9;b=function(){this.name="__st"+(1e9*Math.random()>>>0)+(e++ +"__")},b.prototype={set:function(a,b){c(a,this.name,{value:b,writable:!0})},get:function(a){return d.call(a,this.name)?a[this.name]:void 0},"delete":function(a){this.set(a,void 0)}}}a.SideTable=b}(window.PointerEventsPolyfill),function(a){var b={targets:new a.SideTable,handledEvents:new a.SideTable,scrollType:new a.SideTable,pointermap:new a.PointerMap,events:[],eventMap:{},eventSources:{},registerSource:function(a,b){var c=b,d=c.events;d&&(this.events=this.events.concat(d),d.forEach(function(a){c[a]&&(this.eventMap[a]=c[a].bind(c))},this),this.eventSources[a]=c)},registerTarget:function(a,b){this.scrollType.set(a,b||"none"),this.listen(this.events,a,this.boundHandler)},unregisterTarget:function(a){this.scrollType.set(a,null),this.unlisten(this.events,a,this.boundHandler)},down:function(a){this.fireEvent("pointerdown",a)},move:function(a){this.fireEvent("pointermove",a)},up:function(a){this.fireEvent("pointerup",a)},enter:function(a){a.bubbles=!1,this.fireEvent("pointerenter",a)},leave:function(a){a.bubbles=!1,this.fireEvent("pointerleave",a)},over:function(a){a.bubbles=!0,this.fireEvent("pointerover",a)},out:function(a){a.bubbles=!0,this.fireEvent("pointerout",a)},cancel:function(a){this.fireEvent("pointercancel",a)},leaveOut:function(a){a.target.contains(a.relatedTarget)||this.leave(a),this.out(a)},enterOver:function(a){a.target.contains(a.relatedTarget)||this.enter(a),this.over(a)},eventHandler:function(a){if(!this.handledEvents.get(a)){var b=a.type,c=this.eventMap&&this.eventMap[b];c&&c(a),this.handledEvents.set(a,!0)}},listen:function(a,b,c){a.forEach(function(a){this.addEvent(a,c,!1,b)},this)},unlisten:function(a,b,c){a.forEach(function(a){this.removeEvent(a,c,!1,b)},this)},addEvent:function(a,b,c,d){d.addEventListener(a,b,c)},removeEvent:function(a,b,c,d){d.removeEventListener(a,b,c)},makeEvent:function(a,b){var c=new PointerEvent(a,b);return this.targets.set(c,this.targets.get(b)||b.target),c},fireEvent:function(a,b){var c=this.makeEvent(a,b);return this.dispatchEvent(c)},cloneEvent:function(a){var b={};for(var c in a)b[c]=a[c];return b},getTarget:function(a){return this.captureInfo&&this.captureInfo.id===a.pointerId?this.captureInfo.target:this.targets.get(a)},setCapture:function(a,b){this.captureInfo&&this.releaseCapture(this.captureInfo.id),this.captureInfo={id:a,target:b};var c=new PointerEvent("gotpointercapture",{bubbles:!0});this.implicitRelease=this.releaseCapture.bind(this,a),document.addEventListener("pointerup",this.implicitRelease),document.addEventListener("pointercancel",this.implicitRelease),this.targets.set(c,b),this.asyncDispatchEvent(c)},releaseCapture:function(a){if(this.captureInfo&&this.captureInfo.id===a){var b=new PointerEvent("lostpointercapture",{bubbles:!0}),c=this.captureInfo.target;this.captureInfo=null,document.removeEventListener("pointerup",this.implicitRelease),document.removeEventListener("pointercancel",this.implicitRelease),this.targets.set(b,c),this.asyncDispatchEvent(b)}},dispatchEvent:function(a){var b=this.getTarget(a);return b?b.dispatchEvent(a):void 0},asyncDispatchEvent:function(a){setTimeout(this.dispatchEvent.bind(this,a),0)}};b.boundHandler=b.eventHandler.bind(b),a.dispatcher=b}(window.PointerEventsPolyfill),function(a){var b=a.dispatcher,c=Array.prototype.forEach.call.bind(Array.prototype.forEach),d=Array.prototype.map.call.bind(Array.prototype.map),e={ATTRIB:"touch-action",SELECTOR:"[touch-action]",EMITTER:"none",XSCROLLER:"pan-x",YSCROLLER:"pan-y",SCROLLER:/^(?:pan-x pan-y)|(?:pan-y pan-x)|scroll$/,OBSERVER_INIT:{subtree:!0,childList:!0,attributes:!0,attributeFilter:["touch-action"]},watchSubtree:function(b){a.targetFinding.canTarget(b)&&h.observe(b,this.OBSERVER_INIT)},enableOnSubtree:function(a){var b=a||document;this.watchSubtree(a),b===document&&"complete"!==document.readyState?this.installOnLoad():this.installNewSubtree(b)},installNewSubtree:function(a){c(this.findElements(a),this.addElement,this)},findElements:function(a){var b=a||document;return b.querySelectorAll?b.querySelectorAll(this.SELECTOR):[]},touchActionToScrollType:function(a){var b=a;return b===this.EMITTER?"none":b===this.XSCROLLER?"X":b===this.YSCROLLER?"Y":this.SCROLLER.exec(b)?"XY":void 0},removeElement:function(c){b.unregisterTarget(c);var d=a.targetFinding.shadow(c);d&&b.unregisterTarget(d)},addElement:function(c){var d=c.getAttribute&&c.getAttribute(this.ATTRIB),e=this.touchActionToScrollType(d);if(e){b.registerTarget(c,e);var f=a.targetFinding.shadow(c);f&&b.registerTarget(f,e)}},elementChanged:function(a){this.removeElement(a),this.addElement(a)},concatLists:function(a,b){for(var c,d=0,e=b.length;e>d&&(c=b[d]);d++)a.push(c);return a},installOnLoad:function(){document.addEventListener("DOMContentLoaded",this.installNewSubtree.bind(this,document))},flattenMutationTree:function(a){var b=d(a,this.findElements,this);return b.push(a),b.reduce(this.concatLists,[])},mutationWatcher:function(a){a.forEach(this.mutationHandler,this)},mutationHandler:function(a){var b=a;if("childList"===b.type){var c=this.flattenMutationTree(b.addedNodes);c.forEach(this.addElement,this);var d=this.flattenMutationTree(b.removedNodes);d.forEach(this.removeElement,this)}else"attributes"===b.type&&this.elementChanged(b.target)}},f=e.mutationWatcher.bind(e);a.installer=e,a.register=e.enableOnSubtree.bind(e),a.setTouchAction=function(a,c){var d=this.touchActionToScrollType(c);d?b.registerTarget(a,d):b.unregisterTarget(a)}.bind(e);var g=window.MutationObserver||window.WebKitMutationObserver;if(g)var h=new g(f);else e.watchSubtree=function(){console.warn("PointerEventsPolyfill: MutationObservers not found, touch-action will not be dynamically detected")}}(window.PointerEventsPolyfill),function(a){var b=a.dispatcher,c=a.installer,d=a.findTarget,e=b.pointermap,f=b.scrollType,g=Array.prototype.map.call.bind(Array.prototype.map),h=2500,i=25,j={events:["touchstart","touchmove","touchend","touchcancel"],POINTER_TYPE:"touch",firstTouch:null,isPrimaryTouch:function(a){return this.firstTouch===a.identifier},setPrimaryTouch:function(a){null===this.firstTouch&&(this.firstTouch=a.identifier,this.firstXY={X:a.clientX,Y:a.clientY},this.scrolling=!1)},removePrimaryTouch:function(a){this.isPrimaryTouch(a)&&(this.firstTouch=null,this.firstXY=null)},touchToPointer:function(a){var c=b.cloneEvent(a);return c.pointerId=a.identifier+2,c.target=d(c),c.bubbles=!0,c.cancelable=!0,c.button=0,c.buttons=1,c.width=a.webkitRadiusX||a.radiusX,c.height=a.webkitRadiusY||a.radiusY,c.pressure=a.webkitForce||a.force,c.isPrimary=this.isPrimaryTouch(a),c.pointerType=this.POINTER_TYPE,c},processTouches:function(a,b){var c=a.changedTouches,d=g(c,this.touchToPointer,this);d.forEach(b,this)},shouldScroll:function(a){if(this.firstXY){var b,c=f.get(a.currentTarget);if("none"===c)b=!1;else if("XY"===c)b=!0;else{var d=a.changedTouches[0],e=c,g="Y"===c?"X":"Y",h=Math.abs(d["client"+e]-this.firstXY[e]),i=Math.abs(d["client"+g]-this.firstXY[g]);b=h>=i}return this.firstXY=null,b}},findTouch:function(a,b){for(var c,d=0,e=a.length;e>d&&(c=a[d]);d++)if(c.identifier===b)return!0},vacuumTouches:function(a){var b=a.touches;if(e.size>=b.length){var c=[];e.ids.forEach(function(a){if(1!==a&&!this.findTouch(b,a-2)){var d=e.get(a).out;c.push(this.touchToPointer(d))}},this),c.forEach(this.cancelOut,this)}},touchstart:function(a){this.vacuumTouches(a),this.setPrimaryTouch(a.changedTouches[0]),this.dedupSynthMouse(a),this.scrolling||this.processTouches(a,this.overDown)},overDown:function(a){e.set(a.pointerId,{target:a.target,out:a,outTarget:a.target}),b.over(a),b.down(a)},touchmove:function(a){this.scrolling||(this.shouldScroll(a)?(this.scrolling=!0,this.touchcancel(a)):(a.preventDefault(),this.processTouches(a,this.moveOverOut)))},moveOverOut:function(a){var c=a,d=e.get(c.pointerId),f=d.out,g=d.outTarget;b.move(c),f&&g!==c.target&&(f.relatedTarget=c.target,c.relatedTarget=g,f.target=g,b.leaveOut(f),b.enterOver(c)),d.out=c,d.outTarget=c.target},touchend:function(a){this.dedupSynthMouse(a),this.processTouches(a,this.upOut)},upOut:function(a){this.scrolling||(b.up(a),b.out(a)),this.cleanUpPointer(a)},touchcancel:function(a){this.processTouches(a,this.cancelOut)},cancelOut:function(a){b.cancel(a),b.out(a),this.cleanUpPointer(a)},cleanUpPointer:function(a){e.delete(a.pointerId),this.removePrimaryTouch(a)},dedupSynthMouse:function(a){var b=k.lastTouches,c=a.changedTouches[0];if(this.isPrimaryTouch(c)){var d={x:c.clientX,y:c.clientY};b.push(d);var e=function(a,b){var c=a.indexOf(b);c>-1&&a.splice(c,1)}.bind(null,b,d);setTimeout(e,h)}}},k={POINTER_ID:1,POINTER_TYPE:"mouse",events:["mousedown","mousemove","mouseup","mouseover","mouseout"],global:["mousedown","mouseup","mouseover","mouseout"],lastTouches:[],mouseHandler:b.eventHandler.bind(b),isEventSimulatedFromTouch:function(a){for(var b,c=this.lastTouches,d=a.clientX,e=a.clientY,f=0,g=c.length;g>f&&(b=c[f]);f++){var h=Math.abs(d-b.x),j=Math.abs(e-b.y);if(i>=h&&i>=j)return!0}},prepareEvent:function(a){var c=b.cloneEvent(a);return c.pointerId=this.POINTER_ID,c.isPrimary=!0,c.pointerType=this.POINTER_TYPE,c},mousedown:function(a){if(!this.isEventSimulatedFromTouch(a)){var c=e.has(this.POINTER_ID);if(c&&(this.cancel(a),c=!1),!c){var d=this.prepareEvent(a);e.set(this.POINTER_ID,a),b.down(d),b.listen(this.global,document,this.mouseHandler)}}},mousemove:function(a){if(!this.isEventSimulatedFromTouch(a)){var c=this.prepareEvent(a);b.move(c)}},mouseup:function(a){if(!this.isEventSimulatedFromTouch(a)){var c=e.get(this.POINTER_ID);if(c&&c.button===a.button){var d=this.prepareEvent(a);b.up(d),this.cleanupMouse()}}},mouseover:function(a){if(!this.isEventSimulatedFromTouch(a)){var c=this.prepareEvent(a);b.enterOver(c)}},mouseout:function(a){if(!this.isEventSimulatedFromTouch(a)){var c=this.prepareEvent(a);b.leaveOut(c)}},cancel:function(a){var c=this.prepareEvent(a);b.cancel(c),this.cleanupMouse()},cleanupMouse:function(){e.delete(this.POINTER_ID),b.unlisten(this.global,document,this.mouseHandler)}},l={events:["MSPointerDown","MSPointerMove","MSPointerUp","MSPointerOut","MSPointerOver","MSPointerCancel","MSGotPointerCapture","MSLostPointerCapture"],POINTER_TYPES:["","unavailable","touch","pen","mouse"],prepareEvent:function(a){var c=b.cloneEvent(a);return c.pointerType=this.POINTER_TYPES[a.pointerType],c},cleanup:function(a){e.delete(a)},MSPointerDown:function(a){e.set(a.pointerId,a);var c=this.prepareEvent(a);b.down(c)},MSPointerMove:function(a){var c=this.prepareEvent(a);b.move(c)},MSPointerUp:function(a){var c=this.prepareEvent(a);b.up(c),this.cleanup(a.pointerId)},MSPointerOut:function(a){var c=this.prepareEvent(a);b.leaveOut(c)},MSPointerOver:function(a){var c=this.prepareEvent(a);b.enterOver(c)},MSPointerCancel:function(a){var c=this.prepareEvent(a);b.cancel(c),this.cleanup(a.pointerId)},MSLostPointerCapture:function(a){var c=b.makeEvent("lostpointercapture",a);b.dispatchEvent(c)},MSGotPointerCapture:function(a){var c=b.makeEvent("gotpointercapture",a);b.dispatchEvent(c)}};if(void 0===window.navigator.pointerEnabled){if(window.navigator.msPointerEnabled){var m=window.navigator.msMaxTouchPoints;Object.defineProperty(window.navigator,"maxTouchPoints",{value:m,enumerable:!0}),b.registerSource("ms",l),b.registerTarget(document)}else b.registerSource("mouse",k),"ontouchstart"in window&&b.registerSource("touch",j),c.enableOnSubtree(document),b.listen(["mousemove"],document,b.boundHandler);Object.defineProperty(window.navigator,"pointerEnabled",{value:!0,enumerable:!0})}}(window.PointerEventsPolyfill),function(a){function b(a){if(!e.pointermap.has(a))throw new Error("InvalidPointerId")}var c,d,e=a.dispatcher,f=window.navigator;f.msPointerEnabled?(c=function(a){b(a),this.msSetPointerCapture(a)},d=function(a){b(a),this.msReleasePointerCapture(a)}):(c=function(a){b(a),e.setCapture(a,this)},d=function(a){b(a),e.releaseCapture(a,this)}),Element.prototype.setPointerCapture||Object.defineProperties(Element.prototype,{setPointerCapture:{value:c},releasePointerCapture:{value:d}})}(window.PointerEventsPolyfill);
/*
//@ sourceMappingURL=pointerevents.js.map
*/