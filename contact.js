
document.addEventListener('DOMContentLoaded', function() {
    emailjs.init('YOUR_USER_ID'); // Replace with your EmailJS user ID

    const contactForm = document.querySelector('#contact form');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const serviceID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
        const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                alert('Sent!');
                contactForm.reset();
            }, (err) => {
                alert(JSON.stringify(err));
            });
    });
});
