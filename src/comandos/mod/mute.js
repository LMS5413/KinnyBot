const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const db = require('../../../db.js')
module.exports = {
    config: {
        nome: 'mute',
        aliases: ['mutar'],
        cooldown: 10,
        options: [
            {
                name: 'user',
                type: 'USER',
                description: 'Usuario que vai receber o mute!',
                required: true,
            },
            {
                name: 'motivo',
                type: 'STRING',
                description: 'Motivo do mute',
                required: false,
            }
        ],
    },
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MUTE_MEMBERS")) return message.reply(`${client.user.username} - Erro \n Você tem que ter a permissão \`Mutar membros!\``)
        if (!message.guild.me.permissions.has('MANAGE_ROLES')) return message.reply(`${client.user.username} - Erro \n<a:alerta:806274799638282311> Eu não tenho permissao \`Gerenciar Cargos\``)
        moment.locale('pt-br')
        let member = message.options?.getMember('user')
        if (!member) {
            message.reply(`${client.user.username} - Erro \n Mencione um membro`)
        }
        let mot = !message.options?.getString('motivo') ? "Sem motivo" : message.options?.getString('motivo')

        let grupo = message.guild.roles.cache.find(x => x.name === 'kinnymute')
        if (!grupo) {
            try {
                grupo = await message.guild.roles.create({
                    data: {
                        name: "kinnymute",
                        color: "#ff0000",
                        permissions: ['SEND_MESSAGES', 'ADD_REACTIONS']
                    },
                    reason: 'Cargo necessário para silenciar usuários.'
                })
                message.guild.channels.cache.forEach(canal => {
                    canal.permissionOverwrites.edit(grupo, { SEND_MESSAGES: false })
                })
            } catch (e) {
                console.log(e.stack);
                message.reply(`${client.user.username} - Erro Interno \n Ocorreu um erro que apenas o <@395995293436477442> Saiba do erro! `)
            }
        }
        let memberm = await db.muteds.findOne({ guildId: message.guild.id })
        if (memberm) {
            if (memberm.memberid === message.user.id) return message.reply(`${client.user.username} - Erro \n Essa pessoa já esta mute!`)
            return;
        }
        member.roles.add(grupo)
        message.reply(`${client.user.username} - Sucesso \n Essa pessoa foi mute com sucesso!`)
        const embed = new MessageEmbed()
            .setColor('#FF0000')
            .setThumbnail(message.user.displayAvatarURL({ dynamic: true, format: 'png' }))
            .addField(`${client.user.username} - Você foi Mutado!`, 'Olá! Um adminstrador de um servidor me obrigou a te mutar no servidor dele, eu não posso fazer nada. Mais posso te dar algumas informação \n \n')
            .addField('Grupo que você foi mutado', `${message.guild.name}`)
            .addField('Autor do mute', `${message.user}`)
            .addField('Motivo', `${mot} \n \n`)
            .setFooter({text: `Seu punimento foi aplicado ${moment(message.createdAt).calendar()}`})
        member.send({ embeds: [embed] })
        message.guild.channels.cache.forEach(async (channel, id) => {
            await channel.createOverwrite(grupo, {
                SEND_MESSAGES: false
            })
        });
        await db.muteds.create({
            guildId: message.guild.id,
            memberid: member.id,
            roleid: grupo.id
        })
    }
}