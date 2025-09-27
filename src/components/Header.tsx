import { Button } from "@/components/ui/button";
import { Sparkles, User, LogOut, Settings, ChevronDown, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

// Clean Header component without sidebar dependencies
const Header = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      // First try to sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      // Even if there's a session error, we should still clear local state
      if (error && error.message !== "Session from session_id claim in JWT does not exist") {
        console.warn("Sign out warning:", error.message);
      }
      
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      
      // Force page refresh to clear auth state and redirect to home
      window.location.href = "/";
    } catch (error: any) {
      console.error("Sign out error:", error);
      
      // Even if sign out fails, clear local state and redirect
      toast({
        title: "Signed out",
        description: "You have been signed out of your account.",
      });
      
      // Force page refresh to clear any cached auth state
      window.location.href = "/";
    }
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-premium rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-premium rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-premium bg-clip-text text-transparent">
              Glo AI Studio
            </span>
          </Link>

          {/* Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    to="/"
                    className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-premium")}
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    to="/projects"
                    className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-premium")}
                  >
                    Projects
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    to="/images"
                    className={cn(navigationMenuTriggerStyle(), "text-foreground hover:text-premium")}
                  >
                    Images
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Section */}
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            // User is authenticated - show user menu
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-premium/30 text-premium hover:bg-premium/10 hover:border-premium/50">
                  <User className="w-4 h-4 mr-2" />
                  {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                  <ChevronDown className="w-3 h-3 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.user_metadata?.full_name || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/projects" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    My Projects
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // User is not authenticated - show sign in button
            <Button variant="outline" className="border-premium/30 text-premium hover:bg-premium/10 hover:border-premium/50" asChild>
              <Link to="/sign-in">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;