const { CommandInteraction } = require('discord.js');
module.exports = {
    config: {
        nome: 'skip',
        cooldown: 10,
        options: [
            {
                name: 'number',
                description: 'Quantidade de músicas a pular',
                type: 'INTEGER',
                required: false,
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
        if(!player.queue.length || player.queue.length === 0) return message.reply('Não há músicas na fila!')
        if(message.options.getInteger('number') && message.options.getInteger('number') > player.queue.length) return message.reply('Não há músicas na fila!')
        if(player.trackRepeat || player.queueRepeat) return message.reply('Você não pode pular músicas enquanto estiver em loop!')
        if(message.options.getInteger('number') && message.options.getInteger('number') > player.queue.length) returnmessage.reply('Você não pode quantidade de música mais alto que da sua lista de música')
        player.skip(message.options.getInteger('number') ?? 1)
        message.reply('Música pulada!')
    }
}