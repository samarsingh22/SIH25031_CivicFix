/* CivicFix global JS for API-powered auth and dashboard actions */
window.CivicFix = (function () {
  const API = {
    login: '/api/auth/token/',
    refresh: '/api/auth/token/refresh/',
    signup: (role) => `/api/auth/signup/${role}/`,
    dashboard: (role) => `/api/dashboard/${role}/`,
  };

  const storage = {
    setTokens(tokens) {
      if (tokens.access) localStorage.setItem('cf_access', tokens.access);
      if (tokens.refresh) localStorage.setItem('cf_refresh', tokens.refresh);
    },
    get access() { return localStorage.getItem('cf_access'); },
    get refresh() { return localStorage.getItem('cf_refresh'); },
    clear() { localStorage.removeItem('cf_access'); localStorage.removeItem('cf_refresh'); },
  };

  async function postJSON(url, data, headers = {}) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(data),
    });
    const text = await res.text();
    let payload;
    try { payload = text ? JSON.parse(text) : {}; } catch { payload = { raw: text }; }
    if (!res.ok) {
      const msg = payload.detail || payload.error || JSON.stringify(payload);
      throw new Error(msg || `HTTP ${res.status}`);
    }
    return payload;
  }

  async function getJSON(url, headers = {}) {
    const res = await fetch(url, { headers });
    const text = await res.text();
    let payload;
    try { payload = text ? JSON.parse(text) : {}; } catch { payload = { raw: text }; }
    if (!res.ok) {
      const msg = payload.detail || payload.error || JSON.stringify(payload);
      throw new Error(msg || `HTTP ${res.status}`);
    }
    return payload;
  }

  async function apiLogin() {
    const username = prompt('Enter username');
    if (!username) return;
    const password = prompt('Enter password');
    if (!password) return;
    try {
      const tokens = await postJSON(API.login, { username, password });
      storage.setTokens(tokens);
      alert('Login success. Access token stored.');
      console.debug('JWT', tokens);
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  }

  async function apiRefresh() {
    const refresh = storage.refresh;
    if (!refresh) { alert('No refresh token found. Please login first.'); return; }
    try {
      const data = await postJSON(API.refresh, { refresh });
      storage.setTokens({ access: data.access });
      alert('Access token refreshed.');
    } catch (err) {
      alert('Refresh failed: ' + err.message);
    }
  }

  async function apiSignup(role) {
    const username = prompt(`Signup (${role}) - enter username`);
    if (!username) return;
    const email = prompt('Enter email (optional)') || '';
    const password = prompt('Enter password (min 8 chars)');
    if (!password) return;
    try {
      const user = await postJSON(API.signup(role), { username, email, password });
      alert(`Signup success for ${user.username} (${user.role}). Logging in...`);
      // Convenience: auto obtain JWT
      try {
        const tokens = await postJSON(API.login, { username, password });
        storage.setTokens(tokens);
        alert('Logged in. Tokens stored.');
      } catch (e) {
        console.warn('Auto-login after signup failed:', e);
      }
    } catch (err) {
      alert('Signup failed: ' + err.message);
    }
  }

  async function apiDashboard(role) {
    const access = storage.access;
    if (!access) { alert('No access token. Please login first.'); return; }
    try {
      const data = await getJSON(API.dashboard(role), { Authorization: `Bearer ${access}` });
      alert(`Dashboard (${role}) response:\n` + JSON.stringify(data, null, 2));
      console.debug('Dashboard data', data);
    } catch (err) {
      alert('Dashboard request failed: ' + err.message);
    }
  }

  function logout() {
    storage.clear();
    alert('Tokens cleared from localStorage.');
  }

  // Expose public API
  return { apiLogin, apiRefresh, apiSignup, apiDashboard, logout };
})();

// CSS menu wiring: switch active stylesheet via navbar "CSS Options"
(function() {
  function onCssOptionClick(e) {
    e.preventDefault();
    const linkEl = document.getElementById('active-stylesheet');
    const item = e.currentTarget;
    if (!linkEl || !item) return;
    const css = item.getAttribute('data-css');
    if (!css) return;
    // Compute /static base from current href
    const href = linkEl.getAttribute('href') || '';
    const parts = href.split('/static/');
    const base = parts.length > 1 ? parts[0] + '/static/' : '/static/';
    linkEl.setAttribute('href', base + 'css/' + css);
    try { sessionStorage.setItem('activeCss', css); } catch (_) {}
  }

  function restoreSelection() {
    try {
      const css = sessionStorage.getItem('activeCss');
      if (!css) return;
      const linkEl = document.getElementById('active-stylesheet');
      if (!linkEl) return;
      const href = linkEl.getAttribute('href') || '';
      const parts = href.split('/static/');
      const base = parts.length > 1 ? parts[0] + '/static/' : '/static/';
      linkEl.setAttribute('href', base + 'css/' + css);
    } catch (_) {}
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.css-option').forEach(a => a.addEventListener('click', onCssOptionClick));
    restoreSelection();
  });
})();