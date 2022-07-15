module.exports = (client, node, error) => {
    console.log(`[LAVALINK] Ocorreu um erro no node ${node.identifier}! Motivo: ${error}`.red);
};
