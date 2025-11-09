"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { api } from "@/service/axios";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const cleanFields = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email or password");
      return;
    }
    try {
      setIsLoading(true);
      await api.post("/auth/find/user", { email, password });
      router.push("/chat");
    } catch (error) {
      alert("Error logging in, please check your credentials.");
    } finally {
      cleanFields();
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please enter name, email or password");
      return;
    }

    try {
      setIsLoading(true);
      await api.post("/auth/create", { name, email, password });
      router.push("/chat");
    } catch (error: AxiosError | any) {
      alert("Error:" + error.response?.data?.message[0] || error);
    } finally {
      cleanFields();
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                {isRegister && (
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {isRegister ? (
                  <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    onClick={handleRegister}
                    disabled={isLoading}
                  >
                    Register
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    Login
                  </Button>
                )}
              </div>
              <div className="text-center text-sm">
                {isRegister
                  ? "Already have an account? "
                  : "Don't have an account? "}
                <Button
                  className="bg-transparent p-0 text-color font-medium underline underline-offset-4 hover:bg-transparent cursor-pointer"
                  onClick={() => setIsRegister(!isRegister)}
                >
                  {isRegister ? "Sign in" : "Sign up"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
