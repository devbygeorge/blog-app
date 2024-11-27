<template>
  <div class="blog-card">
    <img :src="blog.image" alt="Blog Image" class="blog-card__image" />
    <div class="blog-card__content">
      <h2 class="blog-card__title">{{ blog.title }}</h2>
      <p class="blog-card__description">{{ blog.description }}</p>
      <p class="blog-card__meta">By @{{ blog.author }} | {{ blog.date }}</p>

      <div class="blog-card__buttons">
        <button class="blog-card__button" @click="viewBlog(blog.id)">
          Read More
        </button>

        <button
          v-if="authStore.userInfo?.username === blog.author"
          class="blog-card__edit-button"
          @click="editBlog(blog)"
        >
          Edit Blog
        </button>
      </div>
    </div>
  </div>

  <!-- Modal to edit blogs -->
  <ModalComponent :isOpen="isModalOpen" @close="closeModal">
    <BlogForm
      :initialBlog="editingBlog"
      :isEditMode="true"
      @cancel="closeModal"
    />
  </ModalComponent>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import ModalComponent from "@/components/ModalComponent.vue";
import BlogForm from "@/components/blogs/BlogForm.vue";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const isModalOpen = ref(false);
const editingBlog = ref({
  title: "",
  image: "",
  description: "",
});

const props = defineProps({
  blog: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const viewBlog = (id) => {
  router.push(`/blog/${id}`);
};

const editBlog = (blog) => {
  editingBlog.value = { ...blog };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<style scoped>
.blog-card {
  display: flex;
  flex-direction: column;
  background-color: #1f1e1e;
  border: 1px solid #5e5e5e;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.blog-card:hover {
  transform: translateY(-5px);
}

.blog-card__image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.blog-card__content {
  padding: 16px;
}

.blog-card__title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.blog-card__description {
  font-size: 0.95rem;
  color: #c5c5c5;
  margin-bottom: 12px;
}

.blog-card__meta {
  font-size: 0.85rem;
  color: #cccccc;
  margin-bottom: 16px;
}

.blog-card__buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.blog-card__button {
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.blog-card__button:hover {
  background-color: #0056b3;
}

.blog-card__edit-button {
  padding: 8px 16px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.blog-card__edit-button:hover {
  background-color: #000;
}
</style>
