const { SlashCommandBuilder } = require('discord.js');
const { getUser, saveDB } = require('./dbManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Receba seu prêmio diário!'),

    async execute(interaction) {
        const user = getUser(interaction.user.id);
        const amount = 200;
        user.money += amount;
        saveDB();

        await interaction.reply(`🎉 Você recebeu **${amount} moedas** hoje!`);
    }
};
