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
		I: '1',
		A: '1',
		E: '1',
		yMax: '1'
	};
	
	// Nodal coordinates
	this.nodes = {
		data : [
			{
				node: 1,
				x: -100,
				y: 0
			},
			{
				node: 2,
				x: -100,
				y: 100
			},
			{
				node: 3,
				x: 100,
				y: 100
			},
			{
				node: 4,
				x: 100,
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
				nodej: 1
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
			node: '',
			constraint: ''
		}]
	};
	
	// Input force
	this.force = {
		data : [{
			node: 1,
			fm: 1,
			direction: 1
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
		
		var connectivity_table = {};
		var connectivity_table;
		var elems = this.connectivity.data;
		for (var ele in elems) {
			if (elems[ele].Element !== "") {
				connectivity_table[elems[ele].Element] = [elems[ele].nodei, elems[ele].nodej]
			}
		}
		
		connectivity_table = JSON.stringify(connectivity_table);
		
		
		var frame_or_truss = this.type;
		
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
	
	// Convert nodal coordinates and connectivity to 3D vectors
	this.vectorize = function() {
		var nodeVectors = [];
		var tubeVectors = [];
		
		// Create the node vectors
		var nodes = this.nodes.data;
		for (var key in nodes) {
			if (nodes[key].node !== '') {
				nodeVectors.push(new THREE.Vector3(nodes[key].x, nodes[key].y, 0));
			}
		}
		
		// Create the tube vectors
		var tubes = this.connectivity.data;
		for (var key in tubes) {
			if (tubes[key].Element !== '') {
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
	
}

// Instantiate a DataStore
var store = new DataStore;
