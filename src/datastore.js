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
		E: '10000',
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
			},
			{
				node: 5,
				x: 200,
				y: 0
			},
			{
				node: 6,
				x: 100,
				y: 0
			},
			{
				node: 7,
				x: 0,
				y: 0
			},
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
			},{
				Element: 5,
				nodei: 5,
				nodej: 6
			},{
				Element: 6,
				nodei: 6,
				nodej: 7
			},{
				Element: 7,
				nodei: 7,
				nodej: 8
			},{
				Element: 8,
				nodei: 8,
				nodej: 1
			},{
				Element: 9,
				nodei: 8,
				nodej: 3
			},{
				Element: 10,
				nodei: 2,
				nodej: 7
			},{
				Element: 11,
				nodei: 3,
				nodej: 6
			},{
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
			fm: -50000,
			direction: 2
		},{
			node: 4,
			fm: -50000,
			direction: 2
		},{
			node: 7,
			fm: 50000,
			direction: 2
		},{
			node: '',
			fm: '',
			direction: ''
		}]
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
	
	// Render results onto the Three.js canvas
	this.renderResult = function() {
		
		// Parse into {nodei: [x,y], ...}
		var jsonData = JSON.parse(this.resultData.stringData);
		jsonData = jsonData.nodal_coordinates;
		jsonData = jsonData.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
		jsonData = JSON.parse(jsonData);
		// newNode format: [{node: 1, x: 1, y:1},...]
		var newNodes = [];
		for (var key in jsonData) {
			var obj = {node: key, x: jsonData[key][0], y: jsonData[key][1]}
			newNodes.push(obj);
		}
		this.nodes.data = newNodes;
		updateScene();
		
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
		var Http = new XMLHttpRequest();
		var baseurl = 'http://127.0.0.1:8000';
		var posturl = baseurl + '/fea/structure/input/';
		Http.open("POST", posturl);
		Http.setRequestHeader('Accept', 'application/json');
		Http.setRequestHeader('Content-Type', 'application/json');
		var content = this.requestPayload();
		Http.send(content);
		var dStore = this;
		
		Http.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 201) {
				outputId = Http.responseText;
				var getHttp = new XMLHttpRequest();
				var geturl = baseurl + '/fea/structure/output/'+outputId;
				getHttp.open("GET", geturl);
				getHttp.setRequestHeader('Accept', 'application/json');
				getHttp.setRequestHeader('Content-Type', 'application/json');
				getHttp.send();
				
				getHttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						dStore.resultData.stringData = this.responseText;
						dStore.renderResult();
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
	
	var sThis = this;
	this.history = {
		index: 0,
		undoIndex: 0,
		nodes: [],
		properties: [],
		connectivity: [],
		support: [],
		force: [],
		vectors: [],
		init : function() {
			this.nodes[0] = JSON.parse(JSON.stringify(sThis.nodes));
			this.properties[0] = JSON.parse(JSON.stringify(sThis.properties));
			this.connectivity[0] = JSON.parse(JSON.stringify(sThis.connectivity));
			this.support[0] = JSON.parse(JSON.stringify(sThis.support));
			this.force[0] = JSON.parse(JSON.stringify(sThis.force));
			this.vectors[0] = sThis.vectorize();
		},
		storeState : function() {
			this.nodes.push(JSON.parse(JSON.stringify(sThis.nodes)));
			this.properties.push(JSON.parse(JSON.stringify(sThis.properties)));
			this.connectivity.push(JSON.parse(JSON.stringify(sThis.connectivity)));
			this.support.push(JSON.parse(JSON.stringify(sThis.support)));
			this.force.push(JSON.parse(JSON.stringify(sThis.force)));
		},
		loadState : function() {
			sThis.nodes = JSON.parse(JSON.stringify(this.nodes[this.index]));
			sThis.properties = JSON.parse(JSON.stringify(this.properties[this.index]));
			sThis.connectivity = JSON.parse(JSON.stringify(this.connectivity[this.index]));
			sThis.support = JSON.parse(JSON.stringify(this.support[this.index]));
			sThis.force = JSON.parse(JSON.stringify(this.force[this.index]));
		}
	};
	
	
}

// Instantiate a DataStore
var store = new DataStore;
store.history.init();
