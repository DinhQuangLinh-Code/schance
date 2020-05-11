export function Message(props) {
    return `<html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <style>
                span {
                    display: inline-block;
                    width: 80px;
                }
                table {
                    border-collapse: collapse;
                }
                th {
                    background: #ccc;
                }
                th, td {
                    border: 1px solid #000;
                    padding: 3px 10px;
                }
            </style>
        </head>
        <body style="width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0;">
            <div>
                <div>
                    <h2>${props.lang.send_mail_order.title}</h2>
                    <p><span>${props.lang.send_mail_order.orderNo}</span>: <b style='text-transform: uppercase'>${props.orderNo}</b></p>
                    <p><span>${props.lang.send_mail_order.name}</span>: <b>${props.address.userName}</b></p>
                    <p><span>${props.lang.send_mail_order.address}</span>: <b>${props.address.address}</b></p>
                    <p><span>${props.lang.send_mail_order.tel}</span>: <b>${props.address.phone}</b></p>
                    <p><span>${props.lang.send_mail_order.payment.title}</span>: <b>${props.payment === 1 
                        ? props.lang.send_mail_order.payment.pm_1
                        : props.lang.send_mail_order.payment.pm_2}</b></p>
                </div>
                <table>
                    <tr>
                        <th>${props.lang.send_mail_order.list_product.stt}</th>
                        <th>${props.lang.send_mail_order.list_product.name}</th>
                        <th>${props.lang.send_mail_order.list_product.price}</th>
                        <th>${props.lang.send_mail_order.list_product.quantity}</th>
                        <th>${props.lang.send_mail_order.list_product.into_money}</th>
                        <th>${props.lang.send_mail_order.list_product.donate}</th>
                    </tr>
                    ${props.listProduct.split('>,').join('>')}
                    <tr>
                        <td style='border-color: transparent'></td>
                        <td style='border-color: transparent'></td>
                        <td style='border-bottom: none'></td>
                        <th>${props.lang.send_mail_order.list_product.total}</th>
                        <td style='text-align: right'>
                            ${new Intl.NumberFormat('en-GB', {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            }).format(props.totalPrice)} đ
                        </td>
                        <td style='text-align: right'>
                            ${new Intl.NumberFormat('en-GB', {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            }).format(props.totalDonate)} đ
                        </td>
                    </tr>
                </table>
                <p>Hãy click vào đây để quản lý đơn hàng: <a href='https://cms.schance.com.vn/order'>https://cms.schance.com.vn/order</a></p>
            </div>
        </body>
    </html>`
}
