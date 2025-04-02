import { 
  User, 
  InsertUser,
  ComplaintSubmission
} from "@shared/schema";
import { filterMockComplaints, getMockComplaintWithContact, getMockCaseHistory } from "../client/src/lib/mockData";

// For a production application, this would be connected to a real database
// We're using mock data for demonstration purposes

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getComplaints(params: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    type?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<{
    complaints: any[];
    pagination: {
      page: number;
      totalPages: number;
      itemsPerPage: number;
      totalItems: number;
    };
  }>;
  getComplaintWithContact(id: string): Promise<any>;
  getCaseHistory(complaintId: string): Promise<any[]>;
  createComplaint(params: {
    complaintData: ComplaintSubmission;
    complaintId: string;
  }): Promise<any>;
  updateComplaint(id: string, updates: any): Promise<any>;
  getComplaintCount(): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private complaints: Map<string, any>;
  private contacts: Map<string, any>;
  private caseHistory: Map<string, any[]>;
  currentId: number;
  complaintCount: number;

  constructor() {
    this.users = new Map();
    this.complaints = new Map();
    this.contacts = new Map();
    this.caseHistory = new Map();
    this.currentId = 1;
    this.complaintCount = 3; // Starting with 3 mock complaints
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getComplaints(params: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    type?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<{
    complaints: any[];
    pagination: {
      page: number;
      totalPages: number;
      itemsPerPage: number;
      totalItems: number;
    };
  }> {
    // For demo purposes, using mock data
    return filterMockComplaints({
      page: params.page,
      limit: params.limit,
      search: params.search,
      status: params.status as any,
      type: params.type,
    });
  }

  async getComplaintWithContact(id: string): Promise<any> {
    // For demo purposes, using mock data
    return getMockComplaintWithContact(id);
  }

  async getCaseHistory(complaintId: string): Promise<any[]> {
    // For demo purposes, using mock data
    return getMockCaseHistory(complaintId);
  }

  async createComplaint(params: {
    complaintData: ComplaintSubmission;
    complaintId: string;
  }): Promise<any> {
    const { complaintData, complaintId } = params;
    
    // In a real implementation, this would create records in the database
    const now = new Date().toISOString();
    
    // Create the complaint object
    const complaint = {
      id: complaintId,
      subject: complaintData.subject,
      description: complaintData.description,
      type: complaintData.complaintType,
      otherType: complaintData.otherType,
      status: "Open",
      dateSubmitted: now,
      dateOfIssue: complaintData.dateOfIssue || null,
      lastUpdated: now,
      documents: [],
      contact: {
        firstName: complaintData.firstName,
        lastName: complaintData.lastName,
        email: complaintData.email,
        phone: complaintData.phone || null,
        zipCode: complaintData.zipCode,
      }
    };
    
    // Increment complaint count
    this.complaintCount++;
    
    // In a real implementation, this would save to the database
    return complaint;
  }

  async updateComplaint(id: string, updates: any): Promise<any> {
    // For demo purposes, we'll just return a mock updated complaint
    const complaint = getMockComplaintWithContact(id);
    
    if (!complaint) {
      return null;
    }
    
    // In a real implementation, this would update the database record
    return {
      ...complaint,
      ...updates,
      lastUpdated: new Date().toISOString()
    };
  }

  async getComplaintCount(): Promise<number> {
    return this.complaintCount;
  }
}

export const storage = new MemStorage();
