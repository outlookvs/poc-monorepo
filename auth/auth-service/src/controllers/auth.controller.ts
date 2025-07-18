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
    const error = err instanceof Error ? err.message : String(err);
    res.status(400).json({ error: error });
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
    const error = err instanceof Error ? err.message : String(err);
    res.status(400).json({ error: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
    include: { tenant: true },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // TypeScript knows `user` has `tenant` now
  const token = generateToken({ userId: user.id, tenantId: user.tenantId });

  res.json({
    token,
    user: {
      email: user.email,
      tenantName: user.tenant.name,
    },
  });
};

export const listTenantsAndUsers = async (_req: Request, res: Response) => {
  try {
    const tenants = await prisma.tenant.findMany({
      include: {
        users: {
          select: {
            id: true,
            email: true,
            createdAt: true,
          },
        },
      },
    });
    res.json(tenants);
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: error });
  }
};
