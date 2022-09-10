const moment = require('moment')
const { MessageEmbed } = require('discord.js')
const db = require('../../../db.js')
module.exports = {
    config: {
        nome: "userinfo",
        cooldown: 10,
        options: [{
            name: 'usuario',
            type: 'USER',
            description: 'User da pessoa',
            required: false,
        }],
    },
    run: async (client, message, args) => {
        const lan = await db.lgs.findOne({ guildID: message.user.id })
        let membro = message.options?.getMember('usuario') ?? message.user.id
        if(!membro) return message.reply(`${client.user.username} - Erro \n Este usuário não está no servidor.`)
        let casado = await db.coins.findOne({ casado1: membro.id })
        let tag = membro.user.tag
        id = membro.user.id
        let criado = moment(membro.user.createdAt).format('L')
        let entra = moment(membro.joinedAt).format('LLL')
        let criado2 = moment(membro.user.createdAt, "YYYYMMDD").fromNow()
        if (!lan) {
            moment.locale('pt-br')
            let jogando = membro.presence.activities[0]?.name || "Está jogando nada!"
            let detalhes = membro.presence.activities[0]?.details || "Está jogando nada!"
            let dispositivo = Object?.keys(membro.presence.clientStatus)[0] || 'Nenhuma plataforma'
            let statuse = membro.presence.status
            let customs = `${membro.presence.activities[0]?.emoji?.name || "Sem emoji"} ${membro.presence.activities[0]?.state || 'Sem status'}`
            const values = { web: '🌐', desktop: '🖥', mobile: '📱 ' }
            const result = dispositivo.replace(/desktop|mobile|web/gi, v => values[v])
            const values2 = {
                online: '<:online:799747794629689356> Online',
                idle: '<:ausente:799747794545279057> Ausente',
                offline: '<:offline:799747795237732412> Offline ',
                dnd: '<:ocupado:799747794616713286> Ocupado',
                stream: '<:stremando:799747794537414686> Transmitindo'
            }
            const result2 = statuse.replace(/online|idle|dnd|offline|stream/gi, v => values2[v])

            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Infos`)
                .addField('Informação sobre o usuario', `<:discord:801199947634442250> **Tag:** \`${tag}\` \n<:id:801199947692113950> **ID:** \`${id}\` \n <:ausente:799747794545279057>  **Conta criada:** ${criado} (${criado2}) \n <a:cacholo:801200880174235668> **Entrou aqui em:** ${entra} \n<a:tipo:800025557965733918> **Estado:** ${result2} \n 🕹️ **Jogando agora:** ${jogando.replace('Custom Status', `${customs} (Status customizavel.)`)} \n<a:carregando:800011672122556447> **Detalhes:** ${detalhes} \n <a:dance:798169339181531167> **Plataforma:** ${result} \n **<:diamante:806874668442845194> Casado com:** ${client.users.cache.get(casado?.casado2)?.username || "Ninguem"} \n \n **Servidor** \n \n <:cargo:801199947801952296>  **Cargos adicionados:** ${membro._roles.length} \n <:cargo:801199947801952296> **Cargo mais alto:** ${membro.roles.highest.name}`)
            message.reply({ embeds: [embed] })
        } else {
            moment.locale('en')
            if (lan.lang === 'en') {
                let jogando = membro.presence.activities[0]?.name || "You're playing nothing!"
                let detalhes = membro.presence.activities[0]?.details || "You're playing nothing!"
                let dispositivo = Object?.keys(membro?.presence.clientStatus) || 'No platform '
                let statuse = membro.presence.status
                let customs = `${membro.presence.activities[0]?.emoji?.name.length > 0 ? `${membro.presence.activities[0]?.emoji?.name} `:""}${membro.presence.activities[0]?.state || 'Sem status'}`
                const values = { web: '🌐', desktop: '🖥', mobile: '📱 ' }
                const result = dispositivo.map(x => x.replace(/desktop|mobile|web/gi, v => values[v])).join("")
                const values2 = {
                    online: '<:online:799747794629689356> Online',
                    idle: '<:ausente:799747794545279057> Ausente',
                    offline: '<:offline:799747795237732412> Offline ',
                    dnd: '<:ocupado:799747794616713286> Ocupado',
                    stream: '<:stremando:799747794537414686> Transmitindo'
                }
                const result2 = statuse.replace(/online|idle|dnd|offline|stream/gi, v => values2[v])

                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .setTitle(`${client.user.username} - Infos`)
                    .addField('User information', `<:discord:801199947634442250> **Tag:** \`${tag}\` \n<:id:801199947692113950> **ID:** \`${id}\` \n <:ausente:799747794545279057>  **Account created:** ${criado} (${criado2}) \n <a:cacholo:801200880174235668> **Came here in:** ${entra} \n<a:tipo:800025557965733918> **State:** ${result2} \n 🕹️ **Playing now:** ${jogando.replace('Custom Status', `${customs} (Custom Status.)`)} \n<a:carregando:800011672122556447> **Details:** ${detalhes} \n <a:dance:798169339181531167> **Platform:** ${result} \n **<:diamante:806874668442845194> Married with:** ${client.users.cache.get(casado?.casado2)?.username || "No one"} \n \n **Server** \n \n <:cargo:801199947801952296>  **Positions added:** ${membro._roles.length} \n <:cargo:801199947801952296> **Highest position:** ${membro.roles.highest.name}`)
                message.reply({ embeds: [embed] })
            }
        }
    }

}