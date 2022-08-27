const ytdl = require('ytdl-core')
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
        let creating = collection.get(`{convert: {id: ${message.user.id}}}`)
        if (!creating) {
            collection.set(`{convert: {id: ${message.user.id}}}`, { converting: false })
        }
        creating = collection.get(`{convert: {id: ${message.user.id}}}`)
        if (creating.converting) return message.reply('Você já esta convertendo uma musica!')
        collection.set(`{convert: {id: ${message.user.id}}}`, { converting: true })
        const r = await yts(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/.test(message.options.getString('link')) ? { videoId: message.options.getString('link').replace("http://", "").replace("https://", "").split("/")[1].replace("watch?v=", "").split("&")[0] } : message.options.getString('link'))
        let verificar = message.user.id
        if (Array.isArray(r.videos)) {
            const down = message.channel.createMessageCollector({ filter: ({ author }) => author.id === verificar, max: 1 })
            const embed5 = new MessageEmbed()
                .setColor('#9900f8')
                .setDescription(`> Escolha uma musica, listei 10 musicas para você escolher a certa! \n \n\`${r.videos.map((x, i) => i + "- " + x.title).slice(0, 11).join('\n')}\``)
            message.reply({ embeds: [embed5], fetchReply: true })
            down.on('collect', async a => {
                if (a.content.toLowerCase() === 'cancelar') {
                    collection.set(`{convert: {id: ${message.user.id}}}`, { converting: false })
                    message.channel.send('Lista cancelada!')
                    return down.stop()
                }
                if (parseInt(a.content) > 10) {
                    collection.set(`{convert: {id: ${message.user.id}}}`, { converting: false })
                    return message.channel.send('Esse numero não corresponde na lista!')
                }
                if (isNaN(a.content)) {
                    collection.set(`{convert: {id: ${message.user.id}}}`, { converting: false })
                    return message.channel.send('Não é um numero!')
                }
                await convert(message, collection, r.videos[a.content], client)
            })
        } else {
            await convert(message, collection, r, client)
        }
    }
}
async function convert(message, collection, videos, client) {
    if (!videos) {
        collection.set(`{convert: {id: ${message.user.id}}}`, { converting: false })
        if(message.replied) message.channel.send('Não existe essa musica! Se está digitando o link digite apenas o nome!')
        else message.reply('Não existe essa musica! Se está digitando o link digite apenas o nome!')
    }
    const embed = new MessageEmbed()
        .setColor('#9900f8')
        .setTitle(`${client.user.username} - Música`)
        .setDescription('<:config:806875469173620771> Iniciando a conversão');
    (message.replied ? message.channel.send({ embeds: [embed] }):message.reply({ embeds: [embed], fetchReply: true })).then(async msg => {
        if (videos.duration.seconds > 90000) {
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Música`)
                .setDescription('❌ O audio e longo demais! O maximo é 3 horas!')
            collection.set(`{convert: {id: ${message.user.id}}}`, { converting: false })
            return msg.edit({ embeds: [embed] })
        }
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Música`)
            .setDescription('<a:carregando:800011672122556447> Aguarde!')
        collection.set(`{convert: {id: ${message.user.id}}}`, { converting: true, code: geraStringAleatoria(3) })
        msg.edit({ embeds: [embed] })
        const music = ytdl(`https://www.youtube.com/watch?v=${videos.videoId}`, { filter: 'audioonly' })
        const mainStream = fs.createWriteStream(`./src/musics/${collection.get(`{convert: {id: ${message.user.id}}}`).code}.mp3`);
        const stream = music.pipe(mainStream);
        stream.on('finish', function () {
            collection.set(`{convert: {id: ${message.user.id}}}`, { converting: false, code: collection.get(`{convert: {id: ${message.user.id}}}`).code })
            const embed3 = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Música`)
                .setDescription('<:play:816662164668153856> Conversão concluida \n \nAlgum problema? Chame o LMS5414')
            msg.edit({ embeds: [embed3] })
            str = collection.get(`{convert: {id: ${message.user.id}}}`).code
            if (fs.statSync(`./src/musics/${str}.mp3`).size >= 8000000) {
                return message.channel.send('Infelizmente o arquivo passa dos 8 MB e não é possivel ser enviada!')
            }
            message.channel.send({
                files: [{
                    attachment: `./src/musics/${str}.mp3`,
                    name: `music-${str}.mp3`
                }]
            }).catch(error => {
                message.channel.send('Ocorreu um erro ao tentar enviar a musica! Fale com LMS5413 sobre o ocorrido')
                client.channels.cache.get('873719017616068638').send(`Erro ao converter uma musica na guilda ${message.guild.username}! Erro: ${error.message} \nUser: ${message.user.username}`)
            }).then(res => fs.unlinkSync(`./src/musics/${str}.mp3`))
        })
        stream.on('error', (error) => {
            message.channel.send('Ocorreu um erro ao tentar enviar a musica! Fale com LMS5413 sobre o ocorrido')
            client.channels.cache.get('873719017616068638').send(`Erro ao converter uma musica na guilda ${message.guild.username}! Erro: ${error.message} \nUser: ${message.user.username}`)
        })
    })
}
function geraStringAleatoria(tamanho) {
    var stringAleatoria = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < tamanho; i++) {
        stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return stringAleatoria;
}
