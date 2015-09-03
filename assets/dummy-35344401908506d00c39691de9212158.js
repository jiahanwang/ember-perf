"use strict";define("dummy/app",["exports","ember","ember/resolver","ember/load-initializers","dummy/config/environment"],function(e,t,n,a,r){var i=void 0;t["default"].MODEL_FACTORY_INJECTIONS=!0,i=t["default"].Application.extend({modulePrefix:r["default"].modulePrefix,podModulePrefix:r["default"].podModulePrefix,Resolver:n["default"]}),a["default"](i,r["default"].modulePrefix),e["default"]=i}),define("dummy/components/app-version",["exports","ember-cli-app-version/components/app-version","dummy/config/environment"],function(e,t,n){var a=n["default"].APP,r=a.name,i=a.version;e["default"]=t["default"].extend({version:i,name:r})}),define("dummy/controllers/array",["exports","ember"],function(e,t){e["default"]=t["default"].Controller}),define("dummy/controllers/object",["exports","ember"],function(e,t){e["default"]=t["default"].Controller}),define("dummy/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","dummy/config/environment"],function(e,t,n){var a=n["default"].APP,r=a.name,i=a.version;e["default"]={name:"App Version",initialize:t["default"](r,i)}}),define("dummy/initializers/ember-perf",["exports","ember-perf/services/ember-perf","ember-perf/ext/router","ember-perf/ext/route","dummy/config/environment"],function(e,t,n,a,r){function i(e,n,a){var r=e.injectionFactories;a.register("config:ember-perf",e,{instantiate:!1}),a.register("service:ember-perf",t["default"]),a.inject("service:ember-perf","defaults","config:ember-perf"),r.forEach(function(e){a.inject(e,"perfService","service:ember-perf")})}function l(){var e=arguments[1]||arguments[0],t=e.__container__,l=r["default"].emberPerf;i(l,t,e),d.reopen(a["default"]),u.reopen(n["default"]),Ember.subscribe("render",{before:function(e,n,a){t.lookup("service:ember-perf").renderBefore(e,n,a)},after:function(e,n,a){t.lookup("service:ember-perf").renderAfter(e,n,a)}})}e.initialize=l;var o=Ember,u=o.Router,d=o.Route;e["default"]={name:"ember-perf",initialize:l}}),define("dummy/initializers/export-application-global",["exports","ember","dummy/config/environment"],function(e,t,n){function a(e,a){if(n["default"].exportApplicationGlobal!==!1){var r,i=n["default"].exportApplicationGlobal;r="string"==typeof i?i:t["default"].String.classify(n["default"].modulePrefix),window[r]||(window[r]=a,a.reopen({willDestroy:function(){this._super.apply(this,arguments),delete window[r]}}))}}e.initialize=a,e["default"]={name:"export-application-global",initialize:a}}),define("dummy/models/building",["exports","ember-data"],function(e,t){var n=t["default"].belongsTo,a=t["default"].hasMany,r=t["default"].attr;e["default"]=t["default"].Model.extend({name:r("string"),company:n("company"),floors:a("floor")})}),define("dummy/models/company",["exports","ember-data"],function(e,t){var n=t["default"].hasMany,a=t["default"].attr;e["default"]=t["default"].Model.extend({name:a("string"),buildings:n("building")})}),define("dummy/router",["exports","ember","dummy/config/environment"],function(e,t,n){function a(e,t){return l?e+"."+t:t}var r=/^([0-9]+)\.([0-9]+)\.([0-9]+)(?:(?:\-(alpha|beta)\.([0-9]+)(?:\.([0-9]+))?)?)?(?:\+(canary))?(?:\.([0-9abcdef]+))?(?:\-([A-Za-z0-9\.\-]+))?(?:\+([A-Za-z0-9\.\-]+))?$/,i=r.exec(t["default"].VERSION),l=parseInt(i[1],10)<2&&parseInt(i[2],10)<7,o=l?"resource":"route",u=t["default"].Router.extend({location:n["default"].locationType});u.map(function(){this[o]("companies",function(){this.route("info")}),this[o]("company",{path:"company/:id"},function(){this[o](a("company","buildings"),{path:"buildings"}),this[o](a("company","building"),{path:"building/:building_id"},function(){this.route("floors"),this.route("floor",{path:"floor/:id"})})})}),e["default"]=u}),define("dummy/routes/base",["exports","ember"],function(e,t){e["default"]=t["default"].Route.extend({})}),define("dummy/routes/companies",["exports","ember","dummy/utils/random-wait","dummy/utils/sample-data","dummy/routes/base"],function(e,t,n,a,r){e["default"]=r["default"].extend({model:function(){return n["default"](t["default"].testing?4:3e3,t["default"].testing?2:300).then(function(){return t["default"].A(a.COMPANIES)})}})}),define("dummy/routes/companies/info",["exports","dummy/routes/base"],function(e,t){e["default"]=t["default"].extend({})}),define("dummy/routes/company",["exports","ember","dummy/routes/base","dummy/utils/random-wait","dummy/utils/sample-data"],function(e,t,n,a,r){var i=t["default"].A;e["default"]=n["default"].extend({model:function(e){return a["default"](t["default"].testing?4:3e3,t["default"].testing?2:300).then(function(){var t=new i(r.COMPANIES).findBy("id",parseInt(e.id,10));return t.buildingIds=new i(t.buildings.map(function(e){return{id:e,name:"Building ("+e+")"}})),t})}})}),define("dummy/routes/company/building",["exports","ember","dummy/utils/random-wait","dummy/utils/sample-data"],function(e,t,n,a){e["default"]=t["default"].Route.extend({model:function(e){var r=t["default"].get(this.modelFor("company"),"buildings");return r.indexOf(parseInt(e.building_id,10))<0?null:n["default"](t["default"].testing?4:2400,t["default"].testing?2:300).then(function(){return a.BUILDINGS.filter(function(t){return""+t.id===e.building_id})[0]})}})}),define("dummy/routes/company/buildings",["exports","ember","dummy/utils/random-wait","dummy/utils/sample-data"],function(e,t,n,a){e["default"]=t["default"].Route.extend({model:function(){var e=t["default"].get(this.modelFor("company"),"buildings");return n["default"](t["default"].testing?4:2400,t["default"].testing?2:300).then(function(){return t["default"].A(a.BUILDINGS.filter(function(t){return e.indexOf(t.id)>=0}))})}})}),define("dummy/routes/company/index",["exports","ember"],function(e,t){e["default"]=t["default"].Route.extend({redirect:function(){this.transitionTo("company.buildings")}})}),define("dummy/routes/index",["exports","dummy/routes/base"],function(e,t){e["default"]=t["default"].extend({redirect:function(){this.transitionTo("companies")}})}),define("dummy/services/ember-perf",["exports","ember-perf/services/ember-perf"],function(e,t){e["default"]=t["default"]}),define("dummy/templates/application",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:1,column:0},end:{line:3,column:10}},moduleName:"dummy/templates/application.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("h2");e.setAttribute(n,"id","title");var a=e.createTextNode("Ember.js Performance Instrumentation");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(t,2,2,n),e.insertBoundary(t,null),a},statements:[["content","outlet",["loc",[null,[3,0],[3,10]]]]],locals:[],templates:[]}}())}),define("dummy/templates/companies",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:1,column:0},end:{line:3,column:10}},moduleName:"dummy/templates/companies.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(2);return a[0]=e.createMorphAt(t,0,0,n),a[1]=e.createMorphAt(t,2,2,n),e.insertBoundary(t,0),e.insertBoundary(t,null),a},statements:[["inline","view",["items-list"],["class","companies-list","content",["subexpr","@mut",[["get","content",["loc",[null,[1,51],[1,58]]]]],[],[]],"itemClass","company","itemRoute","company"],["loc",[null,[1,0],[1,100]]]],["content","outlet",["loc",[null,[3,0],[3,10]]]]],locals:[],templates:[]}}())}),define("dummy/templates/companies/info",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:1,column:0},end:{line:1,column:13}},moduleName:"dummy/templates/companies/info.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("h4"),a=e.createTextNode("Info");return e.appendChild(n,a),e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}())}),define("dummy/templates/company",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:2,column:2},end:{line:4,column:2}},moduleName:"dummy/templates/company.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("    < Back to Companies\n");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}();return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:1,column:0},end:{line:11,column:10}},moduleName:"dummy/templates/company.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("p"),a=e.createTextNode("\n");e.appendChild(n,a);var a=e.createComment("");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createElement("h2"),a=e.createComment("");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createElement("p"),a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createComment("");e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(4);return a[0]=e.createMorphAt(e.childAt(t,[0]),1,1),a[1]=e.createMorphAt(e.childAt(t,[2]),0,0),a[2]=e.createMorphAt(e.childAt(t,[4]),1,1),a[3]=e.createMorphAt(t,6,6,n),e.insertBoundary(t,null),a},statements:[["block","link-to",["companies.info"],[],0,null,["loc",[null,[2,2],[4,14]]]],["content","content.name",["loc",[null,[6,4],[6,20]]]],["inline","view",["items-list"],["class","building-ids-list horiz-list","content",["subexpr","@mut",[["get","content.buildingIds",["loc",[null,[8,67],[8,86]]]]],[],[]],"itemClass","building-id","itemRoute","company.building"],["loc",[null,[8,2],[8,141]]]],["content","outlet",["loc",[null,[11,0],[11,10]]]]],locals:[],templates:[e]}}())}),define("dummy/templates/company/building",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:1,column:0},end:{line:4,column:0}},moduleName:"dummy/templates/company/building.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createElement("h4"),a=e.createTextNode("Building: ");e.appendChild(n,a);var a=e.createComment("");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(2);return a[0]=e.createMorphAt(t,0,0,n),a[1]=e.createMorphAt(e.childAt(t,[2]),1,1),e.insertBoundary(t,0),a},statements:[["inline","link-to",["< Back to company","company",["get","content.companyId",["loc",[null,[2,40],[2,57]]]]],["class","back-to-company"],["loc",[null,[2,0],[2,83]]]],["content","content.name",["loc",[null,[3,14],[3,30]]]]],locals:[],templates:[]}}(),t=function(){return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:4,column:0},end:{line:6,column:0}},moduleName:"dummy/templates/company/building.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("h1"),a=e.createTextNode("Building not found");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}();return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:1,column:0},end:{line:6,column:7}},moduleName:"dummy/templates/company/building.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),e.insertBoundary(t,null),a},statements:[["block","if",[["get","content",["loc",[null,[1,6],[1,13]]]]],[],0,1,["loc",[null,[1,0],[6,7]]]]],locals:[],templates:[e,t]}}())}),define("dummy/templates/company/buildings",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:1,column:0},end:{line:4,column:10}},moduleName:"dummy/templates/company/buildings.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("h3"),a=e.createTextNode("Buildings");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(2);return a[0]=e.createMorphAt(t,2,2,n),a[1]=e.createMorphAt(t,4,4,n),e.insertBoundary(t,null),a},statements:[["inline","view",["items-list"],["class","buildings-list","content",["subexpr","@mut",[["get","content",["loc",[null,[2,51],[2,58]]]]],[],[]],"itemClass","building","itemRoute","company.building"],["loc",[null,[2,0],[2,110]]]],["content","outlet",["loc",[null,[4,0],[4,10]]]]],locals:[],templates:[]}}())}),define("dummy/templates/company/loading",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:1,column:0},end:{line:2,column:12}},moduleName:"dummy/templates/company/loading.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("h4"),a=e.createTextNode("Company data is loading...");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(t,2,2,n),e.insertBoundary(t,null),a},statements:[["content","my-thing",["loc",[null,[2,0],[2,12]]]]],locals:[],templates:[]}}())}),define("dummy/templates/components/my-thing",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:1,column:0},end:{line:2,column:0}},moduleName:"dummy/templates/components/my-thing.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("This is a useless component\n");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}())}),define("dummy/templates/items-list-item",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:1,column:0},end:{line:3,column:0}},moduleName:"dummy/templates/items-list-item.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),a},statements:[["content","view.content.name",["loc",[null,[2,0],[2,21]]]]],locals:[],templates:[]}}();return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:1,column:0},end:{line:3,column:12}},moduleName:"dummy/templates/items-list-item.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),e.insertBoundary(t,null),a},statements:[["block","link-to",[["get","view.itemRoute",["loc",[null,[1,11],[1,25]]]],["get","view.content.id",["loc",[null,[1,26],[1,41]]]]],[],0,null,["loc",[null,[1,0],[3,12]]]]],locals:[],templates:[e]}}())}),define("dummy/templates/loading",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:1,column:0},end:{line:2,column:12}},moduleName:"dummy/templates/loading.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("h3"),a=e.createTextNode("loading...");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(t,2,2,n),e.insertBoundary(t,null),a},statements:[["content","my-thing",["loc",[null,[2,0],[2,12]]]]],locals:[],templates:[]}}())}),define("dummy/utils/performance",["exports","ember-perf/utils/performance-now"],function(e,t){e["default"]=t["default"]}),define("dummy/utils/random-wait",["exports","ember"],function(e,t){e["default"]=function(){var e=arguments.length<=0||void 0===arguments[0]?2e3:arguments[0],n=arguments.length<=1||void 0===arguments[1]?0:arguments[1];return new t["default"].RSVP.Promise(function(t){var a=n+Math.random()*(e-n);setTimeout(t,a)})}}),define("dummy/utils/sample-data",["exports"],function(e){function t(e){var t={name:e,id:a.building++,companyId:this.company.id};r.push(t),this.company.buildings.push(t.id)}function n(e,n){var r={name:e,buildings:[],id:a.company++};i.push(r);var l={company:r};l.building=t.bind(l),n.apply(l)}var a={company:1,building:1},r=[],i=[];n("Yahoo",function(){this.building("Yahoo - Building A"),this.building("Yahoo - Building B"),this.building("Yahoo - Building C"),this.building("Yahoo - Building D")}),n("Flurry",function(){this.building("Flurry HQ")}),n("Tumblr",function(){this.building("Tumblr HQ")}),e.BUILDINGS=r,e.COMPANIES=i}),define("dummy/views/items-list",["exports","ember"],function(e,t){var n=t["default"].CollectionView,a=t["default"].View,r=t["default"].computed;e["default"]=n.extend({tagName:"ul",itemViewClass:a.extend({classNameBindings:["parentView.itemClass"],itemRoute:r.alias("parentView.itemRoute"),templateName:"items-list-item"})})}),define("dummy/config/environment",["ember"],function(e){var t="dummy";try{var n=t+"/config/environment",a=e["default"].$('meta[name="'+n+'"]').attr("content"),r=JSON.parse(unescape(a));return{"default":r}}catch(i){throw new Error('Could not read config from meta tag with name "'+n+'".')}}),runningTests?require("dummy/tests/test-helper"):require("dummy/app")["default"].create({LOG_TRANSITIONS:!0,LOG_TRANSITIONS_INTERNAL:!0,name:"ember-perf",version:"0.0.9+ec243394"});