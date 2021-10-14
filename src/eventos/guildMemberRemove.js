const { MessageEmbed } = require('discord.js');
const moment = require('moment');
moment.locale('pt-br');

module.exports = (bot, member) => {
    let canallog = member.guild.channels.cache.find(x => x.id === '793599388420800543')

    canallog.send({
        embeds: [new MessageEmbed()
            .setAuthor(`Nova saída no Discord`, member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`${member.user} **entrou em nosso discord em:** ${moment(member.joinedTimestamp).utc(-3).format('DD[/]MM[/]YYYY [ás] HH:mm')} (${moment(member.joinedTimestampt).utc(-3).fromNow()})`)
            .setTimestamp(member.removedTimestamp)
            .setFooter(`${member.user.tag}`)
            .setColor(`RED`)]
    });
}