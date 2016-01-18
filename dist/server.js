'use strict';
var express = require('express');
var tinydi = require('tiny-di');
var serverConfig = require('./config');
var Server = (function () {
    function Server() {
    }
    Server.prototype.start = function (config) {
        this.$injector = new tinydi();
        this.$injector.setResolver(dependencyResolver);
        this.$injector.bind('serverConfig').to(serverConfig);
        this.$injector.bind('config').to(config);
        this.app = express();
        this.$injector.bind('server').to(this.app);
        this.server = this.app.listen(config.port);
        console.log('Wrapper started on ' + config.port);
        loadExtensions(this.$injector);
        loadModules(this.$injector);
    };
    return Server;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Server;
Server.$inject = {
    deps: [],
    callAs: 'class'
};
function loadModules($injector) {
    serverConfig.server.modules.forEach(function (module) {
        var file = module.file || module.module;
        $injector.bind(module.module).load(file);
    });
}
function loadExtensions($injector) {
    serverConfig.server.extensions.forEach(function (extension) {
        var file = extension.file || extension.extension;
        $injector.bind(extension.extension).load(file);
    });
}
function dependencyResolver(moduleId) {
    var path = __dirname + '/' + moduleId;
    try {
        var module = require(path);
        //default exported classes are pointed to default
        if (!(module instanceof Function)) {
            module = module.default;
        }
        return module;
    }
    catch (e) {
        console.log('Failed to load ' + moduleId);
        console.log('errors', e);
        console.log((new Error()).stack);
        return false;
    }
}
