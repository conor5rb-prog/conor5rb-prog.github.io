let currentTab = 0;
let favorites = [];

function renderNav() {
    const nav = document.getElementById('nav');
    APP_DATA.tabs.forEach((tabName, i) => {
        const btn = document.createElement('button');
        btn.textContent = tabName;
        btn.onclick = () => switchTab(i);
        if (i === 0) btn.classList.add('active');
        nav.appendChild(btn);
    });
}

function switchTab(n) {
    currentTab = n;
    document.querySelectorAll('#nav button').forEach((b,i) => b.classList.toggle('active', i===n));
    loadTabContent(n);
}

function loadTabContent(n) {
    const content = document.getElementById('content');
    content.innerHTML = '';

    if (n === 0) { // Tablets
        let html = '<div class="grid">';
        APP_DATA.tablets.forEach(t => {
            html += `
                <div class="card">
                    <img src="${t.image}" style="width:100%;height:200px;object-fit:cover;border-radius:6px;">
                    <h3>${t.title}</h3>
                    <small><strong>${t.category}</strong></small>
                    <p>${t.excerpt}</p>
                    <button onclick="alert('${t.full.replace(/'/g, "\\'")}')">Read Full Translation</button>
                    <button onclick="toggleFavorite(${t.id})">❤️ Favorite</button>
                </div>`;
        });
        html += '</div>';
        content.innerHTML = html;
    } 
    else if (n === 1) { // Maps
        let html = '<div class="grid">';
        APP_DATA.maps.forEach(m => {
            html += `<div class="card"><h3>${m.title}</h3><img class="map" src="${m.url}"><p>${m.desc}</p></div>`;
        });
        html += '</div>';
        content.innerHTML = html;
    } 
    else if (n === 2) { // Gods
        let html = '<div class="grid">';
        APP_DATA.gods.forEach(g => {
            html += `<div class="card"><h3>${g.name}</h3><p>${g.role} • Mentions: ${g.mentions}</p><p>${g.desc}</p></div>`;
        });
        html += '</div>';
        content.innerHTML = html;
    } 
    else if (n === 3) {
        content.innerHTML = '<div class="card" style="max-width:600px;margin:40px auto;"><h2>Your Favorites</h2><p>Feature ready for expansion. Add tablets via the heart icon.</p></div>';
    }
}

function globalSearch() {
    const term = document.getElementById('globalSearch').value.toLowerCase().trim();
    if (!term) {
        loadTabContent(currentTab);
        return;
    }
    const filtered = APP_DATA.tablets.filter(t => 
        t.title.toLowerCase().includes(term) || 
        t.excerpt.toLowerCase().includes(term) ||
        t.category.toLowerCase().includes(term)
    );
    
    const content = document.getElementById('content');
    if (filtered.length === 0) {
        content.innerHTML = '<p style="text-align:center;padding:2rem;">No matches found.</p>';
        return;
    }
    let html = '<div class="grid">';
    filtered.forEach(t => {
        html += `
            <div class="card">
                <img src="${t.image}" style="width:100%;height:200px;object-fit:cover;border-radius:6px;">
                <h3>${t.title}</h3>
                <small><strong>${t.category}</strong></small>
                <p>${t.excerpt}</p>
                <button onclick="alert('${t.full.replace(/'/g, "\\'")}')">Read Full</button>
            </div>`;
    });
    html += '</div>';
    content.innerHTML = html;
}

function toggleFavorite(id) {
    if (!favorites.includes(id)) {
        favorites.push(id);
        alert("Added to Favorites!");
    } else {
        alert("Already in Favorites!");
    }
}

// Initialize
window.onload = () => {
    renderNav();
    loadTabContent(0);
};
