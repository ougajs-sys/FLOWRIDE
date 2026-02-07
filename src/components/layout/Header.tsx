 import { useState } from "react";
 import { Link } from "react-router-dom";
 import { Menu, X, ChevronDown } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { cn } from "@/lib/utils";
 
 const Header = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
 
    const navItems = [
      {
        label: "Clients",
        href: "/clients",
        children: [
          { label: "Nos Offres", href: "/clients/offres" },
          { label: "Catalogue Véhicules", href: "/clients/vehicules" },
          { label: "Demande de Devis", href: "/clients/devis" },
        ],
      },
      {
        label: "Partenaires",
        href: "/partenaires",
        children: [
          { label: "Programme Partenaire", href: "/partenaires/programme" },
          { label: "Devenir Partenaire", href: "/partenaires/rejoindre" },
        ],
      },
      {
        label: "Livre Blanc",
        href: "/livre-blanc",
      },
    ];
 
   return (
     <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
       <div className="container mx-auto px-4">
         <div className="flex items-center justify-between h-20">
           {/* Logo */}
           <Link to="/" className="flex items-center gap-2">
             <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
               <span className="text-primary-foreground font-display font-bold text-xl">F</span>
             </div>
             <span className="font-display text-2xl font-semibold">
               Flow<span className="text-primary">Ride</span>
             </span>
           </Link>
 
           {/* Desktop Navigation */}
           <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium transition-colors",
                        "hover:text-primary text-muted-foreground"
                      )}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 pt-2">
                        <div className="bg-card border border-border rounded-lg shadow-lg py-2 min-w-[200px]">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              className="block px-4 py-2 text-sm hover:bg-muted hover:text-primary transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}
           </nav>
 
           {/* CTA Button */}
           <div className="hidden md:flex items-center gap-4">
             <Link to="/admin">
               <Button variant="ghost" size="sm">
                 Admin
               </Button>
             </Link>
             <Link to="/clients/devis">
               <Button className="bg-gradient-gold hover:opacity-90 text-primary-foreground shadow-gold">
                 Demander un Devis
               </Button>
             </Link>
           </div>
 
           {/* Mobile Menu Button */}
           <button
             className="md:hidden p-2"
             onClick={() => setIsMenuOpen(!isMenuOpen)}
           >
             {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
           </button>
         </div>
 
         {/* Mobile Menu */}
         {isMenuOpen && (
           <div className="md:hidden py-4 border-t border-border">
              {navItems.map((item) => (
                <div key={item.label} className="py-2">
                  {item.children ? (
                    <>
                      <div className="font-medium text-sm text-muted-foreground mb-2">
                        {item.label}
                      </div>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block py-2 pl-4 text-sm hover:text-primary"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className="block py-2 text-sm font-medium hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
             <div className="pt-4 mt-4 border-t border-border space-y-2">
               <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                 <Button variant="outline" className="w-full">
                   Admin
                 </Button>
               </Link>
               <Link to="/clients/devis" onClick={() => setIsMenuOpen(false)}>
                 <Button className="w-full bg-gradient-gold text-primary-foreground">
                   Demander un Devis
                 </Button>
               </Link>
             </div>
           </div>
         )}
       </div>
     </header>
   );
 };
 
 export default Header;