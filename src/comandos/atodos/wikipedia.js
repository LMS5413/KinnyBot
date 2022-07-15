const dic = require("dicionario.js")
const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        nome: 'wikipedia',
        cooldown: 10,
        options: [{
            name: 'wikipedia',
            type: 'STRING',
            description: 'Precisa saber significado das coisas? usa wikipedia!',
            required: true,
        }],
    },
    run: async(client, message, args) => {
        if(!message.options?.getString('wikipedia')) return message.reply('Digite o que quer pesquisar no wikipedia')
        try {
        let msg = await message.reply({content: 'Procurando....', fetchReply: true})
        let sig = await dic.wikipedia(message.options.getString('wikipedia'))
        let dis = Object?.keys(message.member.presence?.clientStatus)[0] || 'Nenhuma plataforma'
        const embed = new MessageEmbed()
        .setTitle(`${sig.title}`)
        .setThumbnail(!sig.thumbnail ? null:sig.thumbnail.source)
        .setColor('#9900f8')
        .setDescription(`**Descrição:** ${!sig.description ? "Sem descrição":sig.description } \n \n${sig.extract} \n \n**URL:** ${dis === 'mobile' ? sig.content_urls.mobile.page:sig.content_urls.desktop.page}`)
        msg.delete()
        message.channel.send({embeds: [embed]})
        } catch (e) {
            console.log(e)
            if(e.message === 'Error: Request failed with status code 400') {
                message.channel.send('Não consegui achar o que você mandou eu pesquisar!')
            }
        }
    }
}