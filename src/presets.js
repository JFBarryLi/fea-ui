function presetBridge() {
	// Basic structural properties
	store.properties = {
		Iy: '30.664',
		Iz: '30.664',
		J: '30.664',
		A: '19.625',
		E: '10000',
		G: '10000',
		yMax: '2.5'
	};
	
	// Nodal coordinates
	store.nodes = {
		data : [
			{
				node: 1,
				x: -200,
				y: 0,
				z: 0
			},
			{
				node: 2,
				x: -100,
				y: 100,
				z: 0
			},
			{
				node: 3,
				x: 0,
				y: 100,
				z: 0
			},
			{
				node: 4,
				x: 100,
				y: 100,
				z: 0
			},
			{
				node: 5,
				x: 200,
				y: 0,
				z: 0
			},
			{
				node: 6,
				x: 100,
				y: 0,
				z: 0
			},
			{
				node: 7,
				x: 0,
				y: 0,
				z: 0
			},
			{
				node: 8,
				x: -100,
				y: 0,
				z: 0
			},
			{
				node: 9,
				x: -200,
				y: 0,
				z: -100
			},
			{
				node: 10,
				x: -100,
				y: 100,
				z: -100
			},
			{
				node: 11,
				x: 0,
				y: 100,
				z: -100
			},
			{
				node: 12,
				x: 100,
				y: 100,
				z: -100
			},
			{
				node: 13,
				x: 200,
				y: 0,
				z: -100
			},
			{
				node: 14,
				x: 100,
				y: 0,
				z: -100
			},
			{
				node: 15,
				x: 0,
				y: 0,
				z: -100
			},
			{
				node: 16,
				x: -100,
				y: 0,
				z: -100
			},
			{
				node: '',
				x: '',
				y: '',
				z: ''
			}
		]
	};
	
	// Element connectivity
	store.connectivity = {
		data : [
			{
				Element: 1,
				nodei: 1,
				nodej: 2
			},
			{
				Element: 2,
				nodei: 2,
				nodej: 3
			},
			{
				Element: 3,
				nodei: 3,
				nodej: 4
			},
			{
				Element: 4,
				nodei: 4,
				nodej: 5
			},
			{
				Element: 5,
				nodei: 5,
				nodej: 6
			},
			{
				Element: 6,
				nodei: 6,
				nodej: 7
			},
			{
				Element: 7,
				nodei: 7,
				nodej: 8
			},
			{
				Element: 8,
				nodei: 8,
				nodej: 1
			},
			{
				Element: 9,
				nodei: 8,
				nodej: 3
			},
			{
				Element: 10,
				nodei: 2,
				nodej: 7
			},
			{
				Element: 11,
				nodei: 3,
				nodej: 6
			},
			{
				Element: 12,
				nodei: 7,
				nodej: 4
			},
			{
				Element: 13,
				nodei: 1,
				nodej: 9
			},
			{
				Element: 14,
				nodei: 2,
				nodej: 10
			},
			{
				Element: 15,
				nodei: 3,
				nodej: 11
			},
			{
				Element: 16,
				nodei: 4,
				nodej: 12
			},
			{
				Element: 17,
				nodei: 5,
				nodej: 13
			},
			{
				Element: 18,
				nodei: 6,
				nodej: 14
			},
			{
				Element: 19,
				nodei: 7,
				nodej: 15
			},
			{
				Element: 20,
				nodei: 8,
				nodej: 16
			},
			{
				Element: 21,
				nodei: 9,
				nodej: 10
			},
			{
				Element: 22,
				nodei: 10,
				nodej: 11
			},
			{
				Element: 23,
				nodei: 11,
				nodej: 12
			},
			{
				Element: 24,
				nodei: 12,
				nodej: 13
			},
			{
				Element: 25,
				nodei: 13,
				nodej: 14
			},
			{
				Element: 26,
				nodei: 14,
				nodej: 15
			},
			{
				Element: 27,
				nodei: 15,
				nodej: 16
			},
			{
				Element: 28,
				nodei: 16,
				nodej: 9
			},
			{
				Element: 29,
				nodei: 16,
				nodej: 11
			},
			{
				Element: 30,
				nodei: 10,
				nodej: 15
			},
			{
				Element: 31,
				nodei: 11,
				nodej: 14
			},
			{
				Element: 32,
				nodei: 15,
				nodej: 12
			},
			{
				Element: '',
				nodei: '',
				nodej: ''
			}
		]
	};
	
	// Support/boundary conditions
	store.support = {
		data : [
			{
				node: 1,
				constraint: 1
			},
			{
				node: 1,
				constraint: 2
			},
			{
				node: 1,
				constraint: 3
			},
			{
				node: 5,
				constraint: 1
			},
			{
				node: 5,
				constraint: 2
			},
			{
				node: 9,
				constraint: 1
			},
			{
				node: 9,
				constraint: 2
			},
			{
				node: 13,
				constraint: 1
			},
			{
				node: 13,
				constraint: 2
			},
			{
				node: '',
				constraint: ''
			}
		]
	};
	
	// External Input
	store.externalInput = {
		data : [
			{
				node: 2,
				fm: -50000,
				direction: 2
			},
			{
				node: 3,
				fm: -50000,
				direction: 2
			},
			{
				node: 15,
				fm: 50000,
				direction: 2
			},
			{
				node: '',
				fm: '',
				direction: ''
			}
		]
	};
}