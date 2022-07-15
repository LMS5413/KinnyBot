const db = require('../../../db')

module.exports = {
    config: {
        nome: 'cagar',
        cooldown: 10,
        aliases: ['defecar']
    },
    run: async(client, message) => {
        let quts = client["comandos"+(message.user.id)]
        let priv = await db.consu.findOne({consumidor: (message.user.id)})
        if(!priv) return message.reply('Compre uma privada antes!')
        if(!priv.produtos.includes("privada")) return message.reply('Compre uma privada antes!')
        message.reply({content: '<:pedrinhos:802536483886071830>\n⠀ \n⠀ \n 🚽', fetchReply: true}).then(editar => {
        setTimeout(() => {
   message.editReply('<:pedrinhos:802536483886071830>\n💩\n⠀\n \n 🚽')
        }, 1000)
            setTimeout(() => {
                message.editReply('<:pedrinhos:802536483886071830>\n⠀\n💩\n⠀\n🚽')
            }, 3000)
            setTimeout(() => {
                message.editReply('<:pedrinhos:802536483886071830>\n⠀\n\n💩\n🚽')
            }, 5000)
            setTimeout(() => {
                message.editReply('<:pedrinhos:802536483886071830>\n⠀\n💦\n 🚽')
            }, 6000)
            setTimeout(() => {
                message.editReply('<:pedrinhos:802536483886071830>\n💦\n⠀\n 🚽')
            }, 7000)
            setTimeout(() => {
                if(quts >= 6) {
                    return  message.editReply('Você está com diarreia! Cristo ta um fedor...')
                }
                message.editReply('Você se cagou agora está aliviado!')
            }, 9000)
        })
    }
}