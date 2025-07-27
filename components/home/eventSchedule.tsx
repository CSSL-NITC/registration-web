import { useState } from 'react';
import Image from 'next/image';

// Define the possible tab IDs as a type
type ScheduleTabId = 'inauguration' | 'day1' | 'day2';

interface ScheduleTab {
  id: ScheduleTabId;
  date: string;
  title: string;
  time: string;
}

interface ScheduleItem {
  time: string;
  description: string;
}

// Constants for schedule data
const SCHEDULE_TABS: ScheduleTab[] = [
  {
    id: 'inauguration',
    date: '14th October 2025',
    title: 'INAUGURATION',
    time: '6.00 PM Onwards'
  },
  {
    id: 'day1',
    date: '15th October 2025',
    title: 'DAY 01',
    time: '9.00 AM - 5.00 PM'
  },
  {
    id: 'day2',
    date: '16th October 2025',
    title: 'DAY 02',
    time: '9.00 AM - 5.00 PM'
  }
];

const SCHEDULE_ITEMS: Record<ScheduleTabId, ScheduleItem[]> = {
  inauguration: [
    { time: '6.00 PM Onwards', description: 'Arrival of the Chief Guest & the Guest of Honour' },
    { time: '6.20 PM Onwards', description: 'Welcome Address by <span class="font-bold text-blue-800">Mr. Heshan Karunaratne</span>, President CSSL' },
    { time: '6.30 PM Onwards', description: 'CSSL National ICT Awards 2025 - Session 1' },
    { time: '6.45 PM Onwards', description: 'Address by the Chief Guest' },
    { time: '6.55 PM Onwards', description: 'Address by the Guest of Honor' },
    { time: '7.10 PM Onwards', description: 'Keynote Address By <span class="font-bold text-blue-800">Mr. Sandun Hapugoda</span>, Country Manager - Sri Lanka and Maldives Mastercards' },
    { time: '7.30 PM Onwards', description: 'CSSL National ICT Awards 2025 - Session 2' },
    { time: '7.45 PM Onwards', description: 'Keynote Address by <span class="font-bold text-blue-800">Mr. Lasantha Bogoda</span>, Director/CEO, DMS Software Technologies (Pvt) Ltd' },
    { time: '7.55 PM Onwards', description: 'Keynote Address by <span class="font-bold text-blue-800">Mr. Shanaka de Silva</span>, Group Finance Director at South Asian Technologies Group' },
    { time: '8.15 PM Onwards', description: 'Recognition of Sponsors NITC 2025' },
    { time: '8.35 PM Onwards', description: 'Vote of Thanks by <span class="font-bold text-blue-800">Dr. Amal Illesinghe</span>, Conference Chair - NITC 2025' },
    { time: '8.45 PM Onwards', description: 'Fellowship and Cocktail' }
  ],
  day1: [
    { time: '9.00 AM', description: 'Registration & Coffee' },
    { time: '9.30 AM', description: 'AI & Machine Learning Track' },
    { time: '11.00 AM', description: 'Coffee Break' },
    { time: '11.30 AM', description: 'Cloud Computing & DevOps' },
    { time: '1.00 PM', description: 'Lunch Break' },
    { time: '2.00 PM', description: 'Cybersecurity & Privacy' },
    { time: '3.30 PM', description: 'Tea Break' },
    { time: '4.00 PM', description: 'Panel Discussion' },
    { time: '5.00 PM', description: 'Day 1 Wrap-up' }
  ],
  day2: [
    { time: '9.00 AM', description: 'Registration & Coffee' },
    { time: '9.30 AM', description: 'Blockchain & Web3' },
    { time: '11.00 AM', description: 'Coffee Break' },
    { time: '11.30 AM', description: 'IoT & Smart Cities' },
    { time: '1.00 PM', description: 'Lunch Break' },
    { time: '2.00 PM', description: 'Startup Showcase' },
    { time: '3.30 PM', description: 'Tea Break' },
    { time: '4.00 PM', description: 'Awards Ceremony' },
    { time: '5.00 PM', description: 'Closing Ceremony' }
  ]
};

const LEFT_SIDE_CONTENT = {
  title: "EVENT<br />SCHEDULES",
  description: "Discover the cutting-edge event schedules at the NITC Conference, bringing together tech enthusiasts to explore the latest industry trends.",
  buttonText: "Get Agenda"
};

export function EventSchedule() {
  const [activeTab, setActiveTab] = useState<ScheduleTabId>('inauguration');

  return (
    <section id="schedule" className="bg-white">
      <div className="w-full mx-auto flex flex-col lg:flex-row min-h-[600px]">
        {/* Left: Dark Background with Event Schedules Content - Hidden on Mobile */}
        <div className="hidden lg:flex lg:w-[35%] relative min-h-[600px]">
          <Image
            src="/eventScheduleBGLeft.png"
            alt="Event Schedule Background"
            fill
            className="object-cover object-center"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Bottom-left aligned content */}
          <div className="relative z-10 flex flex-col justify-end items-start p-8 md:p-12 w-full h-full">
            <div className="space-y-6 max-w-md">
              <div className="w-12 h-1 bg-white mb-6" aria-hidden="true"></div>
              <h2 
                className="text-4xl md:text-5xl font-bold text-white uppercase leading-tight tracking-tighter"
                dangerouslySetInnerHTML={{ __html: LEFT_SIDE_CONTENT.title }}
              />
              <p className="text-lg text-white/90 leading-relaxed">
                {LEFT_SIDE_CONTENT.description}
              </p>
              
              {/* Enhanced Button with Full White Fill */}
              <button className="relative overflow-hidden px-8 py-3 rounded-full border-2 border-white group">
                <span className="absolute inset-0 bg-white origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]"></span>
                <span className="relative flex items-center gap-2 text-white group-hover:text-black transition-colors duration-300">
                  {LEFT_SIDE_CONTENT.buttonText}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Schedule Details with Tabs */}
        <div className="w-full lg:w-[65%] relative min-h-[600px]">
          <Image
            src="/Event_Schedule_bg.png"
            alt="Schedule Background"
            fill
            className="object-cover object-center"
            priority={false}
          />
          <div className="relative z-10 p-8 lg:p-12">
            {/* Tabs */}
            <div className="flex overflow-x-auto gap-4 mb-8 pb-2 scrollbar-hide">
              {SCHEDULE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-start p-4 rounded-lg border transition-all duration-300 flex-shrink-0 min-w-[200px] ${
                    activeTab === tab.id
                      ? 'bg-blue-50 border-blue-300 shadow-md'
                      : 'bg-transparent border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm text-gray-600">{tab.date}</span>
                  <span className={`text-lg font-bold ${activeTab === tab.id ? 'text-blue-800' : 'text-gray-900'}`}>
                    {tab.title}
                  </span>
                  <span className="text-sm text-gray-600">{tab.time}</span>
                </button>
              ))}
            </div>

            {/* Schedule Content */}
            <div className="space-y-4">
              {SCHEDULE_ITEMS[activeTab].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-24 text-sm text-gray-600 font-medium flex-shrink-0">{item.time}</div>
                  <div 
                    className="text-gray-700" 
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}