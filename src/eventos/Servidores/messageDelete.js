const db = require('../../../db.js');
const { MessageEmbed } = require('discord.js');

module.exports = async (client, message) => {
    let give = await db.give.findOne({ messageID: message.id });
    let guild = await db.idgr.findOne({ group: message.guild.id });
    let canal = client.channels.cache.get(guild?.channellogs);
    if (give) {
        await db.give.findOneAndRemove({ messageID: message.id });
        if (!guild || !guild.logs.includes('deletes') || give.end) return;
        let logs = await message.guild.fetchAuditLogs().catch(err => {})
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Logs`)
            .setDescription(`**Um sorteio foi deletado forçadamente!**\nUsuario que deletou: ${!logs ? "Sem permissão para ver o registro de auditoria":logs.entries.first().executor.username}`);
        return canal.send({ embeds: [embed] });
    }
    if(!message.author || !message.author.bot) return;
    if (!guild || !guild.logs.includes('deletes')) return;
    const embed = new MessageEmbed()
        .setColor('#9900f8')
        .setTitle(`${client.user.username} - Logs`)
        .setDescription(`**Uma mensagem foi deletada!**\nUsuario: ${message.author.username}\n\nMensagem deletada: ${message.content}`);
    canal.send({ embeds: [embed] });
};
