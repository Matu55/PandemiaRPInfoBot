const Discord = require('discord.js')

const botID = process.env['botID'];
const serverID = process.env['serverID'];
const botToken = process.env['token'];

const rest = new Discord.REST({ version: '10' }).setToken(botToken);
const slashRegister = async () => {
    try {
        console.log('Próbowanie utworzenia komend!');

        await rest.put(Discord.Routes.applicationGuildCommands(botID, serverID), {
            body: [

                //=================================================================================================//

                new Discord.SlashCommandBuilder()
                .setName('WLWerdykt')
                .setDescription('Wyślij wiadomość o zdaniu whitelist przez gracza')
                .addChannelOption(option => {
                    return option 
                    .setName('kanal')
                    .setDescription('Wybierz kanał na który zostanie wysłane powiadomienie o zdanej whitelist')
                    .setRequired(true)
                })
                .addUserOption(option => {
                    return option
                    .setName('discord')
                    .setDescription('Wybierz użytkownika który zdał whitelist')
                    .setRequired(true)
                })
                .addStringOption(option => {
                    return option
                    .setName('werdyktwl')
                    .setDescription('jaki werdykt? Wpisz: zdane lub nie zdane')
                    .setRequired(true)
                })
                .addStringOption(option => {
                    return option
                    .setName('notatka')
                    .setDescription('Podaj dodatkowe informacje')
                    .setRequired(true)
                }),

                //=================================================================================================//

                new Discord.SlashCommandBuilder()
                .setName('help')
                .setDescription('Wyjaśnia komendy bota')
            ],
        });
        console.log('Komendy zostały utworzone!');
    } catch (error) {
        console.log('Wystąpił błąd podczas tworzenia komend!');
        console.error(error)
    }
}
slashRegister();