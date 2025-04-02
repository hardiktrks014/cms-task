import { useState, useEffect } from "react";
import ComplaintList from "@/components/complaints/ComplaintList";
import { Complaint, PaginationInfo, ComplaintFilters } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const ComplaintsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<ComplaintFilters>({});
  const { toast } = useToast();

  // In a real implementation, this would fetch data from the backend
  const {
    data: complaintsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["/api/complaints", currentPage, searchTerm, filters],
    queryFn: async () => {
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("page", currentPage.toString());
        queryParams.append("limit", "10");
        
        if (searchTerm) {
          queryParams.append("search", searchTerm);
        }
        
        if (filters.status) {
          queryParams.append("status", filters.status);
        }
        
        if (filters.type) {
          queryParams.append("type", filters.type);
        }
        
        if (filters.dateFrom) {
          queryParams.append("dateFrom", filters.dateFrom);
        }
        
        if (filters.dateTo) {
          queryParams.append("dateTo", filters.dateTo);
        }
        
        const response = await apiRequest(
          "GET",
          `/api/complaints?${queryParams.toString()}`
        );
        
        return await response.json();
      } catch (error) {
        console.error("Error fetching complaints:", error);
        throw error;
      }
    },
  });

  const complaints = complaintsData?.complaints || [];
  const paginationInfo: PaginationInfo = complaintsData?.pagination || {
    page: currentPage,
    totalPages: 1,
    itemsPerPage: 10,
    totalItems: complaints.length,
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load complaints. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleFilter = () => {};

  return (
    <ComplaintList
      complaints={complaints}
      isLoading={isLoading}
      paginationInfo={paginationInfo}
      onPageChange={handlePageChange}
      onSearch={handleSearch}
      onFilter={handleFilter}
    />
  );
};

export default ComplaintsPage;
