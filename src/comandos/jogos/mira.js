const { MessageEmbed } = require('discord.js')
const miras = require('../../../valorantMira.json')
module.exports = {
    config: {
        nome: 'mira',
        descricao: 'Lista de miras para adicionar no valorant.'
    },
    run: async (client, interaction) => {
        const embed = new MessageEmbed()
            .setTitle(`${client.user.username} - Valorant mira`)
            .setColor('#9900f8')
            .setDescription(`Atualmente estou armazenado com ${miras.length} miras. \n \nCaso queira alguma mira, selecione o time \n \n${miras.filter((x, i) => miras.findIndex(y => y.time === x.time) === i).map((x, i) => `${i + 1} - ${x.time}`).join("\n")}`)

        interaction.reply({ embeds: [embed] })
        let collector = interaction.channel.createMessageCollector({ filter: m => m.author.id === interaction.user.id, max: 1, time: 3 * 60 * 1000 })
        collector.on('collect', async m => {
            let index1 = miras.filter(x => x.time === (miras.filter((x, i) => miras.findIndex(y => y.time === x.time) === i)[parseInt(m.content) - 1])?.time)
            const embed = new MessageEmbed()
                .setTitle(`${client.user.username} - Valorant mira`)
                .setColor('#9900f8')
            if (!index1 || index1?.length === 0) {
                embed.setDescription(`Não foi possível encontrar a mira.`)
                return interaction.channel.send({ embeds: [embed] })
            }
            embed.setDescription(`Ok! Agora que temos o time selecionado. Agora veja os nome dos jogadores que deseja var as miras que eles utilizam \n \n${index1.map((x, i) => `${i + 1} - ${x.player}`).join("\n")}`)
            interaction.channel.send({ embeds: [embed] })
            let collector = interaction.channel.createMessageCollector({ filter: m => m.author.id === interaction.user.id, max: 1, time: 3 * 60 * 1000 })
            collector.on('collect', async m => {
                let index2 = index1.find(x => x.player === (index1[parseInt(m.content) - 1])?.player)
                if (!index2 || index2?.length === 0) {
                    embed.setDescription(`Não foi possível encontrar a mira.`)
                    return interaction.channel.send({ embeds: [embed] })
                }
                embed.setDescription(`**Jogador:** ${index2.player} \n **Time:** ${index2.time} \n **Mira:** ${index2.code}`)
                embed.setThumbnail(index2.image)
                embed.setFooter({text: `Fonte: ${index2.font} (OBS: A comunidade pode adicionar suas próprias miras.)`})
                interaction.channel.send({ embeds: [embed] })
            })
        })
    }
}