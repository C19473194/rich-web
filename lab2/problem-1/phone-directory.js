
let contacts = [];
function addContact() {
    const name = document.getElementById('name').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const email = document.getElementById('email').value.trim();

    // Get the error div and reset its content
    const errorDiv = document.getElementById('error');
    errorDiv.innerText = '';
	
	// Check if any of the input fields are empty
    if (name === '' || mobile === '' || email === '') {
        errorDiv.innerText = 'All fields are required. Please fill in all the fields.';
        return;
    }

    if (!/^[a-zA-Z\s]{1,20}$/.test(name)) {
        errorDiv.innerText = 'Name should contain only alphabets and spaces (1-20 characters).';
        return;
    }

    if (!/^\d{10}$/.test(mobile)) {
        errorDiv.innerText = 'Mobile should contain 10 digits.';
        return;
    }

    if (!/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email) || email.length > 40) {
        errorDiv.innerText = 'Invalid email format or email is too long (max 40 characters).';
        return;
    }

    contacts.push({ name, mobile, email });
	
    updateTable();
    document.getElementById('name').value = '';
    document.getElementById('mobile').value = '';
    document.getElementById('email').value = '';
}
function updateTable() {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const row = contactList.insertRow(-1);

        // Create cells for each contact property (name, mobile, email)
        const nameCell = row.insertCell(0);
        const mobileCell = row.insertCell(1);
        const emailCell = row.insertCell(2);

        nameCell.innerText = contact.name;
        mobileCell.innerText = contact.mobile;
        emailCell.innerText = contact.email;

        if (i % 2 !== 0) {
            row.style.backgroundColor = '#f2f2f2';
        }
    }
}



let sortOrder = 1; // 1 for ascending, -1 for descending
function sortTable(column) {
    contacts.sort((a, b) => {
        if (a.name < b.name) return -sortOrder;
        if (a.name > b.name) return sortOrder;
        return 0;
    });
    sortOrder = -sortOrder; // Toggle sorting order
    updateTable();
}
function filterContacts() {
    const searchTerm = document.getElementById('search').value.trim();
    const filteredContacts = contacts.filter(contact => contact.mobile.includes(searchTerm));

    updateTable();

    const noResultDiv = document.getElementById('noResult');
    noResultDiv.style.display = (searchTerm && filteredContacts.length === 0) ? 'block' : 'none';
}
