<template>
  <div class="home">
    <h1 class="home__title">Welcome to Our Blog</h1>

    <!-- Date Filter -->
    <div class="home__filter">
      <label for="date">Filter by Date:</label>
      <input
        id="date"
        type="date"
        v-model="selectedDate"
        @change="filterBlogsByDate"
        class="home__date-picker"
      />
      <button @click="clearFilter" class="home__clear-button">
        Clear Filter
      </button>

      <button
        v-if="authStore.isAuthorized"
        @click="addBlog"
        class="home__add-blog-button"
      >
        Add Blog
      </button>
    </div>

    <!-- Blog List -->
    <div class="home__grid">
      <BlogCard v-for="blog in filteredBlogs" :key="blog.id" :blog="blog" />
    </div>
  </div>

  <!-- Add/Edit Blog Modal -->
  <ModalComponent :isOpen="isBlogFormModalOpen" @close="closeModal">
    <BlogForm @cancel="closeModal" />
  </ModalComponent>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import ModalComponent from "@/components/ModalComponent.vue";
import BlogCard from "@/components/blogs/BlogCard.vue";
import BlogForm from "@/components/blogs/BlogForm.vue";

import { useBlogStore } from "@/store/blogs";
import { useAuthStore } from "@/store/auth";
import { formatDate } from "@/utils/date";

const authStore = useAuthStore();
const blogStore = useBlogStore();

const { fetchBlogs } = blogStore;

// Fetch blogs when the component is mounted
onMounted(() => {
  fetchBlogs();
});

const selectedDate = ref("");
const isBlogFormModalOpen = ref(false);

// Filtered blogs
const filteredBlogs = computed(() => {
  if (!selectedDate.value) {
    return blogStore.blogs; // Show all blogs if no date is selected
  }
  return blogStore.blogs.filter((blog) => {
    const formatSelectedDate = formatDate(selectedDate.value);
    const formatBlogDate = formatDate(blog.date);

    return formatSelectedDate === formatBlogDate;
  });
});

// Methods
const filterBlogsByDate = () => {
  console.log(`Filtering blogs for date: ${selectedDate.value}`);
};

const clearFilter = () => {
  selectedDate.value = ""; // Reset the selected date
};

const addBlog = () => {
  isBlogFormModalOpen.value = true;
};

const closeModal = () => {
  isBlogFormModalOpen.value = false;
};
</script>

<style scoped>
.home {
  padding: 16px;
  background-color: #3a3939;
}

.home__title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 24px;
}

.home__filter {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.home__date-picker {
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.home__clear-button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.home__clear-button:hover {
  background-color: #0056b3;
}

.home__add-blog-button {
  padding: 8px 16px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.home__add-blog-button:hover {
  background-color: #000;
}

.home__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
</style>
