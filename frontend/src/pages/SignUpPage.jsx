import { useState } from "react";
import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { BoraderAnimatedContainer } from "../components/BoraderAnimatedContainer";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
} from "lucide-react";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(formData);
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
                    Create Account
                  </h2>
                  <p className="text-slate-400">Sign up for a new account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* FULL NAME FIELD */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="input"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
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
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to={"/login"} className="auth-link">
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>
            {/* FORM CLOUMN - RIGHT SIDE */}
            <div className="hidden md:flex md:w-1/2 items-center justify-center overflow-hidden bg-gradient-to-bl from-slate-900/25 to-transparent p-6 lg:p-10">
              <div className="glass-surface flex h-full w-full max-w-2xl flex-col items-center justify-center rounded-2xl p-6 lg:p-8">
                <img
                  src="/signup.png"
                  alt="People using mobile devices"
                  className="h-auto w-full max-w-[560px] max-h-[min(56vh,460px)] object-contain"
                />
                <div className="mt-8 text-center space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Begin Your Journey</h3>
                    <p className="text-slate-400 text-sm mt-2">Join thousands connecting instantly</p>
                  </div>

                  <div className="mt-6 flex justify-center gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/50 text-blue-300 text-sm font-medium hover:border-blue-300 transition-colors">Zero Limits</span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-400/50 text-purple-300 text-sm font-medium hover:border-purple-300 transition-colors">1min Setup</span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-pink-600/20 border border-pink-400/50 text-pink-300 text-sm font-medium hover:border-pink-300 transition-colors">Secure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BoraderAnimatedContainer>
      </div>
    </div>
  );
};

export default SignUpPage;
