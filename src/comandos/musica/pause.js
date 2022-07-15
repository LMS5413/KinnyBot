const { CommandInteraction } = require('discord.js');
module.exports = {
    config: {
        nome: 'pause',
        cooldown: 10
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
        message.reply(`Música ${player.paused ? 'reativada' : 'pausada'}!`)
        player.pause(!player.paused)
    }
}