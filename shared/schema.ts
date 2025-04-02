import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Define complaint status and type enums
export const ComplaintStatusEnum = z.enum([
  "Open",
  "In Progress",
  "Resolved",
  "Closed",
]);

export const ComplaintTypeEnum = z.enum([
  "Billing",
  "Insurance",
  "Provider",
  "Prescriptions",
  "Other",
]);

// Complaint table
export const complaints = pgTable("complaints", {
  id: serial("id").primaryKey(),
  complaintId: text("complaint_id").notNull().unique(), // e.g., CMP-001
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // Using the ComplaintTypeEnum
  otherType: text("other_type"),
  status: text("status").notNull(), // Using the ComplaintStatusEnum
  dateSubmitted: timestamp("date_submitted").notNull(),
  dateOfIssue: timestamp("date_of_issue"),
  lastUpdated: timestamp("last_updated"),
  documents: json("documents").$type<string[]>(), // Array of document filenames
  userId: integer("user_id").references(() => users.id),
});

// Contact information for complaints
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  complaintId: integer("complaint_id")
    .notNull()
    .references(() => complaints.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  zipCode: text("zip_code").notNull(),
});

// Case history for tracking complaint changes
export const caseHistory = pgTable("case_history", {
  id: serial("id").primaryKey(),
  complaintId: integer("complaint_id")
    .notNull()
    .references(() => complaints.id),
  action: text("action").notNull(),
  date: timestamp("date").notNull(),
  user: text("user").notNull(), // System, Agent, User
  notes: text("notes"),
});

// Create insert schemas
export const insertComplaintSchema = createInsertSchema(complaints).omit({
  id: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
});

export const insertCaseHistorySchema = createInsertSchema(caseHistory).omit({
  id: true,
});

// Create combined schema for complaint submission
export const complaintSubmissionSchema = z.object({
  complaintType: ComplaintTypeEnum,
  otherType: z.string().optional(),
  subject: z.string().min(1, { message: "Subject is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  dateOfIssue: z.string().optional(),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .regex(/^\d{10}$/, {
      message: "Phone number must be 10 digits without spaces or special characters",
    })
    .optional()
    .or(z.literal("")),
  zipCode: z.string().regex(/^\d{5}$/, {
    message: "Zip code must be 5 digits",
  }),
});

// Type definitions
export type InsertComplaint = z.infer<typeof insertComplaintSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertCaseHistory = z.infer<typeof insertCaseHistorySchema>;
export type ComplaintSubmission = z.infer<typeof complaintSubmissionSchema>;
export type Complaint = typeof complaints.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type CaseHistory = typeof caseHistory.$inferSelect;
