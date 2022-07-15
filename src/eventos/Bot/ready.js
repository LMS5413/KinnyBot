require('colors');
const { MessageEmbed } = require('discord.js');
const db = require('../../../db');

module.exports = async client => {
    client.manager.start(client.user.id);
    console.log(`\n[CLIENT] O bot ${client.user.tag} foi ligado com sucesso!\n`.cyan);

    setInterval(async () => {
        let infogive = await db.give.find({ end: false });

        if (infogive.length > 0) {
            infogive.forEach(async xy => {
                if (xy.timestamp > Date.now()) return;
                await db.give.findOneAndUpdate({ messageID: xy.messageID }, { end: true });
                let ganhador = xy.participants;
                const embed = new MessageEmbed()
                    .setColor('#9900f8')
                    .setTitle(xy.title)
                    .setDescription(`Sorteio encerrado! Vencedor anunciado embaixo!\n\nOBS: Caso o dono do sorteio não entregar o que prometeu denuncie para ao LMS5413!`)
                    .setFooter({ text: `Sorteio encerrado!` });

                let channel = await client.channels.fetch(xy.channel).catch(() => {
                    return null;
                });
                if (channel) {
                    let msg = await channel.messages.fetch(xy.messageID).catch(() => {
                        return null;
                    });
                    if (msg) {
                        const user = async (us) => {
                            return await client.users.fetch(us).catch(e => {
                                return "User nulo";
                            })
                        }
                        let winnern = [];
                        if (ganhador.length >= Number(xy.winners)) {
                            for (let i = 0; i < Number(xy.winners); i++) {
                                winnern.push((await user(ganhador[Math.floor(Math.random() * ganhador.length)])).toString());
                            }
                        } else {
                            winnern.push((await user(ganhador[Math.floor(Math.random() * ganhador.length)])).toString());
                        }
                        channel.send(`O ganhador do sorteio foi ${ganhador.length === 0 ? "Ninguém participou!":winnern.join(", ")}`);
                        msg.components[0].components[0].disabled = true;
                        msg.edit({ embeds: [embed], components: msg.components });
                    }
                }
            });
        }

        const status = [
            {
                type: 'STREAMING',
                message: 'Kinny! Melhor bot de discord.',
                url: 'https://www.twitch.tv/sla',
            },
            {
                type: 'WATCHING',
                message: `Agora eu estou em ${client.guilds.cache.size} servidores!`,
                url: 'https://www.twitch.tv/sla',
            },
        ];
        const random = status[Math.floor(Math.random() * status.length)];
        client.user.setActivity(random.message, { type: random.type, url: random.url, browser: 'Discord IOS' });
    }, 6000);

    client.commands.forEach(comandos => {
        if (comandos.config.categoria === 'developer') return;

        const data = {
            name: comandos.config.nome,
            description: !comandos.config.descricao ? 'Sem descrição' : comandos.config.descricao,
        };

        if (comandos.config.options) {
            data.options = comandos.config.options;
        }

        if (client.user.id === '744285461492793445') {
            return client.guilds.cache.get('800349226919788586').commands.create(data).catch(error => {
                console.log(`[SLASH COMMANDS] Um erro aconteceu ao tentar criar slash commands! Erro: ${error.message}`.red);
            });
        } else {
            client.application?.commands.create(data).catch(error => {
                console.log(`[SLASH COMMANDS] Um erro aconteceu ao tentar criar slash commands! Erro: ${error.message}`.red);
            });
        }
    });

    console.log('[SLASH COMMANDS] Slash commands iniciado com sucesso (Lembrando que pode demorar 1 hora)'.green);

    let cmds = await client.application.commands.fetch();
    cmds.forEach(cm => {
        if (client.commands.find(x => x.config.nome === cm.name)) return;
        client.application.commands.delete(cm.id).catch(e => console.log(e));
    });
};
