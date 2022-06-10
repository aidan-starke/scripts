// import { REST }from '@discordjs/rest';
// import { Client, Intents } from 'discord.js';
//@ts-ignore
import Discord from 'discord.js';

import { Routes }from 'discord-api-types/v10';

const BOT_SECRET ="OTg0NTc2MDY5MTExODA4MDUx.GNqcyW.WDjazUvOBvB65TN73SnwG6_tjDpuLSoCAstpWo"

const CLIENT_ID="984576069111808051"
const GUILD_ID="984578826887630899"
const IDENTITY_ROLE_ID: string = "956340150982545439"; // ID for role rewarded after completing identity steps

const CHANNEL_ID="984578826887630902"

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });

bot.on("ready", () => {
  console.log("beep boop")
})


bot.on("ready", async () => {
    console.log(">> Discord Bot started");
});

bot.on("interactionCreate", (interaction) => {
  console.log({interaction});
})

bot.on('messageCreate', async (msg) => {
    // For testing purposes
    console.log("msg", msg)
    if (msg.channel.type === "DM") {
        if (msg.content === "!role") {
            await assignIdentityRole(`${msg.author.username}#${msg.author.discriminator}`);
        }
    }
});

bot.login(BOT_SECRET)
// Assigns the identity role to a user in the CENNZnet Discord server
// rawName should be a string of format "KendrickLamar#0425"
async function assignIdentityRole(rawName: string) {
    if (!bot) return;
    const [username, discriminator] = splitUsername(rawName);
    try {
        const guildCache = bot.guilds.cache.get(GUILD_ID);
        await guildCache.members.fetch();
        const user = guildCache.members.cache.find(user => {
            return user.user.username === username && user.user.discriminator === discriminator
        });
        const identity_role = guildCache.roles.cache.find(role => role.id === IDENTITY_ROLE_ID);
        await user.roles.add(identity_role);
        // Send a message to the user letting them know the verification has been successful
        await user.send(
            `***Congratulations on completing the steps for verifying your identity.*** \n\n` +
            `Thank you for supporting CENNZnet and helping to build the blockchain for the Metaverse!\n` +
            `You have been assigned the ${identity_role.name} role and can now participate in private channels\n` +
            `Please note that for your safety, we will never ask for private keys, seed phrases or send links via DM.`
        );
        console.log(`>> Role assigned for: ${username}`);
    } catch (e) {
        console.log(">> Error assigning role");
        console.log(e)
    }
}

// Split a username into it's components, name and discriminator
// KendrickLamar#0425 goes to => KendrickLamar and 0425
function splitUsername(rawName) {
    const splitName = rawName.split('#');
    const username = splitName[0];
    const discriminator = splitName[1];
    return [username, discriminator];
}