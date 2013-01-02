YUI.add('webgl-texture', function(Y) {
	var Lang = Y.Lang;

	Y.Texture = Y.Base.create('texture', Y.Base, [], {
	}, {
		ATTRS: {
			image: {
				value: new Image()
			},

			imageUrl: {
				value: '',
				validator: Lang.isString
			},

			webglTexture: {
				value: null
			}
		}
	});

	Y.TextureLoader = Y.Base.create('texture-loader', Y.Base, [], {
		initializer: function() {
			var instance = this,
				textures = instance.get('textures'),
				unloadedTextures = instance.get('unloadedTextures');

			for (var i = 0; i < textures.length; i++) {
				var texture = textures[i],
					image = texture.get('image'),
					imageUrl = texture.get('imageUrl');

				unloadedTextures[imageUrl] = texture;

				image.onload = function() {
					instance._onLoad(texture);
				};

				image.src = imageUrl;
			}
		},

		_isEmpty: function() {
			var instance = this,
				unloadedTextures = instance.get('unloadedTextures');

			for (var imageUrl in unloadedTextures) {
				if (unloadedTextures.hasOwnProperty(imageUrl)) {
					return false;
				}
			}

			return true;
		},

		_onLoad: function(texture) {
			var instance = this,
				imageUrl = texture.get('imageUrl'),
				onLoad = instance.get('onLoad'),
				unloadedTextures = instance.get('unloadedTextures');

			delete unloadedTextures[imageUrl];

			if (instance._isEmpty()) {
				onLoad();
			}
		}
	}, {
		ATTRS: {
			onLoad: {
				value: null
			},

			textures: {
				value: [],
				validator: Lang.isArray
			},

			unloadedTextures: {
				value: {}
			}
		}
	});
}, '1.0', {requires: ['base-build']});