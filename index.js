document.getElementById("theform").onsubmit = function() { 
    font = document.getElementById("fontInput").value;
    doesFontExist(font);
    return false;
};
//
// Call this function and pass in the name of the font you want to check for availability.
//
function doesFontExist(fontName) {
    // creating our in-memory Canvas element where the magic happens
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    // the text whose final pixel size I want to measure
    var text = "abcdefghijklmnopqrstuvwxyz0123456789";

    // specifying the baseline font
    context.font = "72px monospace";

    // checking the size of the baseline text
    var baselineSize = context.measureText(text).width;

    // specifying the font whose existence we want to check
    context.font = "72px '" + fontName + "', monospace";

    // checking the size of the font we want to check
    var newSize = context.measureText(text).width;

    // removing the Canvas element we created
    delete canvas;

    //
    // If the size of the two text instances is the same, the font does not exist because it is being rendered
    // using the default sans-serif font
    //
    if (newSize == baselineSize) {
        alert("This font isn't available. Bummer.");
    } else {
        alert("Yay. This font is available!");
    }
}