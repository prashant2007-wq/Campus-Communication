import { useState } from 'react';
import { X, ArrowRight, Sparkles, Bell, Calendar, BarChart3, Settings } from 'lucide-react';

interface WelcomeTourProps {
  onComplete: () => void;
}

export function WelcomeTour({ onComplete }: WelcomeTourProps) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to CampusFlow! 🎉',
      description: 'The intelligent platform that brings together all campus events into one beautiful, personalized experience.',
      icon: Sparkles,
      color: 'from-blue-600 to-indigo-600',
    },
    {
      title: 'Smart Notifications Are Live',
      description: 'Watch for automatic notifications appearing in the top-right. We\'ll send WhatsApp for urgent updates, Email for daily digests, and Push for ambient awareness.',
      icon: Bell,
      color: 'from-green-600 to-emerald-600',
    },
    {
      title: 'Test the Notification System',
      description: 'Click the "Notifications" tab to send test messages to your email and WhatsApp. See exactly how each channel works in real-time!',
      icon: Bell,
      color: 'from-purple-600 to-violet-600',
    },
    {
      title: 'Smart Conflict Resolver',
      description: 'Notice the red floating button in the bottom-right? That\'s our AI-powered conflict resolver helping you choose between overlapping events.',
      icon: Calendar,
      color: 'from-orange-600 to-red-600',
    },
    {
      title: 'Track Your Campus Journey',
      description: 'Visit the Analytics tab to see insights about your event attendance patterns and get personalized recommendations.',
      icon: BarChart3,
      color: 'from-indigo-600 to-purple-600',
    },
    {
      title: 'Customize Everything',
      description: 'Head to Settings to configure notification preferences, quiet hours, and interest categories. Your experience, your way.',
      icon: Settings,
      color: 'from-slate-600 to-slate-700',
    },
  ];

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${currentStep.color} text-white px-6 py-8 text-center`}>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{currentStep.title}</h2>
          <p className="text-white/90">{currentStep.description}</p>
        </div>

        {/* Progress */}
        <div className="px-6 py-4">
          <div className="flex gap-2 mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full transition-all ${
                  index === step
                    ? 'bg-blue-600'
                    : index < step
                    ? 'bg-blue-300'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>

          <div className="text-center text-sm text-slate-600 mb-4">
            Step {step + 1} of {steps.length}
          </div>

          {/* Key Features Highlight */}
          {step === 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-blue-900 mb-2">What makes CampusFlow special?</h3>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>✅ Real working email & WhatsApp notifications</li>
                <li>✅ AI-powered event matching (0-100% scores)</li>
                <li>✅ Smart conflict detection & resolution</li>
                <li>✅ Multi-channel notification system</li>
                <li>✅ Social proof & friend activity</li>
              </ul>
            </div>
          )}

          {step === 1 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-green-900 mb-2">Automated Notifications Demo</h3>
              <p className="text-sm text-green-800 mb-2">
                Over the next 30 seconds, you'll see 4 automatic notifications appear:
              </p>
              <ul className="space-y-1 text-sm text-green-700">
                <li>📧 Email digest notification (3s)</li>
                <li>📱 WhatsApp event reminder (8s)</li>
                <li>🔔 Push notification for new event (15s)</li>
                <li>⚠️ WhatsApp schedule change alert (25s)</li>
              </ul>
            </div>
          )}

          {step === 2 && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-purple-900 mb-2">Send Test Notifications</h3>
              <p className="text-sm text-purple-800">
                Navigate to the <strong>Notifications</strong> tab to manually send test messages to your actual email and WhatsApp number. You'll see real-time status updates as messages are sent!
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleSkip}
              className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-all"
            >
              Skip Tour
            </button>
            <button
              onClick={handleNext}
              className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              {step < steps.length - 1 ? (
                <>
                  Next
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                'Get Started!'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
