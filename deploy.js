require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];

const basePath = path.join(__dirname, 'commands');
for (const folder of fs.readdirSync(basePath)) {
    const files = fs.readdirSync(path.join(basePath, folder)).filter(f => f.endsWith('.js'));

    for (const file of files) {
        const cmd = require(path.join(basePath, folder, file));
        commands.push(cmd.data.toJSON());
    }
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
