chown -R root. .local
chown -R root. .config
chmod -R 744 .local
chmod -R 744 .config

#Set kitty default terminal (ctrl + alt + t)
gsettings set org.gnome.desktop.default-applications.terminal exec kitty

#Set kitty default terminal (nemo file manager)
gsettings set org.cinnamon.desktop.default-applications.terminal exec kitty

