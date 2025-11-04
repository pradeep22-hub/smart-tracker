

import { sql } from "drizzle-orm";
import { timestamp } from "drizzle-orm/gel-core";
import { integer, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";


export const Budgets = pgTable("budgets", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    amount: varchar("amount", { length: 256 }).notNull(),
    icon: varchar("icon", { length: 256 }),
    createdBy: varchar("created_by", { length: 256 }),

});

export const  Expenses = pgTable("expenses", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    amount: numeric("amount").notNull().default("0"),
    budgetId: integer("budget_id").references(() => Budgets.id),
    createdAt: varchar("createdAT").notNull(),

});