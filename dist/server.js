var express = require('express');
var Server = (function () {
    function Server() {
    }
    Server.prototype.start = function (config) {
        this.app = express();
        this.app.get('/', function (req, res) {
            res.send('Hello World');
        });
        this.server = this.app.listen(config.port);
        console.log('Wrapper started on ' + config.port);
    };
    return Server;
})();
exports.__esModule = true;
exports["default"] = Server;
Server.$inject = {
    deps: [],
    callAs: 'class'
};
