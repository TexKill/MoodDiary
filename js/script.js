let inputSmile = '';
function whatEmoji() {
  inputSmile = document.getElementsByClassName('your-mood__emoji-smile')[0].innerHTML;
  console.log(inputSmile)
}

function saveMood() {
  const inputMood = document.getElementById('input-mood').value;
  let dueDate =  new Date();
  let months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  if(inputSmile === '') {
    alert('CHOOSE SMILE')
  } else if(inputSmile === '😊' || inputSmile === '😐' || inputSmile === '😢' || inputSmile === '😡' || inputSmile === '😍') {
    document.querySelector(".your-records").insertAdjacentHTML('afterbegin', `
      <div class="your-records__card">
        <p class="your-records__duedate">${dueDate.getDate()} ${months[dueDate.getMonth()]} ${dueDate.getFullYear()}</p>
        <p class="your-records__smile">${inputSmile}</p>
        <p class="your-records__text">${inputMood}</p>
        <div class="your-records__buttons">
          <button class="your-records__buttons-editbtn">Edit</button>
          <button class="your-records__buttons-delbtn">Delete</button>
        </div>
      </div>`);
  }
}