import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sparkles,
  User,
  MessageCircle,
  Compass,
  Home,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "./Components/ui/sidebar";
import { Button } from "./Components/ui/button";
import { AuthContext } from "./context/authContext"; // 👈 import context

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Career Mentor", url: "/chatbot", icon: MessageCircle },
  { title: "Explore Careers", url: "/recommendations", icon: Compass },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();

  // 👇 get values from AuthContext
  const { user, handleLogout } = useContext(AuthContext);

  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");

  return (
    <SidebarProvider>
      <style>
        {`
          :root {
            --mint: 134, 239, 172;
            --lavender: 196, 181, 253;
            --soft-blue: 147, 197, 253;
            --cream: 254, 252, 232;
            --sage: 163, 230, 53;
          }
          .gradient-mint { background: linear-gradient(135deg, rgb(var(--mint)) 0%, rgb(var(--sage)) 100%); }
          .gradient-lavender { background: linear-gradient(135deg, rgb(var(--lavender)) 0%, rgb(var(--soft-blue)) 100%); }
          .gradient-soft { background: linear-gradient(135deg, rgb(var(--cream)) 0%, rgba(var(--mint), 0.1) 100%); }
          .text-gradient { background: linear-gradient(135deg, #10b981, #8b5cf6); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
          body { background: linear-gradient(135deg, rgb(var(--cream)) 0%, rgba(var(--mint), 0.05) 50%, rgba(var(--lavender), 0.05) 100%); }
        `}
      </style>

      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r border-purple-100 bg-white/70 backdrop-blur-sm">
          <SidebarHeader className="border-b border-purple-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-lavender rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-gradient">CareerAI</h2>
                <p className="text-xs text-purple-600 font-medium">Your AI Career Guide</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-purple-600 uppercase tracking-wider px-3 py-3">
                Navigate
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`transition-all duration-300 rounded-xl hover:bg-purple-50 hover:shadow-md ${location.pathname === item.url
                            ? "bg-gradient-to-r from-purple-100 to-blue-50 text-purple-700 shadow-md"
                            : "text-gray-700 hover:text-purple-700"
                          }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

              {/* ✅ Profile link only if logged in */}
            {user && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={`transition-all duration-300 rounded-xl hover:bg-purple-50 hover:shadow-md ${location.pathname === "/profile"
                      ? "bg-gradient-to-r from-purple-100 to-blue-50 text-purple-700 shadow-md"
                      : "text-gray-700 hover:text-purple-700"
                    }`}
                >
                  <Link to="/profile" className="flex items-center gap-3 px-4 py-3">
                    <User className="w-5 h-5" />
                    <span className="font-medium">My Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}

            {/* ✅ Auth buttons */}
            <div>
              {!user ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={handleRegister}
                    className="text-5 w-full justify-start text-gray-600 mb-3"
                  >
                    Register
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleLogin}
                    className="text-5 w-full justify-start text-gray-600 "
                  >
                    Login
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-5 w-full justify-start text-gray-600 "
                >
                  Logout
                </Button>
              )}
            </div>
          
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/70 backdrop-blur-sm border-b border-purple-100 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-purple-100 p-2 rounded-lg transition-colors" />
              <h1 className="text-xl font-bold text-gradient">CareerAI</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
