const { MessageEmbed } = require('discord.js')
module.exports = {
    config: {
        nome: 'mineskin',
        cooldown: 10,
        options: [{
            name: 'nick',
            type: 'STRING',
            description: 'Nick do jogador!',
            required: true,
        }],
    },
    run: async(client, message, args) => {
        let ip = message.options?.getString('nick')
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .addField(`${client.user.username} - Minecraft`, `Skin de ${ip}! [Clique aqui para baixar a skin!](https://mc-heads.net/skin/${ip})`)
            .setImage(`https://mc-heads.net/player/${ip}`)

        message.reply({embeds: [embed]})
    }
}