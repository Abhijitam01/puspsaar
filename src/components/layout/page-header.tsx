'use client'

interface PageHeaderProps {
  title: string;
  description?: string;
  extraActions?: React.ReactNode;
}

export function PageHeader({
  title,
  extraActions,
}: PageHeaderProps) {
  return (
    <div className="w-full flex flex-col items-center mb-6">
      <div className="w-full max-w-3xl flex items-center justify-between">
        <div className="flex flex-1 items-center justify-center gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-wide">
            {title}
          </h1>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
        {extraActions && (
          <div className="flex items-center gap-2 ml-4">{extraActions}</div>
        )}
      </div>
    </div>
  );
}
