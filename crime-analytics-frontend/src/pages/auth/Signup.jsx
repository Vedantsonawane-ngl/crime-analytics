import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldAlert, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Input, PasswordInput } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      await register({ name, email, password });
      toast.success('Registration successful! Logging you in...');
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      // Error handled by Axios interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0F172A] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF7A00]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-[#151A28] border border-[#2A3246] rounded-[24px] shadow-2xl mb-4 text-[#FF7A00] glow-orange-sm">
            <ShieldAlert className="w-10 h-10 animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
            SENTINEL <span className="text-[#FF7A00]">SOC</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1 font-medium">
            Personnel Registration Portal
          </p>
        </div>

        <div className="bg-[#151A28]/90 backdrop-blur-xl border border-[#2A3246] rounded-[24px] p-8 shadow-2xl space-y-6">
          <div className="border-b border-[#2A3246] pb-4">
            <h2 className="text-lg font-bold text-[#F8FAFC] tracking-wide">Create Officer Account</h2>
            <p className="text-xs text-[#9CA3AF] mt-0.5">Register new terminal authorization credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              placeholder="Officer Yadnyesh"
              icon={User}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Agency Email Address"
              type="email"
              placeholder="yadnyesh@example.com"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <PasswordInput
              label="Password"
              placeholder="••••••••••••"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              className="w-full py-3.5 text-base font-bold"
              isLoading={loading}
              icon={ArrowRight}
            >
              REGISTER PERSONNEL
            </Button>
          </form>

          <div className="pt-4 border-t border-[#2A3246] text-center text-xs text-[#9CA3AF]">
            Already registered?{' '}
            <Link to="/login" className="text-[#FF7A00] hover:underline font-bold">
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
