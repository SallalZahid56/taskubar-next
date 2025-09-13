import { PrismaClient } from "../src/generated/prisma/index.js"; 
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Hash the password (never store plain text!)
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  // Upsert ensures we don’t create duplicate admin if it already exists
  const admin = await prisma.user.upsert({
    where: { email: "admin@taskuber.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@taskuber.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin user created/ensured:", admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
