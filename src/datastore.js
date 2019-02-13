function DataStore() {
	/**	
		*	Central storage of data
		* All components depend on DataStore
		*
	**/
	
	// Frame or Truss type
	this.type = '';

	// Basic structural properties
	this.properties = {
		I: '30.664',
		A: '19.625',
		E: '200000',
		yMax: '2.5'
	};
	
	// Nodal coordinates
	this.nodes = {
		data : [
			{
				node: 1,
				x: -200,
				y: 0
			},
			{
				node: 2,
				x: -100,
				y: 100
			},
			{
				node: 3,
				x: 0,
				y: 100
			},
			{
				node: 4,
				x: 100,
				y: 100
			},,
			{
				node: 5,
				x: 200,
				y: 0
			},,
			{
				node: 6,
				x: 100,
				y: 0
			},,
			{
				node: 7,
				x: 0,
				y: 0
			},,
			{
				node: 8,
				x: -100,
				y: 0
			},
			{
				node: '',
				x: '',
				y: ''
			}
		]
	};
	
	// Element connectivity
	this.connectivity = {
		data : [
			{
				Element: 1,
				nodei: 1,
				nodej: 2
			},{
				Element: 2,
				nodei: 2,
				nodej: 3
			},{
				Element: 3,
				nodei: 3,
				nodej: 4
			},{
				Element: 4,
				nodei: 4,
				nodej: 5
			},,{
				Element: 5,
				nodei: 5,
				nodej: 6
			},,{
				Element: 6,
				nodei: 6,
				nodej: 7
			},,{
				Element: 7,
				nodei: 7,
				nodej: 8
			},,{
				Element: 8,
				nodei: 8,
				nodej: 1
			},,{
				Element: 9,
				nodei: 8,
				nodej: 3
			},,{
				Element: 10,
				nodei: 2,
				nodej: 7
			},,{
				Element: 11,
				nodei: 3,
				nodej: 6
			},,{
				Element: 12,
				nodei: 7,
				nodej: 4
			},{
				Element: '',
				nodei: '',
				nodej: ''
			}
		]
	};
	
	// Support/boundary conditions
	this.support = {
		data : [{
			node: 1,
			constraint: 1
		},{
			node: 1,
			constraint: 2
		},{
			node: 5,
			constraint: 2
		},{
			node: '',
			constraint: ''
		}]
	};
	
	// Input force
	this.force = {
		data : [{
			node: 2,
			fm: -1,
			direction: 2
		},{
			node: 4,
			fm: -1,
			direction: 2
		},{
			node: '',
			fm: '',
			direction: ''
		}]
	};
	
	// Original structure
	this.preprocessed = {
		
	};
	
	// Deformed structure
	this.postprocessed = {
		
	};
	
	// Load a structure into the app
	this.importData = function(json) {
		object = JSON.parse(json);
		this.properties = object.properties;
		this.nodes = object.nodes;
		this.connectivity = object.connectivity;
		this.support = object.support;
		this.force = object.force;
	};
	
	// Export the current structure
	this.exportData = function() {
		strData = JSON.stringify( 
		{
			properties: this.properties,
			nodes: this.nodes,
			connectivity: this.connectivity,
			support: this.support,
			force: this.force
		});

		return strData;
	};
	
	// Return from api call to analyze the structure
	this.resultData = {
		stringData: null
	};
	
	// Construct the payload to be sent
	this.requestPayload = function() {
		payload = {
			"moment_of_inertia":"",
			"cross_sectional_area":"",
			"y_max":"",
			"modulus_elasticity":"",
			"connectivity_table":"",
			"nodal_coordinates":"",
			"boundary_conditions":"",
			"force_vector":"",
			"frame_or_truss":"frame"
		};
		
		payload.moment_of_inertia = store.properties.I;
		payload.cross_sectional_area = store.properties.A;
		payload.y_max = store.properties.yMax;
		payload.modulus_elasticity = store.properties.E;
		
		var nodal_coordinates = {};
		var nodes = this.nodes.data;
		for (var ele in nodes) {
			if (nodes[ele].node !== "") {
				nodal_coordinates[nodes[ele].node] = [nodes[ele].x, nodes[ele].y]
			}
		}
		nodal_coordinates = JSON.stringify(nodal_coordinates);
		nodal_coordinates = nodal_coordinates.replace(/\"([^(\")"]+)\":/g,"$1:");
		
		var connectivity_table = {};
		var elems = this.connectivity.data;
		for (var ele in elems) {
			if (elems[ele].Element !== "") {
				connectivity_table[elems[ele].Element] = [elems[ele].nodei, elems[ele].nodej]
			}
		}
		connectivity_table = JSON.stringify(connectivity_table);
		connectivity_table = connectivity_table.replace(/\"([^(\")"]+)\":/g,"$1:");
		
				
		// Degree of Freedom
		if (this.type == 'truss') {
			var dof = 2;
		} else if (this.type == 'frame') {
			var dof = 3;
		} 
		
		// Boundary Conditions
		var boundary_conditions = [];
		var supports = this.support.data;
		for (var support in supports) {
			if (supports[support].node !== "") {
				var bc = dof * supports[support].node + supports[support].constraint - dof - 1;
				boundary_conditions.push(bc);
			}
		}		
		
		boundary_conditions = '[' + boundary_conditions.toString() + ']';
		
		// Force/moment vector
		var obj = this.nodes.data;
		maxNode = Math.max.apply(Math, obj.map(function(o) { return o.node; }));
		var flen = maxNode * dof;
		var force_vector = new Array(flen).fill(0);
		var forces = this.force.data;
		for (var force in forces) {
			if (forces[force].node !== "") {
				var findex = dof * forces[force].node + forces[force].direction - dof - 1;
				force_vector[findex] = forces[force].fm;
			}
		}

		force_vector = '[' + force_vector.toString() + ']';
		
		
		var frame_or_truss = this.type;
		
		payload.connectivity_table = connectivity_table;
		payload.nodal_coordinates = nodal_coordinates;
		payload.boundary_conditions = boundary_conditions;
		payload.force_vector = force_vector;
		payload.frame_or_truss = frame_or_truss;
		
		payload = JSON.stringify(payload);
		
		return payload;
	};
	
	// API call 
	this.sendRequestData = function() {
		const Http = new XMLHttpRequest();
		var baseurl = '127.0.0.1';
		var posturl = baseurl + '/fea/structure/input/';
		Http.open("POST", posturl);
		var content = this.requestPayload;
		Http.send(content);
		var dStore = this;
		
		Http.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				outputId = Http.responseText;
				const getHttp = new XMLHttpRequest();
				var geturl = baseurl + '/fea/structure/output/'+outputId;
				getHttp.open("GET", geturl);
				getHttp.send(content);
				
				getHttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.states == 200) {
						dStore.resultData.stringData = response;
					}
				}
				
			}
		}
		
	}
	
	// Clear fields in data store
	this.clearFields = function() {
		this.properties = {
			I: '',
			A: '',
			E: '',
			yMax: ''
		};
		this.nodes = {
			data : [
				{
					node: '',
					x: '',
					y: ''
				}
			]
		};
		this.connectivity = {
			data : [
				{
					Element: '',
					nodei: '',
					nodej: ''
				}
			]
		};
		this.support = {
			data : [{
				node: '',
				constraint: ''
			}]
		};
		this.force = {
			data : [{
				node: '',
				fm: '',
				direction: ''
			}]
		};
		
	}
	
	
	// Convert nodal coordinates and connectivity to 3D vectors
	this.vectorize = function() {
		var nodeVectors = [];
		var tubeVectors = [];
		
		// Create the node vectors
		var nodes = this.nodes.data;
		for (var key in nodes) {
			if (nodes[key].node !== '' && nodes[key].node !== null) {
				nodeVectors.push(new THREE.Vector3(nodes[key].x, nodes[key].y, 0));
			}
		}
		
		// Create the tube vectors
		var tubes = this.connectivity.data;
		for (var key in tubes) {
			if (tubes[key].Element !== '' && tubes[key].Element !== null) {
				for (var nKey in nodes) {
					if (nodes[nKey].node == tubes[key].nodei) {
						var i = nodes[nKey];
					} else if (nodes[nKey].node == tubes[key].nodej) {
						var j = nodes[nKey];
					}
				}
				tubeVectors.push( [new THREE.Vector3(i.x,i.y,0),new THREE.Vector3(j.x,j.y,0)] )
			}
		}
		
		return {nodes:nodeVectors, tubes:tubeVectors};
	};
	
	this.history = {
		index: 0,
		undoIndex: 0,
		vectors: [this.vectorize()]
	}
	
	
}

// Instantiate a DataStore
var store = new DataStore;
