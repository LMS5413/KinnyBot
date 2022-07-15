const moment = require('moment')
const { MessageEmbed, version } = require('discord.js')
const system = require('systeminformation');
const config = require('../../../config.json')
const package = require('../../../package.json')
const db = require('../../../db')
module.exports = {
    config: {
        nome: "botinfo",
        cooldown: 10
    },
    run: async(client, message) => {
        let lan = await db.lgs.findOne({guildID: message.user.id})
        let tag = client.user.tag
        let totalSegundos = (client.uptime / 1000);
        let horas = Math.floor(totalSegundos / 3600);
        totalSegundos %= 3600;
        let minutos = Math.floor(totalSegundos / 60);
        let segundos = Math.floor(totalSegundos % 60);
        const os = await system.osInfo();
        const cpu = await system.cpu();
        let id = client.user.id
        const start = process.hrtime();
        await db.lgs.findOne({id: message.guild.id})
        const stop = process.hrtime(start);
        let criado = moment(client.user.createdAt).format('LLL');
        if(!lan) {
        moment.locale('pt-br')
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setThumbnail('https://cdn.discordapp.com/attachments/780605108462682112/799408028960817162/20210114_160211.gif')
            .setTitle(`${client.user.username} - Infos`)
            .addField('Informação sobre o bot', `<:discord:801199947634442250> **Tag:** \`${tag}\` \n<:id:801199947692113950> **ID:** \`${id}\` \n<:ausente:799747794545279057>  **Nasci no dia:** ${criado} \n<:rede:800011671145545738> **Estou online há:** ${horas} horas ${minutos} minutos ${segundos} segundos \n<:bug:801198221087080449>  **Criador** <@${config.creatorid}> \n<:mongodbkin:801203593658105898> **Meu banco de dados:** Mongo DB (${Math.floor(((stop[0] * 1e9) + stop[1]) / 1e6)}) \n<:djs:806874668564217876> **Versão da livraria (Discord.js):** ${version} \n<:config:806875469173620771> **Node.js:** ${process.version.replace('v', '')}`)
            .addField('Informação sobre servidor', `<:winner:801206555478982657> **Servidores:** ${client.guilds.cache.size} \n<:terra:801206555755675728> **Membros totais** ${client.users.cache.size} \n📡 **Shards:** ${client.shard.client.ws.shards.map(x => x)[0].manager.totalShards}`)
            .addField('Informações sobre minha Hospedagem', `**<:vps:800011671099670538> Hospedagem:**FantasyHosting (VPS)\n<:vps:800011671099670538> **Marca do processador:** ${cpu.manufacturer} \n<:vps:800011671099670538> **Modelo:** ${cpu.brand} (${cpu.family}°) \n<:vps:800011671099670538> **Nucleos de processamento:** ${cpu.cores} \n<:vps:800011671099670538> **OS:** ${os.platform} \n<:vps:800011671099670538> **Bits:** ${os.arch}`)
            .setFooter({text: `Comando executado por ${message.user.username}`, iconURL: message.user.displayAvatarURL({dynamic: true})})
            message.reply({embeds: [embed]})
        } else {
            if(lan.lang === 'en') {
                moment.locale('en')
                const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setThumbnail('https://cdn.discordapp.com/attachments/780605108462682112/799408028960817162/20210114_160211.gif')
                .setTitle(`${client.user.username} - Infos`)
                .addField('Bot information', `<:discord:801199947634442250> **Tag:** \`${tag}\` \n<:id:801199947692113950> **ID:** \`${id}\` \n<:ausente:799747794545279057>  **I was born on the day:** ${criado} \n<:rede:800011671145545738> **I've been online for:** ${horas} horus ${minutos} minutes ${segundos} seconds \n<:bug:801198221087080449>  **Creator** <@${config.creatorid}> \n<:mongodbkin:801203593658105898> **My database:** Mongo DB (${Math.floor(((stop[0] * 1e9) + stop[1]) / 1e6)}) \n<:djs:806874668564217876> **Bookstore version (Discord.js):** ${version} \n<:config:806875469173620771> **Node.js:** ${process.version.replace('v', '')}`)
                .addField('Server information', `<:winner:801206555478982657> **Servers:** ${client.guilds.cache.size} \n<:terra:801206555755675728> **Total members** ${client.users.cache.size} \n📡 **Shards:** ${client.shard.client.ws.shards.map(x => x)[0].manager.totalShards}`)
                .addField('Information about my Hosting', `**<:vps:800011671099670538> Host:**FantasyHosting\n<:vps:800011671099670538> **Processor brand:** ${cpu.manufacturer} \n<:vps:800011671099670538> **Model:** ${cpu.brand} (${cpu.family}°) \n<:vps:800011671099670538> **Processing cores:** ${cpu.cores} \n<:vps:800011671099670538> **OS:** ${os.platform} \n<:vps:800011671099670538> **Bits:** ${os.arch}`)
                .setFooter({text: `Command executed by ${message.user.username}`, iconURL: message.user.displayAvatarURL({dynamic: true})})
                message.reply({embeds: [embed]})
            }
        }
    }
}
