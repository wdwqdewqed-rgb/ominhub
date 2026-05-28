function setupTicketForm() {

    const submitButton =
        document.getElementById('submit-ticket');

    if (!submitButton) return;

    submitButton.addEventListener('click', function () {

        const category =
            document.getElementById('ticket-category').value;

        const subject =
            document.getElementById('ticket-subject').value.trim();

        const description =
            document.getElementById('ticket-description').value.trim();

        if (!category) {
            alert('Select category');
            return;
        }

        if (!subject) {
            alert('Enter subject');
            return;
        }

        if (!description || description.length < 20) {
            alert('Description too short');
            return;
        }

        alert('Ticket submitted');

    });
}

export const SupportTicketForm = {
    setupTicketForm
};