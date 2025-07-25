// Show the form only after video ends
const video = document.getElementById("video");
const formSection = document.getElementById("formSection");

video.addEventListener("ended", function () {
  alert("Video completed! Now you can fill the form.");
  formSection.style.display = "block";
});

// Handle form submission and generate certificate
document.getElementById("certificateForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = e.target.name.value.trim();
  const phone = e.target.phone.value.trim();
  const photoInput = e.target.photo;

  // Phone validation already handled in HTML pattern, but can be checked again
  if (!/^\d{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  if (!photoInput.files || photoInput.files.length === 0) {
    alert("Please upload or capture your image.");
    return;
  }

  const canvas = document.getElementById("certificateCanvas");
  const ctx = canvas.getContext("2d");
  const background = new Image();
  background.src = "assets/certificate-template.png";

  background.onload = function () {
    // Load uploaded photo as image
    const photoFile = photoInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const userImage = new Image();
      userImage.src = event.target.result;

      userImage.onload = function () {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Draw user image on canvas (resize as needed)
        ctx.drawImage(userImage, 600, 100, 100, 100); // adjust position & size as needed

        // Add Name and Phone to certificate
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(name, 250, 250);
        ctx.fillText(phone, 250, 300);

        // Show canvas and auto-download
        canvas.style.display = "block";
        const link = document.createElement('a');
        link.download = "certificate.png";
        link.href = canvas.toDataURL();
        link.click();
      };
    };

    reader.readAsDataURL(photoFile);
  };
});
