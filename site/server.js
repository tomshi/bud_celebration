var server1 = require('node-http-server');

var config1 = server1.configTemplate();
config1.errors['404']    = 'These are not the files you are looking for...';
config1.contentType.mp4  = 'video/mp4';
config1.contentType.m4v  = 'video/mp4';
config1.contentType.ogg  = 'video/ogg';
config1.contentType.ogv  = 'video/ogg';
config1.contentType.webm  = 'video/webm';
config1.port             = 8011;
config1.verbose          = false;
console.log(server1);
server1.deploy(config1);