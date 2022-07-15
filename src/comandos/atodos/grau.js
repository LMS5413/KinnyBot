module.exports = {
    config: {
        nome: "grau",
        cooldown: 9,
        options: [
            {
                name: "escolha",
                type: "STRING",
                description: "Escolha uma das opções abaixo",
                required: true,
                choices: [
                    {
                        name: "Moto",
                        value: "moto"
                    },
                    {
                        name: "Bike",
                        value: "bike"
                    }
                ]
            }
        ]
    },
    run: async(client, message, args) => {
        const escolha = message.options.getString('escolha').toLowerCase()
        if(!escolha) return message.reply('Use grau <moto/bike>')
        if(!['bike', 'moto'].includes(escolha)) return message.reply('Isso não está na lista! use: grau <moto/bike>')
        if(escolha === 'bike') {
            message.reply({content: '<:bike_andando:816293573322211358>', fetchReply: true}).then(editar => {
                setTimeout(() => {
                    message.editReply('⠀⠀<:bike_andando:816293573322211358>')
                }, 2000)
                setTimeout(() => {
                    message.editReply('⠀⠀⠀⠀<:bike_andando:816293573322211358>')
                }, 4000)
                setTimeout(() => {
                    message.editReply('⠀⠀⠀⠀⠀<:bike_subindodescendo:816293573027692586>')
                }, 6000)
                setTimeout(() => {
                    message.editReply('⠀⠀⠀⠀⠀⠀⠀<:bike_empinada:816293573367824385>')
                }, 8000)
                setTimeout(() => {
                    message.editReply('⠀⠀⠀⠀⠀⠀⠀⠀⠀<:bike_subindodescendo:816293573027692586>')
                }, 10000)
                setTimeout(() => {
                    message.editReply('⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<:bike_pneuestourado:816293573179867138>')
                }, 12000)
                setTimeout(() => {
                    message.editReply('Vixi pneu estourou :(')
                }, 14000)
            })
        } else if(escolha === 'moto') {
            message.reply('<:moto_andando:816293573023760425>').then(editar => {
                setTimeout(() => {
                    message.editReply('⠀⠀<:moto_andando:816293573023760425>')
                }, 2000)
                setTimeout(() => {
                    message.editReply('⠀⠀⠀⠀<:moto_andando:816293573023760425>')
                }, 4000)
                setTimeout(() => {
                    message.editReply('⠀⠀⠀⠀⠀<:motoka_decsendo:816293573158895650>')
                }, 6000)
                setTimeout(() => {
                    message.editReply('⠀⠀⠀⠀⠀⠀⠀<:motoka_enpinada:816293573359173662>')
                }, 8000)
                setTimeout(() => {
                    message.editReply('⠀⠀⠀⠀⠀⠀⠀⠀⠀<:motoka_decsendo:816293573158895650>')
                }, 10000)
                setTimeout(() => {
                    message.editReply('⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<:moto_andando:816293573023760425>')
                }, 12000)
                setTimeout(() => {
                    message.editReply('NICE!')
                }, 14000)
            })
        }
    }
}