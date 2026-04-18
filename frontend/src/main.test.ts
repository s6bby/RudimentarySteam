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

  it("covers both dark and light branches of applyTheme", async () => {
    const app = await import("./main");
    const btn = document.getElementById("theme-toggle") as HTMLButtonElement;

    app.applyTheme("dark");
    expect(document.body.classList.contains("theme-dark")).toBe(true);
    expect(document.body.classList.contains("theme-light")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(btn.textContent).toBe("Light");
    expect(btn.getAttribute("aria-label")).toBe("Switch to light theme");

    app.applyTheme("light");
    expect(document.body.classList.contains("theme-light")).toBe(true);
    expect(document.body.classList.contains("theme-dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
    expect(btn.textContent).toBe("Dark");
    expect(btn.getAttribute("aria-label")).toBe("Switch to dark theme");
  });

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
    expect(layoutCenter.textContent).toContain("Demo Account");
    expect(layoutCenter.textContent).toContain("Bio");
    expect(layoutCenter.textContent).toContain("Date Joined");
    expect(layoutCenter.textContent).toContain("Level");
    expect(layoutCenter.textContent).toContain("Comments");
    expect(layoutCenter.textContent).toContain("Achievements");
    expect(layoutCenter.textContent).toContain("Hours Played");
    expect(layoutCenter.textContent).toContain("March 12, 2024");
    expect(layoutCenter.textContent).toContain("Student Player");
    expect(layoutCenter.textContent).toContain("Working on profile features");
    expect(layoutCenter.textContent).toContain("Favorite Game");
    expect(layoutCenter.textContent).toContain("Wishlist");
    expect(layoutCenter.textContent).toContain("Recent Activity");

    const editBioButton = document.getElementById("edit-bio-btn") as HTMLButtonElement;
    editBioButton.click();

    expect(alert).toHaveBeenCalledWith("Edit bio is not connected yet.");
  });

  it("submits the sign in page to the backend user endpoint", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 1 }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [[1, "seb", "seb@rudimentary.local", "demo"]],
      });
    vi.stubGlobal("fetch", fetchMock);

    const app = await import("./main");
    const layoutCenter = document.querySelector(".layout-center") as HTMLElement;

    app.renderSignInPage();

    const username = document.getElementById("signin-username") as HTMLInputElement;
    const password = document.getElementById("signin-password") as HTMLInputElement;
    const form = document.getElementById("signin-form") as HTMLFormElement;

    username.value = "seb";
    password.value = "demo";
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

    await vi.waitFor(() => {
      expect(layoutCenter.textContent).toContain("Signed in as seb.");
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "http://127.0.0.1:5000/api/user",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          username: "seb",
          email: "seb@rudimentary.local",
          hashed_password: "demo",
        }),
      })
    );
    expect(fetchMock).toHaveBeenCalledWith("http://127.0.0.1:5000/api/users");
    expect(localStorage.getItem("currentUser")).toContain('"username":"seb"');
    expect(layoutCenter.textContent).toContain('"users"');
  });
});
