const { MessageEmbed } = require('discord.js')
const db = require('../../../db')

module.exports = {
    config: {
        nome: 'casar',
        cooldown: 10,
        options: [{
            name: 'noiva',
            type: 'STRING',
            description: 'Você pode digitar o ID ou mencionar sua futura esposa!',
            required: true,
        }],
    },
    run: async(client, message, args) => {
        if(!message.guild.me.permissions.has('MANAGE_EMOJIS_AND_STICKERS')) return message.reply(`${client.user.username} - Erro \n<a:alerta:806274799638282311> Eu não tenho permissao \`Gerenciar emojis\``)
        let noiva =  client.users.fetch(message.options?.getString('noiva').replace(/[<@!>]/g, ''))
        if(!noiva) return message.reply('Mencione a noiva')
        let casado1 = await db.coins.findOne({id: message.user.id})
        let casado2 = await db.coins.findOne({id: noiva.id})
        const lan = await db.lgs.findOne({guildID: message.user.id})
        if(!lan) {
        if(noiva.id === message.user.id) return message.reply('Você não consegue casar com você mesmo!')
        if(!noiva) return message.reply('Mencione a noiva')
        if(!casado1) return message.reply('Você não tem uma conta!')
        if(!casado2) return message.reply('A noiva nao tem uma conta!')
        if(casado1.casado2 == noiva.id) return message.reply('Você já e casado')
        if(casado2.casado2 == message.user.id) return message.reply('Você já e casado')
        let debbug = await db.coins.findOne({id: noiva.id})
        if(debbug.casado1 === noiva.id) return message.reply('Ele já e casado!')
        if(casado1.coinsc < 7000 || casado2.coinsc < 7000) return message.reply('Ambos não tem 7000 Koins! Casamentos custam dinheiro')

        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .addField(`${client.user.username} - Diversão`, `${noiva} o ${message.user} pediu você em casamento! Você aceita? So iremos tirar 7000 koins na sua carteira <:dinheiro:802595398153011291>`)
                message.reply({embeds: [embed], fetchReply: true}).then(reagir => {
                    reagir.react('✅')
                    reagir.react('❌')
                    const filter = (reaction, user) => {
                        return reaction.emoji.name === '✅' && user.id === noiva.id;
                    };

                    const collector = reagir.createReactionCollector({filter, time: 15000, max: 1});

                    collector.on('collect', async (reaction, user) => {
                        reagir.reactions.removeAll()
                        const embed = new MessageEmbed()
                            .setColor('#9900f8')
                            .addField(`${client.user.username} - Diversão`, `${noiva} Aceitou o pedido de ${message.user} agora eles são casados!`)

                        reagir.edit({embeds: [embed]})
                       await db.coins.findOneAndUpdate({ id: message.user.id }, { coinsc: casado1.coinsc - 7000, casado1: message.user, casado2: noiva.id});
                        await db.coins.findOneAndUpdate({ id: noiva.id}, { coinsc: casado2.coinsc - 7000, casado2: message.user, casado1: noiva.id});
                    });
                    const filter2 = (reaction, user) => {
                        return reaction.emoji.name === '❌' && user.id === noiva.id;
                    };

                    const collector2 = reagir.createReactionCollector(filter2, {max: 1});

                    collector2.on('collect', async (reaction, user) => {
                        reagir.reactions.removeAll()
                        const embed = new MessageEmbed()
                            .setColor('#9900f8')
                            .addField(`${client.user.username} - Diversão`, `${noiva} Não aceitou o pedido! Por isso o ${message.user} ficou com depressão!`)
                        reagir.edit({embeds: [embed]})

                    })
                })
            } else {
                if(lan.lang === 'en') {
                    if(noiva.id === message.user.id) return message.reply('You can\'t marry yourself!')
                    if(!noiva) return message.reply('Mention the bride')
                    if(!casado1) return message.reply('You don\'t have an account!')
                    if(!casado2) return message.reply('The bride does not have an account!')
                    if(casado1.casado2 == noiva.id) return message.reply('You are already married')
                    if(casado2.casado2 == message.user.id) return message.reply('You are already married')
                    let debbug = await db.coins.findOne({id: noiva.id})
                    if(debbug.casado1 === noiva.id) return message.reply('He\'s already married!')
                    if(casado1.coinsc < 7000 || casado2.coinsc < 7000) return message.reply('They both don\'t have 7000 Koins! Weddings cost money')
            
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .addField(`${client.user.username} - Fun`, `${noiva} o ${message.user} asked you to marry him! You accept? We will only take 7000 koins in your wallet <:dinheiro:802595398153011291>`)
                            message.reply({embeds: [embed]}).then(reagir => {
                                reagir.react('✅')
                                reagir.react('❌')
                                const filter = (reaction, user) => {
                                    return reaction.emoji.name === '✅' && user.id === noiva.id;
                                };
            
                                const collector = reagir.createReactionCollector({filter, time: 15000, max: 1});
            
                                collector.on('collect', async (reaction, user) => {
                                    reagir.reactions.removeAll()
                                    const embed = new MessageEmbed()
                                        .setColor('#9900f8')
                                        .addField(`${client.user.username} - Fun`, `${noiva} Accepted the ${message.user} application now they are married!`)
            
                                    reagir.edit({embeds: [embed]})
                                   await db.coins.findOneAndUpdate({ id: message.user.id }, { coinsc: casado1.coinsc - 7000, casado1: message.user, casado2: noiva.id});
                                    await db.coins.findOneAndUpdate({ id: noiva.id}, { coinsc: casado2.coinsc - 7000, casado2: message.user, casado1: noiva.id});
                                });
                                const filter2 = (reaction, user) => {
                                    return reaction.emoji.name === '❌' && user.id === noiva.id;
                                };
            
                                const collector2 = reagir.createReactionCollector(filter2, {max: 1});
            
                                collector2.on('collect', async (reaction, user) => {
                                    reagir.reactions.removeAll()
                                    const embed = new MessageEmbed()
                                        .setColor('#9900f8')
                                        .addField(`${client.user.username} - Fun`, `${noiva} did not accept the request! So the ${message.user} got depressed!`)
                                    reagir.edit({embeds: [embed]})
            
                                })
                            })
                }
            }

    }
}