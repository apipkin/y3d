YUI.add("y3d-geometry-base",function(e,t){var n=e.Lang;e.Geometry=e.Base.create("geometry",e.Base,[],{move:function(e,t,n){var r=this,i=r.get("matrix");mat4.translate(i,[e,t,n])},moveX:function(e){var t=this;t.move(e,0,0)},moveY:function(e){var t=this;t.move(0,e,0)},moveZ:function(e){var t=this;t.move(0,0,e)},rotate:function(e,t){var n=this,r=n.get("matrix"),i=0,s=0,o=0;e.indexOf("x")!==-1&&(i=1),e.indexOf("y")!==-1&&(s=1),e.indexOf("z")!==-1&&(o=1),mat4.rotate(r,t*(Math.PI/180),[i,s,o])},rotateX:function(e){var t=this;t.rotate("x",e)},rotateY:function(e){var t=this;t.rotate("y",e)},rotateZ:function(e){var t=this;t.rotate("z",e)},_generateId:function(){return Math.floor(Math.random()*16777215).toString(16)},_setColor:function(t){var r=this,i=r.get("vertices").length/3,s=[],o;n.isArray(t)&&t.length===3?t.push(1):n.isString(t)&&(t=e.Color.normalizedColorArray(t));for(o=0;o<i;o++)s=s.concat(t);return s},_setTexture:function(t){return n.isString(t)&&(t=new e.Texture({imageUrl:t})),t},_setXYZ:function(e){var t=this,n=mat4.create(),r=t.get("x"),i=t.get("y"),s=t.get("z");return mat4.identity(n),t.set("matrix",n),e===null&&(e=[r,i,s]),t.move(e[0],e[1],e[2]),e}},{ATTRS:{color:{value:"white",setter:"_setColor",validator:function(e){return n.isArray(e)||n.isString(e)}},id:{writeOnce:!0,valueFn:"_generateId"},indices:{value:[],validator:n.isArray},matrix:{value:null},normals:{value:[],validator:n.isArray},texture:{value:null,setter:"_setTexture"},textureCoordinates:{value:[],validator:n.isArray},vertices:{value:[],validator:n.isArray},x:{value:0},y:{value:0},z:{value:0},xyz:{lazyAdd:!1,setter:"_setXYZ",value:null,validator:n.isArray}}})},"0.1");