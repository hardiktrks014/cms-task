import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { complaintSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Route to get all complaints with pagination and filtering
  app.get("/api/complaints", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string | undefined;
      const status = req.query.status as string | undefined;
      const type = req.query.type as string | undefined;
      const dateFrom = req.query.dateFrom as string | undefined;
      const dateTo = req.query.dateTo as string | undefined;

      const result = await storage.getComplaints({
        page,
        limit,
        search,
        status,
        type,
        dateFrom,
        dateTo,
      });

      res.json(result);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      res.status(500).json({ message: "Failed to fetch complaints" });
    }
  });

  // Route to get a specific complaint by ID
  app.get("/api/complaints/:id", async (req, res) => {
    try {
      const complaintId = req.params.id;
      const complaint = await storage.getComplaintWithContact(complaintId);

      if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
      }

      res.json(complaint);
    } catch (error) {
      console.error("Error fetching complaint:", error);
      res.status(500).json({ message: "Failed to fetch complaint" });
    }
  });

  // Route to get case history for a complaint
  app.get("/api/complaints/:id/history", async (req, res) => {
    try {
      const complaintId = req.params.id;
      const history = await storage.getCaseHistory(complaintId);

      res.json(history);
    } catch (error) {
      console.error("Error fetching case history:", error);
      res.status(500).json({ message: "Failed to fetch case history" });
    }
  });

  // Route to create a new complaint
  app.post("/api/complaints", async (req, res) => {
    try {
      const complaintData = complaintSubmissionSchema.parse(req.body);

      // Generate a unique complaint ID (e.g., CMP-123)
      const complaintCount = await storage.getComplaintCount();
      const complaintId = `CMP-${(complaintCount + 1).toString().padStart(3, "0")}`;

      // Create the complaint
      const newComplaint = await storage.createComplaint({
        complaintData,
        complaintId,
      });

      res.status(201).json(newComplaint);
    } catch (error) {
      console.error("Error creating complaint:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      }
      
      res.status(500).json({ message: "Failed to create complaint" });
    }
  });

  // Route to update an existing complaint
  app.patch("/api/complaints/:id", async (req, res) => {
    try {
      const complaintId = req.params.id;
      const updates = req.body;

      const updatedComplaint = await storage.updateComplaint(complaintId, updates);

      if (!updatedComplaint) {
        return res.status(404).json({ message: "Complaint not found" });
      }

      res.json(updatedComplaint);
    } catch (error) {
      console.error("Error updating complaint:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      }
      
      res.status(500).json({ message: "Failed to update complaint" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
