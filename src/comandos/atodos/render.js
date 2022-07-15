const puppeteer = require('puppeteer')
const { MessageAttachment, MessageEmbed } = require('discord.js')
const fs = require('fs')
module.exports = {
    config: {
        nome: 'render',
        aliases: ['site', 'versite'],
        cooldown: 10,
        options: [{
            name: 'url',
            type: 'STRING',
            description: 'URL do site que deseja renderizar!',
            required: true,
        }],
    },
    run: async (client, message, args) => {
        if (!message.options?.getString('url')) return message.reply(`${client.user.username} Erro \nDigite a URL do site!`)
        let url = message.options.getString('url').startsWith('http://') || message.options.getString('url').startsWith('https://') ? message.options.getString('url'): `https://${message.options.getString('url')}`
        if ((message.user.id) !== require('../../../config.json').creatorid) {
            if (!message.channel.nsfw && (message.user.id) !== require('../../../config.json').creatorid) {
                return message.reply(`${client.user.username} Erro \nApenas no canal NSFW!`)
            }
        }
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        let editar = await message.reply({ content: 'Tentando abrir o navegador', fetchReply: true })
        try {
            const page = await browser.newPage();
                await page.goto(url)
                editar.edit('Pagina carregada! Renderizando')
                await page.setViewport({
                    width: 1920,
                    height: 1080,
                    deviceScaleFactor: 1,
                });
                setTimeout(async () => {
                    await page.screenshot({ path: './src/Canvas/img1.png' });
                    const attachment = new MessageAttachment('./src/Canvas/img1.png');
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .setDescription('**A pagina foi renderizada com sucesso!**')
                        .setTitle(`${client.user.username} | Render`)
                        .setImage(`attachment://img1.png`)
                    editar.edit({content: null, files: [attachment], embeds: [embed] })
                    await browser.close();
                    fs.unlinkSync('./src/Canvas/img1.png')
                }, 5000)
        } catch (e) {
            message.channel.send(`${client.user.username} Erro \nOcorreu um erro ao tentar renderizar essa página! Erro: ${e.message}`)
            if(editar) {
                editar.delete()
            }
            browser.close()
        }

    }
}