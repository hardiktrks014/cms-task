import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocation, useSearch } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Create a schema for form validation
const complainantSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().optional(),
  zipCode: z.string().min(5, { message: 'ZIP code must be at least 5 characters' }),
});

type ComplainantFormValues = z.infer<typeof complainantSchema>;

const ComplainantDetailsPage = () => {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const type = new URLSearchParams(search).get('type') || '';

  // Initialize the form with default values
  const form = useForm<ComplainantFormValues>({
    resolver: zodResolver(complainantSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      zipCode: '',
    },
  });

  const handleSubmit = (data: ComplainantFormValues) => {
    // Combine form data with the complaint type from the URL
    const complaintData = {
      ...data,
      type: type,
    };
    
    // Store the data in local storage or context for the next step
    localStorage.setItem('complainantDetails', JSON.stringify(complaintData));
    
    // Navigate to the next step
    setLocation('/complaints/new');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-[800px]">
      <Card className="w-full">
        <CardHeader className="bg-[var(--cms-gray-lighter)] border-b border-[var(--cms-gray-light)]">
          <CardTitle className="text-xl text-[var(--cms-primary-darker)]">
            Complaint Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--cms-gray-darker)]">First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--cms-gray-darker)]">Last Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--cms-gray-darker)]">Email Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email address" type="email" {...field} />
                    </FormControl>
                    <FormDescription>
                      We'll never share your email with anyone else.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--cms-gray-darker)]">Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" type="tel" {...field} />
                    </FormControl>
                    <FormDescription>Optional, but helpful for follow-up.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--cms-gray-darker)]">ZIP Code *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter ZIP code" {...field} className="max-w-xs" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between items-center pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setLocation('/complaint-type')}
                  className="text-[var(--cms-primary)] border-[var(--cms-primary)]"
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className="bg-[var(--cms-primary)] hover:bg-[var(--cms-primary-dark)]"
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplainantDetailsPage;