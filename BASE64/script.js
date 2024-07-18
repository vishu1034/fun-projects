document.getElementById('encodeButton').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    const encodingType = document.getElementById('encodingType').value;
    let encodedText;
    
    if (encodingType === 'base64') {
        encodedText = btoa(inputText);
    } else {
        encodedText = base64UrlEncode(inputText);
    }

    document.getElementById('outputText').value = encodedText;
});

document.getElementById('decodeButton').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    const encodingType = document.getElementById('encodingType').value;
    let decodedText;

    try {
        if (encodingType === 'base64') {
            decodedText = atob(inputText);
        } else {
            decodedText = base64UrlDecode(inputText);
        }
    } catch (error) {
        decodedText = 'Invalid input for decoding';
    }

    document.getElementById('outputText').value = decodedText;
});

function base64UrlEncode(str) {
    return btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

function base64UrlDecode(str) {
    str = str
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const padding = 4 - (str.length % 4);
    if (padding !== 4) {
        str += '='.repeat(padding);
    }
    return atob(str);
}
