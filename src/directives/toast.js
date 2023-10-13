export const toast = {
    mounted(el) {
        const toast = document.addEventListener("DOMContentLoaded", function () {
            var btn = document.getElementById("liveToastBtn");
            var element = document.getElementById("liveToast");

            // Create toast instance
            var myToast = new bootstrap.Toast(element);

            btn.addEventListener("click", function () {
                myToast.show();
            });
        })
    }
}