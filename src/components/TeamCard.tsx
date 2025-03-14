"use client";
import React from 'react';

// Define types for team members
interface TeamMember {
  id: string;
  name: string;
  walletAddress: string;
  status?: 'pending' | 'accepted' | 'rejected';
}

// Define types for the team
interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  twitterLink?: string;
  bannerUrl?: string;
}

interface TeamCardProps {
  team: Team;
  isAdmin?: boolean;
  onDelete?: (teamId: string) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, isAdmin = false, onDelete }) => {
  // Function to handle team deletion
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    if (onDelete) {
      onDelete(team.id);
    }
  };
  return (
    <div className="rounded-md border border-[#333333] bg-[#1e1e1e] min-h-[320px] max-w-full flex flex-col shadow transition-all duration-300 hover:border-[#f0b90b] cursor-pointer">
      {/* Banner Image */}
      <div className="min-h-24 w-full relative overflow-hidden">
        {team.bannerUrl ? (
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${team.bannerUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minHeight: '6rem'
            }}
            aria-label={`${team.name} banner`}
          ></div>
        ) : (
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              background: 'linear-gradient(135deg, rgba(40, 40, 40, 1) 0%, rgba(30, 30, 30, 1) 50%, rgba(25, 25, 25, 1) 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderBottom: '1px solid rgba(240, 185, 11, 0.2)',
              minHeight: '6rem'
            }}
          ></div>
        )}
        
        {/* Admin Delete Button */}
        {isAdmin && (
          <button
            onClick={handleDelete}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors z-10"
            title="Delete Team"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        {/* Team name and Twitter link */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center">
          <h3 className="text-sm font-bold text-white" style={{ fontFamily: 'var(--font-dm-mono)' }}>{team.name}</h3>
          {team.twitterLink && (
            <a 
              href={team.twitterLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-[#f0b90b] transition-colors p-1 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-bold text-gray-300">Team Members</h4>
          <span className="text-sm text-gray-400">{team.members.length} {team.members.length === 1 ? 'member' : 'members'}</span>
        </div>
        {team.members.length > 0 ? (
          <div className="overflow-y-auto flex-1 pr-1 custom-scrollbar">
            <ul className="space-y-1.5">
              {team.members.map(member => (
                <li key={member.id} className="bg-[#2a2a2a] p-2 rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-gray-200 text-sm font-bold">{member.name}</span>
                      {member.status && (
                        <div className="flex items-center ml-2">
                          <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                            member.status === 'accepted' ? 'bg-green-500' : 
                            member.status === 'rejected' ? 'bg-red-500' : 
                            'bg-yellow-500'
                          }`}></span>
                          <span className={`ml-1.5 text-sm ${
                            member.status === 'accepted' ? 'text-green-600' : 
                            member.status === 'rejected' ? 'text-red-600' : 
                            'text-yellow-600'
                          }`}>
                            {member.status === 'accepted' ? 'Accepted' : 
                             member.status === 'rejected' ? 'Declined' : 
                             'Pending'}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-gray-400 text-sm truncate ml-2 max-w-[100px]" title={member.walletAddress}>
                      {member.walletAddress.substring(0, 4)}...{member.walletAddress.substring(member.walletAddress.length - 4)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-400 text-sm">No team members yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
