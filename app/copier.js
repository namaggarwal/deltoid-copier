const copier = (function(){
    const setEvents = function() {
        chrome.runtime.onMessage.addListener(onNewMessage);
    },
    onNewMessage = function(request, sender, sendResponse) {
        switch(request.type) {
            case "all":
                copyAllDataFromPage();
                break;
            case "values":
                copyValuesFromPage();
                break;
            case "names":
                copyNamesFromPage();
                break;
        }
    },
    copyAllDataFromPage = function(){
        const rows = getDataRows();
        if(!rows){
            return;
        }
        const data = [];
        for(row of rows){
            const columns = row.children;
            const name = columns[0].children[0].children[1].textContent;
            const value = columns[3].textContent;
            data.push([name, value]);
        };
        copyDataArrayToClipboard(data);
    },
    copyValuesFromPage = function() {
        const rows = getDataRows();
        if(!rows){
            return;
        }
        const data = [];
        for(row of rows){
            const columns = row.children;
            const value = columns[3].textContent;
            data.push([value]);
        };
        copyDataArrayToClipboard(data);
    },
    copyNamesFromPage = function() {
        const rows = getDataRows();
        if(!rows){
            return;
        }
        const data = [];
        for(row of rows){
            const columns = row.children;
            const name = columns[0].children[0].children[1].textContent;
            data.push([name]);
        };
        copyDataArrayToClipboard(data);
    },
    getDataRows = function(){
        const grid = document.getElementsByClassName("ReactVirtualized__Grid__innerScrollContainer");
        if(grid.length !== 1) {
            alert("Container not found. Cannot copy values");
            return;
        }
        const container = grid[0];
        const rows = container.children;
        if(rows.length === 0) {
            alert("Nothing to copy. Rows not found");
            return;
        }
        return rows;
    },
    copyDataArrayToClipboard = function(data){
        const text = data.map(d => d.join('\t')).join('\n');
        copyText(text);
    },
    copyText = function(text) {
        //Create a textbox field where we can insert text to.
        var copyFrom = document.createElement("textarea");

        //Set the text content to be the text you wished to copy.
        copyFrom.textContent = text;

        //Append the textbox field into the body as a child.
        //"execCommand()" only works when there exists selected text, and the text is inside
        //document.body (meaning the text is part of a valid rendered HTML element).
        document.body.appendChild(copyFrom);

        //Select all the text!
        copyFrom.select();

        //Execute command
        document.execCommand('copy');

        //(Optional) De-select the text using blur().
        copyFrom.blur();

        //Remove the textbox field from the document.body, so no other JavaScript nor
        //other elements can get access to this.
        document.body.removeChild(copyFrom);
    }

    return {
        setEvents,
    }

})();

copier.setEvents();
