class NavBar extends React.Component {
	render() {
		let className = 'nav-bar';
		return (
			<nav className={className}>
				<li><a href='#'>Home</a></li>
				<li><a href='#'>Doc</a></li>
				<li><a href='#'>Source</a></li>
				<li><a href='#'>Contact</a></li>
			</nav>
		);
	}
}

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

class Properties extends React.Component {
	render() {
		let className = 'input properties left-col';
		return (
			<div className={className}>
				<div className='input__title'>Properties</div>
				Properties
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


