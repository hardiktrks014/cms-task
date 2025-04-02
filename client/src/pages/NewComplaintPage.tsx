import ComplaintForm from "@/components/complaints/ComplaintForm";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

const NewComplaintPage = () => {
  const [, navigate] = useLocation();

  return (
    <div className="bg-white p-6 shadow-sm rounded">
      <div className="flex items-center mb-6">
        <button
          className="mr-3 bg-[var(--cms-gray-lighter)] p-2 rounded hover:bg-[var(--cms-gray-light)]"
          onClick={() => navigate("/complaints")}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-[var(--cms-primary)]">New Complaint</h1>
      </div>
      
      <ComplaintForm />
    </div>
  );
};

export default NewComplaintPage;
