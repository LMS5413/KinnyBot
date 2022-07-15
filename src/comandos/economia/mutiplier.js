const db = require('../../../db')
const { MessageEmbed } = require('discord.js')
const parseMilliseconds = require('parse-ms');
module.exports = {
    config: {
        nome: 'mutiplier',
        cooldown: 10
    },
    run: async(client, message) => {
        const timeout = 6.048e+8
        let premi = await db.premi.findOne({groupid: message.user.id})
        if (!premi) return message.reply(`${client.user.username} - Erro \n Esse comando é para pessoas que possui o Kinny Premium. Quer ter desbloqueado? Compre o kinny premium!`)
        let member = await db.coins.findOne({id: message.user.id})
        if(member.coinsc <= 0) return message.reply('Você não tem koins!')
        if (member.multidown + timeout > Date.now()) {
            let infh = parseMilliseconds(timeout - (Date.now() - member.multidown));
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Diversão`, `Você ja usou o mutiplier! Tente novamente daqui **${infh.days} dias ${infh.hours} horas ${infh.minutes} minutos ${infh.seconds} segundos!**`)
            message.reply({embeds: [embed]})
        } else {
            if (!member) return message.reply('Você não tem 1 conta!')
            const grana = Math.floor(Math.random() * 50);
            await db.coins.findOneAndUpdate({id: message.user.id}, {multidown: Date.now()})
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Diversão`, `Seus koins foi multiplicado por ${grana}!`)
            await db.coins.findOneAndUpdate({id: message.user.id}, {coinsc: member.coinsc * grana, multidown: Date.now()})
            message.reply({embeds: [embed]})
        }
    }
}