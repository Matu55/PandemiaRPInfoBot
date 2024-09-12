const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Projekt uruchomiony!");
});

app.get("/", (req, res) => {
  res.send("Hello World! This is info bot made for Pandemia RP");
});

const Discord = require('discord.js');

const client = new Discord.Client({ intents: [ Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.MessageContent, Discord.GatewayIntentBits.GuildMembers ], partials: [Discord.Partials.Message, Discord.Partials.Channel, Discord.Partials.Reaction] })

const commands = require("./commands.js")

const adminChannelID = process.env['adminChannelID'];
const announceChannelID = process.env['announceChannelID'];
const pdChannelID = process.env['pdChannelID'];
const dojChannelID = process.env['dojChannelID'];

client.on("ready", () => {
  console.log("Bot jest gotowy!");

  if (commands) {
    console.log("Plik z komendami wczytany // sprawdź czy nie ma żadnych błędą wyżej w konsoli")
  }
})

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("/ServerUpdate") && message.channel.id === adminChannelID) {
    const announceChannel = client.channels.cache.get(announceChannelID); 

    if (announceChannel) {
      announceChannel.send(message.content.slice(13));
      message.delete();
    }
  }

  if (message.content.startsWith("/PDupdate") && message.channel.id === adminChannelID) {
    const announceChannel = client.channels.cache.get(pdChannelID); 

    if (announceChannel) {
      announceChannel.send(message.content.slice(9));
      message.delete();
    }
  }

  if (message.content.startsWith("/DOJupdate") && message.channel.id === adminChannelID) {
    const announceChannel = client.channels.cache.get(dojChannelID); 

    if (announceChannel) {
      announceChannel.send(message.content.slice(10));
      message.delete();
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return false;

  //=================================================================================================//

  if(interaction.commandName === "wlwerdykt") {
    const Channel = client.channels.cache.get(interaction.options.getChannel("kanal").id); 

    if (Channel) {
      const admin = interaction.user.tag;
      const zdajacydc = interaction.options.getUser("discord");

      const werdykt = interaction.options.getString("werdyktwl");
      const notatka = interaction.options.getString("notatka");

      if (werdykt !== null) {
        if (werdykt.toLowerCase() === "zdane") {
          const Embed = new Discord.EmbedBuilder()
          .setColor('#7c00ff')
          .setTitle('Zdane Whitelist!')
    
          .setAuthor({ name: 'PandemiaRP', iconURL: 'https://cdn.discordapp.com/attachments/1218542014367400006/1255964374636560434/server-icon.png?ex=667f0b79&is=667db9f9&hm=ab89e9c825063966abfd4ca531652e2a91d23359d9e1104759c21036fa5e04bf&' })
          .setDescription('Gratulacje, życzymy miłej rozgrywki!')
          .setThumbnail('https://cdn.discordapp.com/attachments/1218542014367400006/1255964374636560434/server-icon.png?ex=667f0b79&is=667db9f9&hm=ab89e9c825063966abfd4ca531652e2a91d23359d9e1104759c21036fa5e04bf&')
          .addFields(
            { name: 'WL-Checker', value: admin, inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'Osoba Zdająca', value: zdajacydc.tag, inline: true },
            { name: 'Werdykt', value: werdykt, inline: true },
            { name: 'Notatka WL-Checkera', value: notatka, inline: true },
          )
          .setTimestamp()
          .setFooter({ text: 'PandemiaRP Bot', iconURL: 'https://cdn.discordapp.com/attachments/1218542014367400006/1255964374636560434/server-icon.png?ex=667f0b79&is=667db9f9&hm=ab89e9c825063966abfd4ca531652e2a91d23359d9e1104759c21036fa5e04bf&' });
    
          Channel.send({ embeds: [Embed] });
          
          const member = interaction.guild.members.cache.get(zdajacydc.id)
    
          member.roles.remove(process.env['niezdaneWLRoleID']);
          member.roles.add(process.env['zdaneWLRoleID']);
          
        } else if(werdykt.toLowerCase() === "nie zdane") {
          const Embed = new Discord.EmbedBuilder()
          .setColor('#2e015d')
          .setTitle('Niezdane Whitelist!')
    
          .setAuthor({ name: 'PandemiaRP', iconURL: 'https://cdn.discordapp.com/attachments/1218542014367400006/1255964374636560434/server-icon.png?ex=667f0b79&is=667db9f9&hm=ab89e9c825063966abfd4ca531652e2a91d23359d9e1104759c21036fa5e04bf&' })
          .setDescription('Przykro nam, może następnym razem się uda!')
          .setThumbnail('https://cdn.discordapp.com/attachments/1218542014367400006/1255964374636560434/server-icon.png?ex=667f0b79&is=667db9f9&hm=ab89e9c825063966abfd4ca531652e2a91d23359d9e1104759c21036fa5e04bf&')
          .addFields(
            { name: 'WL-Checker', value: admin, inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'Osoba Zdająca', value: zdajacydc.tag, inline: true },
            { name: 'Werdykt', value: werdykt, inline: true },
            { name: 'Notatka WL-Checkera', value: notatka, inline: true },
          )
          .setTimestamp()
          .setFooter({ text: 'PandemiaRP Bot', iconURL: 'https://cdn.discordapp.com/attachments/1218542014367400006/1255964374636560434/server-icon.png?ex=667f0b79&is=667db9f9&hm=ab89e9c825063966abfd4ca531652e2a91d23359d9e1104759c21036fa5e04bf&' });
    
          Channel.send({ embeds: [Embed] });
        }
      }
    }
  }

  //=================================================================================================//

  if(interaction.commandName === "help") {
    interaction.reply({ content: "**POMOC** // Komendy bota to: /WLWerdykt {Discord}, {Nick}, {Powód} // komenda /help nie jest tu uwzględniona bo musiałeś/aś jej użyć by to zobaczyć :D", ephemeral: true })
  }
})

client.login(process.env['token']);
