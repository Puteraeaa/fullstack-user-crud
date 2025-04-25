const form = document.getElementById('user-form');
const errorMessage = document.getElementById('error-message');
const modal = document.getElementById('user-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const openModalBtn = document.getElementById('open-modal-btn');
const userIdInput = document.getElementById('user-id');
const loader = document.getElementById('loader'); // Tambahkan ini
const submitButton = form.querySelector('button[type="submit"]'); // Tombol submit

// Open modal for adding a user
openModalBtn.addEventListener('click', () => {
  form.reset();
  userIdInput.value = '';
  errorMessage.textContent = '';
  document.querySelector('.modal-header').textContent = 'Add User';
  modal.style.display = 'flex';
});

// Close modal
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Submit form to add or update user
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const ageInput = document.getElementById('age');
  const submitButton = document.getElementById('submit-button');
  const loader = document.getElementById('loader');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const age = ageInput.value.trim();

  // Reset error states
  [nameInput, emailInput, ageInput].forEach(input => {
    input.classList.remove('error');
    const errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
      errorDiv.remove();
    }
  });
  errorMessage.textContent = '';

  let hasError = false;

  // Basic validation
  if (!name) {
    nameInput.classList.add('error');
    nameInput.insertAdjacentHTML('afterend', '<div class="error-message">Name is required.</div>');
    hasError = true;
  }
  if (!email) {
    emailInput.classList.add('error');
    emailInput.insertAdjacentHTML('afterend', '<div class="error-message">Email is required.</div>');
    hasError = true;
  }
  if (!age) {
    ageInput.classList.add('error');
    ageInput.insertAdjacentHTML('afterend', '<div class="error-message">Age is required.</div>');
    hasError = true;
  }

  if (hasError) return;

  const userId = userIdInput.value;

  // Menampilkan loader dan mengubah teks tombol
  submitButton.textContent = "Saving...";
  loader.style.display = 'inline-block';

  // Request to backend to add or update user
  try {
    const response = await fetch(userId ? `http://127.0.0.1:8000/api/users/${userId}` : 'http://127.0.0.1:8000/api/users', {
      method: userId ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ name, email, age }),
    });

    const result = await response.json();

    if (response.ok) {
      loadUsers(); // Reload users after success
      modal.style.display = 'none'; // Close modal
      alert(userId ? 'User updated successfully!' : 'User added successfully!');
    } else {
      // Handle backend validation errors
      if (result.errors) {
        Object.keys(result.errors).forEach(field => {
          const input = document.getElementById(field);
          if (input) {
            input.classList.add('error');
            input.insertAdjacentHTML('afterend', `<div class="error-message">${result.errors[field][0]}</div>`);
          }
        });
      } else {
        errorMessage.textContent = result.message || 'An error occurred.';
      }
      console.error('Error:', result.errors || 'An error occurred.');
    }
  } catch (err) {
    console.error(err);
    errorMessage.textContent = 'An error occurred on the server.';
  } finally {
    // Menyembunyikan loader dan mengubah teks tombol kembali ke normal
    submitButton.textContent = "Simpan User";
    loader.style.display = 'none';
  }
});


document.addEventListener("DOMContentLoaded", () => {
  if (!window.usersLoaded) { // Tambahkan flag untuk memastikan fetch hanya sekali
    loadUsers();
    window.usersLoaded = true;
  }
});

// Function to load users
async function loadUsers() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/users');
    const users = await response.json();
    const userTableBody = document.getElementById('user-table-body');
    userTableBody.innerHTML = '';

    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>
          <button class="edit" onclick="editUser(${user.id}, '${user.name}', '${user.email}', ${user.age})">Edit</button>
          <button class="delete" onclick="deleteUser(${user.id})">Hapus</button>
        </td>
      `;
      userTableBody.appendChild(row);
    });
  } catch (err) {
    console.error('Error loading users:', err);
    alert('Failed to load users.');
  }
}

// Function to edit a user
function editUser(id, name, email, age) {
    userIdInput.value = id;
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('age').value = age;
    document.querySelector('.modal-header').textContent = 'Edit User';
    modal.style.display = 'flex';
}

// Function to delete a user
async function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        loadUsers(); // Reload users after deletion
        alert('User deleted successfully!');
      } else {
        alert('Failed to delete user.');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('An error occurred while deleting the user.');
    }
  }
}
