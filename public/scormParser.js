const scorm = require('./scorm.json');
const fs = require('fs');
const identifier = scorm.general.course_title.split(" ").map((n) => n[0]).join("");
const manPath = './src/imsmanifest.xml';
const mdPath = scorm.general.course_code + '-metadata.xml';

/**
 * A function that generates Army SCORM compliant manifest and metadata files
 */
function generateManifest() {
    fs.writeFile('./src/' + mdPath, generateCourseMetadata(), function (err) {
        if (err) throw err;
        console.log(err);
    });

    let resources = "";

    let assets = fs.readdirSync('./src/assets');
    assets.forEach((asset) => {
        resources += '\n\t\t<file href="assets/' + asset + '"/>';
    })

    let mfData = `<manifest identifier="${identifier}_scorm" version="1"
    xmlns="http://www.imsglobal.org/xsd/imscp_v1p1"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_v1p3"
    xmlns:adlseq="http://www.adlnet.org/xsd/adlseq_v1p3"
    xmlns:adlnav="http://www.adlnet.org/xsd/adlnav_v1p3"
    xmlns:imsss="http://www.imsglobal.org/xsd/imsss"
    xmlns:lom="http://ltsc.ieee.org/xsd/LOM"
    xsi:schemaLocation="http://www.imsglobal.org/xsd/imscp_v1p1 imscp_v1p1.xsd
                        http://www.adlnet.org/xsd/adlcp_v1p3 adlcp_v1p3.xsd
                        http://www.adlnet.org/xsd/adlseq_v1p3 adlseq_v1p3.xsd
                        http://www.adlnet.org/xsd/adlnav_v1p3 adlnav_v1p3.xsd
                        http://www.imsglobal.org/xsd/imsss imsss_v1p0.xsd
                        http://ltsc.ieee.org/xsd/LOM lom.xsd">
    <metadata>
        <schema>ADL SCORM</schema>
        <schemaversion>2004 3rd Edition</schemaversion>
        <adlcp:location>${mdPath}</adlcp:location>
    </metadata>
    <organizations default="${identifier}">
        <organization identifier="${identifier}" adlseq:objectivesGlobalToSystem="false">
            <title>${scorm.general.course_title}</title>
            <item identifier="${scorm.general.course_code + identifier}" identifierref="${identifier}_SCO">
                <title>${scorm.general.course_code + ': ' + scorm.general.course_title}</title>
                <imsss:sequencing>
                    <imsss:controlMode choiceExit="false"/>
                    <imsss:objectives>
                            <imsss:primaryObjective satisfiedByMeasure="false" objectiveID="scoObj"></imsss:primaryObjective>
                    </imsss:objectives>
                </imsss:sequencing>
            </item>
            <imsss:sequencing>
                <imsss:controlMode choice="false" flow= "true"/>
                <imsss:rollupRules>
                    <imsss:rollupRule childActivitySet="all">
                        <imsss:rollupConditions conditionCombination="all">
                            <imsss:rollupCondition condition="satisfied"/>
                        </imsss:rollupConditions>
                        <imsss:rollupAction action="completed"/>
                    </imsss:rollupRule>
                    <imsss:rollupRule childActivitySet="all">
                        <imsss:rollupConditions conditionCombination="all">
                            <imsss:rollupCondition condition="satisfied"/>
                        </imsss:rollupConditions>
                        <imsss:rollupAction action="satisfied"/>
                    </imsss:rollupRule>
                    <imsss:rollupRule childActivitySet="any">
                        <imsss:rollupConditions conditionCombination="any">
                            <imsss:rollupCondition operator="not" condition="satisfied"/></imsss:rollupConditions>
                        <imsss:rollupAction action="incomplete"/>
                    </imsss:rollupRule>
                </imsss:rollupRules>
            </imsss:sequencing>
        </organization>
    </organizations>
    <resources>
        <resource identifier="${identifier}_SCO" type="webcontent" adlcp:scormType="sco" href="index.html">${resources}
        <file href="index.html"/>
        </resource>
    </resources>
    </manifest>`

    fs.writeFile(manPath, mfData, function (err) {
        if (err) throw err;
        console.log(err);
    });
}

generateManifest();

function generateCourseMetadata() {
    let keywords = "";

    scorm.general.keywords.forEach((keyword) => {
        keywords += '\n\t<keyword><string>' + keyword + '</string></keyword>';
    });

    let technical = '';
    let formats = scorm.technical.format;

    formats.forEach((format) => {
        technical += '\n\t<format>' + format + '</format>'
    })
    
    let metadata = `<?xml version="1.0"?>
    <lom xmlns="http://ltsc.ieee.org/xsd/LOM" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://ltsc.ieee.org/xsd/LOM lomStrict.xsd">
    <general>
        <identifier>
            <catalog>ATIA</catalog>
            <entry>TBD</entry>
        </identifier>
        <title>
            <string>${scorm.general.course_title }</string>
        </title>
        <language>${scorm.general.language}</language>
        <description>
            <string>${scorm.general.description}</string>
        </description>
        ${keywords}
        <aggregationLevel>
            <source>LOMv1.0</source>
            <value>${scorm.general.aggregation_level}</value>
        </aggregationLevel>
    </general>
    <lifeCycle>
        <version>
            <string>${scorm.lifecycle.version}</string>
        </version>
        <status>
            <source>LOMv1.0</source>
            <value>${scorm.lifecycle.status}</value>
        </status>
        <contribute>
            <role>
                <source>LOMv1.0</source>
            <value>publisher</value>
            </role>
            <entity>
                ${scorm.lifecycle.contribute.entity}
            </entity>
            <date>
                <dateTime>${scorm.lifecycle.contribute.date}</dateTime>
            </date>
        </contribute>
    </lifeCycle>
    <metaMetadata>
        <identifier>
            <catalog>TBD</catalog>
            <entry>TBD</entry>
        </identifier>
        <metadataSchema>LOMv1.0</metadataSchema>
        <metadataSchema>SCORM_CAM_v1.3</metadataSchema>
        <metadataSchema>ADLv1.0</metadataSchema>
        <language>${scorm.general.language}</language>
    </metaMetadata>
    <technical>${technical}
    </technical>
    <rights>
        <cost>
            <source>LOMv1.0</source>
            <value>no</value>
        </cost>
        <copyrightAndOtherRestrictions>
            <source>LOMv1.0</source>
            <value>no</value>
        </copyrightAndOtherRestrictions>
    </rights>
    ${generateClassifications()}
    </lom>
    `

    console.log(metadata);
    return metadata;
}


function generateClassifications() {
    let classParsed = '';
    let classifications = scorm.classifications;

    classifications.forEach((classification) => {
        classParsed += `<classification>
        <purpose>
            <source>LOMv1.0</source>
            <value>${classification.value}</value>
        </purpose>
        <description>
            <string>${classification.description}</string>
        </description>
        <keyword>
            <string>${classification.keyword}</string>
        </keyword>
    </classification>
    `
    })

    //console.log(classParsed)
    return classParsed
}