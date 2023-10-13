export const tooltip = {
  mounted(el) {
    const tooltip = document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(tooltip => {
      new bootstrap.Tooltip(tooltip)
    })
  }
}