const Command = require('../../structures/Command')
const Discord = require('discord.js')
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const delaye = 500

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'adicionar',
            aliases: ['add'],
            description: '.',
            cooldown: 5
        })
    }
    run = async (client, message, args) => {

        if (!message.member.permissions.has('MANAGE_GUILD')) return message.reply({ content: 'Você não tem permissão para utilizar este comando!' })

        let argumentss = args.slice(1).join(' ')
        let embed = new Discord.MessageEmbed()
            .setTitle('Emojis adicionados')
            .setColor('RED')
        if (argumentss.startsWith('emoji')) {
            let emojiArray = await addEmoji(args.slice(1))
            embed.addFields(emojiArray)
            await message.channel.send({ embeds: [embed] })

        }
        async function addEmoji(emoji_array) {
            let array_final = []
            for (const emojis of emoji_array) {
                const getEmoji = Discord.Util.parseEmoji(emojis)
                if (getEmoji.id) {
                    const emojiType = getEmoji.animated ? '.gif' : '.png'
                    const emojiURL = `https://cdn.discordapp.com/emojis/${getEmoji.id + emojiType}?size=40&quality=lossless`

                    await delay(delaye)
                    let emoji = await message.guild.emojis.create(emojiURL, getEmoji.name)
                    array_final.push({ name: `${emoji.name} adicionado!`, value: `Emoji: ${emoji}` })
                }
            }
            return array_final;
        }
    }
}