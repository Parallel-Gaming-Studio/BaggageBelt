// JavaScript Document

function NumberFormat(str) {
    console.log(`String: ${str}`);
    // Return the string if less than four digits
    if (str.length < 4) return str;

    var parts = [];

    var tempPartition = "";
    var count = 0;

    // Partition the string
    for (var i = str.length-1; i >= 0; i--) {
        // Add to the temporary partition
        tempPartition = str.charAt(i).concat(tempPartition);

        // Increment the count
        count++;
        // Add to the parts array and reset count
        if (count >= 3) {
            parts.unshift(tempPartition);
            tempPartition = "";
            count = 0;
        }
    }
    console.log(`Parts: ${parts}`);
    // Clear the temporary partition
    tempPartition = "";

    // Rebuild the string
    for (var i = 0; i < parts.length; i++) {
        tempPartition += parts[i].toString();

        // Add a comma if not the last index
        if (i < parts.length - 1) {
            tempPartition += ",";
        }
    }

    return tempPartition;
};