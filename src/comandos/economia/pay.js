const { MessageEmbed } = require('discord.js')
const db = require('../../../db.js')
module.exports = {
    config: {
        nome: 'pay',
        cooldown: 10,
        options: [
            {
            name: 'quantia',
            type: 'NUMBER',
            description: 'Numero que deseja apostar!',
            required: true,
        },
        {
            name: 'usuario',
            type: 'STRING',
            description: 'User da pessoa!',
            required: true,
        }
    ],
    },
    run: async(client, message, args) => {
        let id = message.options?.getString('usuario')
        let mencao = client.users.cache.get(!id ? message.user.id:id.replace(/[<@!>]/g, ''))
        if(!mencao) return message.reply(`${client.user.username} - Erro \n Mencione uma pessoa`)
        if(!message.guild.me.permissions.has('ADD_REACTIONS') || !message.channel.permissionsFor(client.user.id).has("ADD_REACTIONS")) return message.reply('Eu não tenho permissão \`Adicionar reações!\`')
        if(mencao.id === message.user.id) return message.reply(`${client.user.username} - Erro \n Você não pode pagar a si mesmo!`)
        const autor1 = await db.coins.findOne({id: mencao.id})
        const autor2 = await db.coins.findOne({id: message.user.id})
        if(!autor1 || !autor2) return message.reply('Umas das pessoas não tem conta!')
        const quantia = message.options.getNumber('quantia')
        if (autor2.coinsc <= 0) return message.reply(`${client.user.username} - Erro \nVocê não tem dinheiro!.`)
        if (quantia > autor2.coinsc) return message.reply(`${client.user.username} - Erro \nVocê não tem essa quantia!.`)
        let somar = Number(autor1.coinsc) + quantia
        let diminuir =  Number(autor2.coinsc) - quantia
            if(autor2) {
        if(autor1) {
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Diversão`, `Deseja quer dar ${quantia} para <@${autor1.id}>`)
            message.reply({embeds: [embed], fetchReply: true}).then(reag => {
                reag.react('✅')
                const filter = (reaction, user) => {
                    return reaction.emoji.name === '✅' && user.id === message.user.id
                };

                const collector = reag.createReactionCollector({filter, time: 15000});

                collector.on('collect', async (reaction, user) => {
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .addField(`${client.user.username} - Diversão`, `Você deu ${quantia} para <@${autor1.id}>`)
                      autor1.coinsc = somar
                      autor2.coinsc = diminuir
                     autor1.save()
                     autor2.save()
                    message.reply({embeds: [embed]})
                })
            })
        } else {
            message.reply('Ele não tem 1 conta')
        }
    } else {
            message.reply('Você não tem 1 conta')
        }
    }
}