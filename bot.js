const db = require('./db.js');
const { Client, Collection, MessageEmbed } = require('discord.js');
const { tokenc, tokenAPI, spotify, nodesLava, webhookPasswordTopGG } = require("./config.json");
const DBL = require('top.gg');
const dbl = new DBL(tokenAPI, { webhookPort: 25685, webhookAuth: webhookPasswordTopGG });
const { Vulkava } = require('vulkava');
const { readdir } = require('node:fs');

const client = new Client({
    shardId: process.argv[1],
    shardCount: process.argv[2],
    fetchAllMembers: true,
    intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_BANS',
        'GUILD_VOICE_STATES',
        'GUILD_PRESENCES',
        'GUILD_MESSAGES',
        'GUILD_MESSAGE_REACTIONS',
        'DIRECT_MESSAGES'
    ],
    partials: ['CHANNEL', 'MESSAGE'],
    ws: {
        properties: {
            browser: "Discord iOS"
        }
    }
});

const manager = new Vulkava({
    nodes: nodesLava,
    sendWS: (guildId, payload) => {
        client.guilds.cache.get(guildId)?.shard.send(payload)
    },
    spotify: spotify
});

dbl.webhook.on('ready', hook => {
    console.log(`[WEBHOOK TOP.GG] Web hook logado! no ip ${hook.hostname} e na porta ${hook.port}`.green);
});

dbl.webhook.on('vote', async vote => {
    const find = await db.coins.findOne({ id: vote.user });
    !find ? await db.coins.create({ id: vote.user, coinsc: 5000, coinsb: 0 }) : await db.coins.findOneAndUpdate({ id: vote.user }, { coinsc: find.coinsc + 5000 });
    client.users.cache.get(vote.user).send('Detectamos que você fez 1 voto na top.gg! Serio obrigado mesmo. E você acaba de receber 5K de koins!').catch(() => {
        console.log('Um erro ocorreu ao anunciar para o ' + client.users.cache.get(vote.user).username);
    });

    client.channels.cache.get('821013595822620673').send(`O membro ${client.users.cache.get(vote.user).username} votou na top.gg e recebeu 5K de koins! Quer essa quantia tambem? Então vote na top.gg! https://top.gg/bot/750384014388494376 !`);
});

['commands', 'aliases'].forEach(f => (client[f] = new Collection()));
['comandos', 'eventos'].forEach(f => require(`./src/handlers/${f}`)(client));
readdir('./src/eventos/music', (err, arrives) => {
    if (err) return console.log(err);
    arrives.forEach(arrive => {
        const event = require(`./src/eventos/music/${arrive}`);
        const eventName = arrive.split('.')[0];
        manager.on(eventName, event.bind(null, client));
    });
});

client.login(tokenc);
client.manager = manager;

process.on('uncaughtException', async(err) => {
    const embed = new MessageEmbed()
        .setTitle('Um erro interno ocorreu!')
        .setDescription(`Erro: ${err.message}`);

    client.channels.cache.get('873719017616068638')?.send({ embeds: [embed] });
    console.error(err);
});

process.on('unhandledRejection', async(err) => {
    const embed = new MessageEmbed()
        .setTitle('Um erro interno ocorreu!')
        .setDescription(`Erro: ${err.message}`);

    client.channels.cache.get('873719017616068638')?.send({ embeds: [embed] });
    console.error(err);
});
