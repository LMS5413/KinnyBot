const { MessageEmbed } = require('discord.js')
module.exports =  {
    config: {
        nome: 'servericon',
        cooldown: 10,
        options: [{
            name: 'guild',
            type: 'STRING',
            description: 'Servidor ',
            required: false,
        }],
    },
    run: async(client, message, args) => {
        let avata = client.guilds.cache.get(message.options?.getString('guild')) || message.guild
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Diversão`)
            .setDescription(`<:imagem:800011671229431848> Icone do ${avata.name} [Clique aqui para baixar!](${avata.iconURL({dynamic: true, size: 4096, format: 'png'})})`)
            .setImage(avata.iconURL({dynamic: true, size: 4096, format: 'png'}))
            message.reply({embeds: [embed]}).then(reagir => {
            reagir.react('👍')
            reagir.react('👎')
            reagir.react('😎')
            reagir.react('😍')
            reagir.react('😢')
            reagir.react('😡')

        })
    }
}