document.addEventListener('DOMContentLoaded', () => {

    // Set the Web3Forms API key
    document.getElementById('web3forms-key').value = "4eb5f853-1c13-407b-bf7b-b3da0f1e8882";


    const form = document.getElementById('contact-form');
    const modal = document.getElementById('myModal');
    const modalMessage = document.getElementById('modal-message');
    const dropdownIcon = document.getElementById('dropdown-icon');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const solutionDisplay = document.getElementById('solution-display');
    const solutionInput = document.getElementById('solution');
    const contactNumberInput = document.getElementById('contactNumber');
    const errors = {
        name: document.getElementById('error-name'),
        email: document.getElementById('error-email'),
        contactNumber: document.getElementById('error-contactNumber'),
        companyName: document.getElementById('error-companyName'),
        solution: document.getElementById('error-solution')
    };

    const validate = (formData) => {
        let tempErrors = {};
        let isValid = true;

        if (!formData.name) {
            tempErrors["name"] = "Name is required";
            isValid = false;
        } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
            tempErrors["name"] = "Please enter only alphabetic characters";
            isValid = false;
        }
        if (!formData.email) {
            tempErrors["email"] = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors["email"] = "Email is invalid";
            isValid = false;
        }
        if (!formData.contactNumber) {
            tempErrors["contactNumber"] = "Contact Number is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(formData.contactNumber)) {
            tempErrors["contactNumber"] = "Please enter a 10-digit numeric value";
            isValid = false;
        }
        if (!formData.companyName) {
            tempErrors["companyName"] = "Company Name is required";
            isValid = false;
        }
        if (!formData.solution) {
            tempErrors["solution"] = "Solution is required";
            isValid = false;
        }
        return { isValid, tempErrors };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: form.name.value,
            email: form.email.value,
            contactNumber: form.contactNumber.value,
            companyName: form.companyName.value,
            solution: solutionInput.value
        };

        const { isValid, tempErrors } = validate(formData);

        for (const key in errors) {
            errors[key].textContent = tempErrors[key] || '';
        }

        if (isValid) {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form)
            });

            if (response.ok) {
                // Show modal instead of text message
                modal.style.display = "block";

                // Auto close modal after 5 seconds
                setTimeout(() => {
                    modal.style.display = "none";
                }, 3000);

                // Optionally, reset form fields and hide dropdown menu here
                form.reset();
                solutionInput.value = '';
                solutionDisplay.value = '';
            } else {
                // Handle error case if needed
                console.error('Failed to submit form');
            }
        }
    };

    form.addEventListener('submit', handleSubmit);

    dropdownIcon.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
        dropdownIcon.classList.toggle('rotate-180');
    });

    dropdownMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const selectedSolution = e.target.textContent.trim();
            solutionDisplay.value = selectedSolution;
            solutionInput.value = selectedSolution;
            dropdownMenu.classList.add('hidden');
            dropdownIcon.classList.remove('rotate-180');
        }
    });

    contactNumberInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    // Modal close functionality
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});