"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { data: session } = authClient.useSession() 
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email({
      name,
      email,
      password,
    }, {
      onSuccess: (ctx) => {
        window.alert("User created successfully");
      },
      onError: (ctx) => {
        window.alert("Something went wrong");
      },
    });
  };

  const onLogin = () => {
    authClient.signIn.email({
      email,
      password,
    }, {
      onSuccess: (ctx) => {
        window.alert("User Logged in successfully");
      },
      onError: (ctx) => {
        window.alert("Something went wrong");
      },
    });
  };

  if (session) {
    return(
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col p-4 gap-y-4">
        <Input 
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)} 
        />
        <Input 
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button onClick={onSubmit}>
          Create User
        </Button>
      </div>
      <div className="flex flex-col p-4 gap-y-4">
        <Input 
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button onClick={onLogin}>
          Login
        </Button>
      </div>
    </div>
  );
}
