var ReactTable = window.ReactTable.default;
var Collapse = window.Reactstrap.Collapse

class Options extends React.Component {
	render() {
		let className = 'options';
		return (
			<div className={className}>
				Options
			</div>
		);
	}
}

class PlotterContainer extends React.Component {
	render() {
		let className = 'plotter-container';
		return (
		<div className={className}>
			<Options />
		</div>
		);
	}
}

class ForT extends React.Component {
	render() {
		let className = 'frame-or-truss';
		return (
			<div className={className}>
				<input type="checkbox" name="ftswitch" className="ftswitch-checkbox" id="ftswitch" />
				<label className="ftswitch-label" htmlFor="ftswitch">
						<span className="ftswitch-inner"></span>
						<span className="ftswitch-switch"></span>
				</label>
			</div>
		);
	}
}

class Collapsible extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = { collapse: false};
	}
	
	toggle() {
		this.setState({ collapse: !this.state.collapse });
	}
}
	

class PropertiesForm extends React.Component {
	render() {
		let className = 'properties__form';
		return (
			<div className={className}>
				<form>
					<div className="form-group">
						<label htmlFor="moment_of_inertia"><strong><i>I:</i></strong></label>
						<input type="text" className="form-control" id="moment_of_inertia" placeholder="1" />
						<small className="form-text text-muted">Moment of Inertia [mm<sup>4</sup>]</small>
					</div>
					<div className="form-group">
						<label htmlFor="cross_sectional_area"><strong><i>A:</i></strong></label>
						<input type="text" className="form-control" id="cross_sectional_area" placeholder="1" />
						<small className="form-text text-muted">Cross Sectional Area [mm<sup>2</sup>]</small>
					</div>
					<div className="form-group">
						<label htmlFor="modulus_elasticity"><strong><i>E:</i></strong></label>
						<input type="text" className="form-control" id="modulus_elasticity" placeholder="1" />
						<small className="form-text text-muted">Modulus of Elasticity [MPa]</small>
					</div>
					<div className="form-group">
						<label htmlFor="y_max"><strong><i>y<sub>max</sub>:</i></strong></label>
						<input type="text" className="form-control" id="y_max" placeholder="1" />
						<small className="form-text text-muted">Distance from neutral axis to surface in the y-direction [mm]</small>
					</div>
				</form>
			</div>
		);
	}
}

class Properties extends Collapsible {
	render() {
		let className = 'input properties left-col';
		return (
			<div className={className}>
				<a className='input__title' onClick={this.toggle}>Properties</a>
				<Collapse isOpen={this.state.collapse}>
					<PropertiesForm />
				</Collapse>
			</div>
		);
	}
}

class BaseTable extends React.Component {	
	render() {
		return (
			<ReactTable
				className='-striped -highlight'
				defaultPageSize={10}
				data={this.props.data}
				columns={this.props.columns}
			/>
		);
	}
}

class NodeTable extends React.Component {
	render() {
		const data = [{
			node: 1,
			x: 1,
			y: 1
		}];

		const columns = [{
			Header: 'Node',
			accessor: 'node',
			Cell: props => <span className='number'>{props.value}</span>
		}, {
			Header: 'x',
			accessor: 'x',
			Cell: props => <span className='number'>{props.value}</span>
		}, {
			Header: 'y',
			accessor: 'y',
			Cell: props => <span className='number'>{props.value}</span>
		}];

		return (
			<BaseTable data={data} columns={columns}/>
		);
	}
}

class Nodes extends Collapsible {
	render() {
		let className = 'input nodes right-col';
		
		return (
			<div className={className}>
				<a className='input__title' onClick={this.toggle}>Nodes</a>
				<Collapse isOpen={this.state.collapse}>
					<small className='form-text text-muted table-text'>Nodal Coordinates</small>
					<NodeTable />
				</Collapse>
			</div>
		);
	}
}

class ConnectivityTable extends React.Component {
	render() {
		const data = [{
			Element: 1,
			nodei: 1,
			nodej: 1
		}];

		const columns = [{
			Header: 'Element',
			accessor: 'Element',
			Cell: props => <span className='number'>{props.value}</span>
		}, {
			Header: 'Node i',
			accessor: 'nodei',
			Cell: props => <span className='number'>{props.value}</span>
		}, {
			Header: 'Node j',
			accessor: 'nodej',
			Cell: props => <span className='number'>{props.value}</span>
		}];

		return (
			<BaseTable data={data} columns={columns}/>
		);
	}
}

class Connectivity extends Collapsible {
	render() {
		let className = 'input connectivity left-col';
		return (
			<div className={className}>
				<a className='input__title' onClick={this.toggle}>Connectivity</a>
				<Collapse isOpen={this.state.collapse}>
					<small className='form-text text-muted table-text'>Connectivity table</small>
					<ConnectivityTable />
				</Collapse>
			</div>
		);
	}
}

class SupportTable extends React.Component {
	render() {
		const data = [{
			node: 1,
			constraint: 1
		}];

		const columns = [{
			Header: 'Node',
			accessor: 'node',
			Cell: props => <span className='number'>{props.value}</span>
		}, {
			Header: 'Constraint',
			accessor: 'constraint',
			Cell: props => <span className='number'>{props.value}</span>
		}];

		return (
			<BaseTable data={data} columns={columns}/>
		);
	}
}

class Support extends Collapsible {
	render() {
		let className = 'input support right-col';
		return (
			<div className={className}>
				<a className='input__title' onClick={this.toggle}>Support</a>
				<Collapse isOpen={this.state.collapse}>
					<small className='form-text text-muted table-text'>Constraint: x=1, y=2, theta=3</small>
					<SupportTable />
				</Collapse>
			</div>
		);
	}
}

class ForceTable extends React.Component {
	render() {
		const data = [{
			node: 1,
			fm: 1,
			direction: 1
		}];

		const columns = [{
			Header: 'Node',
			accessor: 'node',
			Cell: props => <span className='number'>{props.value}</span>
		}, {
			Header: 'Force/Moment',
			accessor: 'fm',
			Cell: props => <span className='number'>{props.value}</span>
		}, {
			Header: 'Direction',
			accessor: 'direction',
			Cell: props => <span className='number'>{props.value}</span>
		}];

		return (
			<BaseTable data={data} columns={columns}/>
		);
	}
}

class Force extends Collapsible {
	render() {
		let className = 'input force mid-col';
		return (
			<div className={className}>
				<a className='input__title' onClick={this.toggle}>Force</a>
				<Collapse isOpen={this.state.collapse}>
					<small className='form-text text-muted table-text'>Direction: x=1, y=2, theta=3</small>
					<ForceTable />
				</Collapse>
			</div>
		);
	}
}

class Analyze extends React.Component {
	render() {
		let className = 'analyze';
		return (
			<div className={className}>
				<span className='analyze__button'>
					Analyze
				</span>
			</div>
		);
	}
}

class Layout extends React.Component {
	render() {
		let className = 'Layout';
		return (
			<div className='container'>
				<div className='content-container'>
					<PlotterContainer />
					<ForT />
					<div className='two-col'>
						<Properties />
						<Nodes />
					</div>
					<div className='two-col'>
						<Connectivity />
						<Support />
					</div>
					<Force />
					<Analyze />
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Layout />,
	document.getElementById('root')
);

function plotter() {

	// Initialize variables
	var container;
	var camera, scene, renderer;
	var linePointsLength;
	this.lineHelperObjects = [];
	var positions = [];
	var point = new THREE.Vector3();
	var geometry = new THREE.SphereBufferGeometry( 20, 20, 20 );
	
	init();
	
	function init() {
		var container = document.getElementsByClassName("plotter-container")[0];
		var options = document.getElementsByClassName("options")[0];
		
		// Scene
		scene = new THREE.Scene();
		scene.background = new THREE.Color( 0xf0f0f0 );
		camera = new THREE.PerspectiveCamera( 70, window.innerWidth / (window.innerHeight-300), 1, 10000 );
		camera.position.set( 0, 250, 1000 );
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
		scene.add( light );
		
		// Plane
		var planeGeometry = new THREE.PlaneBufferGeometry( 2000, 2000 );
		planeGeometry.rotateX( - Math.PI / 2 );
		var planeMaterial = new THREE.ShadowMaterial( { opacity: 0.2 } );
		var plane = new THREE.Mesh( planeGeometry, planeMaterial );
		plane.position.y = - 200;
		plane.receiveShadow = true;
		scene.add( plane );
		
		// Helper
		var helper = new THREE.GridHelper( 2000, 100 );
		helper.position.y = - 199;
		helper.material.opacity = 0.25;
		helper.material.transparent = true;
		scene.add( helper );

		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, (window.innerHeight-300) );
		renderer.shadowMap.enabled = true;
		container.insertBefore(renderer.domElement, options);

		// Controls
		var controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.damping = 0.2;
		controls.addEventListener( 'change', render );
			
	}
	
	// Add a node to plot
	this.addNodeObject = function( position ) {
		var material = new THREE.MeshLambertMaterial( { color: 0x705D56 } );
		var object = new THREE.Mesh( geometry, material );
		if ( position ) {
			object.position.copy( position );
		}
		object.castShadow = true;
		object.receiveShadow = true;
		scene.add( object );
		this.lineHelperObjects.push( object );
		render();
		return object;
	}
	function addPoint() {
		linePointsLength ++;
		positions.push( this.addNodeObject().position );
	}
	function removePoint() {
		linePointsLength --;
		positions.pop();
		scene.remove( this.lineHelperObjects.pop() );
	}

	// Load a set of nodes
	this.load = function( new_positions ) {
		linePointsLength = new_positions.length;
		for ( var i = 0; i < linePointsLength; i ++ ) {
			this.addNodeObject( positions[ i ] );
		}
		positions = [];
		for ( var i = 0; i < linePointsLength; i ++ ) {
			positions.push( this.lineHelperObjects[ i ].position );
		}
		
		while ( new_positions.length > positions.length ) {
			addPoint();
		}
		while ( new_positions.length < positions.length ) {
			removePoint();
		}
		for ( var i = 0; i < positions.length; i ++ ) {
			positions[ i ].copy( new_positions[ i ] );
		}
		render();
	}

	function render() {
		renderer.render( scene, camera );
	}
	
	// Dynamic Resizing
	window.addEventListener( 'resize', onWindowResize, false );
	
	function onWindowResize() {
		if (window.innerWidth <= 1200) {
			camera.aspect = window.innerWidth / (window.innerHeight-300);
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, (window.innerHeight-300) );
			render();
		} else {
			camera.aspect = 1200 / (window.innerHeight-300);
			camera.updateProjectionMatrix();
			renderer.setSize( 1200, (window.innerHeight-300) );
			render();
		}
	}
}

var plotter = new plotter();
plotter.load( [ 
	new THREE.Vector3( -100, 0, 0 ),
	new THREE.Vector3( -100, 100, 0 ),
	new THREE.Vector3( 100, 100, 0 ),
	new THREE.Vector3( 100, 0, 0 ) ] );