var Please = require('pleasejs');

(function() {
	'use strict';

	// Create global variables
	var cvs, ctx, viewWidth, viewHeight, txt, start, total, points, line, mouse, text, words, groups, colors, allPoints, clickedPoints, loader, isLoaded, originalPoint, lines;
	// Events booleans
	var mousedown, mousemove;
	var tic, swif, fiws;
	var restart, play, isPlaying;
	paper.install(window);


	window.addEventListener('load', function() {

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

		tic = document.createElement('audio');
		tic.pause();
		tic.volume = 0.6;
		tic.src = '/src/mp3/tic3.mp3';

		swif = document.createElement('audio');
		swif.pause();
		swif.volume = 0.5;
		swif.src = '/src/mp3/swif.mp3';

		fiws = document.createElement('audio');
		fiws.pause();
		fiws.volume = 0.5;
		fiws.src = '/src/mp3/fiws.mp3';

		colors = Please.make_scheme({
			h: 0,
			s: 1,
			v: 1
		}, {
			scheme_type: 'double',
			format: 'rgb-string'
		});

		console.log(colors);

		colors = shuffle(colors);

		mouse = new Point(0, 0);

		restart = document.getElementById('restart');
		play = document.getElementById('play');

		restart.addEventListener('click', reset);
		play.addEventListener('click', playAll);

		originalPoint = new Path.Circle(new Point(-100, -100), 6);

		lines = [];

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
			document.body.classList.add('is-loaded');
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
			path: new Path.Line()
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

		document.addEventListener('mousemove', function(e) {
			mouse.x = e.x;
			mouse.y = e.y;
		});

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
		})
		.on('frame', function(e) {

			if (e.count % 2) return;

			if (line.exist && !isPlaying) {
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
		point.__initialPoint = initialPoint;

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

			console.log(point.__clicked)

			if (point === line.origin || point.parent.parent.__isComplete) return;
			console.log('click')
			var everyPointsClicked = group.children.every(function(el, i) {
				return clickedPoints.indexOf(el.children[0]) > -1;
			});

			if (line.exist && everyPointsClicked) {
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
				point.__clicked = true;
				addClickedPoint(point);
				return;
			}

			if (!line.exist) {
				line.settings.strokeColor = group.__fillColor;
				startLine(e.point, e.point, point, group.id, initialPoint);
				point.__clicked = true;
				addClickedPoint(point);
				return;
			}
		}).on('mouseenter', function(e) {
			// swif.play();
			point.__hover = true;
			if (point.parent.parent.__isComplete) return;
			TweenMax.to(point.scaling, 0.3, { x: 1.5, y: 1.5, ease: Back.easeOut });
			document.body.style.cursor = 'pointer';
		}).on('mouseleave', function(e) {
			// fiws.play();
			point.__hover = false;
			TweenMax.to(point.scaling, 0.3, { x: 1, y: 1, ease: Back.easeOut });
			document.body.removeAttribute('style');
		}).on('mousedown', function(e) {
			if (point.parent.parent.__isComplete) return;
			tic.play();
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
		console.log('addClickedPoint', point.__index);
		if (clickedPoints.indexOf(point) < 0) clickedPoints.push(point);
		console.log(clickedPoints);
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
		lines.push(line.path);
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

	function deleteLine(l) {
		console.log('deleteLine');
		line.exist = false;

		for (var j = 0; j < clickedPoints.length; j++) {
			console.log(clickedPoints[j].__index, clickedPoints[j].__clicked);
			clickedPoints[j].__clicked = false;
			console.log(clickedPoints[j].__index, clickedPoints[j].__clicked);
		}

		l = typeof l === 'undefined' ? line.path : l;

		clickedPoints = [];

		var tl = new TimelineMax();
		var totalLength = l.segments.length - 1;
		for (var i = totalLength; i > 0; i--) {
			var segment = l.segments[i];
			var prevSegment = l.segments[i-1];
			var newLine = new Path.Line(prevSegment.point, segment.point);
			segment.remove();
			newLine.strokeColor = l.strokeColor;
			newLine.strokeWidth = l.strokeWidth;
			newLine.opacity = l.opacity;

			var duration = i === totalLength ? 0.2 : 0.1;
			duration = i === 1 ? 0.8 : duration;
			// var delay = i === 1 ? '-=' + duration * 0.55 : '-=0';
			var ease = i === totalLength ? Expo.easeIn : Linear.easeNone;
			ease = i === 1 ? Elastic.easeOut : ease;

			tl.to(newLine.lastSegment.point, duration, {
				x: prevSegment.point.x,
				y: prevSegment.point.y,
				ease: ease,
				onComplete: removeNewLine,
				onCompleteParams: [newLine]
			});
		}

		function removeNewLine(newLine) {
			console.log('removeNewLine');
			newLine.remove();
		}
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



	function reset() {
		console.log('reset');

		var tl = new TimelineMax({
			onComplete: function() {
				lines = [];
			}
		});

		lines.forEach(function(l, j) {

			l.segments.forEach(function(el, i) {

				tl.to(el.handleIn, 1, {
					// delay: i/20,
					x: 0,
					y: 0,
					ease: Elastic.easeOut
				}, j/2);
				tl.to(el.handleOut, 1, {
					// delay: i/20,
					x: 0,
					y: 0,
					ease: Elastic.easeOut
				}, j/2);
			});

			tl.to(l, 1, {
				strokeWidth: 2,
				opacity: 1,
				ease: Expo.easeOut,
				onComplete: function() {
					deleteLine(l);
				}
			}, j/2);
		});

		TweenMax.to(restart.children, 2, {
			rotation: '-=360',
			ease: Expo.easeOut
		});


		allPoints.forEach(function(el, i) {
			el.parent.__isComplete = false;
		});
	}

	function playAll() {
		console.log('playAll');
		isPlaying = true;
		var tl = new TimelineMax({
			paused: true,
			onComplete: function() {
				isPlaying = false;
			}
		});

		lines.forEach(function(l, i) {
			l.remove();
		});

		lines = [];

		allPoints.forEach(function(el, i) {
			el.parent.__isComplete = true;
		});

		groups.forEach(function(word, i) {
			word.children.forEach(function(letter, j) {
				letter.__path = new Path();
				letter.__path.strokeColor = letter.__fillColor;
				letter.__path.strokeWidth = 2;
				// letter.__path.add(new Point(letter.children[0].children[0].position.x, letter.children[0].children[0].position.y));
				letter.__path.closed = false;
				lines.push(letter.__path);
				letter.children.forEach(function(item, k) {

					var p = item.children[0];

					if (k === 0) {
						var newPoint = letter.__path.add(p.position);
						newPoint.__handleIn = p.__initialPoint.handleIn;
						newPoint.__handleOut = p.__initialPoint.handleOut;
						tl.to(newPoint.handleIn, 1, {
							x: newPoint.__handleIn.x,
							y: newPoint.__handleIn.y,
							ease: Elastic.easeOut
						}, (i+j+k)/30);
						tl.to(newPoint.handleOut, 1, {
							x: newPoint.__handleOut.x,
							y: newPoint.__handleOut.y,
							ease: Elastic.easeOut
						}, (i+j+k)/30);
					}

					if (k > 0) {
						var newPoint = letter.__path.add(p.position);
						newPoint.__handleIn = p.__initialPoint.handleIn;
						newPoint.__handleOut = p.__initialPoint.handleOut;

						tl.to(newPoint.handleIn, 1, {
							x: newPoint.__handleIn.x,
							y: newPoint.__handleIn.y,
							ease: Elastic.easeOut
						}, (i+j+k)/30);
						tl.to(newPoint.handleOut, 1, {
							x: newPoint.__handleOut.x,
							y: newPoint.__handleOut.y,
							ease: Elastic.easeOut
						}, (i+j+k)/30);
						// var lastSegment = letter.__path.lastSegment;
						// tl.fromTo(lastSegment.point, 1, {
						// 	x: letter.children[k-1].children[0].position.x,
						// 	y: letter.children[k-1].children[0].position.y,
						// }, {
						// 	x: p.position.x,
						// 	y: p.position.y,
						// 	ease: Linear.easeNone,
						// 	onComplete: function() {
						// 		if (k === letter.children.length-1) {
						// 			letter.__path.add(new Poin(p.position.x, p.position.y));
						// 			tl.to(letter.__path.lastSegment.point, 1, {
						// 				x: letter.children[0].children[0].position.x,
						// 				y: letter.children[0].children[0].position.y,
						// 				ease: Expo.easeOut
						// 			});
						// 		}
						// 	}
						// });
						// tl.call(function() {
							// var lastSegment = letter.__path.lastSegment;
							// letter.__path.add(new Point(letter.__path.lastSegment.point.x, letter.__path.lastSegment.point.y));

							// tl.to(letter.__path.lastSegment.point, 0.1, {
							// 	x: p.position.x,
							// 	y: p.position.y,
							// 	ease: Linear.easeNone,
							// });
						// });
					}


					if (k === letter.children.length-1) {
						// letter.__path.lineTo(letter.children[0].children[0].position);
						letter.__path.closed = true;
						tl.to(letter.__path, 0.3, {
							opacity: 0.5,
							strokeWidth: 6,
							ease: Back.easeOut
						}, ((i+j+k)/30));
						// var newPoint = letter.__path.add(letter.children[0].children[0].position);
						// newPoint.__handleIn = p.__initialPoint.handleIn;
						// newPoint.__handleOut = p.__initialPoint.handleOut;
						// console.log(newPoint.handl);

						// tl.to(newPoint.handleIn, 1, {
						// 	x: newPoint.__handleIn.x,
						// 	y: newPoint.__handleIn.y,
						// 	ease: Elastic.easeOut
						// }, (i+j+k)/30);
						// tl.to(newPoint.handleOut, 1, {
						// 	x: newPoint.__handleOut.x,
						// 	y: newPoint.__handleOut.y,
						// 	ease: Elastic.easeOut
						// }, (i+j+k)/30);
						// tl.call(function() {
						// 	letter.__path.add(new Point(letter.__path.lastSegment.point.x, letter.__path.lastSegment.point.y));
						// 	letter.__path.closed = false;
						// 	tl.to(letter.__path.lastSegment.point, 0.3, {
						// 		x: letter.children[0].children[0].position.x,
						// 		y: letter.children[0].children[0].position.y,
						// 		ease: Expo.easeOut
						// 	});
						// });
					}
				});
			});
		});

		tl.play();

		// allPoints.forEach(function(group, i) {
		// 	if (group[0].__index === 1) {

		// 	}
		// });
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