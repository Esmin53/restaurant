import { integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";

export const RoleEnum = pgEnum('role', ['admin', 'staff', 'customer'])

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull().unique(),
  password: varchar({length: 21}).notNull(),
  role: RoleEnum('role').notNull().default('customer')
});