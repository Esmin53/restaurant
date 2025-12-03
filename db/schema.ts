import { CATEGORY_ENUM_ARRAY } from "@/lib/data";
import { relations } from "drizzle-orm";
import { decimal, integer, numeric, PgArray, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { number } from "zod";

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
  salary: numeric("salary", {precision: 10, scale: 2}),
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

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar({ length: 255 }).notNull().unique(),
});

export const categoryRelations = relations(categories, ({ many }) => ({
  menuItems: many(menuItems)
}))

export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  title: varchar({ length: 255 }).notNull().unique(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  description: text().notNull(),
  image: varchar({ length: 255 }).notNull(),
  categoryId: integer().references(() => categories.id, {
    onDelete: 'cascade',
    onUpdate: 'set null'
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export const menuItemRelations = relations(menuItems, ({ one }) => ({
	category: one(categories, {
		fields: [menuItems.categoryId],
		references: [categories.id],
	}),
}));