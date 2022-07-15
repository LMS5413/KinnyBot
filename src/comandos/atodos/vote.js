const { MessageEmbed } = require('discord.js')

module.exports = { 
    config: {
        nome: 'votar',
        cooldown: 10,
        aliases: ['vote', 'voties']
    },
    run: async(client, message) => {
        const embed = new MessageEmbed()
        .setColor('#9900f8')
        .setTitle('Vote na kinny!')
        .addField('Link 1', '[**Vote na kinny! (Com recompensa)**](https://top.gg/bot/750384014388494376)')

        message.reply({embeds: [embed]})
    }
}