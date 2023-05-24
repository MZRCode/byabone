const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("abone")
    .setDescription("Abone Sistemi")
    .addSubcommand((options) => options
        .setName("ver")
        .setDescription("Etiketlenen Kişiye Ayarlanan Abone Rolünü Verir")
      .addUserOption(options => options
            .setName('kullanıcı')
            .setDescription('Abone Rolünü Verilecek Kullanıcıyı Seçin')
            .setRequired(true)))
    .addSubcommand((options) => options
        .setName("al")
        .setDescription("Etiketlenen Kişiden Ayarlanan Abone Rolü Alınır")
      .addUserOption(options => options
            .setName('kullanıcı')
            .setDescription('Abone Rolü Alınacak Kullanıcıyı Seçin')
            .setRequired(true)))
    .addSubcommand((options) => options
        .setName("yetkili-rol-ayarla")
        .setDescription("Abone Yetkilisi Olacak Rolü Seçin")
      .addRoleOption(option => option
            .setName('rol')
            .setDescription('Abone Yetkilisi Olacak Rolü Etiketleyin')
            .setRequired(true)))
    .addSubcommand((options) => options
        .setName("rol-ayarla")
        .setDescription("Abone Rolünü Ayarlarsınız")
      .addRoleOption(option => option
          .setName('rol')
          .setDescription('Abone Rolünü Etiketleyin')
          .setRequired(true)))
    .addSubcommand((options) => options
        .setName("log-ayarla")
        .setDescription("Log Kanalını Ayarlarsınız")
      .addChannelOption(option => option
          .setName('kanal')
          .setDescription('Abone Log Kanalını Etiketleyin')
          .setRequired(true)))
    .addSubcommand((options) => options
        .setName("veri-sıfırla")
        .setDescription("Abone Log/Rol/Yetkili Rol Verilerini Sıfırlarsınız"))
    .addSubcommand((options) => options
        .setName("ayarlar")
        .setDescription("Yapılan Ayarları Görürsünüz"))
}