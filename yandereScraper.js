const fs = require('fs');
const path = require('path');
const download = require('image-downloader');
const Booru = require('booru');

const tags = [process.argv[2]];
const searchOptions = {
    limit: process.argv[3],
    nsfw: true,
    random: false,
}

const yandereScrape = async () => {
    let imageFolder = `${__dirname}/${tags}`;
    const posts = await Booru.search('yande.re', tags, searchOptions); 

    //If Folder doesn't exist create one
    if (!fs.existsSync(imageFolder)) {
        fs.mkdir(path.join(__dirname, `/${tags}`), {}, err => {
            if (err) throw err;
            console.log(`${tags} Folder Created`)
        });
    }
    
    posts.forEach( async post => {
        let image = URLtoImage(post.fileUrl);
        let imagePath = (`${imageFolder}/${image}`);
        
        //If File already exists dont do anything
        if (fs.existsSync(imagePath)) {
            console.log(`${imagePath} already exists`);
            return;
        }

        try {
            await download.image({url: post.fileUrl, dest: imageFolder});
            console.log(`Downloaded`);
        } catch (err) {
            console.error(err);
        }
    });
}

const URLtoImage = fileUrl => {
    let parseAt = 5;
    for (let i=0; i<fileUrl.length; i++) {
        if (fileUrl[i] == '/') parseAt--;
        if (parseAt == 0) return fileUrl.slice(i+1);
    }
}

yandereScrape();