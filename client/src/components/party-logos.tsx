// SVG logos for Greek political parties
import React from "react";

interface PartyLogoProps {
  party: string;
  className?: string;
}

export function PartyLogo({ party, className = "w-8 h-8" }: PartyLogoProps) {
  const logos = {
    "ΝΔ": (
      <svg viewBox="0 0 100 100" className={className}>
        <rect width="100" height="100" fill="#0066CC" rx="8"/>
        <text x="50" y="60" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">ΝΔ</text>
      </svg>
    ),
    "ΣΥΡΙΖΑ": (
      <svg viewBox="0 0 100 100" className={className}>
        <rect width="100" height="100" fill="#CC0000" rx="8"/>
        <circle cx="50" cy="30" r="8" fill="white"/>
        <rect x="35" y="45" width="30" height="6" fill="white"/>
        <text x="50" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">ΣΥΡΙΖΑ</text>
      </svg>
    ),
    "ΠΑΣΟΚ": (
      <svg viewBox="0 0 100 100" className={className}>
        <rect width="100" height="100" fill="#009900" rx="8"/>
        <circle cx="50" cy="40" r="15" fill="white"/>
        <text x="50" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">ΠΑΣΟΚ</text>
      </svg>
    ),
    "ΚΚΕ": (
      <svg viewBox="0 0 100 100" className={className}>
        <rect width="100" height="100" fill="#990000" rx="8"/>
        <path d="M30 25 L70 25 L70 45 L55 45 L55 75 L45 75 L45 45 L30 45 Z" fill="#FFD700"/>
        <circle cx="62" cy="35" r="8" fill="#FFD700"/>
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
      <svg viewBox="0 0 100 100" className={className}>
        <rect width="100" height="100" fill="#7c3aed" rx="8"/>
        <circle cx="35" cy="35" r="8" fill="white"/>
        <circle cx="65" cy="35" r="8" fill="white"/>
        <path d="M30 55 Q50 75 70 55" stroke="white" strokeWidth="6" fill="none"/>
      </svg>
    )
  };

  return logos[party as keyof typeof logos] || (
    <div className={`${className} bg-gray-200 rounded flex items-center justify-center`}>
      <span className="text-xs font-bold text-gray-600">{party}</span>
    </div>
  );
}

export function PartyLogosHeader() {
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
    <div className="flex items-center space-x-2">
      {parties.map((party) => (
        <a
          key={party.shortName}
          href={party.website}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
          title={`Επισκεφθείτε την ιστοσελίδα του ${party.shortName}`}
        >
          <PartyLogo party={party.shortName} className="w-6 h-6" />
        </a>
      ))}
    </div>
  );
}