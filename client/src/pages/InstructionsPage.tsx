import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, FileText, Lock, Phone, Shield } from 'lucide-react';

const InstructionsPage = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="container mx-auto px-4 py-8 max-w-[800px]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--cms-primary-darker)] mb-4">
          How to File a Medicare Complaint
        </h1>
        <p className="text-[var(--cms-gray-dark)]">
          Filing a complaint with Medicare is an important way to voice concerns about the quality of care or service you received. 
          This form will guide you through the process of filing a complaint. Please read the instructions below before proceeding.
        </p>
      </div>

      <Alert className="mb-6 border-[var(--cms-warning)] bg-amber-50">
        <AlertCircle className="h-4 w-4 text-[var(--cms-warning)]" />
        <AlertTitle className="text-[var(--cms-gray-darker)]">Important Notice</AlertTitle>
        <AlertDescription className="text-[var(--cms-gray-dark)]">
          This form is for non-urgent complaints only. If you have an urgent medical need, please contact 
          your healthcare provider directly or call 1-800-MEDICARE (1-800-633-4227).
        </AlertDescription>
      </Alert>

      <Card className="mb-6">
        <CardHeader className="bg-[var(--cms-gray-lighter)] border-b">
          <CardTitle className="text-lg text-[var(--cms-primary-darker)]">
            Instructions for Filing a Complaint
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ol className="list-decimal pl-5 space-y-4">
            <li className="text-[var(--cms-gray-darker)]">
              <span className="font-medium">Select complaint type:</span> Choose the category that best describes your complaint.
            </li>
            <li className="text-[var(--cms-gray-darker)]">
              <span className="font-medium">Provide contact information:</span> We'll need your basic contact details to follow up on your complaint.
            </li>
            <li className="text-[var(--cms-gray-darker)]">
              <span className="font-medium">Describe your complaint:</span> Provide specific details about your complaint, including dates, names, and any relevant information.
            </li>
            <li className="text-[var(--cms-gray-darker)]">
              <span className="font-medium">Upload supporting documents:</span> You can attach bills, correspondence, or other documents that support your complaint.
            </li>
            <li className="text-[var(--cms-gray-darker)]">
              <span className="font-medium">Review and submit:</span> Review your information for accuracy before submitting.
            </li>
          </ol>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <div className="flex items-start space-x-4">
          <Shield className="h-10 w-10 text-[var(--cms-primary-dark)] mt-1" />
          <div>
            <h3 className="font-medium text-[var(--cms-gray-darker)]">Privacy Protected</h3>
            <p className="text-sm text-[var(--cms-gray-dark)]">
              Your personal information is protected under the Privacy Act of 1974.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <Lock className="h-10 w-10 text-[var(--cms-primary-dark)] mt-1" />
          <div>
            <h3 className="font-medium text-[var(--cms-gray-darker)]">Secure Submission</h3>
            <p className="text-sm text-[var(--cms-gray-dark)]">
              This form uses encryption to protect your sensitive information.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <Phone className="h-10 w-10 text-[var(--cms-primary-dark)] mt-1" />
          <div>
            <h3 className="font-medium text-[var(--cms-gray-darker)]">Need Help?</h3>
            <p className="text-sm text-[var(--cms-gray-dark)]">
              Call 1-800-MEDICARE (1-800-633-4227) for assistance with this form.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <FileText className="h-10 w-10 text-[var(--cms-primary-dark)] mt-1" />
          <div>
            <h3 className="font-medium text-[var(--cms-gray-darker)]">Response Time</h3>
            <p className="text-sm text-[var(--cms-gray-dark)]">
              Complaints are typically processed within 30 days of submission.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={() => setLocation('/complaint-type')}
          className="bg-[var(--cms-primary)] hover:bg-[var(--cms-primary-dark)]"
        >
          Begin Complaint Process
        </Button>
      </div>
    </div>
  );
};

export default InstructionsPage;