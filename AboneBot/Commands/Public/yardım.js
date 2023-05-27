const { ChatInputCommandInteraction, SlashCommandBuilder, Client, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("yardım")
    .setDescription("Yardım Menüsünü Gösterir"),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, client){
        const embed = new EmbedBuilder()
        .setTitle("Yardım Menüm")
        .addFields([
            {name: "Abone Komutlarım", value: `<:abone:1110297665469694053> **/abone rol-ayarla [ROL]**\n Abone Rolü olarak verilecek rolü ayarlarsınız.\n\n<:abone:1110297665469694053> **/abone yetkili-rol-ayarla [ROL]**\nAbone Rolünü verebilcek yetkilini rolünü ayarlarsınız.\n\n<:abone:1110297665469694053> **/abone log-ayarla  [KANAL]**\nAbone Rolü verildi/alındı logunu tutup mesajı atacağı kanalı ayarlarsınız.\n\n<:abone:1110297665469694053> **/abone ver [KULLANICI]**\nAyarlanan yetkilinin etiketlenen kullanıcıdan abone rolünü vermesini sağlar.\n\n<:abone:1110297665469694053> **/abone al [KULLANICI]**\nAyarlanan yetkilinin etiketlenen kullanıcıdan abone rolünü almasını sağlar.\n\n<:abone:1110297665469694053> **/abone veri-sıfırla **\nAyarlanan tüm ayarları sıfırlar.`, inline: false},
            {name: "Kullanıcı Komutlarım", value: `<:member:1104854676878413894> **/abone ayarlar **\nAyarlanan ayarları gösterir.\n\n<:member:1104854676878413894> **/bilgi [KULLANICI]**\nEtiketlenen yetkilinin abone bilgilerini gösterir.\n\n<:member:1104854676878413894> **/help**\nBotun komutları ve ne işe yaradıklarını gösterir.\n\n<:member:1104854676878413894> **/ping**\nBotun pingini gösterir.\n\n<:member:1104854676878413894> **/invite**\nBotu davet edersiniz ve destek sunucusuna katılabilirsiniz.`, inline: true},
        ])
        .setColor("#5865F2")
        interaction.reply({embeds: [embed], ephemeral: true});

    }

}
