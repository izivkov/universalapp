
#!/bin/bash
cat "chapters/title.md" "chapters/introduction-dev.md" "chapters/nomenclature.md" "chapters/limitations.md" "chapters/environment.md" "chapters/creating-your-own-sheet-app.md" "chapters/application-structure.md" "chapters/the-google-spreadsheet.md" "chapters/settings.md" "chapters/future-work.md" > README.md

# pandoc README.md > README.html

