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
        message.reply({content: 'š² \n \n \n \n š ', fetchReply: true}).then(editar => {
            setTimeout(() => {
                message.editReply('ā  \nš² \n \n \n š ')
            }, 2000)
            setTimeout(() => {
                message.editReply('ā  \n \nš² \n \n š ')
            }, 4000)
            setTimeout(() => {
                message.editReply('ā  \n \n \nš² \n š ')
            }, 6000)
            setTimeout(() => {
                message.editReply('ā  \n \n \n \n š²')
            }, 7000)
            setTimeout(() => {
                message.editReply('š²    š')
            }, 9000)
            setTimeout(() => {
                message.editReply('ā š²ā   š')
            }, 12000)
            setTimeout(() => {
                message.editReply('ā ā ā š² š')
            }, 15000)
            setTimeout(() => {
                message.editReply('ā ā ā š²')
            }, 17000)
            setTimeout(() => {
                message.editReply('EH TO BASTAAAANTE CHEIO E TONTO!')
            }, 18000)

        })
    }
}