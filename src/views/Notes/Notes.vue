<script setup>
import { ref, reactive, onMounted } from "vue";
import { useTaskStore } from "../../stores/tasksStore";
import { useNotesStore } from "../../stores/noteStore";

const tasksStore = useTaskStore()
tasksStore.navTitle = 'Note Taking App'
tasksStore.colorClass = 'navbar-dark'
tasksStore.navStyle = '#efba1d'
const noteStore = useNotesStore()
const data = reactive({
    title: '',
    description: ''
})
const titleRef = ref(null)
const editNoteId = ref(null)
const showUpdateBtn = ref(false)

onMounted(() => {
    titleRef.value.focus()
})

const addNote = () => {
    noteStore.addNote(data)
    clearFields()
    titleRef.value.focus()
}

const clearFields = () => {
    data.title = ''
    data.description = ''
}

const handleEdit = (note) => {
    data.title = note.title
    data.description = note.description
    editNoteId.value = note.id
    showUpdateBtn.value = true
}

const updateNote = () => {
    noteStore.updateNote(editNoteId.value, data)
    showUpdateBtn.value = false
    clearFields()
}

const handleDelete = (id) => {
    noteStore.deleteNote(id)
}

</script>

<template>
    <div class="page-content container note-has-grid">
        <div class="card rounded my-3">
            <div class="card-body shadow-sm">
                <div class="d-flex flex-row align-items-center">
                    <div class="col notes-content">
                        <form @submit.prevent="addNote">
                            <div class="row">
                                <div class="col-md-5 mb-2">
                                    <input v-model="data.title" type="text" class="form-control" placeholder="Note title..."
                                        ref="titleRef" />
                                </div>
                                <div class="col-md-5">
                                    <textarea v-model="data.description" class="form-control"
                                        placeholder="Note description..." rows="2"></textarea>
                                </div>
                                <div class="col-md-2">
                                    <button v-if="!showUpdateBtn" type="submit" class="btn btn-primary">Add Note</button>
                                    <button v-if="showUpdateBtn" @click="updateNote" class="btn btn-primary"
                                        type="button">Update Note</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- <hr class="my-4"> -->
        <div class="note-has-grid row">
            <div v-for="note in noteStore.notes" :key="note.id"
                class="col-md-4 single-note-item all-category note-business">
                <div class="card card-body shadow mt-4 mb-2">
                    <span class="side-stick"></span>
                    <h5 class="note-title text-truncate w-75 mb-0">{{ note?.title }}</h5>
                    <p class="note-date font-12 text-muted">{{ note?.date }}</p>
                    <div class="note-content">
                        <p class="note-inner-content text-muted"> {{ note?.description }}</p>
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <span class="me-1" role="button" @click="handleEdit(note)"><font-awesome-icon icon="pen" /></span>
                        <span class="mr-1" role="button" @click="handleDelete(note.id)"><font-awesome-icon
                                icon="trash" /></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.card {
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    border: 0 solid transparent;
}

.note-has-grid .single-note-item .card {
    border-radius: 10px
}

.note-has-grid .single-note-item .side-stick {
    position: absolute;
    width: 3px;
    height: 35px;
    left: 0;
    background-color: rgba(82, 95, 127, .5)
}

.note-has-grid .single-note-item.note-business .point {
    color: rgba(44, 208, 126, .5)
}

.note-has-grid .single-note-item.note-business .side-stick {
    background-color: rgba(44, 208, 126, .5)
}
</style>