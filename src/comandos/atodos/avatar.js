const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    config: {
        nome: 'avatar',
        cooldown: 10,
        options: [
            {
                name: 'usuário',
                type: 'USER',
                description: 'Utilize para obter o avatar de outro usuário.',
            },
        ],
    },
    run: async (client, interaction) => {
        const user = interaction.options.getUser('usuário') || interaction.user;
        const userAvatar = user.displayAvatarURL({ dynamic: true, size: 4096 });

        const AvatarEmbed = new MessageEmbed()
            .setTitle(`${client.user.username} - Diversão`)
            .setColor('#9900f8')
            .setDescription(`<:imagem:800011671229431848> Avatar de ${user}.`)
            .setImage(userAvatar);

        const rowButton = new MessageActionRow().addComponents(
            new MessageButton().setLabel('Link do Avatar').setStyle('LINK').setURL(userAvatar),
        );
        interaction.reply({ embeds: [AvatarEmbed], components: [rowButton] });
    },
};
