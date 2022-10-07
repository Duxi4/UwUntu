place the icon in /usr/share/icons/rounded-logo.png

to use custom dconf
create folder /etc/dconf/db/uwuntu.d and place the dumped file inside (name it as you want)
create file 'user' inside /etc/dconf/profile
write inside:

user-db:user
system-db:uwuntu

(uwuntu --> the name of the /etc/dconf/db/*.d folder)

run dconf update command

**
chown root.
chmod 644




#dconf load / < dconf-settings
