import React from "react";
import { ElectionResults } from "@/components/survey/election-results";
import { Link } from "wouter";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
// SVG version of the Ιδεολόγος compass logo
const CompassLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    {/* Black border circle */}
    <circle cx="50" cy="50" r="48" fill="none" stroke="black" strokeWidth="4"/>
    
    {/* Colored quadrants */}
    <path d="M 50,50 L 50,2 A 48,48 0 0,1 98,50 Z" fill="#ff6b6b" />
    <path d="M 50,50 L 98,50 A 48,48 0 0,1 50,98 Z" fill="#4ecdc4" />
    <path d="M 50,50 L 50,98 A 48,48 0 0,1 2,50 Z" fill="#45b7d1" />
    <path d="M 50,50 L 2,50 A 48,48 0 0,1 50,2 Z" fill="#9b59b6" />
    
    {/* Compass needle */}
    <path d="M 50,15 L 40,50 L 50,40 L 60,50 Z" fill="black" />
  </svg>
);

export default function ElectionDashboard() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Πίσω στο Τεστ</span>
                </Button>
              </Link>
              <div className="h-6 w-px bg-neutral-300" />
              <div className="flex items-center space-x-3">
                <CompassLogo className="w-8 h-8" />
                <h1 className="text-2xl font-bold text-neutral-900">
                  Ιδεολόγος - Αποτελέσματα Εκλογών
                </h1>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Αρχική</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <ElectionResults />
      </div>
    </div>
  );
}