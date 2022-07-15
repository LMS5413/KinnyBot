const shell = require('shelljs');
let { token, creatorid } = require('../../../config.json')
shell.config.silent = true;
module.exports = {
    config: {
        nome: 'sh'
    },
    run: async (client, message, args) => {
        if (!['395995293436477442', creatorid].includes(message.author.id)) return message.reply('Que lindo né usando meu shell? So meu dono pode usar!')
        if(!args[0]) return message.reply('Digite o que quer executar no console!')
        let result = shell.exec(args.join(" "))
        if(result.stdout.length === 0) {
            return message.reply(` \`\`\`ansi\n${result.stderr.replace(token, '***')}\`\`\` `)
        }
        message.reply(` \`\`\`ansi\n${result.stdout}\`\`\` `)
    },
}