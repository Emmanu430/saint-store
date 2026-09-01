    "use client";
    import { useState, useEffect } from "react";
    import { signIn, useSession } from "next-auth/react";
    import { useRouter } from "next/navigation";
    import { Eye, EyeOff } from "lucide-react";

    export default function Login() {
    const [mode, setMode] = useState<"signin" | "signup">("signin");
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { data: session, status } = useSession(); 
    const router = useRouter();
        useEffect(()=>{
            if(status === "authenticated"){
                router.push("/")
            }
        },[status, router])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
        });

        setLoading(false);
        if (res?.error) {
        setError("Invalid email or password.");
        } else {
        router.push("/");
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
        }

        await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
        });
        router.push("/");
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-[6vw] pt-20 pb-10 bg-obsidian text-ivory">
        <div className="w-full max-w-sm bg-charcoal border border-ivory/10 p-8">
            <div className="w-9 h-4.5 border-3 border-ivory rounded-full mx-auto mb-5" />
            <h1 className="font-display text-3xl text-center">SAINT</h1>
            <p className="text-center text-ivory-dim text-xs mt-2 mb-8">
            The motion never ends.
            </p>

            <div className="flex border border-ivory/15 mb-7">
            <button
                onClick={() => { setMode("signin"); setError(""); }}
                className={`flex-1 py-3 text-xs tracking-widest uppercase font-semibold ${
                mode === "signin" ? "bg-ivory text-obsidian" : "text-ivory-dim"
                }`}
            >
                Sign In
            </button>
            <button
                onClick={() => { setMode("signup"); setError(""); }}
                className={`flex-1 py-3 text-xs tracking-widest uppercase font-semibold ${
                mode === "signup" ? "bg-ivory text-obsidian" : "text-ivory-dim"
                }`}
            >
                Sign Up
            </button>
            </div>

            {error && (
            <p className="text-xs text-burgundy-bright mb-4 text-center">{error}</p>
            )}

            {mode === "signin" ? (
            <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                <Field label="Email" type="email" name="email" placeholder="you@email.com" onChange={handleChange} />
                <Field label="Password" type="password" name="password" placeholder="••••••••" onChange={handleChange} />
                <button disabled={loading} className="mt-2 bg-burgundy hover:bg-burgundy-bright disabled:opacity-50 transition-colors py-3.5 text-xs tracking-widest uppercase font-bold">
                {loading ? "Signing In..." : "Sign In"}
                </button>
            </form>
            ) : (
            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                <Field label="Full Name" type="text" name="name" placeholder="Your name" onChange={handleChange} />
                <Field label="Email" type="email" name="email" placeholder="you@email.com" onChange={handleChange} />
                <Field label="Password" type="password" name="password" placeholder="••••••••" onChange={handleChange} />
                <button disabled={loading} className="mt-2 bg-burgundy hover:bg-burgundy-bright disabled:opacity-50 transition-colors py-3.5 text-xs tracking-widest uppercase font-bold">
                {loading ? "Creating Account..." : "Create Account"}
                </button>
            </form>
            )}

            <p className="text-center text-xs text-gunmetal mt-5">
            By continuing you agree to SAINT&apos;s Terms and Privacy Policy.
            </p>
        </div>
        </main>
    );
    }

    function Field({
    label, type, name, placeholder, onChange,
    }: {
    label: string; type: string; name: string; placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }) {
    const [show, setShow] = useState(false);
    const isPassword = type === "password";

    return (
        <div>
        <label className="block text-[10px] tracking-widest uppercase text-ivory-dim mb-1.5">
            {label}
        </label>
        <div className="relative">
            <input
            type={isPassword && show ? "text" : type}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            className="w-full bg-obsidian border border-ivory/15 px-3.5 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-bright"
            />
            {isPassword && (
            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory-dim hover:text-ivory"
            >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            )}
        </div>
        </div>
    );
}