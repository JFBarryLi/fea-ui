function plotter() {
	/**	
		*	Three.js component
		* Renders nodal coordinates and element connectivity
		* into a 3D model
		*
	**/

	// Initialize variables
	var container;
	var camera, scene, legendScene, raycaster, renderer, legendRenderer;
	var positions = [];
	var point = new THREE.Vector3();
	var geometry = new THREE.SphereBufferGeometry( 20, 20, 20 );
	var mouse = new THREE.Vector2(), INTERSECTED;
	
	init();
	
	// Initialize Three.js
	function init() {
		container = document.getElementsByClassName("plotter-container")[0];
		var options = document.getElementsByClassName("options")[0];
	
		baseGrid();
	
		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		
		if (document.body.clientWidth <= 1200) {
			renderer.setSize( document.body.clientWidth, (window.innerHeight-300) );
		} else {
			renderer.setSize( 1200, (window.innerHeight-300) );
		}
		
		renderer.shadowMap.enabled = true;
		container.insertBefore(renderer.domElement, options);
		
		// Legend
		legendRenderer = new THREE.WebGLRenderer();
		legendRenderer.setPixelRatio( window.devicePixelRatio );
		
		container.insertBefore(legendRenderer.domElement, options);
		
		// Legend Scene
		legendScene = new THREE.Scene();
		legendScene.background = new THREE.Color( 0xffffff );

		// Legend Camera
		legendCamera = new THREE.PerspectiveCamera( 60, document.body.clientWidth / 75 );
		legendCamera.position.set( 0, 0, 1 );
		
		if (document.body.clientWidth <= 1200) {
			legendRenderer.setSize( document.body.clientWidth, 75 );
			legendCamera.aspect = document.body.clientWidth / 75;
		} else {
			legendRenderer.setSize( 1200, 75 );
			legendCamera.aspect = 1200 / 75;
		}
		
		legendCamera.updateProjectionMatrix();
		legendRenderer.render( legendScene, legendCamera );
		
		// Controls
		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.damping = 0.2;
		controls.enabled = true;
		controls.addEventListener( 'change', render );
		
		// Raycaster
		raycaster = new THREE.Raycaster();
		
		function onMouseClick(event) {
			var canvasBounds = renderer.context.canvas.getBoundingClientRect();
			if (event.clientX >= canvasBounds.left && event.clientX <= canvasBounds.right && event.clientY >= canvasBounds.top && event.clientY <= canvasBounds.bottom) {
				// Normalized mouse coordinates
				mouse.x = ((event.clientX - canvasBounds.left) / (canvasBounds.right - canvasBounds.left)) * 2 - 1;
				mouse.y = -((event.clientY - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top)) * 2 + 1;
				
				raycaster.setFromCamera(mouse, camera);
				
				// Objects that intersect with the mouse ray
				var intersects = raycaster.intersectObjects(scene.children);
				
				if (intersects.length != 0) {
					// TO DO
					// intersects[0].object.material.color.set( 0xff0000 );
					console.log(intersects[0].object.customId);
					
					render();
				}

			}	
		}
		
		// Mouse move event listener for ray caster
		document.addEventListener('click', onMouseClick, false);
		
		// Keyboard input doesn't work when OrbitControls is enabled
		document.addEventListener('click', function(e) {
			var target = e.target;
			var ele = 'input';
				if (target.tagName.toLowerCase() === ele) {
						controls.enabled = false;
				} else {
					controls.enabled = true;
				}	
		});
		
		// For mobile
		document.body.addEventListener('touchstart', function(e) {
			var target = e.target;
			var ele = 'input';
				if (target.tagName.toLowerCase() === ele) {
						controls.enabled = false;
				} else {
					controls.enabled = true;
				}	
		});
		
		// Mainly to create transition on mobile
		document.body.addEventListener('scroll', function(e) {
			var target = e.target;
			var ele = 'input';
			if (target.tagName.toLowerCase() === ele) {
					controls.enabled = false;
			} else {
				controls.enabled = true;
			}	
		});
			
	}
	
	function baseGrid() {
		// Scene
		scene = new THREE.Scene();
		scene.background = new THREE.Color( 0xf0f0f0 );
		if (document.body.clientWidth <= 1200) {
			camera = new THREE.PerspectiveCamera( 70, document.body.clientWidth / (window.innerHeight-300), 1, 10000 );
		} else {
			camera = new THREE.PerspectiveCamera( 70, 1200 / (window.innerHeight-300), 1, 10000 );
		}
		camera.position.set( 0, 250, 1000 );
		camera.name = 'camera';
		scene.add( camera );
		
		// Lighting
		scene.add( new THREE.AmbientLight( 0xf0f0f0 ) );
		var light = new THREE.SpotLight( 0xffffff, 1.5 );
		light.position.set( 0, 1000, 700 );
		light.castShadow = true;1
		light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 70, 1, 200, 2000 ) );
		light.shadow.bias = - 0.000222;
		light.shadow.mapSize.width = 1024;
		light.shadow.mapSize.height = 1024;
		light.name = 'light';
		scene.add( light );
		
		// Plane
		var planeGeometry = new THREE.PlaneBufferGeometry( 2000, 2000 );
		planeGeometry.rotateX( - Math.PI / 2 );
		var planeMaterial = new THREE.ShadowMaterial( { opacity: 0.2 } );
		var plane = new THREE.Mesh( planeGeometry, planeMaterial );
		plane.position.y = - 200;
		plane.receiveShadow = true;
		plane.name = 'plane';
		scene.add( plane );
		
		// Grid Helper
		var helper = new THREE.GridHelper( 2000, 100 );
		helper.position.y = - 199;
		helper.material.opacity = 0.25;
		helper.material.transparent = true;
		helper.name = 'helper'
		scene.add( helper );
		
	}
	
	this.showAxes = function() {
		// Axes Helper
		var axesHelper = new THREE.AxesHelper( 2000 );
		axesHelper.name = 'axesHelper';
		scene.add( axesHelper );
		render();
	}
	
	this.hideAxes = function() {
		// Axes Helper
		var axesHelper = scene.getObjectByName('axesHelper');
		scene.remove( axesHelper );
		render();
	}
	
	// Add a node to plot
	this.addNodeObject = function(id, position) {
		var material = new THREE.MeshLambertMaterial( { color: 0x705D56 } );
		var object = new THREE.Mesh( geometry, material );
		object.position.copy( position );
		object.castShadow = true;
		object.receiveShadow = true;
		object.name = 'node';
		object.customId = id;
		scene.add( object );
		render();
		return object;
	}
	
	// Load a set of nodes
	this.loadNodes = function( new_positions ) {
		for ( var i = 0; i < new_positions.length; i ++ ) {
			this.addNodeObject(new_positions[i].id, new_positions[i].vector );
		}
		if (new_positions.length == 0) {
			this.clearScene();
		}
		
		render();
	};
	
	// Add tube between nodes
	this.addTubeObject = function(id, nodei_position, nodej_position, color) {
		
		function straightLine() {

			THREE.Curve.call( this );

		}

		straightLine.prototype = Object.create( THREE.Curve.prototype );
		straightLine.prototype.constructor = straightLine;

		// Define the curve as a straight line between nodei and nodej
		straightLine.prototype.getPoint = function ( t ) {
			var dx = nodej_position.x - nodei_position.x;
			var dy = nodej_position.y - nodei_position.y;
			var dz = nodej_position.z - nodei_position.z;
			
			var tx = t*dx + nodei_position.x;
			var ty = t*dy + nodei_position.y;
			var tz = t*dz + nodei_position.z;

			return new THREE.Vector3( tx, ty, tz );

		};
		
		var path = new straightLine();
		
		var tubeGeometry = new THREE.TubeGeometry( path, 40, 5, 14, false );
		var material = new THREE.MeshBasicMaterial( { color: color } );
		var object = new THREE.Mesh( tubeGeometry, material );
		object.castShadow = true;
		object.receiveShadow = true;
		object.name = 'tube';
		object.customId = id;
		scene.add( object );
		render();
		return object;
	};

	// Load a set of tubes
	this.loadTubes = function( tube_elements ) {
		for (var i = 0; i < tube_elements.length; i ++) {
			this.addTubeObject(tube_elements[i].id, tube_elements[i].vector[0], tube_elements[i].vector[1] , tube_elements[i].color);
		}
		
		if (tube_elements.length == 0) {
			this.clearScene();
		}
		
		render();
	};
	
	// Method that allow adding to the scene
	this.addToScene = function(object) {
			scene.add( object );
			render();
	}
	
	// Clear scene
	this.clearScene = function() {
		for ( var i = 0; i < scene.children.length; i ++ ) {
			if (scene.children[i].name == 'node' || scene.children[i].name == 'tube') {
				scene.remove(scene.children[i]);
				i --;
			}
		}
		
		for ( var i = 0; i < legendScene.children.length; i ++ ) {
			legendScene.remove(legendScene.children[i]);
			i --;
		}
		
		legendRenderer.render( legendScene, legendCamera );
		render();
	}
	
	function render() {
		renderer.render( scene, camera );
	}
	
	// Dynamic Resizing
	window.addEventListener( 'resize', onWindowResize, false );
	
	function onWindowResize() {
		var newWidth = document.body.clientWidth;
		// Prevent resize when scrolling on mobile
		if (owidth !== newWidth) {
			if (document.body.clientWidth <= 1200) {
				// Main canvas
				camera.aspect = document.body.clientWidth / (window.innerHeight-300);
				camera.updateProjectionMatrix();
				renderer.setSize( document.body.clientWidth, (window.innerHeight-300) );
				render();
				
				// Legend canvas
				legendCamera.aspect = document.body.clientWidth / 75;
				legendCamera.updateProjectionMatrix();
				legendRenderer.setSize( document.body.clientWidth, 75 );
				legendRenderer.render( legendScene, legendCamera );
				
			} else {
				// Main canvas
				camera.aspect = 1200 / (window.innerHeight-300);
				camera.updateProjectionMatrix();
				renderer.setSize( 1200, (window.innerHeight-300) );
				render();
				
				// Legend Canvas
				legendCamera.aspect = 1200 / 75;
				legendCamera.updateProjectionMatrix();
				legendRenderer.setSize( 1200, 75 );
				legendRenderer.render( legendScene, legendCamera );
			}
		}
	}
	
	this.createLegend = function(legend, labels) {
		
		for ( var i = 0; i < legendScene.children.length; i ++ ) {
			legendScene.remove(legendScene.children[i]);
			i --;
		}

		// Adding legend to the scene
		legendScene.add( legend );
		legendScene.add( labels[ 'title' ] );

		for ( var i = 0; i < Object.keys( labels[ 'ticks' ] ).length; i ++ ) {
			legendScene.add( labels[ 'ticks' ][ i ] );
			legendScene.add( labels[ 'lines' ][ i ] );
		}
		legendRenderer.render( legendScene, legendCamera );
	}
	
}
