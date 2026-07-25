import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Mail, ArrowLeft, Send } from 'lucide-react';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import toast from 'react-hot-toast';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your agency email.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Password reset instructions sent to your agency email.');
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-[#0F172A] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF7A00]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-[#151A28] border border-[#2A3246] rounded-[24px] shadow-2xl mb-4 text-[#FF7A00]">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
            RESET <span className="text-[#FF7A00]">CREDENTIALS</span>
          </h1>
        </div>

        <div className="bg-[#151A28]/90 backdrop-blur-xl border border-[#2A3246] rounded-[24px] p-8 shadow-2xl space-y-6">
          <div className="border-b border-[#2A3246] pb-4">
            <h2 className="text-lg font-bold text-[#F8FAFC]">Credential Recovery</h2>
            <p className="text-xs text-[#9CA3AF] mt-0.5">Enter your registered email for password recovery</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Agency Email Address"
              type="email"
              placeholder="officer@gov.in"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button
              type="submit"
              className="w-full py-3.5 text-base font-bold"
              isLoading={loading}
              icon={Send}
            >
              SEND RECOVERY LINK
            </Button>
          </form>

          <div className="pt-4 border-t border-[#2A3246] text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF7A00] hover:underline">
              <ArrowLeft className="w-4 h-4" /> Return to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
