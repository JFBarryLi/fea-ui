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
		Iy: '',
		Iz: '',
		J: '',
		A: '',
		E: '',
		G: '',
		yMax: ''
	};
	
	// Nodal coordinates
	this.nodes = {
		data : [
			{
				node: '',
				x: '',
				y: '',
				z: ''
			}
		]
	};
	
	// Element connectivity
	this.connectivity = {
		data : [
			{
				Element: '',
				nodei: '',
				nodej: ''
			}
		]
	};
	
	// Support/boundary conditions
	this.support = {
		data : [
			{
				node: '',
				constraint: ''
			}
		]
	};
	
	// External Input
	this.externalInput = {
		data : [
			{
				node: '',
				fm: '',
				direction: ''
			}
		]
	};
	
	// Load a structure into the app
	this.importData = function(json) {
		object = JSON.parse(json);
		this.properties = object.properties;
		this.nodes = object.nodes;
		this.connectivity = object.connectivity;
		this.support = object.support;
		this.externalInput = object.externalInput;
	};
	
	// Export the current structure
	this.exportData = function() {
		strData = JSON.stringify( 
		{
			properties: this.properties,
			nodes: this.nodes,
			connectivity: this.connectivity,
			support: this.support,
			externalInput: this.externalInput
		});

		return strData;
	};
	
	// Return from api call to analyze the structure
	this.resultData = {
		stringData: null
	};
	
	// Render results onto the Three.js canvas
	this.renderResult = function() {
		
		// Parse into {nodei: [x,y,z], ...}
		var jsonData = JSON.parse(this.resultData.stringData);
		jsonData = jsonData.nodal_coordinates;
		jsonData = jsonData.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
		jsonData = JSON.parse(jsonData);
		// newNode format: [{node: 1, x: 1, y:1, z:1},...]
		var newNodes = [];
		for (var key in jsonData) {
			var obj = {node: key, x: jsonData[key][0], y: jsonData[key][1], z: jsonData[key][2]}
			newNodes.push(obj);
		}
		this.nodes.data = newNodes;
		updateScene();
		
	};
	
	// Construct the payload to be sent
	this.requestPayload = function() {
		payload = {
			"moment_of_inertia_y":"",
			"moment_of_inertia_z":"",
			"cross_sectional_area":"",
			"y_max":"",
			"young_modulus":"",
			"shear_modulus":"",
			"torsional_constant":"",
			"connectivity_table":"",
			"nodal_coordinates":"",
			"boundary_conditions":"",
			"force_vector":"",
			"frame_or_truss":"frame"
		};
		
		payload.moment_of_inertia_y = store.properties.Iy;
		payload.moment_of_inertia_z = store.properties.Iz;
		payload.cross_sectional_area = store.properties.A;
		payload.y_max = store.properties.yMax;
		payload.young_modulus = store.properties.E;
		payload.shear_modulus = store.properties.G;
		payload.torsional_constant = store.properties.J;
		
		var nodal_coordinates = {};
		var nodes = this.nodes.data;
		for (var ele in nodes) {
			if (nodes[ele].node !== "") {
				nodal_coordinates[nodes[ele].node] = [nodes[ele].x, nodes[ele].y, nodes[ele].z]
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
			var dof = 3;
		} else if (this.type == 'frame') {
			var dof = 6;
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
		var input_vector = new Array(flen).fill(0);
		var inputs = this.externalInput.data;
		for (var input in inputs) {
			if (inputs[input].node !== "") {
				var findex = dof * inputs[input].node + inputs[input].direction - dof - 1;
				input_vector[findex] = inputs[input].fm;
			}
		}

		input_vector = '[' + input_vector.toString() + ']';
		
		var frame_or_truss = this.type;
		
		payload.connectivity_table = connectivity_table;
		payload.nodal_coordinates = nodal_coordinates;
		payload.boundary_conditions = boundary_conditions;
		payload.force_vector = input_vector;
		payload.frame_or_truss = frame_or_truss;
		
		payload = JSON.stringify(payload);
		
		return payload;
	};
	
	// API call 
	this.sendRequestData = function() {
		var ajaxLoader = document.body.getElementsByClassName('ajax-loader')[0];
		ajaxLoader.style.display = 'block';
		
		
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
						dStore.history.vectors.push(store.vectorize());
						dStore.history.index = store.history.index + 1;
						dStore.history.storeState();
						ajaxLoader.style.display = 'none';
					}
				}
				
			}
		}
		
	}
	
	// Clear fields in data store
	this.clearFields = function() {
		this.properties = {
			Iy: '',
			Iz: '',
			J: '',
			A: '',
			E: '',
			G: '',
			yMax: ''
		};
		this.nodes = {
			data : [
				{
					node: '',
					x: '',
					y: '',
					z: ''
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
		this.externalInput = {
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
				nodeVectors.push({id: nodes[key].node, vector: new THREE.Vector3(nodes[key].x, nodes[key].y, nodes[key].z)});
			}
		}
		
		// Tube color
		this.colorize = function() {
			
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
				tubeVectors.push( {id: tubes[key].Element, vector: [new THREE.Vector3(i.x,i.y,i.z),new THREE.Vector3(j.x,j.y,j.z)], color: 0x70ABAF} )
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
		externalInput: [],
		vectors: [],
		init : function() {
			presetBridge();
			this.nodes[0] = JSON.parse(JSON.stringify(sThis.nodes));
			this.properties[0] = JSON.parse(JSON.stringify(sThis.properties));
			this.connectivity[0] = JSON.parse(JSON.stringify(sThis.connectivity));
			this.support[0] = JSON.parse(JSON.stringify(sThis.support));
			this.externalInput[0] = JSON.parse(JSON.stringify(sThis.externalInput));
			this.vectors[0] = sThis.vectorize();
		},
		storeState : function() {
			this.nodes.push(JSON.parse(JSON.stringify(sThis.nodes)));
			this.properties.push(JSON.parse(JSON.stringify(sThis.properties)));
			this.connectivity.push(JSON.parse(JSON.stringify(sThis.connectivity)));
			this.support.push(JSON.parse(JSON.stringify(sThis.support)));
			this.externalInput.push(JSON.parse(JSON.stringify(sThis.externalInput)));
		},
		loadState : function() {
			sThis.nodes = JSON.parse(JSON.stringify(this.nodes[this.index]));
			sThis.properties = JSON.parse(JSON.stringify(this.properties[this.index]));
			sThis.connectivity = JSON.parse(JSON.stringify(this.connectivity[this.index]));
			sThis.support = JSON.parse(JSON.stringify(this.support[this.index]));
			sThis.externalInput = JSON.parse(JSON.stringify(this.externalInput[this.index]));
		}
	};
	
	
}

// Instantiate a DataStore
var store = new DataStore;
store.history.init();
