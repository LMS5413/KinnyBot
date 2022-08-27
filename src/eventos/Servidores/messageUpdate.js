const db = require('../../../db.js');
const { MessageEmbed } = require('discord.js');

module.exports = async (client, newMessage, oldMessage) => {
    const guild = await db.idgr.findOne({ group: oldMessage.guild?.id || newMessage.guild.id });
    if (!guild || (!newMessage.content && !oldMessage.content) || (newMessage.content?.length ?? 0) === 0) return;

    if (guild.logs.includes('edit')) {
        if (oldMessage.channel.type === 'DM' || oldMessage.author.bot || oldMessage.embeds[0]) return;
        let canal = client.channels.cache.get(guild.channellogs);
        if (!canal) return db.idgr.findOneAndRemove({ group: oldMessage.guild?.id || newMessage.guild.id });

        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Logs`)
            .setDescription(`**Uma mensagem foi editada!**\nUsuario: ${oldMessage.author.username}\n\nMensagem antiga: ${newMessage.content}\n\nMensagem nova: ${oldMessage.content}`);
        canal.send({ embeds: [embed] });
    }
};
