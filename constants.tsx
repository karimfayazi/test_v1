
import React from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  BarChart3, 
  Users, 
  Settings, 
  FileText,
  Activity
} from 'lucide-react';
import { NavItem, MISProject, ProjectStatus } from './types';

export const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', path: '#/', icon: <LayoutDashboard size={20} /> },
  { name: 'Baseline', path: '#/baseline', icon: <Activity size={20} /> },
  { name: 'Projects', path: '#/projects', icon: <FolderKanban size={20} /> },
  { name: 'Analytics', path: '#/analytics', icon: <BarChart3 size={20} /> },
  { name: 'Reports', path: '#/reports', icon: <FileText size={20} /> },
  { name: 'User Management', path: '#/users', icon: <Users size={20} /> },
  { name: 'Settings', path: '#/settings', icon: <Settings size={20} /> },
];

export const MOCK_PROJECTS: MISProject[] = [
  {
    id: 'PRJ-001',
    title: 'Riverbank Beautification Phase 1',
    department: 'Urban Planning',
    budget: 4500000,
    spent: 3200000,
    startDate: '2023-01-15',
    status: ProjectStatus.IN_PROGRESS,
    progress: 71,
    coordinator: 'Arjun Das'
  },
  {
    id: 'PRJ-002',
    title: 'Smart Street Lighting System',
    department: 'Electrical',
    budget: 1200000,
    spent: 1200000,
    startDate: '2023-05-10',
    status: ProjectStatus.COMPLETED,
    progress: 100,
    coordinator: 'Soma Sen'
  },
  {
    id: 'PRJ-003',
    title: 'Land Record Digitization',
    department: 'IT/Land Revenue',
    budget: 800000,
    spent: 450000,
    startDate: '2023-08-22',
    status: ProjectStatus.IN_PROGRESS,
    progress: 56,
    coordinator: 'Vikram Roy'
  },
  {
    id: 'PRJ-004',
    title: 'New Flyover Survey',
    department: 'Civil Engineering',
    budget: 250000,
    spent: 50000,
    startDate: '2024-01-05',
    status: ProjectStatus.PLANNED,
    progress: 20,
    coordinator: 'Neha Gupta'
  },
  {
    id: 'PRJ-005',
    title: 'Public Park Refurbishment',
    department: 'Environment',
    budget: 1500000,
    spent: 1500000,
    startDate: '2022-11-12',
    status: ProjectStatus.COMPLETED,
    progress: 100,
    coordinator: 'Amit Bose'
  },
  {
    id: 'PRJ-006',
    title: 'Water Pipeline Extension',
    department: 'Public Health',
    budget: 3200000,
    spent: 0,
    startDate: '2024-03-01',
    status: ProjectStatus.ON_HOLD,
    progress: 0,
    coordinator: 'Deepak Jha'
  }
];

export const MOCK_BASELINE_DATA = [
  { id: 'BSL-2024-001', familyHead: 'Ramesh Chatterjee', ward: 'Ward 12', region: 'North', income: 15000, status: 'Surveyed', date: '2024-02-10' },
  { id: 'BSL-2024-002', familyHead: 'Anita Sharma', ward: 'Ward 05', region: 'South', income: 22000, status: 'Verified', date: '2024-02-12' },
  { id: 'BSL-2024-003', familyHead: 'Sunil Mondal', ward: 'Ward 18', region: 'East', income: 12000, status: 'Surveyed', date: '2024-02-14' },
  { id: 'BSL-2024-004', familyHead: 'Priya Das', ward: 'Ward 02', region: 'West', income: 35000, status: 'Pending Approval', date: '2024-02-15' },
  { id: 'BSL-2024-005', familyHead: 'Bikram Singh', ward: 'Ward 11', region: 'North', income: 18500, status: 'Verified', date: '2024-02-18' },
];
