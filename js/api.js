function download(filename) {
    // Create a temporary anchor element
    var link = document.createElement('a');
    link.href = './configs/' + filename;
    link.download = filename;
    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);

    // AJAX request to send the filename to the server
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://freenet-365.000webhostapp.com/logs.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Filename logged successfully");
        }
    };
    xhr.send("filename=" + encodeURIComponent(filename));

    if (onFire) {
        onFire.style.border = "14px solid #25d366"; // Rounded corners
    }
}