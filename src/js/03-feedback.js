import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailElement = document.querySelector('label [name = "email"]');
const messageElement = document.querySelector('label [name = "message"]');

const STORAGE_KEY = 'feedback-form-state';
form.addEventListener('input', throttle(saveInput), 500);
function saveInput() {
  const email = emailElement.value;
  const message = messageElement.value;

  const data = { email, message };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

refresh();
function refresh() {
  const saveData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (saveData) {
    emailElement.value = saveData.email;
    messageElement.value = saveData.message;
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const email = emailElement.value;
  const message = messageElement.value;
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
});
