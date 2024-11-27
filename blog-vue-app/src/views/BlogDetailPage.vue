<template>
  <div class="blog-detail">
    <img :src="blog?.image" alt="Blog Image" class="blog-detail__image" />
    <h1 class="blog-detail__title">{{ blog?.title }}</h1>
    <p class="blog-detail__meta">
      By @{{ blog?.author?.username }} | {{ formattedDate }}
    </p>
    <div class="blog-detail__description" v-html="blog?.content"></div>

    <CommentsSection :comments="blog?.comments || []" />
  </div>
</template>

<script setup>
import CommentsSection from "@/components/comments/CommentsSection.vue";

import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";

import { getBlog } from "@/services/blogService";
import { formatDate } from "@/utils/date";

const route = useRoute(); // Access route parameters
const blog = ref(null); // State to hold the blog details
const blogId = route.params.id; // Extract blog ID from route

const fetchBlogDetails = async () => {
  try {
    const response = await getBlog(blogId);
    blog.value = response;
  } catch (error) {
    console.error("Error fetching blog details:", error);
  }
};

const formattedDate = computed(() =>
  blog?.value?.date ? formatDate(blog?.value?.date) : ""
);

// Fetch the blog details when the component is mounted
onMounted(fetchBlogDetails);
</script>

<style scoped>
.blog-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
  background-color: #3a3939;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.blog-detail__image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
}

.blog-detail__title {
  font-size: 2rem;
  margin-bottom: 8px;
}

.blog-detail__meta {
  font-size: 0.9rem;
  color: #cccccc;
  margin-bottom: 16px;
}

.blog-detail__description {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 32px;
}

.comments {
  margin-top: 32px;
}

.comments__title {
  font-size: 1.5rem;
  margin-bottom: 16px;
}

.comments__list {
  margin-bottom: 16px;
}
</style>
