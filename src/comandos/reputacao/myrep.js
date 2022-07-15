const db  = require('../../../db')
const { MessageEmbed, MessageAttachment } = require('discord.js')
const Canvas =  require('canvas')
const path = require('path')
const { registerFont } = require('canvas')
module.exports = {
    config: {
        nome: 'myrep',
        aliases: ['minhasreps', 'myreps', 'minhasreputacao'],
        options: [
            {
            name: 'user',
            type: 'STRING',
            description: 'User da pessoa',
            required: false,
        },
    ]
    },
    run: async(client, message) => {
        let id = message.options?.getString('user')?.id
        let membro1 = client.users.cache.get(!id ? message.user.id:id.replace(/[<@!>]/g, '')) || await client.users.fetch(!id ? message.user.id:id.replace(/[<@!>]/g, ''));
        const membro2 = await db.reps.findOne({id: membro1})
        if(!membro2) {
            const canvas = Canvas.createCanvas(1365, 400);
            const ctx = canvas.getContext('2d');
            registerFont('./src/Canvas/Gotham-Black.otf', {family: 'Gotham-Black'});
            const applyText = (canvas, text) => {

                let fontSize = 40;

                do {
                    ctx.font = `${fontSize -= 1}px Gotham-Black`;
                } while (ctx.measureText(text).width > canvas.width - 300);
                return ctx.font;
            };
            const background = await Canvas.loadImage(String(path.resolve(__dirname,'..', '..', 'Canvas', 'reps.png')));
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#ffffff';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            ctx.font = applyText(canvas, '0');
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`0`, canvas.width / 8.0, canvas.height / 3.4);
            ctx.font = applyText(canvas, 'Ninguem');
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`Ninguem`, canvas.width / 8.0, canvas.height / 1.28);
            const attachment = new MessageAttachment(canvas.toBuffer(), 'reputacao.png');

           return message.reply(attachment)
        } else {
            const canvas = Canvas.createCanvas(1365, 400);
            const ctx = canvas.getContext('2d');
            registerFont('./src/Canvas/Gotham-Black.otf', {family: 'Gotham-Black'});
            const applyText = (canvas, text) => {

                let fontSize = 40;

                do {
                    ctx.font = `${fontSize -= 1}px Gotham-Black`;
                } while (ctx.measureText(text).width > canvas.width - 300);
                return ctx.font;
            };
            const background = await Canvas.loadImage(String(path.resolve(__dirname,'..', '..', 'Canvas', 'reps.png')));
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#ffffff';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            ctx.font = applyText(canvas, `${membro2.reps}`);
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${membro2.reps}`, canvas.width / 8.0, canvas.height / 3.4);
            ctx.font = applyText(canvas, `${client.users.cache.get(membro2.membro).username}`);
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${client.users.cache.get(membro2.membro).username}`, canvas.width / 8.0, canvas.height / 1.28);
            const attachment = new MessageAttachment(canvas.toBuffer(), 'reputacao.png');

          return message.reply(attachment)
        }
    }
}