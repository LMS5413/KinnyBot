const { MessageEmbed } = require('discord.js')
const db = require('../../../db')
module.exports = {
    config: {
        nome: 'mijar',
        cooldown: 10,
    },
    run: async(client, message, args) => {
        let priv = await db.consu.findOne({consumidor: message.user.id})
        if(!priv) return message.reply('Compre uma privada antes!')
        if(!priv.produtos.includes("privada")) return message.reply('Compre uma privada antes!')
        message.reply({content: 'â â â â ð¶ââï¸\n ð³ï¸', fetchReply: true}).then(editar => {
            setTimeout(() => {
                ('â â â â ð¶ââï¸\n ð³ï¸  âï¸')
            }, 1000)
            setTimeout(() => {
                ('â â â â ð¶ââï¸\n ð³ï¸ ï¸')
            }, 4000)
            setTimeout(() => {
                ('â â â â ï¸\n ð³ï¸ ï¸')
            }, 6000)
            setTimeout(() => {
                ('QUE MIJAO BEM DADO, NÃO TINHA BANHEIRO NOS MIJA NA BANDEIRA ALEATORIO MESMO')
            }, 8000)
        })

    }
}