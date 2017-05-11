#!/bin/bash
cat "chapters/title.md" "chapters/introduction.md" "chapters/nomenclature.md" "chapters/limitations.md" "chapters/creating-your-own-sheet-app.md" "chapters/application-structure.md" "chapters/the-google-spreadsheet.md" "chapters/settings.md" > USER-GUIDE.md

# pandoc USER-GUIDE.md > USER-GUIDE.html