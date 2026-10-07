import Sidebar from "@/components/Sidebar";
export default function Home () {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Sidebar/>
      {/* Temporary dashboard content */}
      <section className="flex-1 p-8">
        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>
        <p className="mt-2 text-slate-400">
          Welcome to PulseHR.
        </p>
      </section>
      
    </main>
  );
}