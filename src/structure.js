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

class Plotter extends React.Component {
	render() {
		let className = 'plotter';
		return (
			<canvas className={className}>
			</canvas>
		);
	}
}

class PlotterContainer extends React.Component {
	render() {
		let className = 'plotter-container';
		return (
		<div className={className}>
			<Options

			/>
			<Plotter
			
			/>
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

class Properties extends React.Component {
	render() {
		let className = 'input properties left-col';
		return (
			<div className={className}>
				<div className='input__title'>Properties</div>
				<PropertiesForm />
			</div>
		);
	}
}

class Nodes extends React.Component {
	render() {
		let className = 'input nodes right-col';
		return (
			<div className={className}>
				<div className='input__title'>Nodes</div>
				Nodes
			</div>
		);
	}
}

class Connectivity extends React.Component {
	render() {
		let className = 'input connectivity left-col';
		return (
			<div className={className}>
				<div className='input__title'>Connectivity</div>
				Connectivity
			</div>
		);
	}
}

class Support extends React.Component {
	render() {
		let className = 'input support right-col';
		return (
			<div className={className}>
				<div className='input__title'>Support</div>
				Support
			</div>
		);
	}
}

class Force extends React.Component {
	render() {
		let className = 'input force mid-col';
		return (
			<div className={className}>
				<div className='input__title'>Force</div>
				Force
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
				<NavBar />
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
