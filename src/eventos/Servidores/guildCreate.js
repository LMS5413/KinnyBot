const { MessageEmbed } = require('discord.js');

module.exports = async (client, guild) => {
    let channelLog = client.channels.cache.get('803038083293511720');
    const embed = new MessageEmbed()
        .setColor('#9900f8')
        .setTitle(`${client.user.username} - Novo servidor!`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addField(
            'Fui adicionado em um novo servidor!',
            `Grupo: ${guild.name}\nID do Grupo: ${guild.id}\nMembros: ${guild.memberCount}\nDono: ${guild.members.cache.get(guild.ownerId).user.username}`,
        );
    channelLog.send({ embeds: [embed] });
};
