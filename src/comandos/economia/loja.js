const db = require('../../../db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        nome: 'comprar',
        aliases: ['loja', 'store', 'buy'],
        cooldown: 10,
        options: [{
            name: 'produtos',
            type: 'STRING',
            description: 'Digite o produto!!',
            required: true,
        }],
    },
    run: async (client, message, args) => {
        let array = ['computador', 'sapato', 'privada', 'colher']
        let account = await db.coins.findOne({id: message.user.id})
        let caixa = await db.consu.findOne({consumidor: message.user.id})
        let prod = message.options.getString('produtos').toLowerCase()
        const lan = await db.lgs.findOne({guildID: message.user.id})
        if(!lan) {
        if(!account) return message.reply(`${client.user.username} - Erro \nVocê não tem conta`)
        if(!prod) {
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Diversão!`)
                .addField('Lista de produtos:', `🖥️ Computador: 150 Koins\n \n👟 Sapato: 50 Koins \n \n🚽 Privada: 200 koins \n \n🥄 Colher: 30 koins`)

            return message.reply({embeds: [embed]})
        }
       if (!array.includes(prod)) {
           const embed = new MessageEmbed()
               .setColor('#9900f8')
               .setTitle(`${client.user.username} - Diversão!`)
               .addField('Lista de produtos:', `🖥️ Computador: 150 Koins\n \n👟 Sapato: 50 Koins \n \n🚽 Privada: 200 koins \n \n🥄 Colher: 30 koins`)

           return message.reply({embeds: [embed]})
       }
        if(prod === 'computador') {
            if (account.coinsc < 150) {
                return message.reply('Você não tem 150 Koins!')
            }
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Diversão!`)
                .setDescription("🖥️ Você comprou um computador!")
            if (!caixa) {
                await db.consu.create({
                    consumidor: message.user.id,
                    produtos: prod
                })
                await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: account.coinsc - 150})
                return message.reply({embeds: [embed]})
            } else {
                if(caixa.produtos.includes("computador")) {
                    return message.reply("Você ja tem esse produto!")
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .setTitle(`${client.user.username} - Diversão!`)
                        .setDescription("🖥️ Você comprou um computador!")
                    await db.consu.findOneAndUpdate({consumidor: message.user.id}, {$push: {produtos: prod}})
                    await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: account.coinsc - 150})
                    return message.reply({embeds: [embed]})
                }
            }
        } else if (prod === "colher") {
            if (account.coinsc < 30) {
                return message.reply('Você não tem 30 Koins!')
            }
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Diversão!`)
                .setDescription("🥄 Você comprou uma colher")
            if (!caixa) {
                await db.consu.create({
                    consumidor: message.user.id,
                    produtos: prod
                })
                await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: account.coinsc - 30})
                return message.reply({embeds: [embed]})
            } else {
                if(caixa.produtos.includes("colher")) {
                    return message.reply("Você ja tem esse produto!")
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .setTitle(`${client.user.username} - Diversão!`)
                        .setDescription("🥄 Você comprou um colher")
                    await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: account.coinsc - 30})
                    await db.consu.findOneAndUpdate({consumidor: message.user.id}, {$push: {produtos: prod}})
                    return message.reply({embeds: [embed]})
                }
            }
        } else if (prod === "privada") {
            if (account.coinsc < 200) {
                return message.reply('Você não tem 200 Koins!')
            }
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Diversão!`)
                .setDescription("🚽 Você comprou uma privada")
            if (!caixa) {
                await db.consu.create({
                    consumidor: message.user.id,
                    produtos: prod
                })
                await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: account.coinsc - 200})
                return message.reply({embeds: [embed]})
            } else {
                if(caixa.produtos.includes("privada")) {
                    return message.reply("Você ja tem esse produto!")
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .setTitle(`${client.user.username} - Diversão!`)
                        .setDescription("🚽 Você comprou um privada")
                    await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: account.coinsc - 200})
                    await db.consu.findOneAndUpdate({consumidor: message.user.id}, {$push: {produtos: prod}})
                    return message.reply({embeds: [embed]})
                }
            }
        } else if (prod === 'sapato') {
            if (account.coinsc < 50) {
                return message.reply('Você não tem 50 Koins!')
            }
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Diversão!`)
                .setDescription("👟  Você comprou uma sapato")
            if (!caixa) {
                await db.consu.create({
                    consumidor: message.user.id,
                    produtos: prod
                })
                await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: account.coinsc - 50})
                return message.reply({embeds: [embed]})
            } else {
                if(caixa.produtos.includes("sapato")) {
                    return message.reply("Você ja tem esse produto!")
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .setTitle(`${client.user.username} - Diversão!`)
                        .setDescription("👟  Você comprou um sapato")
                    await db.consu.findOneAndUpdate({consumidor: message.user.id}, {$push: {produtos: prod}})
                    await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: account.coinsc - 50})
                    return message.reply({embeds: [embed]})
                }
                }
            }
        } else {
            if(lan.lang === 'en') {
                if(!account) return message.reply(`${client.user.username} - Error \nYou don't have an account`)
                if(!prod) {
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .setTitle(`${client.user.username} - Fun!`)
                        .addField('Lista de produtos:', `🖥️ Computer: 150 Koins\n \n👟 Shoe: 50 Koins \n \n🚽 Toilet: 200 koins \n \n🥄 To harvest: 30 koins`)
        
                    return message.reply({embeds: [embed]})
                }
               if (!array.includes(prod)) {
                   const embed = new MessageEmbed()
                       .setColor('#9900f8')
                       .setTitle(`${client.user.username} - Fun!`)
                       .addField('Lista de produtos:', `🖥️ Computer: 150 Koins\n \n👟 Shoe: 50 Koins \n \n🚽 Toilet: 200 koins \n \n🥄 To harvest: 30 koins`)
        
                   return message.reply({embeds: [embed]})
               }
                if(prod === 'computer') {
                    if (account.coinsc < 150) {
                        return message.reply('You don\'t have 150 Koins!')
                    }
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .setTitle(`${client.user.username} - Fun!`)
                        .setDescription("🖥️ You bought a computer!")
                    if (!caixa) {
                        await db.consu.create({
                            consumidor: message.user.id,
                            produtos: prod
                        })
                        await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: account.coinsc - 150})
                        return message.reply({embeds: [embed]})
                    } else {
                        if(caixa.produtos.includes("computer")) {
                            return message.reply("You already have this product!")
                        } else {
                            const embed = new MessageEmbed()
                                .setColor('#9900f8')
                                .setTitle(`${client.user.username} - Fun!`)
                                .setDescription("🖥️ You bought a computer!")
                            await db.consu.findOneAndUpdate({consumidor: message.user.id}, {$push: {produtos: prod}})
                            await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: account.coinsc - 150})
                            return message.reply({embeds: [embed]})
                        }
                    }
                } else if (prod === "To harvest") {
                    if (account.coinsc < 30) {
                        return message.reply('You don\'t have 30 Koins!')
                    }
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .setTitle(`${client.user.username} - Fun!`)
                        .setDescription("🥄 You bought a spoon")
                    if (!caixa) {
                        await db.consu.create({
                            consumidor: message.user.id,
                            produtos: prod
                        })
                        await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: account.coinsc - 30})
                        return message.reply({embeds: [embed]})
                    } else {
                        if(caixa.produtos.includes("To harvest")) {
                            return message.reply("You already have this product!")
                        } else {
                            const embed = new MessageEmbed()
                                .setColor('#9900f8')
                                .setTitle(`${client.user.username} - Fun!`)
                                .setDescription("🥄 You bought a spoon")
                            await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: account.coinsc - 30})
                            await db.consu.findOneAndUpdate({consumidor: message.user.id}, {$push: {produtos: prod}})
                            return message.reply({embeds: [embed]})
                        }
                    }
                } else if (prod === "toilet") {
                    if (account.coinsc < 200) {
                        return message.reply('You don\'t have 200 Koins!')
                    }
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .setTitle(`${client.user.username} - Fun!`)
                        .setDescription("🚽 You bought a toilet")
                    if (!caixa) {
                        await db.consu.create({
                            consumidor: message.user.id,
                            produtos: prod
                        })
                        await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: account.coinsc - 200})
                        return message.reply({embeds: [embed]})
                    } else {
                        if(caixa.produtos.includes("toilet")) {
                            return message.reply("You already have this product!")
                        } else {
                            const embed = new MessageEmbed()
                                .setColor('#9900f8')
                                .setTitle(`${client.user.username} - Fun!`)
                                .setDescription("🚽 You bought a toilet")
                            await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: account.coinsc - 200})
                            await db.consu.findOneAndUpdate({consumidor: message.user.id}, {$push: {produtos: prod}})
                            return message.reply({embeds: [embed]})
                        }
                    }
                } else if (prod === 'shoe') {
                    if (account.coinsc < 50) {
                        return message.reply('You don\'t have 50 Koins!')
                    }
                    const embed = new MessageEmbed()
                        .setColor('#9900f8')
                        .setTitle(`${client.user.username} - Fun`)
                        .setDescription("👟  You bought a shoe")
                    if (!caixa) {
                        await db.consu.create({
                            consumidor: message.user.id,
                            produtos: prod
                        })
                        await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: account.coinsc - 50})
                        return message.reply({embeds: [embed]})
                    } else {
                        if(caixa.produtos.includes("shoe")) {
                            return message.reply("You already have this product!")
                        } else {
                            const embed = new MessageEmbed()
                                .setColor('#9900f8')
                                .setTitle(`${client.user.username} - Fun!`)
                                .setDescription("👟 You bought a shoe")
                            await db.consu.findOneAndUpdate({consumidor: message.user.id}, {$push: {produtos: prod}})
                            await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: account.coinsc - 50})
                            return message.reply({embeds: [embed]})
                        }
                        }
                    }
            }
        }
    }
}