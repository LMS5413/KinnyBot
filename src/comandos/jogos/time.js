const { MessageAttachment } = require('discord.js')
const path = require('path');
const Canvas = require('canvas')
module.exports = {
    config: {
        nome: 'time',
        cooldown: 10,
        options: [
            {
                name: 'time',
                type: 'STRING',
                description: 'Tempo que irá do mundo',
                required: true,
                choices: [
                    {
                        name: 'dia',
                        value: 'day'
                    },
                    {
                        name: 'noite',
                        value: 'night'
                    }
                ]
            },
            {
                name: 'usuario',
                type: 'STRING',
                description: 'Usuario que deseja aparecer no sol do minecraft!',
                required: false,
            }
        ],
    },
    run: async (client, message, args) => {
        let obj = new Object()
        try {
            var user = (await message.guild.members.fetch()).find(a => a.user.id == (message.options.getString("usuario")?.replace(/[<@!>]/g, '')))
        } catch (e) {
            if(e.code === 0) return;
            console.log(e)
        }
        if(!user) {
            user = message.user ?? message.user
        }
        let time = message.options?.getString('time')?.toLowerCase()
        if(!time) return message.reply('Você deve informar um tempo! (night, day)')
        if (time === 'day') {
            obj.coords = { x: 585, y: 171, xd: 131, yd: 132 }
            obj.image = "soli.png"
        }
        if (time === 'night') {
            obj.coords = { x: 398, y: 210, xd: 120, yd: 120 }
            obj.image = "noite.png"
        }
        const canvas = Canvas.createCanvas(1919, 1018);
        const background = await Canvas.loadImage(String(path.resolve(__dirname, '..', '..', 'Canvas', obj.image)));
        const ctx = canvas.getContext('2d');
        const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'png' }));
        ctx.drawImage(avatar, obj.coords.x, obj.coords.y, obj.coords.xd, obj.coords.yd);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const attachment = new MessageAttachment(canvas.toBuffer(), 'soli.png');

        message.reply({ files: [attachment] })
    }
}