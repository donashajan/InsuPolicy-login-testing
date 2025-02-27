const newman = require('newman'); // Require Newman

// The URL you want to test
const urlToTest = 'http://host.docker.internal:3001/'; // Replace with the URL you want to test

// Run the Postman collection
newman.run({
    collection: './urlcheck.json', // Path to the Postman collection
    environment: {  // Optional: set environment variables for the URL
        values: [
            {
                key: "url", // Variable to replace {{url}} in collection
                value: urlToTest,
                enabled: true
            }
        ]
    },
    reporters: 'cli'  // Use CLI reporter to display the output
}, function (err, summary) {
    if (err) {
        console.error('Error running collection:', err);
    } else {
        if (summary.run.failures.length > 0) {
            console.log(`URL check failed for: ${urlToTest}`);
        } else {
            console.log(`URL is live: ${urlToTest}`);
        }
    }
});
