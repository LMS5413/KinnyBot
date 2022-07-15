const db = require('../../../db.js')
const { MessageEmbed } = require('discord.js')
const parseMilliseconds = require('parse-ms');
module.exports = {
    config: {
        nome: 'rob',
        aliases: ['roubar', 'ladrao'],
        cooldown: 10,
        options: [{
            name: 'user',
            type: 'STRING',
            description: 'Vitima que vai ser roubado!',
            required: true,
        }],
    },
    run: async (client, message, args) => {
        const vit = client.users.cache.get(message.options?.getString('user')?.replace(/[<@!>]/g, '')) || client.users.fetch(message.options?.getString('user')?.replace(/[<@!>]/g, ''));

        if(vit instanceof Promise) {
            await vit.then(u => vit = u).catch(err => vit = !message.user ? message.user:message.user);
        }
        if (!vit) return message.reply(`${client.user.username} - Erro \n Mencione a vitima do roubo.`)
        const vitima = await db.coins.findOne({id: vit.id})
        const autor = await db.coins.findOne({id: message.user.id})
        const lan = await db.lgs.findOne({guildID: message.user.id})
        if(!lan) {
        if(!vitima && !autor) return message.reply('Você não tem conta ou a vitima nao tem conta!')
        const timeout = 8.64e+7
        if (autor.robdown + timeout > Date.now()) {
            let infh = parseMilliseconds(timeout - (Date.now() - autor.robdown));
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Diversão`, `Você ja roubou! Tente novamente daqui **${infh.hours} horas ${infh.minutes} minutos ${infh.seconds} segundos!**`)
            message.reply({embeds: [embed]})
        } else {
            if (vitima) {
                if (vitima.coinsc <= 0) return message.reply(`${client.user.username} - Erro \n Essa pessoa não tem dinheiro`)
                const grana = Math.floor(Math.random() * vitima.coinsc);
                console.log(autor)
                let athor = message.user.id
                if (vitima.id === athor) return message.reply(`${client.user.username} - Erro \n Que bandido tu é? Pra roubar a si mesmo? Eu te levo pro hospicio heim.`)
                if (['395995293436477442'].includes(vit.id)) {
                 await db.coins.updateOne({id: message.user.id}, {robdown: Date.now()})
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .addField(`${client.user.username} - Diversão`, `Essa pessoa tem as medidas protetivas da Policia Federal e não pode ser roubada, por isso você perde ${grana} de koins! (No seu banco tambem é removido)`)
                    await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: autor.coinsc - grana, coinsb: autor.coinsb - grana})
                    message.reply({embeds: [embed]})
                } else {
                    if (vitima && autor) {
                        if (grana <= vitima.coinsc) {
                            await db.coins.findOneAndUpdate({id: vit.id}, {coinsc: vitima.coinsc - grana})
                            await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: autor.coinsc + grana})
                            await db.coins.updateOne({id: message.user.id}, {robdown: Date.now()})
                            const embed = new MessageEmbed()
                                .setColor('#9900f8')
                                .addField(`${client.user.username} - Diversão`, `Você roubou ${grana} koins do <@${vitima.id}>`)
                            message.reply({embeds: [embed]})
                        } else {
                            const embed = new MessageEmbed()
                                .setColor('#9900f8')
                                .addField(`${client.user.username} - Diversão`, `Você roubou ${grana} koins do <@${vitima.id}> não pera, essa pessoa não tem essa quantia então tu ganha nada? Eh acho que sim então tu se ferrou`)
                            message.reply({embeds: [embed]})
                        }
                    } else {
                        message.reply(`${client.user.username} - Diversão \n Não foi dessa vez amigo, você não tem 1 conta :(`)
                    }
                }
            } else {
                message.reply(`${client.user.username} - Diversão \n Não foi dessa vez amigo, ele não tem 1 conta :(`)
            }
            }
        } else {
            if(lan.lang === 'en') {
                if(!vitima || !autor) return message.reply('You don\'t have an account or the victim doesn\'t have an account!')
                const timeout = 8.64e+7
                if (autor.robdown + timeout > Date.now()) {
                    let infh = parseMilliseconds(timeout - (Date.now() - autor.robdown));
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .addField(`${client.user.username} - Fun`, `You already stole it! Try again from here **${infh.hours} hours ${infh.minutes} minutes ${infh.seconds} seconds!**`)
                    message.reply({embeds: [embed]})
                } else {
                    if (vitima) {
                        if (vitima.coinsc <= 0) return message.reply(`${client.user.username} - Error \nThat person has no money`)
                        const grana = Math.floor(Math.random() * vitima.coinsc);
                        if (vitima.id === message.user.id) return message.reply(`${client.user.username} - Erro \nWhat bandit are you? To steal yourself? I'll take you to the hospice huh.`)
                        if (['395995293436477442'].includes(vit.id)) {
                         await db.coins.updateOne({id: message.user.id}, {robdown: Date.now()})
                            const embed = new MessageEmbed()
                                .setColor('#9900f8')
                                .addField(`${client.user.username} - Fun`, `That person has FBI protective measures and cannot be stolen, so you lose ${money} of koins! (In your bank it is also removed)`)
                            await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: autor.coinsc - grana, coinsb: autor.coinsb - grana})
                            message.reply({embeds: [embed]})
                        } else {
                            if (vitima && autor) {
                                if (grana <= vitima.coinsc) {
                            await db.coins.findOneAndUpdate({id: vit.id}, {coinsc: vitima.coinsc - grana})
                            await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: autor.coinsc + grana})
                            await db.coins.updateOne({id: message.user.id}, {robdown: Date.now()})
                                    await db.coins.updateOne({id: message.user.id}, {robdown: Date.now()})
                                    const embed = new MessageEmbed()
                                        .setColor('#9900f8')
                                        .addField(`${client.user.username} - Fun`, `You stole ${grana} koins from <@${vitima.id}>`)
                                    message.reply({embeds: [embed]})
                                } else {
                                    const embed = new MessageEmbed()
                                        .setColor('#9900f8')
                                        .addField(`${client.user.username} - Fun`, `You stole ${grana} koins from <@${vitima.id}> no wait, that person doesn’t have that amount so do you earn anything? Eh I think so then you screwed`)
                                    message.reply({embeds: [embed]})
                                }
                            } else {
                                message.reply(`${client.user.username} - Fun \n It wasn't this time buddy, you don't have 1 account :(`)
                            }
                        }
                    } else {
                        message.reply(`${client.user.username} - Fun \n It wasn't this time buddy, you don't have 1 account :(`)
                    }
                    }
            }
        }
    }
}