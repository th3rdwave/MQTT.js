/** ************************** IMPORTANT NOTE ***********************************

  The certificate used on this example has been generated for a host named stark.
  So as host we SHOULD use stark if we want the server to be authorized.
  For testing this we should add on the computer running this example a line on
  the hosts file:
  /etc/hosts [UNIX]
  OR
  \System32\drivers\etc\hosts [Windows]

  The line to add on the file should be as follows:
  <the ip address of the server> stark
 *******************************************************************************/

const mqtt = require('mqtt');
const fs = require('fs');
const path = require('path');
const KEY = fs.readFileSync(path.join(__dirname, '/tls-key.pem'));
const CERT = fs.readFileSync(path.join(__dirname, '/tls-cert.pem'));
const TRUSTED_CA_LIST = fs.readFileSync(path.join(__dirname, '/crt.ca.cg.pem'));

const PORT = 1883;
const HOST = 'stark';

const options = {
  port: PORT,
  host: HOST,
  key: KEY,
  cert: CERT,
  rejectUnauthorized: true,
  // The CA list will be used to determine if server is authorized
  ca: TRUSTED_CA_LIST,
  protocol: 'mqtts',
};

const client = mqtt.connect(options);

client.subscribe('messages');
client.publish('messages', 'Current time is: ' + new Date());
client.on('message', function (topic, message) {
  console.log(message);
});

client.on('connect', function () {
  console.log('Connected');
});
