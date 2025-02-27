const newman = require('newman'); // Require Newman

// Define the collection and environment file paths
const collectionPath = './postman.json';

// Run the collection
newman.run({
    collection: require(collectionPath),
    reporters: 'cli'  // This will display the results in the console
}, function (err, summary) {
    if (err) {
        console.error('Collection run encountered an error:', err);
        process.exit(1);
    }
    console.log('Collection run completed!');
});
