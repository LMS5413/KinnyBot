const { CommandInteraction } = require('discord.js');
module.exports = {
    config: {
        nome: 'shuffle',
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
        if(!player.queue.length || player.queue.length === 1) return message.reply('Não há músicas na fila!')
        player.shuffleQueue()
        message.reply('Lista de músicas embaralhadas com sucesso!')
    }
}