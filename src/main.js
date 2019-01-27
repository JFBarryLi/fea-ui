class NavBar extends React.Component {
	render() {
		let className = 'nav-bar';
		return (
			<nav className={className}>
				NavBar
			</nav>
		);
	}
}

class Options extends React.Component {
	render() {
		return (
			<div >
				Options
			</div>
		);
	}
}

class Plotter extends React.Component {
	render() {
		let className = 'plotter';
		return (
		<div className={className}>
			<div className='options'>
				<Options

				/>
			</div>
			<div className={className}>
				Plotter
			</div>
		</div>
		);
	}
}

class ForT extends React.Component {
	render() {
		let className = 'frame-or-truss';
		return (
			<div className={className}>
				frame or truss
			</div>
		);
	}
}

class Properties extends React.Component {
	render() {
		let className = 'properties';
		return (
			<div className={className}>
				Properties
			</div>
		);
	}
}

class Nodes extends React.Component {
	render() {
		let className = 'nodes';
		return (
			<div className={className}>
				Nodes
			</div>
		);
	}
}

class Connectivity extends React.Component {
	render() {
		let className = 'connectivity';
		return (
			<div className={className}>
				Connectivity
			</div>
		);
	}
}

class Support extends React.Component {
	render() {
		let className = 'support';
		return (
			<div className={className}>
				Support
			</div>
		);
	}
}

class Force extends React.Component {
	render() {
		let className = 'force';
		return (
			<div className={className}>
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
				Analyze
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
				<Plotter />
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
		);
	}
}

ReactDOM.render(
	<Layout />,
	document.getElementById('root')
);


