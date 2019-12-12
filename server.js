const { driver, methodCache, api  } = require('@rocket.chat/sdk');
const respmap  = require('./reply');

// Environment Setup
const HOST = 'https://pipsmasters.com';
const USER = 'melius.bot';
const PASS = 'Meliusbot2020';
const BOTNAME = 'Melius Bot';
const SSL = true;
const ROOMS = ['test-bot'];
var myUserId;

// Bot configuration
const runbot = async () => {
    console.log(1);
    const conn = await driver.connect({ host: HOST, useSsl: SSL })
    console.log({ username: USER, password: PASS });
    myUserId = await driver.login({ username: USER, password: PASS });
    console.log(3);
    const roomsJoined = await driver.joinRooms( ROOMS );
    console.log('joined rooms');

    const subscribed = await driver.subscribeToMessages();
    console.log('subscribed');

    const msgloop = await driver.reactToMessages( processMessages );
    console.log('connected and waiting for messages');

    const sent = await driver.sendToRoom( BOTNAME + ' is listening ...', ROOMS[0]);
    console.log('Greeting message sent');
}

// Process messages
const processMessages = async(err, message, messageOptions) => {
if (!err) {
    if (message.u._id === myUserId) return;
    const roomname = await driver.getRoomName(message.rid);

    console.log('got message ' + message.msg)
    var response;
    if (message.msg in respmap) {
        response = respmap[message.msg];
    }
    const sentmsg = await driver.sendToRoomId(response, message.rid)
    }
}

runbot()