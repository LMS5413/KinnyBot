module.exports = {
    config: {
        nome: 'lock',
        cooldown: 10
    },
    run: async (client, message, args) => {
        if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply(`${client.user.username} - Erro \nVocê não tem a permissão \`Gerenciar mensagens!\``)
                if(!message.guild.me.permissions.has('MANAGE_MESSAGES')) return message.reply(`${client.user.username} - Erro \nEu não tenho a permissão \`Gerenciar mensagens!\``)
if(!message.guild.me.permissions.has('MANAGE_ROLES')) return message.reply(`${client.user.username} - Erro \n<a:alerta:806274799638282311> Eu não tenho permissao \`Gerenciar Cargos\``)
    let canal = message.channel
    let grupo = message.guild.id

        canal.permissionOverwrites.edit(grupo, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
        }).catch(e => {
            message.reply(`Ocorreu um erro interno ao tentar executar esse comando ${e}`)
        })
        message.reply(`${client.user.username} - Sucesso \n Esse canal foi bloqueado por ${message.user}`)
    }
}