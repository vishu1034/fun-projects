document.getElementById('calculateBtn').addEventListener('click', function() {
    const gstPercentage = parseFloat(document.getElementById('gstPercentage').value);
    const amountType = document.querySelector('input[name="amountType"]:checked').value;
    const amount = parseFloat(document.getElementById('amount').value);

    let excludingAmount, gstAmount, includingAmount;

    if (amountType === 'excluding') {
        excludingAmount = amount;
        gstAmount = (amount * gstPercentage) / 100;
        includingAmount = excludingAmount + gstAmount;
    } else {
        includingAmount = amount;
        gstAmount = (amount * gstPercentage) / (100 + gstPercentage);
        excludingAmount = includingAmount - gstAmount;
    }

    document.getElementById('excludingAmount').textContent = `Amount Excluding GST: ${excludingAmount.toFixed(2)}`;
    document.getElementById('gstAmount').textContent = `GST Amount: ${gstAmount.toFixed(2)}`;
    document.getElementById('includingAmount').textContent = `Amount Including GST: ${includingAmount.toFixed(2)}`;
});
