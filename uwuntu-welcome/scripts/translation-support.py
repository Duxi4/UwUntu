#! /usr/bin/python3
# -*- coding:utf-8 -*-
#
# Copyright (C) 2016 Robin Thompson (robint99)
#
# edgar-allan is free software: you can redistribute it and/or modify
# it under the temms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# edgar-allan is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with edgar-allan. If not, see <http://www.gnu.org/licenses/>.
#
# "edgar-allan" is the original filename from Ubuntu MATE Welcome.
#

import codecs
import glob
import os
import re
import shutil
import sys

try:
    import polib
except:
    print("Requires polib. apt-get install python3-polib.")
    sys.exit(1)

def get_translatables_from_file(input_file, trim_strs = True):
    """ Get all translatable strings (enclosed by '&zwnj;' characters)
        from the specfified file

    Args : html_file - the file with the translatable strings

           trim_strs - if True the translatable strings will have \n and
                       redundant spaces between words removed

    Returns: a list of tuples, each of which contains a list of line numbers
             at which a translatable string was found, plus the string
             itself (without the &zwnj;s). Example:
             [[12,43, 66], "System Requirements"]

    """

    # use regular expressions to iterate through all the translatables
    p= re.compile("&zwnj;(.+?)&zwnj;", re.MULTILINE | re.DOTALL)
    lines = open(input_file, 'r')
    content = lines.read()
    line_nos = []
    strings = []
    for m in re.finditer (p, content):

        # get the translatable string and remove the "&zwnj;"s, \n chars
        # and redundant spaces etc. in the text
        text = content[m.start() : m.end()]
        text = text.replace("&zwnj;", "")

        if trim_strs:
            text = text.replace("\n", "")
            text = " ".join(text.split())

        # if the text has already been encounted, add its line number to
        # the relevant entry in line_nos[]
        # otherwise add a new entry in line_nos and strings[]

        line_no = content.count("\n", 0, m.start()) + 1
        if text in strings:
            line_nos[strings.index(text)].append(line_no)
        else:
            line_nos.append([line_no])
            strings.append(text)

    # prepare and return the results
    translatables=[]
    for i in range(0, len(strings)):
        translatables.append([line_nos[i], strings[i]])

    return translatables

###############################################################################
def create_pot_file (input_file, pot_file, verbose):
    """
        Create a .pot file from a translatables set of translatable strings

    Args:
        translatables:  a list of tuples, each of which contain the line number
                        at which a translatable string was found, plus the string
                        itself
        pot_file     : the filename of the .pot to create
        verbose      : whether to display progress info
    """

    translatables  = get_translatables_from_file(input_file)

    # check if the file exists. If it does, open it, otherwise create a new file
    new_file = not os.path.exists(pot_file)
    if new_file:
        pofile = polib.POFile()
        pofile.metadata= {
            "Project-Id-Version": "Budgie Welcome",
            "Report-Msgid-Bugs-To ": "you@example.com",
            "POT-Creation-Date": "2016-02-27 12:48+0100",
            "PO-Revision-Date": "YEAR-MO-DA HO:MI+ZONE",
            "Last-Translator": "FULL NAME <EMAIL@ADDRESS>",
            "Language-Team:": "LANGUAGE <LL@li.org>",
            "MIME-Version": "1.0",
            "Content-Type": "text/plain; charset=UTF-8",
            "Content-Transfer-Encoding": "8bit",}
    else:
        pofile = polib.pofile(pot_file)

    source_path, source_file = os.path.split(input_file)
    for translatable in translatables:
        entry = polib.POEntry(
                msgid = translatable[1],
                msgstr = "",
                occurrences = [(source_file, "%s" %str(translatable[0]).strip("[]"))])

        if new_file:
            pofile.append (entry)
            if verbose:
                print ('Added "%s" to pot file' %translatable[1])
        else:
            # add the entry only if it isn't already present...
            present = False
            for en in pofile:
                if en.msgid == entry.msgid:
                    present = True
                    break

            if not present:
                pofile.append(entry)
                if verbose:
                    print ('Added "%s" to pot file' %translatable[1])
            else:
                if verbose:
                   print ('Did not add "%s" - already present.' %translatable[1])

    if verbose:
        print ('Saving pot file to %s' %pot_file)

    pofile.save(pot_file)
    if verbose:
        print ("Saved")

########################################################################
def translate_file(in_file, in_po, out_file, verbose):
    """ Translate a file from English to another language

    For every translatable string in_file, replace the corresponding
    text in the input file with the appropriate translation from the .po
    file. When all  translations are done, write the resulting html to the
    output file

    Args:
        in_file: the original filename whose contents are in English within
                 &zwnj; enclosures
        in_po  : the filename of the .po file to use for the translation
        out_file : the filename that the translation gets written to

    """

    # get the translatable strings from the input file
    translatables = get_translatables_from_file(in_file, trim_strs=False)

    # read the entire contents of the file
    content = open(in_file, 'r').read()

    # read the po file
    po_file = polib.pofile(in_po)

    # for every translatable string, try to find and replace it with the appropriate
    # translated
    for translatable in translatables:

        #can we find the translatable text in the input file?
        if translatable[1] in content:

            # remove \n and redundant spaces between words from the translatable string, so that
            # it will match the entry in the .po file
            trim_text = translatable[1].replace("\n", "")
            trim_text = " ".join(trim_text.split())

            # iterate through the po entries looking for the one which matches the current translatable
            for entry in po_file:
                if (entry.msgid == trim_text):

                    if (entry.msgstr !=""):

                        # replace the English text with the tranlated text.
                        # NOTE: ALL occurrences of the English text are replaced throughout the entire
                        # file

                        content = content.replace("%s%s%s" %("&zwnj;", translatable[1], "&zwnj;"), entry.msgstr)
                        if verbose:
                            print ("Translated %s >> %s" %(trim_text, entry.msgstr))
                    else:
                        # there's no translation, so instead just remove the &zwnj; characters from the string
                        content = content.replace("%s%s%s" %("&zwnj;", translatable[1], "&zwnj;"), entry.msgid)
                        if verbose:
                            print("No translation for %s, so &zwnj; characters removed" %entry.msgid)
                    break

        else:
            if verbose:
                print ("WARNING: translatable string  %s not found" %translatable[1])

    # Post actions for i18n folder - Use relative paths.
    content = content.replace('css/', '../../css/')
    content = content.replace('js/', '../../js/')
    content = content.replace('img/', '../../img/')

    outfile = codecs.open(out_file, 'w', encoding='utf-8')
    outfile.write(content)
    outfile.close()

##########################################################################
def create_dummy_translations(in_po, out_po, verbose):
    """ Take the input po file and set the translations to be the reverse of the original string
        and write the results to a new po_file

    Args:
        in_po  : the source .po
        out_po : the po file where the dummy translations are to be written
        verbose: let the user know what's going on...
    """


    pofile = polib.pofile(in_po)
    for entry in pofile:
        entry.msgstr = entry.msgid[::-1]
        if verbose:
            print ('Setting translation of "%s" to "%s"' %(entry.msgid, entry.msgstr))

    if verbose:
        print ('Saving to %s' %out_po)
    pofile.save(out_po)
    if verbose:
        print('Saved')

########################################################################
def create_all_pot_files(slide_dir, po_dir, verbose):
    """ Create .pot files for all the html files in slide_dir and place them
        in the po_dir directory

        Args: slide_dir - the directory containing the html files
              po_dir - the directory where the .pot files are to be created
              verbose - let the user know what's happening

    """

    # if there isnt already a 'po' directory in ./data, create one
    if not os.path.exists(po_dir):
        os.mkdir(po_dir)
        if verbose:
            print ("Created %s directory" %po_dir)

    template_slides = glob.glob(os.path.join(slide_dir, '*.html'))

    # create a list of tuples containing the full slide path and filename, and the slide
    # names minus the .html extension
    slide_info=[]
    for slide in template_slides:
        slide_filename = slide
        slide_name =(os.path.splitext(os.path.split(slide)[1])[0])
        slide_info.append([slide_filename, slide_name])

    # if necessary create directories under po_dir for the slides
    for slide in slide_info:
        if not os.path.exists(os.path.join(po_dir, slide[1])):
            os.mkdir(os.path.join(po_dir, slide[1]))
            if verbose:
                print ("Created directory %s" %os.path.join(po_dir, slide[1]))

    # now create the .pot files
    for slide in slide_info:
        pot_file = os.path.join(po_dir, slide[1])
        pot_file = os.path.join(pot_file, slide[1] + ".pot")
        if os.path.exists(pot_file):
            # move the existing file out of the way
            shutil.copyfile (pot_file, pot_file + ".old")

        # create the pot file
        create_pot_file(slide[0], pot_file, False)
        if verbose:
            print ("Created %s" %pot_file)

    print ("All .pots created.")

#################################################################################################
def create_i18n_slides(slide_dir, po_dir, i18n_dir, verbose):
    """ Create translations of the html slides in source_dir, using the .po files in po_dir/<slide name>
        and write them to the i18n directory in i18n_dir/<locale>/

    Args:
        slide_dir : the location of the html files
        po_dir    : the location of the po files containing translations
        i18n_dir : the location where translatied html gets written
        verbose   : let the user know what's going on
    """


    # make the 'i18n' directory if not already present
    if not os.path.exists(i18n_dir):
        os.mkdir(i18n_dir)

    template_slides = glob.glob(os.path.join(slide_dir, '*.html'))

    for slide in template_slides:
        slide_name = (os.path.splitext(os.path.split(slide)[1])[0])
        print("Working on slide: %s...." %slide_name)

        slide_po = os.path.join(po_dir, slide_name)
        locales = glob.glob(os.path.join(slide_po, '*.po'))
        for locale_file in sorted(locales):
            locale_name = os.path.basename(locale_file).replace(".po", "")

            locale_slides = os.path.join(i18n_dir, locale_name)
            #make the locale directory if it doesn't already exists
            if not os.path.exists(locale_slides):
                os.mkdir(locale_slides)

            output_slide = os.path.join(locale_slides, slide_name + ".html")

            if os.path.exists(output_slide):
                os.remove(output_slide)

            translate_file(slide, locale_file, output_slide, False)
            if verbose:
                print ("Translated %s to %s locale" %(slide_name,locale_name))

    print ('All slides translated')

create_all_pots = False
create_pot = False
translate_all = False
translate = False
reverse_po = False
input_file = ''
output_file = ''
po_file = ''
verbose = False

commands=0
for arg in sys.argv:
    if arg == '--help':
        print('\nUsage: edgar-allan [command] [arguments]')
        print('\nCommand may be one of the following:')
        print('  create-all-pots            Create .pot files for each html file in the data directory and write')
        print('                             them to the data/po directory')
        print('  create-pot                 Create a .pot file from an input file containing &zwnj; enclosed')
        print('                             strings.')
        print('  translate-all              Create translations for all slides in the data directory using the')
        print('                             available .po files in the data/po/<slide>/ directory')
        print('  translate                  Translate an input file using a specified .po file and write the')
        print('                             result to an output file.')
        print('  po                         Take a po file and set all of the translations within it to be')
        print('                             the reverse of the original string and write the result to an output')
        print('                             file (can be useful when testing the translation function.')
        print('Arguments:')
        print('  --input=<filename>         The file for input to the create-pot and translate commands.')
        print('  --po-file=<filename>       The .po file to use when translating a file.')
        print('  --output=<filename>        The file to be created by the create-pot and translate commands')
        print('  --verbose, -v              Display detailed output')
        print('')
        exit()

    if arg == 'create-all-pots':
        create_all_pots = True
        commands+=1

    if arg == 'translate-all':
        translate_all = True
        commands+=1

    if arg == 'create-pot':
        create_pot = True
        commands+=1

    if arg == 'translate':
        translate = True
        commands+=1

    if arg=='po':
        reverse_po = True
        commands+=1

    if arg.startswith('--input='):
        input_file = arg.split('--input=')[1]

    if arg.startswith('--output='):
        output_file = arg.split('--output=')[1]

    if arg.startswith('--po-file='):
        po_file = arg.split('--po-file=')[1]

    if arg == '--verbose' or arg == '-v':
        verbose = True

if commands>1:
    print('Specify only one of the create-pot, translate, po... commands')
    exit()

if commands==0:
    print('No command specified - use --help to see what''s available')
    exit()

# check that commands which need arguments have them
cmd_check = None
if translate:
    cmd_check = 'translate'
elif create_pot:
    cmd_check = 'create-pot'
elif reverse_po:
    cmd_check = 'po'

if cmd_check is not None:
    if (input_file == ''):
        print('No input file specifed for %s command' %cmd_check)
        exit()

    if (output_file ==''):
        print('No output file specified for %s command' %cmd_check)
        exit()

    if translate and (po_file==""):
        print('No .po file specified for %s command' %cmd_check)
        exit()

source_dir = '../'
build_slides = os.path.join(source_dir, 'data')
po_dir = os.path.join(build_slides, 'po')
i18n_dir = os.path.join(source_dir, 'data/i18n')

if create_all_pots:
    create_all_pot_files(build_slides, po_dir, verbose)
elif translate_all:
    create_i18n_slides(build_slides, po_dir, i18n_dir, verbose)
elif create_pot:
    create_pot_file (input_file, output_file, verbose)
elif translate:
    translate_file (input_file, po_file, output_file, verbose)
elif reverse_po:
    create_dummy_translations(input_file, output_file, verbose)
