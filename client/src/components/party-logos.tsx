// SVG logos for Greek political parties
import React from "react";

// Import real party logos
import pasokLogo from "@assets/Flag_of_PASOK_(Panhellenic_Socialist_Movement)_1752220171012.png";
import neaAristeraLogo from "@assets/να_1752220175233.jpg";
import spartiatesLogo from "@assets/logo-spartiates-home-scaled_1752220242373.jpg";
import ellinikilisiLogo from "@assets/Elliniki-lisi-logo_1752220256392.png";
import syrizaLogo from "@assets/syriza_1752220256393.png";
import ndLogo from "@assets/nd_1752220256393.png";

interface PartyLogoProps {
  party: string;
  className?: string;
}

export function PartyLogo({ party, className = "w-8 h-8" }: PartyLogoProps) {
  const logos = {
    "ΝΔ": (
      <img 
        src={ndLogo} 
        alt="Νέα Δημοκρατία Logo"
        className={`${className} object-contain rounded`}
      />
    ),
    "ΣΥΡΙΖΑ": (
      <img 
        src={syrizaLogo} 
        alt="ΣΥΡΙΖΑ Logo"
        className={`${className} object-contain rounded`}
      />
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
      <img 
        src={ellinikilisiLogo} 
        alt="Ελληνική Λύση Logo"
        className={`${className} object-contain rounded`}
      />
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
      <img 
        src={spartiatesLogo} 
        alt="Σπαρτιάτες Logo"
        className={`${className} object-contain rounded`}
      />
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