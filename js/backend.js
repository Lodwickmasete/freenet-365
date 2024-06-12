var icon = '<div class="icon-container">    <svg class="download-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">        <path d="M12 2C11.4477 2 11 2.44772 11 3V13.5858L8.29289 10.8787C7.90237 10.4882 7.2692 10.4882 6.87868 10.8787C6.48816 11.2692 6.48816 11.9024 6.87868 12.2929L11.2929 16.7071C11.6834 17.0976 12.3166 17.0976 12.7071 16.7071L17.1213 12.2929C17.5118 11.9024 17.5118 11.2692 17.1213 10.8787C16.7308 10.4882 16.0976 10.4882 15.7071 10.8787L13 13.5858V3C13 2.44772 12.5523 2 12 2ZM4 18C4 17.4477 4.44772 17 5 17H19C19.5523 17 20 17.4477 20 18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18Z"/>   </svg></div>';
var files =     document.getElementById('files');
var auth =     document.getElementById('files-auth');
var onFire = document.getElementById('on-fire');
// Function to open VPN tabs
function openTab(evt, vpnName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(vpnName).style.display = "block";
    evt.currentTarget.className += " active";
    // Show all networks by default
    document.getElementById("defaultNetworkOpen").click();
}

// Function to filter files based on network
function openNetwork(evt, networkName) {
    var i, fileItems, networklinks;
    fileItems = document.getElementsByClassName("file-item");
    for (i = 0; i < fileItems.length; i++) {
        if (networkName === "All") {
            fileItems[i].style.display = "";
        } else {
            if (fileItems[i].classList.contains(networkName)) {
                fileItems[i].style.display = "";
            } else {
                fileItems[i].style.display = "none";
            }
        }
    }
    networklinks = document.getElementsByClassName("networklinks");
    for (i = 0; i < networklinks.length; i++) {
        networklinks[i].className = networklinks[i].className.replace(" active", "");
    }
    evt.currentTarget.className += " active";
}

// Function to search for files
function searchFiles() {
    var input, filter, fileItems, i, b, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    fileItems = document.getElementsByClassName("file-item");
    for (i = 0; i < fileItems.length; i++) {
        h2 = fileItems[i].getElementsByTagName("b")[0];
        txtValue = h2.textContent || h2.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            fileItems[i].style.display = "";
        } else {
            fileItems[i].style.display = "none";
        }
    }
}

// Check if a file is expired
function isExpired(expiryDate) {
    var today = new Date();
    var expiry = new Date(expiryDate);
    return today > expiry;
}

// Automatically load the content
window.onload = function() {
    // Generate HTML content
    generateHTML();
}

// Function to dynamically generate HTML content
function generateHTML() {


// Loop through tabs
for (var i = 0; i < jsonData.tabs.length; i++) {
    var tab = jsonData.tabs[i];
    var tabContent = document.createElement("div");
    tabContent.id = tab.name;
    tabContent.className = "tabcontent";
    var totalFiles = 0; // Total files count per tab
    
    // Loop through files
    var networkFileCounts = {}; // Store file counts per network
    for (var j = 0; j < tab.files.length; j++) {
        var file = tab.files[j];
        var fileItem = document.createElement("div");
        fileItem.className = "file-item " + file.network;

        var fileContent = "<div><b>" + file.name + "</b><p class='expire-date'>Expires <i> " + file.expiry_date + "</i></p></div>";
        var downloadLink = '<i class="download" onclick="download(\'' + file.filename + '\')">'+icon+'</i>';
        fileItem.innerHTML = fileContent + downloadLink;

        if (isExpired(file.expiry_date)) {
            fileItem.classList.add("expired");
            fileItem.innerHTML = "<b>" + file.name + '</b>expired ' + file.expiry_date ;
        }
        tabContent.appendChild(fileItem);
        
        // Count files per network
        if (networkFileCounts[file.network]) {
            networkFileCounts[file.network]++;
        } else {
            networkFileCounts[file.network] = 1;
        }
        
        totalFiles++; // Increment total files count per tab
    }

    // Update network tab labels with file counts
    var networkTabButtons = document.getElementsByClassName("networklinks");
    for (var k = 0; k < networkTabButtons.length; k++) {
        var networkName = networkTabButtons[k].textContent.trim();
        var count = networkFileCounts[networkName] || 0;
        var countLabel = document.createElement("span");
        countLabel.textContent = count;
        countLabel.className = "count";
        if (count > 0) {
            countLabel.style.backgroundColor = "#337ab7"; // Blue background color
            countLabel.style.borderRadius = "4px"; // Rounded corners
        } else {
            countLabel.style.display = "none"; // Hide count if zero
        }
        networkTabButtons[k].appendChild(countLabel);
    }
    
    // Update vpn tab labels with total file counts
    var tablinks = document.getElementsByClassName("tablinks");
    tablinks[i].textContent = tab.name;
    var tabCountLabel = document.createElement("span");
    tabCountLabel.textContent = totalFiles;
    tabCountLabel.className = "count";
    if (totalFiles > 0) {
        tabCountLabel.style.backgroundColor = "#337ab7"; // Blue background color
        tabCountLabel.style.borderRadius = "4px"; // Rounded corners
    } else {
        tabCountLabel.style.display = "none"; // Hide count if zero
    }
    tablinks[i].appendChild(tabCountLabel);
    files.appendChild(tabContent);
 //   onFire.appendChild(tabContent);
}

// Automatically click on the default tab
document.getElementById("defaultOpen").click();
}