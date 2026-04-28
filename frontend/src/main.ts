import "./style.css";

type Listing = {
  id: string;
  title: string;
  author: string;
  version: string;
  platform: string;
  description: string;
  downloads: number;
  updated: string;
};

type Achievement = {
  title: string;
  description: string;
};

type Theme = "dark" | "light";
type FontSize = "default" | "large" | "x-large";
type VisibilityOption = "everyone" | "friends" | "private";
type View = "home" | "library" | "friends" | "profile" | "signin" | "settings" | "help";
type ToastTone = "info" | "success" | "warning";

type AppPreferences = {
  theme: Theme;
  fontSize: FontSize;
  reduceMotion: boolean;
  highContrast: boolean;
  readableSurfaces: boolean;
};

type PrivacySettings = {
  allowDataSale: boolean;
  allowUsageAnalytics: boolean;
  allowTracking: boolean;
  allowPersonalizedRecommendations: boolean;
  publicProfile: boolean;
  profileVisibility: VisibilityOption;
  friendsListVisibility: VisibilityOption;
  activityVisibility: VisibilityOption;
  allowFriendRequests: boolean;
  allowDirectMessages: boolean;
  showOnlineStatus: boolean;
};

type Profile = {
  name: string;
  title: string;
  bio: string;
  status: string;
  favoriteGame: string;
  dateJoined: string;
  level: number;
  totalHoursPlayed: number;
  comments: string[];
  wishlist: string[];
  recentActivity: string[];
  achievements: Achievement[];
};

type FriendCard = {
  name: string;
  title: string;
  status: string;
  favoriteGame: string;
  libraryCount: number;
  mutualProjects: string;
};

type DemoState = {
  libraryIds: string[];
  privacy: PrivacySettings;
};

type BackendUser = {
  user_id: number;
  username: string;
  email: string;
};

type SignInResponse = {
  user: BackendUser;
  created: unknown;
  users: unknown;
};

type SignInConsoleOutput = {
  created_user_id: number;
  created_user: BackendUser;
  backend_response: unknown;
  users: unknown;
};

const APP_NAME = "SteamLite";
const API_BASE_URL = "http://127.0.0.1:5000/api";

const STORAGE_KEYS = {
  preferences: "steamlite.preferences",
  demoState: "steamlite.demoState",
};

const LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Bullet Hell",
    author: "Backend dev",
    version: "0.1.1",
    platform: "Windows",
    description:
      "I am not sure what this game is about yet but im sure there are a lot of bullets involved.",
    downloads: 1000000,
    updated: "2 days ago",
  },
  {
    id: "2",
    title: "Clicker Game",
    author: "Backend dev",
    version: "0.1.0",
    platform: "Windows",
    description: "Probably something to do with clicking a lot?",
    downloads: 58,
    updated: "yesterday",
  },
  {
    id: "3",
    title: "Doom Clone",
    author: "Backend dev",
    version: "0.1.4",
    platform: "Linux, Windows",
    description: "Fight some demons.",
    downloads: 311,
    updated: "6 hours ago",
  },
  {
    id: "4",
    title: "File Checker",
    author: "Backend dev",
    version: "0.1.3",
    platform: "Linux",
    description: "Check your files",
    downloads: 541,
    updated: "6 hours ago",
  },
  {
    id: "5",
    title: "2D Mines Game",
    author: "Backend dev",
    version: "0.1.3",
    platform: "Linux",
    description: "Play Mines!",
    downloads: 234,
    updated: "10 hours ago",
  },
];

const PLACEHOLDER_PROFILE: Profile = {
  name: "Student Player",
  title: "Presentation build account",
  bio: "This profile is using front-end placeholder data so the presentation can show a believable signed-in experience without changing the authentication work happening elsewhere.",
  status: "Preparing the Wednesday presentation",
  favoriteGame: "Bullet Hell",
  dateJoined: "March 12, 2024",
  level: 18,
  totalHoursPlayed: 412,
  comments: [
    "The launcher feels much better now that the pages are filled in.",
    "The new settings panel makes the prototype look more complete.",
    "A few stronger animations make the walkthrough feel much more alive.",
  ],
  wishlist: ["Doom Clone", "Clicker Game", "File Checker"],
  recentActivity: [
    "Saved Doom Clone to the demo library",
    "Reviewed the FAQ page for presentation questions",
    "Adjusted privacy toggles before the final walkthrough",
  ],
  achievements: [
    {
      title: "First Download",
      description: "Downloaded the first game on the platform.",
    },
    {
      title: "Patch Watcher",
      description: "Reviewed a few update notes before the demo.",
    },
    {
      title: "Presentation Ready",
      description: "Finished the front-end polish pass for the showcase.",
    },
  ],
};

const FRIENDS: FriendCard[] = [
  {
    name: "Morgan Lee",
    title: "QA lead and patch-note collector",
    status: "Polishing the presentation build",
    favoriteGame: "Doom Clone",
    libraryCount: 2,
    mutualProjects: "UI polish and release checks",
  },
  {
    name: "Sasha Patel",
    title: "Accessibility-focused playtester",
    status: "Checking readability settings",
    favoriteGame: "File Checker",
    libraryCount: 2,
    mutualProjects: "Accessibility pass and FAQ review",
  },
  {
    name: "Devon Brooks",
    title: "Social feature mockup tester",
    status: "Making the friends page feel realistic",
    favoriteGame: "Bullet Hell",
    libraryCount: 3,
    mutualProjects: "Profile polish and settings walkthrough",
  },
];

const VISIBILITY_LABELS: Record<VisibilityOption, string> = {
  everyone: "Everyone",
  friends: "Friends only",
  private: "Only me",
};

const DEFAULT_PREFERENCES: AppPreferences = {
  theme: "dark",
  fontSize: "default",
  reduceMotion: false,
  highContrast: false,
  readableSurfaces: false,
};

const DEFAULT_PRIVACY_SETTINGS: PrivacySettings = {
  allowDataSale: false,
  allowUsageAnalytics: true,
  allowTracking: true,
  allowPersonalizedRecommendations: true,
  publicProfile: true,
  profileVisibility: "friends",
  friendsListVisibility: "friends",
  activityVisibility: "friends",
  allowFriendRequests: true,
  allowDirectMessages: true,
  showOnlineStatus: true,
};

const DEFAULT_DEMO_STATE: DemoState = {
  libraryIds: ["1", "3"],
  privacy: DEFAULT_PRIVACY_SETTINGS,
};

function needEl<T extends HTMLElement>(id: string): T {
  const node = document.getElementById(id);
  if (!node) throw new Error(`missing element: #${id}`);
  return node as T;
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeParseJson<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function loadPreferences(): AppPreferences {
  const saved = safeParseJson<Partial<AppPreferences>>(localStorage.getItem(STORAGE_KEYS.preferences), {});
  const legacyTheme = localStorage.getItem("theme");

  return {
    theme:
      saved.theme === "light" || saved.theme === "dark"
        ? saved.theme
        : legacyTheme === "light"
          ? "light"
          : DEFAULT_PREFERENCES.theme,
    fontSize:
      saved.fontSize === "large" || saved.fontSize === "x-large"
        ? saved.fontSize
        : DEFAULT_PREFERENCES.fontSize,
    reduceMotion:
      typeof saved.reduceMotion === "boolean"
        ? saved.reduceMotion
        : DEFAULT_PREFERENCES.reduceMotion,
    highContrast:
      typeof saved.highContrast === "boolean"
        ? saved.highContrast
        : DEFAULT_PREFERENCES.highContrast,
    readableSurfaces:
      typeof saved.readableSurfaces === "boolean"
        ? saved.readableSurfaces
        : DEFAULT_PREFERENCES.readableSurfaces,
  };
}

function savePreferences() {
  localStorage.setItem(STORAGE_KEYS.preferences, JSON.stringify(appPreferences));
  localStorage.setItem("theme", appPreferences.theme);
}

function loadDemoState(): DemoState {
  const saved = safeParseJson<Partial<DemoState>>(localStorage.getItem(STORAGE_KEYS.demoState), {});

  return {
    libraryIds: Array.isArray(saved.libraryIds)
      ? saved.libraryIds.filter((id): id is string => typeof id === "string")
      : [...DEFAULT_DEMO_STATE.libraryIds],
    privacy: {
      ...DEFAULT_PRIVACY_SETTINGS,
      ...(saved.privacy ?? {}),
    },
  };
}

function saveDemoState() {
  localStorage.setItem(STORAGE_KEYS.demoState, JSON.stringify(demoState));
}

function syncThemeToggleButton() {
  const btn = document.getElementById("theme-toggle") as HTMLButtonElement | null;
  if (!btn) return;

  if (appPreferences.theme === "dark") {
    btn.textContent = "Light";
    btn.setAttribute("aria-label", "Switch to light theme");
    btn.title = "Switch to light theme";
  } else {
    btn.textContent = "Dark";
    btn.setAttribute("aria-label", "Switch to dark theme");
    btn.title = "Switch to dark theme";
  }
}

function applyTheme(theme: Theme) {
  appPreferences.theme = theme;
  document.body.classList.remove("theme-dark", "theme-light");
  document.body.classList.add(theme === "dark" ? "theme-dark" : "theme-light");
  syncThemeToggleButton();
  savePreferences();
}

function applyAccessibilityPreferences() {
  document.body.dataset.fontSize = appPreferences.fontSize;
  document.body.classList.toggle("reduce-motion", appPreferences.reduceMotion);
  document.body.classList.toggle("high-contrast", appPreferences.highContrast);
  document.body.classList.toggle("readable-surfaces", appPreferences.readableSurfaces);
  savePreferences();
}

function initTheme() {
  applyTheme(appPreferences.theme);
  applyAccessibilityPreferences();

  const toggleBtn = document.getElementById("theme-toggle") as HTMLButtonElement | null;
  toggleBtn?.addEventListener("click", () => {
    applyTheme(appPreferences.theme === "dark" ? "light" : "dark");
    if (currentView === "settings") {
      setSettingsFeedback("Theme updated.");
      syncSettingsControls();
    }
  });
}

function setSettingsFeedback(message: string) {
  const feedback = document.getElementById("settings-feedback") as HTMLParagraphElement | null;
  if (!feedback) return;

  feedback.textContent = message;
  feedback.classList.add("saved");

  if (settingsFeedbackTimer !== null) {
    window.clearTimeout(settingsFeedbackTimer);
  }

  settingsFeedbackTimer = window.setTimeout(() => {
    feedback.classList.remove("saved");
    feedback.textContent = "Changes save automatically on this browser.";
  }, 2400);
}

function syncSettingsControls() {
  const themeInput = document.querySelector<HTMLInputElement>(
    `input[name="theme-choice"][value="${appPreferences.theme}"]`
  );
  if (themeInput) themeInput.checked = true;

  const fontSizeSelect = document.getElementById("font-size-select") as HTMLSelectElement | null;
  if (fontSizeSelect) fontSizeSelect.value = appPreferences.fontSize;

  const reduceMotionToggle = document.getElementById("reduce-motion-toggle") as HTMLInputElement | null;
  if (reduceMotionToggle) reduceMotionToggle.checked = appPreferences.reduceMotion;

  const highContrastToggle = document.getElementById("high-contrast-toggle") as HTMLInputElement | null;
  if (highContrastToggle) highContrastToggle.checked = appPreferences.highContrast;

  const readableSurfacesToggle = document.getElementById("readable-surfaces-toggle") as HTMLInputElement | null;
  if (readableSurfacesToggle) readableSurfacesToggle.checked = appPreferences.readableSurfaces;
}

function findListing(listingId: string) {
  return LISTINGS.find((listing) => listing.id === listingId) ?? null;
}

function getLibraryListings() {
  return demoState.libraryIds
    .map((listingId) => findListing(listingId))
    .filter((listing): listing is Listing => Boolean(listing));
}

function showToast(message: string, tone: ToastTone = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${tone}`;

  const messageEl = document.createElement("span");
  messageEl.textContent = message;
  toast.appendChild(messageEl);

  toastStack.appendChild(toast);
  window.requestAnimationFrame(() => toast.classList.add("visible"));

  window.setTimeout(() => {
    toast.classList.remove("visible");
    window.setTimeout(() => toast.remove(), 220);
  }, 2800);
}

function setActiveNav(action: View) {
  document.querySelectorAll<HTMLElement>("[data-nav]").forEach((el) => {
    el.classList.toggle("is-active", el.getAttribute("data-nav") === action);
  });
}

function setDrawerOpen(open: boolean) {
  drawer.classList.toggle("open", open);
  drawer.setAttribute("aria-hidden", open ? "false" : "true");
}

function slugifyFileName(value: string) {
  return value.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replaceAll(/^-+|-+$/g, "") || "application";
}

function getDownloadFilename(response: Response, listing: Listing) {
  const disposition = response.headers.get("Content-Disposition") ?? "";
  const utf8FilenameMatch = disposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8FilenameMatch?.[1]) return decodeURIComponent(utf8FilenameMatch[1]);

  const filenameMatch = disposition.match(/filename="?([^";]+)"?/i);
  if (filenameMatch?.[1]) return filenameMatch[1];

  return `${slugifyFileName(listing.title)}.zip`;
}

async function postDemoUser(username: string, password: string): Promise<SignInResponse> {
  const safeUsername = username
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, ".")
    .replaceAll(/^\.+|\.+$/g, "");
  const email = `${safeUsername || "user"}@rudimentary.local`;
  const demoPassword = password || "demo-password";

  const response = await fetch(`${API_BASE_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password: demoPassword,
      bio: "Created from the frontend sign-in page.",
    }),
  });

  const created = await response.json();

  if (!response.ok || created.error) {
    throw new Error(created.error || "Sign in failed");
  }

  const usersResponse = await fetch(`${API_BASE_URL}/users`);
  const users = await usersResponse.json();

  return {
    user: {
      user_id: Number(created.id ?? 0),
      username,
      email,
    },
    created,
    users,
  };
}

const drawer = needEl<HTMLElement>("drawer");
const drawerContent = needEl<HTMLDivElement>("drawer-content");
const drawerClose = needEl<HTMLButtonElement>("drawer-close");

const loading = needEl<HTMLDivElement>("loading-screen");
const bar = needEl<HTMLDivElement>("loading-bar-fill");
const app = needEl<HTMLDivElement>("app");

const search = needEl<HTMLInputElement>("search");
const libraryBtn = needEl<HTMLButtonElement>("library-btn");

const burgerBtn = needEl<HTMLButtonElement>("burger-btn");
const mobileMenu = needEl<HTMLElement>("mobile-menu");
const mobileMenuClose = needEl<HTMLButtonElement>("mobile-menu-close");
const menuBackdrop = needEl<HTMLElement>("menu-backdrop");

const contentRoot = needEl<HTMLDivElement>("content-root");
const sessionIndicator = needEl<HTMLDivElement>("session-indicator");
const toastStack = needEl<HTMLDivElement>("toast-stack");

let appPreferences = loadPreferences();
let demoState = loadDemoState();
let grid: HTMLDivElement | null = null;
let selectedId: string | null = null;
let currentView: View = "home";
let settingsFeedbackTimer: number | null = null;

function renderPanel(title: string, content: string, panelClass = "") {
  contentRoot.innerHTML = `
    <section class="panel center-panel page-shell ${panelClass}">
      <div class="panel-title">${escapeHtml(title)}</div>
      <div class="page-body">
        ${content}
      </div>
    </section>
  `;
}

function renderDrawer(listing: Listing) {
  const inLibrary = demoState.libraryIds.includes(listing.id);

  drawerContent.innerHTML = `
    <div class="drawer-badges">
      <span class="badge">${escapeHtml(listing.platform)}</span>
      <span class="badge">v${escapeHtml(listing.version)}</span>
      ${inLibrary ? '<span class="badge accent-badge">In Library</span>' : ""}
    </div>

    <h3>${escapeHtml(listing.title)}</h3>
    <p>${escapeHtml(listing.description)}</p>

    <div class="detail-row"><span>Author</span><span>${escapeHtml(listing.author)}</span></div>
    <div class="detail-row"><span>Downloads</span><span>${listing.downloads.toLocaleString()}</span></div>
    <div class="detail-row"><span>Updated</span><span>${escapeHtml(listing.updated)}</span></div>

    <p class="drawer-hint">
      ${
        inLibrary
          ? "This title is already in the demo library."
          : "Save this title to the mock library so the presentation account looks more complete."
      }
    </p>

    <div class="drawer-actions">
      <button class="btn" id="btn-view" type="button">Preview</button>
      <button class="btn" id="btn-download" type="button">Download</button>
      <button class="btn accent-btn" id="btn-library" type="button">${inLibrary ? "Remove from Library" : "Add to Library"}</button>
    </div>
  `;

  const viewBtn = document.getElementById("btn-view") as HTMLButtonElement | null;
  const downloadBtn = document.getElementById("btn-download") as HTMLButtonElement | null;
  const libraryActionBtn = document.getElementById("btn-library") as HTMLButtonElement | null;

  viewBtn?.addEventListener("click", () => {
    showToast(`${listing.title} preview is still a placeholder.`, "info");
  });

  downloadBtn?.addEventListener("click", () => {
    void downloadListing(listing, downloadBtn);
  });

  libraryActionBtn?.addEventListener("click", () => {
    toggleListingInLibrary(listing.id);
    renderDrawer(listing);
  });
}

function renderListings(items: Listing[]) {
  if (!grid) return;

  grid.innerHTML = "";

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="empty-state listing-empty-state">
        <div class="empty-state-title">No listings match that search.</div>
        <p class="empty-state-copy">Try a different title, platform, or author keyword.</p>
      </div>
    `;
    return;
  }

  items.forEach((listing, index) => {
    const card = document.createElement("article");
    const inLibrary = demoState.libraryIds.includes(listing.id);

    card.className = "card";
    card.style.setProperty("--card-index", String(index));
    if (listing.id === selectedId) {
      card.classList.add("selected");
    }

    card.innerHTML = `
      <div class="card-top">
        <div class="card-title">${escapeHtml(listing.title)}</div>
        ${inLibrary ? '<span class="card-badge">In Library</span>' : ""}
      </div>
      <div class="card-meta">${escapeHtml(listing.author)} • v${escapeHtml(listing.version)} • ${escapeHtml(listing.platform)}</div>
      <p class="card-desc">${escapeHtml(listing.description)}</p>
    `;

    card.addEventListener("click", () => {
      selectedId = listing.id;
      renderListings(items);
      renderDrawer(listing);
      setDrawerOpen(true);
    });

    grid?.appendChild(card);
  });
}

function applySearch() {
  if (!grid) return;

  const q = search.value.trim().toLowerCase();
  const filtered = LISTINGS.filter((listing) => {
    return (
      listing.title.toLowerCase().includes(q) ||
      listing.author.toLowerCase().includes(q) ||
      listing.platform.toLowerCase().includes(q)
    );
  });

  if (selectedId && !filtered.some((listing) => listing.id === selectedId)) {
    selectedId = null;
    setDrawerOpen(false);
  }

  renderListings(filtered);
}

function boot() {
  let progress = 0;

  const interval = window.setInterval(() => {
    progress = Math.min(100, progress + 10);
    bar.style.width = `${progress}%`;

    if (progress >= 100) {
      window.clearInterval(interval);
      loading.classList.add("hidden");
      app.classList.add("visible");
    }
  }, 70);
}

function setMobileMenuOpen(open: boolean) {
  if (open) {
    mobileMenu.classList.add("open");
    menuBackdrop.classList.add("open");
    burgerBtn.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-hidden", "false");
    menuBackdrop.setAttribute("aria-hidden", "false");
  } else {
    mobileMenu.classList.remove("open");
    menuBackdrop.classList.remove("open");
    burgerBtn.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    menuBackdrop.setAttribute("aria-hidden", "true");
  }
}

function toggleListingInLibrary(listingId: string) {
  const listing = findListing(listingId);
  if (!listing) return;

  const alreadySaved = demoState.libraryIds.includes(listingId);
  demoState = {
    ...demoState,
    libraryIds: alreadySaved
      ? demoState.libraryIds.filter((id) => id !== listingId)
      : [...demoState.libraryIds, listingId],
  };
  saveDemoState();

  showToast(
    alreadySaved ? `${listing.title} removed from the demo library.` : `${listing.title} added to the demo library.`,
    "success"
  );

  if (currentView === "home") {
    applySearch();
  } else if (currentView === "library") {
    renderLibraryPage();
  }
}

async function downloadListing(listing: Listing, button: HTMLButtonElement | null) {
  const originalLabel = button?.textContent ?? "Download";

  if (button) {
    button.disabled = true;
    button.textContent = "Downloading...";
  }

  try {
    const params = new URLSearchParams({
      id: listing.id,
      name: listing.title,
    });

    const response = await fetch(`${API_BASE_URL}/application?${params.toString()}`);
    if (!response.ok) {
      let message = `Download failed for ${listing.title}.`;

      try {
        const errorBody = await response.json();
        if (typeof errorBody?.error === "string") {
          message = errorBody.error;
        }
      } catch {
        // Ignore JSON parsing failures and use the fallback message.
      }

      throw new Error(message);
    }

    const blob = await response.blob();
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = objectUrl;
    link.download = getDownloadFilename(response, listing);
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000);

    if (!demoState.libraryIds.includes(listing.id)) {
      toggleListingInLibrary(listing.id);
    }

    showToast(`Download started for ${listing.title}.`, "success");
  } catch (error) {
    const message = error instanceof Error ? error.message : `Download failed for ${listing.title}.`;
    showToast(message, "warning");
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalLabel;
    }
  }
}

function renderHomePage() {
  currentView = "home";
  setActiveNav("home");
  setDrawerOpen(false);

  contentRoot.innerHTML = `
    <section class="panel center-panel page-shell home-panel">
      <div class="panel-title">Listings</div>

      <div class="page-body home-body">
        <div class="hero-banner">
          <div>
            <div class="hero-kicker">${APP_NAME} showcase</div>
            <h2 class="hero-title">A cleaner front-end flow for the presentation build.</h2>
            <p class="hero-copy">
              The pages now read like a real product instead of placeholders, with a mock library, filled-out social screens, realistic privacy controls, and stronger motion across the site.
            </p>
          </div>

          <div class="hero-chip-row" aria-label="Showcase stats">
            <span class="badge">${LISTINGS.length} listings</span>
            <span class="badge">${demoState.libraryIds.length} in library</span>
            <span class="badge">${FRIENDS.length} friends</span>
          </div>
        </div>
      </div>

      <div id="listing-grid" class="grid"></div>
      <div class="tiny-note">Click any listing to open details, download it, or save it to the mock library.</div>
    </section>
  `;

  grid = needEl<HTMLDivElement>("listing-grid");
  applySearch();
}

function renderProfilePage(profile: Profile) {
  currentView = "profile";
  setActiveNav("profile");
  setDrawerOpen(false);

  const initials = profile.name
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const privacy = demoState.privacy;

  const commentsHtml = profile.comments
    .map(
      (comment) => `
        <li class="profile-list-item">
          <p class="profile-list-copy">${escapeHtml(comment)}</p>
        </li>
      `
    )
    .join("");

  const wishlistHtml = profile.wishlist
    .map(
      (game) => `
        <li class="profile-list-item">
          <p class="profile-list-copy">${escapeHtml(game)}</p>
        </li>
      `
    )
    .join("");

  const activityHtml = profile.recentActivity
    .map(
      (activity) => `
        <li class="profile-list-item">
          <p class="profile-list-copy">${escapeHtml(activity)}</p>
        </li>
      `
    )
    .join("");

  const achievementsHtml = profile.achievements
    .map(
      (achievement) => `
        <li class="profile-list-item">
          <div class="profile-list-title">${escapeHtml(achievement.title)}</div>
          <p class="profile-list-copy">${escapeHtml(achievement.description)}</p>
        </li>
      `
    )
    .join("");

  renderPanel(
    "My Profile",
    `
      <div class="profile-page">
        <section class="profile-hero">
          <div class="profile-avatar" aria-hidden="true">${escapeHtml(initials)}</div>

          <div class="profile-hero-copy">
            <div class="profile-kicker">${privacy.publicProfile ? "Public demo profile" : "Private demo profile"}</div>
            <h2 class="profile-name">${escapeHtml(profile.name)}</h2>
            <p class="profile-role">${escapeHtml(profile.title)}</p>

            <div class="profile-meta">
              <span>${escapeHtml(profile.status)}</span>
              <span>Favorite game: ${escapeHtml(profile.favoriteGame)}</span>
              <span>Visible to: ${escapeHtml(VISIBILITY_LABELS[privacy.profileVisibility])}</span>
            </div>

            <div class="profile-actions">
              <button class="btn profile-action-btn" id="profile-library-btn" type="button">Open Library</button>
              <button class="btn profile-action-btn" id="profile-settings-btn" type="button">Privacy Settings</button>
            </div>
          </div>
        </section>

        <section class="profile-stats" aria-label="Profile stats">
          <article class="profile-stat">
            <div class="profile-stat-label">Level</div>
            <div class="profile-stat-value">${profile.level.toLocaleString()}</div>
          </article>

          <article class="profile-stat">
            <div class="profile-stat-label">Library</div>
            <div class="profile-stat-value">${demoState.libraryIds.length.toLocaleString()}</div>
          </article>

          <article class="profile-stat">
            <div class="profile-stat-label">Friends</div>
            <div class="profile-stat-value">${FRIENDS.length.toLocaleString()}</div>
          </article>

          <article class="profile-stat">
            <div class="profile-stat-label">Hours Played</div>
            <div class="profile-stat-value">${profile.totalHoursPlayed.toLocaleString()}</div>
            <div class="profile-stat-footnote">Presentation profile total</div>
          </article>
        </section>

        <section class="profile-grid">
          <article class="profile-card profile-card-wide">
            <div class="profile-section-title">Bio</div>
            <p class="profile-bio">${escapeHtml(profile.bio)}</p>
          </article>

          <article class="profile-card">
            <div class="profile-section-title">Date Joined</div>
            <div class="profile-detail-value">${escapeHtml(profile.dateJoined)}</div>
            <p class="profile-detail-copy">Front-end presentation data.</p>
          </article>

          <article class="profile-card">
            <div class="profile-section-title">Visibility</div>
            <div class="profile-detail-value">${escapeHtml(VISIBILITY_LABELS[privacy.profileVisibility])}</div>
            <p class="profile-detail-copy">Friends list: ${escapeHtml(VISIBILITY_LABELS[privacy.friendsListVisibility])}</p>
          </article>

          <article class="profile-card">
            <div class="profile-section-title">Wishlist</div>
            <ul class="profile-list">${wishlistHtml}</ul>
          </article>

          <article class="profile-card profile-card-wide">
            <div class="profile-section-title">Recent Activity</div>
            <ul class="profile-list">${activityHtml}</ul>
          </article>

          <article class="profile-card">
            <div class="profile-section-title">Notes</div>
            <ul class="profile-list">${commentsHtml}</ul>
          </article>

          <article class="profile-card">
            <div class="profile-section-title">Achievements</div>
            <ul class="profile-list">${achievementsHtml}</ul>
          </article>
        </section>
      </div>
    `,
    "profile-panel"
  );

  const profileLibraryBtn = document.getElementById("profile-library-btn") as HTMLButtonElement | null;
  const profileSettingsBtn = document.getElementById("profile-settings-btn") as HTMLButtonElement | null;

  profileLibraryBtn?.addEventListener("click", () => renderLibraryPage());
  profileSettingsBtn?.addEventListener("click", () => renderSettingsPage());
}

function renderSignInPage() {
  currentView = "signin";
  setActiveNav("signin");
  setDrawerOpen(false);

  renderPanel(
    "Sign in",
    `
      <form id="signin-form" class="signin-form">
        <label class="form-row">
          <span>Username</span>
          <input id="signin-username" class="form-input" name="username" autocomplete="username" required />
        </label>

        <label class="form-row">
          <span>Password</span>
          <input id="signin-password" class="form-input" name="password" type="password" autocomplete="current-password" />
        </label>

        <button id="signin-submit" class="btn signin-submit" type="submit">Sign in</button>
      </form>

      <p id="signin-status" class="signin-status">This sends user JSON to the backend.</p>
      <pre id="signin-json" class="json-output">{}</pre>
    `,
    "signin-panel"
  );

  const form = needEl<HTMLFormElement>("signin-form");
  const usernameInput = needEl<HTMLInputElement>("signin-username");
  const passwordInput = needEl<HTMLInputElement>("signin-password");
  const submitBtn = needEl<HTMLButtonElement>("signin-submit");
  const status = needEl<HTMLParagraphElement>("signin-status");
  const jsonOutput = needEl<HTMLPreElement>("signin-json");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username) {
      status.textContent = "Add a username first.";
      return;
    }

    submitBtn.disabled = true;
    status.textContent = "Sending...";

    try {
      const data = await postDemoUser(username, password);
      const consoleOutput: SignInConsoleOutput = {
        created_user_id: data.user.user_id,
        created_user: data.user,
        backend_response: data.created,
        users: data.users,
      };

      localStorage.setItem("currentUser", JSON.stringify(data.user));
      status.textContent = `Signed in as ${data.user.username}. User id: ${data.user.user_id}.`;
      jsonOutput.textContent = JSON.stringify(consoleOutput, null, 2);
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : "Sign in failed.";
    } finally {
      submitBtn.disabled = false;
    }
  });
}

function renderLibraryPage() {
  currentView = "library";
  setActiveNav("library");
  setDrawerOpen(false);

  const libraryItems = getLibraryListings();

  renderPanel(
    "Your Library",
    `
      <div class="page-stack">
        <div class="hero-banner compact-banner">
          <div>
            <div class="hero-kicker">Mock library</div>
            <h2 class="hero-title">A filled-out library page for the presentation build.</h2>
            <p class="hero-copy">This collection is front-end only, but it behaves enough like a real library to support the walkthrough.</p>
          </div>

          <div class="hero-chip-row">
            <span class="badge">${libraryItems.length} saved games</span>
            <span class="badge">${FRIENDS.length} friends</span>
            <span class="badge">${escapeHtml(VISIBILITY_LABELS[demoState.privacy.profileVisibility])}</span>
          </div>
        </div>

        ${
          libraryItems.length > 0
            ? `
              <div class="feature-grid">
                ${libraryItems
                  .map(
                    (listing) => `
                      <article class="soft-card library-card">
                        <div class="card-top">
                          <div class="soft-card-title">${escapeHtml(listing.title)}</div>
                          <span class="card-badge">Saved</span>
                        </div>
                        <div class="soft-card-meta">${escapeHtml(listing.platform)} • Updated ${escapeHtml(listing.updated)}</div>
                        <p class="soft-card-copy">${escapeHtml(listing.description)}</p>
                        <div class="soft-card-actions">
                          <button class="btn" type="button" data-library-open="${escapeHtml(listing.id)}" data-drawer-trigger="true">Open Details</button>
                          <button class="btn" type="button" data-library-remove="${escapeHtml(listing.id)}">Remove</button>
                        </div>
                      </article>
                    `
                  )
                  .join("")}
              </div>
            `
            : `
              <div class="empty-state">
                <div class="empty-state-title">Nothing is saved yet.</div>
                <p class="empty-state-copy">Use the home page to add a few games and make the demo library look more complete.</p>
                <button id="browse-listings-btn" class="btn" type="button">Browse Listings</button>
              </div>
            `
        }
      </div>
    `,
    "library-panel"
  );

  const browseButton = document.getElementById("browse-listings-btn") as HTMLButtonElement | null;
  browseButton?.addEventListener("click", () => renderHomePage());

  document.querySelectorAll<HTMLButtonElement>("[data-library-open]").forEach((button) => {
    button.addEventListener("click", () => {
      const listingId = button.getAttribute("data-library-open");
      const listing = listingId ? findListing(listingId) : null;
      if (!listing) return;

      selectedId = listingId;
      renderDrawer(listing);
      setDrawerOpen(true);
    });
  });

  document.querySelectorAll<HTMLButtonElement>("[data-library-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      const listingId = button.getAttribute("data-library-remove");
      if (!listingId) return;
      toggleListingInLibrary(listingId);
      renderLibraryPage();
    });
  });
}

function renderFriendsPage() {
  currentView = "friends";
  setActiveNav("friends");
  setDrawerOpen(false);

  renderPanel(
    "Friends",
    `
      <div class="friends-page">
        <div class="summary-grid">
          <article class="summary-card">
            <div class="summary-label">Friends</div>
            <div class="summary-value">${FRIENDS.length.toLocaleString()}</div>
          </article>

          <article class="summary-card">
            <div class="summary-label">Friend Requests</div>
            <div class="summary-value">${demoState.privacy.allowFriendRequests ? "On" : "Off"}</div>
          </article>

          <article class="summary-card">
            <div class="summary-label">Messages</div>
            <div class="summary-value">${demoState.privacy.allowDirectMessages ? "Open" : "Friends only"}</div>
          </article>
        </div>

        <div class="split-layout">
          <section class="section-stack">
            ${FRIENDS.map(
              (friend) => `
                <article class="soft-card friend-card">
                  <div class="card-top">
                    <div>
                      <div class="soft-card-title">${escapeHtml(friend.name)}</div>
                      <div class="soft-card-meta">${escapeHtml(friend.title)}</div>
                    </div>
                    <span class="badge">${friend.libraryCount} games</span>
                  </div>
                  <p class="soft-card-copy">${escapeHtml(friend.status)}</p>
                  <div class="friend-meta-row">
                    <span class="badge">Favorite: ${escapeHtml(friend.favoriteGame)}</span>
                    <span class="badge">${escapeHtml(friend.mutualProjects)}</span>
                  </div>
                </article>
              `
            ).join("")}
          </section>

          <aside class="soft-card tool-card">
            <div class="soft-card-title">Social Snapshot</div>
            <p class="soft-card-copy">This page is filled out so the audience can see what a future friends experience could look like, even before the real social data model is wired up.</p>

            <div class="suggestion-list">
              <span class="pill-btn static-pill">Recently active</span>
              <span class="pill-btn static-pill">Privacy-aware</span>
              <span class="pill-btn static-pill">Front-end only</span>
            </div>

            <div class="helper-card">
              <div class="soft-card-meta">Presentation note</div>
              <p class="soft-card-copy">If someone asks about community features, point to the privacy controls in Settings &amp; Privacy and the realistic friend cards here.</p>
            </div>
          </aside>
        </div>
      </div>
    `,
    "friends-panel"
  );
}

function renderSettingsPage() {
  currentView = "settings";
  setActiveNav("settings");
  setDrawerOpen(false);

  renderPanel(
    "Settings & Privacy",
    `
      <div class="settings-page">
        <div class="hero-banner compact-banner">
          <div>
            <div class="hero-kicker">Accessibility controls</div>
            <h2 class="hero-title">Keep the light mode, then add realistic readability and privacy controls.</h2>
            <p class="hero-copy">Appearance settings apply site-wide. Privacy settings are mock toggles that make the profile feel more complete.</p>
          </div>
        </div>

        <div class="settings-grid">
          <article class="soft-card">
            <div class="soft-card-title">Appearance</div>
            <p class="soft-card-copy">These controls affect the whole interface on this browser.</p>

            <div class="choice-grid" role="radiogroup" aria-label="Theme selection">
              <label class="choice-card">
                <input type="radio" name="theme-choice" value="dark" ${appPreferences.theme === "dark" ? "checked" : ""} />
                <span>Dark mode</span>
              </label>
              <label class="choice-card">
                <input type="radio" name="theme-choice" value="light" ${appPreferences.theme === "light" ? "checked" : ""} />
                <span>Light mode</span>
              </label>
            </div>

            <label class="form-row settings-row">
              <span>Font size</span>
              <select id="font-size-select" class="form-input select-input">
                <option value="default" ${appPreferences.fontSize === "default" ? "selected" : ""}>Default</option>
                <option value="large" ${appPreferences.fontSize === "large" ? "selected" : ""}>Large</option>
                <option value="x-large" ${appPreferences.fontSize === "x-large" ? "selected" : ""}>Extra large</option>
              </select>
            </label>

            <label class="toggle-row">
              <div>
                <div class="toggle-title">Reduce animations</div>
                <p class="toggle-copy">Turns off most motion and keeps transitions very short.</p>
              </div>
              <input id="reduce-motion-toggle" class="toggle-input" type="checkbox" ${appPreferences.reduceMotion ? "checked" : ""} />
            </label>

            <label class="toggle-row">
              <div>
                <div class="toggle-title">High contrast</div>
                <p class="toggle-copy">Strengthens borders, labels, and color contrast across the site.</p>
              </div>
              <input id="high-contrast-toggle" class="toggle-input" type="checkbox" ${appPreferences.highContrast ? "checked" : ""} />
            </label>

            <label class="toggle-row">
              <div>
                <div class="toggle-title">Readable surfaces</div>
                <p class="toggle-copy">Adds stronger panel separation and clearer card backgrounds.</p>
              </div>
              <input id="readable-surfaces-toggle" class="toggle-input" type="checkbox" ${appPreferences.readableSurfaces ? "checked" : ""} />
            </label>
          </article>

          <article class="soft-card">
            <div class="soft-card-title">Privacy</div>
            <p class="soft-card-copy">These controls are mock privacy settings for the demo profile, saved locally in the browser.</p>

            <label class="toggle-row">
              <div>
                <div class="toggle-title">Public profile</div>
                <p class="toggle-copy">Allows the profile to appear discoverable in the presentation build.</p>
              </div>
              <input class="toggle-input" type="checkbox" data-privacy-toggle="publicProfile" ${demoState.privacy.publicProfile ? "checked" : ""} />
            </label>

            <label class="toggle-row">
              <div>
                <div class="toggle-title">Allow friend requests</div>
                <p class="toggle-copy">Lets other users connect with this profile in a future version.</p>
              </div>
              <input class="toggle-input" type="checkbox" data-privacy-toggle="allowFriendRequests" ${demoState.privacy.allowFriendRequests ? "checked" : ""} />
            </label>

            <label class="toggle-row">
              <div>
                <div class="toggle-title">Allow direct messages</div>
                <p class="toggle-copy">Keeps the settings panel realistic for future community features.</p>
              </div>
              <input class="toggle-input" type="checkbox" data-privacy-toggle="allowDirectMessages" ${demoState.privacy.allowDirectMessages ? "checked" : ""} />
            </label>

            <label class="toggle-row">
              <div>
                <div class="toggle-title">Show online status</div>
                <p class="toggle-copy">Lets the profile display active presence information.</p>
              </div>
              <input class="toggle-input" type="checkbox" data-privacy-toggle="showOnlineStatus" ${demoState.privacy.showOnlineStatus ? "checked" : ""} />
            </label>
          </article>

          <article class="soft-card">
            <div class="soft-card-title">Data Use</div>
            <p class="soft-card-copy">These toggles are presentation-only, but they read like a realistic privacy center.</p>

            <label class="toggle-row">
              <div>
                <div class="toggle-title">Allow usage analytics</div>
                <p class="toggle-copy">Tracks which pages and controls are used most often.</p>
              </div>
              <input class="toggle-input" type="checkbox" data-privacy-toggle="allowUsageAnalytics" ${demoState.privacy.allowUsageAnalytics ? "checked" : ""} />
            </label>

            <label class="toggle-row">
              <div>
                <div class="toggle-title">Allow activity tracking</div>
                <p class="toggle-copy">Uses interaction history to improve product decisions later.</p>
              </div>
              <input class="toggle-input" type="checkbox" data-privacy-toggle="allowTracking" ${demoState.privacy.allowTracking ? "checked" : ""} />
            </label>

            <label class="toggle-row">
              <div>
                <div class="toggle-title">Allow personalized recommendations</div>
                <p class="toggle-copy">Adjusts highlighted listings based on recent activity.</p>
              </div>
              <input class="toggle-input" type="checkbox" data-privacy-toggle="allowPersonalizedRecommendations" ${demoState.privacy.allowPersonalizedRecommendations ? "checked" : ""} />
            </label>

            <label class="toggle-row">
              <div>
                <div class="toggle-title">Allow third-party data sharing</div>
                <p class="toggle-copy">Presentation-only toggle for whether profile information could be sold or shared.</p>
              </div>
              <input class="toggle-input" type="checkbox" data-privacy-toggle="allowDataSale" ${demoState.privacy.allowDataSale ? "checked" : ""} />
            </label>

            <label class="form-row settings-row">
              <span>Who can see this profile?</span>
              <select class="form-input select-input" data-privacy-select="profileVisibility">
                ${Object.entries(VISIBILITY_LABELS)
                  .map(
                    ([value, label]) =>
                      `<option value="${escapeHtml(value)}" ${demoState.privacy.profileVisibility === value ? "selected" : ""}>${escapeHtml(label)}</option>`
                  )
                  .join("")}
              </select>
            </label>

            <label class="form-row settings-row">
              <span>Who can see the friends list?</span>
              <select class="form-input select-input" data-privacy-select="friendsListVisibility">
                ${Object.entries(VISIBILITY_LABELS)
                  .map(
                    ([value, label]) =>
                      `<option value="${escapeHtml(value)}" ${demoState.privacy.friendsListVisibility === value ? "selected" : ""}>${escapeHtml(label)}</option>`
                  )
                  .join("")}
              </select>
            </label>

            <label class="form-row settings-row">
              <span>Who can see recent activity?</span>
              <select class="form-input select-input" data-privacy-select="activityVisibility">
                ${Object.entries(VISIBILITY_LABELS)
                  .map(
                    ([value, label]) =>
                      `<option value="${escapeHtml(value)}" ${demoState.privacy.activityVisibility === value ? "selected" : ""}>${escapeHtml(label)}</option>`
                  )
                  .join("")}
              </select>
            </label>
          </article>
        </div>

        <p id="settings-feedback" class="settings-feedback">Changes save automatically on this browser.</p>
      </div>
    `,
    "settings-panel"
  );

  syncSettingsControls();

  document.querySelectorAll<HTMLInputElement>("input[name='theme-choice']").forEach((input) => {
    input.addEventListener("change", () => {
      if (input.checked) {
        applyTheme(input.value === "light" ? "light" : "dark");
        setSettingsFeedback("Theme updated.");
      }
    });
  });

  const fontSizeSelect = document.getElementById("font-size-select") as HTMLSelectElement | null;
  fontSizeSelect?.addEventListener("change", () => {
    const nextValue = fontSizeSelect.value;
    appPreferences.fontSize =
      nextValue === "large" || nextValue === "x-large" ? nextValue : "default";
    applyAccessibilityPreferences();
    setSettingsFeedback("Font size updated.");
  });

  const reduceMotionToggle = document.getElementById("reduce-motion-toggle") as HTMLInputElement | null;
  reduceMotionToggle?.addEventListener("change", () => {
    appPreferences.reduceMotion = reduceMotionToggle.checked;
    applyAccessibilityPreferences();
    setSettingsFeedback("Motion preference updated.");
  });

  const highContrastToggle = document.getElementById("high-contrast-toggle") as HTMLInputElement | null;
  highContrastToggle?.addEventListener("change", () => {
    appPreferences.highContrast = highContrastToggle.checked;
    applyAccessibilityPreferences();
    setSettingsFeedback("Contrast preference updated.");
  });

  const readableSurfacesToggle = document.getElementById("readable-surfaces-toggle") as HTMLInputElement | null;
  readableSurfacesToggle?.addEventListener("change", () => {
    appPreferences.readableSurfaces = readableSurfacesToggle.checked;
    applyAccessibilityPreferences();
    setSettingsFeedback("Surface readability updated.");
  });

  document.querySelectorAll<HTMLInputElement>("[data-privacy-toggle]").forEach((input) => {
    input.addEventListener("change", () => {
      const key = input.getAttribute("data-privacy-toggle") as keyof PrivacySettings | null;
      if (!key) return;

      demoState = {
        ...demoState,
        privacy: {
          ...demoState.privacy,
          [key]: input.checked,
        },
      };
      saveDemoState();
      setSettingsFeedback("Privacy setting saved.");
    });
  });

  document.querySelectorAll<HTMLSelectElement>("[data-privacy-select]").forEach((select) => {
    select.addEventListener("change", () => {
      const key = select.getAttribute("data-privacy-select") as
        | "profileVisibility"
        | "friendsListVisibility"
        | "activityVisibility"
        | null;
      const value = select.value as VisibilityOption;
      if (!key || !(value in VISIBILITY_LABELS)) return;

      demoState = {
        ...demoState,
        privacy: {
          ...demoState.privacy,
          [key]: value,
        },
      };
      saveDemoState();
      setSettingsFeedback("Visibility preference saved.");
    });
  });
}

function renderHelpPage() {
  currentView = "help";
  setActiveNav("help");
  setDrawerOpen(false);

  renderPanel(
    "Help",
    `
      <div class="help-page">
        <div class="hero-banner compact-banner">
          <div>
            <div class="hero-kicker">Frequently asked questions</div>
            <h2 class="hero-title">Short answers for likely presentation questions.</h2>
            <p class="hero-copy">This section turns the empty help page into something the audience can actually browse.</p>
          </div>
        </div>

        <div class="faq-list">
          <details class="faq-item" open>
            <summary>How do I save a game to the library?</summary>
            <p>Open any listing and click <strong>Add to Library</strong>. The library in this build is a front-end presentation library that still behaves like a real collection.</p>
          </details>

          <details class="faq-item">
            <summary>Do I need to sign in before using the site?</summary>
            <p>The sign-in page is still connected to backend work, but the rest of the interface is filled out so the presentation can stay focused on the product experience.</p>
          </details>

          <details class="faq-item">
            <summary>Where can I change the look of the site?</summary>
            <p>Open <strong>Settings &amp; Privacy</strong> to switch light and dark mode, enlarge text, reduce motion, and improve readability.</p>
          </details>

          <details class="faq-item">
            <summary>What privacy controls are available right now?</summary>
            <p>The settings page includes public profile controls, visibility selectors, friend-request toggles, and demo data-use permissions like tracking and sharing.</p>
          </details>

          <details class="faq-item">
            <summary>Is the friends page connected to a real backend?</summary>
            <p>Not yet. It is a realistic front-end mock so the presentation can show how the social side of the platform is expected to look.</p>
          </details>

          <details class="faq-item">
            <summary>What happens if I remove all games from the library?</summary>
            <p>The library page swaps to an empty state with a prompt to browse listings and add titles back in.</p>
          </details>

          <details class="faq-item">
            <summary>Why are there extra animations on the site?</summary>
            <p>The motion is there to make navigation and loading feel more intentional during the walkthrough, while the reduce-motion setting keeps it accessible.</p>
          </details>

          <details class="faq-item">
            <summary>What changed from Rudimentary Steam?</summary>
            <p>The visible branding has been updated to <strong>${APP_NAME}</strong>, and the interface now feels more like a polished product showcase than a placeholder page.</p>
          </details>
        </div>
      </div>
    `,
    "help-panel"
  );
}

function handleNavAction(action: string) {
  setMobileMenuOpen(false);

  switch (action) {
    case "home":
      renderHomePage();
      break;

    case "library":
      renderLibraryPage();
      break;

    case "friends":
      renderFriendsPage();
      break;

    case "profile":
      renderProfilePage(PLACEHOLDER_PROFILE);
      break;

    case "signin":
      renderSignInPage();
      break;

    case "settings":
      renderSettingsPage();
      break;

    case "help":
      renderHelpPage();
      break;

    case "signout":
      localStorage.removeItem("currentUser");
      renderSignInPage();
      break;
  }
}

function updateSessionUi() {
  sessionIndicator.textContent = "Front-end demo build";
  libraryBtn.textContent = "Your Library";
}

drawerClose.addEventListener("click", () => setDrawerOpen(false));

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  const clickedCard = Boolean(target.closest(".card"));
  const clickedDrawer = Boolean(target.closest("#drawer"));
  const clickedMenu = Boolean(target.closest("#mobile-menu"));
  const clickedBurger = Boolean(target.closest("#burger-btn"));
  const clickedDrawerTrigger = Boolean(target.closest("[data-drawer-trigger='true']"));

  if (clickedMenu || clickedBurger || clickedDrawerTrigger) return;
  if (!clickedCard && !clickedDrawer) setDrawerOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setDrawerOpen(false);
    setMobileMenuOpen(false);
  }
});

search.addEventListener("input", applySearch);

libraryBtn.addEventListener("click", () => handleNavAction("library"));

burgerBtn.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.contains("open");
  setMobileMenuOpen(!isOpen);
});

mobileMenuClose.addEventListener("click", () => setMobileMenuOpen(false));
menuBackdrop.addEventListener("click", () => setMobileMenuOpen(false));

document.querySelectorAll<HTMLElement>("[data-nav]").forEach((el) => {
  el.addEventListener("click", (event) => {
    event.preventDefault();
    const action = el.getAttribute("data-nav");
    if (action) handleNavAction(action);
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) setMobileMenuOpen(false);
});

updateSessionUi();
initTheme();
renderHomePage();
boot();

export {
  LISTINGS,
  needEl,
  escapeHtml,
  applyTheme,
  initTheme,
  setDrawerOpen,
  renderDrawer,
  renderListings,
  applySearch,
  boot,
  setMobileMenuOpen,
  renderPanel,
  renderProfilePage,
  renderSignInPage,
  postDemoUser,
  handleNavAction,
};

export type { Listing };
