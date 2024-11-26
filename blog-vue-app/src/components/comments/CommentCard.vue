<template>
  <div class="comment-card">
    <p class="comment-card__meta">
      <strong>@{{ comment.author }}</strong> | {{ comment.date }}
    </p>
    <p class="comment-card__text">{{ comment.text }}</p>

    <button
      v-if="authStore.userInfo.userName === comment.author"
      @click="editComment(index)"
      class="comments-list__edit"
    >
      Edit
    </button>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
  editComment: Function,
});
</script>

<style scoped>
.comment-card {
  padding: 12px 16px;
  border: 1px solid #5e5e5e;
  border-radius: 8px;
  margin-bottom: 12px;
  background-color: #1f1e1e;
}

.comment-card__meta {
  font-size: 0.85rem;
  color: #cccccc;
  margin-bottom: 8px;
}

.comment-card__text {
  font-size: 1rem;
  color: #c5c5c5;
}
</style>
