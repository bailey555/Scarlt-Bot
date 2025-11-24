const { SlashCommandBuilder } = require('discord.js');
const { getUser, saveDB } = require('./dbManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pagar')
        .setDescription('Pague moedas a outro usuário')
        .addUserOption(opt =>
            opt.setName('usuário').setDescription('Quem vai receber').setRequired(true)
        )
        .addIntegerOption(opt =>
            opt.setName('valor').setDescription('Quantidade').setRequired(true)
        ),

    async execute(interaction) {
        const author = getUser(interaction.user.id);
        const targetUser = interaction.options.getUser('usuário');
        const target = getUser(targetUser.id);
        const amount = interaction.options.getInteger('valor');

        if (amount <= 0)
            return interaction.reply({ content: '⚠️ Valor inválido.', ephemeral: true });

        if (author.money < amount)
            return interaction.reply({ content: '❌ Você não tem dinheiro suficiente.', ephemeral: true });

        author.money -= amount;
        target.money += amount;
        saveDB();

        await interaction.reply(`💸 Você enviou **${amount} moedas** para **${targetUser.username}**.`);
    }
};
