const { MessageEmbed } = require('discord.js')
const db = require('../../../db')

module.exports = {
    config: {
        nome: 'respondepramim',
        aliases: ['perguntas'],
        options: [{
            name: 'responde',
            type: 'STRING',
            description: 'Digite a pergunta que deseja que seja respondida!',
            required: true,
        }],
    },
    run: async (client, message, args) => {
        let perguntas = ['informatica', 'dever de casa', 'outros']
        let pergunta = message.options?.getString('responde')
        if(!pergunta) return message.reply('Digite a pergunta')
        let per = await db.res.findOne({pergunta: `${pergunta.replace('?', '')}?`})
        let per2 = await db.res.find()
        if(!per) {
            let ca = message.channel.createMessageCollector({ filter: ({ author }) => author.id === (message.user.id), time: 15000})
            message.reply(`Eu não achei essa pergunta! Você poderia digitar a categoria dessa pergunta? Categorias: \`informatica, dever de casa, outros\` \nVeja a lista de perguntas quem saiba queira responder: \`${per2?.map(x => x.pergunta).join(', ') || "Sem perguntas"}\` (Digite cancelar caso não queira alguma pergunta)`)
            ca.on('collect', async ca => {
                if(ca.content.toLowerCase() == 'cancelar') {
                    message.reply('Cancelado!')
                    return ca.stop()
                }
                if(!perguntas.some(x => ca.content.normalize("NFD").includes(x))) return message.reply('Essa não é uma categoria valida!')
                await db.res.create({pergunta: `${pergunta.replace('?', '')}?`, categoria: ca.content, especialistas: false, respostas: [], autor: !message.user ? message.user.id:message.user.id, perguntatolower: `${pergunta.toLowerCase().replace('?', '')}?`})
                message.reply('Resposta salva! Irei ir no seu dm caso alguem responda sua pergunta!')
            })
            return
        }
        const embed = new MessageEmbed()
        .setColor('#9900f8')
        .setDescription(`Achei uma pergunta! \n \n<:stop:816662306670379028> **Pergunta: \`${per.pergunta}\`** \n<:terra:801206555755675728> **Categoria: \`${per.categoria}\`** \n⭐ **Verificado por especialista?** \`${per.especialistas ? "sim":"não"}\` \n<:sad_cat:772086798193000549> **Autor:** \`${client.users.cache.get(per.autor).username}\`\n<:question:848175106793930842> **Respostas - ${per.respostas.length}** \n \n${per.respostas.join('\n')}`)
        message.reply({embeds: [embed]})
    }
}