const { SlashCommandBuilder } = require('discord.js');
const { db } = require('../../handlers/dbManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('top')
        .setDescription('Veja o ranking dos mais ricos'),

    async execute(interaction) {
        const ranking = Object.entries(db)
            .sort((a, b) => (b[1].money + b[1].bank) - (a[1].money + a[1].bank))
            .slice(0, 10);

        let msg = '🏆 **Top 10 mais ricos:**\n\n';

        ranking.forEach(([id, data], i) => {
            msg += `**${i + 1}.** <@${id}> — 💰 ${data.money + data.bank}\n`;
        });

        await interaction.reply(msg);
    }
};
