'use strict';

declare var require: any;
declare var __filename: string;

let path = require('path');

export default class Scripts {
  
  constructor(server: any) {
    
    server.get('/app/:component', function (req: any, res: any) {
      let filedir: string = path.dirname(__filename);
      let file: string = path.resolve(filedir + '/../' + '/app/' + req.params.component);
      
      res.sendFile(file, (err: any) => {
          if (err) {
            console.log(err);
            res.status(err.status).end();
          }
        });
    });
    
  }
  
}

(<any>Scripts).$inject = {
  deps: ['server'],
  callAs: 'class'
};
