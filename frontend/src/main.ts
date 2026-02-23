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

function getEl<T extends HTMLElement>(id: string): T {
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

const grid = getEl<HTMLDivElement>("listing-grid");
const drawer = getEl<HTMLElement>("drawer");
const drawerContent = getEl<HTMLDivElement>("drawer-content");
const drawerClose = getEl<HTMLButtonElement>("drawer-close");

const loading = getEl<HTMLDivElement>("loading-screen");
const bar = getEl<HTMLDivElement>("loading-bar-fill");
const app = getEl<HTMLDivElement>("app");

const search = getEl<HTMLInputElement>("search");
const libraryBtn = getEl<HTMLButtonElement>("library-btn");

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
      <button class="btn" id="btn-view">View</button>
      <button class="btn" id="btn-download">Download</button>
    </div>
  `;

  const viewBtn = document.getElementById("btn-view") as HTMLButtonElement | null;
  const dlBtn = document.getElementById("btn-download") as HTMLButtonElement | null;

  viewBtn?.addEventListener("click", () => {
    alert(`view: ${l.title} (placeholder)`);
  });

  dlBtn?.addEventListener("click", () => {
    alert(`download: ${l.title} (not implemented yet)`);
  });
}

function renderListings(items: Listing[]) {
  grid.innerHTML = "";

  for (const l of items) {
    const card = document.createElement("div");
    card.className = "card";

    if (l.id === selectedId) {
      card.classList.add("selected");
    }

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

/* drawer close */
drawerClose.addEventListener("click", () => {
  setDrawerOpen(false);
});

/* click outside closes drawer */
document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const clickedCard = !!target.closest(".card");
  const clickedDrawer = !!target.closest("#drawer");

  if (!clickedCard && !clickedDrawer) {
    setDrawerOpen(false);
  }
});

/* esc closes drawer */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setDrawerOpen(false);
});

/* search */
search.addEventListener("input", applySearch);

/* library button */
libraryBtn.addEventListener("click", () => {
  alert("library (placeholder)");
});

/* start */
boot();
applySearch();
