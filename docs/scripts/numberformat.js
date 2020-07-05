// JavaScript Document

function NumberFormat(str) {
    // Return the string if less than four digits
    if (str.length < 4) return str;

    var parts = [];

    var tempPartition = "";
    var count = 0;

    // Partition the string
    for (var i = str.length-1; i >= 0; i--) {
        if (count++ == 3) {
            tempPartition = ','.concat(tempPartition);
            count = 1;
        }
        
        // Add to the temporary partition
        tempPartition = str.charAt(i).concat(tempPartition);
    }

    return tempPartition;
};