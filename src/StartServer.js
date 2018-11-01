// In order to run the Server using newer ecmascript we need to do this. Then we can import using the new EC6 method, example: import Schema from './schema'; 
require('babel-register')({stage: 0});
require('./server');