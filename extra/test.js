// const xml = new XMLHttpRequest();
// xml.addEventListener('load', () => {
//     const response = xml.response;
//     console.log(response);
// });
// xml.open('GET', 'https://supersimplebackend.dev/greeting');
// xml.send();

// fetch('https://supersimplebackend.dev/greeting').then((response) => {
//     return (response.text());
// }).then((data) => {
//     console.log(data);
// });

// async function getGreeting() {
//     const response = await fetch('https://supersimplebackend.dev/greeting');
//     const text = await response.text();
//     console.log(text);
// }

// getGreeting();

// async function postGreeting() {
//     const response = await fetch('https://supersimplebackend.dev/greeting', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({name: 'Ashish Lekhyani'})
//     });
//     const text = await response.text();
//     console.log(text);
// }

// postGreeting();

// async function getAmazon() {
//     try {
//         const response = await fetch('https://amazon.com');
//         const text = await response.text();
//         console.log(text);
//     }
//     catch (error) {
//         console.log('CORS error. Your request was blocked by the backend.');
//     }
// }
// getAmazon();

async function postGreeting() {
    try {
        const response = await fetch('https://supersimplebackend.dev/greeting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.status >= 400) {
            throw response;
        }
        
        const text = await response.text();
        console.log(text);
    }
    catch (error) {
        if (error.status === 400) {
            console.log(await error.json());
        }
        else {
            console.log('Network error. Please try again later.');
        }
    }
}

postGreeting();