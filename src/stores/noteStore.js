import { defineStore } from 'pinia'
import { useDateFormat } from '@vueuse/core'

export const useNotesStore = defineStore('notesStore', {
    state: () => {
        return {
            notes: []
        }
    },
    actions: {
        addNote(noteData) {
            let currentData = new Date().getTime()
            let date = useDateFormat(currentData, 'DD MMM, YYYY')
            let notes = this.notes
            let note = {
                id: Date.now(),
                title: noteData.title,
                description: noteData.description,
                date: date.value
            }
            notes.unshift(note)
            this.notes = notes
        },
        deleteNote(id) {
            this.notes = this.notes.filter(note => note.id !== id)
        },
        updateNote(id, updatedNote) {
            this.notes.forEach(note => {
                if (note.id == id) {
                    note.title = updatedNote.title
                    note.description = updatedNote.description
                }
            })
        },
        clearNotes() {
            this.notes = []
        },
    },
    getters: {
        getTotalNotes: (state) => {
            return state.notes.length
        }
    }
})