const db = require('../../../db')
const { MessageEmbed } = require('discord.js')
const parseMilliseconds = require('parse-ms')
module.exports = {
    config: {
        nome: 'rep',
        aliases: ['reputação', 'reputacao'],
        options: [
            {
            name: 'user',
            type: 'STRING',
            description: 'User da pessoa',
            required: false,
        },
    ]
    },
    run: async(client, message, args) => {
        let id = message.options?.getString('user').id
        let mencao = message.mentions?.users.first() || client.users.cache.get(!id ? message.user.id:id.replace(/[<@!>]/g, '')) || await client.users.fetch(!id ? message.user.id:id.replace(/[<@!>]/g, ''));
        if(!mencao) return message.reply('Você não mencionou uma pessoa')
        const membro = await db.reps.findOne({id: mencao.id})
        const lan = await db.lgs.findOne({guildID: message.guild.od})
        let cd = await db.repsc.findOne({membro: message.user.id}) 
        if(!lan) {
        if(cd) {
                if (cd.cooldown + 7.2e+6 > Date.now()) {
                let infh = parseMilliseconds(7.2e+6 - (Date.now() - cd.cooldown));
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .addField(`${client.user.username} - Reputação`, `Você ja deu uma reputação para uma pessoa!! Tente novamente daqui **${infh.hours} horas ${infh.minutes} minutos ${infh.seconds} segundos!**`)
                return message.reply({embeds: [embed]})
            }
        }
        if(mencao.id === message.user.id) return message.reply('Você não pode da reputação para a si mesmo!')
        let rep = message.mentions.members.size
        if(rep > 1) return message.reply('Você não pode da reputação para 2 pessoas!')
        if(!membro) {
            await db.reps.create({
                id: mencao.id,
                reps: rep,
                membro: message.user.id
            })
            await db.repsc.create({membro: message.user.id, cooldown: Date.now()})
            message.reply(`Você deu uma reputação para ${mencao} agora ele tem 1 reputação!`)
        } else {
                if(membro.reps + 1 === 50) {
                    message.reply(`Você deu uma reputação para ${mencao} agora ele tem ${membro.reps + 1} reputação e ganhou 20 koins!`)
                    const coins = await db.coins.findOne({id: mencao.id})
                    if(!coins) return;
                   await db.repsc.create({membro: message.user.id, cooldown: Date.now()})
                   return await db.coins.findOneAndUpdate({id: mencao.id}, {coinsc: coins.coinsc + 20})
                } else if (membro.reps + 1 === 100) {
                    message.reply(`Você deu uma reputação para ${mencao} agora ele tem ${membro.reps + 1} reputação e ganhou 5000 koins!`)
                    const coins = await db.coins.findOne({id: mencao.id})
                    if(!coins) return;
                   await db.repsc.create({membro: message.user.id, cooldown: Date.now()})
                   return await db.coins.findOneAndUpdate({id: mencao.id}, {coinsc: coins.coinsc + 5000})
                }
                await db.reps.findOneAndUpdate({id: mencao.id}, {reps: membro.reps + rep, membro: message.user.id})
                await db.repsc.create({membro: message.user.id, cooldown: Date.now()})
               message.reply(`Você deu uma reputação para \`${mencao.user.username}\` agora ele tem ${membro.reps + 1} reputação`)
                if(membro.reps + 1 === 50) {
                    message.reply(`Você deu uma reputação para ${mencao} agora ele tem ${membro.reps + 1} reputação e ganhou 20 koins!`)
                    const coins = await db.coins.findOne({id: mencao.id})
                    await db.reps.findOneAndUpdate({id: mencao.id}, {reps: membro.reps + rep,membro: message.user.id})
                    await db.repsc.findOneAndUpdate({membro: message.user.id, cooldown: Date.now()})
                    if(!coins) return;
                   return await db.coins.findOneAndUpdate({id: mencao.id}, {coinsc: coins.coinsc + 20})
                }  else if (membro.reps + 1 === 100) {
                    message.reply(`Você deu uma reputação para ${mencao} agora ele tem ${membro.reps + 1} reputação e ganhou 5000 koins!`)
                    const coins = await db.coins.findOne({id: mencao.id})
                    if(!coins) return;
                   await db.repsc.findOneAndUpdate({membro: message.user.id, cooldown: Date.now()})
                   return await db.coins.findOneAndUpdate({id: mencao.id}, {coinsc: coins.coinsc + 5000})
                }
                await db.reps.findOneAndUpdate({id: mencao.id}, {reps: membro.reps + rep,membro: message.user.id})
                await db.repsc.findOneAndUpdate({membro: message.user.id, cooldown: Date.now()})
                return message.reply(`Você deu uma reputação para \`${mencao.user.username}\` agora ele tem ${membro.reps + 1} reputação`)
            }
        } else {
            if(lan.lang === 'en') {
                if(cd) {
                    if (cd.cooldown + 7.2e+6 > Date.now()) {
                    let infh = parseMilliseconds(7.2e+6 - (Date.now() - cd.cooldown));
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .addField(`${client.user.username} - Reputation`, `You've already given a person a reputation !! Try again from here **${infh.hours} hours ${infh.minutes} minutes ${infh.seconds} seconds!**`)
                    return message.reply({embeds: [embed]})
                }
            }
            if(mencao.id === message.user.id) return message.reply('You cannot reputation for yourself!')
            let rep = message.mentions.members.size
            if(rep > 1) return message.reply('You can\'t afford a reputation for 2 people!')
            if(!membro) {
                await db.reps.create({
                    id: mencao.id,
                    reps: rep,
                    membro: message.user.id
                })
                await db.repsc.create({membro: message.user.id, cooldown: Date.now()})
                message.reply(`You have given a reputation for ${mencao} now he has 1 reputation!`)
            } else {
                    if(membro.reps + 1 === 50) {
                        message.reply(`You have given a reputation for ${mencao} now he has ${membro.reps + 1} reputation and won 20 koins!`)
                        const coins = await db.coins.findOne({id: mencao.id})
                        if(!coins) return;
                       await db.repsc.create({membro: message.user.id, cooldown: Date.now()})
                       return await db.coins.findOneAndUpdate({id: mencao.id}, {coinsc: coins.coinsc + 20})
                    } else if (membro.reps + 1 === 100) {
                        message.reply(`You have given a reputation for ${mencao} now he has ${membro.reps + 1} reputation and won 5000 koins!`)
                        const coins = await db.coins.findOne({id: mencao.id})
                        if(!coins) return;
                       await db.repsc.create({membro: message.user.id, cooldown: Date.now()})
                       return await db.coins.findOneAndUpdate({id: mencao.id}, {coinsc: coins.coinsc + 5000})
                    }
                    await db.reps.findOneAndUpdate({id: mencao.id}, {reps: membro.reps + rep, membro: message.user.id})
                    await db.repsc.create({membro: message.user.id, cooldown: Date.now()})
                   message.reply(`You have given a reputation for \`${mencao.user.username}\` now he has ${membro.reps + 1} reputation`)
                    if(membro.reps + 1 === 50) {
                        message.reply(`You have given a reputation for ${mencao} now he has ${membro.reps + 1} reputation and won 20 koins!`)
                        const coins = await db.coins.findOne({id: mencao.id})
                        await db.reps.findOneAndUpdate({id: mencao.id}, {reps: membro.reps + rep,membro: message.user.id})
                        await db.repsc.findOneAndUpdate({membro: message.user.id, cooldown: Date.now()})
                        if(!coins) return;
                       return await db.coins.findOneAndUpdate({id: mencao.id}, {coinsc: coins.coinsc + 20})
                    }  else if (membro.reps + 1 === 100) {
                        message.reply(`You have given a reputation for ${mencao} now he has ${membro.reps + 1} reputation and won 5000 koins!`)
                        const coins = await db.coins.findOne({id: mencao.id})
                        if(!coins) return;
                       await db.repsc.findOneAndUpdate({membro: message.user.id, cooldown: Date.now()})
                       return await db.coins.findOneAndUpdate({id: mencao.id}, {coinsc: coins.coinsc + 5000})
                    }
                    await db.reps.findOneAndUpdate({id: mencao.id}, {reps: membro.reps + rep,membro: message.user.id})
                    await db.repsc.findOneAndUpdate({membro: message.user.id, cooldown: Date.now()})
                    return message.reply(`You have given a reputation for \`${mencao.user.username}\` now he has ${membro.reps + 1} reputation`)
                }
            }
        }
    }
}