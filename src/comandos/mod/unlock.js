module.exports = {
    config: {
        nome: 'unlock',
        cooldown: 10
    },
    run: async (client, message, args) => {
        if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply(`${client.user.username} - Erro \nVocê não tem a permissão \`Gerenciar mensagens!\``)
if(!message.guild.me.permissions.has('MANAGE_ROLES')) return message.reply(`${client.user.username} - Erro \nEu não tenho permissao \`Gerenciar Cargos\``)
        let canal = message.channel
        let grupo = message.guild.id

        canal.permissionOverwrites.edit(grupo, {
            SEND_MESSAGES: true,
            ADD_REACTIONS: true
        }).catch(e => {
            message.reply(`Ocorreu um erro interno ao tentar executar esse comando ${e}`)
        })
        message.reply(`${client.user.username} - Sucesso \n Esse canal foi desbloqueado por ${message.user}`)
    }
}