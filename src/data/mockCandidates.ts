
export interface Candidate {
  id: string;
  name: string;
  avatar: string;
  badges: string[];
  technicalFit: number;
  timezone: string;
  hourlyRate: number;
  skills: {
    codeQuality: number;
    performance: number;
    communication: number;
    reliability: number;
    innovation: number;
  };
  verifiedProjects: number;
  completionRate: number;
  responseTime: string;
}

export const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Alex Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    badges: ["React Expert", "Node.js", "TypeScript", "AWS"],
    technicalFit: 92,
    timezone: "UTC+8",
    hourlyRate: 85,
    skills: {
      codeQuality: 95,
      performance: 88,
      communication: 90,
      reliability: 94,
      innovation: 87
    },
    verifiedProjects: 24,
    completionRate: 98,
    responseTime: "< 2h"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    badges: ["Vue.js", "Python", "Docker", "GCP"],
    technicalFit: 89,
    timezone: "UTC-5",
    hourlyRate: 75,
    skills: {
      codeQuality: 91,
      performance: 85,
      communication: 93,
      reliability: 89,
      innovation: 92
    },
    verifiedProjects: 18,
    completionRate: 96,
    responseTime: "< 1h"
  },
  {
    id: "3",
    name: "David Kumar",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    badges: ["Angular", "Java", "Spring", "Kubernetes"],
    technicalFit: 87,
    timezone: "UTC+5:30",
    hourlyRate: 65,
    skills: {
      codeQuality: 88,
      performance: 92,
      communication: 85,
      reliability: 91,
      innovation: 84
    },
    verifiedProjects: 31,
    completionRate: 97,
    responseTime: "< 3h"
  },
  {
    id: "4",
    name: "Maria Garcia",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    badges: ["React Native", "Flutter", "iOS", "Android"],
    technicalFit: 84,
    timezone: "UTC-3",
    hourlyRate: 70,
    skills: {
      codeQuality: 86,
      performance: 89,
      communication: 94,
      reliability: 88,
      innovation: 90
    },
    verifiedProjects: 15,
    completionRate: 94,
    responseTime: "< 4h"
  },
  {
    id: "5",
    name: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    badges: ["PHP", "Laravel", "MySQL", "Redis"],
    technicalFit: 81,
    timezone: "UTC+0",
    hourlyRate: 60,
    skills: {
      codeQuality: 83,
      performance: 87,
      communication: 89,
      reliability: 92,
      innovation: 79
    },
    verifiedProjects: 22,
    completionRate: 95,
    responseTime: "< 6h"
  },
  {
    id: "6",
    name: "Liu Wei",
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
    badges: ["Go", "Microservices", "MongoDB", "GraphQL"],
    technicalFit: 90,
    timezone: "UTC+8",
    hourlyRate: 80,
    skills: {
      codeQuality: 92,
      performance: 94,
      communication: 87,
      reliability: 93,
      innovation: 88
    },
    verifiedProjects: 19,
    completionRate: 99,
    responseTime: "< 2h"
  }
];
