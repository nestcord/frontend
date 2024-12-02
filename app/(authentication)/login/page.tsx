"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AppleIcon, ChromeIcon as GoogleIcon } from "lucide-react";
import { db } from "@/controllers/client/client";

export default function Login() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Iniciando sesión con:", loginData);
  };

  const handleGoogleLogin = async () => {
    const { error } = await db.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error(error.name, error.message);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registrando con:", registerData);
  };

  return (
    <div className="min-h-screen bg-[#36393f] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#36393f] to-[#202225] pointer-events-none" />

      <Card className="w-[480px] bg-[#2f3136] border-none shadow-lg z-10">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#202225] rounded-t-lg">
            <TabsTrigger
              value="login"
              className="text-white data-[state=active]:bg-[#2f3136]"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="text-white data-[state=active]:bg-[#2f3136]"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">
                Welcome back!
              </CardTitle>
              <CardDescription className="text-[#b9bbbe]">
                We are happy to see you again
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="login-username"
                    className="text-[#b9bbbe] uppercase text-xs font-bold"
                  >
                    Email
                  </Label>
                  <Input
                    id="login-username"
                    required
                    value={loginData.username}
                    onChange={(e) =>
                      setLoginData({ ...loginData, username: e.target.value })
                    }
                    className="bg-[#202225] border-none text-white placeholder-[#72767d]"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="login-password"
                    className="text-[#b9bbbe] uppercase text-xs font-bold"
                  >
                    Password
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    required
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    className="bg-[#202225] border-none text-white placeholder-[#72767d]"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white"
                >
                  Log In
                </Button>
              </form>
              <div className="text-[#b9bbbe] text-sm">
                <a href="#" className="hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <Separator className="bg-[#4f545c]" />
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full bg-white text-black hover:bg-[#d4d7dc]"
                  onClick={handleGoogleLogin}
                >
                  <GoogleIcon className="mr-2 h-4 w-4" />
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-black text-white hover:bg-[#2c2f33]"
                  onClick={() => console.log("Login with Apple")}
                >
                  <AppleIcon className="mr-2 h-4 w-4" />
                  Continue with Apple
                </Button>
              </div>
            </CardContent>
          </TabsContent>
          <TabsContent value="register">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">
                Create an account
              </CardTitle>
              <CardDescription className="text-[#b9bbbe]">
                ¡Únete a nuestra comunidad hoy mismo!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="register-email"
                    className="text-[#b9bbbe] uppercase text-xs font-bold"
                  >
                    Email
                  </Label>
                  <Input
                    id="register-email"
                    type="email"
                    required
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        email: e.target.value,
                      })
                    }
                    className="bg-[#202225] border-none text-white placeholder-[#72767d]"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="register-username"
                    className="text-[#b9bbbe] uppercase text-xs font-bold"
                  >
                    Username
                  </Label>
                  <Input
                    id="register-username"
                    required
                    value={registerData.username}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        username: e.target.value,
                      })
                    }
                    className="bg-[#202225] border-none text-white placeholder-[#72767d]"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="register-password"
                    className="text-[#b9bbbe] uppercase text-xs font-bold"
                  >
                    Password
                  </Label>
                  <Input
                    id="register-password"
                    type="password"
                    required
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                    }
                    className="bg-[#202225] border-none text-white placeholder-[#72767d]"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white"
                >
                  Registrarse
                </Button>
              </form>
              <div className="text-[#b9bbbe] text-sm">
                Al registrarte, aceptas nuestras{" "}
                <a href="#" className="text-[#00b0f4] hover:underline">
                  Condiciones de Servicio
                </a>{" "}
                y{" "}
                <a href="#" className="text-[#00b0f4] hover:underline">
                  Política de Privacidad
                </a>
                .
              </div>
              <Separator className="bg-[#4f545c]" />
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full bg-white text-black hover:bg-[#d4d7dc]"
                  onClick={() => console.log("Register with Google")}
                >
                  <GoogleIcon className="mr-2 h-4 w-4" />
                  Registrarse con Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-black text-white hover:bg-[#2c2f33]"
                  onClick={() => console.log("Register with Apple")}
                >
                  <AppleIcon className="mr-2 h-4 w-4" />
                  Registrarse con Apple
                </Button>
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
