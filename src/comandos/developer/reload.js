module.exports = {
    config: {
        nome: 'reload'
    },
    run: async (client, message, args) => {
        let user = message.author;
if (user.id !== require('../../../config.json').creatorid) {
return message.reply("Você não tem permissão para usar este comando.");
}

if(!args[0]) return message.reply("Coloque o nome da pasta")
if(!args[1]) return message.reply("Coloque o nome do comando")

let pasta = args[0].toLowerCase();
let command = args[1].toLowerCase();

try {
    delete require.cache[require.resolve(`../../comandos/${pasta}/${command}.js`)];
    client.commands.delete(command)

    const pull = require(`../../comandos/${pasta}/${command}`)
    client.commands.set(command, pull)

    message.reply(`Comando recarregado: **${pasta}/${command}**`)
} catch (e) {
    return message.reply(`Comando indisponível: **${pasta}/${command}** \nErro: ${e.message}`)
}

    }
}