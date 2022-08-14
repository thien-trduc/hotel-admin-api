export const BookingMailHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        #invoice-POS {
            box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
            padding: 2mm;
            margin: 0 auto;
            width: 80mm;
            background: #fff;
        }

        #invoice-POS ::selection {
            background: #f31544;
            color: #fff;
        }

        #invoice-POS ::moz-selection {
            background: #f31544;
            color: #fff;
        }

        #invoice-POS h1 {
            font-size: 1.5em;
            color: #222;
        }

        #invoice-POS h2 {
            font-size: 0.9em;
        }

        #invoice-POS h3 {
            font-size: 1.2em;
            font-weight: 300;
            line-height: 2em;
        }

        #invoice-POS p {
            font-size: 0.75em;
            color: #666;
            line-height: 1.2em;
        }

        #invoice-POS #top,
        #invoice-POS #mid,
        #invoice-POS #bot {
            /* Targets all id with 'col-' */
            border-bottom: 1px solid #eee;
        }

        #invoice-POS #top {
            min-height: 100px;
        }

        #invoice-POS #mid {
            min-height: 80px;
        }

        #invoice-POS #bot {
            min-height: 50px;
        }

        #invoice-POS #top .logo {
            height: 60px;
            width: 60px;
            background: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSMe317HMyQ4R2OZMeEW9XJrBD-K5fD_QgTQ&usqp=CAU) no-repeat;
            background-size: 60px 60px;
        }

        #invoice-POS .clientlogo {
            float: left;
            height: 60px;
            width: 60px;
            background: url(http://michaeltruong.ca/images/client.jpg) no-repeat;
            background-size: 60px 60px;
            border-radius: 50px;
        }

        #invoice-POS .info {
            display: block;
            margin-left: 0;
        }

        #invoice-POS .title {
            float: right;
        }

        #invoice-POS .title p {
            text-align: right;
        }

        #invoice-POS table {
            width: 100%;
            border-collapse: collapse;
        }

        #invoice-POS .tabletitle {
            font-size: 0.75em;
            background: #eee;
        }

        #invoice-POS .service {
            border-bottom: 1px solid #eee;
        }

        #invoice-POS .item {
            width: 24mm;
        }

        #invoice-POS .itemtext {
            font-size: 0.75em;
        }

        #invoice-POS #legalcopy {
            margin-top: 5mm;
        }
    </style>
</head>
<body>

<div id="invoice-POS">

    <center id="top">
        <div class="logo"></div>
        <div class="info">
            <p>Mã phiếu</p>
            <h2>{MAPĐ}</h2>
        </div><!--End Info-->
    </center><!--End InvoiceTop-->

    <div id="mid">
        <div class="info">
            <h2>Thông Tin</h2>

            <p>Họ tên: {HOTEN}</p>
            <p>Điện thoại: {DIENTHOAI}</p>
            <p>Check In: {CHECKIN}</p>
            <p>Check Out: {CHECKOUT}</p>

        </div>
    </div><!--End Invoice Mid-->

    <div id="bot">

        <div id="table">
            <table>
                <tr class="tabletitle">
                    <td class="item"><h2>Hạng phòng</h2></td>
                    <td class="Hours"><h2>Số lượng</h2></td>
                    <td class="Rate"><h2>Thành tiền</h2></td>
                </tr>
                {DATAROOMRANK}
                <tr class="tabletitle">
                    <td></td>
                    <td class="Rate"><h2>Tổng tiền</h2></td>
                    <td class="payment"><h2>{TONGTIEN}</h2></td>
                </tr>

            </table>
        </div><!--End Table-->

        <div id="legalcopy">
            <p class="legal"><strong>Cảm ơn bạn đã lựa chọn Khách sạn của chúng tôi !</strong> 
            </p>
        </div>

    </div><!--End InvoiceBot-->
</div><!--End Invoice-->
</body>
</html>`