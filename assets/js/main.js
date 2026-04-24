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

    // Honeypot handled by Formspree's '_gotcha' field; nothing to check here.

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

      if (response.ok) {
        form.reset();
        statusNode.textContent = "Thanks. Your message was sent successfully.";
        statusNode.style.color = "#0f7a4f";
      } else {
        let msg = "There was a problem sending your message. Please try again.";
        try {
          const data = await response.json();
          if (data && data.errors) {
            msg = data.errors.map((e) => e.message).join(" ");
          }
        } catch (_) { /* non-JSON response, keep default msg */ }
        // 403 typically means the form hasn't been activated in Formspree yet,
        // or this origin isn't in the allowed list.
        if (response.status === 403) {
          msg = "Form submission was blocked. Please ensure the Formspree form is activated and this site's URL is added to allowed origins in your Formspree dashboard.";
        }
        statusNode.textContent = msg;
        statusNode.style.color = "#8d3d00";
      }
    } catch (error) {
      // Network error or CORS rejection (e.g. testing from file://)
      statusNode.textContent = "Could not reach the form service. If testing locally, please use the deployed site URL instead.";
      statusNode.style.color = "#8d3d00";
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }
    }
  });
}
