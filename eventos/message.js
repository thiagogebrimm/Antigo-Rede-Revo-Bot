const { MessageEmbed } = require('discord.js');
const { owners, prefix, prefix2 } = require('../config');

module.exports = async (bot, message) => {

//Responde o chat ajuda
if (message.channel.id === "859610016244170752") {
    if (message.content.includes ('o ip'))
        message.lineReply(`rederevo.com`);
    if (message.content.includes ('O ip'))
        message.lineReply(`rederevo.com`);
    if (message.content.includes ('O IP'))
        message.lineReply(`rederevo.com`);
    };

//Bloqueia o mídias
if (message.channel.id === "845501522166153226") {   
    if (message.author.bot) return;
    if (message.content.includes('.png')) return false;
    if (message.content.includes('.jpg')) return false;
    if (message.content.includes('.jpeg')) return false;
    if (message.content.includes('prnt.sc')) return false;
    if (message.attachments.size == 0) message.delete({ timeout: 5 * 100 }, message.author.send(`❌ | Você não pode enviar mensagens de texto no canal de mídias`))
};

//Arruma o Sugestões
if (message.channel.id === "793284851889209355") {     
    if (message.author.bot) return;
    if (message.attachments.size == 0) message.delete({ timeout: 5 * 100 })
};


//Bloqueia Links
if (message.content.includes('discord.gg/')) { //dicord.gg/
    if (message.member.permissions.has('KICK_MEMBERS')) return false;
    if (message.content.includes('discord.gg/rederevo')) return false;
    message.delete()
      .then(message.channel.send('**Links não são permitidos em nosso discord**'))
  };
if (message.content.includes('discordapp.com/invite/')) { //discordapp.com/invite/
    if (message.member.permissions.has('KICK_MEMBERS')) return false;
    if (message.content.includes('discordapp.com/invite/rederevo')) return false;
    message.delete()
      .then(message.channel.send('**Links não são permitidos em nosso discord**'))
  };

//Reage nos booster e mídias
if (message.channel.id === "793280024060362752") {
await message.react('<a:PurpHeart_Revo:852621966325186562>')
};
if (message.channel.id === "845501522166153226") {
    await message.react('<:Upvote_Revo:881685398114426940>')
    await message.react('<:Downvote_Revo:881685397976010783>')
    };


//Controlador 
    if (message.author.bot) return;

    const args = message.content.split(/ +/g);
    const command = args.shift().slice((prefix || prefix2).length).toLowerCase();
    const cmd = bot.commands.get(command) || bot.aliases.get(command);

    let regx = /^((?:https?:)?\/\/)?((?:www|m)\.)? ((?:discord\.gg|discordapp\.com))/g
    let cdu = regx.test(message.content.toLowerCase().replace(/\s+/g, ''))
    if (cdu && !message.member.permissions.has(['ADMINISTRATOR'])) message.delete();

    if (!(message.content.toLowerCase().startsWith(prefix) || message.content.toLowerCase().startsWith(prefix2))) return;

    if (!cmd) return;
    if (message.guild && !message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;

    if (cmd.requirements.ownerOnly && !owners.includes(message.author.id)) 
        return message.channel.send(`<@${message.member.id}>`, new MessageEmbed()
        .setColor(`36393e`)
        .setDescription(`Este comando está reservado para autoridades do bot.`)
    );

    if (cmd.limits) {
        const current = bot.limits.get(`${command}-${message.author.id}`);

        if (!current) bot.limits.set(`${command}-${message.author.id}`, 1);
        else {
            if (current >= cmd.limits.rateLimit) return;
            bot.limits.get(`${command}-${message.author.id}`, current + 1);
        }

        setTimeout(() => {
            bot.limits.delete(`${command}-${message.author.id}`);
        }, cmd.limits.cooldown);
    }

    if(message.guild == null) return;

        if (cmd && ['846189183550881792', '848297922365751367', '845555957601796137', '793599388420800543', '793284851889209355'].includes(message.channel.id) || message.member.permissions.has('MANAGE_MESSAGES')) {
            cmd.run(bot, message, args)
        }
}