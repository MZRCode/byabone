const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const mzrdb = require('croxydb');

module.exports = {
  subCommand: "abone.yetkili-rol-ayarla",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  
  async execute(interaction) {
    const { guild, member } = interaction;

    if (!(member.permissions.bitfield & PermissionFlagsBits.Administrator)) {
      return interaction.reply({ content: 'Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!', ephemeral: true });
    }

    const rol = interaction.options.getRole('rol');

    if (!rol) {
      return interaction.reply({ content: `Bir rol etiketlemen gerekmekte. **Örnek: /abone yetkili-rol-ayarla @rol**`, ephemeral: true });
    }

    mzrdb.set(`aboneyetkilisi.${interaction.guild.id}`, rol.id);
    interaction.reply({ content: `Abone yetkilisi başarıyla ${rol} olarak ayarlandı.`, ephemeral: true });
  },
};
