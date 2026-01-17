import { useEffect, useState } from 'react';
import { mockEvents } from '../data/mockData';
import { X, Bell, Mail, Smartphone } from 'lucide-react';

interface AutoNotificationTriggerProps {
  email: string;
  phone: string;
}

export function AutoNotificationTrigger({ email, phone }: AutoNotificationTriggerProps) {
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: 'email' | 'whatsapp' | 'push';
    title: string;
    message: string;
    timestamp: Date;
  }>>([]);

  useEffect(() => {
    // Simulate automatic notifications based on events
    const triggers = [
      // Email digest - Daily at 8 AM
      {
        delay: 3000, // 3 seconds after load
        type: 'email' as const,
        title: 'Your Daily CampusFlow Digest',
        message: `Good morning! You have 3 high-match events today. Check your inbox at ${email}`,
      },
      // WhatsApp - 30 min before event
      {
        delay: 8000, // 8 seconds
        type: 'whatsapp' as const,
        title: 'Event Starting Soon',
        message: `⏰ AI for Social Good Hackathon starts in 30 min! WhatsApp sent to ${phone}`,
      },
      // Push notification - New event added
      {
        delay: 15000, // 15 seconds
        type: 'push' as const,
        title: 'New High Match Event',
        message: '✨ ML Model Deployment with AWS (93% match) just added to your feed',
      },
      // WhatsApp - Schedule change
      {
        delay: 25000, // 25 seconds
        type: 'whatsapp' as const,
        title: 'Important: Location Changed',
        message: `🚨 React Native Workshop moved to Lab 305. WhatsApp sent to ${phone}`,
      },
    ];

    const timeouts = triggers.map(trigger => {
      return setTimeout(() => {
        const notification = {
          id: Date.now().toString() + Math.random(),
          type: trigger.type,
          title: trigger.title,
          message: trigger.message,
          timestamp: new Date(),
        };
        
        setNotifications(prev => [...prev, notification]);

        // Show browser notification if permission granted
        if (trigger.type === 'push' && 'Notification' in window && Notification.permission === 'granted') {
          new Notification(trigger.title, {
            body: trigger.message,
            icon: '/notification-icon.png',
          });
        }

        // Auto-dismiss after 8 seconds
        setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== notification.id));
        }, 8000);
      }, trigger.delay);
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [email, phone]);

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const iconMap = {
    email: Mail,
    whatsapp: Smartphone,
    push: Bell,
  };

  const colorMap = {
    email: 'from-blue-500 to-blue-600',
    whatsapp: 'from-green-500 to-green-600',
    push: 'from-purple-500 to-purple-600',
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-3 max-w-sm">
      {notifications.map(notification => {
        const Icon = iconMap[notification.type];
        return (
          <div
            key={notification.id}
            className={`bg-gradient-to-r ${colorMap[notification.type]} text-white rounded-lg shadow-2xl p-4 animate-slide-in`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold mb-1">{notification.title}</div>
                <div className="text-sm text-white/90">{notification.message}</div>
                <div className="text-xs text-white/70 mt-2">
                  {notification.timestamp.toLocaleTimeString()}
                </div>
              </div>
              <button
                onClick={() => dismissNotification(notification.id)}
                className="p-1 hover:bg-white/20 rounded transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
