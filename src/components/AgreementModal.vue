<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <h3>Agreement</h3>
        <button @click="closeModal" class="close-btn">✖</button>
      </div>
      <div class="modal-body">
        <p>{{ agreementMessage }}</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" @click="acceptAgreement">I Agree</button>
        <button class="btn btn-secondary" @click="closeModal" >Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isVisible = ref(true)
const agreementMessage = "By using this application, you agree to our Terms of Service and Privacy Policy."

// Close the modal
const closeModal = () => {
  isVisible.value = false
}

// Accept the agreement (you can add any action here)
const acceptAgreement = () => {
  isVisible.value = false
  // You can store user's agreement in localStorage or perform any action here
  localStorage.setItem('hasAgreed', 'true')
}
</script>

<style scoped>
/* Background overlay for the modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure it stays on top of other content */
}

/* Modal itself */
.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 10000; /* Ensure it's above the overlay */
  max-height: 80%;
  overflow-y: auto; /* Allow scroll if content is too long */
}

/* Header and close button */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Footer buttons */
.modal-footer {
  margin-top: 20px;
}

.modal-footer .btn {
  padding: 10px 20px;
  margin: 0 10px;
}

.btn-primary {
  background-color: #28a745;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.modal {
  padding: 10px 20px;
  border: 2px solid #a5272a;
  background: #faebd7;
  z-index: 2;
  display: block;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}

.modal__message {
  margin-top: 10px;
}

.modal__cancel {
  margin-right: 30px;
  font-size: 15px;
}

.modal__cancel:hover {
  cursor: pointer;
  color: rgb(14, 48, 240);
  font-weight: bold;
}

.modal__btn {
  display: inline-block;
  margin: 30px auto;
  text-decoration: none;
  width: 80px;
  height: 30px;
  text-decoration: none;
  color: #000000;
  border: solid 2px #a5272a;
  border-radius: 3px;
  transition: 0.4s;
  text-align: center;
  vertical-align: middle;
  font-size: 15px;
  background-color: #faebd7;
}

.modal__btn:hover {
  background: #a5272a;
  color: white;
  cursor: pointer;
}

#modal-overlay {
  z-index: 1;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  background-color: rgba(0, 0, 0, 0.75);
}
</style>

