import { defineStore } from 'pinia'

export const useToastStore = defineStore('toastStore', {
    state: () => { },
    actions: {
        showToast(msg) {
            var element = document.getElementById('liveToast');
            element.childNodes[1].innerText = msg
            var myToast = new bootstrap.Toast(element);
            myToast.show();
        }
    }
})
