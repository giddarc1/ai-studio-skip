const BrandRibbon = () => {
  const brands = [
    { name: "LUXE", category: "Jewelry" },
    { name: "NOVA", category: "Fashion" },
    { name: "APEX", category: "Tech" },
    { name: "ZENITH", category: "Luxury" },
    { name: "PULSE", category: "Electronics" },
    { name: "VOGUE", category: "Apparel" },
    { name: "PRIME", category: "Retail" },
    { name: "ELITE", category: "Brands" },
  ];

  return (
    <section className="py-16 bg-muted/30 border-y border-border/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-muted-foreground font-medium mb-4">
            Trusted by Leading Brands
          </p>
          <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
            Join 2,000+ Companies Already Creating Stunning Product Images
          </h2>
        </div>
        
        {/* Brand logos scrollable ribbon */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-x space-x-8 py-4">
            {/* First set of brands */}
            {brands.map((brand, index) => (
              <div
                key={`${brand.name}-1`}
                className="flex flex-col items-center group hover:scale-105 transition-transform duration-300 flex-shrink-0"
              >
                <div className="w-24 h-16 bg-gradient-to-r from-muted to-muted/50 border border-border/30 rounded-lg flex items-center justify-center mb-2 group-hover:shadow-md transition-shadow">
                  <span className="text-sm font-bold text-foreground/70 tracking-wider">
                    {brand.name}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                  {brand.category}
                </span>
              </div>
            ))}
            {/* Duplicate set for seamless scrolling */}
            {brands.map((brand, index) => (
              <div
                key={`${brand.name}-2`}
                className="flex flex-col items-center group hover:scale-105 transition-transform duration-300 flex-shrink-0"
              >
                <div className="w-24 h-16 bg-gradient-to-r from-muted to-muted/50 border border-border/30 rounded-lg flex items-center justify-center mb-2 group-hover:shadow-md transition-shadow">
                  <span className="text-sm font-bold text-foreground/70 tracking-wider">
                    {brand.name}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                  {brand.category}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Stats below brands */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-border/30">
          <div className="text-center">
            <div className="text-3xl font-bold text-premium mb-2">2M+</div>
            <div className="text-sm text-muted-foreground">Images Generated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">2K+</div>
            <div className="text-sm text-muted-foreground">Active Brands</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-premium mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandRibbon;