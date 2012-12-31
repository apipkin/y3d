YUI.add('webgl-scene', function(Y) {
	var context = null;
	var program = null;

	Y.Scene = Y.Base.create('scene', Y.Base, [], {
		initializer: function() {
			var instance = this,
				canvas = instance.get('canvas'),
				container = instance.get('container'),
				height = instance.get('height'),
				width = instance.get('width');

			canvas.set('height', height);
			canvas.set('width', width);

			container.append(canvas);

			context = canvas.getDOMNode().getContext("experimental-webgl");
			program = Y.Shader.link(context);
		},

		addShape: function(shape) {
			var instance = this,
				shapes = instance.get('shapes');

			shape.bindBuffers(context);

			instance._bindVertexBuffer(shape);
			instance._bindTextureBuffer(shape);
			instance._bindIndexBuffer(shape);

			shapes.push(shape);
		},

		bindTexture: function(texture) {
			var image = texture.get('image'),
				webglTexture = texture.get('webglTexture');

			context.bindTexture(context.TEXTURE_2D, webglTexture);
			context.pixelStorei(context.UNPACK_FLIP_Y_WEBGL, true);
			context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, context.RGBA, context.UNSIGNED_BYTE, image);
			context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);
			context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
			context.bindTexture(context.TEXTURE_2D, null);
		},

		render: function() {
			var instance = this,
				clearColor = instance.get('clearColor'),
				height = instance.get('height'),
				width = instance.get('width');

			context.clearColor(clearColor[0], clearColor[1], clearColor[2], 1.0);
			context.enable(context.DEPTH_TEST);

			context.viewport(0, 0, width, height);
			context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);

			var projectionMatrix = mat4.create();

			mat4.perspective(45, width/height, 0.1, 100.0, projectionMatrix);

			var shapes = instance.get('shapes');

			for (var i = 0; i < shapes.length; i++) {
				var shape = shapes[i],
					indicesLength = shape.get('indices').length,
					modelViewMatrix = shape.get('modelViewMatrix');

				instance._setVertexAttribute(shape);

				context.bindBuffer(context.ARRAY_BUFFER, shape.colorBuffer);
				context.vertexAttribPointer(program.vertexColorAttribute, 4, context.FLOAT, false, 0, 0);

				instance._setTextureAttribute(shape);
				instance._setIndices(shape);

				context.uniformMatrix4fv(program.projectionMatrixUniform, false, projectionMatrix);
				context.uniformMatrix4fv(program.modelViewMatrixUniform, false, modelViewMatrix);

				context.drawElements(context.TRIANGLES, indicesLength, context.UNSIGNED_SHORT, 0);
			}
		},

		_bindIndexBuffer: function(shape) {
			var indexBuffer = context.createBuffer(),
				indices = shape.get('indices');

			context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, indexBuffer);
			context.bufferData(context.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), context.STATIC_DRAW);

			shape.set('indexBuffer', indexBuffer)
		},

		_bindTextureBuffer: function(shape) {
			var instance = this,
				texture = shape.get('texture'),
				textureBuffer = context.createBuffer(),
				textureCoordinates = shape.get('textureCoordinates');

			context.bindBuffer(context.ARRAY_BUFFER, textureBuffer);
			context.bufferData(context.ARRAY_BUFFER, new Float32Array(textureCoordinates), context.STATIC_DRAW);

			shape.set('textureBuffer', textureBuffer);

			var webglTexture = context.createTexture();

			texture.set('webglTexture', webglTexture);
		},

		_bindVertexBuffer: function(shape) {
			var vertexBuffer = context.createBuffer(),
				vertices = shape.get('vertices');

			context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer);
			context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices), context.STATIC_DRAW);

			shape.set('vertexBuffer', vertexBuffer);
		},

		_setIndices: function(shape) {
			var indexBuffer = shape.get('indexBuffer');

			context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, indexBuffer);
		},

		_setTextureAttribute: function(shape) {
			var texture = shape.get('texture'),
				textureBuffer = shape.get('textureBuffer'),
				webglTexture = texture.get('webglTexture');

			context.bindBuffer(context.ARRAY_BUFFER, textureBuffer);
			context.vertexAttribPointer(program.textureCoordinatesAttribute, 2, context.FLOAT, false, 0, 0);

			context.activeTexture(context.TEXTURE0);
			context.bindTexture(context.TEXTURE_2D, webglTexture);
			context.uniform1i(program.sampler, 0);
		},

		_setVertexAttribute: function(shape) {
			var vertexBuffer = shape.get('vertexBuffer');

			context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer);
			context.vertexAttribPointer(program.vertexPositionAttribute, 3, context.FLOAT, false, 0, 0);
		}
	}, {
		ATTRS: {
			canvas: {
				value: Y.Node.create('<canvas></canvas>')
			},

			clearColor: {
				value: [0.0, 0.0, 0.0]
			},

			container: {
				value: Y.Node.one('#container')
			},

			height: {
				value: 800
			},

			shapes: {
				value: []
			},

			width: {
				value: 1000
			}
		}
	});
}, '1.0', {requires: ['base-build', 'node-base', 'webgl-shader']});