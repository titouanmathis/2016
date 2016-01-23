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