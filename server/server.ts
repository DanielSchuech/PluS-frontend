declare var require: any;

let express = require('express');

export default class Server {
  public app: any;
  private server: any;
  
  constructor() {
    
  }
  
  start(config: any) {
    this.app = express();
    
    this.app.get('/', function (req: any, res: any) {
      res.send('Hello World');
    });
     
    this.server = this.app.listen(config.port);
    console.log('Wrapper started on '+config.port);
  }
}

Server.$inject = {
  deps: [],
  callAs: 'class'
}
