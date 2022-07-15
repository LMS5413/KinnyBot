const { MessageEmbed } = require('discord.js');

module.exports = (client, player, track) => {
    let channel = client.channels.cache.get(player.textChannelId);
    if (!channel || player.queue.length > 0 || player.trackRepeat || player.queueRepeat) return;

    const embed = new MessageEmbed()
        .setTitle(`${client.user.username} - Música`)
        .setColor('#9900f8')
        .setDescription(`A música **${track?.title}** acabou!`);

    if (!track) return player.destroy();
    channel.send({ embeds: [embed] }).then(() => {
        player.destroy();
    });
};
