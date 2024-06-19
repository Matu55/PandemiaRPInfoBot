const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Projekt uruchomiony!");
});

app.get("/", (req, res) => {
  res.send("Hello World! This is info bot made for Pandemia RP");
});

const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const adminChannelID = process.env['adminChannelID'];
const announceChannelID = process.env['announceChannelID'];
const pdChannelID = process.env['pdChannelID'];
const dojChannelID = process.env['dojChannelID'];

client.on("ready", () => {
  console.log("Bot jest gotowy!");
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


client.login(process.env['token']);
