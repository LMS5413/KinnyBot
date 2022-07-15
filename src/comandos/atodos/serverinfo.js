const moment = require('moment')
const { MessageEmbed } = require('discord.js')
const db = require('../../../db')
module.exports = {
    config: {
        nome: "serverinfo",
        cooldown: 10
    },
    run: async(client, message) => {
        let servidor = message.guild 
        const lan = await db.lgs.findOne({guildID: message.user.id})
let nome = servidor.name
        let id = servidor.id
        let icone = !servidor.iconURL({dynamic: true}) ? "https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg":servidor.iconURL({dynamic: true})
        let boostcount = servidor.premiumSubscriptionCount
        let nivel = servidor.premiumTier.replace('NONE', 'Sem boost').replace('TIER_1', 'Nível 1').replace('TIER_2', 'Nível 2').replace('TIER_3', 'Nível 3')

        let banner = servidor?.splashURL({size: 4096}) || "https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg"
        let dono = servidor.ownerId
        let onlines = servidor.members.cache.filter(a => a.presence?.status === "online").size
        let ausentes = servidor.members.cache.filter(a => a.presence?.status === "idle").size
        let ocupado = servidor.members.cache.filter(a => a.presence?.status === "dnd").size
        let offline = servidor.members.cache.filter(a => a.presence?.status === "offline").size
        let canaistext = servidor.channels.cache.filter(c => c.type === "GUILD_TEXT").size
        let canaisvoice = servidor.channels.cache.filter(c => c.type === "GUILD_VOICE").size
        let total = servidor.channels.cache.filter(x => x.type !== 'GUILD_CATEGORY').size
        let criado = moment(servidor.createdAt).format('LLL')
        if(!lan) {
       moment.locale('pt-br')
        if(!banner) {
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Infos`)
                .setThumbnail(`${icone}`)
                .addField(`Informação sobre o servidor ${nome}`, `<:id:801199947692113950> **ID:** \`${id}\` \n<:dono:801206555818983475> **Dono:** <@${dono}> \n<a:booster:801215078677741598> **Nivel de boost:** ${nivel} \n<a:booster:801215078677741598> **Quantidade de boost:** ${boostcount} \n \n**Membros** \n \n<:online:799747794629689356> **Onlines:** ${onlines} \n<:ausente:799747794545279057> **Ausentes** ${ausentes} \n<:ocupado:799747794616713286> **Ocupados** ${ocupado} \n<:offline:799747795237732412> **Offlines** ${offline} \n **Membros no total:** ${servidor.memberCount} \n \n<:ausente:799747794545279057> **Servidor criado em:** ${criado} \n \n 💬 **Canais:** ${total} \n🔊 **Voz:** ${canaisvoice} \n😎 **Texto:** ${canaistext}\n**📡 Shard:** ${message.guild.shardId}`)
            message.reply({embeds: [embed]})
        } else if(!icone) {
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Infos`)
                .addField(`Informação sobre o servidor ${nome}`, `<:id:801199947692113950> **ID:** \`${id}\` \n<:dono:801206555818983475> **Dono:** <@${dono}> \n<a:booster:801215078677741598> **Nivel de boost:** ${nivel} \n<a:booster:801215078677741598> **Quantidade de boost:** ${boostcount} \n \n**Membros** \n \n<:online:799747794629689356> **Onlines:** ${onlines} \n<:ausente:799747794545279057> **Ausentes** ${ausentes} \n<:ocupado:799747794616713286> **Ocupados** ${ocupado} \n<:offline:799747795237732412> **Offlines** ${offline} \n **Membros no total:** ${servidor.memberCount} \n \n<:ausente:799747794545279057> **Servidor criado em:** ${criado} \n \n 💬 **Canais:** ${total} \n🔊 **Voz:** ${canaisvoice} \n😎 **Texto:** ${canaistext}\n*📡 Shard:** ${message.guild.shardId}`)
                message.reply({embeds: [embed]})
        }
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - Infos`)
            .setThumbnail(`${icone}`)
            .setImage(`${banner}`)
            .addField(`Informação sobre o servidor ${nome}`, `<:id:801199947692113950> **ID:** \`${id}\` \n<:dono:801206555818983475> **Dono:** <@${dono}> \n<a:booster:801215078677741598> **Nivel de boost:** ${nivel} \n<a:booster:801215078677741598> **Quantidade de boost:** ${boostcount} \n \n**Membros** \n \n<:online:799747794629689356> **Onlines:** ${onlines} \n<:ausente:799747794545279057> **Ausentes** ${ausentes} \n<:ocupado:799747794616713286> **Ocupados** ${ocupado} \n<:offline:799747795237732412> **Offlines** ${offline} \n **Membros no total:** ${servidor.memberCount} \n \n<:ausente:799747794545279057> **Servidor criado em:** ${criado} \n \n 💬 **Canais:** ${total} \n🔊 **Voz:** ${canaisvoice} \n😎 **Texto:** ${canaistext} \n**📡 Shard:** ${message.guild.shardId}`)
            message.reply({embeds: [embed]})
      } else {
          if(lan.lang === 'en') {
            if(!banner) {
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .setTitle(`${client.user.username} - Infos`)
                    .setThumbnail(`${icone}`)
                    .addField(`${nome} Server information`, `<:id:801199947692113950> **ID:** \`${id}\` \n<:dono:801206555818983475> **Owner:** <@${dono}> \n<a:booster:801215078677741598> **Boost level:** ${nivel} \n<a:booster:801215078677741598> **Boost amount:** ${boostcount} \n \n**Members** \n \n<:online:799747794629689356> **Online:** ${onlines} \n<:ausente:799747794545279057> **Absent** ${ausentes} \n<:ocupado:799747794616713286> **Busy** ${ocupado} \n<:offline:799747795237732412> **Offlines** ${offline} \n **Total members:** ${servidor.memberCount} \n \n<:ausente:799747794545279057> **Server created on:** ${criado} \n \n 💬 **Channels:** ${total} \n🔊 **Voice:** ${canaisvoice} \n😎 **Text:** ${canaistext}\n**📡 Shard:** ${message.guild.shardID}`)
                    message.reply({embeds: [embed]})
            } else if(!icone) {
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .setTitle(`${client.user.username} - Infos`)
                    .addField(`${nome} Server information`, `<:id:801199947692113950> **ID:** \`${id}\` \n<:dono:801206555818983475> **Owner:** <@${dono}> \n<a:booster:801215078677741598> **Boost level:** ${nivel} \n<a:booster:801215078677741598> **Boost amount:** ${boostcount} \n \n**Members** \n \n<:online:799747794629689356> **Online:** ${onlines} \n<:ausente:799747794545279057> **Absent** ${ausentes} \n<:ocupado:799747794616713286> **Busy** ${ocupado} \n<:offline:799747795237732412> **Offlines** ${offline} \n **Total members:** ${servidor.memberCount} \n \n<:ausente:799747794545279057> **Server created on:** ${criado} \n \n 💬 **Channels:** ${total} \n🔊 **Voice:** ${canaisvoice} \n😎 **Text:** ${canaistext}\n**📡 Shard:** ${message.guild.shardID}`)
                    message.reply({embeds: [embed]})
            }
            const embed = new MessageEmbed()
                .setColor('#9900f8')
                .setTitle(`${client.user.username} - Infos`)
                .setThumbnail(`${icone}`)
                .setImage(`${banner}`)
                .addField(`${nome} Server information`, `<:id:801199947692113950> **ID:** \`${id}\` \n<:dono:801206555818983475> **Owner:** <@${dono}> \n<a:booster:801215078677741598> **Boost level:** ${nivel} \n<a:booster:801215078677741598> **Boost amount:** ${boostcount} \n \n**Members** \n \n<:online:799747794629689356> **Online:** ${onlines} \n<:ausente:799747794545279057> **Absent** ${ausentes} \n<:ocupado:799747794616713286> **Busy** ${ocupado} \n<:offline:799747795237732412> **Offlines** ${offline} \n **Total members:** ${servidor.memberCount} \n \n<:ausente:799747794545279057> **Server created on:** ${criado} \n \n 💬 **Channels:** ${total} \n🔊 **Voice:** ${canaisvoice} \n😎 **Text:** ${canaistext}\n**📡 Shard:** ${message.guild.shardID}`)
                message.reply({embeds: [embed]})
          }
      }
    }

}