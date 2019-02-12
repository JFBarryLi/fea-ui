function DataStore() {
	this.properties = {};
	this.nodes = {};
	this.connectivity = {};
	this.support = {};
	this.force = {};
	
	this.packageData = function() {
		
	};
	
	this.vectorize = function() {
		var nodeVectors = [];
		var tubeVectors = [];
		
		// Create the node vectors
		var nodes = this.nodes.data;
		for (var key in nodes) {
			nodeVectors.push(new THREE.Vector3(nodes[key].x, nodes[key].y, 0));
		}
		
		// Create the tube vectors
		var tubes = this.connectivity.data;
		for (var key in tubes) {
			var i = nodes[tubes[key].nodei];
			var j = nodes[tubes[key].nodej];
			tubeVectorspush( [new THREE.Vector3(this.nodes[i].x,this.nodes[i].y,0),new THREE.Vector3(this.nodes[i].x,this.nodes[i].y,0)] )
		}
		
		return {nodes:nodeVectors, tubes:tubeVectors};
	};
	
}

var store = new DataStore;
