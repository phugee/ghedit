var __extends=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)},__decorate=this&&this.__decorate||function(e,t,r,o){var i,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,o);else for(var c=e.length-1;c>=0;c--)(i=e[c])&&(s=(n<3?i(s):n>3?i(t,r,s):i(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s},__param=this&&this.__param||function(e,t){return function(r,o){t(r,o,e)}};define(["require","exports","vs/base/common/eventEmitter","vs/base/common/winjs.base","vs/platform/instantiation/common/descriptors","vs/platform/instantiation/common/instantiation","vs/platform/configuration/common/configuration","vs/editor/common/modes","vs/editor/common/modes/supports/suggestSupport","vs/editor/common/services/editorWorkerService","vs/editor/common/model/wordHelper"],function(e,t,r,o,i,n,s,c,a,u,d){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function p(e){return void 0===e&&(e=""),d.createWordRegExp(e)}function h(){return{tokenizationSupport:!0}}t.createWordRegExp=p;var m=function(){function e(e,t,r,o,n){this._descriptor=e,this._workerDescriptor=i.createAsyncDescriptor1(t,r),this._superWorkerModuleId=o,this._instantiationService=n,this._workerPiecePromise=null}return e.prototype.worker=function(e){return this._getOrCreateWorker().then(e)},e.prototype._getOrCreateWorker=function(){var t=this;if(!this._workerPiecePromise){var r=this._superWorkerModuleId?e._loadModule(this._superWorkerModuleId):o.TPromise.as(null);this._workerPiecePromise=r.then(function(){return e._loadModule(t._workerDescriptor.moduleName)}).then(function(){return t._instantiationService.createInstance(t._workerDescriptor,t._descriptor.id)})}return this._workerPiecePromise},e._loadModule=function(e){return new o.TPromise(function(t,r,o){self.require([e],t,r)},function(){})},e}();t.ModeWorkerManager=m;var f=function(){function e(e){this._modeId=e,this._eventEmitter=new r.EventEmitter,this._simplifiedMode=null}return e.prototype.getId=function(){return this._modeId},e.prototype.toSimplifiedMode=function(){return this._simplifiedMode||(this._simplifiedMode=new l(this)),this._simplifiedMode},e.prototype.addSupportChangedListener=function(e){return this._eventEmitter.addListener2("modeSupportChanged",e)},e.prototype.setTokenizationSupport=function(e){var t=this,r=e(this);return this.tokenizationSupport=r,this._eventEmitter.emit("modeSupportChanged",h()),{dispose:function(){t.tokenizationSupport===r&&(delete t.tokenizationSupport,t._eventEmitter.emit("modeSupportChanged",h()))}}},e}();t.AbstractMode=f;var _=function(e){function t(t,r){e.call(this,t),this.compatWorkerService=r,this.compatWorkerService&&this.compatWorkerService.registerCompatMode(this)}return __extends(t,e),t}(f);t.CompatMode=_;var l=function(){function e(e){var t=this;this._sourceMode=e,this._eventEmitter=new r.EventEmitter,this._id="vs.editor.modes.simplifiedMode:"+e.getId(),this._assignSupports(),this._sourceMode.addSupportChangedListener&&this._sourceMode.addSupportChangedListener(function(e){t._assignSupports(),t._eventEmitter.emit("modeSupportChanged",e)})}return e.prototype.getId=function(){return this._id},e.prototype.toSimplifiedMode=function(){return this},e.prototype._assignSupports=function(){this.tokenizationSupport=this._sourceMode.tokenizationSupport},e}();t.isDigit=function(){var e="0".charCodeAt(0),t="1".charCodeAt(0),r="2".charCodeAt(0),o="3".charCodeAt(0),i="4".charCodeAt(0),n="5".charCodeAt(0),s="6".charCodeAt(0),c="7".charCodeAt(0),a="8".charCodeAt(0),u="9".charCodeAt(0),d="a".charCodeAt(0),p="b".charCodeAt(0),h="c".charCodeAt(0),m="d".charCodeAt(0),f="e".charCodeAt(0),_="f".charCodeAt(0),l="A".charCodeAt(0),v="B".charCodeAt(0),C="C".charCodeAt(0),g="D".charCodeAt(0),S="E".charCodeAt(0),k="F".charCodeAt(0);return function(A,M){var w=A.charCodeAt(0);switch(M){case 1:return w===e;case 2:return w>=e&&w<=t;case 3:return w>=e&&w<=r;case 4:return w>=e&&w<=o;case 5:return w>=e&&w<=i;case 6:return w>=e&&w<=n;case 7:return w>=e&&w<=s;case 8:return w>=e&&w<=c;case 9:return w>=e&&w<=a;case 10:return w>=e&&w<=u;case 11:return w>=e&&w<=u||w===d||w===l;case 12:return w>=e&&w<=u||w>=d&&w<=p||w>=l&&w<=v;case 13:return w>=e&&w<=u||w>=d&&w<=h||w>=l&&w<=C;case 14:return w>=e&&w<=u||w>=d&&w<=m||w>=l&&w<=g;case 15:return w>=e&&w<=u||w>=d&&w<=f||w>=l&&w<=S;default:return w>=e&&w<=u||w>=d&&w<=_||w>=l&&w<=k}}}();var v=function(e){function t(t,r,o){e.call(this,t.id),o&&c.SuggestRegistry.register(this.getId(),new a.TextualSuggestSupport(o,r),!0)}return __extends(t,e),t=__decorate([__param(1,s.IConfigurationService),__param(2,n.optional(u.IEditorWorkerService))],t)}(f);t.FrankensteinMode=v});