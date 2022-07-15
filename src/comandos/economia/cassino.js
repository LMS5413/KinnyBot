const { MessageEmbed } = require('discord.js')
const PD = require("probability-distributions");
const parseMilliseconds = require('parse-ms');
const db = require('../../../db.js')
module.exports = {
    config: {
        nome: 'cassino',
        cooldown: 10
    },
    run: async(client, message) => {
        if(!message.guild.me.permissions.has('MANAGE_EMOJIS_AND_STICKERS')) return message.reply(`${client.user.username} - Erro \n<a:alerta:806274799638282311> Eu não tenho permissao \`Gerenciar Emojis\``)
        const autor = await db.coins.findOne({id: message.user.id})
        const lan = await db.lgs.findOne({guildID: message.user.id})
        if(!lan) {
        if(!autor) return message.reply('Você nao tem conta!')
        const quantia = Math.floor(Math.random() * 30);
        const chance = PD.sample(['10', '20'], 1, true, [0.1, 0.4])
        let som = Number(autor.coinsc + quantia)
        let men = autor.coinsc - quantia
        const timeout = 3600000
if(autor) {
    if (autor.cassdown + timeout > Date.now()) {
        let infh = parseMilliseconds(timeout - (Date.now() - autor.cassdown));
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .addField(`${client.user.username} - Diversão`, `Você ja jogou no cassino! Tente novamente daqui **${infh.hours} horas ${infh.minutes} minutos ${infh.seconds} segundos!**`)
        message.reply({embeds: [embed]})
    } else {
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .addField(`${client.user.username} - Diversão`, `Deseja apostar em qual cor? ⬜ ou 🟥`)
        message.reply({embeds: [embed], fetchReply: true}).then(reag => {
            reag.react('⬜')
            reag.react('🟥')
            const filter = (reaction, user) => {
                return reaction.emoji.name === '⬜' && user.id === message.user.id
            };

            const collector = reag.createReactionCollector({filter, time: 15000});

            collector.on('collect', async (reaction, user) => {
reag.reactions.removeAll()
                if (`${chance}` === '10') {
      

                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .addField(`${client.user.username} - Diversão`, `Você apostou no ⬜ e caiu no ⬜ por isso ganhou ${quantia} koins`)


await db.coins.updateOne({id: message.user.id}, {coinsc: som, cassdown: Date.now()})

                    reag.edit({embeds: [embed]})
                }
                if (`${chance}` === '20') {
                  
                    if (quantia <= autor.coinsc) {
                        const embed = new MessageEmbed()
                            .setColor('#9900f8')
                            .addField(`${client.user.username} - Diversão`, `Você apostou no ⬜ e caiu no 🟥 por isso perdeu ${quantia} koins`)
await db.coins.updateOne({id: message.user.id}, {coinsc: men, cassdown: Date.now()})
                        reag.edit({embeds: [embed]})
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#9900f8')
                            .addField(`${client.user.username} - Diversão`, `Você jogou sem ter koins, por isso está devendo ${quantia} koins pro cassino!`)
await db.coins.updateOne({id: message.user.id}, {coinsc: men, cassdown: Date.now()})
                        reag.edit({embeds: [embed]})
                    }
                }

            });
            const filter2 = (reaction, user) => {
                return reaction.emoji.name === '🟥' && user.id === message.user.id
            };

            const collector2 = reag.createReactionCollector(filter2, {time: 15000});

            collector2.on('collect', async (reaction, user) => {
reag.reactions.removeAll()
                if (`${chance}` === '10') {
                    
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .addField(`${client.user.username} - Diversão`, `Você apostou no 🟥 e caiu no 🟥 por isso ganhou ${quantia} koins`)
await db.coins.updateOne({id: message.user.id}, {coinsc: som, cassdown: Date.now()})
                    reag.edit({embeds: [embed]})
                }
                if (`${chance}` === '20') {
                    if (quantia <= autor.coinsc) {
                        const embed = new MessageEmbed()
                            .setColor('#9900f8')
                            .addField(`${client.user.username} - Diversão`, `Você apostou no 🟥 e caiu no ⬜ por isso perdeu ${quantia} koins`)
await db.coins.updateOne({id: message.user.id}, {coinsc: men, cassdown: Date.now()})
                        reag.edit({embeds: [embed]})
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#9900f8')
                            .addField(`${client.user.username} - Diversão`, `Você jogou sem ter koins, por isso está devendo ${quantia} koins pro cassino!`)
await db.coins.updateOne({id: message.user.id}, {coinsc: men, cassdown: Date.now()})
                        reag.edit({embeds: [embed]})
                    }
                }
            })
        })
    }
} else {
    message.reply(`${client.user.username} - Diversão \n Não foi dessa vez amigo, você não tem 1 conta :(`)
}
        } else {
            if(!autor) return message.reply('You don\'t have an account!')
            const quantia = Math.floor(Math.random() * 30);
            const chance = PD.sample(['10', '20'], 1, true, [0.1, 0.4])
            let som = Number(autor.coinsc + quantia)
            let men = autor.coinsc - quantia
            const timeout = 3600000
    if(autor) {
        if (autor.cassdown + timeout > Date.now()) {
            let infh = parseMilliseconds(timeout - (Date.now() - autor.cassdown));
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Fun`, `You already played at the casino! Try again from here **${infh.hours} hours ${infh.minutes} minutes ${infh.seconds} seconds!**`)
            message.reply({embeds: [embed]})
        } else {
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Fun`, `Which color do you want to bet on? ⬜ ou 🟥`)
            message.reply({embeds: [embed], fetchReply: true}).then(reag => {
                reag.react('⬜')
                reag.react('🟥')
                const filter = (reaction, user) => {
                    return reaction.emoji.name === '⬜' && user.id === message.user.id
                };
    
                const collector = reag.createReactionCollector({filter, time: 15000});
    
                collector.on('collect', async (reaction, user) => {
    reag.reactions.removeAll()
                    if (`${chance}` === '10') {
          
    
                        const embed = new MessageEmbed()
                            .setColor('#9900f8')
                            .addField(`${client.user.username} - Fun`, `You bet on ⬜ and fell on ⬜ so you won ${quantia} koins`)
    
    
    await db.coins.updateOne({id: message.user.id}, {coinsc: som, cassdown: Date.now()})
    
                        reag.edit({embeds: [embed]})
                    }
                    if (`${chance}` === '20') {
                      
                        if (quantia <= autor.coinsc) {
                            const embed = new MessageEmbed()
                                .setColor('#9900f8')
                                .addField(`${client.user.username} - Fun`, `You bet on ⬜ and fell on 🟥 so you lost ${quantia} koins`)
    await db.coins.updateOne({id: message.user.id}, {coinsc: men, cassdown: Date.now()})
                            reag.edit({embeds: [embed]})
                        } else {
                            const embed = new MessageEmbed()
                                .setColor('#9900f8')
                                .addField(`${client.user.username} - Fun`, `You played without koins, so you owe ${quantia} koins!`)
    await db.coins.updateOne({id: message.user.id}, {coinsc: men, cassdown: Date.now()})
                            reag.edit({embeds: [embed]})
                        }
                    }
    
                });
                const filter2 = (reaction, user) => {
                    return reaction.emoji.name === '🟥' && user.id === message.user.id
                };
    
                const collector2 = reag.createReactionCollector(filter2, {time: 15000});
    
                collector2.on('collect', async (reaction, user) => {
    reag.reactions.removeAll()
                    if (`${chance}` === '10') {
                        
                        const embed = new MessageEmbed()
                            .setColor('#9900f8')
                            .addField(`${client.user.username} - Fun`, `You bet on 🟥 and fell on 🟥 so you won ${quantia} koins`)
    await db.coins.updateOne({id: message.user.id}, {coinsc: som, cassdown: Date.now()})
                        reag.edit({embeds: [embed]})
                    }
                    if (`${chance}` === '20') {
                        if (quantia <= autor.coinsc) {
                            const embed = new MessageEmbed()
                                .setColor('#9900f8')
                                .addField(`${client.user.username} - Fun`, `You bet on 🟥 and fell on ⬜ so you lost ${quantia} koins`)
    await db.coins.updateOne({id: message.user.id}, {coinsc: men, cassdown: Date.now()})
                            reag.edit({embeds: [embed]})
                        } else {
                            const embed = new MessageEmbed()
                                .setColor('#9900f8')
                                .addField(`${client.user.username} - Fun`, `You played without koins, so you owe ${quantia} koins!`)
    await db.coins.updateOne({id: message.user.id}, {coinsc: men, cassdown: Date.now()})
                            reag.edit({embeds: [embed]})
                        }
                    }
                })
            })
        }
    } else {
        message.reply(`${client.user.username} - Fun \n It wasn't this time buddy, you don't have 1 account :(`)
    }
        }
    }
}