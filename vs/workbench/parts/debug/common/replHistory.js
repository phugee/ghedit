/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require","exports"],function(t,r){"use strict";var i=50,s=function(){function t(t){this.history=t,this.historyPointer=this.history.length,this.currentExpressionStoredMarkers=!1,this.historyOverwrites={}}return t.prototype.next=function(){return this.navigate(!1)},t.prototype.previous=function(){return this.navigate(!0)},t.prototype.navigate=function(t){var r=-1;return t&&this.historyPointer>0&&this.history.length>this.historyPointer-1?r=this.historyPointer-1:!t&&this.history.length>this.historyPointer+1&&(r=this.historyPointer+1),r>=0?(this.historyPointer=r,this.historyOverwrites&&this.historyOverwrites[r.toString()]?this.historyOverwrites[r.toString()]:this.history[r]):null},t.prototype.remember=function(t,r){var i;i=r?this.historyPointer+1:this.historyPointer-1,i!==this.history.length||this.currentExpressionStoredMarkers?(this.historyOverwrites||(this.historyOverwrites={}),this.historyOverwrites[i.toString()]=t):(this.history.push(t),this.currentExpressionStoredMarkers=!0)},t.prototype.evaluated=function(t){this.currentExpressionStoredMarkers&&this.history.pop(),!t||0!==this.history.length&&this.history[this.history.length-1]===t||this.history.push(t),this.historyPointer=this.history.length,this.currentExpressionStoredMarkers=!1,this.historyOverwrites=null},t.prototype.save=function(){return this.currentExpressionStoredMarkers&&this.history.pop(),this.history.length>i&&(this.history=this.history.splice(this.history.length-i,i)),this.history},t}();r.ReplHistory=s});