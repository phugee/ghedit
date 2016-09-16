/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(e,t){function i(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)},__decorate=this&&this.__decorate||function(e,t,i,n){var r,s=arguments.length,o=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,n);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(s<3?r(o):s>3?r(t,i,o):r(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},__param=this&&this.__param||function(e,t){return function(i,n){t(i,n,e)}};define(["require","exports","vs/nls","vs/base/common/paths","vs/base/browser/dom","vs/base/browser/builder","vs/base/common/winjs.base","vs/base/common/errors","vs/base/common/events","vs/workbench/browser/actionBarRegistry","vs/base/parts/tree/browser/treeImpl","vs/base/browser/ui/splitview/splitview","vs/workbench/browser/viewlet","vs/workbench/parts/debug/common/debug","vs/workbench/parts/debug/common/debugModel","vs/workbench/parts/debug/electron-browser/debugViewer","vs/workbench/parts/debug/browser/debugActions","vs/platform/contextview/browser/contextView","vs/platform/instantiation/common/instantiation","vs/platform/telemetry/common/telemetry","vs/platform/message/common/message","vs/platform/keybinding/common/keybinding"],function(e,t,i,n,r,s,o,a,c,l,p,d,h,u,v,g,b,S,m,f,E,w){"use strict";function x(e){var t=document.createElement("div");return r.addClass(t,"debug-view-content"),e.appendChild(t),t}var _=u.IDebugService,y=function(e){return{indentPixels:8,twistiePixels:20,ariaLabel:e}},k=s.$,M=function(e){function t(n,r,s,o,a,c,l,p){e.call(this,n,!!r[t.MEMENTO],i.localize("variablesSection","Variables Section"),s,l,o),this.settings=r,this.telemetryService=a,this.debugService=c,this.instantiationService=p}return __extends(t,e),t.prototype.renderHeader=function(t){var n=k("div.title").appendTo(t);k("span").text(i.localize("variables","Variables")).appendTo(n),e.prototype.renderHeader.call(this,t)},t.prototype.renderBody=function(e){var t=this;r.addClass(e,"debug-variables"),this.treeContainer=x(e),this.tree=new p.Tree(this.treeContainer,{dataSource:new g.VariablesDataSource(this.debugService),renderer:this.instantiationService.createInstance(g.VariablesRenderer),accessibilityProvider:new g.VariablesAccessibilityProvider,controller:new g.VariablesController(this.debugService,this.contextMenuService,new g.VariablesActionProvider(this.instantiationService))},y(i.localize("variablesAriaTreeLabel","Debug Variables")));var n=this.debugService.getViewModel();this.tree.setInput(n);var s=this.instantiationService.createInstance(h.CollapseAction,this.tree,!1,"explorer-action collapse-explorer");this.toolBar.setActions(l.prepareActions([s]))(),this.toDispose.push(n.onDidFocusStackFrame(function(e){return t.onFocusStackFrame(e)})),this.toDispose.push(this.debugService.onDidChangeState(function(e){s.enabled=e===u.State.Running||e===u.State.Stopped})),this.toDispose.push(this.tree.addListener2(c.EventType.FOCUS,function(e){var i=e.payload&&"mouse"===e.payload.origin,n=e.focus instanceof v.Variable;i&&n&&t.telemetryService.publicLog("debug/variables/selected")})),this.toDispose.push(this.debugService.getViewModel().onDidSelectExpression(function(e){e&&e instanceof v.Variable&&t.tree.refresh(e,!1).then(function(){t.tree.setHighlight(e),t.tree.addOneTimeDisposableListener(c.EventType.HIGHLIGHT,function(e){e.highlight||t.debugService.getViewModel().setSelectedExpression(null)})}).done(null,a.onUnexpectedError)}))},t.prototype.onFocusStackFrame=function(e){var t=this;this.tree.refresh().then(function(){if(e)return e.getScopes(t.debugService).then(function(e){if(e.length>0&&!e[0].expensive)return t.tree.expand(e[0])})}).done(null,a.onUnexpectedError)},t.prototype.shutdown=function(){this.settings[t.MEMENTO]=this.state===d.CollapsibleState.COLLAPSED,e.prototype.shutdown.call(this)},t.MEMENTO="variablesview.memento",t=__decorate([__param(2,E.IMessageService),__param(3,S.IContextMenuService),__param(4,f.ITelemetryService),__param(5,_),__param(6,w.IKeybindingService),__param(7,m.IInstantiationService)],t)}(h.CollapsibleViewletView);t.VariablesView=M;var A=function(e){function t(n,r,s,o,a,c,l){var p=this;e.call(this,n,!!r[t.MEMENTO],i.localize("expressionsSection","Expressions Section"),s,c,o),this.settings=r,this.debugService=a,this.instantiationService=l,this.toDispose.push(this.debugService.getModel().onDidChangeWatchExpressions(function(e){e instanceof v.Expression&&p.expand()}))}return __extends(t,e),t.prototype.renderHeader=function(t){var n=k("div.title").appendTo(t);k("span").text(i.localize("watch","Watch")).appendTo(n),e.prototype.renderHeader.call(this,t)},t.prototype.renderBody=function(e){var t=this;r.addClass(e,"debug-watch"),this.treeContainer=x(e);var n=new g.WatchExpressionsActionProvider(this.instantiationService);this.tree=new p.Tree(this.treeContainer,{dataSource:new g.WatchExpressionsDataSource(this.debugService),renderer:this.instantiationService.createInstance(g.WatchExpressionsRenderer,n,this.actionRunner),accessibilityProvider:new g.WatchExpressionsAccessibilityProvider,controller:new g.WatchExpressionsController(this.debugService,this.contextMenuService,n)},y(i.localize({comment:["Debug is a noun in this context, not a verb."],key:"watchAriaTreeLabel"},"Debug Watch Expressions"))),this.tree.setInput(this.debugService.getModel());var s=this.instantiationService.createInstance(b.AddWatchExpressionAction,b.AddWatchExpressionAction.ID,b.AddWatchExpressionAction.LABEL),o=this.instantiationService.createInstance(h.CollapseAction,this.tree,!1,"explorer-action collapse-explorer"),d=this.instantiationService.createInstance(b.RemoveAllWatchExpressionsAction,b.RemoveAllWatchExpressionsAction.ID,b.RemoveAllWatchExpressionsAction.LABEL);this.toolBar.setActions(l.prepareActions([s,o,d]))(),this.toDispose.push(this.debugService.getModel().onDidChangeWatchExpressions(function(e){return t.onWatchExpressionsUpdated(e)})),this.toDispose.push(this.debugService.getViewModel().onDidSelectExpression(function(e){e&&e instanceof v.Expression&&t.tree.refresh(e,!1).then(function(){t.tree.setHighlight(e),t.tree.addOneTimeDisposableListener(c.EventType.HIGHLIGHT,function(e){e.highlight||t.debugService.getViewModel().setSelectedExpression(null)})}).done(null,a.onUnexpectedError)}))},t.prototype.onWatchExpressionsUpdated=function(e){var t=this;this.tree.refresh().done(function(){return e instanceof v.Expression?t.tree.reveal(e):o.TPromise.as(!0)},a.onUnexpectedError)},t.prototype.shutdown=function(){this.settings[t.MEMENTO]=this.state===d.CollapsibleState.COLLAPSED,e.prototype.shutdown.call(this)},t.MEMENTO="watchexpressionsview.memento",t=__decorate([__param(2,E.IMessageService),__param(3,S.IContextMenuService),__param(4,_),__param(5,w.IKeybindingService),__param(6,m.IInstantiationService)],t)}(h.CollapsibleViewletView);t.WatchExpressionsView=A;var I=function(e){function t(n,r,s,o,a,c,l,p){e.call(this,n,!!r[t.MEMENTO],i.localize("callstackSection","Call Stack Section"),s,l,o),this.settings=r,this.telemetryService=a,this.debugService=c,this.instantiationService=p}return __extends(t,e),t.prototype.renderHeader=function(t){var n=k("div.debug-call-stack-title").appendTo(t);k("span.title").text(i.localize("callStack","Call Stack")).appendTo(n),this.pauseMessage=k("span.pause-message").appendTo(n),this.pauseMessage.hide(),this.pauseMessageLabel=k("span.label").appendTo(this.pauseMessage),e.prototype.renderHeader.call(this,t)},t.prototype.renderBody=function(e){var t=this;r.addClass(e,"debug-call-stack"),this.treeContainer=x(e);var n=this.instantiationService.createInstance(g.CallStackActionProvider);this.tree=new p.Tree(this.treeContainer,{dataSource:this.instantiationService.createInstance(g.CallStackDataSource),renderer:this.instantiationService.createInstance(g.CallStackRenderer),accessibilityProvider:this.instantiationService.createInstance(g.CallstackAccessibilityProvider),controller:new g.CallStackController(this.debugService,this.contextMenuService,n)},y(i.localize({comment:["Debug is a noun in this context, not a verb."],key:"callStackAriaLabel"},"Debug Call Stack"))),this.toDispose.push(this.tree.addListener2(c.EventType.FOCUS,function(e){var i=e.payload&&"mouse"===e.payload.origin,n=e.focus instanceof v.StackFrame;i&&n&&t.telemetryService.publicLog("debug/callStack/selected")}));var s=this.debugService.getModel();this.toDispose.push(this.debugService.getViewModel().onDidFocusStackFrame(function(){var e=s.getThreads()[t.debugService.getViewModel().getFocusedThreadId()];return e?t.tree.expand(e).then(function(){var n=t.debugService.getViewModel().getFocusedStackFrame();return t.tree.setSelection([n]),e.stoppedDetails&&e.stoppedDetails.reason?(t.pauseMessageLabel.text(i.localize("debugStopped","Paused on {0}",e.stoppedDetails.reason)),e.stoppedDetails.text&&t.pauseMessageLabel.title(e.stoppedDetails.text),"exception"===e.stoppedDetails.reason?t.pauseMessageLabel.addClass("exception"):t.pauseMessageLabel.removeClass("exception"),t.pauseMessage.show()):t.pauseMessage.hide(),t.tree.reveal(n)}):void t.pauseMessage.hide()})),this.toDispose.push(s.onDidChangeCallStack(function(){var e=s.getThreads(),i=Object.keys(e).map(function(t){return e[t]}),n=1===i.length?i[0]:s;t.tree.getInput()===n?t.tree.refresh().done(null,a.onUnexpectedError):t.tree.setInput(n).done(null,a.onUnexpectedError)}))},t.prototype.shutdown=function(){this.settings[t.MEMENTO]=this.state===d.CollapsibleState.COLLAPSED,e.prototype.shutdown.call(this)},t.MEMENTO="callstackview.memento",t=__decorate([__param(2,E.IMessageService),__param(3,S.IContextMenuService),__param(4,f.ITelemetryService),__param(5,_),__param(6,w.IKeybindingService),__param(7,m.IInstantiationService)],t)}(h.CollapsibleViewletView);t.CallStackView=I;var C=function(e){function t(n,r,s,o,a,c,l){var p=this;e.call(this,n,t.getExpandedBodySize(a.getModel().getBreakpoints().length+a.getModel().getFunctionBreakpoints().length+a.getModel().getExceptionBreakpoints().length),!!r[t.MEMENTO],i.localize("breakpointsSection","Breakpoints Section"),s,c,o),this.settings=r,this.debugService=a,this.instantiationService=l,this.toDispose.push(this.debugService.getModel().onDidChangeBreakpoints(function(){return p.onBreakpointsChange()}))}return __extends(t,e),t.prototype.renderHeader=function(t){var n=k("div.title").appendTo(t);k("span").text(i.localize("breakpoints","Breakpoints")).appendTo(n),e.prototype.renderHeader.call(this,t)},t.prototype.renderBody=function(e){var t=this;r.addClass(e,"debug-breakpoints"),this.treeContainer=x(e);var s=new g.BreakpointsActionProvider(this.instantiationService);this.tree=new p.Tree(this.treeContainer,{dataSource:new g.BreakpointsDataSource,renderer:this.instantiationService.createInstance(g.BreakpointsRenderer,s,this.actionRunner),accessibilityProvider:this.instantiationService.createInstance(g.BreakpointsAccessibilityProvider),controller:new g.BreakpointsController(this.debugService,this.contextMenuService,s),sorter:{compare:function(e,t,i){var r=t,s=i;return r instanceof v.ExceptionBreakpoint?-1:s instanceof v.ExceptionBreakpoint?1:r instanceof v.FunctionBreakpoint?-1:s instanceof v.FunctionBreakpoint?1:r.source.uri.toString()!==s.source.uri.toString()?n.basename(r.source.uri.fsPath).localeCompare(n.basename(s.source.uri.fsPath)):r.desiredLineNumber-s.desiredLineNumber}}},y(i.localize({comment:["Debug is a noun in this context, not a verb."],key:"breakpointsAriaTreeLabel"},"Debug Breakpoints")));var o=this.debugService.getModel();this.tree.setInput(o),this.toDispose.push(this.debugService.getViewModel().onDidSelectFunctionBreakpoint(function(e){e&&e instanceof v.FunctionBreakpoint&&t.tree.refresh(e,!1).then(function(){t.tree.setHighlight(e),t.tree.addOneTimeDisposableListener(c.EventType.HIGHLIGHT,function(e){e.highlight||t.debugService.getViewModel().setSelectedFunctionBreakpoint(null)})}).done(null,a.onUnexpectedError)}))},t.prototype.getActions=function(){return[this.instantiationService.createInstance(b.AddFunctionBreakpointAction,b.AddFunctionBreakpointAction.ID,b.AddFunctionBreakpointAction.LABEL),this.instantiationService.createInstance(b.ToggleBreakpointsActivatedAction,b.ToggleBreakpointsActivatedAction.ID,b.ToggleBreakpointsActivatedAction.ACTIVATE_LABEL),this.instantiationService.createInstance(b.RemoveAllBreakpointsAction,b.RemoveAllBreakpointsAction.ID,b.RemoveAllBreakpointsAction.LABEL)]},t.prototype.onBreakpointsChange=function(){var e=this.debugService.getModel();this.expandedBodySize=t.getExpandedBodySize(e.getBreakpoints().length+e.getExceptionBreakpoints().length+e.getFunctionBreakpoints().length),this.tree&&this.tree.refresh()},t.getExpandedBodySize=function(e){return 22*Math.min(t.MAX_VISIBLE_FILES,e)},t.prototype.shutdown=function(){this.settings[t.MEMENTO]=this.state===d.CollapsibleState.COLLAPSED,e.prototype.shutdown.call(this)},t.MAX_VISIBLE_FILES=9,t.MEMENTO="breakopintsview.memento",t=__decorate([__param(2,E.IMessageService),__param(3,S.IContextMenuService),__param(4,_),__param(5,w.IKeybindingService),__param(6,m.IInstantiationService)],t)}(h.AdaptiveCollapsibleViewletView);t.BreakpointsView=C});