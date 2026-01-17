import { useState } from 'react';
import { Mail, Smartphone, Bell, Check, Send, AlertCircle } from 'lucide-react';

interface NotificationSetupProps {
  onComplete: (data: { email: string; phone: string }) => void;
}

export function NotificationSetup({ onComplete }: NotificationSetupProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState<'input' | 'verify-email' | 'verify-phone' | 'complete'>('input');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailVerification = async () => {
    setIsLoading(true);
    // Simulate sending verification email
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep('verify-email');
    
    // In production, this would call your backend API:
    // await fetch('/api/send-verification-email', { method: 'POST', body: JSON.stringify({ email }) });
  };

  const handlePhoneVerification = async () => {
    setIsLoading(true);
    // Simulate sending verification SMS
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep('verify-phone');
    
    // In production, this would use Twilio API:
    // await fetch('/api/send-verification-sms', { method: 'POST', body: JSON.stringify({ phone }) });
  };

  const verifyCode = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate verification
    if (step === 'verify-email') {
      setEmailVerified(true);
      setStep('input');
    } else if (step === 'verify-phone') {
      setPhoneVerified(true);
      setStep('complete');
    }
    setIsLoading(false);
    setVerificationCode('');
  };

  const handleComplete = () => {
    onComplete({ email, phone });
  };

  if (step === 'verify-email' || step === 'verify-phone') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {step === 'verify-email' ? <Mail className="w-8 h-8 text-blue-600" /> : <Smartphone className="w-8 h-8 text-green-600" />}
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Verify your {step === 'verify-email' ? 'Email' : 'Phone Number'}
          </h3>
          <p className="text-slate-600">
            We sent a verification code to <strong>{step === 'verify-email' ? email : phone}</strong>
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Enter 6-digit code
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="123456"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-center text-2xl tracking-widest font-mono"
              maxLength={6}
            />
          </div>

          <button
            onClick={verifyCode}
            disabled={verificationCode.length !== 6 || isLoading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>

          <p className="text-sm text-center text-slate-500">
            Demo: Use any 6-digit code to verify
          </p>

          <button
            onClick={() => setStep('input')}
            className="w-full py-2 text-slate-600 hover:text-slate-900 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (step === 'complete') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">All Set!</h3>
          <p className="text-slate-600">
            Your notification channels are configured and ready to use
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <Mail className="w-5 h-5 text-green-600" />
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-900">Email</div>
              <div className="text-xs text-slate-600">{email}</div>
            </div>
            <Check className="w-5 h-5 text-green-600" />
          </div>

          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <Smartphone className="w-5 h-5 text-green-600" />
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-900">WhatsApp</div>
              <div className="text-xs text-slate-600">{phone}</div>
            </div>
            <Check className="w-5 h-5 text-green-600" />
          </div>
        </div>

        <button
          onClick={handleComplete}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          Continue to CampusFlow
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bell className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">Setup Notifications</h3>
        <p className="text-slate-600">
          Connect your channels to receive personalized event updates
        </p>
      </div>

      <div className="space-y-4">
        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@university.edu"
              className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={emailVerified}
            />
            {emailVerified && (
              <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 w-5 h-5" />
            )}
          </div>
          {!emailVerified && email && (
            <button
              onClick={handleEmailVerification}
              disabled={isLoading || !email.includes('@')}
              className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Verify Email →'}
            </button>
          )}
          {emailVerified && (
            <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
              <Check className="w-4 h-4" />
              Verified
            </p>
          )}
        </div>

        {/* Phone Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Phone Number (WhatsApp)
          </label>
          <div className="relative">
            <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 234 567 8900"
              className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={phoneVerified}
            />
            {phoneVerified && (
              <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 w-5 h-5" />
            )}
          </div>
          {!phoneVerified && phone && emailVerified && (
            <button
              onClick={handlePhoneVerification}
              disabled={isLoading || phone.length < 10}
              className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Verify Phone →'}
            </button>
          )}
          {phoneVerified && (
            <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
              <Check className="w-4 h-4" />
              Verified
            </p>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Why we need this:</p>
              <ul className="space-y-1 text-xs">
                <li>• Email: Daily digests and important announcements</li>
                <li>• WhatsApp: Urgent reminders and last-minute updates</li>
                <li>• Your data is encrypted and never shared</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
