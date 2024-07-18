document.addEventListener('DOMContentLoaded', () => {
    const totalInvestmentInput = document.getElementById('totalInvestment');
    const withdrawalPerMonthInput = document.getElementById('withdrawalPerMonth');
    const expectedReturnInput = document.getElementById('expectedReturn');
    const tenureInput = document.getElementById('tenure');
    const finalValueOutput = document.getElementById('finalValue');
    const expectedReturnValue = document.getElementById('expectedReturnValue');
    const tenureValue = document.getElementById('tenureValue');

    function calculateFinalValue() {
        const totalInvestment = parseFloat(totalInvestmentInput.value);
        const withdrawalPerMonth = parseFloat(withdrawalPerMonthInput.value);
        const expectedReturn = parseFloat(expectedReturnInput.value) / 100;
        const tenure = parseFloat(tenureInput.value) * 12;

        let finalValue = totalInvestment;
        const monthlyReturnRate = expectedReturn / 12;

        for (let i = 0; i < tenure; i++) {
            finalValue = finalValue * (1 + monthlyReturnRate) - withdrawalPerMonth;
        }

        finalValueOutput.textContent = finalValue.toFixed(2);
    }

    totalInvestmentInput.addEventListener('input', calculateFinalValue);
    withdrawalPerMonthInput.addEventListener('input', calculateFinalValue);
    expectedReturnInput.addEventListener('input', () => {
        expectedReturnValue.textContent = expectedReturnInput.value + '%';
        calculateFinalValue();
    });
    tenureInput.addEventListener('input', () => {
        tenureValue.textContent = tenureInput.value + ' Years';
        calculateFinalValue();
    });

    calculateFinalValue();
});
