
import React from 'react';
import type { Theme } from '../App';
import { MOCK_USERS, MOCK_MENTORSHIP_SLOTS } from '../constants';
import { CalendarIcon } from './icons/CalendarIcon';

const MentorshipHub: React.FC<{ theme: Theme }> = ({ theme: _theme }) => {
    const mentors = Object.values(MOCK_USERS).filter(u => u.mentorshipRate);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Mentorship Hub</h1>
        <p className="text-gray-400 mt-1">Book 1-on-1 sessions with top creators to level up your skills.</p>
      </div>

      {/* Featured Mentors */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Featured Mentors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map(mentor => (
                <div key={mentor.id} className="bg-gray-800 p-5 rounded-lg shadow-lg border border-gray-700/50 flex flex-col items-center text-center">
                    <img src={mentor.avatarUrl} alt={mentor.name} className="w-24 h-24 rounded-full border-4 border-indigo-500" />
                    <h3 className="text-xl font-bold text-white mt-4">{mentor.name}</h3>
                    <p className="text-sm text-indigo-400">{mentor.handle}</p>
                    <p className="text-sm text-gray-400 mt-2 flex-grow">Specializes in {mentor.skills?.[0]} and {mentor.skills?.[1]}.</p>
                    <div className="my-4">
                        <span className="text-3xl font-bold text-white">${mentor.mentorshipRate}</span>
                        <span className="text-gray-400">/hr</span>
                    </div>
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors">
                        View Profile
                    </button>
                </div>
            ))}
        </div>
      </section>

       {/* Book a Session */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><CalendarIcon className="w-6 h-6"/> Book a Session</h2>
         <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700/50">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                <tr>
                  <th scope="col" className="px-6 py-3">Mentor</th>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Time</th>
                  <th scope="col" className="px-6 py-3">Duration</th>
                  <th scope="col" className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_MENTORSHIP_SLOTS.map(slot => (
                  <tr key={slot.id} className="bg-gray-800 border-b border-gray-700/50 hover:bg-gray-700/60">
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <img src={slot.mentor.avatarUrl} alt={slot.mentor.name} className="w-8 h-8 rounded-full" />
                            <div>
                                <p className="font-bold text-white">{slot.mentor.name}</p>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4">{slot.date}</td>
                    <td className="px-6 py-4">{slot.time}</td>
                    <td className="px-6 py-4">{slot.duration} mins</td>
                    <td className="px-6 py-4 text-right">
                        {slot.isBooked ? (
                            <span className="text-gray-500 font-semibold">Booked</span>
                        ) : (
                             <button className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold py-1.5 px-3 rounded-lg transition-colors">
                                Book Now
                            </button>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentorshipHub;
