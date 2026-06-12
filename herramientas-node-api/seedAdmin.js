require("dotenv").config();
const { sequelize } = require("./models");
const User = require("./models/user");

const seedAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos.");

    // Verifica si ya existe el admin
    const adminExists = await User.findOne({ where: { email: "admin@admin.com" } });
    
    if (adminExists) {
      console.log("El usuario admin@admin.com ya existe.");
      // Actualizamos su rol por si acaso no era admin
      adminExists.rol = "admin";
      adminExists.password = "admin";
      adminExists.changed("password", true);
      await adminExists.save();
      console.log("Rol y contrasena actualizados exitosamente.");
    } else {
      await User.create({
        email: "admin@admin.com",
        password: "admin", // Usa la contraseña que desees
        rol: "admin"
      });
      console.log("Usuario admin creado: admin@admin.com / admin");
    }
  } catch (error) {
    console.error("Error al crear el admin:", error);
  } finally {
    process.exit(0);
  }
};

seedAdmin();
