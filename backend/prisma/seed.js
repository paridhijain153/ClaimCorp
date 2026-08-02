import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // -------------------------
  // Hash default password once
  // -------------------------
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  // =========================
  // Admin
  // =========================
  const admin = await prisma.user.upsert({
    where: {
      email: "admin@claimcorp.com",
    },
    update: {},
    create: {
      name: "System Administrator",
      email: "admin@claimcorp.com",
      password: hashedPassword,
      role: Role.ADMIN,
      department: "Administration",
      designation: "System Admin",
      isActive: true,
    },
  });

  console.log("✅ Admin ready");

  // =========================
  // Manager
  // =========================
  const manager = await prisma.user.upsert({
    where: {
      email: "rahul@claimcorp.com",
    },
    update: {},
    create: {
      name: "Rahul Sharma",
      email: "rahul@claimcorp.com",
      password: await bcrypt.hash("Rahul@123", 10),
      role: Role.MANAGER,
      department: "Finance",
      designation: "Finance Manager",
      isActive: true,
    },
  });

  console.log("✅ Manager ready");

  // =========================
  // Employee
  // =========================
  const employee = await prisma.user.upsert({
    where: {
      email: "paridhi@claimcorp.com",
    },
    update: {},
    create: {
      name: "Paridhi Jain",
      email: "paridhi@claimcorp.com",
      password: await bcrypt.hash("Paridhi@123", 10),
      role: Role.EMPLOYEE,
      department: "Engineering",
      designation: "Software Engineer",
      managerId: manager.id,
      isActive: true,
    },
  });

  console.log("✅ Employee ready");

  // =========================
  // Categories
  // =========================

  const categories = [
    {
      name: "Travel",
      description: "Travel and transportation expenses",
    },
    {
      name: "Hotel",
      description: "Accommodation expenses",
    },
    {
      name: "Food",
      description: "Meals and food expenses",
    },
    {
      name: "Fuel",
      description: "Fuel and mileage expenses",
    },
    {
      name: "Internet",
      description: "Internet and communication expenses",
    },
    {
      name: "Office Supplies",
      description: "Office stationery and supplies",
    },
    {
      name: "Training",
      description: "Training and certification expenses",
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        name: category.name,
      },
      update: {},
      create: category,
    });
  }

  console.log("✅ Categories ready");

  console.log("");
  console.log("======================================");
  console.log("🎉 Database seeded successfully!");
  console.log("======================================");
  console.log("");
  console.log("Admin");
  console.log("Email    : admin@claimcorp.com");
  console.log("Password : Admin@123");
  console.log("");
  console.log("Manager");
  console.log("Email    : rahul@claimcorp.com");
  console.log("Password : Rahul@123");
  console.log("");
  console.log("Employee");
  console.log("Email    : paridhi@claimcorp.com");
  console.log("Password : Paridhi@123");
  console.log("");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });