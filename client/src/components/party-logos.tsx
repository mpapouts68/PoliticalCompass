// SVG logos for Greek political parties
import React from "react";

// Import real party logos
import pasokLogo from "@assets/Flag_of_PASOK_(Panhellenic_Socialist_Movement)_1752220171012.png";
import neaAristeraLogo from "@assets/να_1752220175233.jpg";

interface PartyLogoProps {
  party: string;
  className?: string;
}

export function PartyLogo({ party, className = "w-8 h-8" }: PartyLogoProps) {
  const logos = {
    "ΝΔ": (
      <svg viewBox="0 0 100 100" className={className}>
        <rect width="100" height="100" fill="#004B9F" rx="8"/>
        <rect x="15" y="30" width="70" height="6" fill="white"/>
        <rect x="15" y="40" width="70" height="6" fill="white"/>
        <rect x="15" y="50" width="70" height="6" fill="white"/>
        <rect x="15" y="60" width="70" height="6" fill="white"/>
        <text x="50" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">ΝΔ</text>
      </svg>
    ),
    "ΣΥΡΙΖΑ": (
      <svg viewBox="0 0 100 100" className={className}>
        <rect width="100" height="100" fill="#E4002B" rx="8"/>
        <path d="M30 25 L50 35 L70 25 L70 45 L50 55 L30 45 Z" fill="white"/>
        <circle cx="50" cy="65" r="8" fill="white"/>
        <text x="50" y="88" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ΣΥΡΙΖΑ</text>
      </svg>
    ),
    "ΠΑΣΟΚ": (
      <img 
        src={pasokLogo} 
        alt="ΠΑΣΟΚ Logo"
        className={`${className} object-contain rounded`}
      />
    ),
    "ΚΚΕ": (
      <svg viewBox="0 0 100 100" className={className}>
        <rect width="100" height="100" fill="#B71C1C" rx="8"/>
        <path d="M25 25 L50 40 L75 25 L75 50 L50 65 L25 50 Z" fill="#FFD700"/>
        <circle cx="50" cy="45" r="8" fill="#B71C1C"/>
        <text x="50" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">ΚΚΕ</text>
      </svg>
    ),
    "ΕΛ": (
      <svg viewBox="0 0 100 100" className={className}>
        <rect width="100" height="100" fill="#663399" rx="8"/>
        <rect x="20" y="30" width="60" height="8" fill="white"/>
        <rect x="20" y="46" width="60" height="8" fill="white"/>
        <rect x="20" y="62" width="60" height="8" fill="white"/>
      </svg>
    ),
    "ΠΕ": (
      <svg viewBox="0 0 100 100" className={className}>
        <rect width="100" height="100" fill="#059669" rx="8"/>
        <path d="M50 20 L30 40 L35 45 L50 30 L65 45 L70 40 Z" fill="white"/>
        <text x="50" y="75" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">ΠΕ</text>
      </svg>
    ),
    "ΝΙΚΗ": (
      <svg viewBox="0 0 100 100" className={className}>
        <rect width="100" height="100" fill="#dc2626" rx="8"/>
        <path d="M50 15 L40 35 L60 35 Z" fill="white"/>
        <rect x="45" y="35" width="10" height="25" fill="white"/>
        <text x="50" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">ΝΙΚΗ</text>
      </svg>
    ),
    "ΣΠΑΡ": (
      <svg viewBox="0 0 100 100" className={className}>
        <rect width="100" height="100" fill="#7c2d12" rx="8"/>
        <rect x="20" y="25" width="60" height="6" fill="#FFD700"/>
        <circle cx="50" cy="45" r="12" fill="#FFD700"/>
        <rect x="20" y="65" width="60" height="6" fill="#FFD700"/>
      </svg>
    ),
    "ΝΑ": (
      <img 
        src={neaAristeraLogo} 
        alt="Νέα Αριστερά Logo"
        className={`${className} object-contain rounded`}
      />
    )
  };

  return logos[party as keyof typeof logos] || (
    <div className={`${className} bg-gray-200 rounded flex items-center justify-center`}>
      <span className="text-xs font-bold text-gray-600">{party}</span>
    </div>
  );
}

export function PartyLogosSidebar() {
  const parties = [
    { shortName: "ΝΔ", website: "https://nd.gr" },
    { shortName: "ΣΥΡΙΖΑ", website: "https://syriza.gr" },
    { shortName: "ΠΑΣΟΚ", website: "https://pasok.gr" },
    { shortName: "ΚΚΕ", website: "https://kke.gr" },
    { shortName: "ΕΛ", website: "https://elliniki-lysi.gr" },
    { shortName: "ΠΕ", website: "https://plefsi.gr" },
    { shortName: "ΝΙΚΗ", website: "https://niki.gr" },
    { shortName: "ΣΠΑΡ", website: "https://spartiates.gr" },
    { shortName: "ΝΑ", website: "https://nea-aristera.gr" }
  ];
  
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-lg border border-neutral-200 p-3 z-50">
      <div className="flex flex-col space-y-3">
        {parties.map((party) => (
          <a
            key={party.shortName}
            href={party.website}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 hover:scale-110 transition-all duration-200 group"
            title={`Επισκεφθείτε την ιστοσελίδα του ${party.shortName}`}
          >
            <div className="flex flex-col items-center">
              <PartyLogo party={party.shortName} className="w-10 h-10" />
              <span className="text-xs text-neutral-600 mt-1 group-hover:text-neutral-900 font-medium">
                {party.shortName}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}