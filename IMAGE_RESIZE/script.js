document.getElementById('resizeType').addEventListener('change', function() {
    const resizeType = document.getElementById('resizeType').value;
    if (resizeType === 'dimensions') {
        document.getElementById('dimensionInputs').style.display = 'block';
        document.getElementById('percentageInput').style.display = 'none';
    } else {
        document.getElementById('dimensionInputs').style.display = 'none';
        document.getElementById('percentageInput').style.display = 'block';
    }
});

document.getElementById('resizeButton').addEventListener('click', function() {
    const fileInput = document.getElementById('imageInput');
    const resizeType = document.getElementById('resizeType').value;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    if (fileInput.files && fileInput.files[0]) {
        const img = new Image();
        img.onload = function() {
            let width, height;
            if (resizeType === 'dimensions') {
                width = parseInt(document.getElementById('width').value);
                height = parseInt(document.getElementById('height').value);
            } else {
                const percentage = parseInt(document.getElementById('percentage').value) / 100;
                width = img.width * percentage;
                height = img.height * percentage;
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            document.getElementById('downloadButton').style.display = 'block';
        };
        img.src = URL.createObjectURL(fileInput.files[0]);
    }
});

document.getElementById('downloadButton').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'resized-image.png';
    link.href = canvas.toDataURL();
    link.click();
});
