YUI.add("y3d-picker-plugin",function(e,t){function n(){n.superclass.constructor.apply(this,arguments)}n.NAME="picker",n.NS="picker",n.ATTRS={},e.extend(n,e.Plugin.Base,{frameBuffer:null,initializer:function(){this.afterHostMethod("addGeometry",this._afterAddGeometry),this.beforeHostMethod("render",this._beforeRender)},pick:function(e,t){var n=this,r=n.get("host"),i=r.context,s=r.get("geometries"),o=new Uint8Array(4),u;return n._bindFrameBuffer(),i.readPixels(e,t,1,1,i.RGBA,i.UNSIGNED_BYTE,o),n._unbindFrameBuffer(),u=o[0].toString(16)+o[1].toString(16)+o[2].toString(16),s[u]},_afterAddGeometry:function(e){var t=this,n=t.get("host"),r=n.context,i=e.get("id"),s=e._setColor(i);n._loadBufferData(e,r.ARRAY_BUFFER,new Float32Array(s),"pickerColorBuffer")},_beforeRender:function(){var e=this;e._bindFrameBuffer(),e._render(),e._unbindFrameBuffer()},_bindFrameBuffer:function(){var e=this,t=e.get("host"),n=t.context,r=e.frameBuffer,i,s,o,u;r||(i=t.get("height"),s=n.createRenderbuffer(),o=n.createTexture(),u=t.get("width"),n.bindTexture(n.TEXTURE_2D,o),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,u,i,0,n.RGBA,n.UNSIGNED_BYTE,null),n.bindRenderbuffer(n.RENDERBUFFER,s),n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_COMPONENT16,u,i),n.bindRenderbuffer(n.RENDERBUFFER,null),r=n.createFramebuffer(),n.bindFramebuffer(n.FRAMEBUFFER,r),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,o,0),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,s),n.bindTexture(n.TEXTURE_2D,null),e.frameBuffer=r),n.bindFramebuffer(n.FRAMEBUFFER,r)},_render:function(){var t=this,n=t.get("host"),r=n.context,i=n._createProjectionMatrix(),s=n.get("geometries");n._clearColor(),n._enableDepthTest(),e.each(s,function(e){var t=n._getProgram(e);r.useProgram(t),n._setVertexAttribute(e.pickerColorBuffer,t.vertexColorAttribute,4),n._setVertexAttribute(e.normalsBuffer,t.vertexNormalAttribute,3),n._setVertexAttribute(e.verticesBuffer,t.vertexPositionAttribute,3),n._setUniforms(t,e,i),n._drawGeometry(e),n._unbindBuffers()})},_unbindFrameBuffer:function(){var e=this,t=e.get("host"),n=t.context;n.bindFramebuffer(n.FRAMEBUFFER,null)}}),e.namespace("Plugin").Picker=n},"0.1",{requires:["plugin"]});
