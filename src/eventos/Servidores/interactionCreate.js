const db = require('../../../db');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = async (client, interaction) => {
    if (interaction.channel.type === 'DM') return;

    if (interaction.isAutocomplete() && interaction.commandName === 'play') {
        let response = await axios.get(`https://suggestqueries-clients6.youtube.com/complete/search?client=youtube&hl=pt&gl=br&gs_rn=64&gs_ri=youtube&tok=TMTnoMpfiY2nnzJ8jGtczw&video_id=NYXr1YqfcwA&ds=yt&cp=8&gs_id=67&q=${interaction.options.getFocused()}&callback=google.sbox.p50&gs_gbg=67nJxpRDx`);
        if (interaction.options.getFocused().match(/^(http|https):\/\//i)) return;

        let result = JSON.parse(response.data.replace('google.sbox.p50 && google.sbox.p50', '').replace('(', '').replaceAll(')', ''));
        if (result[1].map(x => x[0]).length === 0) return;

        interaction.respond(result[1].map(x => ({ name: x[0], value: x[0] })).slice(0, 25));
    }

    if (interaction.isCommand()) {
        const comandoInfo = client.commands.get(interaction.commandName) || client.commands.get(client.aliases.get(interaction.commandName));

        if (comandoInfo) {
            if (await db.ban.findOne({ punid: interaction.user.id })) {
                return interaction.reply(`Olá! Se você está lendo essa mensagem no exato momento que executou um comando meu é porque você foi banido!\n\nMotivo:${!(await db.ban.findOne({ punid: interaction.user.id })).motivo.length ? "Sem motivo" : (await db.ban.findOne({ punid: interaction.user.id })).motivo}\n\nHi! If you're reading this message at the exact moment you ran a command from me, it's because you've been banned!\n\nReason: ${!(await db.ban.findOne({ punid: interaction.user.id })).motivo.length ? "Sem motivo" : (await db.ban.findOne({ punid: message.user.id })).motivo}`);
            }

            if (!interaction.member.permissions.has('ADMINISTRATOR')) {
                let channel = await db.can.findOne({ groupid: interaction.guild.id });
                if (channel && interaction.channel.id !== channel.channel) return interaction.reply(`Esse comando so pode ser executado em <#${channel.channel}>`);
            }

            let args = [];
            if (comandoInfo.config.categoria === 'developer') return;
            if (comandoInfo.config.categoria === 'mod' && !interaction.member.permissions.has('ADMINISTRATOR'))
                return interaction.reply('Você não tem permissão para executar esse comando!');

            comandoInfo.run(client, interaction, args).catch(error => {
                const embed = new MessageEmbed()
                    .setTitle('Um erro ocorreu ao tentar executar um comando')
                    .setDescription(`Comando ${interaction.commandName}\nSlash? Sim\nErro: ${error.message}\nAutor: ${interaction.user.username}`);

                client.channels.cache.get('873719017616068638')?.send({ embeds: [embed] });

                interaction.reply({
                    content: "Ops, parece que ocorreu um erro ao executar esse comando! Não se preocupe, as informações do problema foram repassadas ao meu desenvolvedor.\n\nOops, looks like an error occurred while executing this command! Don't worry, the problem information has been passed on to my developer.",
                    ephemeral: true,
                });
            });

            const kinnyLogs = client.channels.cache.get('833009933796507659');
            const embed = new MessageEmbed()
                .setTitle('Kinny logs')
                .setDescription(`Nome: ${interaction.user.username}\nID do User: ${interaction.user.id}\nGrupo: ${interaction.guild.name}\nID do grupo: ${interaction.guild.id} \nCanal: ${interaction.channel.name}\nComando: /${interaction.commandName}`);
            kinnyLogs?.send({ embeds: [embed] });
        }
    }

    if (interaction.customId === 'giveaway-enter') {
        const giveaway = await db.give.findOne({ messageID: interaction.message.id });

        if (!giveaway) return interaction.reply({ content: 'Esse sorteio não existe!', ephemeral: true });
        if (giveaway.end) return interaction.reply({ content: 'Esse sorteio acabou!', ephemeral: true });

        if (giveaway.participants.includes(interaction.user.id)) {
            interaction.message.embeds[0].description = interaction.message.embeds[0].description.replace(`Pessoas no sorteio: ${giveaway.participants.length}`, `Pessoas no sorteio: ${giveaway.participants.length - 1}`);
            interaction.message.edit({embeds: [interaction.message.embeds[0]]}).catch(e => {
                return null;
            })
            await db.give.updateOne({ messageID: interaction.message.id }, { $pull: { participants: interaction.user.id } });
            return interaction.reply({ content: 'Você saiu no sorteio!', ephemeral: true });
        }
        interaction.message.embeds[0].description = interaction.message.embeds[0].description.replace(`Pessoas no sorteio: ${giveaway.participants.length}`, `Pessoas no sorteio: ${giveaway.participants.length + 1}`);
        interaction.message.edit({embeds: [interaction.message.embeds[0]]}).catch(e => {
            return null;
        })
        interaction.reply({ content: 'Você entrou no sorteio!', ephemeral: true });
        await db.give.updateOne({ messageID: interaction.message.id }, { $push: { participants: interaction.user.id } });
    }
};
