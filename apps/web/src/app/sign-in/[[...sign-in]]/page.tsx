import { SignIn } from "@clerk/nextjs";
import { Flame } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex items-center gap-2.5">
        <div className="flex items-center justify-center w-9 h-9 bg-orange-500 rounded-lg">
          <Flame className="w-5 h-5 text-white" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-white">FORGE</span>
      </div>
      <SignIn />
    </div>
  );
}
