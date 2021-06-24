export default function(context, inject){
    /*
    Is called everytime an external library (ex: p5) needs to be used.
    Checks if this library has already been loaded (stores a list of them in a window global variable), and if not, adds a script element in order to do so
    */

    inject ('libCalls', {
        libCall
    })

    function libCall(lib){
        //Is there already a list of loaded libraries ?
        if(typeof window.libsCalled === 'undefined'){
            //if not, creating it as a void array
            window.libsCalled = [];
        }

        //If the library as already been loaded
        if(window.libsCalled.includes(lib.name)){
            console.log('already loaded');
        } else {
            //If not
            console.log('not loaded');
            //Then we add it
            addLib(lib);
            //And we remember that we did
            window.libsCalled.push(lib.name);
        }

        console.log(window.libsCalled);
    }

    function addLib(lib){
        //Creates a script html tag to store in the head part and call the library
        const libScriptTag = document.createElement('script');
        libScriptTag.src = lib.src;
        libScriptTag.hid = lib.name;
        //VERY IMPORTANT: Some libraries need some others (looking at you, p5sound), so you can specify if they need to be called async or not
        libScriptTag.async = lib.async;
        document.head.appendChild(libScriptTag);
    }
}

/*
Problem with this technique is that it will eventually overload the visitor's memory with libraries, won't it ?

Or maybe just loading a library doesn't matter that much, as long as we don't use it, I don't know...
At least they would be loaded only once, so, that's that.

If not, if cleaning is regularly required, we could see to create a function that kicks out libraries.
That might requires some tweaking though, for example, libCalled might better be an object array so that we can find back the libraries later on
*/