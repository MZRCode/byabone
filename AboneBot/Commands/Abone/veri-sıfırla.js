const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, Client } = require('discord.js');
const mzrdb = require('croxydb');

module.exports = {
  subCommand: "abone.veri-sıfırla",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   * @param {Client} client 
   */

  async execute(interaction, client) {
    const { member } = interaction;
    const guildId = interaction.guild.id;

    if (!(member.permissions.bitfield & PermissionFlagsBits.Administrator)) {
      return interaction.reply({ content: 'Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!', ephemeral: true });
    }

    await mzrdb.delete(`aboneyetkilisi.${guildId}`);
    await mzrdb.delete(`abonelog.${guildId}`);
    await mzrdb.delete(`abonerol.${guildId}`);
    await mzrdb.delete(`abonerolverme.${guildId}.${member.id}`);

    interaction.reply({ content: 'Sunucu verileri başarıyla sıfırlandı!', ephemeral: true });
  },
};
