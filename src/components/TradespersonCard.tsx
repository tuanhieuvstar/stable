import React from 'react';
import { Star, MapPin, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TradespersonCardProps {
  tradesperson: {
    title: string;
    rating?: {
      value: number;
      votes_count: number;
    };
    address?: string;
    phone?: string;
    url?: string;
    work_hours?: {
      timetable?: {
        [key: string]: Array<{ open: { hour: number; minute: number }; close: { hour: number; minute: number } }> | null;
      };
      current_status?: string;
    };
  };
}

const TradespersonCard: React.FC<TradespersonCardProps> = ({ tradesperson }) => {
  const formatTime = (time?: { hour: number; minute: number }) => {
    if (!time) return 'N/A';
    return `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}`;
  };

  const getWorkingHours = () => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    if (!tradesperson.work_hours?.timetable) return 'Working hours not available';
    
    const workHours = days.map(day => {
      const daySchedule = tradesperson.work_hours?.timetable?.[day];
      if (daySchedule && daySchedule.length > 0) {
        return `${day.charAt(0).toUpperCase() + day.slice(1)}: ${formatTime(daySchedule[0].open)} - ${formatTime(daySchedule[0].close)}`;
      }
      return `${day.charAt(0).toUpperCase() + day.slice(1)}: Closed`;
    });
    return workHours.join('\n');
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold mb-2">{tradesperson.title}</h3>
      {tradesperson.rating && (
        <div className="flex items-center mb-2">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span className="font-medium">{tradesperson.rating.value}</span>
          <span className="text-gray-500 text-sm ml-1">({tradesperson.rating.votes_count} reviews)</span>
        </div>
      )}
      {tradesperson.address && (
        <div className="flex items-start mb-2">
          <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-1" />
          <p className="text-sm text-gray-600">{tradesperson.address}</p>
        </div>
      )}
      {tradesperson.phone && (
        <div className="flex items-center mb-2">
          <Phone className="w-4 h-4 text-gray-400 mr-2" />
          <p className="text-sm">{tradesperson.phone}</p>
        </div>
      )}
      {tradesperson.work_hours?.current_status && (
        <div className="flex items-center mb-4">
          <Clock className="w-4 h-4 text-gray-400 mr-2" />
          <p className="text-sm">{tradesperson.work_hours.current_status === 'open' ? 'Open now' : 'Closed'}</p>
        </div>
      )}
      <details className="mb-4">
        <summary className="cursor-pointer text-sm text-gray-600">Working hours</summary>
        <pre className="mt-2 text-xs whitespace-pre-wrap">{getWorkingHours()}</pre>
      </details>
      {tradesperson.url && (
        <Button asChild className="w-full">
          <a href={tradesperson.url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </Button>
      )}
    </div>
  );
};

export default TradespersonCard;