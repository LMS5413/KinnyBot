const db = require('../../../db.js')
const path = require('path');
const Canvas = require('canvas')
const { registerFont } = require('canvas')
const Discord = require('discord.js')
module.exports = async(client, member) => {
    let achar2 = await db.idgr.findOne({group: member.guild.id})
    let achar4 = await db.cap.findOne({groupid: member.guild.id})
        if(achar4) {
        if (achar4.capactivy === "ativado") {
            await db.cap.findOneAndUpdate({groupid: member.guild.id}, {member: member.id, code: makeid(5).toLowerCase()})
            let main = (await member.user.createDM()).createMessageCollector({filter: a => a.author.id == member.id, time: 60000 * 5})
            const canvas = Canvas.createCanvas(1920, 1080);
            const ctx = canvas.getContext('2d');
            registerFont('./src/Canvas/HachiMaruPop.ttf', {family: 'hachi'});
            const applyText = (canvas, text) => {

                let fontSize = 700;

                do {
                    ctx.font = `${fontSize -= 10}px hachi`;
                } while (ctx.measureText(text).width > canvas.width - 1);
                return ctx.font;
            };
            const background = await Canvas.loadImage(String(path.resolve(__dirname, '..', '..', 'Canvas', 'reacp.png')));
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#ffffff';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            ctx.font = applyText(canvas, achar4.code);
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${achar4.code}`, canvas.width / 2.2, canvas.height / 1.9, 400, 10);
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'reacp.png');
            let embed = new Discord.MessageEmbed()
                .setColor('#9900f8')
                .addField(`${client.user.username} - Segurança`,`🇧🇷 Olá! Você foi barrado captcha, você so precisa digitar esse codigo que aparece imagem abaixo! \n \n 🇺🇸 Hi! You were barred captcha, you need to type this code that appears in the image below!`)
                .setImage('attachment://reacp.png')
            member.send({embeds: [embed], files: [attachment]})
            main.on('collect', async a => {
                let n1 = a.content.toLowerCase()
                if(`${n1}` === `${achar4.code}`) {
                    main.stop()
                    member.send('Codigo valido! Cargo adicionado \n \n Valid code! role added')
                    await db.cap.findOneAndRemove({
                        member: member.id,
                        code: makeid(5).toLowerCase()
                    })
                    member.roles.add(achar4.role)

                } else {
                    await db.cap.findOneAndRemove({
                        member: member.id,
                        code: makeid(5).toLowerCase()

                    })


                
                    member.send('Codigo invalido! Você é kickado do servidor e fazerá o captcha denovo! Convite do servidor: \n \n Invalid code! You are kicked from the server and will capture again!')
                    member.kick("Captcha invalido \n Invalid captcha")
                    main.stop()

                }
            })
        }
    }
    if(achar2) {
        if(achar2.enabled) {
        let guild = client.guilds.cache.get(achar2.group)
        let canala = client.channels.cache.get(achar2.channelwele)
        const canvas = Canvas.createCanvas(1280, 720);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage(String(path.resolve(__dirname, '..', '..', 'Canvas','bemvindo.png')));
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
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'bemvindo.png');
        if(achar2.msg1) {
            if(!canala) return;
            canala.send({content: `_O servidor ${member.guild.name} que definiu essa mensagem. Caso tenha palavras ofensivas reporte!_ \n \n${achar2.msg1.replace('{user}', `${member}`).replace('{grupo}', `${guild.name}`)}`, files: [attachment]});
        } else {
            if(!canala) return;
            canala.send({content: `Bem vindo ao **${guild.name}** ${member}! Venha se divertir aqui!`, files: [attachment]});
        }
        if(achar2.role) {
            member.roles.add(achar2.role)
        }
        }
    }


}
  function makeid(length) {
                let result = '';
                let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }