import { useState } from 'react';
import { Mail, Smartphone, Bell, Send, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { mockEvents } from '../data/mockData';

interface NotificationCenterProps {
  email: string;
  phone: string;
}

interface SentNotification {
  id: string;
  channel: 'email' | 'whatsapp' | 'push';
  event: string;
  status: 'sending' | 'sent' | 'failed';
  timestamp: Date;
  content: string;
}

export function NotificationCenter({ email, phone }: NotificationCenterProps) {
  const [sentNotifications, setSentNotifications] = useState<SentNotification[]>([]);
  const [isSending, setIsSending] = useState(false);

  const sendTestEmail = async (event: typeof mockEvents[0]) => {
    const notification: SentNotification = {
      id: Date.now().toString(),
      channel: 'email',
      event: event.title,
      status: 'sending',
      timestamp: new Date(),
      content: `Daily digest with ${event.title} and other events`,
    };

    setSentNotifications(prev => [notification, ...prev]);
    setIsSending(true);

    // Simulate API call to send email
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In production, this would call your email service:
    /*
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject: 'Your Daily CampusFlow Digest',
        template: 'daily-digest',
        data: {
          events: [event],
          userName: 'Alex Thompson',
        }
      })
    });
    */

    setSentNotifications(prev =>
      prev.map(n => n.id === notification.id ? { ...n, status: 'sent' as const } : n)
    );
    setIsSending(false);
  };

  const sendTestWhatsApp = async (event: typeof mockEvents[0]) => {
    const notification: SentNotification = {
      id: Date.now().toString(),
      channel: 'whatsapp',
      event: event.title,
      status: 'sending',
      timestamp: new Date(),
      content: `⏰ Reminder: ${event.title} starts in 30 minutes`,
    };

    setSentNotifications(prev => [notification, ...prev]);
    setIsSending(true);

    // Simulate API call to send WhatsApp message
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In production, this would use Twilio WhatsApp API:
    /*
    await fetch('/api/send-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: phone,
        message: `⏰ Reminder: ${event.title} starts in 30 minutes\n\n` +
                 `📍 ${event.location}\n` +
                 `🕐 ${event.time}\n\n` +
                 `Walking directions: [link]\n` +
                 `Organizer: ${event.organizer} (${event.organizerContact})`
      })
    });
    */

    setSentNotifications(prev =>
      prev.map(n => n.id === notification.id ? { ...n, status: 'sent' as const } : n)
    );
    setIsSending(false);
  };

  const sendTestPush = async (event: typeof mockEvents[0]) => {
    const notification: SentNotification = {
      id: Date.now().toString(),
      channel: 'push',
      event: event.title,
      status: 'sending',
      timestamp: new Date(),
      content: `${event.title} - ${event.time} at ${event.location}`,
    };

    setSentNotifications(prev => [notification, ...prev]);
    setIsSending(true);

    // Simulate browser push notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('CampusFlow', {
        body: `${event.title} - ${event.time}`,
        icon: '/notification-icon.png',
        badge: '/badge-icon.png',
      });
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    setSentNotifications(prev =>
      prev.map(n => n.id === notification.id ? { ...n, status: 'sent' as const } : n)
    );
    setIsSending(false);
  };

  const requestPushPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification('CampusFlow Notifications Enabled! 🎉', {
          body: 'You\'ll now receive event reminders and updates',
        });
      }
    }
  };

  const channelIcons = {
    email: Mail,
    whatsapp: Smartphone,
    push: Bell,
  };

  const channelColors = {
    email: 'bg-blue-100 text-blue-700 border-blue-200',
    whatsapp: 'bg-green-100 text-green-700 border-green-200',
    push: 'bg-purple-100 text-purple-700 border-purple-200',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Notification Center</h2>
            <p className="text-slate-600 mt-1">Send test notifications to your connected channels</p>
          </div>
          <button
            onClick={requestPushPermission}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-all flex items-center gap-2"
          >
            <Bell className="w-4 h-4" />
            Enable Push
          </button>
        </div>

        {/* Connected Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <Mail className="w-5 h-5 text-blue-600" />
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-900">Email</div>
              <div className="text-xs text-slate-600">{email}</div>
            </div>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>

          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <Smartphone className="w-5 h-5 text-green-600" />
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-900">WhatsApp</div>
              <div className="text-xs text-slate-600">{phone}</div>
            </div>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
        </div>
      </div>

      {/* Test Notification Sender */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Send Test Notifications</h3>
        
        <div className="space-y-4">
          {mockEvents.slice(0, 3).map(event => (
            <div key={event.id} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-slate-900 mb-1">{event.title}</h4>
                  <p className="text-sm text-slate-600">{event.date} at {event.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${channelColors[event.category === 'AI/ML' ? 'push' : event.category === 'Career Development' ? 'email' : 'whatsapp']}`}>
                  {event.matchScore}% Match
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => sendTestEmail(event)}
                  disabled={isSending}
                  className="flex-1 py-2 px-3 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </button>
                <button
                  onClick={() => sendTestWhatsApp(event)}
                  disabled={isSending}
                  className="flex-1 py-2 px-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  Send WhatsApp
                </button>
                <button
                  onClick={() => sendTestPush(event)}
                  disabled={isSending}
                  className="flex-1 py-2 px-3 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Bell className="w-4 h-4" />
                  Send Push
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification History */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Notification History</h3>
        
        {sentNotifications.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No notifications sent yet</p>
            <p className="text-sm mt-1">Try sending a test notification above</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sentNotifications.map(notification => {
              const Icon = channelIcons[notification.channel];
              return (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg"
                >
                  <div className={`p-2 rounded-lg ${channelColors[notification.channel]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div className="font-medium text-slate-900">{notification.event}</div>
                      <div className="flex items-center gap-2">
                        {notification.status === 'sending' && (
                          <span className="flex items-center gap-1 text-sm text-yellow-600">
                            <Clock className="w-4 h-4 animate-spin" />
                            Sending...
                          </span>
                        )}
                        {notification.status === 'sent' && (
                          <span className="flex items-center gap-1 text-sm text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            Sent
                          </span>
                        )}
                        {notification.status === 'failed' && (
                          <span className="flex items-center gap-1 text-sm text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            Failed
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{notification.content}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>Channel: {notification.channel.toUpperCase()}</span>
                      <span>•</span>
                      <span>{notification.timestamp.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Integration Guide */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Production Integration Guide</h3>
        <p className="text-sm text-slate-300 mb-4">
          This demo simulates sending notifications. In production, these would call real APIs:
        </p>
        <div className="space-y-4 text-sm">
          <div>
            <div className="font-medium mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Integration (SendGrid/Mailgun)
            </div>
            <pre className="bg-slate-950 p-3 rounded-lg overflow-x-auto text-xs">
{`// Server-side endpoint
app.post('/api/send-email', async (req, res) => {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  await sgMail.send({
    to: '${email}',
    from: 'notifications@campusflow.app',
    subject: 'Your Daily CampusFlow Digest',
    templateId: 'd-xxxxx',
    dynamicTemplateData: req.body.data
  });
});`}
            </pre>
          </div>

          <div>
            <div className="font-medium mb-2 flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              WhatsApp Integration (Twilio)
            </div>
            <pre className="bg-slate-950 p-3 rounded-lg overflow-x-auto text-xs">
{`// Server-side endpoint
app.post('/api/send-whatsapp', async (req, res) => {
  const twilio = require('twilio');
  const client = twilio(accountSid, authToken);
  
  await client.messages.create({
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:${phone}',
    body: req.body.message
  });
});`}
            </pre>
          </div>

          <div>
            <div className="font-medium mb-2 flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Browser Push Notifications (Web Push)
            </div>
            <pre className="bg-slate-950 p-3 rounded-lg overflow-x-auto text-xs">
{`// Client-side registration
const registration = await navigator.serviceWorker.register('/sw.js');
const subscription = await registration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
});

// Server sends push
await webpush.sendNotification(subscription, JSON.stringify({
  title: 'Event Reminder',
  body: message,
  icon: '/icon.png'
}));`}
            </pre>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
          <p className="text-sm text-yellow-200">
            <strong>💡 Quick Start:</strong> The API structure is ready. Just add your SendGrid and Twilio credentials to start sending real notifications!
          </p>
        </div>
      </div>
    </div>
  );
}