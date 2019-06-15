const fs = require('fs');
const path = require('path');
const download = require('image-downloader');
const Booru = require('booru');
const yargs = require('yargs');

yargs.version('1.0.0');

yargs.command({
    command: 'download',
    describe: 'download an image',
    builder: {
        s: {
            describe: 'What service to download from. ex: Konachan.net or Yande.re',
            demandOption: true,
            type: 'string'
        },
        t: {
            describe: 'Tags to search for',
            demandOption: true,
            type: 'string'
        },
        n: {
            describe: 'Number of images to download',
            demandOption: true,
            type: 'number'
        },
        r: {
            describe: 'Grab images randomly',
            demandOption: false,
            type: 'boolean'
        },
        R: {
            describe: 'Allow search for NSFW content',
            demandOption: false,
            type: 'boolean'
        }
    },
    handler(argv) {
        const service = argv.s;
        const tags = [argv.t];
        const searchOptions = {
            limit: argv.n,
            nsfw: argv.R,
            random: argv.r
        }
        yandereScrape(service, tags, searchOptions);
    }
});

const yandereScrape = async (service, tags, searchOptions) => {
    let imageFolder = `${__dirname}/${tags[0]}`;
    const posts = await Booru.search(service, tags, searchOptions); 
    //If Folder doesn't exist create one
    if (!fs.existsSync(imageFolder)) {
        fs.mkdir(path.join(__dirname, `/${tags[0]}`), {}, err => {
            if (err) throw err;
            console.log(`${tags[0]} Folder Created\n`)
        });
    }
    
    let requestsLimit= 5;
    let i = 0;
    for (const post of posts) {
        if (i % requestsLimit == 0 && i!=0) StallDownloader();

        let image = ParseURLtoImage(post.fileUrl);
        let imagePath = (`${imageFolder}/${image}`);

        //If File already exists dont do anything
        if (fs.existsSync(imagePath)) {
            console.log(`SKIPPED: ${imagePath} ALREADY EXISTS`);
            continue;
        }

        try {
            await download.image({url: post.fileUrl, dest: imageFolder});
            console.log(`DOWNLOADED: ${post.fileUrl}`);
        } catch (err) {
            console.error(err);
        }
        i++;
    }
    console.log(`\nFinished Downloading`);
}

const ParseURLtoImage = fileUrl => {
    let parseAt = 5;
    for (let i=0; i<fileUrl.length; i++) {
        if (fileUrl[i] == '/') parseAt--;
        if (parseAt == 0) return fileUrl.slice(i+1);
    }
}

const StallDownloader = () => setTimeout(() => console.log('\n'), 500);

yargs.parse();