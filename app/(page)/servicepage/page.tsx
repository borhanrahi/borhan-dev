import ServiceCTA from "@/app/components/servicepage/ServiceCTA";
import ServiceGrid from "@/app/components/servicepage/ServiceGrid";
import ServiceHero from "@/app/components/servicepage/ServiceHero";

export default function ServicePage() {
  return (
    <main
      className="relative min-h-screen w-screen overflow-hidden bg-black"
      suppressHydrationWarning
    >
      <div className="absolute inset-0 z-0" suppressHydrationWarning>
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0f1012] via-black to-black opacity-90"
          suppressHydrationWarning
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,17,17,0.8),rgba(0,0,0,0.8))]"
          suppressHydrationWarning
        />
      </div>
      <div suppressHydrationWarning>
        <ServiceHero />
        <ServiceGrid />
        <ServiceCTA />
      </div>
    </main>
  );
}
