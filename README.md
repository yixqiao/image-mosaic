# Image Mosaic
Application to generate an image mosaic using [MosaicCLI](https://github.com/yixqiao/MosaicCLI) as the backend

## Description
* Create an image mosaic composed of smaller images
* Made using Electron; image processing uses Java

## Example
![Image example](sample.jpg)
Image made using images from Cifar-10 dataset

## Requirements
* Node.js v10
* NPM v6
* Java

## Quickstart
1. Clone the repository
2. Run `npm install`
3. To start, use `npm start`
4. Fill out the left form
  1. For images, you can select the `cifar10-test` folder
  2. For the averages file, you can overwrite `avgs.txt`
  3. Press `Calculate averages`
5. Pick an image on the right side
  1. You can use `imgs/lake.jpg`
  2. For output, you can choose any path
  3. Averages file should be filled out already
  4. Chunk size and scaling can be left at default
  5. Press `Build mosaic`
