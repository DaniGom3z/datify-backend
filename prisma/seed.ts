import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log("Iniciando el proceso de seeding...");
    const adminRole = await prisma.role.upsert({
        where: { id: 1 },
        update: {},
        create: {
          id: 1,
          name: "ADMIN",
        },
    });

    const userRole = await prisma.role.upsert({
      where: { id: 2 },
      update: {},
      create: {
        id: 2,
        name: "USER",
      },
    });

    console.log("Roles (ADMIN y USER) creados");

    const rawPassword = process.env.ADMIN_PASSWORD;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!rawPassword) {
        throw new Error("La variable de entorno ADMIN_PASSWORD no está definida en el archivo .env");
    }
    if (!adminEmail) {
        throw new Error("La variable de entorno ADMIN_EMAIL no está definida en el archivo .env");
    }

    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const adminUser = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        name: "Administrador",
        email: adminEmail,
        passwordHash: hashedPassword,
        roleId: adminRole.id, 
      },
    });

    console.log(`Usuario administrador creado: ${adminUser.email}`);
    console.log("Proceso de seeding completado de manera exitosa.");
}

main()
    .catch((e) => {
      console.error("❌ Error durante la ejecución del seed:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });