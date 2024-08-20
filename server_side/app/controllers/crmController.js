const CRM = [];

const getCRMData = (req, res) => {
    // Responding with success or failure
    res.status(200).json(CRM);
};

const logPayment = (data) => {
    const {
        userId,
        gifId,
        amount,
        currency,
        paymentStatus,
        paymentDate,
        errorMessage
    } = data;

    // Perform CRM logging logic here
    console.log(
        `Logging payment in CRM: ${paymentStatus} - ${amount} ${currency}`
    );

    CRM.push(data);
};

module.exports = { getCRMData, logPayment };
