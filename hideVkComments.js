const secondsToIdle = 1500;
const displayHideProperty = 'none';
let lastSuccessfulRunAt = getCurrentTime();

function hideComments(){
    if(!canRun()){
        return;
    }

    const elementsToHide = getElementsByQry('div.replies, div.post_replies_header');
    if (elementsToHide.length == 0){
        return;
    }

    elementsToHide.forEach(element => setDisplayHidden(element));
    lastSuccessfulRunAt = getCurrentTime();
}

function canRun(){
    const diff = getCurrentTime() - lastSuccessfulRunAt;
    if (diff <= secondsToIdle){
        return false;
    }

    return true;
}

function getCurrentTime(){
    return new Date().getTime();
}

function setDisplayHidden(element){
    if (!element){
        return;
    }

    element.style.display = displayHideProperty;
}

function getElementsByQry(className){
    const pageItems = this.document.querySelectorAll(className);
    return Array.from(pageItems)
        .filter(el => el.style.display != displayHideProperty);
}

window.addEventListener("scroll", function(_) {
    hideComments();
});

hideComments();