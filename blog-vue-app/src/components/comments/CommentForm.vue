<template>
  <form @submit.prevent="handleSubmit" class="comment-form">
    <h2>{{ isEditMode ? "Edit Comment" : "Add Comment" }}</h2>
    <textarea
      v-model="commentText"
      class="comment-form__textarea"
      placeholder="Write your comment here..."
      required
    ></textarea>
    <div class="comment-form__actions">
      <button type="submit" class="comment-form__button">
        {{ isEditMode ? "Update" : "Add" }} Comment
      </button>
      <button type="button" class="comment-form__cancel" @click="handleCancel">
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  initialCommentText: {
    type: String,
    default: "",
  },
  isEditMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit", "cancel"]);

const commentText = ref("");

const handleSubmit = () => {
  emit("submit", commentText.value);
  commentText.value = ""; // Clear the text after submission
};

const handleCancel = () => {
  emit("cancel");
};
</script>

<style scoped>
.comment-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comment-form__textarea {
  width: 100%;
  height: 100px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
}

.comment-form__actions {
  display: flex;
  justify-content: space-between;
}

.comment-form__button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.comment-form__button:hover {
  background-color: #0056b3;
}

.comment-form__cancel {
  padding: 8px 16px;
  background-color: #ddd;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.comment-form__cancel:hover {
  background-color: #bbb;
}
</style>
