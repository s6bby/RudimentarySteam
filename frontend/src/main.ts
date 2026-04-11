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
  achievements: {
    title: string;
    description: string;
  }[];
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

const PLACEHOLDER_PROFILE: Profile = {
  name: "Student Player",
  title: "Testing games and leaving notes",
  bio: "This is where my bio will go. For now, this page is using fake profile data so the layout can be tested.",
  status: "Working on profile features",
  favoriteGame: "Bullet Hell",
  dateJoined: "March 12, 2024",
  level: 18,
  totalHoursPlayed: 412,
  comments: [
    "The launcher page is easier to use now.",
    "I want to add update notes to each game later.",
    "The profile page still needs real account data.",
  ],
  wishlist: [
    "Doom Clone",
    "Clicker Game",
    "File Checker",
  ],
  recentActivity: [
    "Played Bullet Hell",
    "Added Doom Clone to wishlist",
    "Left feedback on the launcher layout",
  ],
  achievements: [
    {
      title: "First Download",
      description: "Downloaded the first game on the platform.",
    },
    {
      title: "Patch Watcher",
      description: "Checked a few update notes in one week.",
    },
    {
      title: "Community Voice",
      description: "Left feedback for a future feature.",
    },
  ],
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

type Theme = "dark" | "light";

function applyTheme(theme: Theme) {
  document.body.classList.remove("theme-dark", "theme-light");
  document.body.classList.add(theme === "dark" ? "theme-dark" : "theme-light");
  localStorage.setItem("theme", theme);

  const btn = document.getElementById("theme-toggle") as HTMLButtonElement | null;
  if (btn) {
    if (theme === "dark") {
      btn.textContent = "Light";
      btn.setAttribute("aria-label", "Switch to light theme");
      btn.title = "Switch to light theme";
    } else {
      btn.textContent = "Dark";
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

const grid = needEl<HTMLDivElement>("listing-grid");
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

const layoutCenter = document.querySelector(".layout-center") as HTMLElement;

let selectedId: string | null = null;

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
      <div class="card-meta">${escapeHtml(l.author)} - v${escapeHtml(l.version)} - ${escapeHtml(
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

function renderProfilePage(profile: Profile) {
  setDrawerOpen(false);

  const initials = profile.name
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

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

  layoutCenter.innerHTML = `
    <section class="panel center-panel profile-panel">
      <div class="panel-title">My Profile</div>

      <div class="page-body profile-page">
        <section class="profile-hero">
          <div class="profile-avatar" aria-hidden="true">${escapeHtml(initials)}</div>

          <div class="profile-hero-copy">
            <div class="profile-kicker">Demo Account</div>
            <h2 class="profile-name">${escapeHtml(profile.name)}</h2>
            <p class="profile-role">${escapeHtml(profile.title)}</p>

            <div class="profile-meta">
              <span>${escapeHtml(profile.status)}</span>
              <span>Favorite game: ${escapeHtml(profile.favoriteGame)}</span>
            </div>

            <div class="profile-actions">
              <button class="btn profile-action-btn" id="edit-bio-btn" type="button">Edit Bio</button>
              <button class="btn profile-action-btn" id="edit-avatar-btn" type="button">Change Avatar</button>
            </div>
          </div>
        </section>

        <section class="profile-stats" aria-label="Profile stats">
          <article class="profile-stat">
            <div class="profile-stat-label">Level</div>
            <div class="profile-stat-value">${profile.level.toLocaleString()}</div>
          </article>

          <article class="profile-stat">
            <div class="profile-stat-label">Comments</div>
            <div class="profile-stat-value">${profile.comments.length.toLocaleString()}</div>
          </article>

          <article class="profile-stat">
            <div class="profile-stat-label">Achievements</div>
            <div class="profile-stat-value">${profile.achievements.length.toLocaleString()}</div>
          </article>

          <article class="profile-stat">
            <div class="profile-stat-label">Hours Played</div>
            <div class="profile-stat-value">${profile.totalHoursPlayed.toLocaleString()}</div>
            <div class="profile-stat-footnote">Platform total</div>
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
            <p class="profile-detail-copy">This is fake data until accounts are connected.</p>
          </article>

          <article class="profile-card">
            <div class="profile-section-title">Favorite Game</div>
            <div class="profile-detail-value">${escapeHtml(profile.favoriteGame)}</div>
            <p class="profile-detail-copy">A simple field that could come from user settings later.</p>
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
            <div class="profile-section-title">Comments</div>
            <ul class="profile-list">${commentsHtml}</ul>
          </article>

          <article class="profile-card">
            <div class="profile-section-title">Achievements</div>
            <ul class="profile-list">${achievementsHtml}</ul>
          </article>
        </section>
      </div>
    </section>
  `;

  const editBioBtn = document.getElementById("edit-bio-btn") as HTMLButtonElement | null;
  const editAvatarBtn = document.getElementById("edit-avatar-btn") as HTMLButtonElement | null;

  editBioBtn?.addEventListener("click", () => alert("Edit bio is not connected yet."));
  editAvatarBtn?.addEventListener("click", () => alert("Avatar upload is not connected yet."));
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
      renderProfilePage(PLACEHOLDER_PROFILE);
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

drawerClose.addEventListener("click", () => setDrawerOpen(false));

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  const clickedCard = !!target.closest(".card");
  const clickedDrawer = !!target.closest("#drawer");
  const clickedMenu = !!target.closest("#mobile-menu");
  const clickedBurger = !!target.closest("#burger-btn");

  if (clickedMenu || clickedBurger) return;
  if (!clickedCard && !clickedDrawer) setDrawerOpen(false);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
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
  el.addEventListener("click", (ev) => {
    ev.preventDefault();
    const action = el.getAttribute("data-nav");
    if (action) handleNavAction(action);
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) setMobileMenuOpen(false);
});

initTheme();
boot();
applySearch();

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
  renderPage,
  renderProfilePage,
  handleNavAction,
};

export type { Listing };
