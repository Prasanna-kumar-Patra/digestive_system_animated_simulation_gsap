document.addEventListener("DOMContentLoaded", function () {
    const parts = document.querySelectorAll("#digestive-system div");

    parts.forEach(part => {
        part.addEventListener("click", function () {
            const partId = part.getAttribute("data-part");
            animatePart(partId);
        });
    });

    function animatePart(partId) {
        // Reset all parts
        gsap.to("#digestive-system div", { backgroundColor: "#fff", duration: 0.5 });

        switch (partId) {
            case "mouth":
                // Chewing animation
                gsap.timeline()
                    .to("#mouth", { duration: 0.2, scaleX: 1.2, scaleY: 0.8, repeat: 3, yoyo: true })  // Simulate chewing motion
                    .to("#mouth", { duration: 0.2, scaleX: 1, scaleY: 1 })  // Reset to original state
                    .add(swallow);  // Add swallowing animation
                break;
            case "esophagus":
                gsap.fromTo("#esophagus", { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
                break;
            case "stomach":
                gsap.timeline()
                    .fromTo("#stomach", { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
                    .add(releaseAcid);  // Add acid release animation
                break;
            case "liver":
                gsap.fromTo("#liver", { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
                break;
            case "pancreas":
                gsap.fromTo("#pancreas", { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
                break;
            case "intestines":
                gsap.fromTo("#intestines", { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
                break;
            case "large-intestine":
                gsap.fromTo("#large-intestine", { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
                break;
        }

        // Highlight the active part
        gsap.to(`#${partId}`, { backgroundColor: "#00FF00", duration: 0.5 });
    }

    function swallow() {
        // Position the food at the mouth
        const mouthRect = document.querySelector("#mouth").getBoundingClientRect();
        const food = document.querySelector("#food");

        food.style.left = `${mouthRect.left + mouthRect.width / 2 - 10}px`;
        food.style.top = `${mouthRect.top + mouthRect.height / 2 - 10}px`;
        food.style.display = "block";

        // Animate the food to the esophagus
        const esophagusRect = document.querySelector("#esophagus").getBoundingClientRect();
        gsap.to("#food", {
            duration: 1,
            left: `${esophagusRect.left + esophagusRect.width / 2 - 10}px`,
            top: `${esophagusRect.top + esophagusRect.height / 2 - 10}px`,
            onComplete: () => {
                food.style.display = "none";  // Hide the food after swallowing
            }
        });
    }

    function releaseAcid() {
        // Animate the acid release in the stomach
        gsap.fromTo("#acid", { height: "0%" }, { height: "50%", duration: 1, ease: "power2.out" });
    }
});
