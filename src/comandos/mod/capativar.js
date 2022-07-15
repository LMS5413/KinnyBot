const db = require("../../../db");
module.exports = {
    config: {
        nome: 'cap',
        cooldown: 10,
        options: [
            {
                name: "ativar",
                type: "STRING",
                required: true,
                description: "Digite se deseja ativar ou desativar",
                choices: [
                    {
                        name: "ativar",
                        value: "ativar"
                    },
                    {
                        name: "desativar",
                        value: "desativar"
                    }
                ]
            }
        ]
    },
    run: async(client, message, args) => {
        let prem = await db.premi.findOne({groupid: message.user.id})
        if (!prem) return message.reply(`${client.user.username} - Erro \n Esse comando é para pessoas que possui o Kinny Premium. Quer ter desbloqueado? Compre o kinny premium!`)
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`${client.user.username} - Erro \n Você tem que ter a permissão \`administrador\``)
        let ativar = message.options.getString("ativar").toLowerCase()
        let proc = await db.cap.findOne({groupid: message.guild.id})
        if (!proc) {
            if (`${ativar}` === "desativar") {
                message.reply('Ja está desativado o captcha')
            } else if (`${ativar}` === "ativar") {
                await db.cap.create({
                    groupid: message.guild.id,
                    capactivy: "ativado"
                })
                var ip1 = message.channel.createMessageCollector({filter: m => m.author.id === message.user.id, time: 15000})
                message.reply('Digite o id da role que será dado ao cumprir o captcha')
                ip1.on('collect', async ip => {
                    let cap = ip.content
await db.cap.findOneAndUpdate({groupid: message.guild.id}, {role: cap})
                    message.reply('Você ativou o captcha!')
                })
            }
        } else {
            if (`${ativar}` === "ativar") {
                await db.cap.findOneAndUpdate({groupid: message.guild.id}, {capactivy: "ativado"})
            } else if (`${ativar}` === "desativar") {
                await db.cap.findOneAndDelete({
                    groupid: message.guild.id
                })
            }
        }
    }
}