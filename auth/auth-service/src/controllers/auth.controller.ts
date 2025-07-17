import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const registerTenant = async (req: Request, res: Response) => {
  const { tenantName } = req.body;
  try {
    const tenant = await prisma.tenant.create({
      data: { name: tenantName },
    });
    res.status(201).json({ tenantId: tenant.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, tenantId } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        tenantId,
      },
    });
    res.status(201).json({ userId: user.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = generateToken({ userId: user.id, tenantId: user.tenantId });
  res.json({ token });
};
