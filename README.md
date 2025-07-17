# PoC Monorepo – Multi-Tenant Article Platform

## 🌟 Overview

This PoC demonstrates a cloud-native, multi-tenant article platform with the following components:

- 🧠 **Article Ingestion Service** (Spring Boot) – validates and stores articles using OOP & design patterns.
- 🔐 **Auth Service** (Node.js + TypeScript) – handles tenant/user creation, authentication with JWT, PostgreSQL storage.
- 🖥️ **Frontend** (React + Next.js) – allows logged-in users to browse and view journals/articles in different formats.
- 🛠️ **Infrastructure** – Provisioned via Terraform to AWS (ECR, EKS) with GitHub Actions for CI/CD.

## 📦 Structure
