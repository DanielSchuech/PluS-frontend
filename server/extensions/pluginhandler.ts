declare var require: any;

let pathToNodeMoules: string = "/home/dschuech/dev/ds-plus/node_modules/";

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
    //console.log(this.pluginInfo);
    
    this.server.get('/plugin', (req: any, res: any) => {
      res.send(this.loadedFrontends);
    });
  }
  
  loadFrontendPlugins() {console.log('start');
    let keys: string[] = Object.keys(this.pluginInfo);
    keys.forEach((plugin: string) => {
      let pluginPackage = this.pluginInfo[plugin];
      
      if (pluginPackage.frontend && this.pluginStatus[plugin]) {
        this.server.get('/plugin/' + plugin, (req: any, res: any) => {
          res.sendFile(pathToNodeMoules + plugin + '/' + pluginPackage.frontend);
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
