'use strict';

declare var require: any;

let path = require('path');

export default class Angular2 {
  
  constructor(server: any, serverConfig: any, config: any) {
    serverConfig.angular2.bundles.forEach((bundle: string) => {
      server.get('/' + bundle, function (req: any, res: any) {
        let file: string = path.resolve(config.pathToNodeModules + bundle);
        
        res.sendFile(file, (err: any) => {
          if (err) {
            console.log(err);
            res.status(err.status).end();
          }
        });
      });
    })
    
  }
  
}

(<any>Angular2).$inject = {
  deps: ['server', 'serverConfig', 'config'],
  callAs: 'class'
};
