const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder, Client, codeBlock } = require('discord.js');
const mzrdb = require('croxydb');

module.exports = {
  subCommand: "abone.ver",
  /**
   * er
   * @param {ChatInputCommandInteraction} interaction 
   * @param {Client} client 
   */
  
  async execute(interaction, client) {
    const aboneyetkilisi = await mzrdb.get(`aboneyetkilisi.${interaction.guild.id}`);
    const abonelog = await mzrdb.get(`abonelog.${interaction.guild.id}`);
    const abonerol = await mzrdb.get(`abonerol.${interaction.guild.id}`);

    if (!abonerol) return interaction.reply({ content: 'Abone rolü ayarlanmamış!', ephemeral: true });
    if (!abonelog) return interaction.reply({ content: 'Abone log kanalı ayarlanmamış!', ephemeral: true });
    if (!aboneyetkilisi)
      return interaction.reply({ content: 'Abone yetkili rolü ayarlanmamış!', ephemeral: true });

    const memberRoles = interaction.member.roles;

    if (
      !memberRoles.cache.has(aboneyetkilisi) &&
      !memberRoles.cache.some(role => role.id === aboneyetkilisi)
    )
      return interaction.reply({ content: 'Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin!', ephemeral: true });

    const abonekisi = interaction.options.getMember('kullanıcı');

    if (!abonekisi) return interaction.reply({ content: 'Bir üye seçiniz!', ephemeral: true });

    await abonekisi.roles.add(abonerol);

    const memberAboneRolVermeSayisi = await mzrdb.get(`abonerolverme.${interaction.guild.id}.${interaction.user.id}`) || 0;
    await mzrdb.set(`abonerolverme.${interaction.guild.id}.${interaction.user.id}`, memberAboneRolVermeSayisi + 1);

    const embed = new EmbedBuilder()
      .setTitle('Abone Rolü Verildi!')
      .addFields(
        {
            name: "Abone Rolünü Veren;",
            value: `${interaction.user}`,
            inline: true
        },
        {
            name: "Abone Rolünü Alan;",
            value: `${abonekisi}`,
            inline: true
        },
        {
          name: "Toplam Verdiği Abone Rol Sayısı;",
          value: `${codeBlock("yaml", `${memberAboneRolVermeSayisi + 1}`)}`,
          inline: false
      }
    )
      //.setThumbnail(abonekisi.user.avatarURL()) //Sağ tarafda abone rolü verilen kişinin pp si çıkmasını istersen baştaki 2 /'ı sil 
      .setColor('Green')
      
    interaction.guild.channels.cache.get(abonelog).send({ embeds: [embed] });

    interaction.reply({ content: 'Abone rolü başarıyla verildi!', ephemeral: true });
  },
};
