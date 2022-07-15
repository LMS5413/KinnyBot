const youtubeMp3Converter = require('youtube-mp3-converter')
const yts = require("yt-search")
const db = require('../../../db')
const { MessageEmbed, Collection } = require('discord.js')
const collection = new Collection()
const fs = require('fs')
module.exports = {
    config: {
        nome: 'mp3downloader',
        cooldown: 15,
        aliases: ['baixar', 'ytdownloader'],
        options: [{
            name: 'link',
            type: 'STRING',
            description: 'Link da musica que vai ser baixado no youtube',
            required: true,
        }],
    },
    run: async (client, message, args) => {
        let premi = await db.premi.findOne({ groupid: message.user.id })
        if (!premi) return message.reply(`${client.user.username} - Erro \n Esse comando é para pessoas que possui o Kinny Premium. Quer ter desbloqueado? Compre o kinny premium!`)
        let creating = collection.get(`{convert: {id: ${message.user.id}}}`)
        if (!creating) {
            collection.set(`{convert: {id: ${message.user.id}}}`, {converting: false})
        }
        creating = collection.get(`{convert: {id: ${message.user.id}}}`)
        if (creating.converting) return message.reply('Você já esta convertendo uma musica!')
        collection.set(`{convert: {id: ${message.user.id}}}`, {converting: true})
        const r = await yts(message.options?.getString('link'))
        let verificar = message.user.id
        const down = message.channel.createMessageCollector({ filter: ({ author }) => author.id === verificar, max: 1 })
        const embed5 = new MessageEmbed()
            .setColor('#9900f8')
            .setDescription(`> Escolha uma musica, listei 10 musicas para você escolher a certa! \n \n\`${r.videos.map((x, i) => i + "- " + x.title).slice(0, 11).join('\n')}\``)
        message.reply({ embeds: [embed5], fetchReply: true })
        down.on('collect', async a => {
            if (a.content.toLowerCase() === 'cancelar') {
                collection.set(`{convert: {id: ${message.user.id}}}`, {converting: false})
                message.channel.send('Lista cancelada!')
                return down.stop()
            }
            if (isNaN(a.content)) {
                collection.set(`{convert: {id: ${message.user.id}}}`, {converting: false})
                return message.channel.send('Não é um numero!')
            }
            if (parseInt(a.content) > 10) {
                collection.set(`{convert: {id: ${message.user.id}}}`, {converting: false})
                return message.channel.send('Esse numero não corresponde na lista!')

            }
            const videos = r.videos[parseInt(a.content)]
            if (!videos) {
                collection.set(`{convert: {id: ${message.user.id}}}`, {converting: false})
                return message.channel.send('Não existe essa musica! Se está digitando o link digite apenas o nome!')
            }
            const convertLinkToMp3 = youtubeMp3Converter('./src/comandos/atodos/musics')
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Música`)
                .setDescription('<:config:806875469173620771> Iniciando a conversão')
                message.channel.send({ embeds: [embed], fetchReply: true }).then(async msg => {
                if (videos.duration.seconds > 90000) {
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .setTitle(`${client.user.username} - Música`)
                        .setDescription('❌ O audio e longo demais! O maximo é 3 horas!')
                    collection.set(`{convert: {id: ${message.user.id}}}`, {converting: false})
                    return msg.edit({ embeds: [embed] })
                }
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .setTitle(`${client.user.username} - Música`)
                    .setDescription('<a:carregando:800011672122556447> Aguarde!')
                collection.set(`{convert: {id: ${message.user.id}}}`, {converting: true})
                msg.edit({ embeds: [embed] })
                const pathToMp3 = await convertLinkToMp3(videos.url)
                if (pathToMp3.length) {
                    collection.set(`{convert: {id: ${message.user.id}}}`, {converting: false})
                    const embed3 = new MessageEmbed()
                        .setColor('#9900f8')
                        .setTitle(`${client.user.username} - Música`)
                        .setDescription('<:play:816662164668153856> Conversão concluida')
                    msg.edit({ embeds: [embed3] })
                    str = videos.title.replace(/[^a-zA-Z0-9.()Á-ú!\-.[] ]/gi, '');
                    if (fs.statSync(`./src/comandos/atodos/musics/${str}.mp3`).size >= 8000000) {
                        fs.unlink(`./src/comandos/atodos/musics/${str}.mp3`)
                        return message.channel.send('Infelizmente o arquivo passa dos 8 MB e não é possivel ser enviada!')
                    }
                    message.channel.send({
                        content: `Sua música está ai embaixo! Algum problema? Chame o LMS5414`,
                        files: [{
                            attachment: `./src/comandos/atodos/musics/${str}.mp3`,
                            name: `${videos.title}.mp3`
                        }]
                    }).catch(error => {
                        message.channel.send('Ocorreu um erro ao tentar enviar a musica! Fale com LMS5413 sobre o ocorrido')
                        client.channels.cache.get('873719017616068638').send(`Erro ao converter uma musica na guilda ${message.guild.username}! Erro: ${error.message} \nUser: ${message.user.username}`)
                    })
                }
            })
        })
    }
}