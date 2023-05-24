const { Client, ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const mzrdb = require('croxydb');

module.exports = {
  subCommand: "abone.log-ayarla",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  
  async execute(interaction) {
    const { member } = interaction;

    if (!(member.permissions.bitfield & PermissionFlagsBits.Administrator)) {
      return interaction.reply({ content: 'Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!', ephemeral: true });
    }

    const kanal = interaction.options.getChannel('kanal');

    if (!kanal) {
      return interaction.reply({ content: `Bir kanal etiketlemen gerekmekte örnek: /abonelog-ayarla #kanal`, ephemeral: true });
    }

    mzrdb.set(`abonelog.${interaction.guild.id}`, kanal.id);
    interaction.reply({ content: `Abone kanalı başarıyla ${kanal} olarak ayarlandı.`, ephemeral: true });
  },
};
