// Client-side token key used as a small flag; primary auth is server-side session
const TOKEN_KEY = 'authToken';
function getToken() { return localStorage.getItem(TOKEN_KEY); }
function isLoggedIn() { return !!getToken(); }
function requireAuth() { if(!isLoggedIn()) window.location.href="login.html"; }
function logout() {
  // Call server to destroy PHP session, then clear client storage and redirect
  $.ajax({
    url: '../PHP/auth.php',
    type: 'POST',
    data: { action: 'logout' },
    dataType: 'json',
    success: function(resp) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('userName');
      localStorage.removeItem('userRole');
      window.location.href = 'login.html';
    },
    error: function() {
      // Fallback: clear client storage anyway
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = 'login.html';
    }
  });
}
$(document).on('click', '#logoutBtn', logout);
