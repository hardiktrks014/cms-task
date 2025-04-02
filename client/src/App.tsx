import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import ComplaintsPage from "@/pages/ComplaintsPage";
import ComplaintDetailPage from "@/pages/ComplaintDetailPage";
import InstructionsPage from "./pages/InstructionsPage";
import ComplaintTypePage from "./pages/ComplaintTypePage";
import ComplainantDetailsPage from "./pages/ComplainantDetailsPage";
import Layout from "@/components/layout/Layout";
import NewComplaintPage from "./pages/NewComplaintPage";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={InstructionsPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/complaint-type" component={ComplaintTypePage} />
        {/* <Route path="/complainant-details" component={ComplainantDetailsPage} /> */}
        <Route path="/complaints" component={ComplaintsPage} />
        <Route path="/complaints/new" component={NewComplaintPage} />
        <Route path="/complaints/:id" component={ComplaintDetailPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
