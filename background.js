chrome.runtime.onMessage.addListener(
    function (arg, sender, sendResponse) {
        var dllist = arg;
        for (const file of dllist) {
            if (file[0].indexOf("https://elearning.ecnu.edu.cn/") != -1) {
                chrome.downloads.download({
                    url: file[0],
                    saveAs: true
                });
            } else {
                chrome.downloads.download({
                    url: file[0],
                    filename: file[1],
                    saveAs: true
                });
            }

        }
    });

chrome.browserAction.onClicked.addListener(
    function () {
        window.open('https://elearning.ecnu.edu.cn/');
    }
);