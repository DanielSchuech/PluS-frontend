'use strict';

declare var require: any; 
declare var __dirname: string;

let express = require('express');
let tinydi = require('tiny-di');
let serverConfig = require('./config');

export default class Server {
  public app: any;
  private server: any;
  
  private $injector: any;
  private pluginInfo:any;
  private pluginStatus: any;
  
  constructor(_pluginInfo: any, _pluginStatus: any) {
    this.pluginStatus = _pluginStatus;
    this.pluginInfo = _pluginInfo;
  }
  
  start(config: any) {
    this.$injector = new tinydi();
    this.$injector.setResolver(dependencyResolver);
    this.$injector.bind('serverConfig').to(serverConfig);
    this.$injector.bind('config').to(config);
    this.$injector.bind('PluginInfo').to(this.pluginInfo);
    this.$injector.bind('pluginStatus').to(this.pluginStatus);
    
    this.app = express();
    
    this.$injector.bind('server').to(this.app);
    
    this.server = this.app.listen(config.port);
    console.log('Wrapper started on ' + config.port);
    
    loadExtensions(this.$injector);
    loadModules(this.$injector);
  }
}

(<any>Server).$inject = {
  deps: ['PluginInfo', 'pluginStatus'],
  callAs: 'class'
}

function loadModules($injector: any) {
    serverConfig.server.modules.forEach(function(module: any) {
      let file: string = module.file || module.module;
      $injector.bind(module.module).load(file);
    });
  }

function loadExtensions($injector: any) {
  serverConfig.server.extensions.forEach(function(extension: any) {
    let file: string = extension.file || extension.extension;
    $injector.bind(extension.extension).load(file);
  });
}

function dependencyResolver(moduleId: string) {
  let path: string = __dirname + '/' + moduleId;
  
  try {
    let module: any = require(path);
    
    //default exported classes are pointed to default
    if (!(module instanceof Function)) {
      module = module.default;
    }
    
    return module;
  } catch(e) {
    console.log('Failed to load ' + moduleId);
    console.log('errors', e);
    console.log((<any>new Error()).stack);
    return false;
  }
}
