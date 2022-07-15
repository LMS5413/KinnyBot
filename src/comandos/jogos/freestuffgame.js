const { MessageEmbed } = require('discord.js')
const { getGames } = require("epic-free-games");
const moment = require('moment')
const db = require('../../../db.js')
module.exports = {
    config: {
        nome: 'freestuffgame',
        cooldown: 10
    },
    run: async(client, message, args) => {
        let lan = await db.lgs.findOne({guildID: message.user.id})
        let pag = args[0]
        lan && lan.lang === 'en' ? moment.locale('en'):moment.locale('pt-br')
        getGames(lan && lan.lang === 'en' ? "US":"BR").then(async res => {
            let freegam = res.currents[!pag ? 0:parseInt(pag) - 1]
            if(parseInt(pag) - 1 < 0) return message.reply('Página invalida!')
            if(!freegam) return message.reply('Página invalida!')
            let stren = `**I found a free game!** \nName: ${freegam.title}\nDescription; ${freegam.description} \nURL: https://www.epicgames.com/store/en-US/p/${freegam.title.toLowerCase().split(" ").join('-')}\nRelease Date: ${moment(freegam.effectiveDate).format('LLL')} \nExpiration date: ${freegam.expiryDate || "No expiration date"}`
            let strpt = `**Eu encontrei um jogo gratis!** \nNome: ${freegam.title}\nDescrição; ${freegam.description} \nURL: https://www.epicgames.com/store/pt-BR/p/${freegam.title.toLowerCase().split(" ").join('-')}\nData de lançamento: ${moment(freegam.effectiveDate).format('LLL')}\nData de expiração:  ${freegam.expiryDate || "Sem data de expiração"}`
            let url = freegam.keyImages[0].type.toLowerCase() === 'vaultclosed' ? freegam.keyImages[1].url:freegam.keyImages[0].url
            const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setImage(url)
            .setTitle(`${client.user.username} - ${lan && lan.lang === 'en' ? "Games free":"Jogos gratis"}`)
            .setDescription(lan && lan.lang === 'en' ? stren:strpt)
            .setFooter({text: res.currents.length - 1 === 0 ? "":`Existe +${res.currents.length - 1} jogo free! Caso queira acessar esse jogo digite freestuffgame ${res.currents.length} \nAtenção! Não confie na data de expiramento! Entre no site da epic games e veja a data de expiração!`})
            await message.reply({embeds: [embed]})

          }).catch(err => {
             message.reply('Não consegui achar um jogo free!')
             message.reply('Ocorreu erro no freestuffgame! ' + err)
          });
    }
}