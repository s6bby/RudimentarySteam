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
];

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

// -----------------------------
// theme toggle (NEW)
// -----------------------------
type Theme = "dark" | "light";

function applyTheme(theme: Theme) {
  // default is dark (no class needed), but we keep it explicit for clarity
  document.body.classList.remove("theme-dark", "theme-light");
  document.body.classList.add(theme === "dark" ? "theme-dark" : "theme-light");
  localStorage.setItem("theme", theme);

  const btn = document.getElementById("theme-toggle") as HTMLButtonElement | null;
  if (btn) {
    if (theme === "dark") {
      btn.textContent = "🌙";
      btn.setAttribute("aria-label", "Switch to light theme");
      btn.title = "Switch to light theme";
    } else {
      btn.textContent = "☀️";
      btn.setAttribute("aria-label", "Switch to dark theme");
      btn.title = "Switch to dark theme";
    }
  }
}

function initTheme() {
  const saved = localStorage.getItem("theme");
  const theme: Theme = saved === "light" ? "light" : "dark";
  applyTheme(theme);

  const toggleBtn = document.getElementById("theme-toggle") as HTMLButtonElement | null;
  toggleBtn?.addEventListener("click", () => {
    const isLight = document.body.classList.contains("theme-light");
    applyTheme(isLight ? "dark" : "light");
  });
}

// main ui
const grid = needEl<HTMLDivElement>("listing-grid");
const drawer = needEl<HTMLElement>("drawer");
const drawerContent = needEl<HTMLDivElement>("drawer-content");
const drawerClose = needEl<HTMLButtonElement>("drawer-close");

const loading = needEl<HTMLDivElement>("loading-screen");
const bar = needEl<HTMLDivElement>("loading-bar-fill");
const app = needEl<HTMLDivElement>("app");

const search = needEl<HTMLInputElement>("search");
const libraryBtn = needEl<HTMLButtonElement>("library-btn");

// mobile menu
const burgerBtn = needEl<HTMLButtonElement>("burger-btn");
const mobileMenu = needEl<HTMLElement>("mobile-menu");
const mobileMenuClose = needEl<HTMLButtonElement>("mobile-menu-close");
const menuBackdrop = needEl<HTMLElement>("menu-backdrop");

// content container
const layoutCenter = document.querySelector(".layout-center") as HTMLElement;

let selectedId: string | null = null;

// drawer open/close
function setDrawerOpen(open: boolean) {
  if (open) {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
  } else {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
  }
}

function renderDrawer(l: Listing) {
  drawerContent.innerHTML = `
    <h3>${escapeHtml(l.title)}</h3>
    <p>${escapeHtml(l.description)}</p>

    <div class="detail-row"><span>Author</span><span>${escapeHtml(l.author)}</span></div>
    <div class="detail-row"><span>Version</span><span>${escapeHtml(l.version)}</span></div>
    <div class="detail-row"><span>Platform</span><span>${escapeHtml(l.platform)}</span></div>
    <div class="detail-row"><span>Downloads</span><span>${l.downloads.toLocaleString()}</span></div>
    <div class="detail-row"><span>Updated</span><span>${escapeHtml(l.updated)}</span></div>

    <div class="drawer-actions">
      <button class="btn" id="btn-view" type="button">View</button>
      <button class="btn" id="btn-download" type="button">Download</button>
    </div>
  `;

  const viewBtn = document.getElementById("btn-view") as HTMLButtonElement | null;
  const dlBtn = document.getElementById("btn-download") as HTMLButtonElement | null;

  viewBtn?.addEventListener("click", () => alert(`view: ${l.title} (placeholder)`));
  dlBtn?.addEventListener("click", () => alert(`download: ${l.title} (not implemented yet)`));
}

function renderListings(items: Listing[]) {
  grid.innerHTML = "";

  for (const l of items) {
    const card = document.createElement("div");
    card.className = "card";
    if (l.id === selectedId) card.classList.add("selected");

    card.innerHTML = `
      <div class="card-title">${escapeHtml(l.title)}</div>
      <div class="card-meta">${escapeHtml(l.author)} • v${escapeHtml(l.version)} • ${escapeHtml(
      l.platform
    )}</div>
    `;

    card.addEventListener("click", () => {
      selectedId = l.id;
      renderListings(items);
      renderDrawer(l);
      setDrawerOpen(true);
    });

    grid.appendChild(card);
  }
}

function applySearch() {
  const q = search.value.trim().toLowerCase();

  const filtered = LISTINGS.filter((l) => {
    return (
      l.title.toLowerCase().includes(q) ||
      l.author.toLowerCase().includes(q) ||
      l.platform.toLowerCase().includes(q)
    );
  });

  if (selectedId && !filtered.some((x) => x.id === selectedId)) {
    selectedId = null;
    setDrawerOpen(false);
    drawerContent.textContent = "click a listing to see details";
  }

  renderListings(filtered);
}

// loading screen
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

// mobile menu open/close
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

// simple page templates
function renderPage(title: string, content: string) {
  setDrawerOpen(false);

  layoutCenter.innerHTML = `
    <section class="panel center-panel">
      <div class="panel-title">${escapeHtml(title)}</div>
      <div class="page-body">
        ${content}
      </div>
    </section>
  `;
}

function handleNavAction(action: string) {
  setMobileMenuOpen(false);

  switch (action) {
    case "home":
      window.location.href = "/";
      break;

    case "library":
      renderPage(
        "Your Library",
        `
          <p>This is your library.</p>
          <p>Downloaded software will appear here later.</p>
        `
      );
      break;

    case "friends":
      renderPage(
        "Friends",
        `
          <p>Your friends list will appear here.</p>
          <p>Social stuff coming soon.</p>
        `
      );
      break;

    case "profile":
      renderPage(
        "My Profile",
        `
          <p>User profile info goes here.</p>
          <p>Username, avatar, stats, etc.</p>
        `
      );
      break;

    case "settings":
      renderPage(
        "Settings & Privacy",
        `
          <p>Account settings and privacy controls.</p>
          <p>Theme, notifications, security options.</p>
        `
      );
      break;

    case "help":
      renderPage(
        "Help",
        `
          <p>Need help?</p>
          <p>FAQ and support options will go here.</p>
        `
      );
      break;

    case "signout":
      alert("Signed out (placeholder)");
      break;
  }
}

// drawer close
drawerClose.addEventListener("click", () => setDrawerOpen(false));

// click outside closes drawer (not menu)
document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  const clickedCard = !!target.closest(".card");
  const clickedDrawer = !!target.closest("#drawer");
  const clickedMenu = !!target.closest("#mobile-menu");
  const clickedBurger = !!target.closest("#burger-btn");

  if (clickedMenu || clickedBurger) return;
  if (!clickedCard && !clickedDrawer) setDrawerOpen(false);
});

// esc closes stuff
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    setDrawerOpen(false);
    setMobileMenuOpen(false);
  }
});

// search
search.addEventListener("input", applySearch);

// header library button
libraryBtn.addEventListener("click", () => handleNavAction("library"));

// burger open/close
burgerBtn.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.contains("open");
  setMobileMenuOpen(!isOpen);
});

mobileMenuClose.addEventListener("click", () => setMobileMenuOpen(false));
menuBackdrop.addEventListener("click", () => setMobileMenuOpen(false));

// nav clicks (desktop + mobile)
document.querySelectorAll<HTMLElement>("[data-nav]").forEach((el) => {
  el.addEventListener("click", (ev) => {
    ev.preventDefault();
    const action = el.getAttribute("data-nav");
    if (action) handleNavAction(action);
  });
});

// resize cleanup
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) setMobileMenuOpen(false);
});

// startup
initTheme(); // (NEW) set theme before showing UI
boot();
applySearch();