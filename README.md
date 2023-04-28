# GFEBS-LRC-Launcher
GFEBS LRC Launcher is a template for building an army SCORM compliant launcher, geared towards updating GFEBS Legacy DL products.

## Features
- automatic imsmanifest and metadata file generation

## Installation & Usage

Download the latest release and modify the following files to fit for the relevant products.

- `public/scorm.json`
- `src/index.html`

### **/ public / scorm.json**
This file contains all metadata for the course to be parsed by `scormParser.js` to create `imsmanifest.xml` and `[course_code]-metadata.xml`

![scorm.json](/public/scormJSON.png)

### **/ src / index.html**
This file contains the content for the course landing page. Check the Find & Replace Guide for how to modify this file.

![index.html](/public/index.png)

#### **Links**
For each link on the launcher, change `<LINK_HERE>` to the intended URL and `<MODULE_TITLE_HERE>` to the intended link text. Repeat for each link and add `style` attributes as necessary.     

```html
<div class="links">
      <!-- Copy button below for more modules-->
      <button class="linkButton" onclick='javascript:openLRC("<LINK_HERE>")'><MODULE_TITLE_HERE></button>
    </div>
```


### **Build**
To package for ALMS, run `/public/scormParser.js` then, zip the files ***inside*** of `/src/`. Then rename the zip file `GFEBS <COURSE_CODE> <COURSE_TITLE> - Training Content`.

## Author and acknowledgements
- APIWrapper.js and scormJS.js provided by ADL registry

## Find and Replace Guide

- `<COURSE_CODE>` - Course Code *(ie L230E)*
- `<COURSE_TITLE>` - Course Title *(ie Funds Management)*
