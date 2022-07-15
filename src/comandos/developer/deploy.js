const {token} = require('../../../config.json')
const { inspect } = require('util')
const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const sourcebin = require('sourcebin');
const db = require('../../../db')
module.exports = {
    config: {
        nome: 'deploy'
    },
    run: async (client, message, args) => {
        if (!['395995293436477442', require('../../../config.json').creatorid].includes(message.author.id)) return;
client.commands.forEach(async comandos => {
    if (comandos.config.categoria === 'developer' && comandos.config.categoria === 'jornalismo') return;
    const data = {
      name: comandos.config.nome,
      description: !comandos.config.descricao ? "Sem descrição" : comandos.config.descricao,
    };
    if (comandos.config.options) {
      data.options = comandos.config.options
    }
        const command = await client.guilds.cache.get(message.guild.id)?.commands.create(data);

        console.log(command);
    })
    }
}