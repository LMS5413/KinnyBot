const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        nome: 'bomdia',
        descricao: 'Gera uma imagem de bom dia ou boa noite aleatória.',
    },
    run: async (client, interaction) => {
        var time = 'dia';
        if (new Date().getHours() > 12 && new Date().getHours() <= 17) time = 'tarde';
        if (new Date().getHours() > 17) time = 'noite';

        let response = (await axios.get('https://bom-dia-api.glitch.me/?t=' + time)).data;
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Bom dia`)
            .setDescription('Mande essa imagem para o grupo do Zap Zap!')
            .setImage(response.url);
        interaction.reply({ embeds: [embed] });
    },
};
