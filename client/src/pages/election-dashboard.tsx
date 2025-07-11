import React from "react";
import { ElectionResults } from "@/components/survey/election-results";
import { Link } from "wouter";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

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
                <img 
                  src="/attached_assets/ideologo-lo_1752218850166.PNG" 
                  alt="Ιδεολόγος Logo" 
                  className="w-8 h-8"
                />
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