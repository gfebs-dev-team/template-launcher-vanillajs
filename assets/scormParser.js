const scorm = require('./scorm.json');
const fs = require('fs');
let identifier = scorm.general.course_title.split(" ").map((n)=>n[0]).join("");

/**
 * A function that generates Army SCORM compliant manifest and metadata files
 */
function generateManifest() {
    
    let path = './imsmanifest.xml';
    let mfData = '<manifest>\n' + generateMetadata() +'\n' + generateOrganizations() + '\n' + generateResources() + '\n</manifest>';
    fs.writeFile(path, mfData, function (err) {
        if (err) throw err;
        console.log(err);
    });
    console.log(mfData);
}

generateManifest();

function generateMetadata() {
    let path = scorm.general.course_code + '_course.xml';
    fs.writeFile('./' + path, generateCourseMetadata(), function (err) {
        if (err) throw err;
        console.log(err);
      });
    let metadata = '<metadata>\n\t<schema>ADL SCORM</schema>\n\t<schemaversion>2004 3rd Edition</schemaversion>\n\t<adlcp:location>' + path + '</adlcp:location>\n</metadata>';
    
    return metadata;
}

function generateCourseMetadata() {
    let rights = '<rights>\n\t<cost>\n\t\t<source>LOMv1.0</source>\n\t\t<value>no</value>\n\t</cost>\n\t<copyrightAndOtherRestrictions>\n\t\t<source>LOMv1.0</source>\n\t\t<value>no</value>/n/t</copyrightAndOtherRestrictions>/n</rights>'
    let metadata = '<?xml version="1.0"?>\n<lom xmlns="http://ltsc.ieee.org/xsd/LOM" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://ltsc.ieee.org/xsd/LOM lomStrict.xsd">\n' + generateGeneral() + '\n' + generateLifecycle() + '\n' + generateMetaMetadata() + '\n' + generateTechnical() + '\n' + rights + '\n' + generateClassifications() + '\n</lom>';

    return metadata;
}

function generateGeneral() {
    let general = '<general>\n\t<identifier>\n\t\t<catalog>ATIA</catalog>\n\t\t<entry>TBD</entry>\n\t</identifier>\n\t<title>\n\t\t<string>' + scorm.general.course_title + 
    '</string>\n\t</title>\n\t<language>' + scorm.general.language + '</language>\n\t<description>\n\t\t<string>' + scorm.general.description + '</string>\n\t</description>'
    
    let keywords = scorm.general.keywords;

    keywords.forEach((keyword) => {
        general += '\n\t<keyword><string>' + keyword + '</string></keyword>';
    })
    
    general += '\n\t<aggregationLevel>\n\t\t<source>LOMv1.0</source>\n\t\t<value>'+ scorm.general.aggregation_level +'</value>\n\t<aggregationLevel>\n</general>'

    //console.log(general);
    return general;
}

function generateLifecycle() {
    let lifeCycle = '<lifeCycle>\n\t<version>\n\t\t<string>' + scorm.lifecycle.version + '</string>\n\t</version>\n\t<status>\n\t\t<source>LOMv1.0</source>\n\t\t<value>' + scorm.lifecycle.status + '</value>\n\t</status>\n\t<contribute>\n\t\t<source>LOMv1.0</source>\n\t\t<value>publisher</value>\n\t\t<entity>\n\t\t\t' + scorm.lifecycle.contribute.entity +'\n\t\t</entity>\n\t\t<date>\n\t\t\t<datetime>' + scorm.lifecycle.contribute.date + '</datetime>\n\t\t</date>\n\t</contribute>\n</lifeCycle>'

    //console.log(lifeCycle);
    return lifeCycle;
}


function generateMetaMetadata() {
    let meta = '<metaMetadata>\n\t<identifier>\n\t\t<catalog>TBD</catalog>\n\t\t<entry>TBD</entry>\n\t</identifier>\n\t<metadataSchema>LOMv1.0</metadataSchema>\n\t<metadataSchema>SCORM_CAM_v1.3</metadataSchema>\n\t<metadataSchema>ADLv1.0</metadataSchema>\n\t<language>'+ scorm.general.language +'</language>\n</metaMetadata>'

    //console.log(meta);
    return meta;
}

function generateTechnical() {
    let technical = '<technical>';
    let formats = scorm.technical.format;

    formats.forEach((format)=> {
        technical += '\n\t<format>' + format + '</format>'
    })

    technical += '\n</technical>'
    
    //console.log(technical);
    return technical;
}

function generateClassifications() {
    let classParsed = '';
    let classifications = scorm.classifications;

    classifications.forEach((classification) => {
        classParsed += '<classification>\n\t<purpose>\n\t\t<source>LOMv1.0</source>\n\t\t<value>' + classification.value + '</value>\n\t</purpose>\n\t<description>\n\t\t<string>' + classification.description + '</string>\n\t</description>\n\t<keyword>\n\t\t<string>' + classification.keyword + '</string>\n\t</keyword>\n</classification>\n'
    })

    //console.log(classParsed)
    return classParsed
}


function generateOrganizations() {
    const objective = '<imsss:sequencing>\n\t\t\t\t<imsss:objectives>\n\t\t\t\t\t\t<imsss:primaryObjective satisfiedByMeasure="false" objectiveID="scoObj"></imsss:primaryObjective>\n\t\t\t\t</imsss:objectives>\n\t\t\t</imsss:sequencing>';
    const sequencing = '<imsss:sequencing>\n\t<imsss:rollupRules>\n\t\t<imsss:rollupRule childActivitySet="all">\n\t\t\t<imsss:rollupConditions conditionCombination="all">\n\t\t\t\t<imsss:rollupCondition condition="satisfied"/>\n\t\t\t</imsss:rollupConditions>\n\t\t\t<imsss:rollupAction action="completed"/>\n\t\t</imsss:rollupRule>\n\t\t<imsss:rollupRule childActivitySet="all">\n\t\t\t<imsss:rollupConditions conditionCombination="all">\n\t\t\t\t<imsss:rollupCondition condition="satisfied"/>\n\t\t\t</imsss:rollupConditions>\n\t\t\t<imsss:rollupAction action="satisfied"/>\n\t\t</imsss:rollupRule>\n\t\t<imsss:rollupRule childActivitySet="any">\n\t\t\t<imsss:rollupConditions conditionCombination="any">\n\t\t\t\t<imsss:rollupCondition operator="not" condition="satisfied"/></imsss:rollupConditions>\n\t\t\t<imsss:rollupAction action="incomplete"/>\n\t\t</imsss:rollupRule>\n\t</imsss:rollupRules>\n</imsss:sequencing>';

    let organizations = '<organizations default="'+identifier+'">\n\t<organization identifier="'+ identifier +'" adlseq:objectivesGlobalToSystem="false">\n\t\t<title>'+ scorm.general.course_title +'</title>\n\t\t<item identifier="'+scorm.general.course_code+identifier+'" identifierref="'+scorm.general.course_code+identifier+'_SCO">\n\t\t\t<title>'+scorm.general.course_code+': '+scorm.general.course_title+'</title>\n\t\t\t' + objective + '\n\t\t</item>\n'+ sequencing + '\n\t</organization>\n</organizations>';

    //console.log(organizations);
    return organizations;
}

function generateResources() {
    let resources ='<resources>\n\t<resource identifer="' + identifier + '_SCO" adlcp:scormType="sco" href="index.html">';
    let assets = fs.readdirSync('./assets');

    assets.forEach((asset) => { 
        resources += '\n\t\t<file href="/assets/' + asset + '"/>';
    })

    resources += '\n\t\t<file href="index.html"/>\n\t</resource>\n</resources>';

    //console.log(resources);
    return resources;
}