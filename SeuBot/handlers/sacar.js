const { SlashCommandBuilder } = require('discord.js');
const { getUser, saveDB } = require('../../handlers/dbManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sacar')
        .setDescription('Saque dinheiro do banco')
        .addIntegerOption(opt =>
            opt.setName('valor').setDescription('Quantidade').setRequired(true)
        ),

    async execute(interaction) {
        const user = getUser(interaction.user.id);
        const amount = interaction.options.getInteger('valor');

        if (user.bank < amount)
            return interaction.reply({ content: '❌ Você não tem esse valor no banco!', ephemeral: true });

        user.bank -= amount;
        user.money += amount;
        saveDB();

        await interaction.reply(`🏧 Você sacou **${amount} moedas**.`);
    }
};
