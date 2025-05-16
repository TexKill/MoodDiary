let inputSmile = '';

function whatEmoji1() { inputSmile = '😊'; }
function whatEmoji2() { inputSmile = '😐'; }
function whatEmoji3() { inputSmile = '😢'; }
function whatEmoji4() { inputSmile = '😡'; }
function whatEmoji5() { inputSmile = '😍'; }

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

// Delegating events to the Delete and Edit buttons
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

    // Create textarea
    const textarea = document.createElement('textarea');
    textarea.value = originalText;
    textarea.classList.add('edit-textarea');
    textarea.rows = 4;

    // Save Button
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.classList.add('your-records__buttons-savebtn');

    // Replace text with textarea
    textEl.replaceWith(textarea);
    e.target.style.display = 'none'; // Hide button Edit
    e.target.parentElement.appendChild(saveBtn);

    // Save processing
    saveBtn.addEventListener('click', () => {
      const newText = textarea.value.trim();
      if (newText !== '') {
        const newP = document.createElement('p');
        newP.classList.add('your-records__text');
        newP.textContent = newText;

        textarea.replaceWith(newP);
        saveBtn.remove();
        e.target.style.display = 'inline-block';
      }
    });
  }
});
