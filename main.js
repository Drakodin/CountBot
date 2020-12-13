require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client();

const stems = require('./random');
const fails = new stems.Fails();

// Internal counter to designate the number.
var counter = 1;

// The highest number reached by the counting.
var high_score = 0;

// Maps users to their number of times ruining the count
var lb = {};

/**
 * Only triggers if bot goes offline, which it shouldn't.
 * The counter will reset in this case.
 */
client.on('ready', () => {
    counter = 1;
    lb = {'Count von Count': 0};
    console.log('Online!');
})

client.on('message', (msg) => {
    if (msg.content === 'c!num') {
        msg.channel.send(`The current number is ${counter}.`);
    } else if (msg.content === 'c!lb') {
        let board = "";
        for (let key in Object.keys(lb)) {
            board = board.concat(`${key}: ${lb[key]} ruins\n`);
        }
        msg.channel.send(`Here are the current stats: \`\`\`\n${board}\n\`\`\``);
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
                    high_score = counter - 1;
                }
                var stem = fails.failMsg();
                let user = msg.author.username.concat(msg.author.discriminator);
                if (Object.keys(lb).includes(user)) {
                    lb[user] += 1;
                } else {
                    lb[user] = 1;
                }
                msg.reply(`${stem} The current high score is ${high_score}.`);
                counter = 1;
            }
        }   
    }
});

client.login(process.env.DISCORD_TOKEN);