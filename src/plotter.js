function plotter() {

	// Initialize variables
	var container;
	var camera, scene, renderer;
	var positions = [];
	var point = new THREE.Vector3();
	var geometry = new THREE.SphereBufferGeometry( 20, 20, 20 );
	
	init();
	
	function init() {
		var container = document.getElementsByClassName("plotter-container")[0];
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

		// Controls
		var controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.damping = 0.2;
		controls.addEventListener( 'change', render );
			
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
		light.position.set( 0, 1500, 200 );
		light.castShadow = true;
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
	
	// Add a node to plot
	this.addNodeObject = function( position ) {
		var material = new THREE.MeshLambertMaterial( { color: 0x705D56 } );
		var object = new THREE.Mesh( geometry, material );
		object.position.copy( position );
		object.castShadow = true;
		object.receiveShadow = true;
		object.name = 'node';
		scene.add( object );
		render();
		return object;
	}
	
	// Load a set of nodes
	this.loadNodes = function( new_positions ) {
		for ( var i = 0; i < new_positions.length; i ++ ) {
			this.addNodeObject( new_positions[ i ] );
		}
		render();
	};
	
	// Add tube between nodes
	this.addTubeObject = function( nodei_position, nodej_position ) {
		
		function straightLine() {

			THREE.Curve.call( this );

		}

		straightLine.prototype = Object.create( THREE.Curve.prototype );
		straightLine.prototype.constructor = straightLine;

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
		var material = new THREE.MeshBasicMaterial( { color: 0x70ABAF } );
		var object = new THREE.Mesh( tubeGeometry, material );
		object.castShadow = true;
		object.receiveShadow = true;
		object.name = 'tube';
		scene.add( object );
		render();
		return object;
	};

	// Load a set of tubes
	this.loadTubes = function( tube_elements ) {
		for ( var i = 0; i < tube_elements.length; i ++ ) {
			this.addTubeObject( tube_elements[ i ][ 0 ], tube_elements[ i ][ 1 ] );
		}
		render();
	};
	
	// Clear scene
	this.clearScene = function() {
		for ( var i = 0; i < scene.children.length; i ++ ) {
			if (scene.children[i].name == 'node' || scene.children[i].name == 'tube') {
				scene.remove(scene.children[i]);
				i --;
			}
		}

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
				camera.aspect = document.body.clientWidth / (window.innerHeight-300);
				camera.updateProjectionMatrix();
				renderer.setSize( document.body.clientWidth, (window.innerHeight-300) );
				render();
			} else {
				camera.aspect = 1200 / (window.innerHeight-300);
				camera.updateProjectionMatrix();
				renderer.setSize( 1200, (window.innerHeight-300) );
				render();
			}
		}
	}
}
