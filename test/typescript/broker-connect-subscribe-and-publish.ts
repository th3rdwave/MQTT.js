// relative path uses package.json {"types":"types/index.d.ts", ...}
import test from 'tape';
import {
  IClientOptions,
  Client,
  connect,
  IConnackPacket,
  UniqueMessageIdProvider,
} from '../..';
const BROKER = 'test.mosquitto.org';

const PAYLOAD_WILL = Buffer.from('bye from TS');
const PAYLOAD_QOS = Buffer.from('hello from TS (with qos=2)');
const PAYLOAD_RETAIN = 'hello from TS (with retain=true)';
const TOPIC = 'typescript-test-' + Math.random().toString(16).substr(2);
const opts: IClientOptions = {
  will: { topic: TOPIC, payload: PAYLOAD_WILL, qos: 0, retain: false },
  messageIdProvider: new UniqueMessageIdProvider(),
};

test('client test', function (t) {
  t.plan(1);
  console.log(`connect(${JSON.stringify(BROKER)})`);
  const client: Client = connect(`mqtt://${BROKER}`, opts);
  client
    .subscribe({ [TOPIC]: { qos: 2 } }, (err, granted) => {
      granted.forEach(({ topic, qos }) => {
        console.log(`subscribed to ${topic} with qos=${qos}`);
      });
      client.publish(TOPIC, PAYLOAD_QOS, { qos: 2 });
      client.publish(TOPIC, PAYLOAD_RETAIN, { retain: true });
    })
    .on('message', (topic: string, payload: Buffer) => {
      t.ok(payload);
      console.log(`message from ${topic}: ${payload}`);
      client.end(true, () => {
        console.log('client closed');
        t.end();
      });
    })
    .on('connect', (packet: IConnackPacket) => {
      console.log('connected!', JSON.stringify(packet));
    });
});
