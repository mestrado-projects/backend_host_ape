import sequelize from "./connection.js";

sequelize
  .authenticate()
  .then(async () => {
    console.log("Migration realizada com sucesso!");
    await sequelize.sync({ force: true });
    process.exit(1);
  })
  .catch((err) => console.error("Erro ao conectar ao banco:", err));
