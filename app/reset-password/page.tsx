    "use client";
    import { useState, Suspense } from "react";
    import { useSearchParams, useRouter } from "next/navigation";
    import { Eye, EyeOff } from "lucide-react";

    function ResetPasswordForm() {
    const params = useSearchParams();
    const router = useRouter();
    const token = params.get("token");

    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
        }

        setLoading(true);
        const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
        });
        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
        }

        setSuccess(true);
        setTimeout(() => router.push("/login"), 2000);
    };

    if (!token) {
        return <p className="text-center text-sm text-ivory-dim">Invalid or missing reset link.</p>;
    }

    return (
        <>
        {success ? (
            <p className="text-center text-sm text-ivory-dim">
            Password updated. Redirecting to sign in...
            </p>
        ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && <p className="text-xs text-burgundy-bright text-center">{error}</p>}
            <div>
                <label className="block text-[10px] tracking-widest uppercase text-ivory-dim mb-1.5">
                New Password
                </label>
                <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-obsidian border border-ivory/15 px-3.5 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-bright"
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory-dim hover:text-ivory"
                >
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                </div>
            </div>
            <button
                disabled={loading}
                className="mt-2 bg-burgundy hover:bg-burgundy-bright disabled:opacity-50 transition-colors py-3.5 text-xs tracking-widest uppercase font-bold"
            >
                {loading ? "Updating..." : "Update Password"}
            </button>
            </form>
        )}
        </>
    );
    }

    export default function ResetPassword() {
    return (
        <main className="min-h-screen flex items-center justify-center px-[6vw] pt-20 pb-10 bg-obsidian text-ivory">
        <div className="w-full max-w-sm bg-charcoal border border-ivory/10 p-8">
            <h1 className="font-display text-3xl text-center">SAINT</h1>
            <p className="text-center text-ivory-dim text-xs mt-2 mb-8">Set a new password</p>
            <Suspense fallback={<p className="text-center text-sm text-ivory-dim">Loading...</p>}>
            <ResetPasswordForm />
            </Suspense>
        </div>
        </main>
    );
}