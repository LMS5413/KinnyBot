const db = require("../../../db");
module.exports = {
    config: {
        nome: 'setcanaldebemvindo',
        cooldown: 10,
        options: [
            {
                name: 'lang',
                type: 'STRING',
                required: true,
                description: 'Você deseja ativar ou desativar o canal de bem vindo?'
            }
        ]
    },
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_GUILD')) return message.reply(`${client.user.username} - Erro \n Você não essa permissao \`Gerenciar Servidores\``)

        let gerenciador = await db.idgr.findOne({ group: message.guild.id })
        if (!gerenciador) {
            await db.idgr.create({ group: message.guild.id, enabled: false })
            return message.reply('Digite o comando denovo para poder terminar as configurações!')
        }
        if (message.options.getString('lang').toLowerCase() === 'desativar') {
            await db.idgr.findOneAndUpdate({ group: message.guild.id }, { enabled: false })
            return message.reply('Configurações de bem vindo, auto role e saida desablitadas com sucesso!')
        }
        await db.idgr.findOneAndUpdate({ group: message.guild.id }, { enabled: true })
        let chw = message.channel.createMessageCollector({ filter, time: 15000 })
        message.reply('Mencione o canal que receberá a mensagem de entrada! (Digite "Pular" caso não queira  a mensagem)')
        chw.on('collect', async role => {
            let canal = role.mentions.channels.first()
            if (role.content.toLowerCase() === 'pular') {
                message.reply('Não sera enviado mensagem de bem vindo!')
            } else {
                await db.idgr.findOneAndUpdate({ group: message.guild.id }, { channelwele: canal.id })
                message.reply('Canal de bem vindo setado')
            }
            let verificar = message.user.id
            let chl = message.channel.createMessageCollector({ filter: ({ author }) => author.id === verificar, time: 15000 })
            message.reply('Mencione o canal que receberá a mensagem de saida! (Digite "Pular" caso não queira  a mensagem)')
            chl.on('collect', async saida => {
                let canals = saida.mentions.channels.first()
                if (saida.content.toLowerCase() === 'pular') {
                    message.reply('Não sera setado o canal de saida!')
                } else {
                    await db.idgr.findOneAndUpdate({ group: message.guild.id }, { channelwell: canals.id })
                    message.reply('Canal de saida setado')
                }
                let autorole = message.channel.createMessageCollector({ filter: ({ author }) => author.id === verificar, time: 15000 })
                message.reply('Digite o ID da role que será dado ao entrar (Digite "Pular" caso não queira o auto role)')
                autorole.on('collect', async ro => {
                    if (ro.content.toLowerCase() === 'pular') {
                        message.reply('Não sera setado o auto role!')
                    } else {
                        if (!message.guild.roles.cache.get(ro.content)) return message.reply('Role invalida!')
                        await db.idgr.findOneAndUpdate({ group: message.guild.id }, { role: ro.content })
                        message.reply('Auto role setado')
                    }
                    let msg1 = message.channel.createMessageCollector({ filter: ({ author }) => author.id === verificar, time: 15000 })
                    if (role.content.toLowerCase() === 'pular') return msg1.stop()
                    message.reply('Escreva uma mensagem personalizada caso alguem entre! Placeholders: {user} {grupo} (Digite "Pular" caso não queira o auto role)')
                    msg1.on('collect', async msg => {
                        if (msg.content.toLowerCase() === 'pular' || !canal) {
                            message.reply('Não será setada para o welcome!')
                        } else {
                            await db.idgr.findOneAndUpdate({ group: message.guild.id }, { msg1: msg.content })
                            message.reply('Mensagem de welcome criado!')
                        }
                        let msg2 = message.channel.createMessageCollector({ filter: ({ author }) => author.id === verificar, time: 15000 })
                        if (saida.content.toLowerCase() === 'pular') return msg2.stop()
                        message.reply('Escreva uma mensagem personalizada caso alguem saia! Placeholders: {user} {grupo} (Digite "Pular" caso não queira o auto role)')
                        msg2.on('collect', async msgs => {
                            if (msgs.content.toLowerCase() === 'pular' || !canals) {
                                message.reply('Não será setada para o leave!')
                            } else {
                                await db.idgr.findOneAndUpdate({ group: message.guild.id }, { msg2: msg.content })
                                message.reply('Mensagem leave criado!')
                            }
                        })
                    })
                })
            })

        })
    }
}