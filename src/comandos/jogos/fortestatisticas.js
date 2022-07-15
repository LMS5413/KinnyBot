const axios = require('axios')
const { MessageEmbed } = require('discord.js')
const parseMilliseconds = require('parse-ms')
const config = require('../../../config.json')
module.exports = {
    config: {
        nome: 'fortestatisticas',
        cooldown: 10,
        options: [{
            name: 'nick',
            type: 'STRING',
            description: 'Nick do jogador!',
            required: true,
        }],
    },
    run: async (client, message, args) => {
        let nick = message.options?.getString('nick')
        if (!nick) return message.reply('Digite o nick do jogador!')
        axios.get(`https://fortnite-api.com/v1/stats/br/v2?name=${nick}&image=all`, {headers: {Authorization: config.fortApiKey}}).then(async response => {
            let estatis = response.data.data.stats.all.overall
            let jogadas = parseMilliseconds(estatis.minutesPlayed);
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Fortnite`, `**Pontuação:** ${estatis.score} \n **Vitorias:** ${estatis.wins} \n **Mortes:** ${estatis.deaths} \n **Tempo jogado:** ${jogadas.days}D ${jogadas.hours}H ${jogadas.minutes}M ${jogadas.seconds}S`)
                .setImage(response.data.data.image)
            message.reply({ embeds: [embed] })
        }).catch(error => {
            message.reply('Não foi possivel achar!')
        })

    }
}