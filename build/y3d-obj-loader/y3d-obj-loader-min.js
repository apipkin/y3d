YUI.add("y3d-obj-loader",function(e,t){var n=e.Lang;e.ObjLoader=e.Base.create("obj-loader",e.Base,[],{load:function(){var e=this,t=e.get("geometry"),n=t.get("normals"),r=e.get("src"),i=r.split("\n"),s,o,u;for(s=0;s<i.length;s++)o=i[s].trim(),u=o.split(/\s+/),o.indexOf("f ")===0?e._parseFace(t,u):o.indexOf("v ")===0&&e._parseVertice(t,u);for(s=0;s<t.get("vertices").length/3;s++)n.push(0,1,0);return t.set("color","white"),t},_parseFace:function(e,t){var n=this,r=e.get("indices"),i=n._parseIndex(t[1]),s=n._parseIndex(t[2]),o=n._parseIndex(t[3]),u;t.length===4?r.push(i,s,o):t.length===5&&(u=n._parseIndex(t[4]),r.push(i,s,o,i,o,u))},_parseIndex:function(e){var t=e.split(/\//)[0];return t=parseInt(t,10)-1,t},_parseVertice:function(e,t){var n=e.get("vertices"),r=parseFloat(t[1],10),i=parseFloat(t[2],10),s=parseFloat(t[3],10);n.push(r,i,s)}},{ATTRS:{geometry:{value:new e.Geometry},src:{value:"",validator:n.isString}}})},"0.1",{requires:["y3d-geometry-base"]});
