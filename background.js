/**
 * The `contentCopy` function allows you to copy the specified `text` to the clipboard using the
 * `navigator.clipboard.writeText` method.
 * @param text - The `text` parameter is a string that represents the content that you want to copy to
 * the clipboard.
 */
function contentCopy(text) {
    navigator.clipboard.writeText(text);
}

/**
 * The function `contentInject` is used to inject text into the value of the currently active element
 * in a web page.
 * @param text - The `text` parameter is a string that represents the content you want to inject into
 * the active element on a web page.
 */
function contentInject(text) {
    document.activeElement.value = text
}

/**
 * The function generates a random Israeli ID number with a check digit.
 * @returns a randomly generated ID number.
 */
function generateISRID() {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getInc(num, i) {
        var inc = Number(num) * ((i % 2) + 1);
        return (inc > 9) ? inc -= 9 : inc;
    }

    var iid = "", num, counter = 0;
    for (var i = 0; i < 8; i++) {
        num = getRandomInt((i < 2) ? 2 : 0, (i < 2) ? 3 : 9);
        iid += num.toString();
        counter += getInc(num, i);
    }
    return iid + (10 - (counter % 10)).toString();
}

/**
 * The function generates a random phone israeli mobile number with a 050 prefix and a random
 * set of digits. The number follows a patter to avoid using real numbers that may trigger notifications
 * from Easydoc
 * @returns a randomly generated phone number.
 */
function generateISRPhone() {
	
	// Old Barbra Code
    //const prefixOptions = ['050', '051', '052', '053', '054', '055', '058', '059'];
    //const prefix = prefixOptions[Math.floor(Math.random() * prefixOptions.length)];
    //const digits = Math.floor(1000000 + Math.random() * 9000000);
	
	//Creates a fake Israeli mobile phone number that cannot be used
	const prefix = '050';
    const digits = Math.floor(Math.random() * (999 - 100 + 1)) + 100
    return prefix.toString() + '0000' + digits.toString();
}



/**
 * The `generateEmail` function generates a random email address using a combination of random first
 * and last names from different nationalities followed by a random number.
 * @returns a randomly generated email address in the format of "randFirst.randLast+randNumber@test.com".
 */
function generateISREmail() {
    //const domains = ['test', 'ipsum'];
    const nationalities = [ 'isr']
    const allNames = {
        isr: {
			first: ["Yonatan", "Yuval", "Maor", "Dvir", "Ohad", "Omer", "Bar", "Aviram", "Yosi", "Ido", "Eli", "Zvika",
			"Ohad", "Moshe", "Natan", "Dudu", "David", "Anat", "Dekel", "Yarden", "Shay", "Dorin", "Mihal", "Miki"
			, "Daniel", "Dor", "Itay", "Ofek", "Or", "Stav", "Itzik", "Yahav", "Sharon", "Tamir"],
			last: ["Ashkenazi", "Biton", "Hadar", "Cohen", "Perez", "Eshkol", "Meir", "Levi", "Mizrahi", "Dahan",
			"Kaz", "Tishbi", "Carmel", "Magen", "Marom", "Goldsmith", "Oron", "Dayan", "Yosef", "Kofman", "Zidon"]
        },
    }
    const randNation = nationalities[Math.floor(Math.random() * nationalities.length)].toLowerCase();
    const randFirst = allNames[randNation].first[Math.floor(Math.random() *  allNames[randNation].first.length)].toLowerCase();
    const randLast =  allNames[randNation].last[Math.floor(Math.random() *  allNames[randNation].last.length)].toLowerCase();
	const randNumber = Math.floor(Math.random() * (999 - 100 + 1)) + 100
    //const randDomain = domains[Math.floor(Math.random() * domains.length)];
    const randDomain = 'test.com'

    //return `${randFirst}.${randLast}@${randDomain}.${randNation}`;
    return `${randFirst}.${randLast}${randNumber}@${randDomain}`;
}

/**
 * The `handleMenuItem` function is used to handle different menu item selections and execute
 * corresponding functions in a Chrome browser extension.
 * @param e - The parameter `e` is an event object that represents the event that triggered the
 * function. It is typically passed as an argument when the function is called.
 * @param tab - The `tab` parameter is an object that represents a tab in the Chrome browser. It
 * contains information about the tab, such as its ID, URL, and other properties. In this code, the
 * `tab` parameter is used to specify the tab in which the JavaScript function should be executed using
 * the
 */
function handleMenuItem(e, tab) {
    let fakeValue;
    
    /* The `switch` statement is used to check the value of `e.menuItemId`, which represents the ID of the
    clicked context menu item. */
    switch (e.menuItemId) {
        case 'insertGeneratedPhone':
            fakeValue = generateISRPhone()
            break;
        case 'insertGeneratedEmail':
            fakeValue = generateISREmail()
            break;
        case 'insertGeneratedID':
            fakeValue = generateID()
            break;
        default:
            break;
    }

    /* The `chrome.scripting.executeScript` function is used to execute a JavaScript function in the
    context of a specified tab in a Chrome browser extension. */
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: contentInject,
        args: [fakeValue],
    });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: contentCopy,
        args: [fakeValue],
    });


}

/* The `chrome.contextMenus.create()` function is used to create a new context menu item in a Chrome
browser extension. */
chrome.contextMenus.create(
    {
        id: "insertGeneratedPhone",
        title: "Random ISR Mobile Number",
        contexts: ['editable']
    }
)

chrome.contextMenus.create(
    {
        id: "insertGeneratedEmail",
        title: "Random ISR Email",
        contexts: ['editable']
    }
)

chrome.contextMenus.create(
    {
        id: "insertGeneratedID",
        title: "Random ISR Person ID",
        contexts: ['editable']
    }
)

chrome.contextMenus.create(
    {
        id: "insertGeneratedCompanyID",
        title: "Random ISR Company ID",
        contexts: ['editable']
    }
)

chrome.contextMenus.create(
    {
        id: "testMethod",
        title: "Testing",
        contexts: ['editable']
    }
)

/* `chrome.contextMenus.onClicked.addListener(handleMenuItem)` is adding an event listener to the
`chrome.contextMenus.onClicked` event. When a context menu item is clicked, the `handleMenuItem`
function will be executed. */
chrome.contextMenus.onClicked.addListener(handleMenuItem)