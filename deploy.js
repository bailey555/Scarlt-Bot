require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [];

// Lista de comandos na raiz
const commandFiles = ['daily.js', 'depositar.js', 'pagar.js', 'sacar.js', 'saldo.js', 'top.js'];

for (const file of commandFiles) {
    const cmd = require(`./${file}`);
    commands.push(cmd.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('🔄 Registrando comandos...');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );
        console.log('✨ Comandos registrados!');
    } catch (err) {
        console.error('❌ Erro ao registrar comandos:', err);
    }
})();
