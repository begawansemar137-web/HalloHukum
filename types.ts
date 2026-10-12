import React from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  phone?: string;
  nik?: string;
  address?: string;
  postalCode?: string;
  ktpPhoto?: string; // Will store base64 string
  profilePicture?: string; // Will store base64 string
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  attachment?: {
    name: string;
    type: string;
  };
}

export interface RelatedContentItem {
  type: 'blog' | 'faq';
  title: string;
  description: string;
  link?: string;
}

export interface Benefit {
  icon: React.ReactElement;
  title: string;
  description: string;
}

export interface ServiceOption {
  slug: string;
  title: string;
  description: string;
  features: string[];
  bestFor: string;
  isPopular?: boolean;
  detailedContent: {
    longDescription: string;
    useCases: { title: string; description: string }[];
    requirements: string[];
    images?: string[];
  };
}

export type TaskPriority = 'Tinggi' | 'Sedang' | 'Rendah';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: TaskPriority;
  dueDate?: string;
}

export interface ServiceRequest {
  id: string;
  serviceName: string;
  status: 'In Progress' | 'Completed' | 'Pending';
  tasks: Task[];
  requestDate: string;
  completionDate?: string;
  problemSummary: string;
}

export interface FilePart {
  mimeType: string;
  data: string; // base64 encoded string
}