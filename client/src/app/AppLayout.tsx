import * as React from 'react';
import './AppLayout.css';

export interface AppLayoutProps {
  title: string;
}

export interface PageHeaderProps {}
export interface PageContentProps {}

const Header: React.FC<PageHeaderProps> = ({ children }) => {
  return <div className="flex pb-8 items-center">{children}</div>;
};

export const Title: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
}) => {
  return <div className={`font-sans text-2xl ${className}`}>{children}</div>;
};

const Content: React.FC<PageContentProps> = ({ children }) => {
  return (
    <div className="flex flex-col bg-white p-4 rounded-lg h-full">
      {children}
    </div>
  );
};

const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col bg-gray-200 min-h-screen w-screen p-8">
      {children}
    </div>
  );
};

export const AppLayout = Object.assign(Layout, {
  Header,
  Content,
});
