document.addEventListener('DOMContentLoaded', async function () {
    const firebaseConfig = {
  apiKey: "AIzaSyBoEkN4gi9BfxuTS-LEPj-uaWFTtxLP_7o",
  authDomain: "textbookslistsjupeb2024.firebaseapp.com",
  projectId: "textbookslistsjupeb2024",
  storageBucket: "textbookslistsjupeb2024.appspot.com",
  messagingSenderId: "344742576480",
  appId: "1:344742576480:web:af7e6fc00270082fc5de05"
};
    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();

    const form = document.getElementById('myForm');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.querySelector('.close');
    const confirmBtn = document.getElementById('confirmBtn');
    const editBtn = document.getElementById('editBtn');
    const submitBtn = document.getElementById('submitBtn');

    let name, subjects, paymentMethod, amountPaid, fTime, fDate;

    confirmBtn.addEventListener('click', function () {
        const selectedSubjects = form.querySelectorAll('input[name="subject"]:checked');
        const selectedPayment = form.querySelector('input[name="payment"]:checked');

        if (selectedSubjects.length > 0 && selectedPayment) {
            if (form.reportValidity()) {
                name = form.elements['name'].value;
                subjects = Array.from(selectedSubjects).map(subject => subject.value);
                paymentMethod = selectedPayment.value;
                amountPaid = form.elements['amount'].value;
                const currentTime = new Date();
                fDate = currentTime.getDate() + '/' + (currentTime.getMonth() + 1) + '/' + currentTime.getFullYear();
                fTime = currentTime.getHours() + ':' + currentTime.getMinutes();

                document.getElementById('userName').textContent = `Name: ${name}`;
                document.getElementById('selectedSubjects').textContent = `Selected Subjects: ${subjects.join(', ')}`;
                document.getElementById('paymentMethod').textContent = `Payment Method: ${paymentMethod}`;
                document.getElementById('amountPaid').textContent = `Amount Paid: ${amountPaid} Naira`;

                overlay.style.display = 'block';
            }
        } else {
            alert('All fields are required.');
        }
    });

    closeBtn.addEventListener('click', function () {
        overlay.style.display = 'none';
    });

    editBtn.addEventListener('click', function () {
        overlay.style.display = 'none';
    });

    submitBtn.addEventListener('click', async function () {
        const res = {
            name: name,
            textbooks: subjects,
            method: paymentMethod,
            amount: amountPaid,
            time: fTime,
            date: fDate,
        };

        try {
            const docRef = await db.collection("data").add(res);
               window.location.href = "success.html";
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error Please try again later.");
        }
    });
});
