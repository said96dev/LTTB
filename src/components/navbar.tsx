import React from 'react';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onDocsClick: () => void;
}

export function Navbar({ onDocsClick }: NavbarProps) {
  return (
    <nav className="bg-card border-b">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold">LTTB Visualization</span>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={onDocsClick}
              className="flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Documentation
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}