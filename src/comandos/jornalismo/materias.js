const db = require('../../../db')
const { MessageEmbed } = require('discord.js')
const lang = require('../../../langs.json')
const SimplDB = require('simpl.db');
const dba = new SimplDB();
module.exports = {
    config: {
        nome: 'materias',
        options: [
            {
                name: 'materia',
                type: 'STRING',
                required: true,
                description: 'Nome da matéria'
            }
        ]
    },
    run: async(client, message, args ) => {
        const jor = await db.empr.find()
        const filtropt = jor.filter(x => x.lang === 'pt')
        const filtroen = jor.filter(x => x.lang === 'en')
        const lan = await db.lgs.findOne({guildID: message.user.id})
        if(!message.options.getString('materia')) {
        const embed = new MessageEmbed()
        .setColor('#9900f8')
        .setTitle(`${client.user.username} - ${lan && lan.lang == 'en' ? "Newspaper":"Jornal"}`)
        .addField(lan && lan.lang == 'en' ? 'All materials created':'Todas as materias criadas', lan && lan.lang === 'en' ? filtroen.map(x => x?.materias?.map(m => m.titulo)).filter(m => m[0]).join('\n') || "No materials to be listed":filtropt.map(x => x?.materias?.map(m => m.titulo)).filter(m => m[0]).join('\n') || "Sem materias para ser listadas", true)

        message.reply({embeds: [embed]})
        } else {
            let espectadores = client["comandos"+message.user.id] ? client["comandos"+message.user.id] += 1 : client["comandos"+message.user.id] = 1
            let materias = []
            let langa = lan && lan.lang === 'en' ? filtroen:filtropt
            langa.map(x => x.materias).forEach(j => j.forEach(m => {
              if (m.titulo === message.options.getString('materia')) materias.push(m)
            }))
            
            const materia = materias[0]
            if(!materia) return message.reply('Essa materia não existe!')
            let bool = lan && lan.lang
            const arrays = []
            const json = dba.toJSON()
            Object.keys(json).forEach(k => arrays.push(json[k].especa))
            if(arrays.some(x => message.user.id.includes(x))) return message.reply('Você já esta espectando')
            dba.add(`jornal-${materia.jornal}.espec`, 1);
            dba.push(`jornal-${materia.jornal}.especa`, message.user.id)
            const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username} - ${lan && lan.lang == 'en' ? "Newspaper":"Jornal"}`)
            .addField(`${bool ? lang.en.nomemateria:lang.pt.nomemateria}`, `${materia.titulo}`, true)
            .addField(`${bool ? lang.en.materia:lang.pt.materia}`, `${materia.materia}`)
            .addField(`${bool ? lang.en.autor:lang.pt.autor}`, `${materia.jornalistas}`, true)
            .addField(`${bool ? lang.en.jornal:lang.pt.jornal}`, `${materia.jornal}`, true)
            .setFooter({text: `Você está espectando essa materia! para não espectar ela clique no ❌ Agora tem ${dba.get(`jornal-${materia.jornal}.espec`)} ${dba.get(`jornal-${materia.jornal}.espec`) == 1 ? "espectador":"espectadores"}`})
            message.reply({embeds: [embed]}).then(reagi => {
                
                reagi.react('❌')
                const filter = (reaction, user) => {
                    return reaction.emoji.name === '❌' && user.id === message.user.id
                };
                
                const collector = reagi.createReactionCollector({filter: filter, time: 3*60000});
                
                collector.on('collect', async(reaction, user) => {
                    let es = await db.empr.findOne({nametolower: materia.jornal.toLowerCase()})
                   await db.empr.findOneAndUpdate({nametolower: materia.jornal.toLowerCase()}, {espectadores: 0, espectadorestotal: es.espectadores + dba.get(`jornal-${materia.jornal}.espec`)})
                    reagi.delete()
                    dba.set(`jornal-${materia.jornal}.espec`, dba.get(`jornal-${materia.jornal}.espec`) - 1);
                    message.reply(`Você parou de assistir o jornal e agora ele tem ${dba.get(`jornal-${materia.jornal}.espec`)} ${dba.get(`jornal-${materia.jornal}.espec`) == 1 ? "espectador":"espectadores"}`)
                    if(dba.get(`jornal-${materia.jornal}.espec`) === 0) return dba.clear()
                })
            		collector.on('stop', async (collected) => {
                	reagi.delete()
                    dba.set(`jornal-${materia.jornal}.espec`, dba.get(`jornal-${materia.jornal}.espec`) - 1);
                    message.reply(`O tempo de assistir jornal acabou agora esse jornal tem ${dba.get(`jornal-${materia.jornal}.espec`)} ${dba.get(`jornal-${materia.jornal}.espec`) == 1 ? "espectador":"espectadores"}`)
                    if(dba.get(`jornal-${materia.jornal}.espec`) === 0) return dba.clear()
            	})
            })
            
        }

    }
}