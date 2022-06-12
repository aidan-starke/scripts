import { Client, MessageActionRow, MessageButton } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN || "";
const CHANNEL_ID = process.env.CHANNEL_ID || "";
const WEBHOOK_ID = process.env.WEBHOOK_ID || "";

//commands
import Ping from "./commands/ping";

//types
import { MessageType } from "./types/messageType";

const bot = new Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILDS",
  ],
}) as Client<true>;

//Prefix
const prefix = "!";

//create hashmap for imported commands files
const commands = new Map();
commands.set("ping", Ping);

let webhook;

bot.on("ready", async () => {
  console.log(`I am ready! Logged in as ${bot.user.tag}`);
  bot!.user.setActivity(`${prefix} ping`);
  const channel = bot.channels.cache.get(CHANNEL_ID);
  (channel as any).fetchWebhooks().then((hooks) => {
    webhook = hooks.find((hook) => hook.id === WEBHOOK_ID);
  });
  console.log({webhook});
  // webhook = await (channel as any).createWebhook("CENNZnet Governance", {
  //   avatar:
  //     "https://raw.githubusercontent.com/cennznet/app-hub/aded99dc4b695afe1d69eaa3f01871d08d92f9c0/libs/assets/vectors/cennznet-icon.svg",
  // });
});

//When there is a message in server
bot.on("messageCreate", async (message) => {
  //Ignore bot messages
  if (message.author.bot) return;

  //If the message does not start with the prefix return
  if (!message.content.startsWith(prefix)) return;

  const args: string[] = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  const command: string = args.shift()!.toLowerCase();

  //Check if the command exists in the hashmap. It returns undefined if it doesn't exist
  const currCommand = commands.get(command);

  //If the currCommand is not undefined,
  if (currCommand) {
    currCommand.execute(message, args, webhook);

    // const row = new MessageActionRow();
    //     .addComponents(
    //       new MessageButton()
    //         .setCustomId('primary')
    //         .setLabel('Primary')
    //         .setStyle('PRIMARY'),
    //     );
    //     message.channel.send({components: [row]})
  } else
    message.channel.send(
      `Command not found! Type ${prefix} help to see all commands`
    );
});

bot.on("interactionCreate", (interaction) => {
  console.log({ interaction });
});

bot.login(DISCORD_TOKEN);
