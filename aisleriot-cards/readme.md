HOW TO CREATE THE SVG FILE:
Make sure the modified (or new) vectors are inside of each card (if you place a figure on the 10 of clubs, move the vectors inside the 10 of clubs).

If you use Adobe Illustrator, use File > Export as > svg instead of File > Save as. If you save instead of export, the vectors will move down the card.

################################################################################

HOW TO CREATE THE SVGZ FILE:

Download the aisleriot git (or use the downloaded repository)
https://gitlab.gnome.org/GNOME/aisleriot

add your svg file into the aisleriot-master/cards folder
open aisleriot-master/cards/meson.build and add the svg file (+/- line 29)

go to aisleriot and run meson setup builddir && cd builddir
install all the required dependences and then run:
meson compile

Check the svgz file in aisleriot-master/builddir/cards/yourfile.svgz


To add the cards set to the game, copy the file into /usr/share/aisleriot/cards
If there is not that directory, install the package gnome-cards-data