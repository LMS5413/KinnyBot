const db = require('../../../db')

module.exports = {
    config: {
        nome: 'comer',
        cooldown: 10,
        aliases: ['comida', 'fat']
    },
    run: async(client, message) => {
        let priv = await db.consu.findOne({consumidor: message.user.id})
        if(!priv) return message.reply('Compre uma colher antes!')
        if(!priv.produtos.includes("colher")) return message.reply('Compre uma colher antes!')
        message.reply({content: '😲 \n \n \n \n 🍗 ', fetchReply: true}).then(editar => {
            setTimeout(() => {
                message.editReply('⠀ \n😲 \n \n \n 🍗 ')
            }, 2000)
            setTimeout(() => {
                message.editReply('⠀ \n \n😲 \n \n 🍗 ')
            }, 4000)
            setTimeout(() => {
                message.editReply('⠀ \n \n \n😲 \n 🍗 ')
            }, 6000)
            setTimeout(() => {
                message.editReply('⠀ \n \n \n \n 😲')
            }, 7000)
            setTimeout(() => {
                message.editReply('😲    🍔')
            }, 9000)
            setTimeout(() => {
                message.editReply('⠀😲⠀  🍔')
            }, 12000)
            setTimeout(() => {
                message.editReply('⠀⠀⠀😲 🍔')
            }, 15000)
            setTimeout(() => {
                message.editReply('⠀⠀⠀😲')
            }, 17000)
            setTimeout(() => {
                message.editReply('EH TO BASTAAAANTE CHEIO E TONTO!')
            }, 18000)

        })
    }
}