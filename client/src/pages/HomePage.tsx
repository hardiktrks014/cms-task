import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FileText, Info, List } from "lucide-react";

const HomePage = () => {
  return (
    <div className="bg-white p-6 shadow-sm rounded">
      <h1 className="text-3xl font-bold mb-6 text-[var(--cms-primary)]">
        Welcome to ASETT Complaint Management System
      </h1>

      <div className="prose max-w-none mb-8">
        <p>
          The ASETT Complaint Management System allows you to submit and track
          complaints related to Medicare and Medicaid services.
        </p>
        <p>
          Whether you're experiencing issues with billing, insurance coverage,
          providers, or prescriptions, our system is designed to help you
          resolve your concerns efficiently.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[var(--cms-gray-lighter)] p-5 rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-[var(--cms-secondary)]">
            <FileText size={20} /> Submit a New Complaint
          </h2>
          <p className="mb-4">
            File a new complaint about an issue you've experienced with Medicare
            or Medicaid services.
          </p>
          <Link href="/complaints/new">
            <Button className="bg-[var(--cms-primary)] hover:bg-[var(--cms-secondary)] text-white">
              Create Complaint
            </Button>
          </Link>
        </div>

        <div className="bg-[var(--cms-gray-lighter)] p-5 rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-[var(--cms-secondary)]">
            <List className="mr-2" size={20} /> View Existing Complaints
          </h2>
          <p className="mb-4">
            Check the status of your existing complaints and view their history.
          </p>
          <Link href="/complaints">
            <Button className="bg-[var(--cms-primary)] hover:bg-[var(--cms-secondary)] text-white">
              View Complaints
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-[var(--cms-accent)] bg-opacity-10 p-5 rounded border border-[var(--cms-accent)]">
        <h2 className="text-xl font-semibold mb-3 flex items-center text-[var(--cms-dark)]">
          <Info className="mr-2 text-[var(--cms-accent)]" /> Important
          Information
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            All complaints are reviewed by our team within 1-2 business days.
          </li>
          <li>
            You will receive updates via email regarding your complaint status.
          </li>
          <li>
            For urgent matters, please call 1-800-MEDICARE (1-800-633-4227).
          </li>
          <li>
            All information submitted is protected in accordance with the
            Privacy Act.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
