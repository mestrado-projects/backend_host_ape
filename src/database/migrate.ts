import sequelize from "./connection.js";

sequelize
  .authenticate()
  .then(async () => {
    console.log("Migration realizada com sucesso!");
    await sequelize.sync({ alter: true });
    process.exit(0);
  })
  .catch((err) => console.error("Erro ao conectar ao banco:", err));
