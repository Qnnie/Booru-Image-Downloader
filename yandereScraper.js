const fs = require('fs');
const path = require('path');
const download = require('image-downloader');
const Booru = require('booru');

const tags = [process.argv[2]];
const searchOptions = {
    limit: process.argv[3],
    nsfw: true,
    random: true,
}

const yandereScrape = async () => {
    let imageFolder = `${__dirname}/${tags[0]}`;
    const posts = await Booru.search('yande.re', tags, searchOptions); 
    //If Folder doesn't exist create one
    if (!fs.existsSync(imageFolder)) {
        fs.mkdir(path.join(__dirname, `/${tags[0]}`), {}, err => {
            if (err) throw err;
            console.log(`${tags[0]} Folder Created`)
        });
    }
    
    let requestsLimit= 5;
    let i = 0;
    for (const post of posts) {
        if (i % requestsLimit == 0) StallDownloader();

        let image = ParseURLtoImage(post.fileUrl);
        let imagePath = (`${imageFolder}/${image}`);

        //If File already exists dont do anything
        if (fs.existsSync(imagePath)) {
            console.log(`${imagePath} already exists`);
            continue;
        }

        try {
            await download.image({url: post.fileUrl, dest: imageFolder});
            console.log(`Downloaded`);
        } catch (err) {
            console.error(err);
        }
        i++;
    }
}

const ParseURLtoImage = fileUrl => {
    let parseAt = 5;
    for (let i=0; i<fileUrl.length; i++) {
        if (fileUrl[i] == '/') parseAt--;
        if (parseAt == 0) return fileUrl.slice(i+1);
    }
}

const StallDownloader = () => setTimeout(() => console.log('stall'), 1000);

yandereScrape();