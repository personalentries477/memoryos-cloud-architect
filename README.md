# memoryos-cloud-architect
npx @nestjs/cli new backend

npm install @prisma/client prisma @aws-sdk/client-bedrock-runtime class-validator class-transformer @nestjs/config pg uuid dotenv --save

npm install -D @types/uuid --save

npx prisma generate
npx prisma db push

winget install --id AWSCLI.AWSCLIV2
# Folder Structure

memory

Stores

architecture memory
conversations
decisions
architect

Main business logic.

Never put AI logic here.

This module asks AI.

ai

Only Bedrock.

Nothing else.

prompts

Prompt templates.

Never hardcode prompts.

database

Prisma

Repositories

Connection

common

Utilities

DTOs

Enums

Exceptions

memoryos-cloud-architect/
│
├── apps/
│   ├── backend/
│   └── frontend/
│
├── packages/
│   ├── shared/
│   └── prompts/
│
├── docs/
│
├── diagrams/
│
├── README.md
│
└── docker-compose.yml