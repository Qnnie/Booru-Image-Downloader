## Setup
<ul>
  <li>Open command line or terminal and type the following commands</li>
  <li>git clone https://github.com/Qnnie/Booru-Image-Downloader</li>
  <li>cd Booru-Image-Downloader</li>
  <li>npm install</li>
</ul>

## Usage

node booru download --help which should bring up 

Options: <br>
  --help     Show help                                                 [boolean] <br>
  --version  Show version number                                       [boolean] <br>
  -s         What service to download from. ex: Konachan.net or Yande.re
                                                             [string] [required] <br>
  -t         Tags to search for                              [string] [required] <br>
  -n         Number of images to download                    [number] [required] <br>
  -r         Grab images randomly                                      [boolean] <br>
  -R         Allow NSFW images                                         [boolean] <br> 

ex: node booru download -s='konachan.net' -t='chinese_dress' -n=2 -r <br>
The request above grabs 2 random sfw images from konachan, with the tag 'chinese_dress' <br>

A list of servicable websites are noted here https://github.com/AtlasTheBot/booru/blob/HEAD/src/sites.json
## How it works

The downloader will create a folder in this directory with the tags given.
