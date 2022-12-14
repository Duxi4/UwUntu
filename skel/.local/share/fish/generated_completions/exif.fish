# exif
# Autogenerated from man page /usr/share/man/man1/exif.1.gz
complete -c exif -s v -l version -d 'Display the  exif version number'
complete -c exif -s i -l ids -d 'Show ID numbers instead of tag names'
complete -c exif -s t -l tag -d 'Select only this R "TAG" '
complete -c exif -l ifd -d 'Select a tag or tags from this R "IFD" '
complete -c exif -s l -l list-tags -d 'List all known EXIF tags and IFDs'
complete -c exif -l show-mnote -d 'Show the contents of the MakerNote tag'
complete -c exif -l remove -d 'Remove the tag or (if no tag is specified) the entire IFD'
complete -c exif -s s -l show-description -d 'Show description of tag.   The --tag option must also be given'
complete -c exif -s e -l extract-thumbnail -d 'Extract the thumbnail, writing the thumbnail image to the file specified with…'
complete -c exif -s r -l remove-thumbnail -d 'Remove the thumbnail from the image, writing the new image to the file specif…'
complete -c exif -s n -l insert-thumbnail -d 'Insert  "FILE" as thumbnail'
complete -c exif -l no-fixup -d 'Do not attempt to fix EXIF specification violations when reading tags'
complete -c exif -s o -l output -d 'Write output image to R "FILE" '
complete -c exif -l set-value -d 'Set the data for the tag specified with --tag and --ifd to R "VALUE" '
complete -c exif -s c -l create-exif -d 'Create EXIF data if it does not exist'
complete -c exif -s m -l machine-readable -d 'Produce output in a machine-readable (tab-delimited) format'
complete -c exif -s w -l width -d 'Set the maximum width of the output to N characters (default 80)'
complete -c exif -s x -l xml-output -d 'Produce output in an XML format (when possible)'
complete -c exif -s d -l debug -d 'Show debugging messages'
complete -c exif -s '?' -l help -d 'Show help message'

