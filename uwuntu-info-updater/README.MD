MOVE uwuntu-info-updater TO /usr/bin/uwuntu-info-updater
CHANGE PERMISSIONS TO ALLOW ONLY ROOT TO EDIT THE FOLDER AND THE CONTENT INSIDE

GO TO /lib/systemd/system AND MOVE uwuntu-updater.service
CHANGE PERMISSIONS (rw - r - r) OWNER root (644)

RUN sudo systemctl enable uwuntu-updater.service

IF YOU WANT TO ALLOW ACCESS TO EVERYONE (NOT NECESARY):
EDIT /etc/sudoers WITH visudo
#GRANT ACCESS TO THE UWUNTU INFO UPDATER
ALL    ALL = (root) NOPASSWD: /usr/bin/uwuntu-info-updater/uwuntu-info-updater.sh