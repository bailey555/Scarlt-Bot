const { SlashCommandBuilder } = require('discord.js');
const { getUser } = require('./dbManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('saldo')
        .setDescription('Veja seu saldo atual 💰'),

    async execute(interaction) {
        const user = getUser(interaction.user.id);
        await interaction.reply(
            `💰 **Carteira:** ${user.money}\n🏦 **Banco:** ${user.bank}`
        );
    }
};
