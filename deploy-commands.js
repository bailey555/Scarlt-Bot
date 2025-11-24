require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands/economia').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/economia/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('🔄 Registrando Slash Commands...');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );
        console.log('✨ Slash Commands registrados com sucesso!');
    } catch (error) {
        console.error(error);
    }
})();
