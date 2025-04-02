import {
  Complaint,
  ComplaintWithContact,
  ComplaintStatus,
  CaseHistoryEntry,
  PaginationInfo,
} from "@/types";

// This file contains mock data for development purposes only.
// In a production environment, this would be replaced with actual API calls.

export const mockComplaints: Complaint[] = [
  {
    id: "CMP-001",
    subject: "Payment Issue",
    description: "I was charged twice for the same service on my recent bill. I have attempted to contact the billing department multiple times without resolution. The duplicate charge is for $250.00 and occurred on my January statement.",
    type: "Billing",
    status: "In Progress",
    dateSubmitted: "01/15/2023",
    dateOfIssue: "01/05/2023",
    lastUpdated: "01/20/2023",
    documents: ["January_Bill.pdf", "Email_Correspondence.pdf"],
  },
  {
    id: "CMP-002",
    subject: "Coverage Dispute",
    description: "My insurance claim for a recent procedure was denied, but I believe it should be covered under my plan.",
    type: "Insurance",
    status: "Resolved",
    dateSubmitted: "02/10/2023",
    dateOfIssue: "02/01/2023",
    lastUpdated: "02/25/2023",
    documents: ["Insurance_Claim.pdf", "Plan_Details.pdf"],
  },
  {
    id: "CMP-003",
    subject: "Provider Network Issue",
    description: "I was told this doctor was in-network, but I received an out-of-network bill.",
    type: "Provider",
    status: "Open",
    dateSubmitted: "03/22/2023",
    dateOfIssue: "03/15/2023",
    documents: ["Provider_Bill.pdf"],
  },
];

export const mockContacts = {
  "CMP-001": {
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    phone: "5551234567",
    zipCode: "12345",
  },
  "CMP-002": {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    phone: "5559876543",
    zipCode: "54321",
  },
  "CMP-003": {
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@example.com",
    phone: "5554567890",
    zipCode: "67890",
  },
};

export const mockCaseHistory: Record<string, CaseHistoryEntry[]> = {
  "CMP-001": [
    {
      id: "CH-001-1",
      action: "Status changed to In Progress",
      date: "01/16/2023 - 10:30 AM",
      user: "System",
      notes: "Complaint assigned to resolution team.",
    },
    {
      id: "CH-001-2",
      action: "Note added",
      date: "01/17/2023 - 3:15 PM",
      user: "Agent",
      notes: "Contacted billing department to verify duplicate charge. Awaiting response.",
    },
    {
      id: "CH-001-3",
      action: "Note added",
      date: "01/20/2023 - 11:45 AM",
      user: "Agent",
      notes: "Billing department confirmed duplicate charge. Refund processing initiated.",
    },
  ],
  "CMP-002": [
    {
      id: "CH-002-1",
      action: "Status changed to Open",
      date: "02/10/2023 - 9:00 AM",
      user: "System",
      notes: "Complaint received and registered.",
    },
    {
      id: "CH-002-2",
      action: "Status changed to In Progress",
      date: "02/12/2023 - 1:30 PM",
      user: "System",
      notes: "Complaint assigned to insurance specialist.",
    },
    {
      id: "CH-002-3",
      action: "Note added",
      date: "02/15/2023 - 10:15 AM",
      user: "Agent",
      notes: "Reviewed insurance policy and found procedure is covered. Contacting insurance provider.",
    },
    {
      id: "CH-002-4",
      action: "Status changed to Resolved",
      date: "02/25/2023 - 9:45 AM",
      user: "Agent",
      notes: "Insurance provider has approved the claim. Payment will be processed within 7-10 business days.",
    },
  ],
  "CMP-003": [
    {
      id: "CH-003-1",
      action: "Status changed to Open",
      date: "03/22/2023 - 2:00 PM",
      user: "System",
      notes: "Complaint received and registered.",
    },
  ],
};

export const getMockComplaintWithContact = (
  id: string
): ComplaintWithContact | undefined => {
  const complaint = mockComplaints.find((c) => c.id === id);
  const contact = mockContacts[id as keyof typeof mockContacts];

  if (!complaint || !contact) {
    return undefined;
  }

  return {
    ...complaint,
    contact,
  };
};

export const getMockCaseHistory = (id: string): CaseHistoryEntry[] => {
  return mockCaseHistory[id] || [];
};

export const getMockPaginationInfo = (
  page: number,
  totalItems: number,
  itemsPerPage: number = 10
): PaginationInfo => {
  return {
    page,
    totalPages: Math.ceil(totalItems / itemsPerPage),
    itemsPerPage,
    totalItems,
  };
};

export const filterMockComplaints = (
  filters: {
    search?: string;
    status?: ComplaintStatus;
    type?: string;
    page: number;
    limit: number;
  }
): { complaints: Complaint[]; pagination: PaginationInfo } => {
  let filtered = [...mockComplaints];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.id.toLowerCase().includes(searchLower) ||
        c.subject.toLowerCase().includes(searchLower) ||
        c.description.toLowerCase().includes(searchLower) ||
        c.type.toLowerCase().includes(searchLower)
    );
  }

  if (filters.status) {
    filtered = filtered.filter((c) => c.status === filters.status);
  }

  if (filters.type) {
    filtered = filtered.filter((c) => c.type === filters.type);
  }

  const pagination = getMockPaginationInfo(
    filters.page,
    filtered.length,
    filters.limit
  );

  // Apply pagination
  const start = (filters.page - 1) * filters.limit;
  const paginatedComplaints = filtered.slice(start, start + filters.limit);

  return {
    complaints: paginatedComplaints,
    pagination,
  };
};
