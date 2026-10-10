(function () {
  const KEY = "tempe-protein-tracker:v1";
  const $ = (id) => document.getElementById(id);

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s && typeof s === "object") return { settings: s.settings || {}, days: s.days || {} };
    } catch (e) { /* storage unavailable or corrupt */ }
    return { settings: {}, days: {} };
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  function dayKey(d) {
    const pad = (n) => String(n).padStart(2, "0");
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }
  const today = () => dayKey(new Date());

  const state = load();

  function target() {
    const s = state.settings;
    if (s.manual > 0) return Math.round(s.manual);
    if (s.weight > 0) return Math.round(s.weight * (s.factor || 0.8));
    return 120; // sensible default until the user sets a weight
  }
  const entries = (k) => state.days[k] || [];
  const total = (k) => entries(k).reduce((sum, e) => sum + e.protein, 0);

  function addEntry(name, protein, restaurant) {
    const k = today();
    (state.days[k] = state.days[k] || []).push({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name, protein: Math.round(protein), restaurant: restaurant || "", time: new Date().toISOString(),
    });
    save();
    render();
  }
  function removeEntry(id) {
    const k = today();
    state.days[k] = entries(k).filter((e) => e.id !== id);
    save();
    render();
  }

  function el(tag, attrs, children) {
    const n = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([a, v]) => {
      if (a === "text") n.textContent = v;
      else if (a.startsWith("on")) n.addEventListener(a.slice(2), v);
      else n.setAttribute(a, v);
    });
    (children || []).forEach((c) => c && n.appendChild(c));
    return n;
  }

  function itemRow(item, restaurant, buttonLabel, onClick) {
    return el("li", { class: "item" }, [
      el("span", { class: "name" }, [
        document.createTextNode(item.name),
        restaurant ? el("span", { class: "where", text: restaurant }) : null,
      ]),
      el("span", { class: "g", text: "~" + item.protein + " g" }),
      el("button", { type: "button", class: buttonLabel === "Remove" ? "ghost" : "", text: buttonLabel, onclick: onClick }),
    ]);
  }

  function renderMenu() {
    const q = $("search").value.trim().toLowerCase();
    const menu = $("menu");
    menu.replaceChildren();
    let shown = 0;
    window.RESTAURANTS.forEach((r) => {
      const matchR = r.name.toLowerCase().includes(q);
      const items = r.items.filter((i) => !q || matchR || i.name.toLowerCase().includes(q));
      if (!items.length) return;
      shown += items.length;
      menu.appendChild(el("h3", {}, [document.createTextNode(r.name + " "), el("small", { text: r.area })]));
      const ul = el("ul", { class: "list" });
      items.forEach((i) => ul.appendChild(itemRow(i, null, "Add", () => addEntry(i.name, i.protein, r.name))));
      menu.appendChild(ul);
    });
    if (!shown) menu.appendChild(el("p", { class: "muted", text: "No matches. Use \"Add something else\" below." }));
  }

  function renderSuggestions(remaining) {
    const card = $("suggest-card");
    const ul = $("suggest");
    ul.replaceChildren();
    if (remaining <= 0) { card.hidden = true; return; }
    card.hidden = false;
    const all = [];
    window.RESTAURANTS.forEach((r) => r.items.forEach((i) => all.push({ i, r: r.name })));
    // Smallest items that still cover the gap; if nothing covers it, the biggest ones.
    let picks = all.filter((x) => x.i.protein >= remaining).sort((a, b) => a.i.protein - b.i.protein);
    if (!picks.length) picks = all.sort((a, b) => b.i.protein - a.i.protein);
    picks.slice(0, 4).forEach((x) => ul.appendChild(itemRow(x.i, x.r, "Add", () => addEntry(x.i.name, x.i.protein, x.r))));
  }

  function renderLog() {
    const ul = $("log");
    ul.replaceChildren();
    const list = entries(today());
    $("log-empty").hidden = list.length > 0;
    list.slice().reverse().forEach((e) => {
      const time = new Date(e.time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
      ul.appendChild(itemRow(e, [e.restaurant, time].filter(Boolean).join(" · "), "Remove", () => removeEntry(e.id)));
    });
  }

  function renderHistory() {
    const box = $("history");
    box.replaceChildren();
    const t = target();
    const days = [];
    for (let n = 6; n >= 0; n--) {
      const d = new Date();
      d.setDate(d.getDate() - n);
      days.push({ d, g: total(dayKey(d)) });
    }
    const max = Math.max(t, ...days.map((x) => x.g)) || 1;
    days.forEach(({ d, g }) => {
      box.appendChild(el("div", { class: "bar" + (g >= t ? " met" : ""), title: g + " g" }, [
        el("span", { text: g ? g + "g" : "" }),
        el("div", { style: "height:" + Math.round((g / max) * 100) + "px" }),
        el("span", { text: d.toLocaleDateString([], { weekday: "short" }) }),
      ]));
    });
  }

  function render() {
    const t = target();
    const eaten = total(today());
    const remaining = Math.max(0, t - eaten);
    const pct = Math.min(100, Math.round((eaten / t) * 100));
    $("target").textContent = t;
    $("eaten").textContent = eaten;
    $("remaining").textContent = remaining;
    $("ring-pct").textContent = pct + "%";
    $("ring").style.setProperty("--pct", pct);
    $("ring").classList.toggle("done", remaining === 0);
    renderSuggestions(remaining);
    renderLog();
    renderHistory();
  }

  // Settings form
  const s = state.settings;
  if (s.weight) $("weight").value = s.weight;
  if (s.factor) $("factor").value = String(s.factor);
  if (s.manual) $("manual").value = s.manual;
  $("target-form").addEventListener("submit", (ev) => {
    ev.preventDefault();
    state.settings = {
      weight: parseFloat($("weight").value) || 0,
      factor: parseFloat($("factor").value) || 0.8,
      manual: parseFloat($("manual").value) || 0,
    };
    save();
    render();
  });

  $("custom-form").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const name = $("custom-name").value.trim();
    const g = parseFloat($("custom-protein").value);
    if (!name || !(g >= 0)) return;
    addEntry(name, g, "Custom");
    ev.target.reset();
  });

  $("search").addEventListener("input", renderMenu);

  // Roll over to a new day if the tab stays open past midnight.
  let lastDay = today();
  setInterval(() => { if (today() !== lastDay) { lastDay = today(); render(); } }, 60000);

  renderMenu();
  render();
})();
