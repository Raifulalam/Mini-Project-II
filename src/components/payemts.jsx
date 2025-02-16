import React, { useState } from 'react';

const EsewaPaymentForm = () => {
    const [amount, setAmount] = useState(500);
    const [taxAmount, setTaxAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(500);
    const [transactionUuid, setTransactionUuid] = useState('67b05ac554d5b5bea45cbf92');
    const [productCode, setProductCode] = useState('EPAYTEST');
    const [productServiceCharge, setProductServiceCharge] = useState(0);
    const [productDeliveryCharge, setProductDeliveryCharge] = useState(0);
    const [successUrl, setSuccessUrl] = useState('http://localhost:3001/complete-payment');
    const [failureUrl, setFailureUrl] = useState('https://developer.esewa.com.np/failure');
    const [signedFieldNames, setSignedFieldNames] = useState('total_amount,transaction_uuid,product_code');

    // Predefined signature you provided
    const signature = 'ZrdIB782lAH5880/Nu2KGKGvn6j+Xq52ho0Plb1yGzQ=';
    const secret = '8gBm/:&EnhH.1/q';

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // You could perform further validation here if needed

        // Now, submit the form with the predefined signature
        document.getElementById('esewa-form').submit();
    };

    return (
        <div>
            <h2>eSewa Payment Form</h2>
            <form
                id="esewa-form"
                action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                method="POST"
                target="_blank"
            >
                <table>
                    <tbody>
                        <tr>
                            <td><strong>Amount:</strong></td>
                            <td>
                                <input
                                    type="text"
                                    name="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Tax Amount:</strong></td>
                            <td>
                                <input
                                    type="text"
                                    name="tax_amount"
                                    value={taxAmount}
                                    onChange={(e) => setTaxAmount(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Total Amount:</strong></td>
                            <td>
                                <input
                                    type="text"
                                    name="total_amount"
                                    value={totalAmount}
                                    onChange={(e) => setTotalAmount(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Transaction UUID (Item Purchase ID):</strong></td>
                            <td>
                                <input
                                    type="text"
                                    name="transaction_uuid"
                                    value={transactionUuid}
                                    onChange={(e) => setTransactionUuid(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Product Code:</strong></td>
                            <td>
                                <input
                                    type="text"
                                    name="product_code"
                                    value={productCode}
                                    onChange={(e) => setProductCode(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Product Service Charge:</strong></td>
                            <td>
                                <input
                                    type="text"
                                    name="product_service_charge"
                                    value={productServiceCharge}
                                    onChange={(e) => setProductServiceCharge(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Product Delivery Charge:</strong></td>
                            <td>
                                <input
                                    type="text"
                                    name="product_delivery_charge"
                                    value={productDeliveryCharge}
                                    onChange={(e) => setProductDeliveryCharge(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Success URL:</strong></td>
                            <td>
                                <input
                                    type="text"
                                    name="success_url"
                                    value={successUrl}
                                    onChange={(e) => setSuccessUrl(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Failure URL:</strong></td>
                            <td>
                                <input
                                    type="text"
                                    name="failure_url"
                                    value={failureUrl}
                                    onChange={(e) => setFailureUrl(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Signed Field Names:</strong></td>
                            <td>
                                <input
                                    type="text"
                                    name="signed_field_names"
                                    value={signedFieldNames}
                                    onChange={(e) => setSignedFieldNames(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Signature:</strong></td>
                            <td>
                                <input
                                    type="text"
                                    name="signature"
                                    value={signature} // Use your provided signature here
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Secret Key:</strong></td>
                            <td>
                                <input
                                    type="text"
                                    name="secret"
                                    value={secret}
                                    onChange={(e) => setSecret(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button
                    type="submit"
                    style={{
                        display: 'block',
                        backgroundColor: '#60bb46',
                        color: '#fff',
                        padding: '5px 10px',
                        border: 'none',
                    }}
                    onClick={handleSubmit} // Trigger the form submission when the button is clicked
                >
                    Pay with eSewa
                </button>
            </form>
        </div>
    );
};

export default EsewaPaymentForm;
