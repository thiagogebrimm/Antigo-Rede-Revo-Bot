const { MessageEmbed } = require("discord.js")
const message = require("../eventos/message")

module.exports = (bot, oldMessage, newMessage) => {
    if(message.guild == null) return;

    let canal = oldMessage.guild.channels.cache.find(x => x.id === '793599388420800543')
        if(newMessage.content != oldMessage.content){
            canal.send(new MessageEmbed()
                .setTitle(`MENSAGEM EDITADA`)
                .setColor(`36393e`) 
                .setDescription(`[Clique aqui para ser redirecionado a mensagem.](https://discordapp.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id})`)
                .addField(`📝 Mensagem antiga`, `${oldMessage.content}`, true)
                .addField(`✏️ Nova mensagem`, `${newMessage.content}`, true)
                .setFooter(`Autor da mensagem: ${oldMessage.author.tag}`)
            )
        }
        return;
    }
