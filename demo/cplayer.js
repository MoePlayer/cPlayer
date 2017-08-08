(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "46768ef3bca6de830506"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(moduleOutdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "accept-errored",
/******/ 								moduleId: moduleId,
/******/ 								dependencyId: moduleOutdatedDependencies[i],
/******/ 								error: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err;
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(1)(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(true);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/*@keyframes changeSize{\r\n\t0%{\r\n\t\twidth:100%;\r\n\t\theight:100%;\r\n\t\ttop:0;\r\n\t\tleft:0;\r\n\t}\r\n\t100%{\r\n\t\twidth:200%;\r\n\t\theight:200%;\r\n\t\ttop:-50%;\r\n\t\tleft:-50%;\r\n\t}\r\n}*/\nc-player {\n  display: flex;\n  flex-direction: column; }\n  c-player svg {\n    width: 100%;\n    height: 100%;\n    fill: #333;\n    display: block; }\n  c-player .play-icon svg {\n    fill: white;\n    width: 80%;\n    height: 80%; }\n  c-player .invisible {\n    height: 0 !important;\n    overflow: hidden !important;\n    max-height: 0 !important;\n    min-height: 0 !important; }\n  c-player * {\n    font-family: \"Ubuntu Mono\",\"\\5FAE\\8F6F\\96C5\\9ED1\",\"Microsoft JHenghei\",sans-serif;\n    text-decoration: none;\n    font-size: initial;\n    line-height: initial; }\n  c-player .lyric {\n    will-change: height;\n    transition: all 0.25s;\n    display: flex;\n    height: 20em;\n    height: 45vh;\n    width: 100%;\n    background: #eee;\n    overflow: hidden; }\n    c-player .lyric lyric-body {\n      will-change: transform;\n      display: block;\n      flex-direction: column;\n      width: 100%;\n      height: 100%;\n      text-align: center;\n      transform: translateY(6em); }\n      c-player .lyric lyric-body lrc {\n        flex: 1;\n        display: block;\n        will-change: background;\n        line-height: 3em;\n        min-height: 3em;\n        font-size: large;\n        font-family: \"LiHei Pro\",\"Microsoft Yahei\",sans-serif;\n        width: 100%; }\n        c-player .lyric lyric-body lrc.now {\n          background: #ddd; }\n  c-player .controls {\n    background: white;\n    height: 4em;\n    display: flex; }\n    c-player .controls .c-left {\n      display: flex; }\n      c-player .controls .c-left .music-description {\n        display: flex; }\n        c-player .controls .c-left .music-description .image, c-player .controls .c-left .music-description .image img {\n          height: 4em;\n          width: 4em; }\n          c-player .controls .c-left .music-description .image:hover + .music-meta, c-player .controls .c-left .music-description .image img:hover + .music-meta {\n            max-width: 9999px; }\n        c-player .controls .c-left .music-description .music-meta {\n          margin: 0 0.5em;\n          flex: 1;\n          max-width: 0;\n          width: auto;\n          display: flex;\n          overflow: hidden;\n          flex-direction: column;\n          height: 100%;\n          transition: 1.5s all 0.5s ease-in; }\n          c-player .controls .c-left .music-description .music-meta div {\n            display: flex;\n            width: 100%;\n            height: 100%;\n            justify-content: center;\n            align-items: center;\n            flex-direction: column; }\n          c-player .controls .c-left .music-description .music-meta .music-name {\n            font-size: 1.5em;\n            white-space: nowrap; }\n          c-player .controls .c-left .music-description .music-meta .music-artist {\n            font-size: 0.7em;\n            color: grey;\n            white-space: nowrap; }\n      c-player .controls .c-left .play-icon {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        margin: auto 0.5em;\n        width: 3.2em;\n        height: 3.2em;\n        border-radius: 100%;\n        background-color: #7dc3da;\n        color: white;\n        cursor: pointer; }\n    c-player .controls .c-center {\n      flex: 1;\n      width: auto;\n      display: flex;\n      align-items: center;\n      padding: 0.5em; }\n      @media screen and (max-width: 600px) {\n        c-player .controls .c-center {\n          display: none; } }\n      c-player .controls .c-center .time {\n        width: 100%;\n        touch-action: none;\n        pointer-events: auto;\n        cursor: pointer; }\n        c-player .controls .c-center .time .time-body {\n          margin: 0 1%;\n          height: 0.5em;\n          background-color: #ccc;\n          display: flex;\n          border-radius: 0.5em; }\n          c-player .controls .c-center .time .time-body .time-line {\n            width: 0%;\n            height: 100%;\n            background-color: #359abc;\n            will-change: width;\n            transition: 0.1s width ease-in;\n            position: relative;\n            border-radius: 0.5em; }\n            c-player .controls .c-center .time .time-body .time-line .time-point {\n              width: 1em;\n              height: 1em;\n              margin: -0.25em -0.5em 0 0;\n              background-color: #7dc3da;\n              border-radius: 100%;\n              position: absolute;\n              right: 0;\n              /**&::before{\r\n\t\t\t\t\tcontent:\"\";\r\n\t\t\t\t\tdisplay:block;\r\n\t\t\t\t\twidth:0;\r\n\t\t\t\t\theight:0;\r\n\t\t\t\t\tposition: absolute;\r\n\t\t\t\t\ttop:50%;\r\n\t\t\t\t\tleft:50%;\r\n\t\t\t\t\tbackground-color:rgba($b-color,.5);\r\n\t\t\t\t\tanimation:changeSize 1s ease-in-out infinite alternate;\r\n\t\t\t\t\tborder-radius: 100%;\r\n\t\t\t\t}**********/ }\n    c-player .controls .c-right {\n      display: flex;\n      justify-content: center;\n      align-items: center; }\n      @media screen and (max-width: 600px) {\n        c-player .controls .c-right {\n          flex: 1; }\n          c-player .controls .c-right .volume {\n            width: auto !important; }\n            c-player .controls .c-right .volume .volume-body {\n              visibility: hidden !important; }\n        c-player .controls .c-right.hover .list-button,\n        c-player .controls .c-right.hover .lyric-button {\n          display: none; }\n        c-player .controls .c-right.hover .volume-body {\n          width: 100% !important;\n          visibility: visible !important; }\n        c-player .controls .c-right.hover .volume {\n          width: 100% !important; } }\n      c-player .controls .c-right > * {\n        width: 2em;\n        height: 2em;\n        margin: 0 0.5em;\n        display: flex; }\n      c-player .controls .c-right .volume {\n        align-items: center;\n        touch-action: none;\n        pointer-events: auto;\n        cursor: pointer;\n        transition: width 0.2s; }\n        c-player .controls .c-right .volume .volume-body {\n          margin: 0 1%;\n          height: 0.5em;\n          background-color: #ccc;\n          display: flex;\n          border-radius: 0.5em; }\n          c-player .controls .c-right .volume .volume-body .volume-line {\n            width: 0%;\n            height: 100%;\n            background-color: #359abc;\n            will-change: width;\n            transition: 0.1s width ease-in;\n            position: relative;\n            border-radius: 0.5em; }\n            c-player .controls .c-right .volume .volume-body .volume-line .volume-point {\n              width: 1em;\n              height: 1em;\n              margin: -0.25em -0.5em 0 0;\n              background-color: #7dc3da;\n              border-radius: 100%;\n              position: absolute;\n              right: 0;\n              /**&::before{\r\n\t\t\t\t\tcontent:\"\";\r\n\t\t\t\t\tdisplay:block;\r\n\t\t\t\t\twidth:0;\r\n\t\t\t\t\theight:0;\r\n\t\t\t\t\tposition: absolute;\r\n\t\t\t\t\ttop:50%;\r\n\t\t\t\t\tleft:50%;\r\n\t\t\t\t\tbackground-color:rgba($b-color,.5);\r\n\t\t\t\t\tanimation:changeSize 1s ease-in-out infinite alternate;\r\n\t\t\t\t\tborder-radius: 100%;\r\n\t\t\t\t}**********/ }\n        c-player .controls .c-right .volume .volume-body {\n          visibility: hidden;\n          width: 0;\n          transition: width 0.2s; }\n        c-player .controls .c-right .volume:hover, c-player .controls .c-right .volume:active {\n          width: 12em; }\n          c-player .controls .c-right .volume:hover .volume-body, c-player .controls .c-right .volume:active .volume-body {\n            visibility: visible;\n            width: 100%; }\n        c-player .controls .c-right .volume .volume-button {\n          width: 2em;\n          height: 2em; }\n          c-player .controls .c-right .volume .volume-button .volume-power {\n            display: flex;\n            width: 100%;\n            height: 100%;\n            border-radius: 10%;\n            color: grey;\n            transition: all 0.2s ease-in;\n            cursor: pointer; }\n            c-player .controls .c-right .volume .volume-button .volume-power:hover, c-player .controls .c-right .volume .volume-button .volume-power:active {\n              background: rgba(117, 117, 117, 0.3); }\n            c-player .controls .c-right .volume .volume-button .volume-power .material-icons {\n              margin: auto; }\n      c-player .controls .c-right .list-button .list-power {\n        display: flex;\n        width: 100%;\n        height: 100%;\n        border-radius: 10%;\n        color: grey;\n        transition: all 0.2s ease-in;\n        cursor: pointer; }\n        c-player .controls .c-right .list-button .list-power:hover, c-player .controls .c-right .list-button .list-power:active {\n          background: rgba(117, 117, 117, 0.3); }\n        c-player .controls .c-right .list-button .list-power .material-icons {\n          margin: auto; }\n      c-player .controls .c-right .lyric-button .lyric-power {\n        display: flex;\n        width: 100%;\n        height: 100%;\n        border-radius: 10%;\n        color: grey;\n        transition: all 0.2s ease-in;\n        cursor: pointer; }\n        c-player .controls .c-right .lyric-button .lyric-power:hover, c-player .controls .c-right .lyric-button .lyric-power:active {\n          background: rgba(117, 117, 117, 0.3); }\n        c-player .controls .c-right .lyric-button .lyric-power .material-icons {\n          margin: auto; }\n  c-player .list {\n    will-change: height;\n    transition: all 0.25s;\n    max-height: 75vh;\n    background: white;\n    overflow: auto; }\n    c-player .list list-body {\n      display: flex;\n      flex-direction: column;\n      overflow: hidden; }\n      c-player .list list-body > * {\n        display: flex;\n        align-items: center;\n        flex: 1;\n        cursor: pointer;\n        transition: 0.5s background 0s ease; }\n        c-player .list list-body > *:nth-child(2n-1) {\n          background: rgba(117, 117, 117, 0.04); }\n        c-player .list list-body > *:hover, c-player .list list-body > *:active {\n          background: rgba(117, 117, 117, 0.13); }\n          c-player .list list-body > *:hover::before, c-player .list list-body > *:active::before {\n            width: 0.4em; }\n        c-player .list list-body > *::before {\n          background: #7dc3da;\n          transition: 0.2s width 0s ease;\n          float: left;\n          height: 2.5em;\n          width: 0em;\n          display: block;\n          content: \"\"; }\n          @media screen and (max-width: 800px) {\n            c-player .list list-body > *::before {\n              height: 3em; }\n              c-player .list list-body > *::before:hover::before, c-player .list list-body > *::before:active::before {\n                width: 0.4em; } }\n      c-player .list list-body .music-name, c-player .list list-body .music-artist {\n        padding: 0 0.5em; }\n      c-player .list list-body .music-name {\n        flex: 1; }\n\n.c-context {\n  z-index: 9999;\n  position: absolute;\n  display: inline-flex;\n  min-width: 5em;\n  height: auto;\n  flex-direction: column;\n  background: #fff;\n  box-shadow: 0 0 3em -1em #000; }\n\n.c-context--list {\n  display: flex;\n  flex: 1;\n  min-height: 2em;\n  padding: 1em;\n  box-sizing: border-box;\n  transition: background 0.5s;\n  will-change: background;\n  cursor: pointer; }\n\n.c-context--list:hover {\n  background: #6af; }\n", "", {"version":3,"sources":["D:/cPlayer/src/scss/cplayer.scss","D:/cPlayer/src/scss/src/scss/cplayer.scss"],"names":[],"mappings":"AAAA,iBAAiB;ACKjB;;;;;;;;;;;;;GAaG;AAoEH;EAkBC,cAAY;EACZ,uBAAsB,EA0OtB;EA7PD;IAEE,YAAU;IACV,aAAW;IACX,WAAS;IACT,eAAa,EACb;EANF;IAQE,YAAU;IACV,WAAS;IACT,YAAU,EACV;EAXF;IAaE,qBAAkB;IAClB,4BAA0B;IAC1B,yBAAuB;IACvB,yBAAuB,EACvB;EAjBF;IAqBE,kFAAa;IACV,sBAAqB;IACrB,mBAAkB;IAClB,qBAAmB,EACtB;EAzBF;IA2BE,oBAAkB;IAClB,sBAAoB;IACpB,cAAY;IACZ,aAAW;IACX,aAAW;IACX,YAAU;IACV,iBAAe;IACf,iBAAe,EA2Bf;IA7DF;MAoCG,uBAAqB;MACrB,eAAa;MAEb,uBAAsB;MACtB,YAAU;MACV,aAAW;MACX,mBAAkB;MAElB,2BAAyB,EAgBzB;MA5DH;QA+CI,QAAM;QACN,eAAa;QACb,wBAAsB;QACtB,iBAAe;QACf,gBAAc;QACd,iBAAe;QACf,sDAAqD;QACrD,YAAU,EAKV;QA3DJ;UAyDK,iBAAe,EACf;EA1DL;IA+DE,kBAAiB;IACjB,YAtJW;IAuJX,cAAY,EAqIZ;IAtMF;MAmEG,cAAY,EA+CZ;MAlHH;QAqEI,cAAY,EAqCZ;QA1GJ;UAuEK,YA7JQ;UA8JR,WA9JQ,EAmKR;UA7EL;YA0EM,kBAAiB,EAEjB;QA5EN;UA+EK,gBAAc;UACd,QAAM;UACN,aAAW;UACX,YAAU;UACV,cAAY;UACZ,iBAAgB;UAChB,uBAAsB;UACtB,aAAY;UACZ,kCAAiC,EAkBjC;UAzGL;YAyFM,cAAY;YACZ,YAAU;YACV,aAAW;YACX,wBAAsB;YACtB,oBAAkB;YAClB,uBAAqB,EACrB;UA/FN;YAiGM,iBAAgB;YAChB,oBAAmB,EACnB;UAnGN;YAqGM,iBAAe;YACf,YAAU;YACV,oBAAmB,EACnB;MAxGN;QA4GI,cAAY;QACZ,oBAAkB;QAClB,wBAAsB;QACtB,mBAAiB;QAtIpB,aAAmB;QACnB,cAAoB;QACpB,oBAAkB;QAClB,0BAAsC;QACtC,aAAW;QACX,gBAAc,EAmIX;IAjHJ;MAyHG,QAAM;MACN,YAAU;MACV,cAAY;MACZ,oBAAkB;MAClB,eAAa,EAKb;MAdA;QApHH;UAsHK,cAAY,EACZ,EAAA;MAvHL;QA+HI,YAAU;QAhMb,mBAAkB;QAClB,qBAAoB;QACpB,gBAAe,EAgMZ;QA/LH;UACC,aAAY;UACZ,cAzBa;UA0Bb,uBAAqB;UACrB,cAAY;UACZ,qBAAmB,EA+BnB;UA9BA;YACC,UAAQ;YACR,aAAW;YACX,0BA/Ba;YAgCb,mBAAiB;YACjB,+BAA6B;YAC7B,mBAAkB;YAClB,qBAAmB,EAsBnB;YArBA;cACC,WApCS;cAqCT,YArCS;cAsCT,2BAAyB;cACzB,0BAAsC;cACtC,oBAAmB;cACnB,mBAAkB;cAClB,SAAO;cACP;;;;;;;;;;;gBAWY,EACZ;IA4BJ;MA0JG,cAAY;MACZ,wBAAuB;MACpB,oBAAmB,EAyCtB;MAjEA;QApIH;UAsIK,QAAM,EAKN;UA3IL;YAwIM,uBAAqB,EAErB;YA1IN;cAyImB,8BAA4B,EAAE;QAzIjD;;UA+IM,cAAY,EACZ;QAhJN;UAkJM,uBAAqB;UACrB,+BAA8B,EAC9B;QApJN;UAsJM,uBAAqB,EACrB,EAAA;MAvJN;QA8JI,WAAS;QACT,YAAU;QACV,gBAAc;QACd,cAAY,EACZ;MAlKJ;QAoKI,oBAAkB;QArOrB,mBAAkB;QAClB,qBAAoB;QACpB,gBAAe;QAqOZ,uBAAsB,EAoBtB;QAxPH;UACC,aAAY;UACZ,cAzBa;UA0Bb,uBAAqB;UACrB,cAAY;UACZ,qBAAmB,EA+BnB;UA9BA;YACC,UAAQ;YACR,aAAW;YACX,0BA/Ba;YAgCb,mBAAiB;YACjB,+BAA6B;YAC7B,mBAAkB;YAClB,qBAAmB,EAsBnB;YArBA;cACC,WApCS;cAqCT,YArCS;cAsCT,2BAAyB;cACzB,0BAAsC;cACtC,oBAAmB;cACnB,mBAAkB;cAClB,SAAO;cACP;;;;;;;;;;;gBAWY,EACZ;QA4BJ;UAwKK,mBAAkB;UAClB,SAAO;UACP,uBAAsB,EACtB;QA3KL;UA6KK,YAAU,EAKV;UAlLL;YA+KM,oBAAmB;YACnB,YAAU,EACV;QAjLN;UAoLK,WAAS;UACT,YAAU,EAIV;UAzLL;YAfC,cAAY;YACZ,YAAU;YACV,aAAW;YACX,mBAAkB;YAClB,YAAU;YACV,6BAA2B;YAC3B,gBAAc,EAiMT;YAxLN;cAPE,qCAA+B,EAC/B;YACD;cACC,aAAW,EACX;MAGF;QAfC,cAAY;QACZ,YAAU;QACV,aAAW;QACX,mBAAkB;QAClB,YAAU;QACV,6BAA2B;QAC3B,gBAAc,EAuMV;QA9LL;UAPE,qCAA+B,EAC/B;QACD;UACC,aAAW,EACX;MAGF;QAfC,cAAY;QACZ,YAAU;QACV,aAAW;QACX,mBAAkB;QAClB,YAAU;QACV,6BAA2B;QAC3B,gBAAc,EA4MV;QAnML;UAPE,qCAA+B,EAC/B;QACD;UACC,aAAW,EACX;EAGF;IAwME,oBAAkB;IAClB,sBAAoB;IAEpB,iBAAgB;IAChB,kBAAgB;IAChB,eAAa,EA+Cb;IA5PF;MA+MG,cAAa;MACb,uBAAsB;MACtB,iBAAgB,EA0ChB;MA3PH;QAmNI,cAAY;QACZ,oBAAkB;QAClB,QAAM;QACN,gBAAc;QACd,oCAAmC,EA6BnC;QApPJ;UAyNK,sCAAiC,EACjC;QA1NL;UA4NK,sCAAiC,EAIjC;UAhOL;YA8NM,aAAW,EACX;QA/NN;UAkOK,oBAAgC;UAChC,+BAA6B;UAC7B,YAAU;UACV,cAAY;UACZ,WAAS;UACT,eAAa;UACb,YAAU,EAWV;UAVA;YAzOL;cA2OO,YAAU,EAMV;cAjPP;gBA8OS,aAAW,EACX,EAAA;MA/OT;QAsPI,iBAAe,EACf;MAvPJ;QAyPI,QAAM,EACN;;AAIH;EACC,cAAY;EACZ,mBAAiB;EACjB,qBAAmB;EACnB,eAAa;EACb,aAAW;EACX,uBAAqB;EACrB,iBAAgB;EAChB,8BAA6B,EAC7B;;AACD;EACC,cAAY;EACZ,QAAM;EACN,gBAAc;EACd,aAAW;EACX,uBAAqB;EACrB,4BAA0B;EAC1B,wBAAsB;EACtB,gBAAc,EACd;;AACD;EACC,iBAAgB,EAChB","file":"cplayer.scss","sourcesContent":["@charset \"UTF-8\";\n/*@keyframes changeSize{\r\n\t0%{\r\n\t\twidth:100%;\r\n\t\theight:100%;\r\n\t\ttop:0;\r\n\t\tleft:0;\r\n\t}\r\n\t100%{\r\n\t\twidth:200%;\r\n\t\theight:200%;\r\n\t\ttop:-50%;\r\n\t\tleft:-50%;\r\n\t}\r\n}*/\nc-player {\n  display: flex;\n  flex-direction: column; }\n  c-player svg {\n    width: 100%;\n    height: 100%;\n    fill: #333;\n    display: block; }\n  c-player .play-icon svg {\n    fill: white;\n    width: 80%;\n    height: 80%; }\n  c-player .invisible {\n    height: 0 !important;\n    overflow: hidden !important;\n    max-height: 0 !important;\n    min-height: 0 !important; }\n  c-player * {\n    font-family: \"Ubuntu Mono\",\"微软雅黑\",\"Microsoft JHenghei\",sans-serif;\n    text-decoration: none;\n    font-size: initial;\n    line-height: initial; }\n  c-player .lyric {\n    will-change: height;\n    transition: all 0.25s;\n    display: flex;\n    height: 20em;\n    height: 45vh;\n    width: 100%;\n    background: #eee;\n    overflow: hidden; }\n    c-player .lyric lyric-body {\n      will-change: transform;\n      display: block;\n      flex-direction: column;\n      width: 100%;\n      height: 100%;\n      text-align: center;\n      transform: translateY(6em); }\n      c-player .lyric lyric-body lrc {\n        flex: 1;\n        display: block;\n        will-change: background;\n        line-height: 3em;\n        min-height: 3em;\n        font-size: large;\n        font-family: \"LiHei Pro\",\"Microsoft Yahei\",sans-serif;\n        width: 100%; }\n        c-player .lyric lyric-body lrc.now {\n          background: #ddd; }\n  c-player .controls {\n    background: white;\n    height: 4em;\n    display: flex; }\n    c-player .controls .c-left {\n      display: flex; }\n      c-player .controls .c-left .music-description {\n        display: flex; }\n        c-player .controls .c-left .music-description .image, c-player .controls .c-left .music-description .image img {\n          height: 4em;\n          width: 4em; }\n          c-player .controls .c-left .music-description .image:hover + .music-meta, c-player .controls .c-left .music-description .image img:hover + .music-meta {\n            max-width: 9999px; }\n        c-player .controls .c-left .music-description .music-meta {\n          margin: 0 0.5em;\n          flex: 1;\n          max-width: 0;\n          width: auto;\n          display: flex;\n          overflow: hidden;\n          flex-direction: column;\n          height: 100%;\n          transition: 1.5s all 0.5s ease-in; }\n          c-player .controls .c-left .music-description .music-meta div {\n            display: flex;\n            width: 100%;\n            height: 100%;\n            justify-content: center;\n            align-items: center;\n            flex-direction: column; }\n          c-player .controls .c-left .music-description .music-meta .music-name {\n            font-size: 1.5em;\n            white-space: nowrap; }\n          c-player .controls .c-left .music-description .music-meta .music-artist {\n            font-size: 0.7em;\n            color: grey;\n            white-space: nowrap; }\n      c-player .controls .c-left .play-icon {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        margin: auto 0.5em;\n        width: 3.2em;\n        height: 3.2em;\n        border-radius: 100%;\n        background-color: #7dc3da;\n        color: white;\n        cursor: pointer; }\n    c-player .controls .c-center {\n      flex: 1;\n      width: auto;\n      display: flex;\n      align-items: center;\n      padding: 0.5em; }\n      @media screen and (max-width: 600px) {\n        c-player .controls .c-center {\n          display: none; } }\n      c-player .controls .c-center .time {\n        width: 100%;\n        touch-action: none;\n        pointer-events: auto;\n        cursor: pointer; }\n        c-player .controls .c-center .time .time-body {\n          margin: 0 1%;\n          height: 0.5em;\n          background-color: #ccc;\n          display: flex;\n          border-radius: 0.5em; }\n          c-player .controls .c-center .time .time-body .time-line {\n            width: 0%;\n            height: 100%;\n            background-color: #359abc;\n            will-change: width;\n            transition: 0.1s width ease-in;\n            position: relative;\n            border-radius: 0.5em; }\n            c-player .controls .c-center .time .time-body .time-line .time-point {\n              width: 1em;\n              height: 1em;\n              margin: -0.25em -0.5em 0 0;\n              background-color: #7dc3da;\n              border-radius: 100%;\n              position: absolute;\n              right: 0;\n              /**&::before{\r\n\t\t\t\t\tcontent:\"\";\r\n\t\t\t\t\tdisplay:block;\r\n\t\t\t\t\twidth:0;\r\n\t\t\t\t\theight:0;\r\n\t\t\t\t\tposition: absolute;\r\n\t\t\t\t\ttop:50%;\r\n\t\t\t\t\tleft:50%;\r\n\t\t\t\t\tbackground-color:rgba($b-color,.5);\r\n\t\t\t\t\tanimation:changeSize 1s ease-in-out infinite alternate;\r\n\t\t\t\t\tborder-radius: 100%;\r\n\t\t\t\t}**********/ }\n    c-player .controls .c-right {\n      display: flex;\n      justify-content: center;\n      align-items: center; }\n      @media screen and (max-width: 600px) {\n        c-player .controls .c-right {\n          flex: 1; }\n          c-player .controls .c-right .volume {\n            width: auto !important; }\n            c-player .controls .c-right .volume .volume-body {\n              visibility: hidden !important; }\n        c-player .controls .c-right.hover .list-button,\n        c-player .controls .c-right.hover .lyric-button {\n          display: none; }\n        c-player .controls .c-right.hover .volume-body {\n          width: 100% !important;\n          visibility: visible !important; }\n        c-player .controls .c-right.hover .volume {\n          width: 100% !important; } }\n      c-player .controls .c-right > * {\n        width: 2em;\n        height: 2em;\n        margin: 0 0.5em;\n        display: flex; }\n      c-player .controls .c-right .volume {\n        align-items: center;\n        touch-action: none;\n        pointer-events: auto;\n        cursor: pointer;\n        transition: width 0.2s; }\n        c-player .controls .c-right .volume .volume-body {\n          margin: 0 1%;\n          height: 0.5em;\n          background-color: #ccc;\n          display: flex;\n          border-radius: 0.5em; }\n          c-player .controls .c-right .volume .volume-body .volume-line {\n            width: 0%;\n            height: 100%;\n            background-color: #359abc;\n            will-change: width;\n            transition: 0.1s width ease-in;\n            position: relative;\n            border-radius: 0.5em; }\n            c-player .controls .c-right .volume .volume-body .volume-line .volume-point {\n              width: 1em;\n              height: 1em;\n              margin: -0.25em -0.5em 0 0;\n              background-color: #7dc3da;\n              border-radius: 100%;\n              position: absolute;\n              right: 0;\n              /**&::before{\r\n\t\t\t\t\tcontent:\"\";\r\n\t\t\t\t\tdisplay:block;\r\n\t\t\t\t\twidth:0;\r\n\t\t\t\t\theight:0;\r\n\t\t\t\t\tposition: absolute;\r\n\t\t\t\t\ttop:50%;\r\n\t\t\t\t\tleft:50%;\r\n\t\t\t\t\tbackground-color:rgba($b-color,.5);\r\n\t\t\t\t\tanimation:changeSize 1s ease-in-out infinite alternate;\r\n\t\t\t\t\tborder-radius: 100%;\r\n\t\t\t\t}**********/ }\n        c-player .controls .c-right .volume .volume-body {\n          visibility: hidden;\n          width: 0;\n          transition: width 0.2s; }\n        c-player .controls .c-right .volume:hover, c-player .controls .c-right .volume:active {\n          width: 12em; }\n          c-player .controls .c-right .volume:hover .volume-body, c-player .controls .c-right .volume:active .volume-body {\n            visibility: visible;\n            width: 100%; }\n        c-player .controls .c-right .volume .volume-button {\n          width: 2em;\n          height: 2em; }\n          c-player .controls .c-right .volume .volume-button .volume-power {\n            display: flex;\n            width: 100%;\n            height: 100%;\n            border-radius: 10%;\n            color: grey;\n            transition: all 0.2s ease-in;\n            cursor: pointer; }\n            c-player .controls .c-right .volume .volume-button .volume-power:hover, c-player .controls .c-right .volume .volume-button .volume-power:active {\n              background: rgba(117, 117, 117, 0.3); }\n            c-player .controls .c-right .volume .volume-button .volume-power .material-icons {\n              margin: auto; }\n      c-player .controls .c-right .list-button .list-power {\n        display: flex;\n        width: 100%;\n        height: 100%;\n        border-radius: 10%;\n        color: grey;\n        transition: all 0.2s ease-in;\n        cursor: pointer; }\n        c-player .controls .c-right .list-button .list-power:hover, c-player .controls .c-right .list-button .list-power:active {\n          background: rgba(117, 117, 117, 0.3); }\n        c-player .controls .c-right .list-button .list-power .material-icons {\n          margin: auto; }\n      c-player .controls .c-right .lyric-button .lyric-power {\n        display: flex;\n        width: 100%;\n        height: 100%;\n        border-radius: 10%;\n        color: grey;\n        transition: all 0.2s ease-in;\n        cursor: pointer; }\n        c-player .controls .c-right .lyric-button .lyric-power:hover, c-player .controls .c-right .lyric-button .lyric-power:active {\n          background: rgba(117, 117, 117, 0.3); }\n        c-player .controls .c-right .lyric-button .lyric-power .material-icons {\n          margin: auto; }\n  c-player .list {\n    will-change: height;\n    transition: all 0.25s;\n    max-height: 75vh;\n    background: white;\n    overflow: auto; }\n    c-player .list list-body {\n      display: flex;\n      flex-direction: column;\n      overflow: hidden; }\n      c-player .list list-body > * {\n        display: flex;\n        align-items: center;\n        flex: 1;\n        cursor: pointer;\n        transition: 0.5s background 0s ease; }\n        c-player .list list-body > *:nth-child(2n-1) {\n          background: rgba(117, 117, 117, 0.04); }\n        c-player .list list-body > *:hover, c-player .list list-body > *:active {\n          background: rgba(117, 117, 117, 0.13); }\n          c-player .list list-body > *:hover::before, c-player .list list-body > *:active::before {\n            width: 0.4em; }\n        c-player .list list-body > *::before {\n          background: #7dc3da;\n          transition: 0.2s width 0s ease;\n          float: left;\n          height: 2.5em;\n          width: 0em;\n          display: block;\n          content: \"\"; }\n          @media screen and (max-width: 800px) {\n            c-player .list list-body > *::before {\n              height: 3em; }\n              c-player .list list-body > *::before:hover::before, c-player .list list-body > *::before:active::before {\n                width: 0.4em; } }\n      c-player .list list-body .music-name, c-player .list list-body .music-artist {\n        padding: 0 0.5em; }\n      c-player .list list-body .music-name {\n        flex: 1; }\n\n.c-context {\n  z-index: 9999;\n  position: absolute;\n  display: inline-flex;\n  min-width: 5em;\n  height: auto;\n  flex-direction: column;\n  background: #fff;\n  box-shadow: 0 0 3em -1em #000; }\n\n.c-context--list {\n  display: flex;\n  flex: 1;\n  min-height: 2em;\n  padding: 1em;\n  box-sizing: border-box;\n  transition: background 0.5s;\n  will-change: background;\n  cursor: pointer; }\n\n.c-context--list:hover {\n  background: #6af; }\n","$c-height:4em;\r\n$p-height:0.5em;\r\n$b-color:#359abc;\r\n$p-radius:1em;\r\n\r\n/*@keyframes changeSize{\r\n\t0%{\r\n\t\twidth:100%;\r\n\t\theight:100%;\r\n\t\ttop:0;\r\n\t\tleft:0;\r\n\t}\r\n\t100%{\r\n\t\twidth:200%;\r\n\t\theight:200%;\r\n\t\ttop:-50%;\r\n\t\tleft:-50%;\r\n\t}\r\n}*/\r\n\r\n@mixin progress($type:time){\r\n\ttouch-action: none;\r\n\tpointer-events: auto;\r\n\tcursor: pointer;\r\n\t.#{$type}-body{\r\n\t\tmargin: 0 1%;\r\n\t\theight:$p-height;\r\n\t\tbackground-color:#ccc;\r\n\t\tdisplay:flex;\r\n\t\tborder-radius:0.5em;\r\n\t\t.#{$type}-line{\r\n\t\t\twidth:0%;\r\n\t\t\theight:100%;\r\n\t\t\tbackground-color:$b-color;\r\n\t\t\twill-change:width;\r\n\t\t\ttransition:0.1s width ease-in;\r\n\t\t\tposition: relative;\r\n\t\t\tborder-radius:0.5em;\r\n\t\t\t.#{$type}-point{\r\n\t\t\t\twidth:$p-radius;\r\n\t\t\t\theight:$p-radius;\r\n\t\t\t\tmargin:-0.25em -0.5em 0 0;\r\n\t\t\t\tbackground-color:lighten($b-color,20%);\r\n\t\t\t\tborder-radius: 100%;\r\n\t\t\t\tposition: absolute;\r\n\t\t\t\tright:0;\r\n\t\t\t\t/**&::before{\r\n\t\t\t\t\tcontent:\"\";\r\n\t\t\t\t\tdisplay:block;\r\n\t\t\t\t\twidth:0;\r\n\t\t\t\t\theight:0;\r\n\t\t\t\t\tposition: absolute;\r\n\t\t\t\t\ttop:50%;\r\n\t\t\t\t\tleft:50%;\r\n\t\t\t\t\tbackground-color:rgba($b-color,.5);\r\n\t\t\t\t\tanimation:changeSize 1s ease-in-out infinite alternate;\r\n\t\t\t\t\tborder-radius: 100%;\r\n\t\t\t\t}**********/\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}\r\n@mixin big-button{\r\n\twidth:0.8*$c-height;\r\n\theight:0.8*$c-height;\r\n\tborder-radius:100%;\r\n\tbackground-color:lighten($b-color,20%);\r\n\tcolor:white;\r\n\tcursor:pointer;\r\n}\r\n@mixin small-button{\r\n\tdisplay:flex;\r\n\twidth:100%;\r\n\theight:100%;\r\n\tborder-radius: 10%;\r\n\tcolor:grey;\r\n\ttransition:all 0.2s ease-in;\r\n\tcursor:pointer;\r\n\t&:hover,&:active{\r\n\t\tbackground:rgba(117,117,117,.3);\r\n\t}\r\n\t.material-icons{\r\n\t\tmargin:auto;\r\n\t}\r\n}\r\n\r\nc-player{\r\n\tsvg{\r\n\t\twidth:100%;\r\n\t\theight:100%;\r\n\t\tfill:#333;\r\n\t\tdisplay:block;\r\n\t}\r\n\t.play-icon svg{\r\n\t\tfill:white;\r\n\t\twidth:80%;\r\n\t\theight:80%;\r\n\t}\r\n\t.invisible{\r\n\t\theight:0!important;\r\n\t\toverflow: hidden!important;\r\n\t\tmax-height: 0!important;\r\n\t\tmin-height: 0!important;\r\n\t}\r\n\tdisplay:flex;\r\n\tflex-direction: column;\r\n\t* {\r\n\t\tfont-family: \"Ubuntu Mono\",\"微软雅黑\",\"Microsoft JHenghei\",sans-serif;\r\n\t    text-decoration: none;\r\n\t    font-size: initial;\r\n\t    line-height:initial;\r\n\t}\r\n\t.lyric{\r\n\t\twill-change:height;\r\n\t\ttransition:all 0.25s;\r\n\t\tdisplay:flex;\r\n\t\theight:20em;\r\n\t\theight:45vh;\r\n\t\twidth:100%;\r\n\t\tbackground:#eee;\r\n\t\toverflow:hidden;\r\n\t\tlyric-body{\r\n\t\t\twill-change:transform;\r\n\t\t\tdisplay:block;\r\n\t\t\t//display:flex;\r\n\t\t\tflex-direction: column;\r\n\t\t\twidth:100%;\r\n\t\t\theight:100%;\r\n\t\t\ttext-align: center;\r\n\t\t\t//padding:6em 0;\r\n\t\t\ttransform:translateY(6em);\r\n\t\t\t//transition: all 0.25s;\r\n\t\t\tlrc{\r\n\t\t\t\tflex:1;\r\n\t\t\t\tdisplay:block;\r\n\t\t\t\twill-change:background;\r\n\t\t\t\tline-height:3em;\r\n\t\t\t\tmin-height:3em;\r\n\t\t\t\tfont-size:large;\r\n\t\t\t\tfont-family: \"LiHei Pro\",\"Microsoft Yahei\",sans-serif;\r\n\t\t\t\twidth:100%;\r\n\t\t\t\t//transition:0.25s background ease;\r\n\t\t\t\t&.now{\r\n\t\t\t\t\tbackground:#ddd;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\t.controls{\r\n\t\tbackground: white;\r\n\t\theight:$c-height;\r\n\t\tdisplay:flex;\r\n\t\t.c-left{\r\n\t\t\tdisplay:flex;\r\n\t\t\t.music-description{\r\n\t\t\t\tdisplay:flex;\r\n\t\t\t\t.image,.image img{\r\n\t\t\t\t\theight:$c-height;\r\n\t\t\t\t\twidth:$c-height;\r\n\t\t\t\t\t&:hover + .music-meta{\r\n\t\t\t\t\t\tmax-width: 9999px;\r\n\t\t\t\t\t\t//margin:0 0.5em;\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t\t.music-meta{\r\n\t\t\t\t\tmargin:0 0.5em;\r\n\t\t\t\t\tflex:1;\r\n\t\t\t\t\tmax-width:0;\r\n\t\t\t\t\twidth:auto;\r\n\t\t\t\t\tdisplay:flex;\r\n\t\t\t\t\toverflow: hidden;\r\n\t\t\t\t\tflex-direction: column;\r\n\t\t\t\t\theight: 100%;\r\n\t\t\t\t\ttransition: 1.5s all 0.5s ease-in;\r\n\t\t\t\t\tdiv{\r\n\t\t\t\t\t\tdisplay:flex;\r\n\t\t\t\t\t\twidth:100%;\r\n\t\t\t\t\t\theight:100%;\r\n\t\t\t\t\t\tjustify-content:center;\r\n\t\t\t\t\t\talign-items:center;\r\n\t\t\t\t\t\tflex-direction:column;\r\n\t\t\t\t\t}\r\n\t\t\t\t\t.music-name{\r\n\t\t\t\t\t\tfont-size: 1.5em;\r\n\t\t\t\t\t\twhite-space: nowrap;\r\n\t\t\t\t\t}\r\n\t\t\t\t\t.music-artist{\r\n\t\t\t\t\t\tfont-size:0.7em;\r\n\t\t\t\t\t\tcolor:grey;\r\n\t\t\t\t\t\twhite-space: nowrap;\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t\t.play-icon{\r\n\t\t\t\tdisplay:flex;\r\n\t\t\t\talign-items:center;\r\n\t\t\t\tjustify-content:center;\r\n\t\t\t\tmargin:auto 0.5em;\r\n\t\t\t\t@include big-button();\r\n\t\t\t}\r\n\t\t}\r\n\t\t.c-center{\r\n\t\t\t@media screen and (max-width: 600px) {\r\n\t\t\t\t&{\r\n\t\t\t\t\tdisplay:none;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t\tflex:1;\r\n\t\t\twidth:auto;\r\n\t\t\tdisplay:flex;\r\n\t\t\talign-items:center;\r\n\t\t\tpadding:0.5em;\r\n\t\t\t.time{\r\n\t\t\t\twidth:100%;\r\n\t\t\t\t@include progress(time);\r\n\t\t\t}\r\n\t\t}\r\n\t\t.c-right{\r\n\t\t\t@media screen and (max-width: 600px) {\r\n\t\t\t\t&{\r\n\t\t\t\t\tflex:1;\r\n\t\t\t\t\t.volume{\r\n\t\t\t\t\t\twidth:auto !important;\r\n\t\t\t\t\t\t.volume-body{visibility: hidden!important}\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t\t&.hover{\r\n\t\t\t\t\t.list-button,\r\n\t\t\t\t\t.lyric-button{\r\n\t\t\t\t\t\tdisplay:none;\r\n\t\t\t\t\t}\r\n\t\t\t\t\t.volume-body{\r\n\t\t\t\t\t\twidth:100% !important;\r\n\t\t\t\t\t\tvisibility: visible !important;\r\n\t\t\t\t\t}\r\n\t\t\t\t\t.volume{\r\n\t\t\t\t\t\twidth:100% !important;\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t\tdisplay:flex;\r\n\t\t\tjustify-content: center;\r\n\t\t    align-items: center;\r\n\t\t\t&>*{\r\n\t\t\t\twidth:2em;\r\n\t\t\t\theight:2em;\r\n\t\t\t\tmargin:0 0.5em;\r\n\t\t\t\tdisplay:flex;\r\n\t\t\t}\r\n\t\t\t.volume{\r\n\t\t\t\talign-items:center;\r\n\t\t\t\t@include progress(volume);\r\n\t\t\t\ttransition: width 0.2s;\r\n\t\t\t\t.volume-body{\r\n\t\t\t\t\tvisibility: hidden;\r\n\t\t\t\t\twidth:0;\r\n\t\t\t\t\ttransition: width 0.2s;\r\n\t\t\t\t}\r\n\t\t\t\t&:hover,&:active{\r\n\t\t\t\t\twidth:12em;\r\n\t\t\t\t\t.volume-body{\r\n\t\t\t\t\t\tvisibility: visible;\r\n\t\t\t\t\t\twidth:100%;\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t\t.volume-button{\r\n\t\t\t\t\twidth:2em;\r\n\t\t\t\t\theight:2em;\r\n\t\t\t\t\t.volume-power{\r\n\t\t\t\t\t\t@include small-button();\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t\t.list-button{\r\n\t\t\t\t.list-power{\r\n\t\t\t\t\t@include small-button();\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t\t.lyric-button{\r\n\t\t\t\t.lyric-power{\r\n\t\t\t\t\t@include small-button();\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\t.list{\r\n\t\twill-change:height;\r\n\t\ttransition:all 0.25s;\r\n\t\t//min-height: 45vh;\r\n\t\tmax-height: 75vh;\r\n\t\tbackground:white;\r\n\t\toverflow:auto;\r\n\t\tlist-body{\r\n\t\t\tdisplay: flex;\r\n\t\t\tflex-direction: column;\r\n\t\t\toverflow: hidden;\r\n\t\t\t&>*{\r\n\t\t\t\tdisplay:flex;\r\n\t\t\t\talign-items:center;\r\n\t\t\t\tflex:1;\r\n\t\t\t\tcursor:pointer;\r\n\t\t\t\ttransition: 0.5s background 0s ease;\r\n\t\t\t\t&:nth-child(2n-1){\r\n\t\t\t\t\tbackground:rgba(117,117,117,0.04);\r\n\t\t\t\t}\r\n\t\t\t\t&:hover,&:active{\r\n\t\t\t\t\tbackground:rgba(117,117,117,0.13);\r\n\t\t\t\t\t&::before{\r\n\t\t\t\t\t\twidth:0.4em;\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t\t&::before{\r\n\t\t\t\t\tbackground:lighten($b-color,20%);\r\n\t\t\t\t\ttransition:0.2s width 0s ease;\r\n\t\t\t\t\tfloat:left;\r\n\t\t\t\t\theight:2.5em;\r\n\t\t\t\t\twidth:0em;\r\n\t\t\t\t\tdisplay:block;\r\n\t\t\t\t\tcontent:\"\";\r\n\t\t\t\t\t@media screen and (max-width: 800px){\r\n\t\t\t\t\t\t&{\r\n\t\t\t\t\t\t\theight:3em;\r\n\t\t\t\t\t\t\t&:hover,&:active{\r\n\t\t\t\t\t\t\t\t&::before{\r\n\t\t\t\t\t\t\t\t\twidth:0.4em;\r\n\t\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t\t.music-name , .music-artist{\r\n\t\t\t\tpadding:0 0.5em;\r\n\t\t\t}\r\n\t\t\t.music-name{\r\n\t\t\t\tflex:1;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}\r\n\t.c-context{\r\n\t\tz-index:9999;\r\n\t\tposition:absolute;\r\n\t\tdisplay:inline-flex;\r\n\t\tmin-width:5em;\r\n\t\theight:auto;\r\n\t\tflex-direction:column;\r\n\t\tbackground: #fff;\r\n\t\tbox-shadow: 0 0 3em -1em #000;\r\n\t}\r\n\t.c-context--list{\r\n\t\tdisplay:flex;\r\n\t\tflex:1;\r\n\t\tmin-height:2em;\r\n\t\tpadding:1em;\r\n\t\tbox-sizing:border-box;\r\n\t\ttransition:background 0.5s;\r\n\t\twill-change:background;\r\n\t\tcursor:pointer;\r\n\t}\r\n\t.c-context--list:hover{\r\n\t\tbackground: #6af;\r\n\t}"],"sourceRoot":""}]);

// exports


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cPlayer", function() { return cPlayer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_modules_cEmitter_class__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_modules_cLyric_function__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_modules_SVG_object__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_modules_cBase_class__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_modules_cContext_class__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__scss_cplayer_scss__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__scss_cplayer_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__scss_cplayer_scss__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/*
    cPlayer
    Author	Corps

    I am the super Corps!
 */
///






var cPlayer = (function (_super) {
    __extends(cPlayer, _super);
    function cPlayer(options) {
        var _this = this;
        var EVENTS = {
            "play": [],
            "pause": [],
            "volumechange": [],
            "timeupdate": [],
            "canplaythrough": [],
            "ended": [],
            //All the above are binded on AUDIO Elements,
            //The following items are Function's callback function.
            "toggle": [],
            "previous": [],
            "next": [],
            "changeList": [],
            "changeLyric": [],
            "slideList": [],
            "slideLyric": [],
            "clickLyricPower": [],
            "clickListPower": [],
            "clickVolumePower": [],
        };
        _this = _super.call(this, EVENTS) || this;
        _this.transLock = false;
        //this = new cEmitter(EVENTS);
        //this.on = (eventName,func)=>this.on(eventName,func);
        /*
         *  參數处理,合并默认参数与定义參數
         */
        var DEFAULTS = {
            "element": document.getElementById("cplayer"),
            "list": []
        };
        _this.options = __assign({}, DEFAULTS, options);
        _this.CBASE = new __WEBPACK_IMPORTED_MODULE_3_modules_cBase_class__["a" /* cBase */];
        _this.now = 0;
        _this.dragging = { contain: false, target: document.body };
        //现在开始填DOM
        _this.options.element.innerHTML += '<c-player><div class="lyric invisible"><lyric-body></lyric-body></div><div class="controls"><div class="c-left"><div class="music-description"><div class="image"><img class="meta-bak"></div><div class="music-meta"><div><span class="music-name"></span><span class="music-artist"></span></div></div></div><a class="play-icon"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48"><path d="M16 10v28l22-14z"></path></svg></a></div><div class="c-center"><div class="time"><div class="time-body"><div class="time-line"><div class="time-point"></div></div></div></div></div><div class="c-right"><div class="volume"><div class="volume-button"><a class="volume-power"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48"><path d="M33 24c0-3.53-2.04-6.58-5-8.05v4.42l4.91 4.91c.06-.42.09-.85.09-1.28zm5 0c0 1.88-.41 3.65-1.08 5.28l3.03 3.03C41.25 29.82 42 27 42 24c0-8.56-5.99-15.72-14-17.54v4.13c5.78 1.72 10 7.07 10 13.41zM8.55 6L6 8.55 15.45 18H6v12h8l10 10V26.55l8.51 8.51c-1.34 1.03-2.85 1.86-4.51 2.36v4.13c2.75-.63 5.26-1.89 7.37-3.62L39.45 42 42 39.45l-18-18L8.55 6zM24 8l-4.18 4.18L24 16.36V8z"></path></svg></a></div><div class="volume-body"><div class="volume-line"><div class="volume-point"></div></div></div></div><div class="list-button"><a class="list-power"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-12 -12 48 48" enable-background="new -12 -12 48 48"><path d="M26 6H-8v4h34V6zm0-8H-8v4h34v-4zM-8 18h26v-4H-8v4zm30-4v12l10-6-10-6z"></path></svg></a></div><div class="lyric-button"><a class="lyric-power"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48"><path d="M44 20L32 8H8c-2.2 0-4 1.8-4 4v24.02C4 38.22 5.8 40 8 40l32-.02c2.2 0 4-1.78 4-3.98V20zm-14-9l11 11H30V11z"></path></svg></a></div></div></div><div class="list invisible"><list-body></list-body></div></c-player>';
        (function () {
            var res = _this.options.element.getElementsByTagName("c-player");
            _this.CBASE.root = res[res.length - 1];
        })();
        //然后为DOMList填充一下吧
        _this.__LIST__ = {
            "lyric": _this.CBASE.getByClass("lyric"),
            "lyricBody": _this.CBASE.getByTagName("lyric-body"),
            "toggle": _this.CBASE.getByClass("play-icon"),
            "img": _this.CBASE.getByClass("meta-bak"),
            "name": _this.CBASE.getByClass("music-name"),
            "artist": _this.CBASE.getByClass("music-artist"),
            "time": _this.CBASE.getByClass("time"),
            "timeBody": _this.CBASE.getByClass("time-body"),
            "timeLine": _this.CBASE.getByClass("time-line"),
            "timePoint": _this.CBASE.getByClass("time-point"),
            "lyricPower": _this.CBASE.getByClass("lyric-power"),
            "volumePower": _this.CBASE.getByClass("volume-power"),
            "volumeBody": _this.CBASE.getByClass("volume-body"),
            "volumeLine": _this.CBASE.getByClass("volume-line"),
            "volumePoint": _this.CBASE.getByClass("volume-point"),
            "volume": _this.CBASE.getByClass("volume"),
            "listPower": _this.CBASE.getByClass("list-power"),
            "list": _this.CBASE.getByClass("list"),
            "listBody": _this.CBASE.getByTagName("list-body")
        };
        _this.__LIST__.toggleIcon = _this.CBASE.getByTagName("svg", _this.__LIST__.toggle);
        _this.__LIST__.volumeIcon = _this.CBASE.getByTagName("svg", _this.__LIST__.volumePower);
        var that = _this;
        function dragPercentage(options) {
            /*
                While anything...
                rightTarget(if.it.possible)[
                    0 -> sth.point
                    1 -> sth.line
                    2 -> sth.point & sth.line & sth.body
                ]
            */
            var rightTarget = [];
            Object.defineProperties(rightTarget, {
                0: {
                    get: function () {
                        return options.target === that.__LIST__.timePoint
                            || options.target === that.__LIST__.volumePoint;
                    }
                },
                1: {
                    get: function () {
                        return options.target === that.__LIST__.timeLine
                            || options.target === that.__LIST__.volumeLine;
                    }
                },
                2: {
                    get: function () {
                        return options.target === that.__LIST__.timeBody
                            || options.target === that.__LIST__.volumeBody;
                    }
                }
            });
            if (!(rightTarget[2] || rightTarget[1] || rightTarget[0]))
                return; //Warning!!! rightTarget[2] checks if mouse focus on the percentage.
            that.dragging.contain = true;
            that.dragging.target = options.target;
            var mover = function (options) {
                if (that.dragging.contain === false)
                    return;
                if (!rightTarget[0])
                    return;
                var parent = that.dragging.target.parentNode.parentNode;
                if (parent.classList && parent.classList.contains("volume-body")) {
                    that.__LIST__.volumeLine.style.width = (options.clientX - parent.getBoundingClientRect().left) / parent.offsetWidth * 100 + "%";
                }
                else if (parent.classList && parent.classList.contains("time-body")) {
                    that.__LIST__.timeLine.style.width = (options.clientX - parent.getBoundingClientRect().left) / parent.offsetWidth * 100 + "%";
                }
                //实时修正VOLUME
                if (parent.classList.contains("volume-body")) {
                    var vol = (options.clientX - parent.getBoundingClientRect().left) / parent.offsetWidth;
                    vol = vol > 1 ? 1 : vol;
                    vol = vol < 0 ? 0 : vol;
                    that.music.volume = vol;
                }
                window.addEventListener("mouseup", upper, { "once": true });
            };
            var upper = function (options) {
                window.removeEventListener("mousemove", mover);
                var parent;
                if (that.dragging.contain === false)
                    return;
                /*
                    While anything...
                    sth.body -> self
                    sth.line -> parent
                    sth.point-> parent.parent
                */
                if (false) { }
                else if (rightTarget[0]) {
                    parent = that.dragging.target.parentNode.parentNode;
                }
                else if (rightTarget[1]) {
                    parent = that.dragging.target.parentNode;
                }
                else if (rightTarget[2]) {
                    parent = that.dragging.target;
                }
                else
                    throw new Error(JSON.stringify([that.dragging.target, rightTarget]));
                if (parent.classList.contains("volume-body")) {
                    var vol = (options.clientX - parent.getBoundingClientRect().left) / parent.offsetWidth;
                    vol = vol > 1 ? 1 : vol;
                    vol = vol < 0 ? 0 : vol;
                    that.music.volume = vol;
                }
                else if (parent.classList.contains("time-body")) {
                    var time = (options.clientX - parent.getBoundingClientRect().left) / parent.offsetWidth;
                    time = time > 1 ? 1 : time;
                    time = time < 0 ? 0 : time;
                    that.updateTime(time * that.music.duration);
                }
                that.dragging.contain = false;
                that.dragging.target = undefined;
            };
            window.addEventListener("mousemove", mover);
            window.addEventListener("click", upper, { "once": true });
        }
        _this.music = document.createElement("audio");
        _this.music.autoplay = !!_this.options.autoplay;
        _this.music.preload = "metadata";
        //绑定事件开始:
        _this.on("toggle", function () {
            if (_this.isPaused()) {
                _this.play();
            }
            else {
                _this.pause();
            }
        }).on("clickLyricPower", function () {
            if (_this.hasLyric(_this.now) && _this.__LIST__.lyric.classList.contains("invisible")) {
                _this.showLyric();
            }
            else if (_this.hasLyric(_this.now) && !_this.__LIST__.lyric.classList.contains("invisible")) {
                _this.hideLyric();
            }
        }).on("clickListPower", function () {
            if (_this.hasList() && _this.__LIST__.list.classList.contains("invisible")) {
                _this.showList();
            }
            else if (_this.hasList() && !_this.__LIST__.list.classList.contains("invisible")) {
                _this.hideList();
            }
        }).on("clickVolumePower", function () {
            if (window.innerWidth < 600) {
                _this.__LIST__.volume.parentElement.classList.toggle("hover");
                return;
            }
            if (_this.isMuted()) {
                _this.music.muted = false;
            }
            else {
                _this.volume(0);
            }
        }).on("timeupdate", function () {
            _this.updateTime();
            if (_this.hasLyric(_this.now))
                _this._slideLyric(_this.music.currentTime);
        }).on("volumechange", function () {
            _this.volume(); //做更新界面用.
        }).on("pause", function () {
            _this.CBASE.replaceInner(_this.__LIST__.toggle, __WEBPACK_IMPORTED_MODULE_2_modules_SVG_object__["a" /* SVG */].playArrow);
        }).on("play", function () {
            _this.CBASE.replaceInner(_this.__LIST__.toggle, __WEBPACK_IMPORTED_MODULE_2_modules_SVG_object__["a" /* SVG */].pause);
            _this.__LIST__.toggleIcon = _this.CBASE.getByTagName("svg", _this.__LIST__.toggle);
        }).on("ended", function () {
            _this.CBASE.style(_this.__LIST__.lyricBody, "transform", "");
            if (_this.options.list[_this.now].loop === true) {
                _this.updateTime(0);
                _this.play();
            }
            else if (_this.hasList() && _this.now !== _this.options.list.length - 1) {
                _this.next();
            }
        });
        //结束
        new __WEBPACK_IMPORTED_MODULE_4_modules_cContext_class__["a" /* cContext */]({
            element: _this.options.element, items: [
                { "name": "上一曲", "action": function () { return _this.previous(); } },
                { "name": "下一曲", "action": function () { return _this.next(); } },
                { "name": "翻译", "action": function () { return _this.translate(); } }
            ]
        });
        if (_this.options.list[0])
            _this._toggle();
        _this.__LIST__.toggle.addEventListener("click", function () { return _this.emit("toggle"); });
        _this.__LIST__.lyricPower.addEventListener("click", function () { return _this.emit("clickLyricPower"); });
        _this.__LIST__.listPower.addEventListener("click", function () { return _this.emit("clickListPower"); });
        _this.__LIST__.volumePower.addEventListener("click", function () { return _this.emit("clickVolumePower"); });
        _this.music.addEventListener("volumechange", function (ev) { return _this.emit("volumechange", ev); });
        _this.music.addEventListener("timeupdate", function (ev) { return _this.emit("timeupdate", ev); });
        _this.music.addEventListener("canplaythrough", function () { return _this.emit("canplaythrough"); });
        _this.music.addEventListener("pause", function () { return _this.emit("pause"); });
        _this.music.addEventListener("play", function () { return _this.emit("play"); });
        _this.music.addEventListener("ended", function () { return _this.emit("ended"); });
        _this.options.element.addEventListener("mousedown", function (a) { return dragPercentage(a); });
        _this.volume();
        _this._refreshList();
        return _this;
    }
    ;
    cPlayer.prototype.volume = function (vl) {
        var _this = this;
        if (vl === void 0) { vl = undefined; }
        var checkLevel = function () {
            if (_this.music.volume === 0 || _this.isMuted()) {
                _this.CBASE.replaceInner(_this.__LIST__.volumePower, __WEBPACK_IMPORTED_MODULE_2_modules_SVG_object__["a" /* SVG */].volumeOff);
            }
            else if (_this.music.volume > 0 && _this.music.volume <= 0.5) {
                _this.CBASE.replaceInner(_this.__LIST__.volumePower, __WEBPACK_IMPORTED_MODULE_2_modules_SVG_object__["a" /* SVG */].volumeDown);
            }
            else if (_this.music.volume > 0.5 && _this.music.volume <= 1) {
                _this.CBASE.replaceInner(_this.__LIST__.volumePower, __WEBPACK_IMPORTED_MODULE_2_modules_SVG_object__["a" /* SVG */].volumeUp);
            }
            else {
                console.log("Unexcepted Volume: " + _this.music.volume);
            }
        };
        if (vl === undefined) {
            this.__LIST__.volumeLine.style.width = (this.music.volume * 100) + "%";
            checkLevel();
            return this.isMuted() ? 0 : this.music.volume;
        }
        else {
            if (vl === 0) {
                this.music.muted = true;
                checkLevel();
            }
            else {
                this.music.volume = vl;
                checkLevel();
            }
        }
    };
    cPlayer.prototype.isMuted = function () {
        return this.music.muted;
    };
    cPlayer.prototype.play = function () {
        if (this.music.seeking === true)
            return this;
        this.music.play();
        return this;
    };
    cPlayer.prototype.pause = function () {
        if (this.music.seeking === true)
            return;
        this.music.pause();
        return this;
    };
    cPlayer.prototype.previous = function () {
        this.emit("previous");
        if (this.now === 0)
            return;
        this.now--;
        this._toggle().play();
        return this;
    };
    cPlayer.prototype.next = function () {
        this.emit("next");
        if (this.now === this.options.list.length - 1)
            return;
        this.now++;
        this._toggle().play();
        return this;
    };
    cPlayer.prototype.to = function (now) {
        this.now = now;
        this._toggle();
        this.play();
        return this;
    };
    cPlayer.prototype._toggle = function (now) {
        if (now === void 0) { now = this.now; }
        var list = this.options.list[now], dom = this.__LIST__;
        this.music.pause();
        _a = [list.image, list.name, list.artist, list.url === undefined ? "" : list.url], dom.img.src = _a[0], dom.name.innerHTML = _a[1], dom.artist.innerHTML = _a[2], this.music.src = _a[3];
        this.transLock = false;
        this.refreshLyric();
        if (!this.hasLyric(this.now))
            this.hideLyric();
        this.CBASE.style(this.__LIST__.lyricBody, "transform", "");
        return this;
        var _a;
    };
    cPlayer.prototype.isPaused = function () {
        return this.music.paused;
    };
    cPlayer.prototype.hasLyric = function (id) {
        if (id === void 0) { id = 0; }
        return (this.options.list[id].lyric != undefined);
    };
    cPlayer.prototype.showLyric = function () {
        this.emit("slideLyric", true);
        if (this.hasLyric(this.now))
            this.__LIST__.lyric.classList.remove("invisible");
        if (!this.__LIST__.list.classList.contains("invisible"))
            this.hideList();
        return this;
    };
    cPlayer.prototype.hideLyric = function () {
        this.emit("slideLyric", false);
        this.__LIST__.lyric.classList.add("invisible");
        return this;
    };
    cPlayer.prototype.hasList = function () {
        return (this.options.list.length > 1);
    };
    cPlayer.prototype.showList = function () {
        this.emit("slideList", true);
        this.__LIST__.list.classList.remove("invisible");
        if (!this.__LIST__.lyric.classList.contains("invisible"))
            this.hideLyric();
        return this;
    };
    cPlayer.prototype.hideList = function () {
        this.emit("slideList", false);
        this.__LIST__.list.classList.add("invisible");
        return this;
    };
    cPlayer.prototype._refreshList = function () {
        var _this = this;
        this.emit("changeList");
        var list = this.options.list, lb = this.__LIST__.listBody;
        lb.innerHTML = "";
        var _loop_1 = function (i) {
            var div = document.createElement("div");
            div.innerHTML = '<span class="music-name">' + list[i].name + '</span><span class="music-artist">' + list[i].artist + '</span>';
            div = lb.appendChild(div);
            div.addEventListener("click", function () {
                _this.to(i);
            });
        };
        for (var i = 0; i <= list.length - 1; i++) {
            _loop_1(i);
        }
    };
    cPlayer.prototype.add = function (u) {
        var _this = this;
        var ln = this.options.list.push(u);
        var div = document.createElement("div");
        div.innerHTML = '<span class="music-name">' + u.name + '</span><span class="music-artist">' + u.artist + '</span>';
        div = this.__LIST__.listBody.appendChild(div);
        div.addEventListener("click", function () {
            _this.to(ln - 1);
        });
        if (ln === 1)
            this._toggle(); //刷新元素.
        return this;
    };
    cPlayer.prototype.remove = function (id) {
        this.options.list.splice(id, 1);
        this._refreshList();
        return this;
    };
    cPlayer.prototype.lyric = function (content) {
        if (content === void 0) { content = undefined; }
        if (content === undefined) {
            if (this.hasLyric(this.now))
                return this.options.list[this.now].lyric;
        }
        else {
            this.options.list[this.now].lyric = content;
            this.refreshLyric();
        }
        return this;
    };
    cPlayer.prototype.refreshLyric = function (isTrans) {
        if (isTrans === void 0) { isTrans = false; }
        //REQUIRE LYRIC...
        this.__LIST__.lyricBody.innerHTML = "";
        if (!this.hasLyric(this.now))
            return;
        var lr = isTrans !== false ?
            this.options.list[this.now].transLyric
            : this.options.list[this.now].lyric;
        var lyric = Object(__WEBPACK_IMPORTED_MODULE_1_modules_cLyric_function__["a" /* cLyric */])(lr);
        lyric["now"] = 0;
        this.__LYRIC__ = lyric;
        for (var i = 0; i <= lyric.length - 1; i++) {
            var div = document.createElement("lrc");
            div.innerHTML = lyric[i].content;
            this.__LIST__.lyricBody.appendChild(div);
        }
        this.emit("changeLyric");
    };
    cPlayer.prototype.updateTime = function (time, func) {
        if (time === void 0) { time = undefined; }
        if (time !== undefined)
            this.music.currentTime = time;
        if (this.dragging.contain === false)
            this.__LIST__.timeLine.style.width = (this.music.currentTime / this.music.duration) * 100 + "%";
        if (func !== undefined)
            func(this.music.currentTime);
    };
    cPlayer.prototype._slideLyric = function (time) {
        if (this.__LIST__.lyric.classList.contains("invisible"))
            return;
        var lyricToTop, halfBody, translateY, lyricBody = this.__LIST__.lyricBody, lrc = this.__LIST__.lyricBody.getElementsByTagName("lrc");
        var clear = function (list) {
            for (var n = list.length - 1; n >= 0; n--)
                if (list[n] !== lrc[i])
                    list[n].classList.remove("now");
        };
        //遍历Lyric,寻找当前时间的歌词
        //注意:[].find & [].findIndex 仅返回符合要求元素组成的数组第一项,符合要求元素组成的数组的顺序参考原数组不变
        //现在的写法需要__LYRIC__属性具有time从小到大排列的顺序,详见refreshLyric()方法
        var lyric = this.CBASE.find(this.__LYRIC__, function (element) { return element.time < time; }).reverse()[0];
        var i = [].indexOf.call(this.__LYRIC__, lyric);
        if (i < 0) {
            this.CBASE.style(lyricBody, "transform", "");
            var list_1 = this.__LIST__.lyricBody.getElementsByClassName("now");
            clear(list_1);
            return;
        }
        if (this.__LYRIC__["now"] !== i)
            this.__LYRIC__["now"] = i;
        lrc[i].classList.add("now");
        lyricToTop = lyricBody.childNodes[i].offsetTop - lyricBody.childNodes[0].offsetTop - 0.5 * lyricBody.childNodes[i].clientHeight;
        halfBody = 0.5 * this.__LIST__.lyric.clientHeight - lyricBody.childNodes[i].clientHeight;
        translateY = -(lyricToTop - halfBody);
        this.CBASE.style(lyricBody, "transform", "translateY(" + translateY + "px)");
        var list = this.__LIST__.lyricBody.getElementsByClassName("now");
        if (list.length > 1)
            clear(list);
    };
    cPlayer.prototype.translate = function () {
        if (!this.options.list[this.now].transLyric || !this.hasLyric(this.now))
            return false;
        this.transLock = !this.transLock;
        this.refreshLyric(this.transLock);
    };
    Object.defineProperty(cPlayer.prototype, "length", {
        get: function () {
            return this.options.list.length;
        },
        set: function (length) {
            throw new SyntaxError("Read-only Property.");
        },
        enumerable: true,
        configurable: true
    });
    return cPlayer;
}(__WEBPACK_IMPORTED_MODULE_0_modules_cEmitter_class__["a" /* cEmitter */]));
console.log("\n%ccPlayer%cv" + (cPlayer.version = "2.5.001") + "%c\n\n", "padding:7px;background:#cd3e45;font-family:'Sitka Heading';font-weight:bold;font-size:large;color:white", "padding:7px;background:#ff5450;font-family:'Sitka Text';font-size:large;color:#eee", "");



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cEmitter; });
var cEmitter = (function () {
    function cEmitter(typeList) {
        if (typeList) {
            this.events = typeList;
        }
        else {
            this.events = {};
        }
    }
    cEmitter.prototype.on = function (eventName, func) {
        if (this.events[eventName] && this.events[eventName].push !== undefined && typeof func === "function") {
            this.events[eventName].push(func);
        }
        else if (this.events[eventName] === undefined || this.events[eventName].push === undefined) {
            this.events[eventName] = [];
        }
        else {
            throw new TypeError("Uncaught Unexcepted TypeError.");
        }
        return this;
    };
    cEmitter.prototype.emit = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < this.events[eventName].length; i++) {
            this.events[eventName][i](args);
        }
        return this;
    };
    return cEmitter;
}());


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = cLyric;
function cLyric(lrc) {
    var offset = 0, lyricArray = [];
    lrc.replace(/\n+/gi, "\n").split("\n").forEach(function (content) {
        //content is like:
        // [00:12.34]JUUUUUUUUUUUUUUMP!!!!!!
        //get OFFSET
        if (content.indexOf("offset") !== -1)
            offset = parseInt((/offset\:(\d+)/gi).exec(content)[1]);
        //get Lyric and translate it.
        //ar[] -> [1.24,2.21,36.15,"HEY!"]
        if (/\[\d+:[\d\.]+\]/gi.test(content)) {
            var ar_1 = [];
            [].forEach.call(content.match(/\[\d+\:[\.\d]+\]/gi), function (e) {
                var number = /\[(\d+)\:([\.\d]+)\]/gi.exec(e);
                ar_1.push(parseInt(number[1]) * 60 + parseFloat(number[2]) - offset * 0.001);
            });
            ar_1.push(/(?:\[\d+\:[\.\d]+\])*(.*)/gi.exec(content)[1]);
            do {
                lyricArray.push({ time: ar_1.shift(), content: ar_1[ar_1.length - 1] });
            } while (ar_1.length > 1);
        }
    });
    return lyricArray.sort(function (a, b) {
        return a.time - b.time;
    });
}
;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SVG; });
var SVG = {
    "playArrow": 'M16 10v28l22-14z',
    "pause": 'M12 38h8V10h-8v28zm16-28v28h8V10h-8z',
    "playlistPlay": 'M26 6H-8v4h34V6zm0-8H-8v4h34v-4zM-8 18h26v-4H-8v4zm30-4v12l10-6-10-6z',
    "note": 'M44 20L32 8H8c-2.2 0-4 1.8-4 4v24.02C4 38.22 5.8 40 8 40l32-.02c2.2 0 4-1.78 4-3.98V20zm-14-9l11 11H30V11z',
    "volumeUp": 'M6 18v12h8l10 10V8L14 18H6zm27 6c0-3.53-2.04-6.58-5-8.05v16.11c2.96-1.48 5-4.53 5-8.06zM28 6.46v4.13c5.78 1.72 10 7.07 10 13.41s-4.22 11.69-10 13.41v4.13c8.01-1.82 14-8.97 14-17.54S36.01 8.28 28 6.46z',
    "volumeMute": 'M14 18v12h8l10 10V8L22 18h-8z',
    "volumeOff": 'M33 24c0-3.53-2.04-6.58-5-8.05v4.42l4.91 4.91c.06-.42.09-.85.09-1.28zm5 0c0 1.88-.41 3.65-1.08 5.28l3.03 3.03C41.25 29.82 42 27 42 24c0-8.56-5.99-15.72-14-17.54v4.13c5.78 1.72 10 7.07 10 13.41zM8.55 6L6 8.55 15.45 18H6v12h8l10 10V26.55l8.51 8.51c-1.34 1.03-2.85 1.86-4.51 2.36v4.13c2.75-.63 5.26-1.89 7.37-3.62L39.45 42 42 39.45l-18-18L8.55 6zM24 8l-4.18 4.18L24 16.36V8z',
    "volumeDown": 'M37 24c0-3.53-2.04-6.58-5-8.05v16.11c2.96-1.48 5-4.53 5-8.06zm-27-6v12h8l10 10V8L18 18h-8z',
};
for (var i = 0, keys = Object.keys(SVG), length_1 = keys.length; i < length_1; i++) {
    var svg = keys[i] === "playlistPlay" ?
        '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-12 -12 48 48" enable-background="new -12 -12 48 48"><path d="' + SVG[keys[i]] + '"/></svg>' :
        '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 48 48"><path d="' + SVG[keys[i]] + '"/></svg>';
    SVG[keys[i]] = svg;
}



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cBase; });
var cBase = (function () {
    function cBase(rootNode) {
        if (rootNode === void 0) { rootNode = document.documentElement; }
        var _this = this;
        this.root = rootNode;
        var _loop_1 = function (styleList, i) {
            ["-webkit-", "-moz-", "-o-", "-ms-"].forEach(function (element) {
                if (styleList[i].indexOf(element) !== -1) {
                    _this.browser = element.replace("-", "");
                }
                ;
            });
            if (this_1.browser)
                return "break";
        };
        var this_1 = this;
        for (var styleList = document.documentElement.style, i = styleList.length; i > 0; i--) {
            var state_1 = _loop_1(styleList, i);
            if (state_1 === "break")
                break;
        }
    }
    cBase.prototype.replace = function (oldElement, newElement) {
        //newElement 不存在于oldElement 的父元素中,首先载入.
        newElement = newElement.cloneNode(true);
        oldElement.parentNode.appendChild(newElement);
        oldElement.parentNode.removeChild(oldElement);
        //顺便如果有值为oldElement的变量,请重新赋值.
    };
    cBase.prototype.replaceInner = function (element, innerContent) {
        //进行一次简单的封装
        element.innerHTML = innerContent;
    };
    cBase.prototype.getByClass = function (className, parentElement) {
        return parentElement != undefined ?
            parentElement.getElementsByClassName(className)[0]
            : this.root.getElementsByClassName(className)[0];
    };
    cBase.prototype.getByTagName = function (tagName, parentElement) {
        return parentElement != undefined ?
            parentElement.getElementsByTagName(tagName)[0]
            : this.root.getElementsByTagName(tagName)[0];
    };
    cBase.prototype.rand = function (start, end) {
        if (!start || !end)
            return Math.random();
        if (start > end)
            throw new RangeError("the EndNumber must be bigger than the StartNumber");
        return (end - start) * Math.random() + start;
    };
    cBase.prototype.find = function (array, func) {
        var ar = [];
        [].forEach.call(array, function (el) {
            if (!!func(el))
                ar.push(el);
        });
        return ar;
    };
    cBase.prototype.style = function (dom, property, content) {
        //不管浏览器，暴力加前缀
        dom.style[(this.browser + property.slice(0, 1).toUpperCase() + property.slice(1))] = content;
        dom.style[property] = content;
    };
    return cBase;
}());



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cContext; });
var cContext = (function () {
    /*
     * options:{
     *            "element":element,
     *            "items":[
     *                {"name":"XXX","action":func},
     *                {"name":"XXX","action":func},
     *            ]
     *         }
     */
    function cContext(options) {
        var _this = this;
        if (!options.element)
            throw new Error("Need a element to bind.");
        this.options = options;
        this.options.element.oncontextmenu = function () {
            return false;
        };
        this.options.element.addEventListener("contextmenu", function (a) {
            _this.hide();
            _this.show(a);
            return false;
        });
        document.documentElement.addEventListener("click", function () { return _this.hide(); });
        return this;
    }
    cContext.prototype.add = function (_a) {
        var name = _a.name, action = _a.action;
        this.options.items.push({ name: name, action: action });
        return this;
    };
    cContext.prototype.show = function (_a) {
        var pageX = _a.pageX, pageY = _a.pageY;
        var content = document.createElement("div");
        content.classList.add("c-context");
        for (var items = this.options.items, i = 0; i < items.length; i++) {
            content.appendChild(document.createElement("div"));
            content.children[i].classList.add("c-context--list");
            content.children[i].innerHTML = items[i].name;
            //content.innerHTML+=`<div class="c-context--list">${items[i].name}</div>`;
            content.children[i].addEventListener("click", items[i].action);
        }
        document.body.appendChild(content);
        //Set the offset-x
        if (document.documentElement.clientWidth > content.offsetWidth) {
            content.style.left = document.documentElement.clientWidth > (content.offsetWidth + pageX) ?
                pageX + "px" : pageX - content.offsetWidth + "px";
        }
        else {
            content.style.width = document.documentElement.clientWidth + "px";
        }
        //Set the offset-y
        if (document.documentElement.clientHeight > content.offsetHeight) {
            content.style.top = document.documentElement.clientHeight > (content.offsetHeight + pageY) ?
                pageY + "px" : pageY - content.offsetHeight + "px";
        }
        content.style.visibility = "visible";
        return this;
    };
    cContext.prototype.hide = function () {
        for (var list = document.getElementsByClassName("c-context"), i = list.length - 1; i >= 0; i--)
            document.body.removeChild(list[i]);
        return this;
    };
    Object.defineProperty(cContext.prototype, "items", {
        get: function () {
            return this.options.items;
        },
        set: function (context) {
            this.options.items = context;
        },
        enumerable: true,
        configurable: true
    });
    return cContext;
}());



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(0);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(0, function() {
			var newContent = __webpack_require__(0);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(10);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=cplayer.js.map