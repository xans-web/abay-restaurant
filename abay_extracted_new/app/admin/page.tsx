"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple but secure PIN for this demo
    if (pin === "1234") {
      localStorage.setItem("admin_authenticated", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Incorrect PIN. Please try again.");
      setPin("");
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-4 tilet-pattern">
      <div className="max-w-md w-full bg-zinc-900/80 backdrop-blur-xl p-8 rounded-2xl border border-accent-gold/20 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none tilet-pattern" />
        
        <div className="text-center mb-8 relative z-10">
          <h1 className="text-4xl font-serif text-accent-gold mb-2 uppercase tracking-widest">Addis Admin</h1>
          <p className="text-accent-gold/60 text-xs uppercase tracking-[0.3em]">Access Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-accent-gold/60 font-bold mb-2 ml-4">Enter Admin PIN</label>
            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="••••"
              className="w-full bg-zinc-950 border border-accent-gold/20 rounded-full py-4 px-6 text-center text-2xl tracking-[1em] text-accent-gold focus:outline-none focus:border-accent-gold transition-all placeholder:text-zinc-800"
            />
          </div>

          {error && <p className="text-red-500 text-center text-[10px] uppercase tracking-widest font-bold">{error}</p>}

          <button
            type="submit"
            className="w-full bg-accent-gold text-zinc-950 py-4 rounded-full font-black uppercase tracking-[0.3em] text-xs hover:scale-[1.02] transition-transform active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            Authenticate
          </button>
        </form>
      </div>
      
      <p className="mt-8 text-zinc-600 text-[10px] uppercase tracking-widest font-bold cursor-pointer hover:text-accent-gold transition-colors" onClick={() => router.push("/")}>
        ← Back to Restaurant Menu
      </p>
    </div>
  );
}
