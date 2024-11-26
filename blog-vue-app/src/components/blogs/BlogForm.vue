<template>
  <form @submit.prevent="handleSubmit" class="blog-form">
    <h2>{{ isEditMode ? "Edit Blog" : "Add Blog" }}</h2>

    <!-- Title Field -->
    <div class="blog-form__field">
      <label for="title">Title</label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        required
        placeholder="Enter the blog title"
      />
    </div>

    <!-- Main Image Field -->
    <div class="blog-form__field">
      <label for="image">Main Image</label>
      <input id="image" type="file" @change="handleFileUpload" />
      <div v-if="previewImage" class="blog-form__preview">
        <img :src="previewImage" alt="Preview" />
      </div>
    </div>

    <!-- Date Field -->
    <div class="blog-form__field">
      <label for="date">{{ isEditMode ? "New Date" : "Date" }}</label>

      <input id="date" v-model="currentTime" type="text" required readonly />
    </div>

    <!-- Author Field -->
    <div class="blog-form__field">
      <label for="author">Author</label>
      <input
        id="author"
        v-model="authStore.userInfo.userName"
        type="text"
        readonly
      />
    </div>

    <!-- Description Field (TinyMCE) -->
    <div class="blog-form__field">
      <label for="description">Description</label>
      <Editor
        id="description"
        v-model="form.description"
        api-key="cu12804kqlw4r83mhl7tuvn2ooiwoe3m7ecvs8e1upzy5rp3"
        :init="tinymceOptions"
      />
    </div>

    <!-- Submit Button -->
    <div class="blog-form__actions">
      <button type="submit" class="blog-form__button">
        {{ isEditMode ? "Update Blog" : "Add Blog" }}
      </button>
      <button type="button" class="blog-form__cancel" @click="cancel">
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";
import Editor from "@tinymce/tinymce-vue";

import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const props = defineProps({
  initialBlog: {
    type: Object,
    default: () => ({
      title: "",
      image: null,
      date: "",
      author: "",
      description: "",
    }),
  },
  isEditMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit", "cancel"]);

// Form state
const form = ref({ ...props.initialBlog });

// Preview image for main image
const previewImage = ref(form.value.image || null);

// TinyMCE options
const tinymceOptions = {
  height: 300,
  menubar: false,
  plugins: "link image code",
  skin: "oxide-dark", // Dark mode skin
  toolbar:
    "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image | code",
};

// Handle file upload for the main image
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      previewImage.value = reader.result;
      form.value.image = reader.result; // Store as Base64 or pass the file to backend logic
    };
    reader.readAsDataURL(file);
  }
};

const getCurrentDateTime = () => {
  const now = new Date();
  return now.toLocaleString(); // Returns a readable date-time string
};

const currentTime = getCurrentDateTime();

// Handle form submission
const handleSubmit = () => {
  emit("cancel");
};

// Handle cancel button
const cancel = () => {
  emit("cancel");
};
</script>

<style scoped>
.blog-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;

  overflow-y: auto;
  max-height: 90vh;
}

.blog-form__field label {
  font-weight: bold;
}

.blog-form__field input,
.blog-form__field textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #5e5e5e;
  border-radius: 4px;
  outline: none;
}

.blog-form__preview img {
  max-width: 100%;
  margin-top: 10px;
  border-radius: 4px;
}

.blog-form__actions {
  display: flex;
  justify-content: space-between;
}

.blog-form__button {
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.blog-form__button:hover {
  background-color: #0056b3;
}

.blog-form__cancel {
  padding: 10px 16px;
  background-color: #ddd;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.blog-form__cancel:hover {
  background-color: #bbb;
}
</style>
