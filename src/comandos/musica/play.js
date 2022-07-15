const { MessageEmbed, CommandInteraction, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    config: {
        nome: 'play',
        aliases: ['tocar'],
        cooldown: 10,
        options: [
            {
                name: 'name',
                description: 'Nome da música',
                type: 'STRING',
                required: true,
                autocomplete: true
            }
        ]
    },
    /**
        * @param {CommandInteraction} message
        * @returns 
    */
    run: async (client, message) => {
        let voice = message.member.voice.channel
        if (!voice) return message.reply('Você não está em um canal de voz!')
        let player = client.manager.players.get(message.guild.id)
        if (player) {
            let search = await client.manager.search(message.options.getString('name'))
            if (search.loadType === 'NO_MATCHES' || search.loadType === 'LOAD_FAILED') return message.reply('Nenhuma música encontrada!')
            if (search.loadType === "PLAYLIST_LOADED") {
                search.tracks.forEach(track => {
                    player.queue.push(track)
                    track.setRequester(message.user.id)
                })
                const embed = new MessageEmbed()
                    .setTitle(`${client.user.username} - Música`)
                    .setColor('#9900f8')
                    .setDescription(`Adicionei uma playlist na fila! \n \n**Quantidade de músicas**: ${search.tracks.length} \n**Nome:** ${search.tracks[0].title}\n**Autor: **${search.tracks[0].author}\n**Node conectado:** ${player.node.identifier}`)
                    .setThumbnail(search.tracks[0].thumbnail)
                if (!player.playing) player.play()
                return message.reply({ embeds: [embed] })
            }
            search.tracks[0].setRequester(message.user.id)
            player.queue.push(search.tracks[0])
            const embed = new MessageEmbed()
                .setTitle(`${client.user.username} - Música`)
                .setColor('#9900f8')
                .setDescription(`Música adicionada na fila! \n \n**Nome:** ${search.tracks[0].title}\n**Autor: **${search.tracks[0].author}\n**Node conectado:** ${player.node.identifier}`)
                .setThumbnail(search.tracks[0].thumbnail)
            return message.reply({ embeds: [embed] })
        }
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Música`)
            .setDescription(`Olá! Algumas pessoas preferem tocar a música por servidor (Lavalink) outras preferem o youtube Together. \n \nEntão queremos que você selecione qual das alteranivas você deseja tocar.`)
        const row = new MessageActionRow()
            .addComponents(new MessageButton()
                .setLabel('Lavalink')
                .setStyle('PRIMARY')
                .setCustomId('lava')
                .setEmoji('829751857483350058')
            )
            .addComponents(new MessageButton()
                .setLabel('Youtube Together')
                .setStyle('PRIMARY')
                .setCustomId('ytt')
                .setEmoji('942768763487522888')
            )
        const msg = await message.reply({ embeds: [embed], components: [row], fetchReply: true })
        const collector = msg.createMessageComponentCollector({ filter: m => m.user.id === message.user.id, time: 15000, max: 1, componentType: "BUTTON" })
        collector.on('collect', async m => {
            if (m.customId === "lava") {
                m.deferUpdate()
                player = client.manager.createPlayer({
                    guildId: message.guild.id,
                    voiceChannelId: voice.id,
                    textChannelId: message.channel.id,
                    selfDeaf: true
                })
                player.connect()
                let search = await client.manager.search(message.options.getString('name'))
                if (search.loadType === 'NO_MATCHES' || search.loadType === 'LOAD_FAILED') {
                    player.destroy()
                    return m.channel.send('Nenhuma música encontrada!')
                }
                if (search.loadType === "PLAYLIST_LOADED") {
                    search.tracks.forEach(track => {
                        player.queue.push(track)
                        track.setRequester(message.user.id)
                    })
                    const embed = new MessageEmbed()
                        .setTitle(`${client.user.username} - Música`)
                        .setColor('#9900f8')
                        .setDescription(`Estou tocando uma playlist! \n \n**Quantidade de músicas**: ${search.tracks.length} \n**Nome:** ${search.tracks[0].title}\n**Autor: **${search.tracks[0].author}\n**Node conectado:** ${player.node.identifier}`)
                        .setThumbnail(search.tracks[0].thumbnail)
                    player.play()
                    return m.channel.send({ embeds: [embed] })
                }
                if (search.loadType === "SEARCH_RESULT" || search.loadType === "TRACK_LOADED") {
                    player.queue.push(search.tracks[0])
                    search.tracks[0].setRequester(m.user.id)
                    player.play()
                    const embed = new MessageEmbed()
                        .setTitle(`${client.user.username} - Música`)
                        .setColor('#9900f8')
                        .setDescription(`Estou tocando uma música! \n \n**Nome:** ${search.tracks[0].title}\n**Autor: **${search.tracks[0].author}\n**Node conectado:** ${player.node.identifier}`)
                        .setThumbnail(search.tracks[0].thumbnail)
                    return m.channel.send({ embeds: [embed] })
                }
            } else if (m.customId === "ytt") {
                try {
                    let invite = await client.api.channels(voice.id).invites().post({ data: { target_application_id: "880218394199220334", target_type: 2 } })
                    m.channel.send(`Você selecionou o Youtube Together \nPara escutar a música acesse https://discord.gg/${invite.code}`)
                } catch (e) {
                    m.channel.send('Ocorreu um erro ao criar o convite!')
                }
            }
        })
    }
}