require('dotenv').config();
const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
for (const folder of fs.readdirSync(commandsPath)) {
    const folderPath = path.join(commandsPath, folder);
    const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

    for (const file of files) {
        const command = require(path.join(folderPath, file));
        client.commands.set(command.data.name, command);
    }
}

client.once('ready', () => {
    console.log(`🤖 ${client.user.tag} está online!`);
    client.user.setActivity('💰 Economia ativa', { type: ActivityType.Playing });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err);
        await interaction.reply({ content: '❌ Erro ao executar este comando.', ephemeral: true });
    }
});

client.login(process.env.TOKEN);
