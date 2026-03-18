import React from 'react'
import { useState } from "react";
import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  LoaderIcon,
} from "lucide-react";

import { BoraderAnimatedContainer } from "../components/BoraderAnimatedContainer"; 

const LoginPage = () => {

    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const { login, isLoginIn } = useAuthStore();
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      login(formData);
    };
  return (
    <div className="h-dvh w-full">
      <div className="relative h-full w-full">
        <BoraderAnimatedContainer>
          <div className="flex h-full w-full flex-col md:flex-row">
            {/* FORM CLOUMN - LEFT SIDE */}
            <div className="glass-surface flex w-full items-center justify-center overflow-y-auto px-5 py-8 md:w-1/2 md:border-r md:px-8">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Login to Your Account
                  </h2>
                  <p className="text-slate-400">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* FULL NAME FIELD */}
                  
                  {/* EMAIL FIELD */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input"
                        placeholder="johndoe@gmail.com"
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="auth-input-label">password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="input"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>
                  {/* SUBMIT BUTTON */}
                  <button
                    className="auth-btn"
                    type="submit"
                    disabled={isLoginIn}
                  >
                    {isLoginIn ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to={"/signup"} className="auth-link">
                    Don't have an account? Sign Up
                  </Link>
                </div>
              </div>
            </div>
            {/* FORM CLOUMN - RIGHT SIDE */}
            <div className="hidden md:flex md:w-1/2 items-center justify-center overflow-hidden bg-gradient-to-bl from-slate-900/25 to-transparent p-6 lg:p-10">
              <div className="glass-surface flex h-full w-full max-w-2xl flex-col items-center justify-center rounded-2xl p-6 lg:p-8">
                <img
                  src="/login.png"
                  alt="People using mobile devices"
                  className="h-auto w-full max-w-[560px] max-h-[min(56vh,460px)] object-contain"
                />
                <div className="mt-8 text-center space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Welcome Back</h3>
                    <p className="text-slate-400 text-sm mt-2">Your conversations await</p>
                  </div>

                  <div className="mt-6 flex justify-center gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-400/50 text-emerald-300 text-sm font-medium hover:border-emerald-300 transition-colors">Real-time Chat</span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-teal-600/20 border border-teal-400/50 text-teal-300 text-sm font-medium hover:border-teal-300 transition-colors">Friends First</span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-400/50 text-cyan-300 text-sm font-medium hover:border-cyan-300 transition-colors">24/7 Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BoraderAnimatedContainer>
      </div>
    </div>
  );
}

export default LoginPage