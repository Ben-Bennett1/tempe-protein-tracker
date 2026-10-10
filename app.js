(function () {
  "use strict";

  const KEY = "tempe-protein-tracker:v2";
  const OLD_KEY = "tempe-protein-tracker:v1";
  const $ = (id) => document.getElementById(id);

  // ---------- data ----------
  const ITEMS = [];
  const BY_ID = {};
  window.RESTAURANTS.forEach((r) => r.items.forEach((i) => {
    const full = Object.assign({}, i, { place: r.name, placeId: r.id, emoji: r.emoji, color: r.color, value: i.protein / i.price });
    ITEMS.push(full);
    BY_ID[i.id] = full;
  }));

  // ---------- state ----------
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s && typeof s === "object") return Object.assign({ settings: {}, days: {}, favorites: [] }, s);
      const old = JSON.parse(localStorage.getItem(OLD_KEY)); // carry over v1 logs
      if (old && old.days) return { settings: Object.assign({ onboarded: true }, old.settings), days: old.days, favorites: [] };
    } catch (e) { /* storage unavailable or corrupt */ }
    return { settings: {}, days: {}, favorites: [] };
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }
  const state = load();

  const pad = (n) => String(n).padStart(2, "0");
  const dayKey = (d) => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  const today = () => dayKey(new Date());
  const entries = (k) => state.days[k] || [];
  const sum = (list, f) => list.reduce((a, e) => a + (e[f] || 0), 0);
  const money = (n) => "$" + (n >= 100 ? Math.round(n) : n.toFixed(n % 1 ? 2 : 0));
  const round1 = (n) => Math.round(n * 10) / 10;

  function goalFor(s) {
    if (s.manual > 0) return Math.round(s.manual);
    if (s.weight > 0) return Math.round(s.weight * (s.factor || 0.8));
    return 120;
  }
  const goal = () => goalFor(state.settings);

  // ---------- helpers ----------
  function el(tag, attrs, children) {
    const n = document.createElement(tag);
    for (const [a, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (a === "text") n.textContent = v;
      else if (a === "html") n.innerHTML = v;
      else if (a.startsWith("on")) n.addEventListener(a.slice(2), v);
      else n.setAttribute(a, v);
    }
    (children || []).forEach((c) => c != null && n.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
    return n;
  }
  const badge = (emoji, color) => el("span", { class: "badge", style: color ? "background:" + color : null, text: emoji || "🍽️" });

  // ---------- logging ----------
  let undo = null;
  function logEntry(e) {
    const k = today();
    const entry = Object.assign({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), time: new Date().toISOString() }, e);
    (state.days[k] = state.days[k] || []).push(entry);
    save();
    renderAll();
    toast("+" + entry.protein + " g · " + entry.name, () => removeEntry(entry.id, true));
  }
  function logItem(item, servings) {
    servings = servings || 1;
    logEntry({
      itemId: item.id, name: item.name + (servings !== 1 ? " ×" + servings : ""), place: item.place,
      emoji: item.emoji, color: item.color,
      protein: Math.round(item.protein * servings), price: Math.round(item.price * servings * 100) / 100,
    });
  }
  function removeEntry(id, silent) {
    const k = today();
    const removed = entries(k).find((e) => e.id === id);
    state.days[k] = entries(k).filter((e) => e.id !== id);
    save();
    renderAll();
    if (!silent && removed) toast("Removed " + removed.name, () => {
      (state.days[k] = state.days[k] || []).push(removed);
      state.days[k].sort((a, b) => a.time.localeCompare(b.time));
      save(); renderAll();
    });
  }

  let toastTimer;
  function toast(msg, onUndo) {
    $("toast-msg").textContent = msg;
    undo = onUndo || null;
    $("toast-undo").hidden = !onUndo;
    const t = $("toast");
    t.hidden = true; void t.offsetWidth; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; undo = null; }, 4000);
  }
  $("toast-undo").addEventListener("click", () => {
    if (undo) undo();
    undo = null;
    $("toast").hidden = true;
  });

  // ---------- favorites & quick add ----------
  const isFav = (id) => state.favorites.includes(id);
  function toggleFav(id) {
    state.favorites = isFav(id) ? state.favorites.filter((x) => x !== id) : state.favorites.concat(id);
    save();
  }
  function quickAddList() {
    const counts = {};
    const customs = {};
    Object.values(state.days).forEach((list) => list.forEach((e) => {
      if (e.itemId && BY_ID[e.itemId]) counts[e.itemId] = (counts[e.itemId] || 0) + 1;
      else if (!e.itemId) customs[e.name] = e;
    }));
    const ids = state.favorites.filter((id) => BY_ID[id]);
    Object.keys(counts).sort((a, b) => counts[b] - counts[a]).forEach((id) => { if (!ids.includes(id)) ids.push(id); });
    const out = ids.slice(0, 8).map((id) => ({ item: BY_ID[id], fav: isFav(id) }));
    Object.values(customs).slice(-3).forEach((c) => out.push({ custom: c }));
    return out;
  }

  // ---------- TODAY ----------
  function renderToday() {
    const g = goal();
    const list = entries(today());
    const eaten = sum(list, "protein");
    const spent = sum(list, "price");
    const remaining = Math.max(0, g - eaten);
    const pct = Math.min(1, eaten / g);

    $("today-label").textContent = new Date().toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" });
    $("remaining").textContent = remaining > 0 ? remaining : "✓";
    $("remaining-label").textContent = remaining > 0 ? "g to go" : (eaten - g > 0 ? "goal hit · +" + (eaten - g) + " g" : "goal hit");
    $("ring-fill").style.strokeDashoffset = String(326.73 * (1 - pct));
    document.querySelector(".hero").classList.toggle("done", remaining === 0);
    $("eaten").textContent = eaten + "g";
    $("target").textContent = g + "g";
    $("spent").textContent = money(spent);

    // quick add chips
    const quick = $("quick");
    quick.replaceChildren();
    const q = quickAddList();
    if (!q.length) quick.appendChild(el("p", { class: "chips-empty", text: "Your favorites and usual orders will show up here." }));
    q.forEach((x) => {
      if (x.item) {
        quick.appendChild(el("button", { class: "chip", onclick: () => logItem(x.item) }, [
          x.item.emoji + " " + (x.fav ? "★ " : "") + x.item.name + " ", el("b", { text: "+" + x.item.protein }),
        ]));
      } else {
        const c = x.custom;
        quick.appendChild(el("button", { class: "chip", onclick: () => logEntry({ name: c.name, place: "Custom", emoji: "✏️", protein: c.protein, price: c.price || 0 }) }, [
          "✏️ " + c.name + " ", el("b", { text: "+" + c.protein }),
        ]));
      }
    });

    // close the gap: cheapest items that finish the goal, else highest protein
    const gap = $("gap");
    gap.replaceChildren();
    $("gap-head").hidden = remaining === 0;
    gap.hidden = remaining === 0;
    if (remaining > 0) {
      let picks = ITEMS.filter((i) => i.protein >= remaining).sort((a, b) => a.price - b.price);
      $("gap-title").textContent = picks.length ? "Cheapest ways to finish " + remaining + " g" : "Biggest protein hits";
      if (!picks.length) picks = ITEMS.slice().sort((a, b) => b.protein - a.protein);
      picks.slice(0, 6).forEach((i) => gap.appendChild(pickCard(i)));
    }

    // log
    const log = $("log");
    log.replaceChildren();
    $("log-empty").hidden = list.length > 0;
    list.slice().reverse().forEach((e) => {
      const time = new Date(e.time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
      log.appendChild(el("li", {}, [
        badge(e.emoji, null),
        el("div", { class: "l-main" }, [
          el("div", { class: "l-name", text: e.name }),
          el("div", { class: "l-sub", text: [e.place, time, e.price ? money(e.price) : null].filter(Boolean).join(" · ") }),
        ]),
        el("span", { class: "l-g", text: e.protein + "g" }),
        el("button", { class: "del", "aria-label": "Remove " + e.name, text: "×", onclick: () => removeEntry(e.id) }),
      ]));
    });

    // streak
    const st = streak();
    $("streak").hidden = st < 2;
    $("streak").textContent = "🔥 " + st + " days";
  }

  function pickCard(i) {
    return el("button", { class: "pick", onclick: () => openSheet(i) }, [
      el("span", { class: "p-place", text: i.emoji + " " + i.place }),
      el("span", { class: "p-name", text: i.name }),
      el("span", { class: "p-meta" }, [el("span", { text: i.protein + " g" }), el("span", { text: money(i.price) })]),
    ]);
  }

  function streak() {
    const g = goal();
    const d = new Date();
    let n = 0;
    if (sum(entries(dayKey(d)), "protein") < g) d.setDate(d.getDate() - 1); // today still in progress
    while (sum(entries(dayKey(d)), "protein") >= g) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  // ---------- EAT ----------
  const FILTERS = [
    { id: "all", label: "All", test: () => true },
    { id: "fav", label: "★ Favorites", test: (i) => isFav(i.id) },
    { id: "closes", label: "Finishes my goal", test: (i) => i.protein >= Math.max(1, goal() - sum(entries(today()), "protein")) },
    { id: "chicken", label: "🍗 Chicken", test: (i) => i.tags.includes("chicken") },
    { id: "beef", label: "🥩 Beef", test: (i) => i.tags.includes("beef") },
    { id: "bowl", label: "🥗 Bowls", test: (i) => i.tags.includes("bowl") || i.tags.includes("salad") },
    { id: "burger", label: "🍔 Burgers & subs", test: (i) => i.tags.includes("burger") || i.tags.includes("sandwich") },
    { id: "lean", label: "Lean", test: (i) => i.tags.includes("lean") },
    { id: "breakfast", label: "☕ Breakfast", test: (i) => i.tags.includes("breakfast") || i.tags.includes("drink") },
    { id: "cheap", label: "Under $10", test: (i) => i.price < 10 },
    { id: "big", label: "40 g+", test: (i) => i.protein >= 40 },
  ];
  let filter = "all";
  let sortMode = "value";

  function renderFilters() {
    const box = $("filters");
    box.replaceChildren();
    FILTERS.forEach((f) => box.appendChild(el("button", {
      class: "chip", "aria-pressed": String(f.id === filter), text: f.label,
      onclick: () => { filter = f.id; renderFilters(); renderResults(); },
    })));
  }

  function itemRow(i, showPlace) {
    const best = i.value >= 4.5;
    return el("button", { class: "item", onclick: () => openSheet(i) }, [
      showPlace ? badge(i.emoji, i.color) : null,
      el("div", { class: "i-main" }, [
        el("div", { class: "i-name" }, [(isFav(i.id) ? "★ " : "") + i.name, best ? el("span", { class: "value-pill", text: "great value" }) : null]),
        el("div", { class: "i-sub", text: showPlace ? i.place + " · " + i.desc : i.desc }),
      ]),
      el("div", { class: "i-nums" }, [
        el("div", { class: "i-g", text: i.protein + " g" }),
        el("div", { class: "i-v", text: money(i.price) + " · " + round1(i.value) + " g/$" }),
      ]),
      el("span", { class: "plus", "aria-hidden": "true", text: "+" }),
    ]);
  }

  function renderResults() {
    const q = $("search").value.trim().toLowerCase();
    const f = FILTERS.find((x) => x.id === filter);
    const match = ITEMS.filter((i) => f.test(i) && (!q || (i.name + " " + i.place + " " + i.desc + " " + i.tags.join(" ")).toLowerCase().includes(q)));
    const box = $("results");
    box.replaceChildren();
    box.className = sortMode === "places" ? "" : "results-flat";
    if (!match.length) {
      box.appendChild(el("div", { class: "empty" }, [
        el("p", { text: "Nothing matches. You can log anything from the Goal tab." }),
        el("button", { class: "btn ghost", text: "Add a custom meal", onclick: () => go("me") }),
      ]));
      return;
    }
    if (sortMode === "places") {
      window.RESTAURANTS.forEach((r) => {
        const items = match.filter((i) => i.placeId === r.id);
        if (!items.length) return;
        box.appendChild(el("div", { class: "card place" }, [
          el("div", { class: "place-head" }, [badge(r.emoji, r.color), el("div", {}, [el("h3", { text: r.name }), el("p", { text: r.area })])]),
          el("div", { class: "items" }, items.map((i) => itemRow(i, false))),
        ]));
      });
    } else {
      const cmp = { value: (a, b) => b.value - a.value, protein: (a, b) => b.protein - a.protein, price: (a, b) => a.price - b.price }[sortMode];
      match.slice().sort(cmp).forEach((i) => box.appendChild(itemRow(i, true)));
    }
  }

  $("search").addEventListener("input", renderResults);
  $("sort").addEventListener("click", (ev) => {
    const b = ev.target.closest("button[data-sort]");
    if (!b) return;
    sortMode = b.dataset.sort;
    $("sort").querySelectorAll("button").forEach((x) => x.setAttribute("aria-selected", String(x === b)));
    renderResults();
  });

  // ---------- item sheet ----------
  let sheetItem = null;
  let qty = 1;
  function openSheet(i) {
    sheetItem = i;
    qty = 1;
    $("sheet-place").textContent = i.emoji + " " + i.place;
    $("sheet-title").textContent = i.name;
    $("sheet-desc").textContent = i.desc + " · estimated";
    updateSheet();
    $("scrim").hidden = false;
    $("sheet").hidden = false;
    $("sheet-add").focus({ preventScroll: true });
  }
  function updateSheet() {
    const i = sheetItem;
    const p = Math.round(i.protein * qty);
    $("qty").textContent = qty;
    $("sheet-protein").textContent = p + " g";
    $("sheet-price").textContent = money(i.price * qty);
    $("sheet-value").textContent = round1(i.value);
    const left = goal() - sum(entries(today()), "protein");
    $("sheet-impact").innerHTML = left <= 0
      ? "You've already hit today's goal."
      : p >= left ? "Finishes your goal" + (p > left ? ", with <strong>" + (p - left) + " g</strong> to spare." : " exactly.")
      : "Covers <strong>" + p + "</strong> of your <strong>" + left + " g</strong> left.";
    $("sheet-fav").setAttribute("aria-pressed", String(isFav(i.id)));
    $("sheet-fav").textContent = isFav(i.id) ? "♥" : "♡";
  }
  function closeSheets() {
    $("scrim").hidden = true;
    $("sheet").hidden = true;
    if (state.settings.onboarded) $("onboard").hidden = true;
  }
  $("qty-minus").addEventListener("click", () => { qty = Math.max(0.5, qty - 0.5); updateSheet(); });
  $("qty-plus").addEventListener("click", () => { qty = Math.min(5, qty + 0.5); updateSheet(); });
  $("sheet-fav").addEventListener("click", () => { toggleFav(sheetItem.id); updateSheet(); renderAll(); });
  $("sheet-add").addEventListener("click", () => { const i = sheetItem; closeSheets(); logItem(i, qty); });
  $("scrim").addEventListener("click", closeSheets);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSheets(); });

  // ---------- HISTORY ----------
  let weekOffset = 0;
  let selDay = null;
  function weekDays() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7) + weekOffset * 7); // Monday
    return Array.from({ length: 7 }, (_, n) => { const d = new Date(start); d.setDate(start.getDate() + n); return d; });
  }
  function renderHistory() {
    const days = weekDays();
    const g = goal();
    const tKey = today();
    const data = days.map((d) => { const list = entries(dayKey(d)); return { d, key: dayKey(d), g: sum(list, "protein"), spent: sum(list, "price"), list }; });
    const fmt = (d) => d.toLocaleDateString([], { month: "short", day: "numeric" });
    $("week-label").textContent = weekOffset === 0 ? "This week" : fmt(days[0]) + " – " + fmt(days[6]);
    $("week-next").disabled = weekOffset >= 0;

    const W = 340, H = 200, top = 22, bottom = 34, left = 4, right = 4;
    const max = Math.max(g * 1.15, ...data.map((x) => x.g)) || 1;
    const y = (v) => top + (H - top - bottom) * (1 - v / max);
    const slot = (W - left - right) / 7;
    const bw = Math.min(30, slot * 0.56);
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Protein per day this week versus a " + g + " gram goal");
    const add = (tag, attrs, text) => {
      const n = document.createElementNS(ns, tag);
      for (const [a, v] of Object.entries(attrs)) n.setAttribute(a, v);
      if (text != null) n.textContent = text;
      svg.appendChild(n);
      return n;
    };
    add("line", { class: "grid", x1: 0, x2: W, y1: y(0), y2: y(0) });
    data.forEach((x, n) => {
      const cx = left + slot * n + slot / 2;
      const h = y(0) - y(x.g);
      if (x.g > 0) {
        const r = Math.min(4, h, bw / 2);
        const x0 = cx - bw / 2, y0 = y(x.g), y1 = y(0);
        add("path", {
          class: "bar" + (x.g < g ? " under" : "") + (selDay === x.key ? " sel" : ""),
          d: `M${x0},${y1}V${y0 + r}Q${x0},${y0} ${x0 + r},${y0}H${x0 + bw - r}Q${x0 + bw},${y0} ${x0 + bw},${y0 + r}V${y1}Z`,
        });
      }
      if (selDay === x.key && x.g > 0) add("text", { class: "val", x: cx, y: y(x.g) - 6 }, x.g);
      add("text", { class: "day" + (x.key === tKey ? " today" : ""), x: cx, y: H - 14 }, x.d.toLocaleDateString([], { weekday: "narrow" }));
      if (x.g >= g) add("text", { class: "hit", x: cx, y: H - 1 }, "✓");
      const hb = add("rect", { class: "hitbox", x: left + slot * n, y: 0, width: slot, height: H });
      hb.addEventListener("click", () => { selDay = selDay === x.key ? null : x.key; renderHistory(); });
    });
    add("line", { class: "goal", x1: 0, x2: W, y1: y(g), y2: y(g) });
    add("text", { class: "goal-label", x: W - 2, y: y(g) - 5, "text-anchor": "end" }, "goal " + g + " g");

    const chart = $("chart");
    chart.replaceChildren(svg, el("div", { class: "legend" }, [
      el("span", {}, [el("i"), "Goal met"]), el("span", {}, [el("i", { class: "under" }), "Under goal"]), el("span", {}, [el("i", { class: "goal" }), "Daily goal"]),
    ]));

    const sel = data.find((x) => x.key === selDay);
    $("chart-tip").hidden = !sel;
    if (sel) {
      $("chart-tip").textContent = sel.d.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" }) + ": " + sel.g + " g of " + g + " g" +
        (sel.list.length ? " from " + sel.list.length + " meal" + (sel.list.length > 1 ? "s" : "") + ", " + money(sel.spent) : "");
    }

    const logged = data.filter((x) => x.g > 0);
    $("wk-avg").textContent = logged.length ? Math.round(sum(logged, "g") / logged.length) : 0;
    $("wk-hit").textContent = data.filter((x) => x.g >= g).length + "/7";
    $("wk-spent").textContent = money(sum(data, "spent"));

    const places = {};
    data.forEach((x) => x.list.forEach((e) => {
      const p = places[e.place] = places[e.place] || { name: e.place, emoji: e.emoji, n: 0, g: 0, spent: 0 };
      p.n++; p.g += e.protein; p.spent += e.price || 0;
    }));
    const topPlaces = Object.values(places).sort((a, b) => b.g - a.g).slice(0, 5);
    $("wk-top").replaceChildren(...topPlaces.map((p) => el("li", {}, [
      badge(p.emoji),
      el("div", { class: "l-main" }, [el("div", { class: "l-name", text: p.name }), el("div", { class: "l-sub", text: p.n + " order" + (p.n > 1 ? "s" : "") + " · " + money(p.spent) })]),
      el("span", { class: "l-g", text: p.g + "g" }),
    ])));
    $("wk-empty").hidden = topPlaces.length > 0;
  }
  $("week-prev").addEventListener("click", () => { weekOffset--; selDay = null; renderHistory(); });
  $("week-next").addEventListener("click", () => { if (weekOffset < 0) { weekOffset++; selDay = null; renderHistory(); } });

  // ---------- GOAL / settings ----------
  function setRadio(name, v) {
    const r = document.querySelector('input[name="' + name + '"][value="' + v + '"]');
    if (r) r.checked = true;
  }
  const getRadio = (name) => parseFloat((document.querySelector('input[name="' + name + '"]:checked') || {}).value) || 0.8;
  function formSettings() {
    return { weight: parseFloat($("weight").value) || 0, factor: getRadio("factor"), manual: parseFloat($("manual").value) || 0, onboarded: true };
  }
  function fillGoalForm() {
    const s = state.settings;
    $("weight").value = s.weight || "";
    setRadio("factor", s.factor || 0.8);
    $("manual").value = s.manual || "";
    $("goal-preview").textContent = goal() + " g";
  }
  $("goal-form").addEventListener("input", () => { $("goal-preview").textContent = goalFor(formSettings()) + " g"; });
  $("goal-form").addEventListener("submit", (ev) => {
    ev.preventDefault();
    state.settings = formSettings();
    save();
    renderAll();
    toast("Goal set to " + goal() + " g a day");
  });
  $("custom-form").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const name = $("custom-name").value.trim();
    const p = parseFloat($("custom-protein").value);
    if (!name || !(p >= 0)) return;
    logEntry({ name, place: "Custom", emoji: "✏️", protein: Math.round(p), price: parseFloat($("custom-price").value) || 0 });
    ev.target.reset();
  });
  $("reset-btn").addEventListener("click", () => {
    if (!confirm("Delete all your logs, favorites and your goal from this phone?")) return;
    state.days = {}; state.favorites = []; state.settings = {};
    save();
    renderAll();
    showOnboarding();
  });

  // onboarding
  function showOnboarding() {
    $("scrim").hidden = false;
    $("onboard").hidden = false;
  }
  function finishOnboarding(weight, factor) {
    state.settings = { weight: weight || 0, factor: factor || 0.8, manual: 0, onboarded: true };
    save();
    $("onboard").hidden = true;
    $("scrim").hidden = true;
    renderAll();
  }
  $("onboard-form").addEventListener("submit", (ev) => {
    ev.preventDefault();
    finishOnboarding(parseFloat($("ob-weight").value), getRadio("ob-factor"));
  });
  $("ob-skip").addEventListener("click", () => finishOnboarding(0, 0.8));

  // install
  let installEvt = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    installEvt = e;
    $("install-btn").hidden = false;
    $("install-hint").textContent = "Add Protein Devil to your home screen so it opens like an app.";
  });
  $("install-btn").addEventListener("click", async () => {
    if (!installEvt) return;
    installEvt.prompt();
    await installEvt.userChoice;
    installEvt = null;
    $("install-btn").hidden = true;
  });
  if (window.matchMedia("(display-mode: standalone)").matches) $("install-hint").textContent = "You're using the installed app.";

  // ---------- navigation ----------
  const VIEWS = ["today", "eat", "history", "me"];
  let current = "today";
  function go(view) {
    if (!VIEWS.includes(view)) view = "today";
    current = view;
    VIEWS.forEach((v) => { $("view-" + v).hidden = v !== view; });
    document.querySelectorAll(".tabbar button").forEach((b) => {
      if (b.dataset.tab === view) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
    });
    $("view-title").textContent = $("view-" + view).dataset.title;
    $("today-label").hidden = view !== "today";
    if (view === "me") fillGoalForm();
    if (view === "history") renderHistory();
    if (location.hash !== "#" + view) history.replaceState(null, "", "#" + view);
    window.scrollTo(0, 0);
  }
  $("tabbar").addEventListener("click", (e) => { const b = e.target.closest("button[data-tab]"); if (b) go(b.dataset.tab); });
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-goto]"); if (b) go(b.dataset.goto); });

  function renderAll() {
    renderToday();
    renderResults();
    if (current === "history") renderHistory();
    if (current === "me") fillGoalForm();
  }

  // Roll over at midnight if the app stays open.
  let lastDay = today();
  setInterval(() => { if (today() !== lastDay) { lastDay = today(); renderAll(); } }, 60000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden && today() !== lastDay) { lastDay = today(); renderAll(); } });

  renderFilters();
  renderAll();
  go(location.hash.slice(1) || "today");
  if (!state.settings.onboarded) showOnboarding();

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
})();
