const axios = require('axios')

module.exports = {
    config: {
        nome: "docs",
        options: [
            {
                name: "value",
                type: "STRING",
                description: "Valor a ser pesquisado",
                required: true,
            }
        ]
    },
    run: async (client, message, args) => {
        if(!message.options.getString('value')) return message.channel.send('Digite o que deseja procurar na documentação!')

        let response = (await axios.get(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(message.options.getString('value'))}`)).data
        const embed = JSON.parse(JSON.stringify(response).replaceAll('Discord.js Docs (stable)', 'Documentação oficial do discord.js').replace(2266867, 10027256))
        message.reply({content: 'Uma documentação do discord.js so para você! Espero que encontre o que queira.', embeds: [embed]})
    }
}