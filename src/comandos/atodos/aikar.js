const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        nome: 'aikar',
    },
    run: async (client, interaction) => {
        const perguntas = [
            'Qual é a jar do servidor?',
            'O servidor usa pterodactyl? (Sim/Não)',
            'Quantos gigas tem seu servidor? (Coloque GB ou MB na frente!)',
            'Qual versão do seu java?',
        ];
        const respostas = [];
        const collector = interaction.channel.createMessageCollector({
            filter: ({ author }) => author.id === interaction.user.id,
            max: perguntas.length,
        });

        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Aikar Flags`)
            .setDescription(perguntas[0]);
        interaction.reply({ embeds: [embed] });

        collector.on('collect', async m => {
            respostas.push(m.content.toLowerCase());
            if (respostas.length === perguntas.length) return collector.stop();

            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Aikar Flags`)
                .setDescription(perguntas[respostas.length]);
            interaction.channel.send({ embeds: [embed] });
        });

        collector.on('end', () => {
            if (!/(gb|mb)/gi.test(respostas[2])) {
                return interaction.channel.send('Isso não inclui GB/MB!');
            }
            if (isNaN(respostas[2].replace(/(gb|mb)/gi, '').trim())) {
                return interaction.channel.send('Você não respondeu corretamente a pergunta "Quantos gigas tem seu servidor? (Coloque GB ou MB na frente!)"!');
            }
            if (!/(sim|nao)/gi.test(respostas[1].normalize('NFD').replace(/[\u0300-\u036f]/g, ''))) {
                return interaction.channel.send('Você não respondeu corretamente a pergunta "O servidor usa pterodactyl?"!');
            }
            if (isNaN(respostas[3].replace(/(gb|mb)/gi, '').trim())) {
                return interaction.channel.send('Você não respondeu corretamente a pergunta "Qual versão do seu java?"!');
            }
            let str = respostas[2].replace(/[0-9]/g, '').replace('b', '').trim().toUpperCase();
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Aikar Flags`)
                .setDescription(`Sua aikar flags está pronta! \n \n\`java -Xms${respostas[1] === 'sim' ? (str === "MB" && Number(respostas[2]) >= 1000 ? Number(respostas[2]) - 1000 : Number(respostas[2])) === 0 ? Number(respostas[2].replace(/(gb|mb)/ig, '').trim()) : Number(respostas[2].replace(/(gb|mb)/ig, '').trim()) - 1 : respostas[2].replace(/(gb|mb)/ig, '').trim()}${str} -Xmx${respostas[1] === 'sim' && str === 'G' ? Number(respostas[2].replace(/(gb|mb)/ig, '').trim()) - 1 === 0 ? Number(respostas[2].replace(/(gb|mb)/ig, '').trim()) : Number(respostas[2].replace(/(gb|mb)/ig, '').trim()) - 1 : respostas[2].replace(/(gb|mb)/ig, '').trim()}${str} -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -XX:G1NewSizePercent=${Number(respostas[2].replace(/(gb|mb)/ig, '').trim()) <= 12 ? 30 : 40} -XX:G1MaxNewSizePercent=${Number(respostas[2].replace(/(gb|mb)/ig, '').trim()) <= 12 ? 40 : 50} -XX:G1HeapRegionSize=${Number(respostas[2].replace(/(gb|mb)/ig, '').trim()) <= 12 ? 8 : 16}M -XX:G1ReservePercent=${Number(respostas[2].replace(/(gb|mb)/ig, '').trim()) <= 12 ? 20 : 15} -XX:InitiatingHeapOccupancyPercent=${Number(respostas[2].replace(/(gb|mb)/ig, '').trim()) <= 12 ? 15 : 20} ${Number(respostas[3]) >= 11 ? '-Xlog:gc*:logs/gc.log:time,uptime:filecount=5,filesize=1M' : '-Xloggc:gc.log -verbose:gc -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=1M'} -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -jar ${respostas[0].replace('.jar', '')}.jar ${Number(respostas[3]) >= 11 ? '' : 'nogui'}\``);
            interaction.channel.send({ embeds: [embed] });
        });
    },
}
