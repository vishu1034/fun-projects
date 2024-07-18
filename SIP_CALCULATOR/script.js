document.querySelectorAll('input[name="investmentType"]').forEach(input => {
    input.addEventListener('change', function() {
        if (this.value === 'sip') {
            document.getElementById('sipInputs').style.display = 'block';
            document.getElementById('lumpsumInputs').style.display = 'none';
        } else {
            document.getElementById('sipInputs').style.display = 'none';
            document.getElementById('lumpsumInputs').style.display = 'block';
        }
    });
});

document.getElementById('expectedReturn').addEventListener('input', function() {
    document.getElementById('expectedReturnValue').textContent = this.value + '%';
});

document.getElementById('timePeriod').addEventListener('input', function() {
    document.getElementById('timePeriodValue').textContent = this.value + ' years';
});

function calculate() {
    const investmentType = document.querySelector('input[name="investmentType"]:checked').value;
    const expectedReturnRate = parseFloat(document.getElementById('expectedReturn').value) / 100;
    const timePeriod = parseFloat(document.getElementById('timePeriod').value);

    let investedAmount, estimatedReturns, totalValue;

    if (investmentType === 'sip') {
        const monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value);
        investedAmount = monthlyInvestment * timePeriod * 12;
        totalValue = monthlyInvestment * ((Math.pow(1 + expectedReturnRate / 12, timePeriod * 12) - 1) / (expectedReturnRate / 12)) * (1 + expectedReturnRate / 12);
        estimatedReturns = totalValue - investedAmount;
    } else {
        const totalInvestment = parseFloat(document.getElementById('totalInvestment').value);
        investedAmount = totalInvestment;
        totalValue = totalInvestment * Math.pow(1 + expectedReturnRate, timePeriod);
        estimatedReturns = totalValue - investedAmount;
    }

    document.getElementById('investedAmount').textContent = `₹ ${investedAmount.toFixed(2)}`;
    document.getElementById('estimatedReturns').textContent = `₹ ${estimatedReturns.toFixed(2)}`;
    document.getElementById('totalValue').textContent = `₹ ${totalValue.toFixed(2)}`;
}
