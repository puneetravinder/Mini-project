import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => {
    return {
      tasks: [
        {
          id: '1',
          content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus velit labore distinctio. Animi exercitationem error magni quis non quas ullam soluta, architecto esse in rem reiciendis tempore! Debitis, beatae saepe?`,
          completeStatus: false
        },
        {
          id: '2',
          content: 'This is just a demo task content',
          completeStatus: false
        },
        {
          id: '3',
          content: 'Demo task content to check if the state is working fine or not',
          completeStatus: false
        },
        {
          id: '4',
          content: 'Task mark as completed by user',
          completeStatus: true
        }
      ],
      navTitle: 'Vue Mini Projects',
      colorClass: 'navbar-dark bg-primary',
      navStyle: 'rgb(176 218 248)',
      btnClass: 'btn-danger'
    }
  },
  actions: {
    addTask(taskData) {
      let currentData = new Date().getTime()
      let task = {
        id: currentData.toString(),
        content: taskData,
        completeStatus: false
      }
      this.tasks.unshift(task)
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id)
    },
    updateTask(id, taskContent) {
      this.tasks.forEach(task => {
        if (task.id === id) {
          task.content = taskContent
        }
      })
    },
    markAsComplete(id) {
      this.tasks.forEach(task => {
        if (task.id === id) {
          task.completeStatus = true
        }
      })
    }

  },
  getters: {
    getTaskContent: (state) => {
      return (id) => {
        return state.tasks.filter(task => task.id === id)[0].content
      }
    }
  }
})
