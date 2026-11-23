(function () {
  var EMAIL = "uhgapwickramanayaka@gmail.com";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // Reveal on scroll
  var revealIO = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add("in"); });
  }, { threshold: 0.15 });
  $$(".reveal").forEach(function (el) { revealIO.observe(el); });

  // Active nav link
  var links = $$(".nav-links a");
  var navIO = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id); });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("section[id]").forEach(function (s) { navIO.observe(s); });

  // Mobile menu
  var menu = $("#mobileMenu"), btn = $("#menuBtn");
  btn.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    btn.textContent = open ? "Close" : "Menu";
  });
  $$("a", menu).forEach(function (a) {
    a.addEventListener("click", function () { menu.classList.remove("open"); btn.textContent = "Menu"; });
  });

  // Tilt cards
  $$(".tilt").forEach(function (el) {
    el.addEventListener("mousemove", function (e) {
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = "perspective(900px) rotateY(" + x * 12 + "deg) rotateX(" + -y * 12 + "deg) translateZ(0)";
    });
    el.addEventListener("mouseleave", function () { el.style.transform = ""; });
  });

  // Hero parallax
  var hero = $("#home"), floaters = $$("[data-depth]");
  hero.addEventListener("mousemove", function (e) {
    var x = e.clientX / window.innerWidth - 0.5, y = e.clientY / window.innerHeight - 0.5;
    floaters.forEach(function (f) {
      var d = parseFloat(f.getAttribute("data-depth"));
      f.style.translate = x * d + "px " + y * d + "px";
    });
  });

  // Doors + modal
  var DOORS = [
    { n: "Web Development", c: "d1", d: "Responsive websites built with HTML, CSS and JavaScript — starting with this very portfolio.", t: ["HTML", "CSS"], p: ["Personal Portfolio Website", "Web Design Experiments"] },
    { n: "Python Development", c: "d2", d: "Small scripts, automation experiments and desktop apps while learning Python fundamentals.", t: ["Python", "MySQL"], p: ["Python Practice Projects"] },
    { n: "App Development", c: "d3", d: "Exploring mobile and hardware projects with Android Studio, C# and Arduino.", t: ["C#", "Arduino"], p: ["Arduino & Hardware Tinkering"] },
    { n: "Creative Design", c: "d4", d: "UI/UX exploration, gaming montages and short-form edits with synced transitions.", t: ["UI/UX", "Video Editing", "After Effects 2022", "TikTok"], p: ["Gaming Montages", "Creative TikTok Edits"] }
  ];
  var modal = $("#modal"), card = $("#modalCard"), doorBtns = $$(".door-wrap");
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function closeModal() { modal.classList.remove("open"); doorBtns.forEach(function (b) { b.classList.remove("open"); }); }
  doorBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      var i = +b.getAttribute("data-door"), d = DOORS[i];
      doorBtns.forEach(function (x) { x.classList.toggle("open", x === b); });
      card.innerHTML =
        '<div class="modal-bar ' + d.c + '"></div><h3>' + esc(d.n) + '</h3><p class="d">' + esc(d.d) + '</p>' +
        '<p class="eyebrow">Technologies</p><div class="pills">' + d.t.map(function (t) { return '<span class="pill">' + esc(t) + '</span>'; }).join("") + '</div>' +
        '<p class="eyebrow">Related projects</p><ul>' + d.p.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join("") + '</ul>' +
        '<button class="back glass" id="backBtn">← Back to the doors</button>';
      $("#backBtn").addEventListener("click", closeModal);
      modal.classList.add("open");
    });
  });
  modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });

  // Project filter
  var filters = $$(".filter"), projs = $$(".proj");
  filters.forEach(function (f) {
    f.addEventListener("click", function () {
      var cat = f.getAttribute("data-filter");
      filters.forEach(function (x) { x.classList.toggle("active", x === f); });
      var n = 0;
      projs.forEach(function (p) {
        var show = cat === "All" || p.getAttribute("data-cat") === cat;
        p.classList.toggle("hidden", !show);
        p.classList.remove("wide");
        if (show) { if (n % 3 === 0) p.classList.add("wide"); n++; }
      });
    });
  });
  projs.forEach(function (p, i) { if (i % 3 === 0) p.classList.add("wide"); });

  // Contact form -> mailto
  $("#contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target;
    var subject = f.subject.value || "Hello Aruna";
    var body = f.message.value + "\n\n— " + f.name.value;
    window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  });
})();
