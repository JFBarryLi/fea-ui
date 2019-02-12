var ReactTable = window.ReactTable.default;
var Collapse = window.Reactstrap.Collapse

class Options extends React.Component {
	/**	
		*	Options Component
		* New/Undo/Import/Export/Results
		*
	**/
	
	constructor(props) {
		super(props);
		
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(name) {
		switch(name) {
			case 'buttNew':
				store.preprocessed = store.vectorize();
				plotter.clearScene();
				break;
			case 'buttUndo':
				if (Object.keys(store.preprocessed).length !== 0) {
					plotter.loadNodes(store.preprocessed.nodes);
					plotter.loadTubes(store.preprocessed.tubes);
				} else {
					alert('Nothing to undo');
				}
				break;
			case 'buttImport':
				var json = prompt('JSON');
				if (json != null) {
					store.importData(json);
					plotter.clearScene;
					var sceneObjects = store.vectorize();
					plotter.loadNodes(sceneObjects.nodes);
					plotter.loadTubes(sceneObjects.tubes);
				}
				break;
			case 'buttExport':
				prompt('JSON', store.exportData());
				break;
			case 'buttResults':
				if (Object.keys(store.resultData).length !== 0) {
					prompt('Results:',store.resultData.stringData);
				} else {
					alert('No results available');
				}
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
	/**	
		*	Container for options and Three.js canvas
		*
	**/
	
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
	/**	
		*	Frame or Truss switch Component
		* Determines the type of analysis
		*
	**/
	
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		store.type = 'truss';
	}
	
	handleInputChange(e) {
		const target = e.target;
		const value = target.checked;
		
		if (value == 0) {
			store.type = 'truss';
		} else {
			store.type = 'frame';
		}
	}
	
	render() {
		let className = 'frame-or-truss';
		return (
			<div className={className}>
				<input type="checkbox" name="ftswitch" onChange={this.handleInputChange} className="ftswitch-checkbox" id="ftswitch" />
				<label className="ftswitch-label" htmlFor="ftswitch">
						<span className="ftswitch-inner"></span>
						<span className="ftswitch-switch"></span>
				</label>
			</div>
		);
	}
}

class Collapsible extends React.Component {
	/**	
		*	Collapsible Component
		* Allows any component extended from this to be collapsible
		*
	**/
	
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
	/**	
		*	Form for basic properties
		* Moment of Inertia, Cross-sectional Area, Modulus of Elasticity,
		* Max distance from neutral axis
		*
	**/
	
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.state = store.properties
	}
	
	handleInputChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		
		store.properties[name] = value;
		
		this.forceUpdate();
		
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
							value={store.properties.I}
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
							value={store.properties.A}
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
							value={store.properties.E}
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
							value={store.properties.yMax}
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
	/**	
		*	Properties Container
		*
	**/
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

class NodeTable extends React.Component {
	/**	
		*	react-table component for storing nodal coordinates
		*
	**/
	constructor(props) {
		super(props);
		this.handleChangeCell = this.handleChangeCell.bind(this);
		this.handleCallback = this.handleCallback.bind(this);
		this.rowCallbackIndex = null;
	}
	
	handleCallback(index) {
		this.rowCallbackIndex = index;
	}
	
	handleChangeCell(e) {
		// Target is the table cell input
		const target = e.target;
		const value = target.value;
		const name = target.name;
		
		// Updating state.data
		let newData = store.nodes.data.slice();
		// Create new row
		if (store.nodes.data.length-1 == this.rowCallbackIndex.index) {
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

		// Updating store data
		store.nodes.data = newData;
		this.forceUpdate();

	}
	
	
	render() {
		
		let columns = [{
			minWidth: 50,
			Header: 'Node',
			accessor: 'node',
			Cell: props => <input type='number' name='' value={props.value} onChange={this.handleChangeCell} />
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
			<ReactTable
				className='-striped -highlight'
				defaultPageSize={10}
				data={store.nodes.data}
				columns={columns}
				
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

class Nodes extends Collapsible {
	/**	
		*	Container for nodal coordinates
		*
	**/
	
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
	/**	
		*	react-table component for element connectivity information
		*
	**/
	
	constructor(props) {
		super(props);
		this.handleChangeCell = this.handleChangeCell.bind(this);
		this.handleCallback = this.handleCallback.bind(this);
		this.rowCallbackIndex = null;
	}
	
	handleCallback(index) {
		this.rowCallbackIndex = index;
	}
	
	handleChangeCell(e) {
		// Target is the table cell input
		const target = e.target;
		const value = target.value;
		const name = target.name;
		
		// Updating state.data
		let newData = store.connectivity.data.slice();
		// Create new row
		if (store.connectivity.data.length-1 == this.rowCallbackIndex.index) {
			newData.push({Element: '', nodei: '', nodej: ''});
		}
		
		switch(name) {
			case 'element':
				newData[this.rowCallbackIndex.index].Element = parseInt(target.value);
				break;
			case 'nodei':
				newData[this.rowCallbackIndex.index].nodei = parseFloat(target.value);
				break;
			case 'nodej':
				newData[this.rowCallbackIndex.index].nodej = parseFloat(target.value);
				break;
		}

		// Updating store data
		store.connectivity.data = newData;
		this.forceUpdate();
		
	}
	
	rowCallback(dataFromChild) {
		this.rowCallbackIndex = dataFromChild;
	}
	
	render() {
		let columns = [{
			minWidth: 50,
			Header: 'Element',
			accessor: 'Element',
			Cell: props => <input type='number' name='element' value={props.value} onChange={this.handleChangeCell} />
		}, {
			minWidth: 50,
			Header: 'Node i',
			accessor: 'nodei',
			Cell: props => <input type='number' name='nodei' value={props.value} onChange={this.handleChangeCell} />
		}, {
			minWidth: 50,
			Header: 'Node j',
			accessor: 'nodej',
			Cell: props => <input type='number' name='nodej' value={props.value} onChange={this.handleChangeCell} />
		}];

		return (
			<ReactTable
				className='-striped -highlight'
				defaultPageSize={10}
				data={store.connectivity.data}
				columns={columns}
				
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

class Connectivity extends Collapsible {
	/**	
		*	Connectivity container
		*
	**/
	
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
	/**	
		*	react-table component for storing support information
		*
	**/

	constructor(props) {
		super(props);
		this.handleChangeCell = this.handleChangeCell.bind(this);
		this.handleCallback = this.handleCallback.bind(this);
		this.rowCallbackIndex = null;
	}
	
	handleCallback(index) {
		this.rowCallbackIndex = index;
	}

	handleChangeCell(e) {
		// Target is the table cell input
		const target = e.target;
		const value = target.value;
		const name = target.name;
		
		// Updating state.data
		let newData = store.support.data.slice();
		// Create new row
		if (store.support.data.length-1 == this.rowCallbackIndex.index) {
			newData.push({node: '', constraint: ''});
		}
		
		switch(name) {
			case 'node':
				newData[this.rowCallbackIndex.index].node = parseInt(target.value);
				break;
			case 'constraint':
				newData[this.rowCallbackIndex.index].constraint = parseFloat(target.value);
				break;
		}

		// Updating store data
		store.support.data = newData;
		this.forceUpdate();

	}
	
	render() {
		const columns = [{
			minWidth: 50,
			Header: 'Node',
			accessor: 'node',
			Cell: props => <input type='number' name='node' value={props.value} onChange={this.handleChangeCell} />
		}, {
			minWidth: 50,
			Header: 'Constraint',
			accessor: 'constraint',
			Cell: props => <input type='number' name='constraint' value={props.value} onChange={this.handleChangeCell} />
		}];

		return (
			<ReactTable
				className='-striped -highlight'
				defaultPageSize={10}
				data={store.support.data}
				columns={columns}
				
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

class Support extends Collapsible {
	/**	
		*	Support container
		*
	**/
	
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
	/**	
		*	react-table component for storing applied force and moment information
		*
	**/
	
	constructor(props) {
		super(props);
		this.handleChangeCell = this.handleChangeCell.bind(this);
		this.handleCallback = this.handleCallback.bind(this);
		this.rowCallbackIndex = null;
	}
	
	handleCallback(index) {
		this.rowCallbackIndex = index;
	}
	
	handleChangeCell(e) {
		// Target is the table cell input
		const target = e.target;
		const value = target.value;
		const name = target.name;
		
		// Updating state.data
		let newData = store.force.data.slice();
		// Create new row
		if (store.force.data.length-1 == this.rowCallbackIndex.index) {
			newData.push({node: '', fm: '', direction: ''});
		}
		
		switch(name) {
			case 'node':
				newData[this.rowCallbackIndex.index].node = parseInt(target.value);
				break;
			case 'fm':
				newData[this.rowCallbackIndex.index].fm = parseFloat(target.value);
				break;
			case 'direction':
				newData[this.rowCallbackIndex.index].directon = parseFloat(target.value);
				break;
		}

		// Updating store data
		store.force.data = newData;
		this.forceUpdate();

	}
	
	render() {
		const columns = [{
			minWidth: 50,
			Header: 'Node',
			accessor: 'node',
			Cell: props => <input type='number' name='node' value={props.value} onChange={this.handleChangeCell} />
		}, {
			minWidth: 50,
			Header: 'Force/Moment',
			accessor: 'fm',
			Cell: props => <input type='number' name='fm' value={props.value} onChange={this.handleChangeCell} />
		}, {
			minWidth: 50,
			Header: 'Direction',
			accessor: 'direction',
			Cell: props => <input type='number' name='direction' value={props.value} onChange={this.handleChangeCell} />
		}];

		return (
			<ReactTable
				className='-striped -highlight'
				defaultPageSize={10}
				data={store.force.data}
				columns={columns}
				
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

class Force extends Collapsible {
	/**	
		*	Force container
		*
	**/
	
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
	/**	
		*	Analyze button
		*
	**/
	
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick() {
		store.preprocessed = store.vectorize();
	}
	
	render() {
		let className = 'analyze';
		return (
			<div className={className}>
				<span onClick={this.handleClick} className='analyze__button'>
					Analyze
				</span>
			</div>
		);
	}
}

class Layout extends React.Component {
	/**	
		*	Layout component
		*
	**/
	
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

/**	
	*	Initialize Three.js component
	*
**/
var owidth = document.body.clientWidth;
var plotter = new plotter();
var initPlot = store.vectorize();
plotter.loadNodes(initPlot.nodes);
plotter.loadTubes(initPlot.tubes);
