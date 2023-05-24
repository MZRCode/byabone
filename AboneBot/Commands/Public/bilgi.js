const { ChatInputCommandInteraction, SlashCommandBuilder, Client, EmbedBuilder, codeBlock } = require("discord.js");
const mzrdb = require('croxydb');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bilgi")
        .setDescription("Belirtilen kullanıcının abone rolü verme sayısını gösterir.")
        .addUserOption(option =>
            option.setName('kullanıcı')
                .setDescription('Bilgisini almak istediğiniz kullanıcıyı seçin.')
                .setRequired(true)),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const aboneyetkilisi = await mzrdb.get(`aboneyetkilisi.${interaction.guild.id}`);
        const abonerol = await mzrdb.get(`abonerol.${interaction.guild.id}`);

        if (!aboneyetkilisi) {
            return interaction.reply({ content: 'Yetkili rolünü ayarlaman gerekiyor!', ephemeral: true });
        }

        const abonekisi = interaction.options.getMember('kullanıcı');
        if (!abonekisi) {
            return interaction.reply({ content: 'Bir kullanıcı belirtmelisin!', ephemeral: true });
        }

        const aboneRolVermeSayisi = await mzrdb.get(`abonerolverme.${interaction.guild.id}.${abonekisi.id}`) || 0;

        const embed = new EmbedBuilder()
            .setTitle('Yetkili Bilgi')
            .addFields(
        {
            name: "Kullanıcı;",
            value: `${abonekisi}`,
            inline: true
        },
        {
            name: "Toplam Verdiği Abone Rol Sayısı;",
            value: `${codeBlock("yaml", `${aboneRolVermeSayisi}`)}`,
            inline: false
        }
        )
            .setColor('#5865F2');

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
};
