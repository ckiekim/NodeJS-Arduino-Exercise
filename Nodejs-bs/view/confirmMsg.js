module.exports.confirmMsg = function(message, url1, url2) {
    return `
        <!doctype html>
        <html>
        <head>
            <title>Confirm Message</title>
            <meta charset="utf-8">
        </head>
        <body>
            <script>
                var message = '${message}';
                var returnUrl1 = '${url1}';
                var returnUrl2 = '${url2}';
                var result = confirm(message);
                if (result)
                    document.location.href = returnUrl1;
                else
                    document.location.href = returnUrl2;
            </script>
        </body>
        </html>
    `;
}