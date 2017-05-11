### The Google Spreadsheet

All this functionality is driven by the backing Google Spreadsheet. Here we describe what this spreadsheet contains:

The Google Sheet contains three Sheet Tabs: *app-info*, *tabs* and *buttons*:

![](https://sites.google.com/site/universalappstoreclassic/documentation/imgs/20170419-115408.png)

Each Sheet Tab has some required columns. For example, the *buttons* Sheet Tab has the columns: *name*, *text*, *image*, *video*, *style*, *shape*, *color* and *size*.

![](https://sites.google.com/site/universalappstoreclassic/documentation/imgs/20170419-121259.png)

As long as you keep this basic structure, what you put into the spreadsheet is up to you. You can add additionals sheet tabs, add scripting to your sheets, add/remove rows, change text, etc.

Let us go over each of the sheet tabs.

**app-info** - Contains general information about the app. It has the following columns:

- *name* - the name of the application, which will appear when we add and display this sheet app in the settings.

- *author* - the author of the sheet app. This will appear in the sheet app's information in the setting.

- *image* - the image to be displayed on this sheet app in the list of sheet apps on the setting screen.

- *date* - when the sheet app was created.

- *version* - the version of the sheet app. Not currently used.

**tabs** - this sheet tab defines the tabs of the app (Home, About, Contact, etc). It contains the following columns:

- *name* - the name of each tab in the mobile app: *Home*, *About*. etc. You can add or delete rows to define how many tabs your application will have.

- *title* - The title of the tab, to be displayed on top-left of each tab.

- *style* - currently not used

- *text* - the HTML text we like to put in this tab.

- *image* - image to be displayed in the tab

- *tabicon* - the icon to be shown at the bottom of the screen, corresponding to the tab.

- *hidden* - boolean (yes or no) value to indicate if we like to show or hide that tab. Default to 'no' (do not hide).

**buttons** - defines the buttons on the home tab, and the corresponding detail screens they bring up. It contains the following columns:

- *name* - the name of a button.

- *text* - this is the HTML text to be displayed in the new detail screen which the button will bring up. Note that the text column can contain HTML tags. Also note, that we have the full power of Google Sheets behind us, so the text does not need to be static. It can refer to other columns, and even to other sheet tabs or spreadsheets. You can also use Google API to get information from an outside source or use Google Scripts to provide information. For example, to display the current price of SPY index, you can put the formula:

		="SPY price: " & GOOGLEFINANCE("SPY", "price") & " USD"

and the values in your app will be updated with the current price.

- *image* - image to be displayed in the Detail page

- *video* - this is an URL of a YouTube video to be shown on the detail screen. To prevent [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) issues, get the YouTube URL from the embedded code. Right-click on the YouTube video and select "Embedded Code". Then paste in any editor, and select the URL part only. Should look something like this:

		https://www.youtube.com/embed/nDirbacjY

- *style* - this field allows the user to apply CSS style to the button to control appearance and location. For example, if we like a hidden button at a specific location we can add a style like:

		{
		"position": "absolute",
		"top": "15%",
		"left": "60%",
		"color":"transparent"
		}

- *shape* - the shape of the button. You can select one of: *clear*, *round*, *full*, *block* and *outline*.

- *color* - the color of the button. Options are: *danger*, *default*, *secondary*, *light* and *dark*.

- *size* - size of the button. Options are: *small*, *default* and *large*.

