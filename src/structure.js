var ReactTable = window.ReactTable.default;
var Collapse = window.Reactstrap.Collapse

class Options extends React.Component {
	constructor(props) {
		super(props);
		
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(name) {
		switch(name) {
			case 'buttNew':
				plotter.clearScene();
				break;
			case 'buttUndo':
				console.log(2);
				break;
			case 'buttImport':
				console.log(3);
				break;
			case 'buttExport':
				console.log(4);
				break;
			case 'buttResults':
				console.log(5);
				break;
		}
	}
	
	render() {
		let className = 'options';
		return (
			<div className={className}>
				<div className='img-with-text'>
					<img src='img/buttNew.svg' alt='New' onClick={() => this.handleClick('buttNew')}></img>
					<p>New</p>
				</div>
				<div className='img-with-text'>
					<img src='img/buttUndo.svg' alt='Undo' onClick={() => this.handleClick('buttUndo')}></img>
					<p>Undo</p>
				</div>
				<div className='img-with-text'>
					<img src='img/buttImport.svg' alt='Import' onClick={() => this.handleClick('buttImport')}></img>
					<p>Import</p>
				</div>
				<div className='img-with-text'>
					<img src='img/buttExport.svg' alt='Export' onClick={() => this.handleClick('buttExport')}></img>
					<p>Export</p>
				</div>
				<div className='img-with-text'>
					<img src='img/buttResults.svg' alt='Results' onClick={() => this.handleClick('buttResults')}></img>
					<p>Results</p>
				</div>
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
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.state = {
			I: '1',
			A: '1',
			E: '1',
			yMax: '1'
		};
	}
	
	handleInputChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		
		this.setState({
			[name]: value
		});
	}
	
	render() {
		let className = 'properties__form';
		return (
			<div className={className}>
				<form>
					<div className="form-group">
						<label htmlFor="moment_of_inertia"><strong><i>I:</i></strong></label>
						<input 
							type="number" 
							name="I" 
							value={this.state.I}
							onChange={this.handleInputChange} 
							className="form-control" 
							id="moment_of_inertia" 
							placeholder="1" 
						/>
						<small className="form-text text-muted">Moment of Inertia [mm<sup>4</sup>]</small>
					</div>
					<div className="form-group">
						<label htmlFor="cross_sectional_area"><strong><i>A:</i></strong></label>
						<input 
							type="number" 
							name="A" 
							value={this.state.A}
							onChange={this.handleInputChange}							
							className="form-control" 
							id="cross_sectional_area" 
							placeholder="1" 
						/>
						<small className="form-text text-muted">Cross Sectional Area [mm<sup>2</sup>]</small>
					</div>
					<div className="form-group">
						<label htmlFor="modulus_elasticity"><strong><i>E:</i></strong></label>
						<input 
							type="number" 
							name="E" 
							value={this.state.E}
							onChange={this.handleInputChange} 
							className="form-control" 
							id="modulus_elasticity" 
							placeholder="1" 
						/>
						<small className="form-text text-muted">Modulus of Elasticity [MPa]</small>
					</div>
					<div className="form-group">
						<label htmlFor="y_max"><strong><i>y<sub>max</sub>:</i></strong></label>
						<input 
							type="number" 
							name="yMax" 
							value={this.state.yMax}
							onChange={this.handleInputChange}  
							className="form-control" 
							id="y_max" 
							placeholder="1" 
						/>
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
	constructor(props) {
		super(props);
		this.handleCallback = this.handleCallback.bind(this);
	}
	
	handleCallback(index) {
		this.props.rowCallbackFromParent(index);
	}
	
	render() {
		return (
			<ReactTable
				className='-striped -highlight'
				defaultPageSize={10}
				data={this.props.data}
				columns={this.props.columns}
				
				getTdProps={(rowInfo, index) => {
					return {
						onClick: (e, handleOriginal) => {
							
							this.handleCallback(index);
							
							if (handleOriginal) {
								handleOriginal();
							}
						}
					};
				}}
				
			/>
		);
	}
}

class NodeTable extends React.Component {
	constructor(props) {
		super(props);
		this.handleChangeCell = this.handleChangeCell.bind(this);
		this.rowCallback = this.rowCallback.bind(this);
		this.state = {
			data : [{
				node: 1,
				x: 1,
				y: 1
			},{
				node: 2,
				x: 2,
				y:2
			}]
		};
		this.rowCallbackIndex = null;
	}
	
	handleChangeCell(e) {
		// Target is the table cell input
		const target = e.target;
		const value = target.value;
		const name = target.name;
		
		// Updating state.data
		let newData = this.state.data.slice();
		// Create new row
		if (this.state.data.length-1 == this.rowCallbackIndex.index) {
			newData.push({node: '', x: '', y: ''});
		}
		
		switch(name) {
			case 'node':
				newData[this.rowCallbackIndex.index].node = parseInt(target.value);
				break;
			case 'x':
				newData[this.rowCallbackIndex.index].x = parseFloat(target.value);
				break;
			case 'y':
				newData[this.rowCallbackIndex.index].y = parseFloat(target.value);
				break;
		}
		this.setState({
			data: newData
		});
	}
	
	rowCallback(dataFromChild) {
		this.rowCallbackIndex = dataFromChild;
	}
	
	render() {
		
		let columns = [{
			minWidth: 50,
			Header: 'Node',
			accessor: 'node',
			Cell: props => <input type='number' name='node' value={props.value} onChange={this.handleChangeCell} />
		}, {
			minWidth: 50,
			Header: 'x',
			accessor: 'x',
			Cell: props => <input type='number' name='x' value={props.value} onChange={this.handleChangeCell} />
		}, {
			minWidth: 50,
			Header: 'y',
			accessor: 'y',
			Cell: props => <input type='number' name='y' value={props.value} onChange={this.handleChangeCell} />
		}];

		return (
			<BaseTable
				rowCallbackFromParent={this.rowCallback}
				data={this.state.data} 
				columns={columns}
			/>
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
			minWidth: 50,
			Header: 'Element',
			accessor: 'Element',
			Cell: props => <span className='number'>{props.value}</span>
		}, {
			minWidth: 50,
			Header: 'Node i',
			accessor: 'nodei',
			Cell: props => <span className='number'>{props.value}</span>
		}, {
			minWidth: 50,
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
			minWidth: 50,
			Header: 'Node',
			accessor: 'node',
			Cell: props => <span className='number'>{props.value}</span>
		}, {
			minWidth: 50,
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
			minWidth: 50,
			Header: 'Node',
			accessor: 'node',
			Cell: props => <span className='number'>{props.value}</span>
		}, {
			minWidth: 50,
			Header: 'Force/Moment',
			accessor: 'fm',
			Cell: props => <span className='number'>{props.value}</span>
		}, {
			minWidth: 50,
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

var owidth = document.body.clientWidth;
var plotter = new plotter();
plotter.loadNodes( [ 
	new THREE.Vector3( -100, 0, 0 ),
	new THREE.Vector3( -100, 100, 0 ),
	new THREE.Vector3( 100, 100, 0 ),
	new THREE.Vector3( 100, 0, 0 ) ] );
	
plotter.addTubeObject( new THREE.Vector3( -100, 0, 0 ),new THREE.Vector3( -100, 100, 0 ) );
plotter.addTubeObject( new THREE.Vector3( -100, 100, 0 ),new THREE.Vector3( 100, 100, 0 ) );
plotter.addTubeObject( new THREE.Vector3( 100, 100, 0 ),new THREE.Vector3( 100, 0, 0 ) );
plotter.addTubeObject( new THREE.Vector3( 100, 0, 0 ),new THREE.Vector3( -100, 0, 0 ) );
