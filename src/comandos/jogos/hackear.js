const db = require('../../../db.js')
const { MessageEmbed } = require('discord.js')
const parseMilliseconds = require('parse-ms');
function generateRandomString(len) {
    return new Array(len).join().replace(/(.|$)/g, function() {
        return ((Math.random() * 36) | 0)
            .toString(36)
            [Math.random() < 0.5 ? "toString" : "toUpperCase"]();
    });
}
module.exports = {
    config: {
        nome: "hackear",
        cooldown: 10,
        aliases: ['hack', 'hacking'],
        options: [{
            name: 'vitima',
            type: 'STRING',
            description: 'Vitima que vai ser hackeada!',
            required: true,
        }],
    },
    run: async (client, message, args) => {
        const pc = await db.consu.findOne({consumidor: message.user.id})
        const lan = await db.lgs.findOne({guildID: message.user.id})
        if (!lan) {
            if (client.users.cache.get(message.options?.getString('vitima').replace(/[<@!>]/g, ''))) {
                if (!lan) {
                    if (!pc) return message.reply('Você nao esta cadastrado na loja')
                    const money = await db.coins.findOne({id: message.user.id})
                    if (!money) return message.reply('Você nao esta cadastrado no banco!')
                    if (pc.cooldown + 3.6e+6 > Date.now()) {
                        let infh = parseMilliseconds(3.6e+6 - (Date.now() - pc.cooldown));
                        const embed = new MessageEmbed()
                            .setColor('#9900f8')
                            .addField(`${client.user.username} - Diversão`, `Você ja hackeou! Tente novamente daqui **${infh.hours} horas ${infh.minutes} minutos ${infh.seconds} segundos!**`)
                        message.reply({embeds: [embed]})
                    } else {
                        if (!pc.produtos.includes('computador')) return message.reply('Você nao tem 1 computador')
                        await db.consu.findOneAndUpdate({consumidor: message.user.id}, {cooldown: Date.now()})
                        await db.consu.findOneAndUpdate({consumidor: message.user.id}, {$pull: {produtos: 'computador'}})
                        const grana = Math.floor(Math.random() * 600);
                        const embed = new MessageEmbed()
                            .setColor('#9900f8')
                            .setTitle(`${client.user.username} - Diversão`)
                            .setDescription(`Hackeando ${message.mentions?.users.first().username || client.users.fetch(!args[0] ? message.options?.getString('vitima').replace(/[<@!>]/g, ''):args[0])}`)
                            .setImage('https://media3.giphy.com/media/YQitE4YNQNahy/giphy-downsized-large.gif')
                        message.reply({content: message.user.toString(), embeds: [embed]}).then(editar => {

                            setTimeout(async () => {
                                const embed = new MessageEmbed()
                                    .setColor('#9900f8')
                                    .setTitle(`${client.user.username} - Diversão`)
                                    .setDescription(`Você hackeou ${message.mentions?.users.first().username || client.users.fetch(!args[0] ? message.options?.getString('vitima').replace(/[<@!>]/g, ''):args[0])} e ganhou ${grana} koins! \nEMAIL: ${message.mentions.users.first().username}@ednaldo.com \nPASS: ${generateRandomString(7)}\nID SERVER: ${message.mentions.users.first().id}`)
                                await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: money.coinsc + grana})
                                ({content: message.user.toString(), embeds: [embed]})
                            }, 5000)
                        })
                    }
                } else {
                    if (lan.lang === 'en') {
                        if (!pc) return message.reply('You are not registered in the store')
                        const money = await db.coins.findOne({id: message.user.id})
                        if (!money) return message.reply('You are not registered with the bank!')
                        if (!pc.produtos.includes('computer')) return message.reply('You don\'t have a computer')

                        const timeout = 3.6e+6
                        if (pc.cooldown + timeout > Date.now()) {
                            let infh = parseMilliseconds(timeout - (Date.now() - pc.cooldown));
                            const embed = new MessageEmbed()
                                .setColor('#9900f8')
                                .addField(`${client.user.username} - Fun`, `You already hacked! Try again from here **${infh.hours} hours ${infh.minutes} minutes ${infh.seconds} seconds!**`)
                            message.reply({embeds: [embed]})
                        } else {
                            await db.consu.findOneAndUpdate({consumidor: message.user.id}, {cooldown: Date.now()})
                            await db.consu.findOneAndUpdate({consumidor: message.user.id}, {$pull: {produtos: 'computer'}})
                            const grana = Math.floor(Math.random() * 600);
                            const embed = new MessageEmbed()
                                .setColor('#9900f8')
                                .setTitle(`${client.user.username} - Fun`)
                                .setDescription(`Hacking ${message.mentions.users.first().username}}`)
                                .setImage('https://media3.giphy.com/media/YQitE4YNQNahy/giphy-downsized-large.gif')
                            message.reply({content: message.user.toString(), embeds: [embed]}).then(editar => {

                                setTimeout(async () => {
                                    const embed = new MessageEmbed()
                                        .setColor('#9900f8')
                                        .setTitle(`${client.user.username} - Fun`)
                                        .setDescription(`You hacked ${message.mentions?.users.first().username || client.users.fetch(!args[0] ? message.options?.getString('vitima').replace(/[<@!>]/g, ''):args[0])} and won ${grana} koins!\nEMAIL: ${message.mentions.users.first().username}@ednaldo.com \nPASS: ${generateRandomString(7)}\nID SERVER: ${message.mentions.users.first().id}`)
                                    await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: money.coinsc + grana})
                                    editar.edit({embeds: [embed]})
                                }, 5000)
                            })
                        }
                    }
                }
                return;
            }
            if (!pc) return message.reply('Você nao esta cadastrado na loja')
            const money = await db.coins.findOne({id: message.user.id})
            if (!money) return message.reply('Você nao esta cadastrado no banco!')
            if (!pc.produtos.includes('computador')) return message.reply('Você nao tem 1 computador')

            let objeto = ['datacenter da witch', 'foto do jack', 'nasa', 'area 51', 'celular do presidente']
            const timeout = 7.2e+6
            if (pc.cooldown + timeout > Date.now()) {
                await db.consu.findOneAndUpdate({consumidor: message.user.id}, {cooldown: Date.now()})
                await db.consu.findOneAndUpdate({consumidor: message.user.id}, {$pull: {produtos: 'computador'}})
                    if (pc.cooldown + 3.6e+6 > Date.now()) {
                        let infh = parseMilliseconds(3.6e+6 - (Date.now() - pc.cooldown));
                        const embed = new MessageEmbed()
                            .setColor('#9900f8')
                            .addField(`${client.user.username} - Diversão`, `Você ja hackeou! Tente novamente daqui **${infh.hours} horas ${infh.minutes} minutos ${infh.seconds} segundos!**`)
                       return message.reply({embeds: [embed]})
                    }
                const random = objeto[Math.floor(Math.random() * objeto.length)];
                const grana = Math.floor(Math.random() * 600);
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .setTitle(`${client.user.username} - Diversão`)
                    .setDescription(`Hackeando ${random}`)
                    .setImage('https://media3.giphy.com/media/YQitE4YNQNahy/giphy-downsized-large.gif')
                message.reply(message.user, embed).then(editar => {

                    setTimeout(async () => {
                        const embed = new MessageEmbed()
                            .setColor('#9900f8')
                            .setTitle(`${client.user.username} - Diversão`)
                            .setDescription(`Você hackeou ${random} e ganhou ${grana} koins!`)
                        await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: money.coinsc + grana})
                        editar.edit({embeds: [embed]})
                    }, 5000)
                })
            }
            if (lan.lang === 'en') {
                if (!pc) return message.reply('You are not registered in the store')
                const money = await db.coins.findOne({id: message.user.id})
                if (!money) return message.reply('You are not registered with the bank!')
                if (!pc.produtos.includes('computer')) return message.reply('You don\'t have a computer')

                let objeto = ['witch\'s datacenter', 'FBI', 'nasa', 'area 51', 'president\'s cell phone']
                const timeout = 3.6e+6
                if (pc.cooldown + timeout > Date.now()) {
                    let infh = parseMilliseconds(timeout - (Date.now() - pc.cooldown));
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .addField(`${client.user.username} - Fun`, `You already hacked! Try again from here **${infh.hours} hours ${infh.minutes} minutes ${infh.seconds} seconds!**`)
                    message.reply({embeds: [embed]})
                } else {
                    await db.consu.findOneAndUpdate({consumidor: message.user.id}, {cooldown: Date.now()})
                    await db.consu.findOneAndUpdate({consumidor: message.user.id}, {$pull: {produtos: 'computer'}})
                    const random = objeto[Math.floor(Math.random() * objeto.length)];
                    const grana = Math.floor(Math.random() * 600);
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .setTitle(`${client.user.username} - Fun`)
                        .setDescription(`Hacking ${random}`)
                        .setImage('https://media3.giphy.com/media/YQitE4YNQNahy/giphy-downsized-large.gif')
                    message.reply(message.user, embed).then(editar => {

                        setTimeout(async () => {
                            const embed = new MessageEmbed()
                                .setColor('#9900f8')
                                .setTitle(`${client.user.username} - Fun`)
                                .setDescription(`You hacked ${random} and won ${grana} koins!`)
                            await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: money.coinsc + grana})
                            editar.edit({embeds: [embed]})
                        }, 5000)
                    })

                }
            }
        }
    }
}