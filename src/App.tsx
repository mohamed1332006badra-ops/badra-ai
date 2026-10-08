import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/hooks/useAuth';
import { ThemeProvider } from '@/hooks/useTheme';
import { LanguageProvider } from '@/hooks/useLanguage';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import AppLayout from '@/components/layout/AppLayout';

const LandingPage = lazy(() => import('@/pages/LandingPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage'));
const OnboardingPage = lazy(() => import('@/pages/OnboardingPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const AIAssistantPage = lazy(() => import('@/pages/AIAssistantPage'));
const CRMPage = lazy(() => import('@/pages/CRMPage'));
const LeadsPage = lazy(() => import('@/pages/LeadsPage'));
const CustomersPage = lazy(() => import('@/pages/CustomersPage'));
const DealsPage = lazy(() => import('@/pages/DealsPage'));
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'));
const AnalyticsPage = lazy(() => import('@/pages/AnalyticsPage'));
const AutomationsPage = lazy(() => import('@/pages/AutomationsPage'));
const ReportsPage = lazy(() => import('@/pages/ReportsPage'));
const NotificationsPage = lazy(() => import('@/pages/NotificationsPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen bg-[#0a0b0f] flex items-center justify-center text-white font-bold">BADRA AI Loading...</div>}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
              <Route path="/app" element={<ProtectedRoute requireOnboarding><AppLayout /></ProtectedRoute>}>
                <Route index element={<DashboardPage />} />
                <Route path="ai" element={<AIAssistantPage />} />
                <Route path="crm" element={<CRMPage />} />
                <Route path="leads" element={<LeadsPage />} />
                <Route path="customers" element={<CustomersPage />} />
                <Route path="deals" element={<DealsPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="automations" element={<AutomationsPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster position="top-right" />
      </AuthProvider>
    </ThemeProvider>
    </LanguageProvider>
  );
}
