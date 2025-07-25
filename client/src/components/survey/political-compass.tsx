import React from "react";
import { PartyLogo } from "@/components/party-logos";
import type { Party, SurveyResult } from "@shared/schema";
import { useTranslation } from "@/lib/i18n";

interface PoliticalCompassProps {
  parties: Party[];
  userResult?: SurveyResult;
}

interface CompassPosition {
  economic: number; // -2 to 2 (left to right)
  social: number; // -2 to 2 (authoritarian to libertarian)
}

export function PoliticalCompass({ parties, userResult }: PoliticalCompassProps) {
  const { t } = useTranslation();
  // Define party positions on the political compass
  const partyPositions: Record<string, CompassPosition> = {
    "ΝΔ": { economic: 1.2, social: 0.3 },
    "ΣΥΡΙΖΑ": { economic: -1.5, social: 1.2 },
    "ΠΑΣΟΚ": { economic: -0.5, social: 0.8 },
    "ΚΚΕ": { economic: -2.0, social: -0.5 },
    "ΕΛ": { economic: 0.8, social: -1.5 },
    "ΠΕ": { economic: 1.8, social: 1.5 },
    "ΝΙΚΗ": { economic: -0.2, social: -1.8 },
    "ΣΠΑΡ": { economic: 0.5, social: -2.0 },
    "ΝΑ": { economic: -1.8, social: 1.8 }
  };

  // Calculate user position based on party alignments
  const calculateUserPosition = (): CompassPosition => {
    if (!userResult) return { economic: 0, social: 0 };

    let totalEconomic = 0;
    let totalSocial = 0;
    let totalWeight = 0;

    parties.forEach(party => {
      const alignments = userResult.partyAlignments as Record<string, number>;
      const alignment = alignments?.[party.shortName] || 0;
      const position = partyPositions[party.shortName];
      if (position && alignment > 0) {
        const weight = alignment / 100;
        totalEconomic += position.economic * weight;
        totalSocial += position.social * weight;
        totalWeight += weight;
      }
    });

    return totalWeight > 0 
      ? { 
          economic: totalEconomic / totalWeight, 
          social: totalSocial / totalWeight 
        }
      : { economic: 0, social: 0 };
  };

  const userPosition = calculateUserPosition();

  // Convert compass coordinates to SVG coordinates
  const toSvgCoords = (position: CompassPosition) => ({
    x: ((position.economic + 2) / 4) * 360 + 20, // Map -2..2 to 20..380
    y: ((-position.social + 2) / 4) * 360 + 20   // Map 2..-2 to 20..380 (inverted Y)
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-xl font-semibold text-neutral-900 mb-4 text-center">
        {t('politicalCompass')}
      </h3>
      
      <div className="flex justify-center mb-4">
        <svg width="400" height="400" className="border border-neutral-200 rounded">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#grid)" />
          
          {/* Center lines */}
          <line x1="200" y1="20" x2="200" y2="380" stroke="#d1d5db" strokeWidth="2" />
          <line x1="20" y1="200" x2="380" y2="200" stroke="#d1d5db" strokeWidth="2" />
          
          {/* Quadrant labels */}
          <text x="110" y="110" textAnchor="middle" fontSize="12" fill="#6b7280" fontWeight="bold">
            Αριστερά
          </text>
          <text x="290" y="110" textAnchor="middle" fontSize="12" fill="#6b7280" fontWeight="bold">
            Δεξιά
          </text>
          <text x="110" y="290" textAnchor="middle" fontSize="12" fill="#6b7280" fontWeight="bold">
            Αριστερά
          </text>
          <text x="290" y="290" textAnchor="middle" fontSize="12" fill="#6b7280" fontWeight="bold">
            Δεξιά
          </text>
          
          {/* Axis labels */}
          <text x="200" y="15" textAnchor="middle" fontSize="11" fill="#374151" fontWeight="bold">
            {t('libertarian')}
          </text>
          <text x="200" y="395" textAnchor="middle" fontSize="11" fill="#374151" fontWeight="bold">
            {t('authoritarian')}
          </text>
          <text x="10" y="205" textAnchor="middle" fontSize="11" fill="#374151" fontWeight="bold" transform="rotate(-90, 10, 205)">
            {t('economicLeft')}
          </text>
          <text x="390" y="205" textAnchor="middle" fontSize="11" fill="#374151" fontWeight="bold" transform="rotate(90, 390, 205)">
            {t('economicRight')}
          </text>

          {/* Party positions */}
          {parties.map(party => {
            const position = partyPositions[party.shortName];
            if (!position) return null;
            
            const coords = toSvgCoords(position);
            return (
              <g key={party.id}>
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r="16"
                  fill="white"
                  stroke={party.color}
                  strokeWidth="2"
                />
                <foreignObject
                  x={coords.x - 8}
                  y={coords.y - 8}
                  width="16"
                  height="16"
                >
                  <PartyLogo party={party.shortName} className="w-4 h-4" />
                </foreignObject>
                <text
                  x={coords.x}
                  y={coords.y + 28}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#374151"
                  fontWeight="bold"
                >
                  {party.shortName}
                </text>
              </g>
            );
          })}

          {/* User position */}
          {userResult && (
            <g>
              <circle
                cx={toSvgCoords(userPosition).x}
                cy={toSvgCoords(userPosition).y}
                r="12"
                fill="#3b82f6"
                stroke="white"
                strokeWidth="3"
              />
              <text
                x={toSvgCoords(userPosition).x}
                y={toSvgCoords(userPosition).y + 20}
                textAnchor="middle"
                fontSize="10"
                fill="#3b82f6"
                fontWeight="bold"
              >
                {t('language') === 'el' ? 'ΕΣΕΙΣ' : 'YOU'}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-8 text-sm text-neutral-600">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <span>{t('language') === 'el' ? 'Η θέση σας' : 'Your position'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded border-2 border-neutral-400"></div>
          <span>{t('language') === 'el' ? 'Κόμματα' : 'Parties'}</span>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-4 p-4 bg-neutral-50 rounded text-sm text-neutral-600">
        <p className="mb-2">
          <strong>{t('politicalCompass')}:</strong> {t('language') === 'el' 
            ? 'Αυτό το διάγραμμα δείχνει την ιδεολογική θέση κάθε κόμματος και τη δική σας θέση με βάση τις απαντήσεις σας.'
            : 'This diagram shows the ideological position of each party and your position based on your answers.'}
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>{t('language') === 'el' ? 'Οριζόντιος άξονας:' : 'Horizontal axis:'}:</strong> {t('language') === 'el' 
            ? 'Οικονομικές απόψεις (Αριστερά ↔ Δεξιά)' 
            : 'Economic views (Left ↔ Right)'}</li>
          <li><strong>{t('language') === 'el' ? 'Κάθετος άξονας:' : 'Vertical axis:'}:</strong> {t('language') === 'el' 
            ? 'Κοινωνικές απόψεις (Αυταρχικό ↔ Φιλελεύθερο)' 
            : 'Social views (Authoritarian ↔ Libertarian)'}</li>
        </ul>
      </div>
    </div>
  );
}