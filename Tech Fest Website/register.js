const form = document.getElementById('registration-form');
const successMsg = document.getElementById('success-msg');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  clearErrors();

  let hasError = false;

  // Validate Name
  const name = form.name.value.trim();
  if (name.length < 3) {
    showError('name', 'Please enter a valid name (min 3 characters).');
    hasError = true;
  }

  // Validate Email
  const email = form.email.value.trim();
  if (!validateEmail(email)) {
    showError('email', 'Please enter a valid email address.');
    hasError = true;
  }

  // Validate Phone (10-digit numeric)
  const phone = form.phone.value.trim();
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    showError('phone', 'Please enter a valid 10-digit mobile number.');
    hasError = true;
  }

  // Validate College
  const college = form.college.value.trim();
  if (college.length < 2) {
    showError('college', 'Please enter your college name.');
    hasError = true;
  }

  // Validate Event Selection (at least one)
  const eventsSelected = [...form.events.options].some(option => option.selected);
  if (!eventsSelected) {
    showError('events', 'Please select at least one event.');
    hasError = true;
  }

  if (!hasError) {
    successMsg.style.display = 'block';
    successMsg.textContent = 'Registration successful! Thank you for signing up.';
    form.reset();
  }
});

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = field.parentElement.querySelector('.error-msg');
  error.textContent = message;
  error.style.visibility = 'visible';
}

function clearErrors() {
  const errors = form.querySelectorAll('.error-msg');
  errors.forEach(error => {
    error.textContent = '';
    error.style.visibility = 'hidden';
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}
