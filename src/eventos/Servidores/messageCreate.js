const { MessageEmbed } = require('discord.js');
const { prefix, creatorid } = require('../../../config.json');
const db = require('../../../db');
const { closest } = require('fastest-levenshtein');

module.exports = async (client, message) => {
    if (message.author.bot || message.channel.type === 'DM') return;
    if (!client.application?.owner) await client.application?.fetch();

    const mention = new RegExp(`^<@!?(${client.user.id})>( |)$`);

    if (message.content.match(mention)) {
        const embed = new MessageEmbed()
            .setThumbnail(client.user.avatarURL())
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Apresentação`)
            .addField('Olá ser humano, eu me chamo Kinny!', 'Minha comida favorita é bolo de cenoura, só de falar me da água na boca!')
            .addField(`Meu prefixo é ${prefix}`, `Mas você pode trocar o prefixo usando ${prefix}setprefix <novo prefixo>! <a:dance:798169339181531167>`)
            .addField('Fui projetado para ter diversão e utilidades!', 'O meu desenvolvedor é o <@425775842371829760>.');
        return message.reply({ embeds: [embed] });
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();
    if (!message.content.startsWith(prefix)) return;

    const comandoInfo = client.commands.get(comando) || client.commands.get(client.aliases.get(comando));

    if (comandoInfo) {
        if (message.author.id !== creatorid) return message.reply({
            content: 'Olá caro usuário!\n\nA kinny não funciona mais com prefixos! Ela só funciona com slash commands. \nO motivo é que os sistema de prefixo será extintos em 30 de abril de 2022!\n\nAproveite o slash command!\n_Achou algum bug? Reporte._\n https://i.imgur.com/iGmUZZi.png',
            ephemeral: true
        });

        comandoInfo.run(client, message, args).catch(error => {
            message.channel.send("Ops, parece que ocorreu um erro ao executar esse comando! Não se preocupe, as informações do problema foram repassadas ao meu desenvolvedor.\n\nOops, looks like an error occurred while executing this command! Don't worry, the problem information has been passed on to my developer.");

            const embed = new MessageEmbed()
                .setTitle('Um erro ocorreu ao tentar executar um comando')
                .setDescription(`Comando ${comandoInfo.config.nome}\nSlash? Não\nErro: ${error.message}\nAutor: ${message.author.username}`);
            client.channels.cache.get('873719017616068638')?.send({ embeds: [embed] });
        });
    } else {
        const cmd = await db.sets.find({ id: message.guild.id });
        if (cmd && cmd.map(x => x.command).some(e => message.content.toLowerCase().includes(e))) {
            const cmda = await db.sets.findOne({ command: message.content.toLowerCase().replace(prefix.toLowerCase(), '') });
            return message.reply(cmda.reply);
        }

        let sugestao = closest(comando, client.commands.map(x => x.config.nome));
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setDescription(`<:bug:801198221087080449> O comando **${prefix}${comando}** não foi encontrado! Veja se esse comando realmente existe! Acho que você quis dizer **${prefix}${client.commands.get(sugestao)?.config.categoria === 'developer' ? "8ball" : sugestao || `${prefix}ajuda`}**`);
        message.reply({ embeds: [embed] }).catch(error => console.log(`Erro encontrado ao enviar para guilda ${message.guild.name}! Erro: ${error.message}`));
    }
};
