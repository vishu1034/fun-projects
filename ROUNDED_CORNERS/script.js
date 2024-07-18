document.addEventListener('DOMContentLoaded', function() {
    const imageUpload = document.getElementById('imageUpload');
    const borderRadius = document.getElementById('borderRadius');
    const radiusValue = document.getElementById('radiusValue');
    const generateBtn = document.getElementById('generateBtn');
    const imagePreview = document.getElementById('imagePreview');
    const downloadLink = document.getElementById('downloadLink');

    let selectedImage = null;

    imageUpload.addEventListener('change', function(e) {
        selectedImage = e.target.files[0];
        showImagePreview();
    });

    borderRadius.addEventListener('input', function() {
        radiusValue.textContent = borderRadius.value;
        showImagePreview();
    });

    generateBtn.addEventListener('click', function() {
        if (selectedImage) {
            generateRoundedImage();
        } else {
            alert('Please select an image first.');
        }
    });

    function showImagePreview() {
        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="Selected Image">`;
            };
            reader.readAsDataURL(selectedImage);
        }
    }

    function generateRoundedImage() {
        const radius = `${borderRadius.value}px`;
        const img = imagePreview.querySelector('img');
        img.style.borderRadius = radius;
    
        imagePreview.style.backgroundColor = 'transparent';
        imagePreview.style.padding = '0';
        imagePreview.style.border = 'none';
    
        html2canvas(imagePreview, {
            allowTaint: true,
            backgroundColor: null,
            scale: window.devicePixelRatio
        }).then(canvas => {
            imagePreview.style.backgroundColor = ''; 
            imagePreview.style.padding = '';
            imagePreview.style.border = '';
    
            canvas.toBlob(function(blob) {
                const url = URL.createObjectURL(blob);
                downloadLink.href = url;
                downloadLink.style.display = 'block';
            }, 'image/png');
        });
    }
    
});
