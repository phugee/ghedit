/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate=this&&this.__decorate||function(t,e,i,o){var r,n=arguments.length,s=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var u=t.length-1;u>=0;u--)(r=t[u])&&(s=(n<3?r(s):n>3?r(e,i,s):r(e,i))||s);return n>3&&s&&Object.defineProperty(e,i,s),s},__param=this&&this.__param||function(t,e){return function(i,o){e(i,o,t)}};define(["require","exports","vs/base/common/event","vs/workbench/common/editor","vs/platform/storage/common/storage","vs/platform/instantiation/common/instantiation","vs/platform/configuration/common/configuration","vs/platform/lifecycle/common/lifecycle","vs/workbench/services/workspace/common/contextService","vs/base/common/lifecycle","vs/platform/platform","vs/platform/editor/common/editor","vs/workbench/common/editor/diffEditorInput"],function(t,e,i,o,r,n,s,u,p,d,h,c,a){"use strict";var f=function(){function t(e,o,r){this.instantiationService=o,this.configurationService=r,this._id=t.IDS++,this.editors=[],this.mru=[],this.toDispose=[],this.mapResourceToEditorCount=Object.create(null),this.onConfigurationUpdated(r.getConfiguration()),this._onEditorActivated=new i.Emitter,this._onEditorOpened=new i.Emitter,this._onEditorClosed=new i.Emitter,this._onEditorDisposed=new i.Emitter,this._onEditorDirty=new i.Emitter,this._onEditorMoved=new i.Emitter,this._onEditorPinned=new i.Emitter,this._onEditorUnpinned=new i.Emitter,this._onEditorStateChanged=new i.Emitter,this._onEditorsStructureChanged=new i.Emitter,this.toDispose.push(this._onEditorActivated,this._onEditorOpened,this._onEditorClosed,this._onEditorDisposed,this._onEditorDirty,this._onEditorMoved,this._onEditorPinned,this._onEditorUnpinned,this._onEditorStateChanged,this._onEditorsStructureChanged),"object"==typeof e?this.deserialize(e):this._label=e,this.registerListeners()}return t.prototype.registerListeners=function(){var t=this;this.toDispose.push(this.configurationService.onDidUpdateConfiguration(function(e){return t.onConfigurationUpdated(e.config)}))},t.prototype.onConfigurationUpdated=function(t){this.editorOpenPositioning=t.workbench.editor.openPositioning},Object.defineProperty(t.prototype,"id",{get:function(){return this._id},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"label",{get:function(){return this._label},set:function(t){this._label=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"count",{get:function(){return this.editors.length},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onEditorActivated",{get:function(){return this._onEditorActivated.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onEditorOpened",{get:function(){return this._onEditorOpened.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onEditorClosed",{get:function(){return this._onEditorClosed.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onEditorDisposed",{get:function(){return this._onEditorDisposed.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onEditorDirty",{get:function(){return this._onEditorDirty.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onEditorMoved",{get:function(){return this._onEditorMoved.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onEditorPinned",{get:function(){return this._onEditorPinned.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onEditorUnpinned",{get:function(){return this._onEditorUnpinned.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onEditorStateChanged",{get:function(){return this._onEditorStateChanged.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onEditorsStructureChanged",{get:function(){return this._onEditorsStructureChanged.event},enumerable:!0,configurable:!0}),t.prototype.getEditors=function(t){return t?this.mru.slice(0):this.editors.slice(0)},t.prototype.getEditor=function(t){return this.editors[t]},Object.defineProperty(t.prototype,"activeEditor",{get:function(){return this.active},enumerable:!0,configurable:!0}),t.prototype.isActive=function(t){return this.matches(this.active,t)},Object.defineProperty(t.prototype,"previewEditor",{get:function(){return this.preview},enumerable:!0,configurable:!0}),t.prototype.isPreview=function(t){return this.matches(this.preview,t)},t.prototype.openEditor=function(t,e){var i=this.indexOf(t),r=e&&e.pinned,n=e&&e.active||!this.activeEditor||!r&&this.matches(this.preview,this.activeEditor);if(i===-1){var s=void 0,u=this.indexOf(this.active);if(s=e&&"number"==typeof e.index?e.index:this.editorOpenPositioning===o.EditorOpenPositioning.FIRST?0:this.editorOpenPositioning===o.EditorOpenPositioning.LAST?this.editors.length:this.editorOpenPositioning===o.EditorOpenPositioning.LEFT?0!==u&&this.editors.length?u:0:u+1,!r&&this.preview||this.splice(s,!1,t),!r){if(this.preview){var p=this.indexOf(this.preview);s>p&&s--,this.closeEditor(this.preview,!n),this.splice(s,!1,t)}this.preview=t}this.hookEditorListeners(t),this.fireEvent(this._onEditorOpened,t,!0),n&&this.setActive(t)}else r&&this.pin(t),n&&this.setActive(t),e&&"number"==typeof e.index&&this.moveEditor(t,e.index)},t.prototype.hookEditorListeners=function(t){var e=this,i=[];i.push(t.addOneTimeDisposableListener("dispose",function(){e.indexOf(t)>=0&&e._onEditorDisposed.fire(t)})),i.push(t.onDidChangeDirty(function(){e.fireEvent(e._onEditorDirty,t,!1)})),i.push(this.onEditorClosed(function(e){e.editor.matches(t)&&d.dispose(i)}))},t.prototype.closeEditor=function(t,e){void 0===e&&(e=!0);var i=this.indexOf(t);if(i!==-1){e&&this.matches(this.active,t)&&(this.mru.length>1?this.setActive(this.mru[1]):this.active=null);var o=!0;this.matches(this.preview,t)&&(this.preview=null,o=!1),this.splice(i,!0),this.fireEvent(this._onEditorClosed,{editor:t,pinned:o},!0)}},t.prototype.closeEditors=function(t,e){var i=this,o=this.indexOf(t);if(o!==-1)if(e===c.Direction.LEFT)for(var r=o-1;r>=0;r--)this.closeEditor(this.editors[r]);else if(e===c.Direction.RIGHT)for(var r=this.editors.length-1;r>o;r--)this.closeEditor(this.editors[r]);else this.mru.filter(function(e){return!i.matches(e,t)}).forEach(function(t){return i.closeEditor(t)})},t.prototype.closeAllEditors=function(){var t=this;this.mru.filter(function(e){return!t.matches(e,t.active)}).forEach(function(e){return t.closeEditor(e)}),this.closeEditor(this.active)},t.prototype.moveEditor=function(t,e){var i=this.indexOf(t);i<0||(this.editors.splice(i,1),this.editors.splice(e,0,t),this.fireEvent(this._onEditorMoved,t,!0))},t.prototype.setActive=function(t){var e=this.indexOf(t);e!==-1&&(this.matches(this.active,t)||(this.active=t,this.setMostRecentlyUsed(t),this.fireEvent(this._onEditorActivated,t,!1)))},t.prototype.pin=function(t){var e=this.indexOf(t);e!==-1&&this.isPreview(t)&&(this.preview=null,this.fireEvent(this._onEditorPinned,t,!1))},t.prototype.unpin=function(t){var e=this.indexOf(t);if(e!==-1&&this.isPinned(t)){var i=this.preview;this.preview=t,this.fireEvent(this._onEditorUnpinned,t,!1),this.closeEditor(i)}},t.prototype.isPinned=function(t){var e=this.indexOf(t);return e!==-1&&(!this.preview||!this.matches(this.preview,t))},t.prototype.fireEvent=function(t,e,i){t.fire(e),i?this._onEditorsStructureChanged.fire(e instanceof o.EditorInput?e:e.editor):this._onEditorStateChanged.fire(e instanceof o.EditorInput?e:e.editor)},t.prototype.splice=function(t,e,i){var o=this.editors[t],r=[t,e?1:0];if(i&&r.push(i),this.editors.splice.apply(this.editors,r),!e&&i)this.mru.push(i),this.updateResourceMap(i,!1);else{var n=this.indexOf(o,this.mru);e&&!i?(this.mru.splice(n,1),this.updateResourceMap(o,!0)):(this.mru.splice(n,1,i),this.updateResourceMap(i,!1),this.updateResourceMap(o,!0))}},t.prototype.updateResourceMap=function(t,e){var i=o.getUntitledOrFileResource(t,!0);if(i){var r=this.mapResourceToEditorCount[i.toString()]||0,n=void 0;e?r>1&&(n=r-1):n=r+1,this.mapResourceToEditorCount[i.toString()]=n}},t.prototype.indexOf=function(t,e){if(void 0===e&&(e=this.editors),!t)return-1;for(var i=0;i<e.length;i++)if(this.matches(e[i],t))return i;return-1},t.prototype.contains=function(t){if(t instanceof o.EditorInput)return this.indexOf(t)>=0;var e=this.mapResourceToEditorCount[t.toString()];return"number"==typeof e&&e>0},t.prototype.setMostRecentlyUsed=function(t){var e=this.indexOf(t);if(e!==-1){var i=this.indexOf(t,this.mru);this.mru.splice(i,1),this.mru.unshift(t)}},t.prototype.matches=function(t,e){return!!t&&!!e&&t.matches(e)},t.prototype.serialize=function(){var t,e=this,i=h.Registry.as(o.Extensions.Editors),r=[],n=[];this.editors.forEach(function(o){var s=i.getEditorInputFactory(o.getTypeId());if(s){var u=s.serialize(o);"string"==typeof u&&(n.push({id:o.getTypeId(),value:u}),r.push(o),e.preview===o&&(t=r.length-1))}});var s=this.mru.map(function(t){return e.indexOf(t,r)}).filter(function(t){return t>=0});return{label:this.label,editors:n,mru:s,preview:t}},t.prototype.deserialize=function(t){var e=this,i=h.Registry.as(o.Extensions.Editors);this._label=t.label,this.editors=t.editors.map(function(t){var o=i.getEditorInputFactory(t.id);if(o){var r=o.deserialize(e.instantiationService,t.value);return e.hookEditorListeners(r),e.updateResourceMap(r,!1),r}return null}).filter(function(t){return!!t}),this.mru=t.mru.map(function(t){return e.editors[t]}),this.active=this.mru[0],this.preview=this.editors[t.preview]},t.prototype.dispose=function(){d.dispose(this.toDispose)},t.IDS=0,t=__decorate([__param(1,n.IInstantiationService),__param(2,s.IConfigurationService)],t)}();e.EditorGroup=f;var l=function(){function t(t,e,o,r){this.storageService=t,this.lifecycleService=e,this.contextService=o,this.instantiationService=r,this.toDispose=[],this._groups=[],this.groupToIdentifier=Object.create(null),this._onGroupOpened=new i.Emitter,this._onGroupClosed=new i.Emitter,this._onGroupActivated=new i.Emitter,this._onGroupDeactivated=new i.Emitter,this._onGroupMoved=new i.Emitter,this._onGroupRenamed=new i.Emitter,this._onModelChanged=new i.Emitter,this._onEditorDisposed=new i.Emitter,this._onEditorDirty=new i.Emitter,this._onEditorClosed=new i.Emitter,this.toDispose.push(this._onGroupOpened,this._onGroupClosed,this._onGroupActivated,this._onGroupDeactivated,this._onGroupMoved,this._onGroupRenamed,this._onModelChanged,this._onEditorDisposed,this._onEditorDirty,this._onEditorClosed),this.registerListeners()}return t.prototype.registerListeners=function(){var t=this;this.toDispose.push(this.lifecycleService.onShutdown(function(){return t.onShutdown()}))},Object.defineProperty(t.prototype,"onGroupOpened",{get:function(){return this._onGroupOpened.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onGroupClosed",{get:function(){return this._onGroupClosed.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onGroupActivated",{get:function(){return this._onGroupActivated.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onGroupDeactivated",{get:function(){return this._onGroupDeactivated.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onGroupMoved",{get:function(){return this._onGroupMoved.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onGroupRenamed",{get:function(){return this._onGroupRenamed.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onModelChanged",{get:function(){return this._onModelChanged.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onEditorDisposed",{get:function(){return this._onEditorDisposed.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onEditorDirty",{get:function(){return this._onEditorDirty.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onEditorClosed",{get:function(){return this._onEditorClosed.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"groups",{get:function(){return this.ensureLoaded(),this._groups.slice(0)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"activeGroup",{get:function(){return this.ensureLoaded(),this._activeGroup},enumerable:!0,configurable:!0}),t.prototype.isActive=function(t){return this.activeGroup===t},t.prototype.getGroup=function(t){return this.ensureLoaded(),this.groupToIdentifier[t]},t.prototype.openGroup=function(t,e,i){void 0===e&&(e=!0),this.ensureLoaded();var o=this.doCreateGroup(t);return"number"==typeof i?this._groups[i]=o:this._activeGroup?this._groups.splice(this.indexOf(this._activeGroup)+1,0,o):this._groups.push(o),this.fireEvent(this._onGroupOpened,o,!0),this._activeGroup&&!e||this.setActive(o),o},t.prototype.renameGroup=function(t,e){this.ensureLoaded(),t.label!==e&&(t.label=e,this.fireEvent(this._onGroupRenamed,t,!1))},t.prototype.closeGroup=function(t){this.ensureLoaded();var e=this.indexOf(t);if(!(e<0)){if(t===this._activeGroup)if(this._groups.length>1){var i=void 0;i=this._groups.length>e+1?this._groups[e+1]:this._groups[e-1],this.setActive(i)}else this._activeGroup=null;t.closeAllEditors(),t.dispose(),this._groups.splice(e,1),this.groupToIdentifier[t.id]=void 0,this.fireEvent(this._onGroupClosed,t,!0);for(var o=e;o<this._groups.length;o++)this.fireEvent(this._onGroupMoved,this._groups[o],!0)}},t.prototype.closeGroups=function(t){var e=this;this.ensureLoaded(),this.groups.filter(function(i){return i!==e._activeGroup&&i!==t}).forEach(function(t){return e.closeGroup(t)}),this._activeGroup!==t&&this.closeGroup(this._activeGroup)},t.prototype.setActive=function(t){if(this.ensureLoaded(),this._activeGroup!==t){var e=this._activeGroup;this._activeGroup=t,this.fireEvent(this._onGroupActivated,t,!1),e&&this.fireEvent(this._onGroupDeactivated,e,!1)}},t.prototype.moveGroup=function(t,e){this.ensureLoaded();var i=this.indexOf(t);if(!(i<0)){this._groups.splice(i,1),this._groups.splice(e,0,t);for(var o=Math.min(i,e);o<=Math.max(i,e)&&o<this._groups.length;o++)this.fireEvent(this._onGroupMoved,this._groups[o],!0)}},t.prototype.indexOf=function(t){return this._groups.indexOf(t)},t.prototype.positionOfGroup=function(t){return this.indexOf(t)},t.prototype.groupAt=function(t){return this.ensureLoaded(),this._groups[t]},t.prototype.next=function(){if(this.ensureLoaded(),!this.activeGroup)return null;var t=this.activeGroup.indexOf(this.activeGroup.activeEditor);if(t+1<this.activeGroup.count)return{group:this.activeGroup,editor:this.activeGroup.getEditor(t+1)};var e=this.indexOf(this.activeGroup),i=this.groups[e+1];if(i)return{group:i,editor:i.getEditor(0)};var o=this.groups[0];return{group:o,editor:o.getEditor(0)}},t.prototype.previous=function(){if(this.ensureLoaded(),!this.activeGroup)return null;var t=this.activeGroup.indexOf(this.activeGroup.activeEditor);if(t>0)return{group:this.activeGroup,editor:this.activeGroup.getEditor(t-1)};var e=this.indexOf(this.activeGroup),i=this.groups[e-1];if(i)return{group:i,editor:i.getEditor(i.count-1)};var o=this.groups[this.groups.length-1];return{group:o,editor:o.getEditor(o.count-1)}},t.prototype.save=function(){var e=this.serialize();this.storageService.store(t.STORAGE_KEY,JSON.stringify(e),r.StorageScope.WORKSPACE)},t.prototype.serialize=function(){var t,e=this._groups.map(function(t){return t.serialize()}).filter(function(t){return t.editors.length>0});return e.length>0&&(t=e.length===this._groups.length?this.indexOf(this._activeGroup):0),{groups:e,active:t}},t.prototype.fireEvent=function(t,e,i){t.fire(e),this._onModelChanged.fire({group:e,structural:i})},t.prototype.ensureLoaded=function(){this.loaded||(this.loaded=!0,this.load())},t.prototype.load=function(){var e=this,i=this.contextService.getOptions();if(!(i.filesToCreate&&i.filesToCreate.length||i.filesToOpen&&i.filesToOpen.length||i.filesToDiff&&i.filesToDiff.length)){var o=this.storageService.get(t.STORAGE_KEY,r.StorageScope.WORKSPACE);if(o){var n=JSON.parse(o),s=this.doValidate(n);if(s)return console.warn("Ignoring invalid stacks model (Error code: "+s+"): "+JSON.stringify(n)),void console.warn(n);this._groups=n.groups.map(function(t){return e.doCreateGroup(t)}),this._activeGroup=this._groups[n.active]}}},t.prototype.doValidate=function(t){return t.groups.length||"number"!=typeof t.active?t.groups.length&&!t.groups[t.active]?2:t.groups.length>3?3:t.groups.some(function(t){return!t.editors.length})?4:t.groups.some(function(t){return t.editors.length!==t.mru.length})?5:t.groups.some(function(t){return"number"==typeof t.preview&&!t.editors[t.preview]})?6:t.groups.some(function(t){return!t.label})?7:0:1},t.prototype.doCreateGroup=function(t){var e=this,i=this.instantiationService.createInstance(f,t);this.groupToIdentifier[i.id]=i;var o=[];return o.push(i.onEditorsStructureChanged(function(t){return e._onModelChanged.fire({group:i,editor:t,structural:!0})})),o.push(i.onEditorStateChanged(function(t){return e._onModelChanged.fire({group:i,editor:t})})),o.push(i.onEditorClosed(function(t){e.handleOnEditorClosed(t),e._onEditorClosed.fire(t)})),o.push(i.onEditorDisposed(function(t){return e._onEditorDisposed.fire({editor:t,group:i})})),o.push(i.onEditorDirty(function(t){return e._onEditorDirty.fire({editor:t,group:i})})),o.push(this.onGroupClosed(function(t){t===i&&d.dispose(o)})),i},t.prototype.handleOnEditorClosed=function(t){var e=this,i=t.editor;this.isOpen(i)||(i.close(),i instanceof a.DiffEditorInput&&[i.originalInput,i.modifiedInput].forEach(function(t){e.isOpen(t)||t.close()}))},t.prototype.isOpen=function(t){return t instanceof o.EditorInput?this._groups.some(function(e){return e.indexOf(t)>=0}):this._groups.some(function(e){return e.contains(t)})},t.prototype.onShutdown=function(){this.save(),d.dispose(this.toDispose)},t.prototype.validate=function(){var t=this.serialize(),e=this.doValidate(t);e?(console.warn("Ignoring invalid stacks model (Error code: "+e+"): "+JSON.stringify(t)),console.warn(t)):console.log("Stacks Model OK!")},t.prototype.toString=function(){var t=this;this.ensureLoaded();var e=[];return this.groups.length?(this.groups.forEach(function(i){var o="Group: "+i.label;t._activeGroup===i&&(o+=" [active]"),e.push(o),i.getEditors().forEach(function(t){var o="\t"+t.getName();i.previewEditor===t&&(o+=" [preview]"),i.activeEditor===t&&(o+=" [active]"),e.push(o)})}),e.join("\n")):"<No Groups>"},t.STORAGE_KEY="editorStacks.model",t=__decorate([__param(0,r.IStorageService),__param(1,u.ILifecycleService),__param(2,p.IWorkspaceContextService),__param(3,n.IInstantiationService)],t)}();e.EditorStacksModel=l});