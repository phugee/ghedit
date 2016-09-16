var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)};define(["require","exports","vs/editor/common/core/selection"],function(t,e,n){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var o=function(){function t(t,e){this._range=t,this._text=e}return t.prototype.getText=function(){return this._text},t.prototype.getRange=function(){return this._range},t.prototype.setRange=function(t){this._range=t},t.prototype.getEditOperations=function(t,e){e.addEditOperation(this._range,this._text)},t.prototype.computeCursorState=function(t,e){var o=e.getInverseEditOperations(),r=o[0].range;return new n.Selection(r.endLineNumber,r.endColumn,r.endLineNumber,r.endColumn)},t}();e.ReplaceCommand=o;var r=function(t){function e(e,n){t.call(this,e,n)}return __extends(e,t),e.prototype.computeCursorState=function(t,e){var o=e.getInverseEditOperations(),r=o[0].range;return new n.Selection(r.startLineNumber,r.startColumn,r.startLineNumber,r.startColumn)},e}(o);e.ReplaceCommandWithoutChangingPosition=r;var i=function(t){function e(e,n,o,r){t.call(this,e,n),this._columnDeltaOffset=r,this._lineNumberDeltaOffset=o}return __extends(e,t),e.prototype.computeCursorState=function(t,e){var o=e.getInverseEditOperations(),r=o[0].range;return new n.Selection(r.endLineNumber+this._lineNumberDeltaOffset,r.endColumn+this._columnDeltaOffset,r.endLineNumber+this._lineNumberDeltaOffset,r.endColumn+this._columnDeltaOffset)},e}(o);e.ReplaceCommandWithOffsetCursorState=i;var s=function(t){function e(e,n,o){t.call(this,e,n),this._initialSelection=o}return __extends(e,t),e.prototype.getEditOperations=function(e,n){t.prototype.getEditOperations.call(this,e,n),this._selectionId=n.trackSelection(this._initialSelection)},e.prototype.computeCursorState=function(t,e){return e.getTrackedSelection(this._selectionId)},e}(o);e.ReplaceCommandThatPreservesSelection=s});