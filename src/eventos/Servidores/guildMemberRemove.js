const db = require('../../../db.js')
const path = require('path');
const Canvas = require('canvas')
const Discord = require('discord.js')
module.exports = async(client, member) => {
    let achar = await db.idgr.findOne({group: member.guild.id})
    let achar2 = await db.idgr.findOne({group: member.guild.id})
    if(achar2) {
        if(achar2.enabled) {
        let guild = client.guilds.cache.get(achar2.group)
        let canala = client.channels.cache.get(achar2.channelwell)
        const canvas = Canvas.createCanvas(1280, 720);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage(String(path.resolve(__dirname, '..', '..', 'Canvas', 'saida.png')));
         ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#FFFFFF';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.arc(640, 348, 170, 0, Math.PI * 2, true);
        ctx.lineWidth = 15;
        ctx.stroke();
        ctx.closePath();
        ctx.clip()
        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
        ctx.drawImage(avatar, 460, 174, 350, 350);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'saida.png');
        if(achar2.msg2) {
            if(!canala) return;
            canala.send({content: `_O servidor ${member.guild.name} que definiu essa mensagem. Caso tenha palavras ofensivas reporte!_ \n${achar2.msg2.replace('{user}', `${member}`).replace('{grupo}', `${guild.name}`)}`, files: [attachment]});
        } else {
            if(!canala) return;
            canala.send({content:`${member} Saiu, to triste agora 😢`, files: [attachment]});
        }
    } else return;
}
}