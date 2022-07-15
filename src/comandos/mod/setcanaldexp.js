const db = require("../../../db");
module.exports = {
    config: {
        nome: 'setcanaldexp',
        cooldown: 10,
        options: [
            {
                name: 'channel',
                type: 'CHANNEL',
                required: true,
                description: 'Canal onde ficará as mensagens de XP'
            }
        ]
    },
    run: async(client, message, args) => {
       if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`${client.user.username} - Erro \n Você não essa permissao \`Administrador\``)
            let achar = await db.idgr.findOne({group: message.guild.id})
            let id = message.options.getChannel('channel')
            if(id.type !== 'GUILD_TEXT') return message.reply(`${client.user.username} - Erro \n Esse canal não é um texto`)
            if(achar) {
                message.reply('Canal setado com sucesso!')
                await db.idgr.findOneAndUpdate({group: message.guild.id}, {xpc: id.id})
            } else {
                await db.idgr.create({group: message.guild.id, xpc: id.id})
                message.reply('Canal setado com sucesso!')
            }
    }
}