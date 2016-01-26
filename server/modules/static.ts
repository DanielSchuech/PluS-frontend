'use strict';

declare var require: any;
declare var __filename: string;
import PluginHandler from '../extensions/pluginhandler';

let path = require('path');

export default class Static {
  
  constructor(server: any, pluginHandler: PluginHandler) {
    
    server.get('*', function (req: any, res: any) {
      let filedir: string = path.dirname(__filename);
      let file: string = path.resolve(filedir + '/../' + '/app/index.html');
      
      res.sendFile(file, (err: any) => {
          if (err) {
            console.log(err);
            res.status(err.status).end();
          }
        });
    });
    
  }
  
}

(<any>Static).$inject = {
  deps: ['server', 'PluginHandler'],
  callAs: 'class'
};
