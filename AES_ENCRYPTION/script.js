async function encrypt() {
    const key = document.getElementById('key').value;
    const plaintext = document.getElementById('plaintext').value;
    const keyMaterial = await getKeyMaterial(key);
    const keyObj = await getKey(keyMaterial);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoder = new TextEncoder();
    const data = encoder.encode(plaintext);
    
    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        keyObj,
        data
    );
    
    const ciphertext = arrayBufferToBase64(iv) + arrayBufferToBase64(encrypted);
    document.getElementById('ciphertext').value = ciphertext;
}

async function decrypt() {
    const key = document.getElementById('key').value;
    const ciphertext = document.getElementById('ciphertext').value;
    const keyMaterial = await getKeyMaterial(key);
    const keyObj = await getKey(keyMaterial);
    const iv = base64ToArrayBuffer(ciphertext.slice(0, 16));
    const data = base64ToArrayBuffer(ciphertext.slice(16));
    
    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        keyObj,
        data
    );
    
    const decoder = new TextDecoder();
    const plaintext = decoder.decode(decrypted);
    document.getElementById('decryptedtext').value = plaintext;
}

async function getKeyMaterial(password) {
    const encoder = new TextEncoder();
    return window.crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        "PBKDF2",
        false,
        ["deriveBits", "deriveKey"]
    );
}

async function getKey(keyMaterial) {
    return window.crypto.subtle.deriveKey(
        {
            "name": "PBKDF2",
            "salt": new Uint8Array(16),
            "iterations": 100000,
            "hash": "SHA-256"
        },
        keyMaterial,
        { "name": "AES-GCM", "length": 256 },
        true,
        ["encrypt", "decrypt"]
    );
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
}

function base64ToArrayBuffer(base64) {
    let binaryString = window.atob(base64);
    let len = binaryString.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}
