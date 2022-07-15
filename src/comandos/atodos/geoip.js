const axios = require('axios')
const { MessageEmbed } = require('discord.js')
const db = require('../../../db.js')
module.exports = {
    config: {
       nome: 'geoip',
        cooldown: 10,
        options: [{
          name: 'ip',
          type: 'STRING',
          description: 'IP que deseja ser rastreado',
          required: true,
      }],
    },
    run: async(client, message, args) => {
      const lan = await db.lgs.findOne({guildID: !message.user ? message.user.id:message.user.id})
    let ip = message.options?.getString('ip')
    if(!ip) return message.reply(`${client.user.username} - Erro \n Digite o ip!`)
  axios.get(`http://ip-api.com/json/${ip.replaceAll('https://', '').replaceAll('http://', '').replaceAll('/').split(':')[0].replace('undefined', '').replace(undefined, '')}?lang=${lan && lan.lang === 'en' ? "en":"pt-BR"}`).then(response => {
      let infoip = response.data
      if(infoip.status === 'fail') return message.reply({content: 'Não consegui rastrear esse IP!' })
      let strbr = `**IP:** ${infoip.query} \n**País** ${infoip.country} \n**Região:** ${infoip.regionName} \n**Cidade:** ${infoip.city} \n**Empresa:** ${infoip.isp}\n**Serviço:** ${infoip.org}`
      let streua = `**IP:** ${infoip.query} \n**Country** ${infoip.country} \n**Region:** ${infoip.regionName} \n**City:** ${infoip.city} \n**Company:** ${infoip.isp}\n**Service:** ${infoip.org}`
   if(infoip.status === 'success') {
   const embed = new MessageEmbed()
   .setColor('#9900f8')
   .addField(`${client.user.username} - GEO IP`, lan && lan.lang === 'en' ? streua:strbr)
   return message.reply({embeds: [embed]})
   }
  })
    }
}