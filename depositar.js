const { SlashCommandBuilder } = require('discord.js');
const { getUser, saveDB } = require('../../handlers/dbManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('depositar')
        .setDescription('Deposite dinheiro no banco')
        .addIntegerOption(opt =>
            opt.setName('valor').setDescription('Quantidade').setRequired(true)
        ),

    async execute(interaction) {
        const user = getUser(interaction.user.id);
        const amount = interaction.options.getInteger('valor');

        if (user.money < amount)
            return interaction.reply({ content: '❌ Dinheiro insuficiente.', ephemeral: true });

        user.money -= amount;
