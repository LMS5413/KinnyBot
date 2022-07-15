const {  CommandInteraction } = require('discord.js');
module.exports = {
    config: {
        nome: 'loop',
        cooldown: 10,
        options: [
            {
                name: 'type',
                description: 'Tipo de loop',
                type: 'STRING',
                required: true,
                choices: [
                    {
                        name: 'track',
                        value: 'track'
                    },
                    {
                        name: 'playlist',
                        value: 'queue'
                    }
                ]
            }
        ]
    },
    /**
        * @param {CommandInteraction} message
        * @returns 
    */
    run: async (client, message) => {
        let voice = message.member.voice.channel
        if (!voice) return message.reply('Você não está em um canal de voz!')
        let player = client.manager.players.get(message.guild.id)
        if(!player) return message.reply('Não estou tocando nenhuma música!')
        if(player.current.requester !== message.user.id) return message.reply('Você não é o dono da música!')
        if(message.options.getString('type').toLowerCase() !== 'track' && message.options.getString('type').toLowerCase() !== 'queue') return message.reply('Tipo de loop inválido!')
        message.reply(`Loop para ${message.options.getString('type')} ${!player[`${message.options.getString('type').toLowerCase()}Repeat`] ? 'ativado' : 'desativado'}!`)
        player[`set${message.options.getString('type')[0].toUpperCase()+message.options.getString('type').slice(1).toLowerCase()}Loop`](!player[`${message.options.getString('type').toLowerCase()}Repeat`])
    }
}