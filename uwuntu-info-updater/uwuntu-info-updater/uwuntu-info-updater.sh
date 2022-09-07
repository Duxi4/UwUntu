#!/bin/sh
#This script solves the lost of the OS name

#Data file
osrawdata=/usr/bin/uwuntu-info-updater/uwuntu-info

#Getting data
OSPrettyName=$(sed -n '4p' < $osrawdata)
OSName=$(sed -n '6p' < $osrawdata)
#OSVersion=$(sed -n '8p' < $osrawdata)
OSCodename=$(sed -n '10p' < $osrawdata)
#ShortCodename=$(sed -n '12p' < $osrawdata)
OSFullVersion="$(sed -n '8p' < $osrawdata) LTS ($OSCodename)"
GeneralURL="https://uwuntuos.site"
BugsURL="https://bugs.launchpad.net/uwuntu"

#Replacing os-release (/usr/lib/os-release)
sed -i "/^PRETTY_NAME=/c PRETTY_NAME=\"$OSPrettyName\"" /usr/lib/os-release
sed -i "/^NAME=/c NAME=\"$OSName\"" /usr/lib/os-release
sed -i "/^VERSION=/c VERSION=\"$OSFullVersion\"" /usr/lib/os-release
sed -i "/^HOME_URL=/c HOME_URL=\"$GeneralURL\"" /usr/lib/os-release
sed -i "/^SUPPORT_URL=/c SUPPORT_URL=\"$GeneralURL\"" /usr/lib/os-release
sed -i "/^BUG_REPORT_URL=/c BUG_REPORT_URL=\"$BugsURL\"" /usr/lib/os-release
sed -i "/^PRIVACY_POLICY_URL=/c PRIVACY_POLICY_URL=\"$GeneralURL\"" /usr/lib/os-release

#Replacing lsb-release (/etc/lsb-release)
sed -i "/^DISTRIB_DESCRIPTION=/c DISTRIB_DESCRIPTION=\"$OSPrettyName\"" /etc/lsb-release