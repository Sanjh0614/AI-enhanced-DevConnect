import { useState } from "react";
import type { FormEvent } from "react";
import { supabase } from "./lib/supabase";
import "./App.css";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Signing in...");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    if (!data.session) {
      setMessage("Login succeeded, but no session was returned.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/me", {
        headers: {
          Authorization: `Bearer ${data.session.access_token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(`Backend error: ${result.detail ?? response.status}`);
        return;
      }

      setMessage(`Backend connected! User ID: ${result.user_id}`);
    } catch {
      setMessage("Could not connect to FastAPI. Check that the backend is running.");
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>DevConnect Login Test</h1>

        <form onSubmit={signIn}>
          <div className="login-form-fields">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />

            <button type="submit">Sign in</button>
          </div>
        </form>

        <p role="status" aria-live="polite">{message}</p>
      </section>
    </main>
  );
}
