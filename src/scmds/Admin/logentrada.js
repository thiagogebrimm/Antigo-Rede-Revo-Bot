const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'logentrada',
  aliases: [''],
  category: 'Admin',
  description: 'Adicionar um membro na equipe',
  usage: '',
  options: [
    {
      name: "membro",
      type: "USER",
      description: "Selecione o membro da equipe",
      required: true
    },
    {
      name: "cargo",
      type: "ROLE",
      description: "Diga o cargo que será removido",
      required: true
    },
  ],
  run: async (client, interaction) => {
    const moment = require("moment")
    moment.locale("pt-BR")

    if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.editReply("Permissões insuficientes!")

    const cchu = new MessageEmbed()
      .setDescription(`Você deve mencionar o usuário e o cargo. Ex: /logentrada @usuário @cargo`)
      .setColor(`RED`)

    let testedUser = interaction.options.get("membro").member
    if (!testedUser) {
      return interaction.channel.send(cchu).then(msg => {
        msg.delete({ timeout: 5000 })
      })
    }


    let role = interaction.options.get("cargo").role
    testedUser.roles.add(role.id)
    let staff = interaction.guild.roles.cache.find(r => r.id === "852039893207351328")
    testedUser.roles.add(staff)
    let hora = moment().format("D [de] MMM [de] YYYY, [às] hh:mm");
    const cu = new MessageEmbed()
      .setTitle(`**Novo integrante na equipe**`)
      .setColor("GREEN")
      .setDescription(`O jogador **<@${testedUser.id}>** agora integra na equipe como **${role}**
      
                  \`${hora}\``)
      .setThumbnail(interaction.guild.iconURL)
      .setFooter(`Atenciosamente Rede Revo`, interaction.guild.iconURL({ dynamic: true }))
    interaction.guild.channels.cache.find(x => x.id === '845531157990866974')?.send({
      content: `<@&795509113307004938>`,
      embeds: [cu]
    })

    interaction.editReply({
      embeds: [new MessageEmbed()
        .setColor(`RED`)
        .setDescription(`\`${testedUser.user.username.toString()}\` foi adicionado ao cargo ${role}`)]
    });
  }
}