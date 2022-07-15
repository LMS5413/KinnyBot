const  { MessageEmbed, MessageAttachment } = require('discord.js')
const path = require('path');
const Canvas = require('canvas')
const { registerFont } = require('canvas');

module.exports = {
    config: {
        nome: 'ship',
        cooldown: 10,
        options: [
          {
            name: 'name1',
            type: 'USER',
            required: true,
            description: "Digite o nome do primeiro usuário"
          },
          {
            name: 'name2',
            type: 'USER',
            required: true,
            description: "Digite o nome do segundo usuário"
          }
        ]
        
    },
    run: async(client, message, args) => {
    let autor = message.options.getMember('name1')
    let mencao = message.options.getMember('name2')
    const canvas = Canvas.createCanvas(1000, 333);
    const ctx = canvas.getContext('2d');
    registerFont('./src/Canvas/Gotham-Black.otf', {family: 'Gotham-Black'});
const applyText = (canvas, text) => {

    let fontSize = 65;

    do {
        ctx.font = `${fontSize -= 10}px Gotham-Black`;
    } while (ctx.measureText(text).width > canvas.width - 300);
    return ctx.font;
};
const background = await Canvas.loadImage(String(path.resolve(__dirname,'..', '..', 'Canvas', 'heart.png')));
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
ctx.strokeStyle = '#ffffff';
ctx.strokeRect(0, 0, canvas.width, canvas.height);
const avatar = await Canvas.loadImage(mencao.displayAvatarURL({format: 'png'}));
const avatar2 = await Canvas.loadImage(autor.displayAvatarURL({format: 'png'}));
const random = getLovePercentage(autor.user.username, mencao.user.username)
ctx.font = applyText(canvas, random);
ctx.fillStyle = '#ffffff';
ctx.fillText(`${random}%`, canvas.width / 2.2, canvas.height / 1.9);
ctx.drawImage(avatar, 161, 89, 145, 145);
ctx.drawImage(avatar2, 725, 89, 145, 145);
const attachment = new MessageAttachment(canvas.toBuffer(), 'heart.png');

function progressBar(current, total, barSize) {
    const progress = Math.round((barSize*current)/total)
  
    return '█'.repeat(progress) + '.'.repeat(barSize-progress)
  }

let barra = progressBar(random, 100, 10)
    const embed = new MessageEmbed()
        .setColor('#9900f8')
        .addField(`${client.user.username} - Diversão`, `Será que \`${autor.user.username}\` e \`${mencao.user.username}\` se amam? \n \`[${barra}] ${random}%\` \n ${random < 67 ? random === 0 ? "Eca.... Eles se amam não":"Quuuase se amando mais ainda não é grande!":"Sim SIM SIM! PERFEITOOOOOOOO!"}`)
        .setImage('attachment://heart.png')
    message.reply({embeds: [embed], files: [attachment]})
}

}
function getLovePercentage(name1, name2) {
    let concat = [name1, name2].sort((a,b) => a.localeCompare(b)).join('').toLowerCase()
    let counter = ''
    while(concat.length) {
      counter += concat.match(new RegExp(concat[0], 'gi')).length
      concat = concat.split('').filter(c => c !== concat[0]).join('')
    }
    return +_reduce(counter)
  }
  
  function _reduce(counter) {
    let result = ''
    while(counter.length >= 2) {
      result += (+counter[0] + (+counter[counter.length-1]))
      counter = counter.substring(1, counter.length-1)
    }
    result += counter
    return result <= 100 ? result : _reduce(result)
  }