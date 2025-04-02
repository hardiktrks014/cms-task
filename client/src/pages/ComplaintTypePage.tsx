import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ComplaintType } from "@/types";

const ComplaintTypePage = () => {
  const [, setLocation] = useLocation();
  const [selectedType, setSelectedType] = useState<ComplaintType | null>(null);

  const complaintTypes: ComplaintType[] = [
    "Transactions",
    "Code Sets",
    "Unique Identifiers",
    "Operating Rules",
  ];

  const handleTypeSelect = (type: ComplaintType) => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (selectedType) {
      // Navigate to the next page, passing the selected type as a URL parameter
      setLocation(`/complaints/new?type=${selectedType}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-[800px]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--cms-primary-darker)] mb-4">
          Select Complaint Type
        </h1>
        <p className="text-[var(--cms-gray-dark)]">
          Please select the category that best describes your complaint. This
          helps us route your complaint to the appropriate department.
        </p>
      </div>

      <div className="grid gap-6 mb-8">
        {complaintTypes.map((type) => (
          <Card
            key={type}
            className={`cursor-pointer transition-all ${
              selectedType === type
                ? "border-[var(--cms-primary)] bg-[var(--cms-gray-lighter)]"
                : "hover:border-[var(--cms-gray-light)]"
            }`}
            onClick={() => handleTypeSelect(type)}
          >
            <CardHeader className="!pb-0">
              <CardTitle className="text-lg font-medium text-[var(--cms-primary-dark)]">
                {type}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {type === "Transactions" &&
                  `Select if a covered entity is in violation of the following transactions: claims and encounter information, payment and remittance advice, claims status, eligibility, enrollment and disenrollment, referrals and authorizations, coordination of
benefits and premium payment.`}
                {type === "Code Sets" &&
                  `Select if a covered entity is in violation of the following Code Sets: HCPCS (Ancillary Services/Procedures), CPT-4 (Physicians Procedures), CDT (Dental Terminology), ICD-9 (Diagnosis and Hospital Inpatient Procedures), ICD-10 (As of October 1, 2015) and NDC (National Drug Codes) codes with which providers and health plan are familiar, are the adopted code sets for procedures, diagnoses, and drugs.`}
                {type === "Unique Identifiers" &&
                  `Select if a covered entity is in violation of the following Unique Identifiers: National Provider Identifier (NPI), Employer Identification Number (EIN).`}
                {type === "Operating Rules" &&
                  `Select if a covered entity is suspected of being in violation of any of the adopted Operating Rules: Electronic Funds Transfer/Electronic Remittance Advice (EFT/ERA), Health Care Claim Status, and Eligibility for a Health Plan.`}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => setLocation("/")}
          className="text-[var(--cms-primary)] border-[var(--cms-primary)]"
        >
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!selectedType}
          className="bg-[var(--cms-primary)] hover:bg-[var(--cms-primary-dark)]"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ComplaintTypePage;
