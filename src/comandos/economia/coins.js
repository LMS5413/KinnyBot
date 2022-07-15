const db = require("../../../db");
const { MessageAttachment } = require('discord.js')
const path = require('path')
const Canvas = require('canvas')
const {registerFont} = require('canvas')
module.exports = {
    config: {
        nome: 'coins',
        aliases: ['money', 'conta', 'koins'],
        cooldown: 3,
        options: [{
            name: 'usuario',
            type: 'USER',
            description: 'User da pessoa',
            required: false,
        }],
    },
    run: async(client, message, args) => {
        let id = message.options?.getString('usuario')
        let mencao = client.users.cache.get(!id ? message.user.id:id.replace(/[<@!>]/g, '')) || await client.users.fetch(!id ? message.user.id:id.replace(/[<@!>]/g, ''));
        let achar = await db.coins.findOne({id: mencao.id})
        if (!achar) {
            message.reply(`${client.user.username} - Diversão \n Você não tem dinheiro :(. Jogue no daily e ganhe um dinheirinho!`)

        } else {
            function numeroFormatado(num) {
                let numero = num
                let formato = ''
                if (numero >= 1000000000000000) {
                    formato = ' Q'
                    return numero / 1000000000000000 + `${formato}`
                }
                if (numero >= 1000000000000) {
                    formato = ' T'
                    return numero / 1000000000000 + `${formato}`
                }
                if (numero >= 1000000000) {
                    formato = ' B'
                    return numero / 1000000000 + `${formato}`
                }
                if(numero >= 1000000) {
                    formato = ' M'
                    return numero / 1000000 + `${formato}`
                }
                if (numero >= 1000) {
                    formato = ' K'
                    return numero / 1000 + `${formato}`
                }
                return numero
            }
            let bank = achar.coinsb
            let som = numeroFormatado(achar.coinsc + bank)
            const canvas = Canvas.createCanvas(1365, 450);
            const ctx = canvas.getContext('2d');
            registerFont('./src/Canvas/Gotham-Black.otf', {family: 'Gotham-Black'});
            const applyText = (canvas, text) => {

                let fontSize = 65;

                do {
                    ctx.font = `${fontSize -= 10}px Gotham-Black`;
                } while (ctx.measureText(text).width > canvas.width - 300);
                return ctx.font;
            };
            const background = await Canvas.loadImage(String(path.resolve(__dirname,'..', '..', 'Canvas', 'Bank.png')));
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#ffffff';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            ctx.font = applyText(canvas, numeroFormatado(bank));
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${numeroFormatado(bank)}`, canvas.width / 9.0, canvas.height / 4.9);
            ctx.font = applyText(canvas, numeroFormatado(achar.coinsc));
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${numeroFormatado(achar.coinsc)}`, canvas.width / 9.0, canvas.height / 1.86);
            ctx.font = applyText(canvas, som)
            ctx.fillStyle = '#ffffff';
            const avatar = await Canvas.loadImage(mencao.displayAvatarURL({format: 'png'}));
            ctx.drawImage(avatar, 1049, 138, 170, 170);
            ctx.fillText(`${som}`, canvas.width / 9.0, canvas.height / 1.12);
            const attachment = new MessageAttachment(canvas.toBuffer(), 'Bank2.png');

            message.reply({files: [attachment]})
            }
        }
}