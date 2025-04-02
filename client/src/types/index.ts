export type ComplaintStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

export type ComplaintType = 'Transactions' | 'Code Sets' | 'Unique Identifiers' | 'Operating Rules';
export interface Complaint {
  id: string;
  subject: string;
  description: string;
  type: ComplaintType;
  otherType?: string;
  status: ComplaintStatus;
  dateSubmitted: string;
  dateOfIssue?: string;
  lastUpdated?: string;
  documents?: string[];
}

export interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  zipCode: string;
}

export interface ComplaintWithContact extends Complaint {
  contact: Contact;
}

export interface CaseHistoryEntry {
  id: string;
  action: string;
  date: string;
  user: 'System' | 'Agent' | 'User';
  notes?: string;
}

export interface FileUpload {
  name: string;
  size: number;
  type: string;
}

export interface ComplaintFilters {
  search?: string;
  status?: ComplaintStatus;
  type?: ComplaintType;
  dateFrom?: string;
  dateTo?: string;
}

export interface PaginationInfo {
  page: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}
