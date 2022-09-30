#!/bin/bash
#
# This script will regenerate all the POT files for the project.
#

repo_root=$(realpath "$(dirname $0)/../")
html_po_folder="$repo_root/data/po/"
welcome_po_folder="$repo_root/po/"

cd "$repo_root" || exit

if [ ! -d "$html_po_folder" ]; then
  echo "HTML PO folder does not exist. Creating..."
  mkdir "$html_po_folder"
fi

if [ ! -d "$welcome_po_folder" ]; then
  echo "Welcome PO folder does not exist. Creating..."
  mkdir "$welcome_po_folder"
fi

for page in $(ls $html_po_folder); do
  rm "$html_po_folder/$page/$page.pot" -v
done

rm "$welcome_po_folder/budgie-welcome.pot"
pygettext3 -d ./po/budgie-welcome budgie-welcome

cd scripts/ || exit
./translation-support.py create-all-pots
