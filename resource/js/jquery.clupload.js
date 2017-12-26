// v3.1



/*jquery ui drag */

(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function t(t,s){var n,a,o,r=t.nodeName.toLowerCase();return"area"===r?(n=t.parentNode,a=n.name,t.href&&a&&"map"===n.nodeName.toLowerCase()?(o=e("img[usemap='#"+a+"']")[0],!!o&&i(o)):!1):(/^(input|select|textarea|button|object)$/.test(r)?!t.disabled:"a"===r?t.href||s:s)&&i(t)}function i(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}e.ui=e.ui||{},e.extend(e.ui,{version:"1.11.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({scrollParent:function(t){var i=this.css("position"),s="absolute"===i,n=t?/(auto|scroll|hidden)/:/(auto|scroll)/,a=this.parents().filter(function(){var t=e(this);return s&&"static"===t.css("position")?!1:n.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==i&&a.length?a:e(this[0].ownerDocument||document)},uniqueId:function(){var e=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(i){return t(i,!isNaN(e.attr(i,"tabindex")))},tabbable:function(i){var s=e.attr(i,"tabindex"),n=isNaN(s);return(n||s>=0)&&t(i,!n)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(t,i){function s(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===i?["Left","Right"]:["Top","Bottom"],a=i.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+i]=function(t){return void 0===t?o["inner"+i].call(this):this.each(function(){e(this).css(a,s(this,t)+"px")})},e.fn["outer"+i]=function(t,n){return"number"!=typeof t?o["outer"+i].call(this,t):this.each(function(){e(this).css(a,s(this,t,!0,n)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),disableSelection:function(){var e="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(e+".ui-disableSelection",function(e){e.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(t){if(void 0!==t)return this.css("zIndex",t);if(this.length)for(var i,s,n=e(this[0]);n.length&&n[0]!==document;){if(i=n.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(s=parseInt(n.css("zIndex"),10),!isNaN(s)&&0!==s))return s;n=n.parent()}return 0}}),e.ui.plugin={add:function(t,i,s){var n,a=e.ui[t].prototype;for(n in s)a.plugins[n]=a.plugins[n]||[],a.plugins[n].push([i,s[n]])},call:function(e,t,i,s){var n,a=e.plugins[t];if(a&&(s||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(n=0;a.length>n;n++)e.options[a[n][0]]&&a[n][1].apply(e.element,i)}};var s=0,n=Array.prototype.slice;e.cleanData=function(t){return function(i){var s,n,a;for(a=0;null!=(n=i[a]);a++)try{s=e._data(n,"events"),s&&s.remove&&e(n).triggerHandler("remove")}catch(o){}t(i)}}(e.cleanData),e.widget=function(t,i,s){var n,a,o,r,h={},l=t.split(".")[0];return t=t.split(".")[1],n=l+"-"+t,s||(s=i,i=e.Widget),e.expr[":"][n.toLowerCase()]=function(t){return!!e.data(t,n)},e[l]=e[l]||{},a=e[l][t],o=e[l][t]=function(e,t){return this._createWidget?(arguments.length&&this._createWidget(e,t),void 0):new o(e,t)},e.extend(o,a,{version:s.version,_proto:e.extend({},s),_childConstructors:[]}),r=new i,r.options=e.widget.extend({},r.options),e.each(s,function(t,s){return e.isFunction(s)?(h[t]=function(){var e=function(){return i.prototype[t].apply(this,arguments)},n=function(e){return i.prototype[t].apply(this,e)};return function(){var t,i=this._super,a=this._superApply;return this._super=e,this._superApply=n,t=s.apply(this,arguments),this._super=i,this._superApply=a,t}}(),void 0):(h[t]=s,void 0)}),o.prototype=e.widget.extend(r,{widgetEventPrefix:a?r.widgetEventPrefix||t:t},h,{constructor:o,namespace:l,widgetName:t,widgetFullName:n}),a?(e.each(a._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete a._childConstructors):i._childConstructors.push(o),e.widget.bridge(t,o),o},e.widget.extend=function(t){for(var i,s,a=n.call(arguments,1),o=0,r=a.length;r>o;o++)for(i in a[o])s=a[o][i],a[o].hasOwnProperty(i)&&void 0!==s&&(t[i]=e.isPlainObject(s)?e.isPlainObject(t[i])?e.widget.extend({},t[i],s):e.widget.extend({},s):s);return t},e.widget.bridge=function(t,i){var s=i.prototype.widgetFullName||t;e.fn[t]=function(a){var o="string"==typeof a,r=n.call(arguments,1),h=this;return o?this.each(function(){var i,n=e.data(this,s);return"instance"===a?(h=n,!1):n?e.isFunction(n[a])&&"_"!==a.charAt(0)?(i=n[a].apply(n,r),i!==n&&void 0!==i?(h=i&&i.jquery?h.pushStack(i.get()):i,!1):void 0):e.error("no such method '"+a+"' for "+t+" widget instance"):e.error("cannot call methods on "+t+" prior to initialization; "+"attempted to call method '"+a+"'")}):(r.length&&(a=e.widget.extend.apply(null,[a].concat(r))),this.each(function(){var t=e.data(this,s);t?(t.option(a||{}),t._init&&t._init()):e.data(this,s,new i(a,this))})),h}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,i){i=e(i||this.defaultElement||this)[0],this.element=e(i),this.uuid=s++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=e(),this.hoverable=e(),this.focusable=e(),i!==this&&(e.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===i&&this.destroy()}}),this.document=e(i.style?i.ownerDocument:i.document||i),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(t,i){var s,n,a,o=t;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof t)if(o={},s=t.split("."),t=s.shift(),s.length){for(n=o[t]=e.widget.extend({},this.options[t]),a=0;s.length-1>a;a++)n[s[a]]=n[s[a]]||{},n=n[s[a]];if(t=s.pop(),1===arguments.length)return void 0===n[t]?null:n[t];n[t]=i}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];o[t]=i}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!t),t&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(t,i,s){var n,a=this;"boolean"!=typeof t&&(s=i,i=t,t=!1),s?(i=n=e(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),e.each(s,function(s,o){function r(){return t||a.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?a[o]:o).apply(a,arguments):void 0}"string"!=typeof o&&(r.guid=o.guid=o.guid||r.guid||e.guid++);var h=s.match(/^([\w:-]*)\s*(.*)$/),l=h[1]+a.eventNamespace,u=h[2];u?n.delegate(u,l,r):i.bind(l,r)})},_off:function(t,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(i).undelegate(i),this.bindings=e(this.bindings.not(t).get()),this.focusable=e(this.focusable.not(t).get()),this.hoverable=e(this.hoverable.not(t).get())},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,o=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(o)&&o.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var o,r=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),o=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),o&&e.effects&&e.effects.effect[r]?s[t](n):r!==t&&s[r]?s[r](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}}),e.widget;var a=!1;e(document).mouseup(function(){a=!1}),e.widget("ui.mouse",{version:"1.11.4",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(i){return!0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(t){if(!a){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(t),this._mouseDownEvent=t;var i=this,s=1===t.which,n="string"==typeof this.options.cancel&&t.target.nodeName?e(t.target).closest(this.options.cancel).length:!1;return s&&!n&&this._mouseCapture(t)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(t)!==!1,!this._mouseStarted)?(t.preventDefault(),!0):(!0===e.data(t.target,this.widgetName+".preventClickEvent")&&e.removeData(t.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return i._mouseMove(e)},this._mouseUpDelegate=function(e){return i._mouseUp(e)},this.document.bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),t.preventDefault(),a=!0,!0)):!0}},_mouseMove:function(t){if(this._mouseMoved){if(e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button)return this._mouseUp(t);if(!t.which)return this._mouseUp(t)}return(t.which||t.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){return this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),a=!1,!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}}),e.widget("ui.draggable",e.ui.mouse,{version:"1.11.4",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._setHandleClassName(),this._mouseInit()},_setOption:function(e,t){this._super(e,t),"handle"===e&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){return(this.helper||this.element).is(".ui-draggable-dragging")?(this.destroyOnClear=!0,void 0):(this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._removeHandleClassName(),this._mouseDestroy(),void 0)},_mouseCapture:function(t){var i=this.options;return this._blurActiveElement(t),this.helper||i.disabled||e(t.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(t),this.handle?(this._blockFrames(i.iframeFix===!0?"iframe":i.iframeFix),!0):!1)},_blockFrames:function(t){this.iframeBlocks=this.document.find(t).map(function(){var t=e(this);return e("<div>").css("position","absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(t){var i=this.document[0];if(this.handleElement.is(t.target))try{i.activeElement&&"body"!==i.activeElement.nodeName.toLowerCase()&&e(i.activeElement).blur()}catch(s){}},_mouseStart:function(t){var i=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===e(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(t),this.originalPosition=this.position=this._generatePosition(t,!1),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._normalizeRightBottom(),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_refreshOffsets:function(e){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:e.pageX-this.offset.left,top:e.pageY-this.offset.top}},_mouseDrag:function(t,i){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(t,!0),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",t,s)===!1)return this._mouseUp({}),!1;this.position=s.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var i=this,s=!1;return e.ui.ddmanager&&!this.options.dropBehaviour&&(s=e.ui.ddmanager.drop(this,t)),this.dropped&&(s=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",t)!==!1&&i._clear()}):this._trigger("stop",t)!==!1&&this._clear(),!1},_mouseUp:function(t){return this._unblockFrames(),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),this.handleElement.is(t.target)&&this.element.focus(),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){return this.options.handle?!!e(t.target).closest(this.element.find(this.options.handle)).length:!0},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this.handleElement.addClass("ui-draggable-handle")},_removeHandleClassName:function(){this.handleElement.removeClass("ui-draggable-handle")},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper),n=s?e(i.helper.apply(this.element[0],[t])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return n.parents("body").length||n.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s&&n[0]===this.element[0]&&this._setPositionRelative(),n[0]===this.element[0]||/(fixed|absolute)/.test(n.css("position"))||n.css("position","absolute"),n},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_isRootNode:function(e){return/(html|body)/i.test(e.tagName)||e===this.document[0]},_getParentOffset:function(){var t=this.offsetParent.offset(),i=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==i&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var e=this.element.position(),t=this._isRootNode(this.scrollParent[0]);return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+(t?0:this.scrollParent.scrollTop()),left:e.left-(parseInt(this.helper.css("left"),10)||0)+(t?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,n=this.options,a=this.document[0];return this.relativeContainer=null,n.containment?"window"===n.containment?(this.containment=[e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,e(window).scrollLeft()+e(window).width()-this.helperProportions.width-this.margins.left,e(window).scrollTop()+(e(window).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):"document"===n.containment?(this.containment=[0,0,e(a).width()-this.helperProportions.width-this.margins.left,(e(a).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):n.containment.constructor===Array?(this.containment=n.containment,void 0):("parent"===n.containment&&(n.containment=this.helper[0].parentNode),i=e(n.containment),s=i[0],s&&(t=/(scroll|auto)/.test(i.css("overflow")),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(t?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=i),void 0):(this.containment=null,void 0)},_convertPositionTo:function(e,t){t||(t=this.position);var i="absolute"===e?1:-1,s=this._isRootNode(this.scrollParent[0]);return{top:t.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.offset.scroll.top:s?0:this.offset.scroll.top)*i,left:t.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.offset.scroll.left:s?0:this.offset.scroll.left)*i}},_generatePosition:function(e,t){var i,s,n,a,o=this.options,r=this._isRootNode(this.scrollParent[0]),h=e.pageX,l=e.pageY;return r&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),t&&(this.containment&&(this.relativeContainer?(s=this.relativeContainer.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,e.pageX-this.offset.click.left<i[0]&&(h=i[0]+this.offset.click.left),e.pageY-this.offset.click.top<i[1]&&(l=i[1]+this.offset.click.top),e.pageX-this.offset.click.left>i[2]&&(h=i[2]+this.offset.click.left),e.pageY-this.offset.click.top>i[3]&&(l=i[3]+this.offset.click.top)),o.grid&&(n=o.grid[1]?this.originalPageY+Math.round((l-this.originalPageY)/o.grid[1])*o.grid[1]:this.originalPageY,l=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-o.grid[1]:n+o.grid[1]:n,a=o.grid[0]?this.originalPageX+Math.round((h-this.originalPageX)/o.grid[0])*o.grid[0]:this.originalPageX,h=i?a-this.offset.click.left>=i[0]||a-this.offset.click.left>i[2]?a:a-this.offset.click.left>=i[0]?a-o.grid[0]:a+o.grid[0]:a),"y"===o.axis&&(h=this.originalPageX),"x"===o.axis&&(l=this.originalPageY)),{top:l-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:r?0:this.offset.scroll.top),left:h-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:r?0:this.offset.scroll.left)}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_normalizeRightBottom:function(){"y"!==this.options.axis&&"auto"!==this.helper.css("right")&&(this.helper.width(this.helper.width()),this.helper.css("right","auto")),"x"!==this.options.axis&&"auto"!==this.helper.css("bottom")&&(this.helper.height(this.helper.height()),this.helper.css("bottom","auto"))},_trigger:function(t,i,s){return s=s||this._uiHash(),e.ui.plugin.call(this,t,[i,s,this],!0),/^(drag|start|stop)/.test(t)&&(this.positionAbs=this._convertPositionTo("absolute"),s.offset=this.positionAbs),e.Widget.prototype._trigger.call(this,t,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,i,s){var n=e.extend({},i,{item:s.element});s.sortables=[],e(s.options.connectToSortable).each(function(){var i=e(this).sortable("instance");i&&!i.options.disabled&&(s.sortables.push(i),i.refreshPositions(),i._trigger("activate",t,n))})},stop:function(t,i,s){var n=e.extend({},i,{item:s.element});s.cancelHelperRemoval=!1,e.each(s.sortables,function(){var e=this;e.isOver?(e.isOver=0,s.cancelHelperRemoval=!0,e.cancelHelperRemoval=!1,e._storedCSS={position:e.placeholder.css("position"),top:e.placeholder.css("top"),left:e.placeholder.css("left")},e._mouseStop(t),e.options.helper=e.options._helper):(e.cancelHelperRemoval=!0,e._trigger("deactivate",t,n))})},drag:function(t,i,s){e.each(s.sortables,function(){var n=!1,a=this;a.positionAbs=s.positionAbs,a.helperProportions=s.helperProportions,a.offset.click=s.offset.click,a._intersectsWith(a.containerCache)&&(n=!0,e.each(s.sortables,function(){return this.positionAbs=s.positionAbs,this.helperProportions=s.helperProportions,this.offset.click=s.offset.click,this!==a&&this._intersectsWith(this.containerCache)&&e.contains(a.element[0],this.element[0])&&(n=!1),n})),n?(a.isOver||(a.isOver=1,s._parent=i.helper.parent(),a.currentItem=i.helper.appendTo(a.element).data("ui-sortable-item",!0),a.options._helper=a.options.helper,a.options.helper=function(){return i.helper[0]},t.target=a.currentItem[0],a._mouseCapture(t,!0),a._mouseStart(t,!0,!0),a.offset.click.top=s.offset.click.top,a.offset.click.left=s.offset.click.left,a.offset.parent.left-=s.offset.parent.left-a.offset.parent.left,a.offset.parent.top-=s.offset.parent.top-a.offset.parent.top,s._trigger("toSortable",t),s.dropped=a.element,e.each(s.sortables,function(){this.refreshPositions()}),s.currentItem=s.element,a.fromOutside=s),a.currentItem&&(a._mouseDrag(t),i.position=a.position)):a.isOver&&(a.isOver=0,a.cancelHelperRemoval=!0,a.options._revert=a.options.revert,a.options.revert=!1,a._trigger("out",t,a._uiHash(a)),a._mouseStop(t,!0),a.options.revert=a.options._revert,a.options.helper=a.options._helper,a.placeholder&&a.placeholder.remove(),i.helper.appendTo(s._parent),s._refreshOffsets(t),i.position=s._generatePosition(t,!0),s._trigger("fromSortable",t),s.dropped=!1,e.each(s.sortables,function(){this.refreshPositions()}))})}}),e.ui.plugin.add("draggable","cursor",{start:function(t,i,s){var n=e("body"),a=s.options;n.css("cursor")&&(a._cursor=n.css("cursor")),n.css("cursor",a.cursor)},stop:function(t,i,s){var n=s.options;n._cursor&&e("body").css("cursor",n._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,i,s){var n=e(i.helper),a=s.options;n.css("opacity")&&(a._opacity=n.css("opacity")),n.css("opacity",a.opacity)},stop:function(t,i,s){var n=s.options;n._opacity&&e(i.helper).css("opacity",n._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(e,t,i){i.scrollParentNotHidden||(i.scrollParentNotHidden=i.helper.scrollParent(!1)),i.scrollParentNotHidden[0]!==i.document[0]&&"HTML"!==i.scrollParentNotHidden[0].tagName&&(i.overflowOffset=i.scrollParentNotHidden.offset())},drag:function(t,i,s){var n=s.options,a=!1,o=s.scrollParentNotHidden[0],r=s.document[0];o!==r&&"HTML"!==o.tagName?(n.axis&&"x"===n.axis||(s.overflowOffset.top+o.offsetHeight-t.pageY<n.scrollSensitivity?o.scrollTop=a=o.scrollTop+n.scrollSpeed:t.pageY-s.overflowOffset.top<n.scrollSensitivity&&(o.scrollTop=a=o.scrollTop-n.scrollSpeed)),n.axis&&"y"===n.axis||(s.overflowOffset.left+o.offsetWidth-t.pageX<n.scrollSensitivity?o.scrollLeft=a=o.scrollLeft+n.scrollSpeed:t.pageX-s.overflowOffset.left<n.scrollSensitivity&&(o.scrollLeft=a=o.scrollLeft-n.scrollSpeed))):(n.axis&&"x"===n.axis||(t.pageY-e(r).scrollTop()<n.scrollSensitivity?a=e(r).scrollTop(e(r).scrollTop()-n.scrollSpeed):e(window).height()-(t.pageY-e(r).scrollTop())<n.scrollSensitivity&&(a=e(r).scrollTop(e(r).scrollTop()+n.scrollSpeed))),n.axis&&"y"===n.axis||(t.pageX-e(r).scrollLeft()<n.scrollSensitivity?a=e(r).scrollLeft(e(r).scrollLeft()-n.scrollSpeed):e(window).width()-(t.pageX-e(r).scrollLeft())<n.scrollSensitivity&&(a=e(r).scrollLeft(e(r).scrollLeft()+n.scrollSpeed)))),a!==!1&&e.ui.ddmanager&&!n.dropBehaviour&&e.ui.ddmanager.prepareOffsets(s,t)}}),e.ui.plugin.add("draggable","snap",{start:function(t,i,s){var n=s.options;s.snapElements=[],e(n.snap.constructor!==String?n.snap.items||":data(ui-draggable)":n.snap).each(function(){var t=e(this),i=t.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:t.outerWidth(),height:t.outerHeight(),top:i.top,left:i.left})})},drag:function(t,i,s){var n,a,o,r,h,l,u,c,d,p,f=s.options,m=f.snapTolerance,g=i.offset.left,v=g+s.helperProportions.width,_=i.offset.top,b=_+s.helperProportions.height;for(d=s.snapElements.length-1;d>=0;d--)h=s.snapElements[d].left-s.margins.left,l=h+s.snapElements[d].width,u=s.snapElements[d].top-s.margins.top,c=u+s.snapElements[d].height,h-m>v||g>l+m||u-m>b||_>c+m||!e.contains(s.snapElements[d].item.ownerDocument,s.snapElements[d].item)?(s.snapElements[d].snapping&&s.options.snap.release&&s.options.snap.release.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[d].item})),s.snapElements[d].snapping=!1):("inner"!==f.snapMode&&(n=m>=Math.abs(u-b),a=m>=Math.abs(c-_),o=m>=Math.abs(h-v),r=m>=Math.abs(l-g),n&&(i.position.top=s._convertPositionTo("relative",{top:u-s.helperProportions.height,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:c,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h-s.helperProportions.width}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l}).left)),p=n||a||o||r,"outer"!==f.snapMode&&(n=m>=Math.abs(u-_),a=m>=Math.abs(c-b),o=m>=Math.abs(h-g),r=m>=Math.abs(l-v),n&&(i.position.top=s._convertPositionTo("relative",{top:u,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:c-s.helperProportions.height,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l-s.helperProportions.width}).left)),!s.snapElements[d].snapping&&(n||a||o||r||p)&&s.options.snap.snap&&s.options.snap.snap.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[d].item})),s.snapElements[d].snapping=n||a||o||r||p)}}),e.ui.plugin.add("draggable","stack",{start:function(t,i,s){var n,a=s.options,o=e.makeArray(e(a.stack)).sort(function(t,i){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(i).css("zIndex"),10)||0)});o.length&&(n=parseInt(e(o[0]).css("zIndex"),10)||0,e(o).each(function(t){e(this).css("zIndex",n+t)}),this.css("zIndex",n+o.length))}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,i,s){var n=e(i.helper),a=s.options;n.css("zIndex")&&(a._zIndex=n.css("zIndex")),n.css("zIndex",a.zIndex)},stop:function(t,i,s){var n=s.options;n._zIndex&&e(i.helper).css("zIndex",n._zIndex)}}),e.ui.draggable});

/*jquery ui drag mobile */

!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);



clupload_lang_en = {

	upload_info : 'Uploaded Images (Drag Or Click Here)',

	image_proccesing : 'Image Proccesing...',

	image_proccesing_loop : 'Image Processing [%RANKED% / %TOTAL%]',

	upload_proccesing_loop : 'Uploading Images [%RANKED% / %TOTAL%] [%PERCENT%%]',

	upload_error : '404 Error\nCancelled',

	serializing : 'Serializing Please Wait...',

	dragging_info : 'You can change the position of the image by dragging',

	max_file_limit : 'Max Image Limit: %OPTMAXFILE%',

	only_support_types : 'Only support: %TYPES% files'

};



clupload_lang_tr = {

	upload_info : 'Fotoğraf Yüklemek İçin Buraya Tıklayın veya Fotoğraf Buraya Bırakın',

	image_proccesing : 'Görüntü İşleniyor...',

	image_proccesing_loop : 'Görüntü İşleniyor... [%RANKED% / %TOTAL%]',

	upload_proccesing_loop : 'Resimler Yükleniyor [%RANKED% / %TOTAL%] [%PERCENT%%]',

	upload_error : '404 Hatası\nİşlem İptal Edildi',

	serializing : 'Veriler İşleniyor Lütfen Bekleyiniz...',

	dragging_info : 'Yüklenmiş Resimlerinizi Hareket Ettirerek Nereden Kırpılacağını Belirleyebilirsiniz',

	max_file_limit : 'En Fazla %OPTMAXFILE% Resim Yükleyebilirsiniz',

	only_support_types : 'Sadece %TYPES% uzantılı dosyaları yükleyebilirsiniz'

};





$.fn.clupload = function(func) {

	var content = this;

	content.options = $.extend({

		success: function() {},

		error: function() {},

		language: 'tr',

		file : {

			max : 9999,

			maxSize : 9999999999, // kb

		},

		background: '#fff',

		form: content.parents('form:first')

	}, arguments[0] || {});



    this.initialize = function() {

    	content.text = window['clupload_lang_'+content.options.language];

		$(this).addClass('clupload').append('<input type="file" name="file[]" id="clfile" class="hidden" class="clfile" multiple/><a href="javascript:;" id="cl-info">'+content.text.upload_info+'<span class="cl-stats"></span></a><div class="cl-info-inside hidden"></div><canvas style="display:none; background:#fff" id="dcanvas"></canvas><figure style="display:none" id="gl_0"><div class="cl-top-wrapper"><div class="cl-top" style="width:'+Math.round(content.options.width/content.options.thumbRatio)+'px; height: '+Math.round(content.options.height/content.options.thumbRatio)+'px;"><img src=""></div></div><div class="cl-bottom"><div class="cl-file-name"></div><div class="cl-file-size"></div><div class="cl-remove"></div><div class="cl-fit"></div></div></figure>');

    	content.options.target = content.find('#clfile');

    	content.options.clinfo = content.find('#cl-info');

		content.canvas = document.getElementById('dcanvas');



		$(content.options.clinfo).click(function(event) {

			event.preventDefault();

			event.stopPropagation();

			$(content.options.target).click();

		});



		/* DRAG AND DROP HTML5 */

		content[0].ondragover = function () { 

			$(this).addClass('hover');

			return false; 

		}



		content[0].ondragleave = function () {

			$(this).removeClass('hover'); 

			return false; 

		}



		content[0].ondrop = function (event) {

			$(this).removeClass('hover'); 

			event.preventDefault();

			if (event.dataTransfer.files.length > 0) {

				addPhotoLoop(event.dataTransfer.files);

			}			

		}



		/* DRAG AND DROP HTML5 */



		$(content.options.target).change(function(event) {

			if ($(this).get(0).files.length > 0) {

				addPhotoLoop($(this).get(0).files);

			}

		});



		$(content.options.form).submit(function(event) {

			event.preventDefault();

			event.stopPropagation();

			var imgLength = content.find('figure').length-1;

			$(content.options.target).val('');

			if (imgLength < 1) {

				content.options.success.call(this,$(content.options.form)); info();

			} else {

				window.clTry = 0;

				clSendAjax(1);

			}

		});



		content.on('click', '.cl-remove', function() {

			$(this).parent().parent().remove();

			dragUpdate();

		});



		content.on('click', '.cl-fit', function() {

			info(content.text.image_proccesing);

			var cf = $(this).parent().parent();

			setTimeout(function(){content.fit(cf);}, 50);

		});



		content.on('dblclick', 'figure .cl-top', function() {

			info(content.text.image_proccesing);

			var cf = $(this);

			setTimeout(function(){content.fit(cf);}, 50);

		});



		$(window).resize(function(event) {

			dragUpdate();

		});



		return this;

	};





	this.fit = function(obj) {

		var img = obj.find('img');

		var original = img.data('original');

		var fit = img.data('fit');



		if (original) {

			img.attr('src',original.src);

			$.each(original.css, function(index, val) {

				img.css(index,val);

			});

			img.data('original',''); info(); dragUpdate();

			return false;

		}



		var FakeImg = new Image(); // for get naturalWidth

		FakeImg.src = img.attr('src');



		var twidth = FakeImg.naturalWidth;

		var theight = FakeImg.naturalHeight;



		var tratio = twidth/theight;

		var ratio = content.options.width/content.options.height;



		if (tratio >= ratio) { // fit width

			var oran = content.options.width/twidth;

			var diff = content.options.height-theight*oran;

			draw({

				data : FakeImg.src,

				quality : 100,

				x1 : 0,

				y1 : 0,

				x2 : twidth,

				y2 : theight,

				cx : 0,

				cy : diff/2,

				width : content.options.width,

				height : theight*oran,

				canvasWidth : content.options.width,

				canvasHeight : content.options.height,

			},

			function(data) {

				info();

				img.data('original',{'src':FakeImg.src,'css':{'width':img.css('width'),'height':'100%','left':img.css('left'),'top':img.css('top'),'cursor':img.css('cursor')}});

				img.attr('src',data).css({

					left: '0px',

					top: '0px',

					width: '100%',

					height: '100%',

					cursor: 'default',

				});

				dragUpdate();

			});	

		} else { // fit height

			var oran = content.options.height/theight;

			var diff = content.options.width-twidth*oran;

			draw({

				data : FakeImg.src,

				quality : 100,

				x1 : 0,

				y1 : 0,

				x2 : twidth,

				y2 : theight,

				cx : diff/2,

				cy : 0,

				width : twidth*oran,

				height : content.options.height,

				canvasWidth : content.options.width,

				canvasHeight : content.options.height,

			},

			function(data) {

				info();

				img.data('original',{'src':FakeImg.src,'css':{'height':img.css('height'),'width':'100%','left':img.css('left'),'top':img.css('top'),'cursor':img.css('cursor')}});

				img.attr('src',data).css({

					left: '0px',

					top: '0px',

					width: '100%',

					height: '100%',					

					cursor: 'default',

				});

				dragUpdate();

			});	

		}





	};



	function draw (arg,callback) {

		img = new Image();

		img.setAttribute('crossOrigin', 'Anonymous');

		img.src = arg.data;



		img.onload = function () {

			var canvas = document.getElementById('dcanvas');



			var context = canvas.getContext('2d');

			context.clearRect(0, 0, canvas.width, canvas.height);



			canvas.width = arg.canvasWidth;

			canvas.height = arg.canvasHeight;



			context.fillStyle = content.options.background;

			context.fillRect(0,0,canvas.width,canvas.height);

			context.drawImage(img,arg.x1,arg.y1,arg.x2,arg.y2,arg.cx,arg.cy,arg.width,arg.height);	



			var data = canvas.toDataURL('image/jpeg',content.options.quality/100);	

			callback(data);

		}			

	}



	content.serialize = function(callback) {

		content.serializeArray = [];

		info(content.text.serializing);

		serialize(1,callback);

	};



	content.stop = function(callback) {

		content.stopped = true;

	};



	content.reset = function() {

		info();

		content.html('');

		content.initialize();

	};



	return content.initialize();





	function addPhotoLoop (arr) {

		var err = false;

		var fid = 0;



		$.each(arr, function(index, val) {



			var only_support_types = content.text.only_support_types.replace("%TYPES%",'jpeg,png,gif,bmp');



			if (val.type == 'image/jpeg' || val.type == 'image/png' || val.type == 'image/bmp' || val.type == 'image/gif') {

				totalSize = content.totalSize+val.size;			

			} else {

				err = only_support_types;

			}

		});



		if (err) {

			content.options.error.call(this,err);

			return false

		}



		var total = arr.length;

		var figLength = content.find('figure').length-1;

		if (figLength+total > content.options.file.max) {

			var max_file_limit = content.text.max_file_limit.replace("%OPTMAXFILE%",content.options.file.max);

			content.options.error.call(this,max_file_limit);

			return;

		}



		$(content.options.clinfo).text(content.text.dragging_info);

		addPhoto(0,function(data) {

			info();

			dragUpdate();

		},arr);

	}



	function getOrientation(file, callback) {

		var reader = new FileReader();

		reader.onload = function(e) {

		var view = new DataView(e.target.result);

		if (view.getUint16(0, false) != 0xFFD8) return callback(-2);

		var length = view.byteLength, offset = 2;

		while (offset < length) {

		var marker = view.getUint16(offset, false);

		offset += 2;

		if (marker == 0xFFE1) {

		if (view.getUint32(offset += 2, false) != 0x45786966) callback(-1);

		var little = view.getUint16(offset += 6, false) == 0x4949;

		offset += view.getUint32(offset + 4, little);

		var tags = view.getUint16(offset, little);

		offset += 2;

		for (var i = 0; i < tags; i++)

		if (view.getUint16(offset + (i * 12), little) == 0x0112)

		return callback(view.getUint16(offset + (i * 12) + 8, little));

		}

		else if ((marker & 0xFF00) != 0xFF00) break;

		else offset += view.getUint16(offset, false);

		}

		return callback(-1);

		};

		reader.readAsArrayBuffer(file.slice(0, 64 * 1024));

	}



	function addPhoto2(fid,callback,arr,orientation) {

			var total = arr.length;

			var image_proccesing_loop = content.text.image_proccesing_loop.replace("%RANKED%",Number(fid+1));

			var image_proccesing_loop = image_proccesing_loop.replace("%TOTAL%",total);

			info(image_proccesing_loop);

			var file = arr[fid];



			getOrientation(file, function(orientation) {

				var reader = new FileReader();

				image_filename = file.name;

				image_filesize = file.size;

				reader.onload = function (e) {

					original_data = reader.result;

					current_image = new Image();

					current_image.src = reader.result;

					current_image.onload = function () {

						var canvas = content.canvas;

						var context = canvas.getContext('2d');						



						var twidth = current_image.naturalWidth;

						var theight = current_image.naturalHeight;



						canvas.width = theight;

						canvas.height = twidth;



						switch(orientation){  

							case 5:

								// vertical flip + 90 rotate right

								context.rotate(90*Math.PI/180);

								context.scale(1, -1);

							break;

							case 6:

								// 90° rotate right

								context.rotate(90*Math.PI/180);

								context.translate(0, -theight);

							break;

							case 7:

								// horizontal flip + 90 rotate right

								context.rotate(0.5 * Math.PI);

								context.translate(twidth, -theight);

								context.scale(-1, 1);

							break;

							case 8:

								// 90° rotate left

								context.rotate(-0.5 * Math.PI);

								context.translate(-twidth, 0);

							break;

						}



						context.drawImage(current_image,0,0,twidth,theight);

						var data = canvas.toDataURL('image/jpeg',content.options.quality/100);	

						current_image = new Image();

						current_image.src = data;								

						current_image.onload = function () {

						var canvas = content.canvas;

						var context = canvas.getContext('2d');

						context.clearRect(0, 0, canvas.width, canvas.height);



						var twidth = current_image.naturalWidth;

						var theight = current_image.naturalHeight;



						var twidthOrj = twidth;

						var theightOrj = theight;



						canvas.width = content.options.width;

						canvas.height = content.options.height;



						context.fillStyle = content.options.background;

						context.fillRect(0,0,newWidth,newHeight);	

						

						var ratio = content.options.width/content.options.height;

						var tratio = twidth/theight;



						var exDiff = content.options.thumbRatio*2;	



						if (tratio >= ratio) { // crop width

							var type = 'wide';

							var oran = content.options.height/theight;

							var newWidth = twidth*oran;

							var newHeight = theight*oran;



							var startX = 0;

							var endX = twidth;

							var startY = 0;

							var endY = theight;



							var sImgWidth = 'auto';

							var sImgHeight = '100%';

							var sImgLeft = -1*(newWidth-content.options.width)/exDiff+'px';

							var sImgTop = '0px';

							if (newWidth-content.options.width) {var sImgCursor = 'e-resize';}

							var axis = 'x';

						} else { // crop height

							var type = 'tall';

							var oran = content.options.width/twidth;

							var newWidth = twidth*oran;

							var newHeight = theight*oran;



							var startX = 0;

							var endX = twidth;

							var startY = 0;

							var endY = theight;		 



							var sImgWidth = '100%';

							var sImgHeight = 'auto';

							var sImgLeft = '0px';

							var sImgTop = -1*(newHeight-content.options.height)/exDiff+'px';

							if (newHeight-content.options.height) {var sImgCursor = 's-resize';}

							var axis = 'y';

						}



						canvas.width = newWidth;

						canvas.height = newHeight;



						context.fillStyle = content.options.background;

						context.fillRect(0,0,newWidth,newHeight);	



						context.drawImage(current_image,startX,startY,endX,endY,0,0,newWidth,newHeight);



						var dataUrl = canvas.toDataURL('image/jpeg', content.options.quality/100);



						finimg = new Image();

						finimg.src = dataUrl;		    			

						finimg.onload = function () {

							var tImg = content.find('#gl_0').clone().appendTo(content).removeClass('hidden').show().addClass('cl-added').find('img');



							var ox = tImg.parent().offset().left;

			    			var oy = tImg.parent().offset().top;



							tImg.attr('src',dataUrl).css({

								width: sImgWidth,

								height: sImgHeight,

								left: sImgLeft,

								top: sImgTop,

								cursor: sImgCursor,



							});



							tImg.parent().attr('data-axis',axis);

							tImg.parent().attr('data-name',image_filename);

							tImg.parent().parent().parent().find('.cl-file-name').text(image_filename);

							tImg.parent().parent().parent().find('.cl-file-size').text(filesize(image_filesize));



							if (fid < arr.length-1) {

								addPhoto(fid+1,callback,arr);

								dragUpdate();

							} else {

								info();

								callback('OK');

								dragUpdate();

							}



						}



						}

					}

				}

				reader.readAsDataURL(file);

			});

	}



	function addPhoto(fid,callback,arr) {

			var total = arr.length;

			var image_proccesing_loop = content.text.image_proccesing_loop.replace("%RANKED%",Number(fid+1));

			var image_proccesing_loop = image_proccesing_loop.replace("%TOTAL%",total);

			info(image_proccesing_loop);

			var file = arr[fid];



			getOrientation(file, function(orientation) {

				if (orientation > 4) {addPhoto2(fid,callback,arr,orientation);return;}

				var reader = new FileReader();

				image_filename = file.name;

				image_filesize = file.size;

				reader.onload = function (e) {

					original_data = reader.result;

					current_image = new Image();

					current_image.src = reader.result;

					current_image.onload = function () {

						var canvas = content.canvas;

						var context = canvas.getContext('2d');

						context.clearRect(0, 0, canvas.width, canvas.height);



						var twidth = current_image.naturalWidth;

						var theight = current_image.naturalHeight;



						var twidthOrj = twidth;

						var theightOrj = theight;



						canvas.width = content.options.width;

						canvas.height = content.options.height;



						context.fillStyle = content.options.background;

						context.fillRect(0,0,newWidth,newHeight);	



						var ratio = content.options.width/content.options.height;

						var tratio = twidth/theight;



						var exDiff = content.options.thumbRatio*2;	



						if (tratio >= ratio) { // crop width

							var type = 'wide';

							var oran = content.options.height/theight;

							var newWidth = twidth*oran;

							var newHeight = theight*oran;



							var startX = 0;

							var endX = twidth;

							var startY = 0;

							var endY = theight;



							var sImgWidth = 'auto';

							var sImgHeight = '100%';

							var sImgLeft = -1*(newWidth-content.options.width)/exDiff+'px';

							var sImgTop = '0px';

							if (newWidth-content.options.width) {var sImgCursor = 'e-resize';}

							var axis = 'x';

						} else { // crop height

							var type = 'tall';

							var oran = content.options.width/twidth;

							var newWidth = twidth*oran;

							var newHeight = theight*oran;



							var startX = 0;

							var endX = twidth;

							var startY = 0;

							var endY = theight;		 



							var sImgWidth = '100%';

							var sImgHeight = 'auto';

							var sImgLeft = '0px';

							var sImgTop = -1*(newHeight-content.options.height)/exDiff+'px';

							if (newHeight-content.options.height) {var sImgCursor = 's-resize';}

							var axis = 'y';

						}



						canvas.width = newWidth;

						canvas.height = newHeight;



						context.fillStyle = content.options.background;

						context.fillRect(0,0,newWidth,newHeight);	



						switch(orientation){

						case 2:

							// horizontal flip

							context.translate(canvas.width, 0);

							context.scale(-1, 1);

						break;

						case 3:

							// 180° rotate left

							context.translate(canvas.width, canvas.height);

							context.rotate(Math.PI);

						break;

						case 4:

							// vertical flip

							context.translate(0, canvas.height);

							context.scale(1, -1);

						break;

						}



						context.drawImage(current_image,startX,startY,endX,endY,0,0,newWidth,newHeight);



						var dataUrl = canvas.toDataURL('image/jpeg', content.options.quality/100);



						finimg = new Image();

						finimg.src = dataUrl;		    			

						finimg.onload = function () {

							var tImg = content.find('#gl_0').clone().appendTo(content).removeClass('hidden').show().addClass('cl-added').find('img');



							var ox = tImg.parent().offset().left;

			    			var oy = tImg.parent().offset().top;



							tImg.attr('src',dataUrl).css({

								width: sImgWidth,

								height: sImgHeight,

								left: sImgLeft,

								top: sImgTop,

								cursor: sImgCursor,



							});



							tImg.parent().attr('data-axis',axis);

							tImg.parent().attr('data-name',image_filename);

							tImg.parent().parent().parent().find('.cl-file-name').text(image_filename);

							tImg.parent().parent().parent().find('.cl-file-size').text(filesize(image_filesize));



							if (fid < arr.length-1) {

								addPhoto(fid+1,callback,arr);

								dragUpdate();

							} else {

								info();

								callback('OK');

								dragUpdate();

							}



						}



					}

				}

				reader.readAsDataURL(file);

			});

	}



	function dragUpdate() {



		content.find('.cl-added').each(function(){



			var axis = $(this).find('.cl-top').attr('data-axis');



			var iwd = $(this).find('img').width();

			var ihg = $(this).find('img').height();



			var cwd = $(this).find('.cl-top').width();

			var chg = $(this).find('.cl-top').height();



			var ox = $(this).find('.cl-top').offset().left;

    		var oy = $(this).find('.cl-top').offset().top;



    		var diffX = Math.abs(iwd-cwd);

    		var diffY = Math.abs(ihg-chg);



    		if (!(cwd == iwd) || !(chg == ihg)) {

				$(this).find('img').draggable({

					axis : axis,

					containment: [ox-diffX,oy-diffY,ox,oy],

				});

				$(this).data('dragged',true);

				$(this).find('img').draggable('enable');

    		} else {

				if ($(this).data('dragged')) {

					$(this).find('img').css('cursor', 'default');

					$(this).find('img').draggable('disable');

				} else {

					$(this).find('img').css('cursor', 'default');

					$(this).find('.cl-fit').remove();

				}

    		}



		});

	}



	function info (arg) {

		var clins = content.find('.cl-info-inside');

		if (arg) {

			$('html, body').scrollTop(clins.offset().top-20);

			clins.removeClass('hidden');

			clins.text(arg);

		} else {

			clins.text('').addClass('hidden');

		}

	}



	function clStat (arg) {

		content.find('.cl-stats').text(arg);

	}



	function serialize (id,callback) {

		var figLength = content.find('figure').length-1;

		var thisFig = content.find('figure:eq('+id+')');

		var thisImg = thisFig.find('img');



		var name = thisFig.find('.cl-top').attr('data-name');



		if (figLength < 1) { // No Image

			callback(false); info();

			return false;

		}



		uImg = new Image();

		uImg.src = thisImg.attr('src');



		var uRadius = uImg.naturalWidth / thisImg.width();



		var uImgLeft = thisImg.css('left').split("px")[0]; 

		var uImgLeft = Math.abs(uImgLeft*uRadius); 



		var uImgTop = thisImg.css('top').split("px")[0]; 

		var uImgTop = Math.abs(uImgTop*uRadius); 



		uImg.onload = function () {

			var uCanvas = document.getElementById('dcanvas');

			var uContext = uCanvas.getContext('2d');

			uContext.clearRect(0, 0, uCanvas.width, uCanvas.height);

			uCanvas.width = content.options.width;

			uCanvas.height = content.options.height;



			uContext.drawImage(uImg,uImgLeft,uImgTop,content.options.width,content.options.height,0,0,content.options.width,content.options.height);

			var SdataUrl = uCanvas.toDataURL('image/jpeg', content.options.quality/100);	

			thisFig.find('.cl-top').attr('data-newsize',getSizeBase64(SdataUrl));



			content.serializeArray.push({data:SdataUrl,name:name});



			if (id+1 <= figLength) {

				serialize(id+1,callback);

			} else {

				info();

				callback(content.serializeArray);

				return false;

			}

		}

	}



	function clSendAjax (id) {  



		var figLength = content.find('figure').length-1;

		var thisFig = content.find('figure:eq('+id+')');

		var thisImg = thisFig.find('img');

		var name = thisFig.find('.cl-top').attr('data-name');		

		var src = thisImg.attr('src');

		uImg = new Image();

		uImg.src = src;

		var uRadius = uImg.naturalWidth / thisImg.width();



		var uImgLeft = thisImg.css('left').split("px")[0]; 

		var uImgLeft = Math.abs(uImgLeft*uRadius); 



		var uImgTop = thisImg.css('top').split("px")[0]; 

		var uImgTop = Math.abs(uImgTop*uRadius); 



		uImg.onload = function () {

			var uCanvas = document.getElementById('dcanvas');

			var uContext = uCanvas.getContext('2d');

			uContext.clearRect(0, 0, uCanvas.width, uCanvas.height);

			uCanvas.width = content.options.width;

			uCanvas.height = content.options.height;



			uContext.drawImage(uImg,uImgLeft,uImgTop,content.options.width,content.options.height,0,0,content.options.width,content.options.height);

			var UdataUrl = uCanvas.toDataURL('image/jpeg', content.options.quality/100);	



			$.ajax({

				xhr: function() {

					var xhr = new window.XMLHttpRequest();

					xhr.upload.addEventListener("progress", function(evt){

						if (evt.lengthComputable) {

							var percentComplete = evt.loaded / evt.total;

							var upload_proccesing_loop = content.text.upload_proccesing_loop.replace("%RANKED%",id);

							var upload_proccesing_loop = upload_proccesing_loop.replace("%TOTAL%",figLength);

							var upload_proccesing_loop = upload_proccesing_loop.replace("%PERCENT%",Math.round(percentComplete*100));

							info(upload_proccesing_loop);

						}

					}, false);

					return xhr;

				},

				url: content.options.imageUpload.url,

				type: 'POST',

				dataType: 'html',

				data: {src:UdataUrl,name:name,exdata: content.options.imageUpload.exData},

				success: function(data){ 

					console.log(data);

					if (id+1 <= figLength) {

						clSendAjax(id+1);

					} else {

						content.options.success.call(this,$(content.options.form)); info();

					}

				},

				error: function(){ 

					if (window.clTry > 5) {

						content.find('.cl-added').remove(); info();

						content.options.error.call(this,content.text.upload_error);

					} else {

						clSendAjax(id);

						window.clTry = window.clTry+1;				

					}

				}

			});			

		}

	}



	function getSizeBase64(arg) {

		var head = 'data:image/jpeg;base64,';

		return Math.round((arg.length - head.length)*3/4);

	}



	function filesize(arg) {

		var b = /^(b|B)$/;

		var symbol = {

			bits: ["b", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"],

			bytes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

		};

		var descriptor = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

		var result = [],

		val = 0,

		e = undefined,

		base = undefined,

		bits = undefined,

		ceil = undefined,

		neg = undefined,

		num = undefined,

		output = undefined,

		round = undefined,

		unix = undefined,

		spacer = undefined,

		symbols = undefined;



		if (isNaN(arg)) {

			throw new Error("Invalid arguments");

		}



		bits = descriptor.bits === true;

		unix = descriptor.unix === true;

		base = descriptor.base || 2;

		round = descriptor.round !== undefined ? descriptor.round : unix ? 1 : 2;

		spacer = descriptor.spacer !== undefined ? descriptor.spacer : unix ? "" : " ";

		symbols = descriptor.symbols || descriptor.suffixes || {};

		output = descriptor.output || "string";

		e = descriptor.exponent !== undefined ? descriptor.exponent : -1;

		num = Number(arg);

		neg = num < 0;

		ceil = base > 2 ? 1000 : 1024;



		// Flipping a negative number to determine the size

		if (neg) {

			num = -num;

		}



		// Zero is now a special case because bytes divide by 1

		if (num === 0) {

			result[0] = 0;

			result[1] = unix ? "" : !bits ? "B" : "b";

		} else {

			// Determining the exponent

			if (e === -1 || isNaN(e)) {

				e = Math.floor(Math.log(num) / Math.log(ceil));



				if (e < 0) {

					e = 0;

				}

			}



			// Exceeding supported length, time to reduce & multiply

			if (e > 8) {

				e = 8;

			}



			val = base === 2 ? num / Math.pow(2, e * 10) : num / Math.pow(1000, e);



			if (bits) {

				val = val * 8;



				if (val > ceil && e < 8) {

					val = val / ceil;

					e++;

				}

			}



			result[0] = Number(val.toFixed(e > 0 ? round : 0));

			result[1] = base === 10 && e === 1 ? bits ? "kb" : "kB" : symbol[bits ? "bits" : "bytes"][e];



			if (unix) {

				result[1] = result[1].charAt(0);



				if (b.test(result[1])) {

					result[0] = Math.floor(result[0]);

					result[1] = "";

				}

			}

		}



		// Decorating a 'diff'

		if (neg) {

			result[0] = -result[0];

		}



		// Applying custom suffix

		result[1] = symbols[result[1]] || result[1];



		// Returning Array, Object, or String (default)

		if (output === "array") {

			return result;

		}



		if (output === "exponent") {

			return e;

		}



		if (output === "object") {

			return { value: result[0], suffix: result[1], symbol: result[1] };

		}
		return result.join(spacer);

	}

};

