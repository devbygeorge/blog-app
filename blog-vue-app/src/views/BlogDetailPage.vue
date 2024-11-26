<template>
  <div class="blog-detail">
    <img :src="blog.image" alt="Blog Image" class="blog-detail__image" />
    <h1 class="blog-detail__title">{{ blog.title }}</h1>
    <p class="blog-detail__meta">By @{{ blog.author }} | {{ blog.date }}</p>
    <div class="blog-detail__description" v-html="blog.description"></div>

    <CommentsSection :comments="blog.comments" />
  </div>
</template>

<script setup>
import CommentsSection from "@/components/comments/CommentsSection.vue";

const blog = {
  id: 1,
  title: "Understanding Vue 3 Composition API",
  description: `
    <p>The Vue 3 Composition API is a powerful addition to the Vue ecosystem, enabling better reuse of logic and flexibility in writing components.</p>
    <p>This blog post covers the basics and advanced features of the Composition API.</p>
  `,
  image: "/blogs/image-1.png",
  date: "2024-11-26",
  author: "johndoe",
  comments: [
    {
      id: 1,
      author: "janesmith",
      date: "2024-11-27",
      text: "Great article! I found the examples really helpful.",
    },
    {
      id: 2,
      author: "emilydavis",
      date: "2024-11-27",
      text: "Thanks for sharing. The Composition API has truly made my workflow more efficient.",
    },
    {
      id: 3,
      author: "johndoe",
      date: "2024-11-27",
      text: "Thanks you. Very useful information.",
    },
  ],
};
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
