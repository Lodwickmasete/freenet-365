function download(filename) {
    // Create a temporary anchor element
    var link = document.createElement('a');
    link.href = './configs/' + filename;
     link.download=filename;
    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
     fileItem.style.border = "14px solid #25d366"; // Rounded corners
}