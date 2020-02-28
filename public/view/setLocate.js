
export function  setLocation(curLoc, title){
    try {
        history.pushState(null, null, curLoc);
        document.title = title;
        return
    } catch(e) {
        console.log("setLocation Err")
    }
    location.hash = '#' + curLoc;
}