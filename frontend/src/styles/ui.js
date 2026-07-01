export const ui = {
  // =====================================================
  // LAYOUT
  // =====================================================

  layout: "flex h-screen bg-[var(--bg)] text-[var(--text)] overflow-hidden",

  main: "flex-1 overflow-y-auto relative",

  page: "relative min-h-screen overflow-hidden",

  pageContent: "relative z-10 p-6 space-y-6",

  sidebar: "w-64 h-screen sticky top-0",

  sidebarGlass:
    "absolute inset-0 bg-[var(--sidebar)]/80 backdrop-blur-xl border-r border-[var(--border)]",

  sidebarContent: "relative z-10 p-6 flex flex-col justify-between h-full",

  pageGlow: "absolute inset-0 z-0",

  glowLeft:
    "absolute w-[700px] h-[700px] bg-blue-500/20 blur-3xl top-[-250px] left-[-250px] animate-pulse",

  glowRight:
    "absolute w-[600px] h-[600px] bg-blue-400/10 blur-3xl bottom-[-250px] right-[-250px] animate-pulse",

  // =====================================================
  // BRAND
  // =====================================================

  brandContainer: "mb-10 animate-fadeIn",

  brandRow: "flex items-center gap-2",

  brandTitle:
    "text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent",

  brandSubtitle: "text-xs text-[var(--muted)] mt-1 ml-1",

  logoIcon:
    "w-10 h-10 text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.7)] hover:scale-110 transition duration-300",

  // =====================================================
  // PAGE
  // =====================================================

  pageTitle:
    "text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent",

  pageSubtitle: "text-[var(--muted)] mt-1",

  sectionTitle: "text-2xl font-bold",

  cardTitle: "text-xl font-semibold",

  subTitle: "text-lg font-semibold",

  muted: "text-[var(--muted)]",

  primaryText: "text-[var(--primary)]",

  // =====================================================
  // NAVIGATION
  // =====================================================

  nav: "space-y-2",

  navItem:
    "relative flex items-center px-4 py-2 rounded-xl transition-all duration-300 group",

  navBackground: "absolute inset-0 rounded-xl transition",

  navIndicator:
    "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[var(--primary)] rounded-r",

  navText: "relative z-10",

  activeNav: "text-white",

  inactiveNav: "text-[var(--muted)] hover:text-white",

  activeNavBg: "bg-[var(--primary)]/20",

  inactiveNavBg: "group-hover:bg-white/5",

  // =====================================================
  // CARDS
  // =====================================================

  card: "glass p-6 rounded-2xl",

  cardSmall: "glass p-5 rounded-2xl",

  hoverCard: "transition-all hover:scale-[1.02] hover:shadow-2xl",

  hoverCardLarge: "transition-all hover:scale-[1.03] hover:shadow-2xl",

  taskCard:
    "glass p-5 rounded-2xl transition hover:scale-[1.03] hover:shadow-2xl",

  mentorCard: "glass p-5 rounded-2xl border-l-4 border-[var(--primary)]",

  tipsCard: "glass p-5 rounded-2xl border-l-4 border-[var(--accent)]",

  emptyState: "glass p-6 rounded-2xl text-center text-[var(--muted)]",
  // =====================================================
  // BUTTONS
  // =====================================================

  btnPrimary:
    "px-6 py-3 rounded-xl bg-[var(--primary)] hover:bg-blue-600 transition",

  btnDanger: "px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition",

  btnComplete:
    "px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-blue-600 hover:scale-105 transition",

  btnDisabled: "bg-[var(--border)] cursor-not-allowed",

  // =====================================================
  // FORMS
  // =====================================================

  input: "w-full rounded-lg bg-slate-800 px-4 py-3 outline-none",

  searchInput:
    "w-full lg:flex-1 rounded-lg bg-slate-800 px-4 py-3 outline-none",

  select: "bg-slate-800 px-4 py-3 rounded-lg",

  textarea:
    "flex-1 p-3 rounded-xl bg-[var(--card)] border border-[var(--border)] resize-none focus:outline-none",

  filterContainer:
    "glass p-5 rounded-2xl flex flex-col lg:flex-row gap-4 items-center",

  glassInput: "glass p-3 rounded-2xl flex items-center gap-3",

  // =====================================================
  // PROGRESS
  // =====================================================

  progressBackground:
    "w-full h-2 rounded-full bg-[var(--border)] overflow-hidden",
  progressBackgroundLarge:
    "w-full h-4 rounded-full bg-[var(--border)] overflow-hidden",

  progressFill: "h-full rounded-full transition-all duration-700",

  progressFillFast: "h-full rounded-full transition-all duration-500",

  // =====================================================
  // CHAT
  // =====================================================

  chatContainer: "flex flex-col h-[calc(100vh-80px)]",

  chatArea: "flex-1 overflow-y-auto space-y-4 pr-2",

  // =====================================================
  // AUTH
  // =====================================================

  authPage: "min-h-screen flex items-center justify-center",

  authForm: "space-y-4",

  // =====================================================
  // LOADING
  // =====================================================

  loadingPage:
    "min-h-screen flex items-center justify-center text-[var(--muted)]",

  loading:
    "flex items-center justify-center min-h-[60vh] text-[var(--muted)] animate-pulse",

  skeletonGrid: "grid grid-cols-1 md:grid-cols-2 gap-6",

  // =====================================================
  // DASHBOARD
  // =====================================================

  continueCard: "glass p-6 rounded-2xl hover:scale-[1.02] transition-all",

  categoryCard:
    "glass p-5 rounded-2xl hover:scale-[1.03] hover:shadow-2xl animate-slideUp",

  // =====================================================
  // TASK PAGE
  // =====================================================

  topicProgress: "w-full h-2 rounded-full bg-slate-700 mb-6 overflow-hidden",

  // =====================================================
  // COMMON
  // =====================================================

  statCard: "glass p-6 rounded-2xl text-center",

  xpBadge: "text-yellow-400 font-semibold",

  completedBadge: "text-green-400 font-semibold",

  remainingBadge: "text-red-400 font-semibold",
  taskTitle: "text-xl font-bold mt-3 transition",

  taskDescription: "text-sm text-[var(--muted)] mt-3 leading-6",

  taskTopic: "text-blue-400 mt-2 font-medium",

  taskMeta: "mt-4 flex items-center gap-2 text-sm text-[var(--muted)]",

  companyBadge: "px-3 py-1 rounded-full bg-slate-700 text-xs",

  solveButton:
    "flex-1 bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg transition font-medium",

  completedButton:
    "flex-1 py-2 rounded-lg font-medium bg-[var(--accent)] text-black cursor-not-allowed",

  completeButton:
    "flex-1 py-2 rounded-lg font-medium bg-[var(--primary)] hover:bg-blue-600 hover:scale-105 transition",

  xpTitle: "text-xl font-semibold mb-4",

  xpLevel: "text-lg font-medium",

  xpText: "text-sm text-[var(--muted)] mb-4",

  xpNext: "text-xs text-[var(--muted)] mt-2",

  xpCard:
    "glass p-6 rounded-2xl hover:scale-[1.03] hover:border-[var(--primary)]/40 hover:shadow-lg cursor-pointer transition",
  // =====================================================
  // AUTH
  // =====================================================

  authContainer:
    "min-h-screen flex items-center justify-center bg-[var(--bg)] relative overflow-hidden text-white",

  authGlowLeft:
    "absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-[-100px] left-[-100px] animate-pulse",

  authGlowRight:
    "absolute w-96 h-96 bg-blue-400/10 rounded-full blur-3xl bottom-[-100px] right-[-100px] animate-pulse",

  authCard: "glass p-8 rounded-2xl w-96 space-y-4 animate-slideUp z-10",

  authLogo: "mb-4 animate-fadeIn",

  label: "text-sm text-[var(--muted)]",

  error: "text-red-400 text-sm bg-red-500/10 p-2 rounded",

  authButton:
    "w-full bg-[var(--primary)] py-3 rounded-lg hover:scale-[1.03] hover:shadow-lg transition",

  authFooter: "text-sm text-center text-[var(--muted)]",

  authLink: "text-[var(--primary)] cursor-pointer hover:underline",
  // =====================================================
  // MENTOR
  // =====================================================

  quickPrompt:
    "glass px-4 py-2 rounded-full text-sm hover:bg-[var(--primary)] hover:text-white transition",

  mentorWelcome: "glass p-8 rounded-2xl text-center text-[var(--muted)]",

  stepTitle: "text-[var(--primary)] font-semibold",

  tipsTitle: "text-[var(--accent)] font-semibold",

  askButton: "px-6 py-3 rounded-xl font-medium transition",

  askButtonLoading: "bg-[var(--border)] cursor-not-allowed",

  askButtonActive: "bg-[var(--primary)] hover:bg-blue-600 hover:scale-105",
  // =====================================================
  // TASK PAGE
  // =====================================================

  clearButton: "bg-red-500 hover:bg-red-600 px-5 py-3 rounded-lg transition",

  topicTitle: "text-2xl font-bold text-blue-400",

  topicPercent: "text-lg font-bold text-blue-400",

  topicCompleted: "text-sm text-[var(--muted)]",

  topicMotivation: "text-xs text-[var(--muted)] mb-6",
};
