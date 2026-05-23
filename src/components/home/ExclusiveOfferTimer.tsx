'use client';
import { useEffect, useState } from 'react';
import CountdownTimer from './CountdownTimer';


interface Settings {
  isActive: boolean;
  deadline: string;
  courseTitle: string;
  regularPrice: number;
  offerPrice: number;
  description?: string;
}

export default function ExclusiveOfferTimer() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [deadlineBD, setDeadlineBD] = useState('');

  useEffect(() => {
    fetch('/api/exclusive-offer/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSettings(data.data);
          // Format deadline in Bangladesh time for display
          const utcDate = new Date(data.data.deadline);
          const bdDate = new Date(utcDate.getTime() + 6 * 60 * 60 * 1000);
          setDeadlineBD(
            bdDate.toLocaleString('en-BD', {
              timeZone: 'Asia/Dhaka',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })
          );
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-4 text-purple-600">Loading offer...</div>;
  if (!settings) return null;
  if (!settings.isActive) return null;

  const now = new Date();
  const deadline = new Date(settings.deadline);
  const isExpired = now > deadline;

  if (isExpired) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
        ⏰ This exclusive offer has expired.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white p-5 rounded-xl shadow-xl text-center">
      <h2 className="text-2xl font-bold">{settings.courseTitle}</h2>
      <div className="flex justify-center gap-4 my-2">
        <span className="line-through text-purple-200">৳{settings.regularPrice}</span>
        <span className="text-2xl font-bold">৳{settings.offerPrice}</span>
      </div>
      <p className="text-sm mb-2">⏳ Offer ends on: {deadlineBD}</p>
      <div className="flex justify-center">
        <CountdownTimer targetDate={settings.deadline} />
      </div>
      {settings.description && (
        <p className="text-xs mt-2 text-purple-200">{settings.description}</p>
      )}
    </div>
  );
}