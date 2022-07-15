const axios = require('axios')
const { MessageEmbed } = require('discord.js')
module.exports = {
    config: {
        nome: 'fortnews',
        cooldown: 10
    },
    run: async(client, message, args) => {

        axios.get(`https://fortnite-api.com/v2/news/br`).then(response => {

            let estatis = response.data.data
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Fortnite`)
                .setImage(estatis.image)

            message.reply({embeds: [embed]})


        })
    }
}