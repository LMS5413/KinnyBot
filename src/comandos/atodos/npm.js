const searchNpmRegistry = require('search-npm-registry');
const { MessageEmbed }=  require('discord.js')
const db = require('../../../db')
module.exports = {
    config: {
        nome: 'npm',
        options: [{
            name: 'npm',
            type: 'STRING',
            description: 'Nome da package que deseja pesquisar via NPM',
            required: true,
        }],
    },
    run: async(client, message, args) => {
    (async () => {
        let pesquisa = message.options?.getString('npm')
        if(!pesquisa) return message.reply('Bola de cristal: undefined')
        let lan = await db.lgs.findOne({guildID: message.user.id})
        const results = await searchNpmRegistry()
            .text(`${pesquisa}`)
            .size(5)
            .search();
            if(!lan) {
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Infos`)
            .addField('Nome', `${results[0].name}`)
            .addField('Versão', `${results[0].version}`)
            .addField('Descrição', `${results[0].description}`)
            .addField('Link', `${results[0].links.npm}`)

            message.reply({embeds: [embed]})
            } else {
                if(lan.lang === 'en') {
                    const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .setTitle(`${client.user.username} - Infos`)
                    .addField('Name', `${results[0].name}`)
                    .addField('Version', `${results[0].version}`)
                    .addField('Description', `${results[0].description}`)
                    .addField('Link', `${results[0].links.npm}`)
        
                    message.reply({embeds: [embed]})
                }
            }
    })().catch(error => {
        message.reply('Não foi possivel achar essa package!')
    })
    }
}