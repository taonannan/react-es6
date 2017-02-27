import app from '../lib';



var platform=process.env.platform;



var port;

if(platform === 'mobile') port = 5100;
else if (platform === 'api') port = 5200;
else port = 5000



app.listen(port);
console.log('listening on port ', port);
