const { CommandInteraction, MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        nome: 'volume',
        cooldown: 10,
        options: [
            {
                name: 'volume',
                description: 'Volume da música',
                type: 'INTEGER',
                required: true
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
        const volume = message.options.getInteger('volume')
        if(volume > 100 || volume < 1) return message.reply('O volume deve estar entre 1 e 100!')
        player.filters.setVolume(volume)
        const embed = new MessageEmbed()
        .setTitle(`${client.user.username} - Música`)
        .setColor('#9900f8')
        .setDescription(`O volume foi alterado para **${volume}%**`)
        message.reply({embeds: [embed]})
    }
}