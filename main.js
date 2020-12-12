require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client();

const stems = require('./random');
const fails = new stems.Fails();

var counter = 1;
var high_score = 0;

client.on('ready', () => {
    counter = 1;
    console.log('Online!');
})

client.on('message', (msg) => {
    if (msg.content === 'c!num') {
        msg.channel.send(`The current number is ${counter}.`);
    } else {
        var num = Number.parseInt(msg.content);
        if (Number.isInteger(num)) {
            if (num === counter) {
                counter++;
                msg.react('✅');
                if (num % 10 === 0 && num > 0) {
                    msg.react('🇦');
                    msg.react('🇭');
                    msg.react('❕');
                }
            } else {
                if (high_score < counter) {
                    high_score = counter;
                }
                var stem = fails.failMsg();
                msg.reply(`${stem} The current high score is ${high_score}.`);
                counter = 1;
            }
        }   
    }
});

client.login(process.env.DISCORD_TOKEN);