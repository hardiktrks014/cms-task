import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { Complaint, ComplaintFilters, PaginationInfo } from "@/types";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Eye,
  FolderOpen,
  ListFilter,
  Loader,
  Pencil,
  Plus,
  Search,
} from "lucide-react";

interface ComplaintListProps {
  complaints: Complaint[];
  isLoading: boolean;
  paginationInfo: PaginationInfo;
  onPageChange: (page: number) => void;
  onSearch: (searchTerm: string) => void;
  onFilter: () => void;
}

const ComplaintList = ({
  complaints,
  isLoading,
  paginationInfo,
  onPageChange,
  onSearch,
  onFilter,
}: ComplaintListProps) => {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Complaint | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleNewComplaint = () => {
    navigate("/complaint-type");
  };

  const handleViewComplaint = (id: string) => {
    navigate(`/complaints/${id}`);
  };

  const handleEditComplaint = (id: string) => {
    navigate(`/complaints/${id}`);
  };

  const handleSort = (field: keyof Complaint) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePrevPage = () => {
    if (paginationInfo.page > 1) {
      onPageChange(paginationInfo.page - 1);
    }
  };

  const handleNextPage = () => {
    if (paginationInfo.page < paginationInfo.totalPages) {
      onPageChange(paginationInfo.page + 1);
    }
  };

  useEffect(() => {
    // Debounced search
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        onSearch(searchTerm);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, onSearch]);

  return (
    <div className="bg-white p-6 shadow-sm rounded">
      <h1 className="text-2xl font-bold mb-6 text-[var(--cms-primary)]">
        Complaints
      </h1>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
          <Button
            className="bg-[var(--cms-primary)] hover:bg-[var(--cms-secondary)] text-white"
            onClick={handleNewComplaint}
          >
            <Plus /> New Complaint
          </Button>
          <Button
            className="bg-[var(--cms-accent)] hover:bg-yellow-500 text-[var(--cms-dark)]"
            onClick={onFilter}
          >
            <ListFilter /> Filter
          </Button>
        </div>

        <div className="w-full sm:w-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search complaints..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearchInputChange}
              onKeyDown={handleSearchKeyDown}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--cms-gray)]" />
          </div>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-[var(--cms-gray-lighter)] border-b">
              <th className="py-3 px-4 text-left font-semibold">
                <button
                  className="flex items-center"
                  onClick={() => handleSort("id")}
                >
                  ID{" "}
                  {sortField === "id" && sortDirection === "asc" ? (
                    <ArrowUp size={20} />
                  ) : (
                    <ArrowDown size={20} />
                  )}
                </button>
              </th>
              <th className="py-3 px-4 text-left font-semibold">
                <button
                  className="flex items-center"
                  onClick={() => handleSort("dateSubmitted")}
                >
                  Date{" "}
                  {sortField === "dateSubmitted" && sortDirection === "asc" ? (
                    <ArrowUp size={20} />
                  ) : (
                    <ArrowDown size={20} />
                  )}
                </button>
              </th>
              <th className="py-3 px-4 text-left font-semibold">
                <button
                  className="flex items-center"
                  onClick={() => handleSort("subject")}
                >
                  Subject{" "}
                  {sortField === "subject" && sortDirection === "asc" ? (
                    <ArrowUp size={20} />
                  ) : (
                    <ArrowDown size={20} />
                  )}
                </button>
              </th>
              <th className="py-3 px-4 text-left font-semibold">
                <button
                  className="flex items-center"
                  onClick={() => handleSort("type")}
                >
                  Type{" "}
                  {sortField === "type" && sortDirection === "asc" ? (
                    <ArrowUp size={20} />
                  ) : (
                    <ArrowDown size={20} />
                  )}
                </button>
              </th>
              <th className="py-3 px-4 text-left font-semibold">
                <button
                  className="flex items-center"
                  onClick={() => handleSort("status")}
                >
                  Status{" "}
                  {sortField === "status" && sortDirection === "asc" ? (
                    <ArrowUp size={20} />
                  ) : (
                    <ArrowDown size={20} />
                  )}
                </button>
              </th>
              <th className="py-3 px-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center text-[var(--cms-gray)]"
                >
                  <div className="flex justify-center">
                    <Loader className="animate-spin" />
                  </div>
                </td>
              </tr>
            ) : complaints.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center text-[var(--cms-gray)]"
                >
                  <div className="flex flex-col items-center">
                    <FolderOpen className="text-4xl mb-3 text-[var(--cms-gray-light)]" />
                    <p className="mb-4">No complaints found</p>
                    <Button
                      className="bg-[var(--cms-primary)] hover:bg-[var(--cms-secondary)] text-white"
                      onClick={handleNewComplaint}
                    >
                      Create New Complaint
                    </Button>
                  </div>
                </td>
              </tr>
            ) : (
              complaints.map((complaint) => (
                <tr
                  key={complaint.id}
                  className="border-b hover:bg-[var(--cms-gray-lighter)]"
                >
                  <td className="py-3 px-4">{complaint.id}</td>
                  <td className="py-3 px-4">{complaint.dateSubmitted}</td>
                  <td className="py-3 px-4">{complaint.subject}</td>
                  <td className="py-3 px-4">{complaint.type}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={complaint.status} />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        className="text-[var(--cms-primary)] hover:text-[var(--cms-secondary)]"
                        title="View Details"
                        onClick={() => handleViewComplaint(complaint.id)}
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        className="text-[var(--cms-primary)] hover:text-[var(--cms-secondary)]"
                        title="Edit"
                        onClick={() => handleEditComplaint(complaint.id)}
                      >
                        <Pencil size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-[var(--cms-gray)]">
          Showing{" "}
          {paginationInfo.page > 0
            ? (paginationInfo.page - 1) * paginationInfo.itemsPerPage + 1
            : 0}{" "}
          to{" "}
          {Math.min(
            paginationInfo.page * paginationInfo.itemsPerPage,
            paginationInfo.totalItems
          )}{" "}
          of {paginationInfo.totalItems} complaints
        </div>
        <div className="flex">
          <button
            className="border rounded-l px-3 py-1 hover:bg-[var(--cms-gray-lighter)] disabled:opacity-50"
            disabled={paginationInfo.page <= 1}
            onClick={handlePrevPage}
          >
            <ChevronLeft size={20} />
          </button>
          <button className="border-t border-b px-3 py-1 bg-[var(--cms-primary)] text-white">
            {paginationInfo.page}
          </button>
          <button
            className="border-t border-b border-r rounded-r px-3 py-1 hover:bg-[var(--cms-gray-lighter)] disabled:opacity-50"
            disabled={paginationInfo.page >= paginationInfo.totalPages}
            onClick={handleNextPage}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintList;
