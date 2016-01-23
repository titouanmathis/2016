(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!Please JS v0.4.2, Jordan Checkman 2014, Checkman.io, MIT License, Have fun.*/
!function(e,r,a){"function"==typeof define&&define.amd?define([],a):"object"==typeof exports?module.exports=a():r[e]=a()}("Please",this,function(){"use strict";function e(){function e(e,r,a){var o=Math.random;return a instanceof l&&(o=a.random),Math.floor(o()*(r-e+1))+e}function r(e,r,a){var o=Math.random;return a instanceof l&&(o=a.random),o()*(r-e)+e}function a(e,r,a){return Math.max(r,Math.min(e,a))}function o(e,r){var a;switch(e){case"hex":for(a=0;a<r.length;a++)r[a]=F.HSV_to_HEX(r[a]);break;case"rgb":for(a=0;a<r.length;a++)r[a]=F.HSV_to_RGB(r[a]);break;case"rgb-string":for(a=0;a<r.length;a++){var o=F.HSV_to_RGB(r[a]);r[a]="rgb("+o.r+","+o.g+","+o.b+")"}break;case"hsv":break;default:console.error("Format not recognized.")}return r}function n(e){var r=F.HSV_to_RGB(e),a=(299*r.r+587*r.g+114*r.b)/1e3;return a>=128?"dark":"light"}function t(e){var r={};for(var a in e)e.hasOwnProperty(a)&&(r[a]=e[a]);return r}function l(e){function r(){o=(o+1)%256,n=(n+a[o])%256;var e=a[o];return a[o]=a[n],a[n]=e,a[(a[o]+a[n])%256]}for(var a=[],o=0,n=0,t=0;256>t;t++)a[t]=t;for(var l=0,F=0;256>l;l++){F=(F+a[l]+e.charCodeAt(l%e.length))%256;var s=a[l];a[l]=a[F],a[F]=s}this.random=function(){for(var e=0,a=0,o=1;8>e;e++)a+=r()*o,o*=256;return a/0x10000000000000000}}var F={},s={aliceblue:"F0F8FF",antiquewhite:"FAEBD7",aqua:"00FFFF",aquamarine:"7FFFD4",azure:"F0FFFF",beige:"F5F5DC",bisque:"FFE4C4",black:"000000",blanchedalmond:"FFEBCD",blue:"0000FF",blueviolet:"8A2BE2",brown:"A52A2A",burlywood:"DEB887",cadetblue:"5F9EA0",chartreuse:"7FFF00",chocolate:"D2691E",coral:"FF7F50",cornflowerblue:"6495ED",cornsilk:"FFF8DC",crimson:"DC143C",cyan:"00FFFF",darkblue:"00008B",darkcyan:"008B8B",darkgoldenrod:"B8860B",darkgray:"A9A9A9",darkgrey:"A9A9A9",darkgreen:"006400",darkkhaki:"BDB76B",darkmagenta:"8B008B",darkolivegreen:"556B2F",darkorange:"FF8C00",darkorchid:"9932CC",darkred:"8B0000",darksalmon:"E9967A",darkseagreen:"8FBC8F",darkslateblue:"483D8B",darkslategray:"2F4F4F",darkslategrey:"2F4F4F",darkturquoise:"00CED1",darkviolet:"9400D3",deeppink:"FF1493",deepskyblue:"00BFFF",dimgray:"696969",dimgrey:"696969",dodgerblue:"1E90FF",firebrick:"B22222",floralwhite:"FFFAF0",forestgreen:"228B22",fuchsia:"FF00FF",gainsboro:"DCDCDC",ghostwhite:"F8F8FF",gold:"FFD700",goldenrod:"DAA520",gray:"808080",grey:"808080",green:"008000",greenyellow:"ADFF2F",honeydew:"F0FFF0",hotpink:"FF69B4",indianred:"CD5C5C",indigo:"4B0082",ivory:"FFFFF0",khaki:"F0E68C",lavender:"E6E6FA",lavenderblush:"FFF0F5",lawngreen:"7CFC00",lemonchiffon:"FFFACD",lightblue:"ADD8E6",lightcoral:"F08080",lightcyan:"E0FFFF",lightgoldenrodyellow:"FAFAD2",lightgray:"D3D3D3",lightgrey:"D3D3D3",lightgreen:"90EE90",lightpink:"FFB6C1",lightsalmon:"FFA07A",lightseagreen:"20B2AA",lightskyblue:"87CEFA",lightslategray:"778899",lightslategrey:"778899",lightsteelblue:"B0C4DE",lightyellow:"FFFFE0",lime:"00FF00",limegreen:"32CD32",linen:"FAF0E6",magenta:"FF00FF",maroon:"800000",mediumaquamarine:"66CDAA",mediumblue:"0000CD",mediumorchid:"BA55D3",mediumpurple:"9370D8",mediumseagreen:"3CB371",mediumslateblue:"7B68EE",mediumspringgreen:"00FA9A",mediumturquoise:"48D1CC",mediumvioletred:"C71585",midnightblue:"191970",mintcream:"F5FFFA",mistyrose:"FFE4E1",moccasin:"FFE4B5",navajowhite:"FFDEAD",navy:"000080",oldlace:"FDF5E6",olive:"808000",olivedrab:"6B8E23",orange:"FFA500",orangered:"FF4500",orchid:"DA70D6",palegoldenrod:"EEE8AA",palegreen:"98FB98",paleturquoise:"AFEEEE",palevioletred:"D87093",papayawhip:"FFEFD5",peachpuff:"FFDAB9",peru:"CD853F",pink:"FFC0CB",plum:"DDA0DD",powderblue:"B0E0E6",purple:"800080",rebeccapurple:"663399",red:"FF0000",rosybrown:"BC8F8F",royalblue:"4169E1",saddlebrown:"8B4513",salmon:"FA8072",sandybrown:"F4A460",seagreen:"2E8B57",seashell:"FFF5EE",sienna:"A0522D",silver:"C0C0C0",skyblue:"87CEEB",slateblue:"6A5ACD",slategray:"708090",slategrey:"708090",snow:"FFFAFA",springgreen:"00FF7F",steelblue:"4682B4",tan:"D2B48C",teal:"008080",thistle:"D8BFD8",tomato:"FF6347",turquoise:"40E0D0",violet:"EE82EE",wheat:"F5DEB3",white:"FFFFFF",whitesmoke:"F5F5F5",yellow:"FFFF00",yellowgreen:"9ACD32"},i=.618033988749895,u={hue:null,saturation:null,value:null,base_color:"",greyscale:!1,grayscale:!1,golden:!0,full_random:!1,colors_returned:1,format:"hex",seed:null},c={scheme_type:"analogous",format:"hex"},h={golden:!1,format:"hex"};return F.NAME_to_HEX=function(e){return e=e.toLowerCase(),e in s?s[e]:(console.error("Color name not recognized."),void 0)},F.NAME_to_RGB=function(e){return F.HEX_to_RGB(F.NAME_to_HEX(e))},F.NAME_to_HSV=function(e){return F.HEX_to_HSV(F.NAME_to_HEX(e))},F.HEX_to_RGB=function(e){var r=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;e=e.replace(r,function(e,r,a,o){return r+r+a+a+o+o});var a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return a?{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],16)}:null},F.RGB_to_HEX=function(e){return"#"+((1<<24)+(e.r<<16)+(e.g<<8)+e.b).toString(16).slice(1)},F.HSV_to_RGB=function(e){var r,a,o,n,t,l,F,s,i=e.h,u=e.s,c=e.v;if(0===u)return{r:c,g:c,b:c};switch(i/=60,n=Math.floor(i),t=i-n,l=c*(1-u),F=c*(1-u*t),s=c*(1-u*(1-t)),n){case 0:r=c,a=s,o=l;break;case 1:r=F,a=c,o=l;break;case 2:r=l,a=c,o=s;break;case 3:r=l,a=F,o=c;break;case 4:r=s,a=l,o=c;break;case 5:r=c,a=l,o=F}return{r:Math.floor(255*r),g:Math.floor(255*a),b:Math.floor(255*o)}},F.RGB_to_HSV=function(e){var r=e.r/255,a=e.g/255,o=e.b/255,n=0,t=0,l=0,F=Math.min(r,Math.min(a,o)),s=Math.max(r,Math.max(a,o));if(F===s)return l=F,{h:0,s:0,v:l};var i=r===F?a-o:o===F?r-a:o-r,u=r===F?3:o===F?1:5;return n=60*(u-i/(s-F)),t=(s-F)/s,l=s,{h:n,s:t,v:l}},F.HSV_to_HEX=function(e){return F.RGB_to_HEX(F.HSV_to_RGB(e))},F.HEX_to_HSV=function(e){return F.RGB_to_HSV(F.HEX_to_RGB(e))},F.make_scheme=function(e,r){function n(e){return{h:e.h,s:e.s,v:e.v}}var l,F,s,i,u,h=t(c);if(null!==r)for(var d in r)r.hasOwnProperty(d)&&(h[d]=r[d]);var g=[e];switch(h.scheme_type.toLowerCase()){case"monochromatic":case"mono":for(u=1;2>=u;u++)l=n(e),s=l.s+.1*u,s=a(s,0,1),i=l.v+.1*u,i=a(i,0,1),l.s=s,l.v=i,g.push(l);for(u=1;2>=u;u++)l=n(e),s=l.s-.1*u,s=a(s,0,1),i=l.v-.1*u,i=a(i,0,1),l.s=s,l.v=i,g.push(l);break;case"complementary":case"complement":case"comp":l=n(e),l.h=(l.h+180)%360,g.push(l);break;case"split-complementary":case"split-complement":case"split":l=n(e),l.h=(l.h+165)%360,g.push(l),l=n(e),l.h=Math.abs((l.h-165)%360),g.push(l);break;case"double-complementary":case"double-complement":case"double":l=n(e),l.h=(l.h+180)%360,g.push(l),l.h=(l.h+30)%360,F=n(l),g.push(l),l.h=(l.h+180)%360,g.push(F);break;case"analogous":case"ana":for(u=1;5>=u;u++)l=n(e),l.h=(l.h+20*u)%360,g.push(l);break;case"triadic":case"triad":case"tri":for(u=1;3>u;u++)l=n(e),l.h=(l.h+120*u)%360,g.push(l);break;default:console.error("Color scheme not recognized.")}return o(h.format.toLowerCase(),g),g},F.make_color=function(n){var s=[],c=t(u),h=null;if(null!==n)for(var d in n)n.hasOwnProperty(d)&&(c[d]=n[d]);var g=null;"string"==typeof c.seed&&(g=new l(c.seed)),c.base_color.length>0&&(h=c.base_color.match(/^#?([0-9a-f]{3})([0-9a-f]{3})?$/i)?F.HEX_to_HSV(c.base_color):F.NAME_to_HSV(c.base_color));for(var m=0;m<c.colors_returned;m++){var f,E,b,p=e(0,360,g);null!==h?(f=a(e(h.h-5,h.h+5,g),0,360),E=0===h.s?0:r(.4,.85,g),b=r(.4,.85,g),s.push({h:f,s:E,v:b})):(f=c.greyscale===!0||c.grayscale===!0?0:c.golden===!0?(p+p/i)%360:null===c.hue||c.full_random===!0?p:a(c.hue,0,360),E=c.greyscale===!0||c.grayscale===!0?0:c.full_random===!0?r(0,1,g):null===c.saturation?.4:a(c.saturation,0,1),b=c.full_random===!0?r(0,1,g):c.greyscale===!0||c.grayscale===!0?r(.15,.75,g):null===c.value?.75:a(c.value,0,1),s.push({h:f,s:E,v:b}))}return o(c.format.toLowerCase(),s),s},F.make_contrast=function(e,r){var l=t(h);if(null!==r)for(var s in r)r.hasOwnProperty(s)&&(l[s]=r[s]);var u,c,d=n(e);if(l.golden===!0)c=e.h*(1+i)%360;else{var g=F.make_scheme(e,{scheme_type:"complementary",format:"hsv"})[1];c=a(g.h-30,0,360)}var m;return"dark"===d?m=a(e.v-.25,0,1):"light"===d&&(m=a(e.v+.25,0,1)),u=[{h:c,s:e.s,v:m}],o(l.format.toLowerCase(),u),u[0]},F}return e()});
},{}],2:[function(require,module,exports){
var Please = require('pleasejs');

(function() {
	'use strict';

	// Create aliases for events listeners
	EventTarget.prototype.on = EventTarget.prototype.addEventListener;
	EventTarget.prototype.off = EventTarget.prototype.removeEventListener;

	// Create global variables
	var cvs, ctx, viewWidth, viewHeight, txt, start, total, points, line, mouse, text, words, groups, colors, allPoints, clickedPoints, loader, isLoaded, originalPoint;
	// Events booleans
	var mousedown, mousemove;
	paper.install(window);


	window.on('load', function() {

		init();

	});

	// window.on('resize', resize);

	/**
	 * Setup the canvas
	 * @return {undefined}
	 */
	function init() {
		isLoaded = false;
		cvs = document.getElementById('canvas');
		ctx = cvs.getContext('2d');
		setSizes();

		paper.setup('canvas');
		mousedown = false;
		points = new Group();

		var loaderSVG = document.getElementById('loader');
		loader = project.importSVG(loaderSVG);
		loaderSVG.remove();
		loader.visible = true;
		loader.position = view.center;
		loader.scale(0.5);

		words = project.importSVG(document.getElementById('svg'));

		words.visible = true;
		words.fitBounds(view.bounds);
		words.scale(0.9);
		words.position = view.center;

		colors = Please.make_scheme({
			h: 0,
			s: 1,
			v: 1
		}, {
			scheme_type: 'double',
			format: 'rgb-string'
		});

		colors = shuffle(colors);

		originalPoint = new Path.Circle(new Point(-100, -100), 6);

		setup();

		total = 0;
		groups = [];
		allPoints = [];
		clickedPoints = [];
		words.children.forEach(function(word, i) {
			var g = new Group();
			groups.push(g);
			word.children.forEach(function(letter, j) {
				var h = new Group();
				var rand = random(0, colors.length);
				h.__fillColor = colors[j % colors.length];
				g.addChild(h);
				letter.segments.forEach(function(segment, k) {
					addPoint(k+1, segment.point, h, segment);
					total++;
				});
			});
		});

		setTimeout(function() {
			var tl = new TimelineMax();
			allPoints = shuffle(allPoints);
			isLoaded = true;
			tl.to(loader.scaling, 0.5, {
				x: 0,
				y: 0,
				ease: Expo.easeOut,
				onComplete: function() {
					loader.remove();
				}
			});
			tl.to(loader, 0.5, {
				opacity: 0,
				ease: Expo.easeOut
			}, 0);
			allPoints.forEach(function(point, k) {
				// el.scaling.x = 1;
				// el.scaling.y = 1;
				tl.to(point, 1, {
					opacity: 1,
					ease: Expo.easeOut
				}, k/100);
				tl.to(point.scaling, 1, {
					x: 1,
					y: 1,
					ease: Elastic.easeOut
				}, k/100);
			});
		}, 3000);
	}



	function setup() {

		line = {
			settings: {
				strokeColor: '#00F',
				strokeWidth: 2,
				strokeCap: 'round'
			},
			origin: new Point(0, 0),
			exist: false,
			paths: []
		};

		text = {
			settings: {
				fontFamily: 'Arial',
				fontWeight: '700',
				fillColor: '#00F'
			}
		};

		// text.settings.content = 'Bonne année !';
		// text.settings.point = new Point(30, 30);
		// txt = new PointText(text.settings);

		// start = 1;
		// total = 10;
		// for (var i = start; i <= total; i++) {
		// 	addPoint(i);
		// }

		view.on('mousedown', function(e) {
			mousedown = true;
			mouse = e.point;
		}).on('mouseup', function(e) {
			mousedown = false;

			var target = project.hitTest(e.point);
			if ((target !== null && target.type !== 'fill') || target === null) {
				if (line.exist)
					deleteLine();
			}
		}).on('mousemove', function(e) {
			if (line.exist) {
				mouse = e.point;
			}
		})
		.on('frame', function(e) {

			if (e.count % 2) return;

			if (line.exist) {
				updateLine(mouse);
				return;
			}

			if (!isLoaded) {
				loader.rotation += 4;
				loader.dashOffset += 4;
			}
		});

		// function loop() {

		// 	if (line.exist) {
		// 		updateLine(mouse);
		// 	}

		// 	if (!isLoaded) {
		// 		loader.rotation += 4;
		// 		loader.dashOffset += 4;
		// 	} else {
		// 		return;
		// 	}

		// 	requestAnimationFrame(loop);
		// }

		// loop();
	}


	function addPoint(index, center, group, initialPoint) {
		// var center = randomPoint();
		var point = originalPoint.clone();
		point.position = center;

		if (index > start) {
			while(!testPoint(point)) {
				// point.remove();
				point.selected = true;
				// center.x = randomPoint();
				// point = new Path.Circle(center, 10);
			}
		}

		point.fillColor = group.__fillColor;
		point.opacity = 0.3;
		point.__index = index;
		point.__clicked = false;

		// checkPosition(point);

		text.settings.content = index;
		text.settings.point = center;
		text.settings.fontSize = '10px';
		text.settings.justification = 'center';
		text.settings.fillColor = group.__fillColor;
		var label = new PointText(text.settings);
		label.translate(new Point(10, 10));
		label.sendToBack();

		point.on('click', function(e) {

			// if (line.exist && point.__index === 1 && line.origin.__index === group.children.length) {
			// 	endLine(e.point, e.point, point);
			// 	return;
			// }

			if (point.parent.parent.__isComplete) return;

			if (line.exist && point.__clicked) {
				endLine(e.point, e.point, point, initialPoint);
				line.path.blendMode = 'overlay';
				// line.path.fillColor = group.__fillColor;
				line.path.strokeColor = group.__fillColor;
				TweenLite.to(line.path, 0.3, { strokeWidth: 6, ease: Back.easeOut, opacity: 0.5 });
				return;
			}

			if (line.exist && group.id !== line.currenGroup) {
				deleteLine();
				return;
			}

			if (line.exist && !point.__clicked) {
				addPointToLine(e.point, e.point, point, group.id, initialPoint);
				point.clicked = true;
				// addClickedPoint(point);
				return;
			}

			if (!line.exist) {
				line.settings.strokeColor = group.__fillColor;
				startLine(e.point, e.point, point, group.id, initialPoint);
				point.__clicked = true;
				// addClickedPoint(point);
				return;
			}
		}).on('mouseenter', function(e) {
			point.__hover = true;
			if (point.parent.parent.__isComplete) return;
			TweenMax.to(point.scaling, 0.3, { x: 1.5, y: 1.5, ease: Back.easeOut });
			document.body.style.cursor = 'pointer';
		}).on('mouseleave', function(e) {
			point.__hover = false;
			TweenMax.to(point.scaling, 0.3, { x: 1, y: 1, ease: Back.easeOut });
			document.body.removeAttribute('style');
		}).on('mousedown', function(e) {
			if (point.parent.parent.__isComplete) return;
			TweenMax.to(point.scaling, 0.3, { x: 1.7, y: 1.7, ease: Expo.easeOut });
		}).on('mouseup', function(e) {
			if (point.__hover && !point.parent.parent.__isComplete)
				TweenMax.to(point.scaling, 0.4, { x: 1.5, y: 1.5, ease: Back.easeOut });
			else
				TweenMax.to(point.scaling, 0.4, { x: 1, y: 1, ease: Back.easeOut });
		});

		var pointLabel = new Group([point, label]);

		pointLabel.opacity = 0;
		pointLabel.scaling.x = 0.01;
		pointLabel.scaling.y = 0.01;

		allPoints.push(pointLabel);
		group.__isComplete = false;
		group.addChild(pointLabel);
	}

	function updatePoints() {
		console.log('updatePoints');
		points.children.forEach(function(el, i) {
			el.remove();
			addPoint(i);
		});
	}

	function testPoint(point) {
		console.log('testPoint');
		return groups.children.every(function(el, i) {
			return !point.intersects(el);
		});
	}

	function addClickedPoint(point) {
		console.log('addClickedPoint');
		if (clickedPoints.indexOf(point) < 0) clickedPoints.push(point);
	}


	function startLine(from, to, target, currenGroup, initialPoint) {
		console.log('startLine');
		line.settings.from = from;
		line.settings.to = to;
		// line.paths.push(new Path.Line(line.settings).sendToBack());
		line.path = new Path.Line(line.settings);
		line.path.firstSegment.__handleIn = initialPoint.handleIn;
		line.path.firstSegment.__handleOut = initialPoint.handleOut;
		line.path.sendToBack();
		line.exist = true;
		line.origin = target;
		line.currenGroup = currenGroup;
		TweenMax.to(line.path.firstSegment.point, 1, {
			x: target.position.x,
			y: target.position.y,
			ease: Elastic.easeOut
		});
	}


	function addPointToLine(from, to, target, currenGroup, initialPoint) {
		console.log('addPointToLine');
		line.path.lineTo(to);
		line.origin = target;
		line.path.segments[line.path.segments.length-2].__handleIn = initialPoint.handleIn;
		line.path.segments[line.path.segments.length-2].__handleOut = initialPoint.handleOut;
		TweenMax.to(line.path.segments[line.path.segments.length-2].point, 1, {
			x: target.position.x,
			y: target.position.y,
			ease: Elastic.easeOut
		});
	}

	function deleteLine() {
		console.log('deleteLine');
		line.exist = false;


		var tl = new TimelineMax();

		var m = 0;
		var totalLength = line.path.segments.length - 1;
		for (var i = totalLength; i > 0; i--) {
			var segment = line.path.segments[i];
			var prevSegment = line.path.segments[i-1];
			var newLine = new Path.Line(prevSegment.point, segment.point);
			segment.remove();
			newLine.strokeColor = line.path.strokeColor;
			newLine.strokeWidth = line.path.strokeWidth;
			newLine.opacity = line.path.opacity;

			var duration = i === totalLength ? 0.2 : 0.1;
			duration = i === 1 ? 0.8 : duration;
			// var delay = i === 1 ? '-=' + duration * 0.55 : '-=0';
			var ease = i === totalLength ? Expo.easeIn : Linear.easeNone;
			ease = i === 1 ? Elastic.easeOut : ease;

			console.log(ease);

			tl.to(newLine.lastSegment.point, duration, {
				x: prevSegment.point.x,
				y: prevSegment.point.y,
				ease: ease,
				onComplete: removeNewLine,
				onCompleteParams: [newLine]
			});

			m++;

		}

		function removeNewLine(newLine) {
			console.log('removeNewLine');
			newLine.remove();
		}


		// Unclick all points
		clickedPoints.forEach(function(point, i) {
			console.log('removeClickedPoints');
			point.__clicked = false;
			clickedPoints.splice(i, 1);
		});

		// var lastSegment = line.path.lastSegment;
		// var beforeLastSegment = line.path.segments[line.path.segments.length-2];
		// var newLine = new Path.Line(beforeLastSegment.point, lastSegment.point);
		// lastSegment.remove();
		// newLine.strokeColor = line.path.strokeColor;
		// newLine.strokeWidth = line.path.strokeWidth;
		// newLine.opacity = line.path.opacity;

		// var duration = 0.8;

		// TweenMax.to(newLine, duration/3, {
		// 	delay: duration*2/3,
		// 	strokeWidth: 0,
		// 	ease: Expo.easeOut
		// });
		// TweenMax.to(newLine.lastSegment.point, duration, {
		// 	x: beforeLastSegment.point.x,
		// 	y: beforeLastSegment.point.y,
		// 	ease: Elastic.easeOut,
		// 	onComplete: function() {
		// 		newLine.remove();
		// 	}
		// });
		// view.on('frame', function() {

		// });
	}

	function updateLine(to) {
		console.log('updateLine');
		// line.path.lastSegment.point.x = to.x;
		// line.path.lastSegment.point.y = to.y;
		TweenMax.to(line.path.lastSegment.point, 1, {
			x: to.x,
			y: to.y,
			ease: Elastic.easeOut
		});
	}

	function endLine(from, to, target, initialPoint) {
		console.log('endLine');
		line.exist = false;
		TweenMax.to(line.path.lastSegment.point, 1, {
			x: target.position.x,
			y: target.position.y,
			ease: Elastic.easeOut
		});
		line.path.lastSegment.__handleIn = initialPoint.handleIn;
		line.path.lastSegment.__handleOut = initialPoint.handleOut;

		target.parent.parent.__isComplete = true;

		line.path.segments.forEach(function(el, i) {

			TweenMax.to(el.handleIn, 1, {
				delay: i/20,
				x: el.__handleIn.x,
				y: el.__handleIn.y,
				ease: Elastic.easeOut
			});
			TweenMax.to(el.handleOut, 1, {
				delay: i/20,
				x: el.__handleOut.x,
				y: el.__handleOut.y,
				ease: Elastic.easeOut
			});
		});
	}


	function randomPoint() {
		var x = random(viewWidth*1/10, viewWidth*9/10);
		var y = random(viewHeight*1/10, viewHeight*9/10);
		return new Point(x, y);
	}


	/**
	 * Set sizes
	 * @return {undefined}
	 */
	function setSizes() {
		viewWidth = window.innerWidth;
		viewHeight = window.innerHeight;
		cvs.width = viewWidth;
		cvs.height = viewHeight;
	}

	/**
	 * Resize canvas
	 * @return {undefined}
	 */
	// function resize() {
	// 	viewWidth = window.innerWidth;
	// 	viewHeight = window.innerHeight;
	// 	cvs.width = viewWidth;
	// 	cvs.height = viewHeight;

	// 	updatePoints();
	// }


	/**
	 * Return a random value in an interval
	 * @param  {integer} min The interval's minimum
	 * @param  {integer} max The interval's maximum
	 * @return {integer}     The random value
	 */
	function random(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

})();
},{"pleasejs":1}]},{},[2])