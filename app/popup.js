const popup = (function(){

    const fetchAllData = async function() {
        const tab = await getActiveTab();
        chrome.tabs.sendMessage(tab.id, {"type": "all"});
    },
    fetchValues = async function() {
        const tab = await getActiveTab();
        chrome.tabs.sendMessage(tab.id, {"type": "values"});
    },
    fetchNames= async function() {
        const tab = await getActiveTab();
        chrome.tabs.sendMessage(tab.id, {"type": "names"});
    },
    getActiveTab = async function() {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        return tab;
    }
    setEvents = function() {
        copyAllData.addEventListener("click",fetchAllData);
        copyNames.addEventListener("click", fetchNames);
        copyValues.addEventListener("click",fetchValues);
    };

    return {
        setEvents,
    };

})();

popup.setEvents();
