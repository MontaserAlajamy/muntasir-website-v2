import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ className, children, hover = false }) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-dark-700',
        hover && 'transition-shadow duration-200 hover:shadow-md dark:hover:shadow-gray-800/30',
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        'border-b border-gray-200 px-6 py-4 dark:border-gray-700',
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const CardTitle: React.FC<CardTitleProps> = ({
  className,
  children,
  as: Component = 'h3',
}) => {
  return (
    <Component
      className={cn(
        'text-lg font-semibold text-gray-900 dark:text-white',
        className
      )}
    >
      {children}
    </Component>
  );
};

interface CardDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

const CardDescription: React.FC<CardDescriptionProps> = ({
  className,
  children,
}) => {
  return (
    <p
      className={cn(
        'mt-1 text-sm text-gray-500 dark:text-gray-400',
        className
      )}
    >
      {children}
    </p>
  );
};

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({ className, children }) => {
  return <div className={cn('px-6 py-4', className)}>{children}</div>;
};

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

const CardFooter: React.FC<CardFooterProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        'border-t border-gray-200 px-6 py-4 dark:border-gray-700',
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: 'video' | 'square' | 'wide' | 'auto';
  overlay?: boolean;
}

const CardImage: React.FC<CardImageProps> = ({
  className,
  aspectRatio = 'auto',
  overlay = false,
  alt = '',
  ...props
}) => {
  const aspectRatioClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    wide: 'aspect-[16/9]',
    auto: '',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-t-lg',
        aspectRatio !== 'auto' && aspectRatioClasses[aspectRatio]
      )}
    >
      <img
        className={cn('h-auto w-full object-cover', className)}
        alt={alt}
        {...props}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
      )}
    </div>
  );
};

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
};