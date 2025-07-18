import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.create({
    data: { name: "DemoTenant" },
  });

  const hashedPassword = await bcrypt.hash("password123", 10);
  await prisma.user.create({
    data: {
      email: "demo@tenant.com",
      password: hashedPassword,
      tenantId: tenant.id,
    },
  });

  console.log("Seed data created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
