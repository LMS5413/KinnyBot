const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        nome: 'permitame',
        options: [{
            name: 'permitame',
            type: 'STRING',
            description: 'Digite a sua pesquisa!',
            required: true,
        }],
    },
    run: async (client, message, args) => {
        if(!message.options?.getString('permitame')) return message.reply('Digite sua pesquisa para enviar para o seu amigo mala! (Use: k.permitame <pesquisa>)')

        const embed = new MessageEmbed()
        .setColor('#9900f8')
        .setTitle(`${client.user.username} - Permita.me`)
        .setDescription(`Sua URL está pronta! Envie para o seu amigo mala **Essa URL**: \`https://permita.me/?q=${encodeURIComponent(message.options?.getString('permitame'))}\``)

        message.reply({embeds: [embed]})
    }
} 