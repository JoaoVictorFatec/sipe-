document.addEventListener("DOMContentLoaded", function () {
    const app = document.querySelector(".app");
    const toggleButton = document.querySelector("#sidebar-toggle");

    if (!app || !toggleButton) {
        return;
    }

    const toggleIcon = toggleButton.querySelector("i");

    function updateSidebar() {
        const isCollapsed = app.classList.contains("sidebar-collapsed");

        toggleButton.setAttribute("aria-expanded", String(!isCollapsed));

        toggleButton.setAttribute(
            "aria-label",
            isCollapsed ? "Expandir menu" : "Minimizar menu"
        );

        toggleButton.setAttribute(
            "title",
            isCollapsed ? "Expandir menu" : "Minimizar menu"
        );

        if (toggleIcon) {
            toggleIcon.className = isCollapsed
                ? "ti ti-chevrons-right"
                : "ti ti-chevrons-left";
        }
    }

    toggleButton.addEventListener("click", function () {
        app.classList.toggle("sidebar-collapsed");
        updateSidebar();
    });

    updateSidebar();
});