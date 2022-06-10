import { MessageType } from "../types/messageType";
import {
  ColorResolvable,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from "discord.js";

import dotenv from "dotenv";
dotenv.config();

const url = "https://saucet.vercel.app";

interface Ping {
  name: string;
  description: string;
  sentEmbed: any | undefined;
  newEmbed: any | undefined;
  execute: (message: MessageType, args: string, webhook) => void;
  playPingPong: (webhook, sentMessage: any) => void;
}

const pong: Ping = {
  name: "ping",
  description: "Sends pong as a message",
  sentEmbed: undefined,
  newEmbed: undefined,
  execute(message, args, webhook) {
    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("*Iiiiiit's* **VOTING TIME**")
      .setURL(url)
      .setDescription("*Gimme all your votes*")
      .setTimestamp();

      const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('vote')
          .setLabel('Vote!')
          .setStyle('PRIMARY'),
      );

    webhook.send({ ephemeral: true, embeds: [embed], components: [row] }).then((sentMessage) => {
      // console.log({ sentMessage });

      // this.playPingPong(webhook, sentMessage);
    });
  },
  playPingPong(webhook, sentMessage) {
    let count = 0;
    let newEmbeds;
    let newEmbed;

    this.sentEmbed = sentMessage.embeds[0];
    const prevEmbed = count === 0 ? this.sentEmbed : this.newEmbed;

    setInterval(() => {
      if (count % 2 === 0)
        this.newEmbed = updateEmbed(
          prevEmbed,
          {
            name: "Pong!",
            value: `count: ${count}`,
          },
          "#ff0000"
        );
      else
        this.newEmbed = updateEmbed(
          prevEmbed,
          {
            name: "Ping!",
            value: `count: ${count}`,
          },
          "#0099ff"
        );
      webhook
        .editMessage(sentMessage.id, {
          embeds: [this.newEmbed],
        })
        .then(() => (count += 1));
    }, 1000);
  },
};

export = pong;

const updateEmbed = (embed: MessageEmbed, fields, colour): MessageEmbed =>
  embed.setFields(fields).setColor(colour)