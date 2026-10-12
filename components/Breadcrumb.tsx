import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex items-center space-x-1 text-slate-500 flex-wrap">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <Icon className="w-4 h-4 mx-1 text-slate-400 flex-shrink-0" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"></polyline>
              </Icon>
            )}
            {item.link ? (
              <Link to={item.link} className="hover:text-brand-dark hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-brand-dark" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
