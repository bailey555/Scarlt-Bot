require('dotenv').config();
const fs = require('fs');
const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');

// Carrega banco
let db = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
function saveDB() {
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
}

// Client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

// Carrega comandos
const commandFiles = fs.readdirSync('./commands/economia').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/economia/${file}`);
    client.commands.set(command.data.name, command);
}

// Eventos
client.once('ready', () => {
    console.log(`🤖 ${client.user.tag} está online!`);
    client.user.setActivity('👑 Economia funcionando', { type: ActivityType.Playing });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction, db, saveDB);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ Erro ao executar o comando!', ephemeral: true });
    }
});

// Login
client.login(process.env.TOKEN);

