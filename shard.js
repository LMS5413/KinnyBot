const { ShardingManager } = require('discord.js');
const { token } = require('./config.json');

const shards = new ShardingManager('./bot.js', {
    respawn: true,
    totalShards: 'auto',
    token,
});

shards.on('shardCreate', (shard) => {
    console.log(`[SHARD] Iniciando a shard de id ${shard.id}`.green);
});
shards.spawn();

process.on('uncaughtException', (err) => {
    console.error(err);
});

process.on('unhandledRejection', (err) => {
    console.error(err);
});
