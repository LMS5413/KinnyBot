const path = require('path');
const Canvas = require('canvas')
const Discord = require('discord.js')
module.exports = {
    config: {
        nome: 'tweet',
        cooldown: 10,
        options: [{
            name: 'tweet',
            type: 'STRING',
            description: 'Digite o que deseja postar no twitter!',
            required: true,
        }],
    },
    run: async (client, message, args) => {

        const canvas = Canvas.createCanvas(968, 428);
        const applyText = (canvas, text) => {

            let fontSize = 45;

            do {
                ctx.font = `${fontSize -= 1}px Arial`;
            } while (ctx.measureText(text).width > canvas.width - 1);
            return ctx.font;
        };
        const applyText2 = (canvas, text) => {

            let fontSize = 27;

            do {
                ctx.font = `${fontSize -= 1}px Arial`;
            } while (ctx.measureText(text).width > canvas.width - 1);
            return ctx.font;
        };
        const applyText3 = (canvas, text) => {

            let fontSize = 90;

            do {
                ctx.font = `${fontSize -= 5}px Arial`;
            } while (ctx.measureText(text).width > canvas.width - 1);
            return ctx.font;
        };
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage(String(path.resolve(__dirname, '..', '..', 'Canvas', 'tweet.png')));
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const membro = message.member
        ctx.strokeStyle = '#ffffff';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        let post = message.options?.getString('tweet')
        if(post.length > 152 ) return message.reply('Só pode no maximo 152 caracteres!')
        if(post.length < 5 ) return message.reply('Só pode no minimo 5 caracteres')
        ctx.font = applyText3(canvas, post);
        ctx.fillStyle = '#000000';
        ctx.fillText(`${post}`, canvas.width / 34.5, canvas.height / 2.0);
        ctx.fillStyle = '#8899A6';
        ctx.font = applyText2(canvas, membro.user.tag);
        ctx.fillText(`@${membro.user.tag}`, canvas.width / 5.2, canvas.height / 4.2);
        ctx.font = applyText(canvas, membro.user.username);
        ctx.fillStyle = '#000000';
        ctx.fillText(`${membro.user.username}`, canvas.width / 5.2, canvas.height / 6.6);
        ctx.arc(100, 78, 55, 0, Math.PI * 2, true);
        ctx.lineWidth = 15;
        ctx.stroke();
       ctx.closePath();
     ctx.clip()
       const desenho = await Canvas.loadImage(membro.user.displayAvatarURL({format: 'png'}));
     ctx.drawImage(desenho, 46, 23, 110, 110);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'tweet.png');
     message.reply({content: '<a:carregando:800011672122556447> Conectando com a internet', fetchReply: true}).then(editar => {
         setTimeout(() => {
             message.editReply({content: '<:certo:800838318651998239> Conectado com a internet'})
         }, 1000)
         setTimeout(() => {
            message.editReply('<:certo:800838318651998239> Conectado com a internet \n <a:carregando:800011672122556447> Criando o post! ')
         }, 3000)
         setTimeout(() => {
           message.editReply('<:certo:800838318651998239> Conectado com a internet \n<:certo:800838318651998239> Post criado! \n <a:carregando:800011672122556447> Postando')
         }, 6000)
         setTimeout(() => {
            message.editReply('<:certo:800838318651998239> Conectado com a internet \n<:certo:800838318651998239> Post criado! \n <:certo:800838318651998239> Postado')
            message.editReply({files: [attachment]});
         }, 12000)

     })

    }
}