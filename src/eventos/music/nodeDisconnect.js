module.exports = (client, node, code, reason) => {
    console.log(`[LAVALINK] O node ${node.identifier} foi desconectado! Motivo: ${reason}`.red);
};
