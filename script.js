// PROFILE MENU OPEN/CLOSE

const profile_btn = document.getElementById("profile_btn");
const profile_menu = document.getElementById("profile_menu");
const userBar = document.querySelector(".username-bar");

const profile_btn_img = document.getElementById("profile_btn_img");
if (profile_btn && profile_menu) {
  const toggleProfileMenu = () => {
    const isActive = profile_menu.classList.toggle("active");

    if (isActive) {
      const scrollWidth = userBar ? userBar.scrollWidth + 20 : 160;
      profile_menu.style.width = scrollWidth + "px";
      profile_menu.style.maxWidth = scrollWidth + "px";
    } else {
      profile_menu.style.width = "45px";
      profile_menu.style.maxWidth = "45px";
    }
  };

  profile_btn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleProfileMenu();
  });
  if (profile_btn_img)
    profile_btn_img.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleProfileMenu();
    });
}
// POPUP INPUT
const popupMain = document.getElementById("popup_main");
const popupForm = document.getElementById("form");
const usernameDisplay = document.getElementById("username_display");

function showPopup(show) {
  if (!popupMain) return;
  popupMain.style.display = show ? "block" : "none";
}

const storedName = localStorage.getItem("name");
if (!storedName) {
  showPopup(true);
} else {
  showPopup(false);
  if (usernameDisplay) usernameDisplay.textContent = storedName;
  // load avatar if present and hide SVG if avatar exists
  const storedAvatar = localStorage.getItem("avatar");
  if (storedAvatar && profile_btn_img) {
    profile_btn_img.src = storedAvatar;
    profile_btn_img.style.display = "block";
    if (profile_btn) profile_btn.style.display = "none";
  } else if (profile_btn_img) {
    const srcAttr = profile_btn_img.getAttribute("src") || "";
    if (srcAttr) {
      profile_btn_img.style.display = "block";
      if (profile_btn) profile_btn.style.display = "none";
    }
  }
}

const submit = document.getElementById("popup_submit");
if (submit) {
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value || "";
    localStorage.setItem("name", username);
    if (usernameDisplay) usernameDisplay.textContent = username;
    showPopup(false);
  });
}
// PROFILE MODAL (moved from settings -> profile menu)
const menuProfileBtn = document.getElementById("menu_profile_btn");
const profileModal = document.getElementById("profile_modal");
const profileForm = document.getElementById("profile_form");
const profileUsername = document.getElementById("profile_username");
const profileAvatarInput = document.getElementById("profile_avatar_input");
const profileAvatarPreview = document.getElementById("profile_avatar_preview");
const profileSaveBtn = document.getElementById("profile_save_btn");
const profileCancelBtn = document.getElementById("profile_cancel_btn");

function openProfileModal() {
  if (!profileModal) return;
  profileModal.style.display = "block";
  // populate from localStorage
  const stored = localStorage.getItem("name") || "";
  if (profileUsername) profileUsername.value = stored;
  const avatarData = localStorage.getItem("avatar");
  if (avatarData && profileAvatarPreview) profileAvatarPreview.src = avatarData;
  closeProfileMenu();
}

function closeProfileModal() {
  if (!profileModal) return;
  profileModal.style.display = "none";
}

if (menuProfileBtn && profileModal) {
  menuProfileBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openProfileModal();
  });
}

// avatar preview and load
if (profileAvatarInput && profileAvatarPreview) {
  profileAvatarInput.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (ev) {
      profileAvatarPreview.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });
}

if (profileSaveBtn) {
  profileSaveBtn.addEventListener("click", () => {
    const nameVal = profileUsername ? profileUsername.value : "";
    if (nameVal) {
      localStorage.setItem("name", nameVal);
      if (usernameDisplay) usernameDisplay.textContent = nameVal;
    }
    // save avatar if preview has data
    if (profileAvatarPreview && profileAvatarPreview.src) {
      localStorage.setItem("avatar", profileAvatarPreview.src);
      if (profile_btn_img) {
        profile_btn_img.src = profileAvatarPreview.src;
        profile_btn_img.style.display = "block";
        if (profile_btn) profile_btn.style.display = "none";
      }
    }
    closeProfileModal();
  });
}

if (profileCancelBtn) {
  profileCancelBtn.addEventListener("click", () => {
    closeProfileModal();
  });
}

// click outside profile modal to close
document.addEventListener("click", (e) => {
  if (!profileModal || profileModal.style.display !== "block") return;
  const path = e.composedPath ? e.composedPath() : e.path || [];
  if (!path.includes(profileModal) && !path.includes(menuProfileBtn)) {
    closeProfileModal();
  }
});
// SETTINGS PAGE OPEN

const settingsBtn = document.getElementById("menu_settings_btn");
const settingsPage = document.getElementById("settings");

function closeProfileMenu() {
  if (!profile_menu) return;
  if (profile_menu.classList.contains("active")) {
    profile_menu.classList.remove("active");
    profile_menu.style.width = "45px";
    profile_menu.style.maxWidth = "45px";
  }
}

function openSettings() {
  if (!settingsPage) return;
  settingsPage.classList.add("open");
  closeProfileMenu();
}

function closeSettings() {
  if (!settingsPage) return;
  settingsPage.classList.remove("open");
}

if (settingsBtn && settingsPage) {
  settingsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openSettings();
  });
}

// Settings close button handler and Escape key
const settingsCloseBtn = document.getElementById("settings_close_btn");
if (settingsCloseBtn && settingsPage) {
  settingsCloseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeSettings();
  });
}

document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    settingsPage &&
    settingsPage.classList.contains("open")
  ) {
    closeSettings();
  }
});

// Close profile menu when clicking outside it
document.addEventListener("click", (e) => {
  // If no profile menu or it's not active, nothing to do
  if (!profile_menu || !profile_menu.classList.contains("active")) return;

  const path = e.composedPath ? e.composedPath() : e.path || [];
  const clickedInsideProfile =
    path.includes(profile_menu) ||
    path.includes(profile_btn) ||
    path.includes(profile_btn_img);
  if (!clickedInsideProfile) {
    closeProfileMenu();
  }
});

// Hamburger menu toggle with expanding circle animation
const hamburgerBtn = document.querySelector(".hamburger_btn");
const hamburgerMenu = document.getElementById("hamburger_menu");
if (hamburgerBtn && hamburgerMenu) {
  const menuList = hamburgerMenu.querySelector(".menu");

  hamburgerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!menuList) return;
    const isActive = menuList.classList.toggle("active");
    hamburgerMenu.classList.toggle("open", isActive);
    hamburgerBtn.classList.toggle("active", isActive);
    if (isActive) closeProfileMenu();
  });

  // close hamburger when clicking outside
  document.addEventListener("click", (e) => {
    if (!menuList || !menuList.classList.contains("active")) return;
    const path = e.composedPath ? e.composedPath() : e.path || [];
    if (
      !path.includes(menuList) &&
      !path.includes(hamburgerBtn) &&
      !path.includes(hamburgerMenu)
    ) {
      menuList.classList.remove("active");
      hamburgerMenu.classList.remove("open");
      hamburgerBtn.classList.remove("active");
    }
  });
}

// Navigation link handlers for hamburger menu
const navLinks = document.querySelectorAll('.nav-link');
if (navLinks.length > 0) {
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get the target section ID from data attribute
      const targetSection = link.getAttribute('data-target');
      if (targetSection) {
        showSection(targetSection);
      }
      
      // Close menu after link click
      const menuList = hamburgerMenu ? hamburgerMenu.querySelector('.menu') : null;
      if (menuList) {
        menuList.classList.remove('active');
        if (hamburgerMenu) hamburgerMenu.classList.remove('open');
        if (hamburgerBtn) hamburgerBtn.classList.remove('active');
      }

      // Update active link styling
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

// SETTINGS SIDEBAR NAVIGATION
const navItems = document.querySelectorAll(".settings-sidebar .nav-item");
const contentSections = document.querySelectorAll(".settings-content section");

function showSection(id) {
  contentSections.forEach((sec) => {
    if (sec.id === id) sec.classList.add("active");
    else sec.classList.remove("active");
  });
  navItems.forEach((btn) => {
    if (btn.dataset && btn.dataset.target === id) btn.classList.add("active");
    else btn.classList.remove("active");
  });
}

// Prefer event delegation on the sidebar for robustness
const settingsSidebarEl = document.querySelector(".settings-sidebar");
if (settingsSidebarEl) {
  settingsSidebarEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".nav-item");
    if (!btn) return;
    const target = btn.dataset.target;
    if (target) showSection(target);
  });
} else {
  navItems.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      if (target) showSection(target);
    });
  });
}


// 1. Selectors
const menuContainer = document.querySelector('.hamburger_menu');
const menuBtn = document.querySelector('.hamburger_btn');
const navMenu = document.querySelector('.menu'); // The <ul> list
const sections = document.querySelectorAll('.content-section');

// 2. Click Hamburger Button (Toggle)
menuBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = menuContainer.classList.toggle('active');
  
  // Direct Display Toggle
  navMenu.style.display = isOpen ? "block" : "none";
});

// 3. Handle Link Selection
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // --- THE FIX: Force Close by setting display to none ---
    navMenu.style.display = "none";
    menuContainer.classList.remove('active');

    // Switch Active Link UI
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    // Switch Sections
    const targetId = link.getAttribute('data-target');
    sections.forEach(s => {
      s.style.display = "none"; // Hide all
      if (s.id === targetId) {
        s.style.display = "block"; // Show target
      }
    });
  });
});

// 4. Click Outside to Close
document.addEventListener('click', (e) => {
  if (!menuContainer.contains(e.target)) {
    navMenu.style.display = "none";
    menuContainer.classList.remove('active');
  }
});