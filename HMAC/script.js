document.getElementById('hashForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const plainText = document.getElementById('plainText').value;
    const secretKey = document.getElementById('secretKey').value;
    const hashFunction = document.getElementById('hashFunction').value;
    const outputFormat = document.getElementById('outputFormat').value;
    
    // Convert output format to lower case for compatibility with CryptoJS
    const format = outputFormat.toLowerCase();
    
    var hmac;
    if(hashFunction=="sha256"){
        hmac = CryptoJS.HmacSHA256(plainText, secretKey);
    }else{
        hmac = CryptoJS.HmacSHA512(plainText, secretKey);
    }
    
    let hashedOutput;
    if (format === 'hex') {
        hashedOutput = hmac.toString(CryptoJS.enc.Hex);
    } else if (format === 'base64') {
        hashedOutput = hmac.toString(CryptoJS.enc.Base64);
    } else {
        hashedOutput = 'Invalid output format';
    }
    
    // Display hashed output
    document.getElementById('hashedOutput').value = hashedOutput;
});
