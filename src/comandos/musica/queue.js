const { CommandInteraction, MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        nome: 'queue',
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
        const queueI = player.queue
        const embed = new MessageEmbed()
        .setTitle(`${client.user.username} - Música`)
        .setColor('#9900f8')
        .setDescription(`\n \n**Tocando agora:** ${player.current.title}\n**Adicionado por:** ${message.guild.members.cache.get(player.current.requester).user.username}\n**Quantidade de músicas a ser tocadas:** ${queueI.peek().length} \n \n\`${queueI.peek().map((song, index) => `${index + 1}. ${song.title}`).join('\n').length === 0 ? "Sem musicas para ser tocadas":queueI.peek().map((song, index) => `${index + 1}. ${song.title}`).slice(0, 10).join('\n')}\``)
        message.reply({embeds: [embed]})
    }
}