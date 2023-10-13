<template>
    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="liveToast" class="toast bg-success text-white" role="alert" aria-live="assertive" aria-atomic="true"
            data-bs-delay="1500">
            <div class="toast-header bg-success text-white">
                <font-awesome-icon icon="check" />
                <strong class="me-auto mx-2">Success</strong>
                <small>Just now</small>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body"> </div>
        </div>
    </div>
</template>