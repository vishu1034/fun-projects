document.getElementById('convertButton').addEventListener('click', () => {
    const inputType = document.getElementById('inputType').value;
    const outputType = document.getElementById('outputType').value;
    const inputColor = document.getElementById('inputColor').value.trim();
    
    let color = w3color(inputColor);
    
    let convertedColor;
    switch (outputType) {
        case 'hex':
            convertedColor = color.toHexString();
            break;
        case 'rgb':
            convertedColor = color.toRgbString();
            break;
        case 'hsl':
            convertedColor = color.toHslString();
            break;
        case 'hwb':
            convertedColor = color.toHwbString();
            break;
        case 'cmyk':
            convertedColor = color.toCmykString();
            break;
        case 'ncol':
            convertedColor = color.toNcolString();
            break;
        default:
            convertedColor = 'Invalid output type';
    }
    
    document.getElementById('outputColor').value = convertedColor;
});
