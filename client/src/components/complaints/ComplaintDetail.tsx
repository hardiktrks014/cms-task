import { useLocation } from "wouter";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { ComplaintWithContact, CaseHistoryEntry } from "@/types";
import CaseHistory from "./CaseHistory";
import { ArrowLeft, Loader } from "lucide-react";

interface ComplaintDetailProps {
  complaint: ComplaintWithContact;
  caseHistory: CaseHistoryEntry[];
  isLoading: boolean;
}

const ComplaintDetail = ({
  complaint,
  caseHistory,
  isLoading,
}: ComplaintDetailProps) => {
  const [, navigate] = useLocation();

  const handleBackToList = () => {
    navigate("/complaints");
  };

  const handleEditComplaint = () => {};

  if (isLoading) {
    return <Loader className="animate-spin" />;
  }

  return (
    <div className="bg-white p-6 shadow-sm rounded">
      <div className="flex items-center mb-6">
        <button
          className="mr-3 bg-[var(--cms-gray-lighter)] p-2 rounded hover:bg-[var(--cms-gray-light)]"
          onClick={handleBackToList}
        >
          <ArrowLeft />
        </button>
        <h1 className="text-2xl font-bold text-[var(--cms-primary)]">
          Complaint Details
        </h1>
      </div>

      {/* Status Bar */}
      <div className="flex items-center mb-6">
        <div className="flex-1">
          <span className="font-semibold mr-2">Status:</span>
          <StatusBadge status={complaint.status} />
        </div>
        <div>
          <span className="font-semibold mr-2">ID:</span>
          <span>{complaint.id}</span>
        </div>
      </div>

      {/* Complaint Information */}
      <div className="space-y-6">
        {/* Contact Information */}
        <div className="p-4 border border-[var(--cms-gray-light)] rounded bg-[var(--cms-gray-lighter)]">
          <h2 className="text-lg font-semibold mb-4">Contact Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold mb-1">Name</p>
              <p>{`${complaint.contact.firstName} ${complaint.contact.lastName}`}</p>
            </div>

            <div>
              <p className="font-semibold mb-1">Email</p>
              <p>{complaint.contact.email}</p>
            </div>

            <div>
              <p className="font-semibold mb-1">Phone Number</p>
              <p>{complaint.contact.phone || "N/A"}</p>
            </div>

            <div>
              <p className="font-semibold mb-1">Zip Code</p>
              <p>{complaint.contact.zipCode}</p>
            </div>
          </div>
        </div>

        {/* Complaint Details */}
        <div className="p-4 border border-[var(--cms-gray-light)] rounded bg-[var(--cms-gray-lighter)]">
          <h2 className="text-lg font-semibold mb-4">Complaint Details</h2>

          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-1">Description</p>
              <p>{complaint.description}</p>
            </div>

            <div>
              <p className="font-semibold mb-1">Date of Issue</p>
              <p>{complaint.dateOfIssue || "N/A"}</p>
            </div>

            {complaint.documents && complaint.documents.length > 0 && (
              <div>
                <p className="font-semibold mb-1">Supporting Documents</p>
                <ul className="list-disc pl-5 space-y-1">
                  {complaint.documents.map((doc, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-[var(--cms-primary)] hover:underline"
                      >
                        {doc}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Case History */}
        <CaseHistory entries={caseHistory} />

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-end">
          <Button
            variant="outline"
            className="border-[var(--cms-primary)] text-[var(--cms-primary)]"
            onClick={handleBackToList}
          >
            Back to List
          </Button>
          <Button
            className="bg-[var(--cms-primary)] hover:bg-[var(--cms-secondary)] text-white"
            onClick={handleEditComplaint}
          >
            Edit Complaint
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;
