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
