const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const lettersCheckbox = document.getElementById('letters');
const mixedCaseCheckbox = document.getElementById('mixedCase');
const numbersCheckbox = document.getElementById('numbers');
const punctuationsCheckbox = document.getElementById('punctuations');
const generatedPassword = document.getElementById('generatedPassword');
const copyMessage = document.getElementById('copyMessage');
const regenerateButton = document.getElementById('regenerateButton');

const letters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const punctuations = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

function generatePassword() {
    let length = parseInt(lengthSlider.value);
    let charset = letters;

    if (mixedCaseCheckbox.checked) {
        charset += letters.toUpperCase();
    }
    if (numbersCheckbox.checked) {
        charset += numbers;
    }
    if (punctuationsCheckbox.checked) {
        charset += punctuations;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    generatedPassword.value = password;
}

function copyPassword() {
    generatedPassword.select();
    document.execCommand('copy');
    copyMessage.textContent = 'Password copied to clipboard!';
    setTimeout(() => {
        copyMessage.textContent = '';
    }, 2000);
}

regenerateButton.addEventListener('click', () => {
    generatePassword();
    copyMessage.textContent = ''; // Clear copy message if shown
});

lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
    generatePassword();
});

[mixedCaseCheckbox, numbersCheckbox, punctuationsCheckbox].forEach(checkbox => {
    checkbox.addEventListener('change', generatePassword);
});

// Generate initial password
generatePassword();
