<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link to="/" class="breadcrumb-link">Home</router-link>
      </li>
      <li class="breadcrumb-item active" aria-current="page">Your Dashboard</li>
     <!--   <li class="breadcrumb-item active" aria-current="page">{{ $t('dashboard') }}</li> -->
    </ol>
  </nav>
</template>

<script setup>
// You can customize breadcrumb items dynamically if needed.
</script>

<style scoped>
/* General Styles for Breadcrumb */
.breadcrumb {
  background-color: #f8f9fa; /* Light background */
  padding: 12px 24px; /* More padding for a modern feel */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Soft shadow */
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

/* Breadcrumb items styles */
.breadcrumb-item {
  margin: 0 8px;
  font-size: 16px;
  color: #495057; /* Dark gray for the items */
}

/* Style for the separator */
.breadcrumb-item + .breadcrumb-item::before {
  content: ">";
  color: #6c757d;  /* Subtle color for the separator */
  margin: 0 8px;
}

/* Styles for active breadcrumb item (non-clickable) */
.breadcrumb-item.active {
  color: #007bff; /* Highlight active item with blue color */
  font-weight: bold; /* Make active item bold */
}

/* Styling for router-link */
.breadcrumb-link {
  text-decoration: none;
  color: #007bff; /* Blue color for links */
  font-weight: normal; /* Make non-active links normal */
  transition: color 0.3s ease;
}

/* Hover Effect for Links */
.breadcrumb-link:hover {
  color: #0056b3; /* Darker blue on hover */
  text-decoration: underline; /* Underline on hover */
}

/* Responsive Design for Mobile */
@media (max-width: 576px) {
  .breadcrumb {
    padding: 8px 16px;
  }

  .breadcrumb-item {
    font-size: 14px;
  }
}
</style>
