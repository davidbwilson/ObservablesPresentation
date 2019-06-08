let main = document.querySelector("#main");

function writeToBody(message) {

    main.innerHTML += (message + `<br />`);
}

// Observable
const observable = (observer) => {

    let i = 0;

    // Producer
    var intervalId = setInterval(() => {
        if (i % 2) {
            observer.next(i);
        } else {
            observer.error(`ERROR: The number ${i} is not odd!`);
        }
        
        if (i === 30) {
            observer.complete();
            clearInterval(intervalId);            
        }    
        
        i++
    }, 100);

    return () => { 

        clearInterval(intervalId); 
        writeToBody('Teardown Complete');
    }
}

// Observer
let observer = {

    next: (i) => { writeToBody(`interval ${i}`) },
    error: (err) => { writeToBody(`error: ${err}`); },
    complete: () => { writeToBody(`I finished!`)}
}

// Subscribe
var teardown = observable(observer);

setTimeout(teardown, 2000);
