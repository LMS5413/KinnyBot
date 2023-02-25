const { MessageEmbed, CommandInteraction } = require('discord.js');
const Queue = require('../../structures/Queue')
module.exports = {
    config: {
        nome: 'play',
        aliases: ['tocar'],
        cooldown: 10,
        options: [
            {
                name: 'youtubetogether',
                description: 'Modo música + video',
                type: 'SUB_COMMAND'
            },
            {
                name: 'lavalink',
                description: 'Modo música',
                type: 'SUB_COMMAND',
                options: [
                    {
                        name: 'music',
                        description: 'Nome da música',
                        type: "STRING",
                        required: true,
                        autocomplete: true
                    }
                ]
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
        if (message.options.getSubcommand() === "lavalink") {
            let player = client.manager.players.get(message.guild.id)
            let search = await client.manager.search(message.options.getString('music'))
            if (search.loadType === 'NO_MATCHES' || search.loadType === 'LOAD_FAILED') return message.reply('Nenhuma música encontrada!')
            if (player) {
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
            } else {
                player = client.manager.createPlayer({
                    guildId: message.guild.id,
                    voiceChannelId: voice.id,
                    textChannelId: message.channel.id,
                    selfDeaf: true,
                    queue: new Queue()
                })
                player.connect()
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
                    return message.reply({ embeds: [embed] })
                }
                if (search.loadType === "SEARCH_RESULT" || search.loadType === "TRACK_LOADED") {
                    player.queue.push(search.tracks[0])
                    search.tracks[0].setRequester(message.user.id)
                    player.play()
                    const embed = new MessageEmbed()
                        .setTitle(`${client.user.username} - Música`)
                        .setColor('#9900f8')
                        .setDescription(`Estou tocando uma música! \n \n**Nome:** ${search.tracks[0].title}\n**Autor: **${search.tracks[0].author}\n**Node conectado:** ${player.node.identifier}`)
                        .setThumbnail(search.tracks[0].thumbnail)
                    return message.reply({ embeds: [embed] })
                }
            }
        } else {
            try {
                let invite = await client.api.channels(voice.id).invites().post({ data: { target_application_id: "880218394199220334", target_type: 2 } })
                message.reply(`Você selecionou o Youtube Together \nPara escutar a música acesse https://discord.gg/${invite.code}`)
            } catch (e) {
                message.reply('Ocorreu um erro ao criar o convite!')
            }
        }
    }
}