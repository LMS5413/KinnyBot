const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        nome: '8ball',
        options: [
            {
                name: '8ball',
                type: 'STRING',
                description: 'Digite sua pergunta e a previsão vai te responder!',
                required: true,
            },
        ],
    },
    run: async (client, interaction) => {
        let pergunta = interaction.options.getString('8ball');
        let frases = ['Provavelmente', 'Talvez', 'Sim', 'Não', 'Não sei de nada', 'Tenho certeza'];
        const resposta = frases[Math.floor(Math.random() * frases.length)];

        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .addField(`${client.user.username} - 8Ball`, `**Pergunta:** ${pergunta}\n\n**Resposta:** ${resposta}`);
        interaction.reply({ embeds: [embed] });
    },
};
