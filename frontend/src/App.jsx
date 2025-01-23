import { Routes, Route, BrowserRouter } from "react-router-dom";
import Services from "./pages/Services";
import ContactUs from "./pages/ContactUs";
import Portfolio from "./pages/Portfolio";
import WhyChooseUs from "./pages/WhyChooseUs";
import AllBlog from "./pages/AllBlog";
import Blog from "./pages/Blog";
import AdminLogin from "./pages/AdminLogin";
import AppLayout from "./components/AppLayout";
import CreateBlog from "./pages/CreateBlog";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LoginContextProvider } from "./context/LoginContext";
import PrivateRoutes from "./components/PrivateRoutes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <LoginContextProvider>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Services />} />
              <Route path="contact-us" element={<ContactUs />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="why-choose-us" element={<WhyChooseUs />} />
              <Route path="blogs" element={<AllBlog />} />
              <Route path="blog/:id" element={<Blog />} />

              <Route path="" element={<PrivateRoutes />}>
                <Route path="create/blog" element={<CreateBlog type={0} />} />
                <Route path="edit/blog/:id" element={<CreateBlog type={1} />} />
              </Route>
              <Route path="admin/login" element={<AdminLogin />} />
            </Route>
          </Routes>
        </LoginContextProvider>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#374151",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
