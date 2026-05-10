"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import { API_URL } from "@/lib/api";

const QUOTES = [
  "The world is a book and those who do not travel read only one page.",
  "Travel is the only thing you buy that makes you richer.",
  "Jobs fill your pocket, adventures fill your soul.",
  "To travel is to live.",
  "Life is either a daring adventure or nothing at all."
];

function Traveler({ isCovering, isPeeking }: { isCovering: boolean, isPeeking: boolean }) {
  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 transition-all duration-500 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Backpack (Behind) */}
        <motion.g animate={{ rotate: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity }}>
          <rect x="75" y="65" width="50" height="70" rx="10" fill="#5D4037" />
          <rect x="80" y="70" width="40" height="20" rx="5" fill="#4E342E" />
          <rect x="85" y="100" width="30" height="25" rx="4" fill="#4E342E" />
          {/* Straps */}
          <path d="M75 80 Q60 100 75 120" stroke="#3E2723" strokeWidth="4" fill="none" />
          <path d="M125 80 Q140 100 125 120" stroke="#3E2723" strokeWidth="4" fill="none" />
        </motion.g>

        {/* Legs / Boots */}
        <rect x="82" y="150" width="12" height="30" fill="#37474F" /> {/* Left leg */}
        <rect x="106" y="150" width="12" height="30" fill="#37474F" /> {/* Right leg */}
        <rect x="78" y="175" width="18" height="8" rx="2" fill="#212121" /> {/* Left boot */}
        <rect x="104" y="175" width="18" height="8" rx="2" fill="#212121" /> {/* Right boot */}

        {/* Torso / Shirt */}
        <path d="M70 150 L130 150 L125 80 L75 80 Z" fill="#A0724B" />
        <rect x="75" y="80" width="50" height="70" rx="5" fill="#A0724B" />
        
        {/* Head */}
        <circle cx="100" cy="55" r="22" fill="#D7B19D" />
        {/* Hair / Cap */}
        <path d="M78 50 Q100 30 122 50 L122 45 Q100 20 78 45 Z" fill="#4E342E" />
        <rect x="78" y="45" width="44" height="8" rx="2" fill="#5D4037" />

        {/* Face Features */}
        <AnimatePresence>
          {!isCovering && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Eyes */}
              <circle cx="92" cy="58" r="2.5" fill="black" />
              <circle cx="108" cy="58" r="2.5" fill="black" />
              {/* Smile */}
              <path d="M92 68 Q100 75 108 68" stroke="black" strokeWidth="1.5" fill="none" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Arms and Hands */}
        <motion.g
          animate={isCovering ? { y: -25, x: 0 } : isPeeking ? { y: -25, x: 4 } : { y: 0, x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Left Arm */}
          <path d="M70 100 Q50 120 70 140" stroke="#D7B19D" strokeWidth="8" strokeLinecap="round" fill="none" 
            className="transition-all duration-300"
          />
          <motion.circle 
            cx="70" cy="140" r="8" fill="#D7B19D" 
            animate={isCovering ? { cx: 92, cy: 60 } : isPeeking ? { cx: 85, cy: 60 } : { cx: 70, cy: 140 }}
          />
          
          {/* Right Arm */}
          <path d="M130 100 Q150 120 130 140" stroke="#D7B19D" strokeWidth="8" strokeLinecap="round" fill="none" 
            className="transition-all duration-300"
          />
          <motion.circle 
            cx="130" cy="140" r="8" fill="#D7B19D" 
            animate={isCovering ? { cx: 108, cy: 60 } : isPeeking ? { cx: 115, cy: 60 } : { cx: 130, cy: 140 }}
          />
        </motion.g>
      </svg>
    </div>
  );
}

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<"login" | "signup" | "forgot">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target as HTMLFormElement;
    const inputs = form.querySelectorAll('input');
    
    try {
      if (authMode === "forgot") {
        const email = inputs[0].value;
        const newPassword = inputs[1].value;
        const res = await fetch(`${API_URL}/api/auth/reset-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        alert("Password reset successful!");
        setAuthMode("login");
        return;
      }

      let name = "", email = "", password = "";
      if (authMode === "login") {
        email = inputs[0].value;
        password = inputs[1].value;
      } else {
        name = inputs[0].value;
        email = inputs[1].value;
        password = inputs[2].value;
        if (password !== inputs[3].value) {
          alert("Passwords do not match!");
          setIsLoading(false);
          return;
        }
      }

      const endpoint = authMode === "login" ? "/api/auth/login" : "/api/auth/signup";
      const bodyPayload = authMode === "login" ? { email, password } : { name, email, password };
      
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Authentication failed");

      if (data.token) localStorage.setItem("token", data.token);
      
      const userName = data.user?.name || (authMode === "login" ? email.split('@')[0] : name) || "Traveler";
      localStorage.setItem("userName", userName);

      if (authMode === "signup" && !data.token) {
        setAuthMode("login");
        form.reset();
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      setIsLoading(true);
      try {
        const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${response.access_token}` },
        });
        const userInfo = await userInfoRes.json();
        const res = await fetch(`${API_URL}/api/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profile: userInfo }),
        });
        const data = await res.json();
        if (data.token) {
          localStorage.setItem("token", data.token);
          router.push("/dashboard");
        }
      } catch (err) { alert("Google Login Failed"); }
      finally { setIsLoading(false); }
    },
  });

  const isCovering = isPasswordFocused && !showPassword;
  const isPeeking = isPasswordFocused && showPassword;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-6">
      <div className="absolute inset-0 z-0">
        <motion.div animate={{ x: [0, 100, 0], y: [0, -50, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px]" />
        <motion.div animate={{ x: [0, -100, 0], y: [0, 100, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary-950/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
        
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 max-w-xl">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}>
            <Traveler isCovering={isCovering} isPeeking={isPeeking} />
          </motion.div>
          
          <div className="space-y-4 w-full">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight">
              Start Your <span className="text-primary-400">Journey.</span>
            </h1>
            <AnimatePresence mode="wait">
              <motion.div key={quoteIndex} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="relative">
                <span className="absolute -left-6 -top-2 text-primary-600/40 text-6xl font-serif">“</span>
                <p className="text-xl md:text-2xl text-white/60 font-medium leading-relaxed italic max-w-md">
                  {QUOTES[quoteIndex]}
                </p>
                <span className="absolute -right-2 bottom-0 text-primary-600/40 text-6xl font-serif">”</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4 text-white/40 text-sm font-medium pt-8">
            <div className="w-12 h-px bg-white/10"></div>
            <span>TRUSTED BY 10,000+ TRAVELERS</span>
            <div className="w-12 h-px bg-white/10"></div>
          </div>
        </div>

        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="w-full max-w-md p-8 glass-card border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-500/10 rounded-full blur-[60px]"></div>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-white mb-2">Traveloop</h2>
            <p className="text-white/40 text-sm">Welcome back, explorer!</p>
          </div>

          {authMode !== "forgot" && (
            <div className="flex p-1 bg-white/5 rounded-xl mb-8 relative">
              <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primary-600 rounded-lg transition-all duration-300 ease-out ${authMode === "login" ? 'left-1' : 'left-[calc(50%+2px)]'}`} />
              <button className={`flex-1 py-2 text-sm font-medium z-10 transition-colors ${authMode === "login" ? 'text-white' : 'text-white/60 hover:text-white'}`} onClick={() => setAuthMode("login")}>Sign In</button>
              <button className={`flex-1 py-2 text-sm font-medium z-10 transition-colors ${authMode === "signup" ? 'text-white' : 'text-white/60 hover:text-white'}`} onClick={() => setAuthMode("signup")}>Sign Up</button>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.form key={authMode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} onSubmit={handleSubmit} className="space-y-4">
              {authMode === "signup" && (
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-primary-400 transition-colors" />
                  <input type="text" placeholder="Full Name" className="w-full glass-input pl-10" required />
                </div>
              )}
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-primary-400 transition-colors" />
                <input type="email" placeholder="Email Address" className="w-full glass-input pl-10" required />
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-primary-400 transition-colors" />
                <input type={showPassword ? "text" : "password"} placeholder={authMode === "forgot" ? "New Password" : "Password"} className="w-full glass-input pl-10 pr-12" required onFocus={() => setIsPasswordFocused(true)} onBlur={() => setIsPasswordFocused(false)} />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-primary-400 transition-all z-20" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {authMode === "signup" && (
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-primary-400 transition-colors" />
                  <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" className="w-full glass-input pl-10 pr-12" required onFocus={() => setIsPasswordFocused(true)} onBlur={() => setIsPasswordFocused(false)} />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-primary-400 transition-all z-20" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              )}
              {authMode === "login" && <div className="text-right"><button type="button" onClick={() => setAuthMode("forgot")} className="text-sm text-primary-400 hover:text-primary-300">Forgot Password?</button></div>}
              <button type="submit" disabled={isLoading} className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold shadow-xl shadow-primary-950/20 transition-all flex items-center justify-center gap-2 group">
                {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><span>{authMode === "login" ? "Sign In" : authMode === "signup" ? "Create Account" : "Update Password"}</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
              </button>
              {authMode !== "forgot" && (
                <>
                  <div className="pt-4 flex items-center gap-4"><div className="flex-1 h-px bg-white/10" /><span className="text-sm text-white/40">Or continue with</span><div className="flex-1 h-px bg-white/10" /></div>
                  <button type="button" onClick={() => googleLogin()} className="w-full py-3 glass-button flex items-center justify-center gap-3 hover:bg-white/10 font-medium">
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                    <span>Google</span>
                  </button>
                </>
              )}
            </motion.form>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
