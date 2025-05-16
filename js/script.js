// =======================
// Emoji selection
// =======================
let inputSmile = '';

function whatEmoji1() { inputSmile = '😊'; }
function whatEmoji2() { inputSmile = '😐'; }
function whatEmoji3() { inputSmile = '😢'; }
function whatEmoji4() { inputSmile = '😡'; }
function whatEmoji5() { inputSmile = '😍'; }

// =======================
// Save mood entry
// =======================
function saveMood() {
  const inputMood = document.getElementById('input-mood').value.trim();
  const dueDate = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  if (inputMood === '') {
    alert('Input Text');
    return;
  }

  if (inputSmile === '') {
    alert('CHOOSE SMILE');
    return;
  }

  const cardHTML = `
    <div class="your-records__card">
      <p class="your-records__duedate">${dueDate.getDate()} ${months[dueDate.getMonth()]} ${dueDate.getFullYear()}</p>
      <p class="your-records__smile">${inputSmile}</p>
      <p class="your-records__text">${inputMood}</p>
      <div class="your-records__buttons">
        <button class="your-records__buttons-editbtn">Edit</button>
        <button class="your-records__buttons-delbtn">Delete</button>
      </div>
    </div>`;

  const container = document.querySelector(".your-records");
  container.insertAdjacentHTML('afterbegin', cardHTML);

  inputSmile = '';
  document.getElementById('input-mood').value = '';
}

// =======================
// Delete + Edit entries
// =======================
document.addEventListener('click', function(e) {
  // DELETE
  if (e.target.classList.contains('your-records__buttons-delbtn')) {
    const card = e.target.closest('.your-records__card');
    if (confirm('Are you sure you want to delete this record?')) {
      card.remove();
    }
  }

  // EDIT
  if (e.target.classList.contains('your-records__buttons-editbtn')) {
    const card = e.target.closest('.your-records__card');
    const textEl = card.querySelector('.your-records__text');
    const originalText = textEl.textContent;

    // Create textarea with current text
    const textarea = document.createElement('textarea');
    textarea.value = originalText;
    textarea.classList.add('edit-textarea');
    textarea.rows = 4;

    // Create Save button
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.classList.add('your-records__buttons-savebtn');

    // Replace paragraph with textarea
    textEl.replaceWith(textarea);
    e.target.style.display = 'none'; // hide Edit button
    e.target.parentElement.appendChild(saveBtn);

    // Save new text on Save click
    saveBtn.addEventListener('click', () => {
      const newText = textarea.value.trim();
      if (newText !== '') {
        const newP = document.createElement('p');
        newP.classList.add('your-records__text');
        newP.textContent = newText;

        textarea.replaceWith(newP);
        saveBtn.remove();
        e.target.style.display = 'inline-block'; // show Edit button again
      }
    });
  }
});

// =======================
// Theme switcher (with localStorage)
// =======================
const themeBtn = document.querySelector('.header__themebtn');
const themeLink = document.getElementById('theme-link');

// Toggle between light and dark theme
function toggleTheme() {
  const currentHref = themeLink.getAttribute('href');
  const isDark = currentHref.includes('style-dark.css');

  if (isDark) {
    themeLink.setAttribute('href', '/assests/css/style.css');
    localStorage.setItem('theme', 'light');
    themeBtn.textContent = '🌙 Dark';
  } else {
    themeLink.setAttribute('href', '/assests/css/style-dark.css');
    localStorage.setItem('theme', 'dark');
    themeBtn.textContent = '☀️ Light';
  }
}

// Load saved theme on page load
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    themeLink.setAttribute('href', '/assests/css/style-dark.css');
    themeBtn.textContent = '☀️ Light';
  } else {
    themeLink.setAttribute('href', '/assests/css/style.css');
    themeBtn.textContent = '🌙 Dark';
  }
}

themeBtn.addEventListener('click', toggleTheme);
window.addEventListener('DOMContentLoaded', loadTheme);
