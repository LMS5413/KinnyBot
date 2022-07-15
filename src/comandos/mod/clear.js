module.exports = {
    config: {
        nome: 'clear',
        aliases: ['limpar'],
        cooldown: 10,
        options: [
            {
                name: 'amount',
                type: 'INTEGER',
                required: true,
                description: 'Quantidade de mensagens que deseja limpar'
            }
        ]
    },
    run: async(client, message, args) => {
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`${client.user.username} - Erro \n Você tem que ter a permissão \`Adminstrador!\``)
        if(!message.guild.me.permissions.has('MANAGE_MESSAGES')) return message.reply(`${client.user.username} - Erro \n<a:alerta:806274799638282311> Eu não tenho permissao \`Gerenciar mensagens\``)
        let clear =  message.options.getInteger('amount')
        if(clear < 2) return message.reply('você deve informar um número no mínimo 2')

        const channelMessages = await message.channel.messages.fetch({ limit: clear }),
            oldMessages = channelMessages.filter(m => Date.now() - m.createdTimestamp >= (14 * 24 * 60 * 60 * 1000)).size,
            messagesToClear = clear - oldMessages;
        message.reply({content: `${client.user.username} - Pergunta \n Você quer que eu tente limpar ${clear} mensagens?`, fetchReply: true}).then(reag => {
            reag.react('✅')
            reag.react('❌')

            const filter = (reaction, user) => {
                return reaction.emoji.name === '✅' && user.id === message.user.id
            };

            const collector = reag.createReactionCollector({filter: filter, time: 15000});

            collector.on('collect', (reaction, user) => {
                message.channel.send(`Limpei ${messagesToClear} mensagens com sucesso!`)
                if(messagesToClear > 100) {
                    deleteMessages(message, messagesToClear)
                } else {
                    message.channel.bulkDelete(messagesToClear)
                }
            })
            const filter2 = (reaction, user) => {
                return reaction.emoji.name === '❌' && user.id === message.user.id
            };

            const collector2 = reag.createReactionCollector({filter: filter2, time: 15000});

            collector2.on('collect', (reaction, user) => {
                reag.delete()
                message.channel.send(`${client.user.username} - Sucesso \n Você rejeitou a limpa!`)
            });

        })
    }
}
function deleteMessages(message, totalAmount) {
    const interval = setInterval(async () => {
      if (totalAmount <= 1) {
        message.reply('Canal limpo!')
        return clearInterval(interval)
      }
      message.channel.bulkDelete(totalAmount > 100 ? 100 : totalAmount, true)
      totalAmount -= 100
    }, 5000)
  }