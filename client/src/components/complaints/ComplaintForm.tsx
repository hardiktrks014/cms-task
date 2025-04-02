import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const complaintSchema = z.object({
  // Anonymous Preference
  remainAnonymous: z.boolean().optional(),

  // Organization Information
  organizationName: z
    .string()
    .min(1, { message: "Organization name is required" }),
  organizationType: z.string().optional(),
  organizationTypeOther: z.string().optional(),
  organizationRole: z.string().optional(),
  organizationPhone: z.string().regex(/^\d{10}$/, {
    message:
      "Organization Phone number must be 10 digits without spaces or special characters",
  }),

  // Complainant Information
  complainantTitle: z
    .string()
    .min(1, { message: "Complainant Title is required" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  middleInitial: z.string().optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),

  // Address Information
  addressLine1: z.string().min(1, { message: "Address line 1 is required" }),
  addressLine2: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().regex(/^\d{5}$/, {
    message: "Zip code must be 5 digits",
  }),
  zipExt: z.string().optional(),

  // Contact Information
  email: z.string().email({ message: "Please enter a valid email address" }),
  contactPhone: z.string().regex(/^\d{10}$/, {
    message:
      "Phone number must be 10 digits without spaces or special characters",
  }),
  contactPhoneExt: z.string().optional(),
  cellPhone: z.string().optional()
});

type ComplaintFormValues = z.infer<typeof complaintSchema>;

const ComplaintForm = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const form = useForm<ComplaintFormValues>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      remainAnonymous: false,
      organizationName: "",
      organizationType: "",
      organizationTypeOther: "",
      organizationRole: "",
      organizationPhone: "",
      complainantTitle: "",
      firstName: "",
      middleInitial: "",
      lastName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      zipExt: "",
      email: "",
      contactPhone: "",
      contactPhoneExt: "",
      cellPhone: ""
    },
  });

  const onSubmit = (data: ComplaintFormValues) => {
    console.log(data);
    // In a real implementation, this would be a form submission to the backend
    toast({
      title: "Complaint Submitted",
      description: "Your complaint has been successfully submitted.",
    });

    navigate("/complaints");
  };

  const handleCancel = () => {
    navigate("/complaints");
  };

  const handleInValidFormDetails = (errors: any) => {
    console.log(errors);
    toast({
      title: "Invalid form details",
      description: "Please fill in all the required fields.",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          handleInValidFormDetails(errors);
        })}
        className="space-y-6"
      >
        {/* Anonymity Preference */}
        <div className="p-4 border border-[var(--cms-gray-light)] rounded bg-[var(--cms-gray-lighter)]">
          <h2 className="text-lg font-semibold mb-4">Complainant Details</h2>

          <div className="mb-4">
            <FormField
              control={form.control}
              name="remainAnonymous"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormLabel className="font-semibold">
                    Do you want to remain anonymous during this process?
                  </FormLabel>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="anonymity"
                        value="yes"
                        checked={field.value === true}
                        onChange={() => field.onChange(true)}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="anonymity"
                        value="no"
                        checked={field.value === false}
                        onChange={() => field.onChange(false)}
                      />
                      <span>No</span>
                    </label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-2 text-xs text-[var(--cms-gray)]">
              <p>Disclosure:</p>
              <p>
                Please Note: CMS will not share your information with the Field
                Agent/Entity (i.e.) during the investigation process. However,
                information provided to departments and OCAs must be disclosed
                upon request under the Freedom of Information Act (FOIA), unless
                subject to an applicable FOIA exemption.
              </p>
            </div>
          </div>

          {/* Organization Information */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Organization Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="organizationName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Complainant Organization Name*
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organizationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Complainant Organization Type
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="--None--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Government">Government</SelectItem>
                          <SelectItem value="Non-profit">Non-profit</SelectItem>
                          <SelectItem value="Private">Private</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organizationTypeOther"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Complainant Organization Type (Other)
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organizationRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Complainant Organization Role
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organizationPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Complainant Organization Phone Number*
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        className="w-full"
                        placeholder="(XXX) XXX-XXXX"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Complainant Personal Information */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="complainantTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Complainant Title*
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="--None--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mr.">Mr.</SelectItem>
                          <SelectItem value="Mrs.">Mrs.</SelectItem>
                          <SelectItem value="Ms.">Ms.</SelectItem>
                          <SelectItem value="Dr.">Dr.</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Complainant First Name*
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="middleInitial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Complainant MI
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" maxLength={1} />
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
                    <FormLabel className="font-semibold">
                      Complainant Last Name*
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="addressLine1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Complainant Address Line 1*
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="addressLine2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Complainant Address Line 2
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Complainant City/Town*
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Complainant State/Territory*
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="--None--" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AL">Alabama</SelectItem>
                          <SelectItem value="AK">Alaska</SelectItem>
                          <SelectItem value="AZ">Arizona</SelectItem>
                          {/* Add all states here */}
                          <SelectItem value="WY">Wyoming</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Complainant Zip Code*
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full"
                            placeholder="XXXXX"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="zipExt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Ext.</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full"
                            placeholder="XXXX"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Complainant Email Address*
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="w-full"
                        placeholder="example@cms.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Complainant Contact Phone Number*
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            className="w-full"
                            placeholder="(XXX) XXX-XXXX"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="contactPhoneExt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Ext.</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="cellPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Complainant Cell Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        className="w-full"
                        placeholder="(XXX) XXX-XXXX"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-wrap gap-4 justify-between">
          <Button
            type="button"
            variant="outline"
            className="border-[var(--cms-primary)] text-[var(--cms-primary)]"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[var(--cms-primary)] hover:bg-[var(--cms-secondary)] text-white"
          >
            Specify Complaint Type
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ComplaintForm;
