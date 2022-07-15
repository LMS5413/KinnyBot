module.exports = {
    config: {
        nome: 'unmute',
        aliases: ['desmutar'],
        cooldown: 10,
        options: [
            {
            name: 'user',
            type: 'USER',
            description: 'User da pessoa',
            required: true,
        },
    ]
    },
    run: async(client, message, args) => {
        let member = message.guild.members.cache.get(message.options?.getUser('user').id)
        if (!message.member.permissions.has("MUTE_MEMBERS")) return message.reply(`${client.user.username} - Erro \n Você tem que ter a permissão \`Mutar membros!\``)
        if(!message.guild.me.permissions.has('MANAGE_ROLES')) return message.reply(`${client.user.username} - Erro \n<a:alerta:806274799638282311> Eu não tenho permissao \`Mutar membros!\``)

        let role = message.guild.roles.cache.filter(x => x.name == 'kinnymute').map(x => x)[0]

        if(!role) return message.reply(`${client.user.username} - Erro \nA role kinnymute não é valido!`)

        if(!member) return message.reply(`${client.user.username} - Erro \nEsse membro não e valido!`)

        await member.roles.remove(role)

        message.reply("Esse membro foi desmutado com sucesso!")
    }
}