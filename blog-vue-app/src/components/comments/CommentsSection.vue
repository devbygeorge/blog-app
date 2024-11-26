<template>
  <div>
    <h2>Comments</h2>

    <!-- Comments List -->
    <div v-if="comments.length" class="comments-list">
      <CommentCard
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :editComment="editComment"
      />
    </div>
    <p v-else>No comments yet. Be the first to comment!</p>

    <!-- Add Comment Button -->
    <button
      v-if="authStore.isAuthorized"
      @click="openAddComment"
      class="comments-list__add"
    >
      Add Comment
    </button>

    <!-- Comment Form Modal -->
    <ModalComponent :isOpen="isModalOpen" @close="closeModal">
      <CommentForm
        :initialCommentText="editingCommentText"
        :isEditMode="isEditing"
        @submit="handleCommentSubmit"
        @cancel="closeModal"
      />
    </ModalComponent>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ModalComponent from "@/components/ModalComponent.vue";
import CommentForm from "@/components/comments/CommentForm.vue";
import CommentCard from "@/components/comments/CommentCard.vue";

import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const props = defineProps({
  comments: {
    type: Array,
    required: true,
  },
});

// Modal state
const isModalOpen = ref(false);

// Editing state
const isEditing = ref(false);
const editingIndex = ref(null);
const editingCommentText = ref("");

// Open Add Comment Modal
const openAddComment = () => {
  isEditing.value = false;
  editingCommentText.value = "";
  isModalOpen.value = true;
};

// Open Edit Comment Modal
const editComment = (index) => {
  isEditing.value = true;
  editingIndex.value = index;
  // editingCommentText.value = comments.text[index];
  isModalOpen.value = true;
};

// Handle Submit (Add/Edit Comment)
const handleCommentSubmit = (text) => {
  closeModal();
};

// Close Modal
const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<style scoped>
.comments-list {
  margin-bottom: 16px;
}

.comments-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.comments-list__edit {
  padding: 4px 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.comments-list__edit:hover {
  background-color: #0056b3;
}

.comments-list__add {
  align-self: flex-end;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.comment-list__add:hover {
  background-color: #0056b3;
}
</style>
