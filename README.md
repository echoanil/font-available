# Font Available
Detecting whether a font is installed on your browser or not using HTML5 Canvas API. 
I'm taking advantage of the Canvas element and the APIs it provides for drawing and measuring the size of what you draw.
I virtually draw two pieces of text. One piece of text is drawn using a default monospace font:
![Text with monospace font](https://raw.githubusercontent.com/anilkaundal/font-available/main/Images/Gravitica%20Mono.png)
The code for this looks as follows:
```
context.font = "72px monospace";
```
The other piece of text is drawn using the font that you are interested in checking on along with the default monospace font in case that font doesn’t exist:
```
context.font = "72px '" + fontName + "', monospace";
```
Below is what our sample text using Corbel looks like:
![Text with corbel font](https://raw.githubusercontent.com/anilkaundal/font-available/main/Images/Corbel.png)
I have used the Canvas element’s measureText function to measure the size (in pixels) of both pieces of text. 
I stored the size of our monospace text in a variable called baselineSize and I stored the size of our text drawn using Corbel as newSize.
Next, I checked whether the sizes stored in baselineSize and newSize are the same or different. If the Corbel font exists on your system, then drawing some text using 
it will display using that font itself. The font you are curious about doesn’t exist when the fallback font monospace font is being used instead. In this case,
we will have two pieces of text displayed at the exact same pixel size.

> The only time you may get a false negative is when you actually specify a monospace font like Courier New or Consolas that is also set as the default 
monospace font for your browser. In such cases, your font will exist but it will also display in the same size as the text specified to display only as monospace. 
Using our current logic, this means that despite your font existing, the code will tell you otherwise. I don’t envision these situations being too common, 
but do look out for that case.
