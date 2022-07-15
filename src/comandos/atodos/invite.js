const { MessageEmbed } = require('discord.js')


module.exports = {
    config: {
        nome: 'invite',
        cooldown: 10,
    },
    run: async(client, message) => {
        const embed = new MessageEmbed()
        .setTitle(`${client.user.username} | Invite`)
        .setColor('#9900f8')
        .setDescription('**Olá! Se você executou esse comando então você deve ter se interessado em adicionar a kinny em seu servidor! Então irei dar 2 links de convites!** \n \n<a:coracao:801199947722391622> **Link 1:** [Com a permissão de adminstrador (Recomendado)](https://discord.com/oauth2/authorize?client_id=750384014388494376&scope=bot&permissions=8) \n \n<a:coracao:801199947722391622> **Link 2:** [Com as permissoes: Enviar mensagens, Enivar mensagens em TTS, Gerenciar mensagens, enviar links, usar o Slash commands, Conectar, falar, mutar membros, Mover membros, prioridade de voz, ver canais, gerenciar emojis, alterar nickname, banir membros, expulsar membros, gerenciar cargos, ver o registro de auditoria](https://discord.com/oauth2/authorize?client_id=750384014388494376&scope=bot&permissions=4294442486) \n \n<a:coracao:801199947722391622> **Link 3** [Mesmas permissão do link 2 + criar comandos (Criar slash commands)](https://discord.com/oauth2/authorize?client_id=750384014388494376&scope=bot+applications.commands&permissions=4294442486)')
        .setFooter({text: `Bot criado por: ${client.users.cache.get('395995293436477442').username}`, iconURL: client.users.cache.get(require('../../../config.json').creatorid).displayAvatarURL({dynamic: true})})
        message.reply({embeds: [embed]})
    }
}