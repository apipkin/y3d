YUI.add('webgl-shape', function(Y) {
	var Lang = Y.Lang;

	Y.Shape = Y.Base.create('shape', Y.Base, [], {
		colorBuffer: null,
		indexBuffer: null,
		vertexBuffer: null,

		bindBuffers: function(context) {
			var instance = this,
				vertices = instance.get('vertices'),
				colors = instance.get('colors'),
				indices = instance.get('indices');

			instance.vertexBuffer = context.createBuffer();

			context.bindBuffer(context.ARRAY_BUFFER, instance.vertexBuffer);
			context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices), context.STATIC_DRAW);
		
			instance.colorBuffer = context.createBuffer();

			context.bindBuffer(context.ARRAY_BUFFER, instance.colorBuffer);
			context.bufferData(context.ARRAY_BUFFER, new Float32Array(colors), context.STATIC_DRAW);

			instance.indexBuffer = context.createBuffer();
			
			context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, instance.indexBuffer);
			context.bufferData(context.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), context.STATIC_DRAW);
		}
	}, {
		ATTRS: {
			colors: {
				value: [
					1.0, 0.0, 0.0, 1.0,
					1.0, 0.0, 0.0, 1.0,
					1.0, 0.0, 0.0, 1.0,
					1.0, 0.0, 0.0, 1.0,
					1.0, 0.0, 0.0, 1.0,
					1.0, 0.0, 0.0, 1.0,
					1.0, 0.0, 0.0, 1.0,
					1.0, 0.0, 0.0, 1.0
				]
			},

			indices: {
				value: [],
				validator: Lang.isArray
			},

			vertices: {
				value: [],
				validator: Lang.isArray
			}
		}
	});

	Y.Cube = Y.Base.create('cube', Y.Shape, [], {
	}, {
		ATTRS: {
			indices: {
				value: [
					// Front
					0, 1, 2,
					2, 3, 0,
					// Back
					4, 6, 5,
					4, 7, 6,
					// Left
					2, 7, 3,
					7, 6, 2,
					// Right
					0, 4, 1,
					4, 1, 5,
					// Top
					6, 2, 1,
					1, 6, 5,
					// Bottom
					0, 3, 7,
					0, 7, 4
				]
			},

			vertices: {
				value: [
					// Front
					1.0, -1.0,  1.0,
					1.0,  1.0,  1.0,
					-1.0,  1.0,  1.0,
					-1.0, -1.0,  1.0,

					// Back
					1.0, -1.0, -1.0,
					1.0, 1.0, -1.0,
					-1.0, 1.0, -1.0,
					-1.0, -1.0, -1.0
				]
			}
		}
	});
}, '1.0', {requires: ['base-build']});