const { inspect } = require('util')
const config = require('../../../config.json')
const db = require('../../../db')
const { MessageButton , MessageActionRow } = require('discord.js')
module.exports = {
    config: {
        nome: 'eval'
    },
    run: async (client, message, args) => {
        if (!['395995293436477442', require('../../../config.json').creatorid].includes(message.author.id)) {
            return message.reply('Que lindo né? Tentando usar meu eval, só meu dono pode usar!')
        }
            const input = args.join(" ");
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('fechar')
                    .setLabel('Fechar eval')
                    .setStyle('DANGER')
                )
            if(!input) return message.reply({content: `${client.user.username} - Erro \n Adicione algo!`})
            try {
                let output = await eval(input)
                let msg = await message.reply({content: `Sáida: \`\`\`js\n${inspect(output, {depth: 0}).replaceAll(client.token, '***')}\`\`\` \nTipo: \`\`\`js\n${typeof(output)}\`\`\``, components: [row]})
                let collector = msg.createMessageComponentCollector({ componentType: 'BUTTON', max: 1});
                collector.on('collect', (interaction) => {
                    if(interaction.user.id !== message.author.id) return;
                    if(interaction.customId === 'fechar') {
                        msg.delete()
                        message.channel.send('Eval fechado!')
                    }
                })
            } catch(e) {
              if(e.message === 'Unexpected token u in JSON at position 0') {
                let msg = await message.reply(`Resultado: \`\`\`js\n${inspect(undefined, {depth: 0})}\`\`\` \nTipo: \`\`\`js\n${undefined}\`\`\``)
                let collector = msg.createMessageComponentCollector({ componentType: 'BUTTON', max: 1});
                collector.on('collect', (interaction) => {
                    if(interaction.user.id !== message.author.id) return;
                    if(interaction.customId === 'fechar') {
                        msg.delete()
                        message.channel.send('Eval fechado!')
                    }
                })
                return;
              }
              return message.reply("Erro: "+e)
            }

        }
    }