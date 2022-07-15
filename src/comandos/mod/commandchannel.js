const db = require('../../../db')

module.exports = { 
    config: {
        nome: 'commandchannel',
        aliases: ['setcommandchannel'],
        options: [
            {
                name: 'channel',
                type: "CHANNEL",
                required: true,
                description: "Canal de comandos"
            }
        ]
    },
    run: async(client, message, args) => {
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`${client.user.username} - Erro \n Você tem que ter a permissão \`administrador\``)
        const canal = message.options.getChannel('channel')
        if(canal.type !== 'GUILD_TEXT') return message.reply(`${client.user.username} - Erro \n Esse canal não é um texto`)

        const ch = await db.can.findOne({groupid: message.guild.id})
        !ch ? await db.can.create({groupid: message.guild.id, channel: canal.id}):await db.can.findOneAndUpdate({groupid: message.guild.id}, {channel: canal.id})

        message.reply(`Agora as pessoas so pode executar comandos em ${canal}!`)
    }
}