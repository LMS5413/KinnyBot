const dic = require("dicionario.js")
const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        nome: 'dicionario',
        aliases: ['dic'],
        cooldown: 10,
        options: [{
            name: 'dicionario',
            type: 'STRING',
            description: 'Não sabe o significado de uma palavra? Então procure no dicionário!',
            required: true,
        }],
    },
    run: async(client, message, args) => {
        if(!message.options?.getString('dicionario')) return message.reply('Digite o que quer pesquisar no dicionário!')
        let msg = await message.reply({content: 'Procurando....', fetchReply: true})
        try {
        let sig = await dic.significado(message.options.getString('dicionario'))
        if(!sig.class.length) return msg.edit('Não consegui achar o que você procura!')
        const embed = new MessageEmbed()
        .setTitle(`${client.user.username} | Dicionário`)
        .setColor('#9900f8')
        .setDescription(`**Classe:** ${sig.class[0].toUpperCase() + sig.class.substr(1)} \n \n**Significado:** \`${sig.meanings.join(" ")}\``)
        msg.delete()
        message.channel.send({embeds: [embed]})
        } catch (e) {
            msg.edit(`Um erro ocorreu ao tentar procurar! Erro: ${e.message}`)
            message.channel.send(`https://http.cat/${e.response.status}`)
            if(e.message === 'Error: Request failed with status code 400') {
                message.channel.send('Não consegui achar o que você mandou eu pesquisar!')
            }
        }
    }
}