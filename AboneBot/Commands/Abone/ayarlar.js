const { ChatInputCommandInteraction, SlashCommandBuilder, Client, EmbedBuilder } = require("discord.js");
const mzrdb = require('croxydb');

module.exports = {
    subCommand: "abone.ayarlar",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute(interaction, client) {

        const guildId = interaction.guild.id;
        const aboneRolId = await mzrdb.get(`abonerol.${guildId}`);
        const yetkiliRolId = await mzrdb.get(`aboneyetkilisi.${guildId}`);
        const logKanalId = await mzrdb.get(`abonelog.${guildId}`);

        const embed = new EmbedBuilder()
            .setTitle("Sunucu Ayarları")
            .setColor("#5865F2");

        const aboneRol = interaction.guild.roles.cache.get(aboneRolId);
        if (aboneRol) {
            embed.addFields([
                {name: "<:abone:1110297665469694053> Abone Rolü", value: aboneRol.toString(), inline: false}
            ]);
        } else {
            embed.addFields([
                {name: "<:abone:1110297665469694053> Abone Rolü", value: `Ayarlı Değil <:hayir:1110297826631622657>`, inline: false}
            ]);
        }
            
        const yetkiliRol = interaction.guild.roles.cache.get(yetkiliRolId);
        if (yetkiliRol) {
            embed.addFields([
                {name: "<:moderator:1110298405714010212> Yetkili Rolü", value: yetkiliRol.toString(), inline: false}
            ]);
        } else {
            embed.addFields([
                {name: "<:moderator:1110298405714010212> Yetkili Rolü", value: `Ayarlı Değil <:hayir:1110297826631622657>`, inline: false}
            ]);
        }

        const logKanal = interaction.guild.channels.cache.get(logKanalId);
        if (logKanal) {
            embed.addFields([
                {name: "<:settings:1106906002353303666> Abone Log Kanalı", value: logKanal.toString(), inline: false}
            ]);
        } else {
            embed.addFields([
                {name: "<:settings:1106906002353303666> Abone Log Kanalı", value: `Ayarlı Değil <:hayir:1110297826631622657>`, inline: false}
            ]);
        }

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
};
