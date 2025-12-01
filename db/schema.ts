import { integer, pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const RoleEnum = pgEnum('role', ['admin', 'staff', 'customer'])

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull().unique(),
  password: varchar({length: 21}).notNull(),
  role: RoleEnum('role').notNull().default('customer'),
  image: varchar({ length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const locationStaff = pgTable("location_staff", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  locationId: integer("location_id").references(() => locations.id),
  salary: integer("salary").default(0),
  position: varchar("position", { length: 255 }).default("staff"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const locations = pgTable("locations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull().unique(),
  adress: varchar({ length: 255 }).notNull().unique(),
  image: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})