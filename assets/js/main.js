const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const form = document.querySelector("#contact-form");
const statusNode = document.querySelector("#form-status");

if (form && statusNode) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Honeypot: silently discard bot submissions
    if (form.querySelector("#_trap") && form.querySelector("#_trap").value) {
      return;
    }

    const endpoint = form.getAttribute("action");
    const submitBtn = form.querySelector("button[type='submit']");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    statusNode.textContent = "";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      });

      if (!response.ok) {
        throw new Error("Unable to send message");
      }

      form.reset();
      statusNode.textContent = "Thanks. Your message was sent successfully.";
      statusNode.style.color = "#0f7a4f";
    } catch (error) {
      statusNode.textContent = "There was a problem sending your message. Please try again or email directly.";
      statusNode.style.color = "#8d3d00";
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }
    }
  });
}
