<template>
  <div class="comment-card">
    <p class="comment-card__meta">
      <strong>@{{ comment.author.username }}</strong> | {{ formattedDate }}
    </p>
    <p class="comment-card__text">{{ comment.text }}</p>

    <button
      v-if="authStore.userInfo?.username === comment.author.username"
      @click="editComment(index)"
      class="comments-list__edit"
    >
      Edit
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/store/auth";
import { formatDate } from "@/utils/date";

const authStore = useAuthStore();

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
  editComment: Function,
});

const formattedDate = computed(() => formatDate(props?.comment?.date));
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
