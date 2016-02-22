declare var require: any;

let path = require('path');

export default class PluginHandler {
  
  private pluginInfo: any;
  private server: any;
  private pluginStatus: any;
  
  private loadedFrontends: string[] = [];
  
  constructor(server: any, pluginInfo:any, pluginStatus: any) {
    this.pluginInfo = pluginInfo;
    this.server = server
    this.pluginStatus = pluginStatus;
    
    this.loadFrontendPlugins();
    
    this.server.get('/plugin', (req: any, res: any) => {
      res.send(this.loadedFrontends);
    });
  }
  
  loadFrontendPlugins() {
    let keys: string[] = Object.keys(this.pluginInfo);
    keys.forEach((plugin: string) => {
      let pluginPackage = this.pluginInfo[plugin];
      
      if (pluginPackage.frontend && this.pluginStatus[plugin]) {
        this.server.get('/plugin/' + plugin, (req: any, res: any) => {
          let file: string = path.resolve('node_modules/' + plugin + '/' + pluginPackage.frontend);
          res.sendFile(file);
        });
        
        this.loadedFrontends.push(plugin);
      }
    });
  }
}

(<any>PluginHandler).$inject = {
  deps: ['server', 'PluginInfo', 'pluginStatus'],
  callAs: 'class'
}
