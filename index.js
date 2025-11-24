require('dotenv').config();
const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');

// Cria o client com todas as intenções necessárias
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,              // Necessário para comandos de guilda
        GatewayIntentBits.GuildMessages,       // Necessário para interações com mensagens
        GatewayIntentBits.MessageContent,      // Necessário para ler o conteúdo das mensagens
        GatewayIntentBits.GuildMembers,        // Necessário para interagir com membros do servidor
        GatewayIntentBits.GuildPresences       // Necessário se quiser status online/ausente
    ]
});

client.commands = new Collection();

// Lista de comandos na raiz
const commandFiles = ['daily.js', 'depositar.js', 'pagar.js', 'sacar.js', 'saldo.js', 'top.js'];

for (const file of commandFiles) {
    const command = require(`./${file}`);
    client.commands.set(command.data.name, command);
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
        console.error('❌ Erro ao executar comando:', err);
        await interaction.reply({ content: '❌ Erro ao executar este comando.', ephemeral: true });
    }
});

client.login(process.env.TOKEN);
