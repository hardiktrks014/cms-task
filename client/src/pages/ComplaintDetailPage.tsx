import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ComplaintDetail from "@/components/complaints/ComplaintDetail";
import { ComplaintWithContact, CaseHistoryEntry } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const ComplaintDetailPage = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // In a real implementation, this would fetch data from the backend
  const {
    data: complaint,
    isLoading: isComplaintLoading,
    error: complaintError,
  } = useQuery<ComplaintWithContact>({
    queryKey: [`/api/complaints/${id}`],
    enabled: !!id,
  });

  // In a real implementation, this would fetch case history from the backend
  const {
    data: caseHistory,
    isLoading: isHistoryLoading,
    error: historyError,
  } = useQuery<CaseHistoryEntry[]>({
    queryKey: [`/api/complaints/${id}/history`],
    enabled: !!id,
  });

  const isLoading = isComplaintLoading || isHistoryLoading;
  const error = complaintError || historyError;

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load complaint details. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  if (!id) {
    return (
      <div className="bg-white p-6 shadow-sm rounded">
        <p className="text-[var(--cms-error)]">Invalid complaint ID</p>
      </div>
    );
  }

  return (
    <ComplaintDetail
      complaint={complaint as ComplaintWithContact}
      caseHistory={caseHistory || []}
      isLoading={isLoading}
    />
  );
};

export default ComplaintDetailPage;
