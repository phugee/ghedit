/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},__decorate=this&&this.__decorate||function(e,t,n,i){var r,o=arguments.length,a=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var c=e.length-1;c>=0;c--)(r=e[c])&&(a=(o<3?r(a):o>3?r(t,n,a):r(t,n))||a);return o>3&&a&&Object.defineProperty(t,n,a),a},__param=this&&this.__param||function(e,t){return function(n,i){t(n,i,e)}};define(["require","exports","vs/nls","vs/base/common/strings","vs/base/common/platform","vs/base/common/errors","vs/base/common/paths","vs/base/browser/dom","vs/base/browser/builder","vs/base/common/winjs.base","vs/base/parts/tree/browser/actionsRenderer","vs/base/browser/ui/countBadge/countBadge","vs/base/browser/ui/fileLabel/fileLabel","vs/base/browser/ui/leftRightWidget/leftRightWidget","vs/base/parts/tree/browser/treeDefaults","vs/workbench/browser/actionBarRegistry","vs/workbench/parts/search/common/searchModel","vs/platform/workspace/common/workspace","vs/editor/common/core/range","vs/base/common/keyCodes","vs/workbench/parts/search/browser/searchActions","vs/platform/instantiation/common/instantiation"],function(e,t,n,i,r,o,a,c,s,l,p,h,u,f,v,d,m,g,b,y,R,_){"use strict";var w=function(){function e(){}return e.prototype.getId=function(e,t){return t instanceof m.FileMatch?t.id():t instanceof m.Match?t.id():"root"},e.prototype.getChildren=function(e,t){var n=[];return t instanceof m.FileMatch?n=t.matches():t instanceof m.SearchResult&&(n=t.matches()),l.TPromise.as(n)},e.prototype.hasChildren=function(e,t){return t instanceof m.FileMatch||t instanceof m.SearchResult},e.prototype.getParent=function(e,t){var n=null;return t instanceof m.Match?n=t.parent():t instanceof m.FileMatch&&(n=t.parent()),l.TPromise.as(n)},e}();t.SearchDataSource=w;var M=function(){function e(){}return e.prototype.compare=function(e,t,n){return t instanceof m.FileMatch&&n instanceof m.FileMatch?t.resource().fsPath.localeCompare(n.resource().fsPath)||t.name().localeCompare(n.name()):t instanceof m.Match&&n instanceof m.Match?b.Range.compareRangesUsingStarts(t.range(),n.range()):void 0},e}();t.SearchSorter=M;var S=function(e){function t(t,n){e.call(this),this.viewlet=t,this.instantiationService=n}return __extends(t,e),t.prototype.hasActions=function(t,n){var i=t.getInput();return n instanceof m.FileMatch||i.searchModel.isReplaceActive()||n instanceof m.Match||e.prototype.hasActions.call(this,t,n)},t.prototype.getActions=function(t,n){var i=this;return e.prototype.getActions.call(this,t,n).then(function(e){var r=t.getInput();return n instanceof m.FileMatch&&(e.unshift(new R.RemoveAction(t,n)),r.searchModel.isReplaceActive()&&n.count()>0&&e.unshift(i.instantiationService.createInstance(R.ReplaceAllAction,t,n,i.viewlet))),n instanceof m.Match&&r.searchModel.isReplaceActive()&&e.unshift(i.instantiationService.createInstance(R.ReplaceAction,t,n,i.viewlet),new R.RemoveAction(t,n)),e})},t=__decorate([__param(1,_.IInstantiationService)],t)}(d.ContributableActionProvider),A=function(e){function t(t,n,i,r){e.call(this,{actionProvider:r.createInstance(S,n),actionRunner:t}),this.contextService=i,this.instantiationService=r}return __extends(t,e),t.prototype.getContentHeight=function(e,t){return 22},t.prototype.renderContents=function(e,t,r,o){var a=this;if(t instanceof m.FileMatch){var l=t,p=s.$(".filematch"),v=void 0,d=void 0,g=void 0;return v=function(e){return new u.FileLabel(e,l.resource(),a.contextService),null},d=function(e){var t=l.count();return new h.CountBadge(e,t,t>1?n.localize("searchMatches","{0} matches found",t):n.localize("searchMatch","{0} match found",t))},g=new f.LeftRightWidget(p,v,d),p.appendTo(r),g.dispose.bind(g)}if(t instanceof m.Match){c.addClass(r,"linematch");var b=t,y=[],R=b.preview();y.push("<span>"),y.push(i.escape(R.before));var _=e.getInput().searchModel,w=_.isReplaceActive()&&!!_.replaceString;y.push('</span><span class="'+(w?"replace ":"")+'findInFileMatch">'),y.push(i.escape(R.inside)),w&&(y.push('</span><span class="replaceMatch">'),y.push(i.escape(b.replaceString))),y.push("</span><span>"),y.push(i.escape(R.after)),y.push("</span>"),s.$("a.plain").innerHtml(y.join(i.empty)).title((R.before+(w?b.replaceString:R.inside)+R.after).trim().substr(0,999)).appendTo(r)}return null},t=__decorate([__param(2,g.IWorkspaceContextService),__param(3,_.IInstantiationService)],t)}(p.ActionsRenderer);t.SearchRenderer=A;var C=function(){function e(e){this.contextService=e}return e.prototype.getAriaLabel=function(e,t){if(t instanceof m.FileMatch){var i=this.contextService.toWorkspaceRelativePath(t.resource())||t.resource().fsPath;return n.localize("fileMatchAriaLabel","{0} matches in file {1} of folder {2}, Search result",t.count(),t.name(),a.dirname(i))}if(t instanceof m.Match){var r=t,o=e.getInput();if(o.searchModel.isReplaceActive()){var c=r.preview();return n.localize("replacePreviewResultAria","Replace preview result, {0}",c.before+r.replaceString+c.after)}return n.localize("searchResultAria","{0}, Search result",r.text())}},e=__decorate([__param(0,g.IWorkspaceContextService)],e)}();t.SearchAccessibilityProvider=C;var I=function(e){function t(t,n){var i=this;e.call(this,{clickBehavior:v.ClickBehavior.ON_MOUSE_DOWN}),this.viewlet=t,this.instantiationService=n,r.isMacintosh?(this.downKeyBindingDispatcher.set(y.CommonKeybindings.CTRLCMD_BACKSPACE,function(e,t){i.onDelete(e,t)}),this.upKeyBindingDispatcher.set(y.CommonKeybindings.WINCTRL_ENTER,this.onEnter.bind(this))):(this.downKeyBindingDispatcher.set(y.CommonKeybindings.DELETE,function(e,t){i.onDelete(e,t)}),this.upKeyBindingDispatcher.set(y.CommonKeybindings.CTRLCMD_ENTER,this.onEnter.bind(this))),this.downKeyBindingDispatcher.set(R.ReplaceAllAction.KEY_BINDING,function(e,t){i.onReplaceAll(e,t)}),this.downKeyBindingDispatcher.set(R.ReplaceAction.KEY_BINDING,function(e,t){i.onReplace(e,t)}),this.downKeyBindingDispatcher.set(y.CommonKeybindings.ESCAPE,function(e,t){i.onEscape(e,t)})}return __extends(t,e),t.prototype.onEscape=function(t,n){return!!this.viewlet.cancelSearch()||e.prototype.onEscape.call(this,t,n)},t.prototype.onDelete=function(e,t){var n=e.getInput(),i=!1,r=e.getFocus();return(r instanceof m.FileMatch||r instanceof m.Match&&n.searchModel.isReplaceActive())&&(new R.RemoveAction(e,r).run().done(null,o.onUnexpectedError),i=!0),i},t.prototype.onReplace=function(e,t){var n=e.getInput(),i=!1,r=e.getFocus();return r instanceof m.Match&&n.searchModel.isReplaceActive()&&(this.instantiationService.createInstance(R.ReplaceAction,e,r,this.viewlet).run().done(null,o.onUnexpectedError),i=!0),i},t.prototype.onReplaceAll=function(e,t){var n=!1,i=e.getFocus();return i instanceof m.FileMatch&&i.count()>0&&(this.instantiationService.createInstance(R.ReplaceAllAction,e,i,this.viewlet).run().done(null,o.onUnexpectedError),n=!0),n},t.prototype.onUp=function(t,n){return t.getNavigator().first()===t.getFocus()?(this.viewlet.moveFocusFromResults(),!0):e.prototype.onUp.call(this,t,n)},t.prototype.onSpace=function(t,n){var i=t.getFocus();return i instanceof m.Match?this.onEnter(t,n):void e.prototype.onSpace.call(this,t,n)},t=__decorate([__param(1,_.IInstantiationService)],t)}(v.DefaultController);t.SearchController=I;var F=function(){function e(){}return e.prototype.isVisible=function(e,t){return!(t instanceof m.FileMatch)||t.matches().length>0},e}();t.SearchFilter=F});