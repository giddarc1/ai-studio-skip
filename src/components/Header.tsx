import { Button } from "@/components/ui/button";
import { Camera, User } from "lucide-react";
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
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-premium rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-premium-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">JewelStudio</span>
          </div>

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

          {/* Sign In Button */}
          <Button variant="outline" className="border-premium/30 text-premium hover:bg-premium/10 hover:border-premium/50">
            <User className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;