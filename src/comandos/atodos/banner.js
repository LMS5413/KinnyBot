const { MessageEmbed, MessageAttachment, MessageActionRow, MessageButton } = require('discord.js');
const { createCanvas } = require('canvas');

module.exports = {
    config: {
        nome: 'banner',
        cooldown: 10,
        options: [
            {
                name: 'usuário',
                type: 'USER',
                description: 'Utilize para obter o banner de outro usuário.',
            },
        ],
    },
    run: async (client, interaction) => {
        const user = interaction.options.getUser('usuário') || interaction.user;
        const banner = await client.api.users(user.id).get();

        if (!banner.banner && !banner.banner_color)
            return interaction.reply('Oops, infelizmente essa pessoa não tem um banner!');

        if (!banner.banner && banner.banner_color) {
            const canvas = createCanvas(1365, 450);
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = `#${(banner.accent_color >>> 0).toString(16).padStart(6, '0').toUpperCase()}`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const attachment = new MessageAttachment(canvas.toBuffer(), 'banner.png');

            const bannerEmbed = new MessageEmbed()
                .setTitle(`${client.user.username} - Banner`)
                .setColor((banner.accent_color >>> 0).toString(16))
                .setDescription(`Banner de ${user}.`)
                .setImage('attachment://banner.png');

            return interaction.reply({ embeds: [bannerEmbed], files: [attachment] });
        } else {
            const bannerLink = `https://cdn.discordapp.com/banners/${user.id}/${banner.banner}.${banner.banner.startsWith('a_') ? 'gif' : 'png'}?size=4096`;

            const bannerEmbed = new MessageEmbed()
                .setTitle(`${client.user.username} - Banner`)
                .setColor('#9900f8')
                .setDescription(`Banner de ${user}.`)
                .setImage(bannerLink);
            const rowButton = new MessageActionRow().addComponents(
                new MessageButton().setLabel('Link do Banner').setStyle('LINK').setURL(bannerLink)
            );
            interaction.reply({ embeds: [bannerEmbed], components: [rowButton] });
        }
    },
};
