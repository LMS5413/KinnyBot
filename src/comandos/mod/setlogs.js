const db = require('../../../db')

module.exports = {
    config: {
        nome: 'setlogs',
        cooldown: 10,
        options: [
            {
                name: 'channel',
                type: 'CHANNEL',
                required: true,
                description: 'Canal onde ficará as logs'
            }
        ]
    },
    run: async(client, message) => {
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`${client.user.username} - Erro \n Você não essa permissao \`Administrador\``)
        if(!message.guild.me.permissions.has('MANAGE_EMOJIS_AND_STICKERS')) return message.reply(`${client.user.username} - Erro \n<a:alerta:806274799638282311> Eu não tenho permissao \`Gerenciar emojis\``)
        if(!message.guild.me.permissions.has('MANAGE_MESSAGES')) return message.reply(`${client.user.username} - Erro \n<a:alerta:806274799638282311> Eu não tenho permissao \`Gerenciar Mensagens\``)
        const canal = message.options.getChannel('channel')
        if(canal.type !== "GUILD_TEXT") return message.reply(`${client.user.username} - Erro \n Esse canal não é um texto`)
        if(!message.guild.channels.cache.get(canal.id)) return message.reply('Esse canal nao existe!')
        let addchannel = await db.idgr.findOne({group: message.guild.id})
        if(addchannel) {
            if(addchannel.logs.length <= 0) {
            message.reply({content: 'Canal criado com sucesso! Agora escolha o que vai querer nas logs \n1️⃣ Mensagens deletadas \n2️⃣ Mensagens editadas\n3️⃣ Verificar quem saiu da call ou entrou', fetchReply: true}).then(async reagir => {
                reagir.react('1️⃣')
                reagir.react('2️⃣')
                reagir.react('3️⃣')
                reagir.react('✅')
                reagir.react('❌')
                await db.idgr.findOneAndUpdate({group: message.guild.id}, {channellogs: canal.id})
                const filter = (reaction, user) => {
                    return reaction.emoji.name === '1️⃣' && user.id === message.user.id
                };

                const collector = reagir.createReactionCollector({filter,  time: 18000 });

                collector.on('collect', async(reaction, user) => {
                    await db.idgr.findOneAndUpdate({group: message.guild.id}, {$push: {logs: 'deletes'}})
                    await reagir.reactions.cache.get('1️⃣').remove()
                    })
                const filter2 = (reaction, user) => {
                    return reaction.emoji.name === '2️⃣' && user.id === message.user.id
                };

                const collector2 = reagir.createReactionCollector({filter: filter2,  time: 18000 });

                collector2.on('collect', async(reaction, user) => {
                    await db.idgr.updateOne({group: message.guild.id}, {$push: {logs: 'edit'}})
                    await reagir.reactions.cache.get('2️⃣').remove()
                })
                const filter3 = (reaction, user) => {
                    return reaction.emoji.name === '3️⃣' && user.id === message.user.id
                };

                const collector3 = reagir.createReactionCollector({filter: filter3,  time: 18000 });

                collector3.on('collect', async(reaction, user) => {
                    await db.idgr.updateOne({group: message.guild.id}, {$push: {logs: 'voice'}})
                    await reagir.reactions.cache.get('3️⃣').remove()
                })
                const filter4 = (reaction, user) => {
                    return reaction.emoji.name === '✅' && user.id === message.user.id
                };

                const collector4 = reagir.createReactionCollector({filter: filter4,  time: 18000 });

                collector4.on('collect', async(reaction, user) => {
                   await reagir.delete()
                    message.followUp('Logs setada com sucesso!')
                })
                const filter5 = (reaction, user) => {
                    return reaction.emoji.name === '❌' && user.id === message.user.id
                };

                const collector5 = reagir.createReactionCollector({filter: filter5,  time: 18000 });

                collector5.on('collect', async(reaction, user) => {
                    await db.idgr.findOneAndUpdate({group: message.guild.id}, {$pull: {logs: null}})
                    await reagir.delete()
                    message.followUp('Sessão de logs encerrada')
                })
            })
        } else {
            await db.idgr.findOneAndRemove({group: message.guild.id})
            message.reply('Deletamos suas config atual para fazer uma nova!')
        }
        } else {
            await db.idgr.create({group: message.guild.id, logs: [], channellogs: canal.id})
            message.reply({content: 'Canal criado com sucesso! Agora escolha o que vai querer nas logs \n1️⃣ Mensagens deletadas \n2️⃣ Mensagens editadas\n3️⃣ Verificar quem saiu da call ou entrou', fetchReply: true}).then(async reagir => {
                reagir.react('1️⃣')
                reagir.react('2️⃣')
                reagir.react('3️⃣')
                reagir.react('✅')
                reagir.react('❌')
                await db.idgr.findOneAndUpdate({groupl: message.guild.id}, {channellogs: canal.id})
                const filter = (reaction, user) => {
                    return reaction.emoji.name === '1️⃣' && user.id === message.user.id
                };

                const collector = reagir.createReactionCollector({filter: filter,  time: 18000 });

                collector.on('collect', async(reaction, user) => {
                    await db.idgr.findOneAndUpdate({group: message.guild.id}, {$push: {logs: 'deletes'}})
                    await reagir.reactions.cache.get('1️⃣').remove()
                    })
                const filter2 = (reaction, user) => {
                    return reaction.emoji.name === '2️⃣' && user.id === message.user.id
                };

                const collector2 = reagir.createReactionCollector({filter: filter2,  time: 18000 });

                collector2.on('collect', async(reaction, user) => {
                    await db.idgr.updateOne({group: message.guild.id}, {$push: {logs: 'edit'}})
                    await reagir.reactions.cache.get('2️⃣').remove()
                })
                const filter3 = (reaction, user) => {
                    return reaction.emoji.name === '3️⃣' && user.id === message.user.id
                };

                const collector3 = reagir.createReactionCollector({filter: filter3,  time: 18000 });

                collector3.on('collect', async(reaction, user) => {
                    await db.idgr.updateOne({group: message.guild.id}, {$push: {logs: 'voice'}})
                    await reagir.reactions.cache.get('3️⃣').remove()
                })
                const filter4 = (reaction, user) => {
                    return reaction.emoji.name === '✅' && user.id === message.user.id
                };

                const collector4 = reagir.createReactionCollector({filter: filter4,  time: 18000 });

                collector4.on('collect', async(reaction, user) => {
                   await reagir.delete()
                    message.followUp('Logs setada com sucesso!')
                })
                const filter5 = (reaction, user) => {
                    return reaction.emoji.name === '❌' && user.id === message.user.id
                };

                const collector5 = reagir.createReactionCollector({filter: filter5,  time: 18000 });

                collector5.on('collect', async(reaction, user) => {
                    await db.idgr.findOneAndRemove({grou: message.guild.id})
                    await reagir.delete()
                    message.followUp('Sessão de logs encerrada')
                })
            })
        }
    }
}