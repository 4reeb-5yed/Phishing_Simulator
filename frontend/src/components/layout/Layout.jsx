// =============================================
// LAYOUT — RESPONSIVE SIDEBAR + TOPBAR + FOOTER
// =============================================
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Mail, Target, GraduationCap,
  Shield, Sun, Moon, Menu, X, Github, Linkedin,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

const NAV_ITEMS = [
  { path: '/',           label: 'Dashboard',      icon: LayoutDashboard, end: true,  desc: 'Overview & stats'     },
  { path: '/generator',  label: 'Email Generator', icon: Mail,            end: false, desc: 'Generate simulations' },
  { path: '/campaigns',  label: 'Campaigns',       icon: Target,          end: false, desc: 'Campaign management'  },
  { path: '/education',  label: 'Education Hub',   icon: GraduationCap,   end: false, desc: 'Learn & explore'      },
];

const DEV_INFO = {
  name:     'Areeb Syed',
  github:   'https://github.com/4reeb-5yed',
  linkedin: 'https://www.linkedin.com/in/areeb-syed-b19491245',
  emails:   ['areeb.syed1@outlook.com', '4reeb.5yed@gmail.com'],
};

/* ─── Theme Toggle ─────────────────────────────────── */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      onClick={toggleTheme}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2 rounded-lg text-tx-secondary hover:text-tx-primary hover:bg-surface-overlay transition-all duration-200"
    >
      {isDark
        ? <Sun  className="w-4 h-4 text-amber-400" />
        : <Moon className="w-4 h-4 text-brand" />}
    </button>
  );
}

/* ─── Developer Footer ──────────────────────────────── */
function DevFooter() {
  return (
    <div className="px-4 py-4 border-t border-surface-border">
      <p className="text-[10px] font-semibold text-tx-muted uppercase tracking-widest mb-2">
        Developed by
      </p>
      <p className="text-sm font-semibold text-tx-primary mb-2">{DEV_INFO.name}</p>

      {/* Social icon links — GitHub & LinkedIn only */}
      <div className="flex items-center gap-1.5 mb-3">
        <a
          href={DEV_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-tx-muted hover:text-tx-primary hover:bg-surface-overlay border border-surface-border transition-all text-xs font-medium"
        >
          <Github className="w-3.5 h-3.5" />
          GitHub
        </a>
        <a
          href={DEV_INFO.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-tx-muted hover:text-brand hover:bg-surface-overlay border border-surface-border transition-all text-xs font-medium"
        >
          <Linkedin className="w-3.5 h-3.5" />
          LinkedIn
        </a>
      </div>

      {/* Email addresses as plain text links */}
      <div className="space-y-1">
        {DEV_INFO.emails.map((email) => (
          <a
            key={email}
            href={`mailto:${email}`}
            className="block text-[11px] text-tx-secondary hover:text-brand transition-colors truncate"
          >
            {email}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─── Sidebar Content ───────────────────────────────── */
function SidebarContent({ onNavClick }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center shadow-sm shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-base text-tx-primary tracking-tight">PhishSim</div>
            <div className="text-[10px] text-tx-muted font-mono tracking-wider">AI SIMULATOR v1.0</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-bold text-tx-muted uppercase tracking-widest px-3 pb-2">
          Platform
        </p>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            onClick={onNavClick}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="truncate text-sm">{item.label}</div>
              <div className="text-[11px] text-tx-muted font-normal mt-0.5 truncate">{item.desc}</div>
            </div>
          </NavLink>
        ))}
      </nav>

      {/* Developer Footer */}
      <DevFooter />
    </div>
  );
}

/* ─── Desktop Sidebar ───────────────────────────────── */
function DesktopSidebar() {
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col h-screen sticky top-0 bg-surface-raised border-r border-surface-border">
      <SidebarContent />
    </aside>
  );
}

/* ─── Mobile Drawer ─────────────────────────────────── */
function MobileDrawer({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={onClose} />
      <div className="fixed inset-y-0 left-0 z-50 w-72 bg-surface-raised border-r border-surface-border shadow-modal animate-slide-in lg:hidden">
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-tx-secondary hover:text-tx-primary hover:bg-surface-overlay transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <SidebarContent onNavClick={onClose} />
      </div>
    </>
  );
}

/* ─── Top Bar ───────────────────────────────────────── */
function TopBar({ onMenuClick }) {
  const location = useLocation();
  const currentNav = NAV_ITEMS.find((n) =>
    n.end ? location.pathname === n.path : location.pathname.startsWith(n.path)
  );

  return (
    <header className="sticky top-0 z-30 bg-surface-raised/90 backdrop-blur-md border-b border-surface-border">
      <div className="flex items-center gap-3 px-4 h-14">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-1 rounded-lg text-tx-secondary hover:text-tx-primary hover:bg-surface-overlay transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile logo */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm text-tx-primary">PhishSim</span>
        </div>

        {/* Breadcrumb — desktop */}
        {currentNav && (
          <div className="hidden lg:flex items-center gap-2">
            <currentNav.icon className="w-4 h-4 text-brand" />
            <span className="font-semibold text-sm text-tx-primary">{currentNav.label}</span>
            <span className="text-tx-muted text-sm">/</span>
            <span className="text-xs text-tx-secondary">{currentNav.desc}</span>
          </div>
        )}

        {/* Right — theme toggle only */}
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

/* ─── Mobile Bottom Navigation ──────────────────────── */
function MobileBottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-surface-raised/95 backdrop-blur-md border-t border-surface-border">
      <div className="flex">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-1 py-2.5 px-1 text-center transition-all duration-200 ${
                isActive ? 'text-brand' : 'text-tx-muted'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1.5 rounded-lg transition-all ${isActive ? 'bg-brand/10' : ''}`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-medium leading-none">{item.label.split(' ')[0]}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

/* ─── Main Layout ───────────────────────────────────── */
export function Layout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      <DesktopSidebar />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onMenuClick={() => setDrawerOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-24 lg:pb-8">
            {children}
          </div>
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}