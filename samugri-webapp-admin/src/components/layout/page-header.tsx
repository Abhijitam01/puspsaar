'use client'

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
  description?: string;
  showBack?: boolean;
  extraActions?: React.ReactNode;
}

export function PageHeader({
  title,
  extraActions,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center mb-8">
      {/* Header Wrapper */}
      <div className="w-full max-w-3xl flex items-center justify-between">
        {/* Center Title Section */}
        <div className="flex flex-1 items-center justify-center gap-3">
          {/* Left Icon */}
          <img
            src="/flower.png"
            alt="left icon"
            className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
          />

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-tertiary text-center cursive-text tracking-wide">
            {title}
          </h1>

          {/* Right Icon */}
          <img
            src="/flower.png"
            alt="right icon"
            className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
          />
        </div>

        {/* Optional Extra Actions */}
        {extraActions && (
          <div className="flex items-center gap-2 ml-4">{extraActions}</div>
        )}
      </div>
    </div>
  );
}
