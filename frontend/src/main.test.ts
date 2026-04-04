// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";

function setupDom() {
  document.body.innerHTML = `
    <button id="theme-toggle"></button>

    <div id="listing-grid"></div>
    <aside id="drawer" aria-hidden="true"></aside>
    <div id="drawer-content">click a listing to see details</div>
    <button id="drawer-close"></button>

    <div id="loading-screen"></div>
    <div id="loading-bar-fill"></div>
    <div id="app"></div>

    <input id="search" />
    <button id="library-btn"></button>

    <button id="burger-btn" aria-expanded="false"></button>
    <nav id="mobile-menu" aria-hidden="true"></nav>
    <button id="mobile-menu-close"></button>
    <div id="menu-backdrop" aria-hidden="true"></div>

    <div class="layout-center"></div>
  `;
}

describe("testing suite for rudimentary steam", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
    vi.stubGlobal("alert", vi.fn());
    localStorage.clear();
    setupDom();
  });

  // black box unit test
  // requirement that is being tested:
  // the search feature filters listings by text the user types
  // without needing to know how the filtering is implemented internally
  it("filters listings correctly based on user search input", async () => {
    const app = await import("./main");
    const search = document.getElementById("search") as HTMLInputElement;
    const grid = document.getElementById("listing-grid") as HTMLDivElement;

    search.value = "doom";
    app.applySearch();

    let cards = grid.querySelectorAll(".card");
    expect(cards.length).toBe(1);
    expect(cards[0].textContent).toContain("Doom Clone");

    search.value = "linux";
    app.applySearch();

    cards = grid.querySelectorAll(".card");
    expect(cards.length).toBe(2);
    expect(grid.textContent).toContain("Doom Clone");
    expect(grid.textContent).toContain("File Checker");

    search.value = "backend dev";
    app.applySearch();

    cards = grid.querySelectorAll(".card");
    expect(cards.length).toBe(4);
  });

  // white box unit test
  // coverage kind provided:
  // 100% branch coverage for the branch inside applyTheme
  //
  // what is being tested:
  // function applyTheme(theme: Theme) {
  //   document.body.classList.remove("theme-dark", "theme-light");
  //   document.body.classList.add(theme === "dark" ? "theme-dark" : "theme-light");
  //   localStorage.setItem("theme", theme);
  //
  //   const btn = document.getElementById("theme-toggle") as HTMLButtonElement | null;
  //   if (btn) {
  //     if (theme === "dark") {
  //       btn.textContent = "🌙";
  //       btn.setAttribute("aria-label", "Switch to light theme");
  //       btn.title = "Switch to light theme";
  //     } else {
  //       btn.textContent = "☀️";
  //       btn.setAttribute("aria-label", "Switch to dark theme");
  //       btn.title = "Switch to dark theme";
  //     }
  //   }
  // }
  it("covers both dark and light branches of applyTheme", async () => {
    const app = await import("./main");
    const btn = document.getElementById("theme-toggle") as HTMLButtonElement;

    app.applyTheme("dark");
    expect(document.body.classList.contains("theme-dark")).toBe(true);
    expect(document.body.classList.contains("theme-light")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(btn.textContent).toBe("🌙");
    expect(btn.getAttribute("aria-label")).toBe("Switch to light theme");

    app.applyTheme("light");
    expect(document.body.classList.contains("theme-light")).toBe(true);
    expect(document.body.classList.contains("theme-dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
    expect(btn.textContent).toBe("☀️");
    expect(btn.getAttribute("aria-label")).toBe("Switch to dark theme");
  });

  // integration test
  // units being tested together:
  // applySearch + renderListings + renderDrawer + setDrawerOpen
  it("search results, card selection, drawer rendering, and drawer closing work together", async () => {
    const app = await import("./main");

    const search = document.getElementById("search") as HTMLInputElement;
    const grid = document.getElementById("listing-grid") as HTMLDivElement;
    const drawer = document.getElementById("drawer") as HTMLElement;
    const drawerContent = document.getElementById("drawer-content") as HTMLDivElement;

    search.value = "doom";
    app.applySearch();

    const cards = grid.querySelectorAll(".card");
    expect(cards.length).toBe(1);
    expect(cards[0].textContent).toContain("Doom Clone");

    (cards[0] as HTMLElement).click();

    expect(drawer.classList.contains("open")).toBe(true);
    expect(drawer.getAttribute("aria-hidden")).toBe("false");
    expect(drawerContent.textContent).toContain("Fight some demons.");
    expect(drawerContent.textContent).toContain("Backend dev");

    search.value = "zzzz";
    app.applySearch();

    expect(grid.querySelectorAll(".card").length).toBe(0);
    expect(drawer.classList.contains("open")).toBe(false);
    expect(drawerContent.textContent).toBe("click a listing to see details");
  });

  it("renders the placeholder profile with the requested user fields", async () => {
    const app = await import("./main");
    const layoutCenter = document.querySelector(".layout-center") as HTMLElement;

    app.handleNavAction("profile");

    expect(layoutCenter.textContent).toContain("My Profile");
    expect(layoutCenter.textContent).toContain("Placeholder User");
    expect(layoutCenter.textContent).toContain("Bio");
    expect(layoutCenter.textContent).toContain("Date Joined");
    expect(layoutCenter.textContent).toContain("Level");
    expect(layoutCenter.textContent).toContain("Comments");
    expect(layoutCenter.textContent).toContain("Achievements");
    expect(layoutCenter.textContent).toContain("Hours Played");
    expect(layoutCenter.textContent).toContain("March 12, 2024");
    expect(layoutCenter.textContent).toContain("Placeholder Name");
  });
});
