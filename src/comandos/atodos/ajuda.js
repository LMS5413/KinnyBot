const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const db = require('../../../db');
const buttons = [
    { id: 'mod', emoji: '801198221454999582' },
    { id: 'economia', emoji: '801206555495891008' },
    { id: 'atodos', emoji: '801206555755675728' },
    { id: 'jogos', emoji: '801544422462324758' },
    { id: 'musica', emoji: '🎵' },
    { id: 'reputacao', emoji: '817746775981031454' },
    { id: 'jornalismo', emoji: '👨‍💻' },
    { id: 'close', emoji: '❌' },
];

module.exports = {
    config: {
        nome: 'ajuda',
        cooldown: 10,
    },
    run: async (client, interaction) => {
        const lan = await db.lgs.findOne({ guildID: interaction.user.id });

        function separe(buttons, maximo = 5) {
            const itens = buttons.map(button =>
                new MessageButton()
                    .setCustomId(button.id)
                    .setEmoji(button.emoji)
                    .setStyle(button.color || 'SECONDARY'),
            );
            return itens
                .reduce((acumulador, item, indice) => {
                    const grupo = Math.floor(indice / maximo);
                    acumulador[grupo] = [...(acumulador[grupo] || []), item];
                    return acumulador;
                }, [])
                .map(r => new MessageActionRow().addComponents(r));
        }

        const embedMain = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Comandos`)
            .setDescription(`> Reaja nos botões para cada comando (Possuo ${client.commands.size} comandos!)\n \n<:banido:801198221454999582> ${lan && lan.lang === 'en' ? "Moderation" : "Moderação"} \n<:compra:801206555495891008> ${lan && lan.lang === 'en' ? "Economy" : "Economia"} \n<:terra:801206555755675728> Geral\n<:morto:801544422462324758> ${lan && lan.lang === 'en' ? "Games" : "Jogos"} \n🎵 ${lan && lan.lang === 'en' ? "Music" : "Musica"}\n<:reputation:817746775981031454> ${lan && lan.lang === 'en' ? "Reputation" : "Reputação"}\n👨‍💻 ${lan && lan.lang === 'en' ? "Journalism" : "Jornalismo"}`)
        const message = await interaction.reply({
            components: separe(buttons),
            embeds: [embedMain],
            fetchReply: true,
        });

        const filter = button => button.user.id === interaction.user.id;
        const collector = message.createMessageComponentCollector({ filter });

        collector.on('collect', async selectedButton => {
            await selectedButton.deferUpdate();

            const newButtons = buttons.map(btn => {
                return {
                    id: btn.id,
                    emoji: btn.emoji,
                    color: btn.id === selectedButton.customId ? 'PRIMARY' : 'SECONDARY',
                };
            });

            if (selectedButton.customId === 'close') {
                return message.edit({
                    components: separe(buttons),
                    embeds: [embedMain],
                });
            }

            const commands = client.commands
                .filter(cmd => cmd.config.categoria === selectedButton.customId)
                .map(x => x.config.nome);

            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Comandos (${commands.length})`)
                .setDescription(`\`${commands.join(' | ')}\``);
            message.edit({
                components: separe(newButtons),
                embeds: [embed],
            });
        });
    },
};
