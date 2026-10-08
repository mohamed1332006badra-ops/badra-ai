import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';

interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  overview: { ar: 'نظرة عامة', en: 'Overview' },
  ai_assistant: { ar: 'المساعد الذكي', en: 'AI Assistant' },
  crm: { ar: 'إدارة العملاء', en: 'CRM' },
  leads: { ar: 'العملاء المحتملون', en: 'Leads' },
  customers: { ar: 'العملاء', en: 'Customers' },
  deals: { ar: 'الصفقات', en: 'Deals' },
  projects: { ar: 'المشاريع', en: 'Projects' },
  analytics: { ar: 'التحليلات', en: 'Analytics' },
  automations: { ar: 'الأتمتة', en: 'Automations' },
  reports: { ar: 'التقارير', en: 'Reports' },
  notifications: { ar: 'الإشعارات', en: 'Notifications' },
  settings: { ar: 'الإعدادات', en: 'Settings' },
  
  // Section Dividers
  divider_crm: { ar: 'إدارة العلاقات', en: 'CRM' },
  divider_work: { ar: 'العمل والمشاريع', en: 'WORK' },
  divider_account: { ar: 'الحساب', en: 'ACCOUNT' },

  // TopNav & Header
  search_placeholder: { ar: 'ابحث في كل شيء...', en: 'Search anything...' },
  ask_ai: { ar: 'اسأل الذكاء الاصطناعي', en: 'Ask AI' },
  quick_action: { ar: 'إجراء سريع', en: 'Quick Action' },
  logout: { ar: 'تسجيل الخروج', en: 'Logout' },
  lang_switch: { ar: 'English', en: 'العربية' },

  // Dashboard Greetings & Metrics
  good_morning: { ar: 'صباح الخير', en: 'Good morning' },
  total_revenue: { ar: 'إجمالي الإيرادات', en: 'Total Revenue' },
  total_customers: { ar: 'إجمالي العملاء', en: 'Total Customers' },
  conversion_rate: { ar: 'معدل التحويل', en: 'Conversion Rate' },
  active_deals: { ar: 'الصفقات النشطة', en: 'Active Deals' },
  revenue_overview: { ar: 'نظرة عامة على الإيرادات', en: 'Revenue Overview' },
  monthly_rev_exp: { ar: 'الإيرادات الشهرية مقابل المصروفات', en: 'Monthly revenue vs expenses' },
  revenue_by_source: { ar: 'الإيرادات حسب المصدر', en: 'Revenue by Source' },
  product_breakdown: { ar: 'تفصيل المنتجات والخدمات', en: 'Product breakdown' },
  revenue: { ar: 'الإيرادات', en: 'Revenue' },
  expenses: { ar: 'المصروفات', en: 'Expenses' },
  profit: { ar: 'صافي الأرباح', en: 'Profit' },
  ai_opportunities_found: { ar: 'فرص تجارية حددها الذكاء الاصطناعي', en: 'opportunities identified by AI' },

  // General Actions & Status
  add_lead: { ar: 'إضافة عميل محتمل', en: 'Add Lead' },
  add_deal: { ar: 'إضافة صفقة', en: 'Add Deal' },
  add_customer: { ar: 'إضافة عميل', en: 'Add Customer' },
  new_project: { ar: 'مشروع جديد', en: 'New Project' },
  new_automation: { ar: 'أتمتة جديدة', en: 'New Automation' },
  generate_report: { ar: 'إنشاء تقرير', en: 'Generate Report' },
  view_all: { ar: 'عرض الكل', en: 'View all' },
  active: { ar: 'نشط', en: 'Active' },
  inactive: { ar: 'غير نشط', en: 'Inactive' },
  plan: { ar: 'باقة', en: 'plan' },
  save_changes: { ar: 'حفظ التغييرات', en: 'Save Changes' },
  all_caught_up: { ar: 'تمت قراءة كل الإشعارات!', en: 'All caught up!' },
  mark_all_read: { ar: 'تحديد الكل كمقروء', en: 'Mark all read' },
  unread: { ar: 'غير مقروءة', en: 'unread' },
};

interface LanguageContextType {
  language: Language;
  dir: 'rtl' | 'ltr';
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('badra_language') as Language) || 'ar';
  });

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  const applyLanguage = (lang: Language) => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    if (lang === 'ar') {
      document.documentElement.classList.add('font-arabic');
    } else {
      document.documentElement.classList.remove('font-arabic');
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('badra_language', lang);
    applyLanguage(lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(nextLang);
  };

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  useEffect(() => {
    applyLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, dir, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
