var x1 = document.createElement("LINK");
x1.setAttribute("rel", "stylesheet");
x1.setAttribute(
    "href",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
);
var x2 = document.createElement("script");
x2.setAttribute(
    "src",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
);
// / content script

// / ***************************************
console.log("Fffffffffff");
chrome.runtime.onMessage.addListener(receiver);
console.log("recived");
// Callback for when a message is received

// chrome.runtime.onMessage.addListener((msgObj) => {
//     // do something with msgObj
//     console.log("fvrsvaergv", msgObj);
//         var final_list = msgObj.final_list;
//     window.localStorage.setItem("final_list2", JSON.stringify(final_list));
// });

// chrome.runtime.sendMessage(
//     { method: "getLocalStorage", key: "final_list" },
//     function (response) {
//         console.log(response.final_list2);
//     }
// );

////

function receiver(request, sender, sendResponse) {
    console.log(request.final_list);
    var final_list = request.final_list;
    window.localStorage.setItem("final_list2", JSON.stringify(final_list));

    // if (request.message === "user clicked!") {
    //     console.log("if _ _ recived");
    //     setTimeout(function () {
    //         document.write(
    //             `<div align="center" style="heigth:100vh">You are not allow to use this website</div>`
    //         );
    //     }, 1000);
    //     // document.body.innerHTML = `<p>You are not allow to use this website</p>`;
    // }
}

////

// / ***************************************
// document.head.innerHTML += `
// <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
// `;

// document.addEventListener("load", function1);

let myScript = document.createElement("script");
myScript.setAttribute("src", "bundle.js");
document.head.appendChild(myScript);

const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
var JSZip = require("jszip");
var JSZipUtils = require("jszip-utils");
var FileSaver = require("file-saver");
let url = window.location.toString();

window.imgArray = [];

function get_data() {
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            console.log($);
            // console.log($("#titleSection").text())
            window.title = $("#titleSection").text().trim();
            console.log(title);
            $("#imageBlock").each((i, el) => {
                window.imges = $(el).find("img");
                // console.log(imges[0].attribs.src);
                console.log(imges);
                console.log(imges.length);
                var videoTags = document.getElementsByTagName("video");
                for (var i = 0; i < videoTags.length; i++) {
                    console.log(videoTags.item(i).currentSrc);
                }
            });
            console.log(typeof imges);
            for (let index = 0; index < imges.length; index++) {
                const element = imges[index];
                let img_link = element.attribs.src;
                let r = /\_SS40\_|\_SX\d+\_SY\d+\_[a-zA-Z0-9,]+\_\./g;
                if (
                    !img_link.includes("play-icon-overlay") &&
                    img_link.includes(".jpg")
                ) {
                    let resize_image = img_link.replace(r, "");
                    imgArray.push(resize_image);
                    // console.log(resize_image);
                    // imgArray.push(element.attribs.src)
                }
            }

            console.log("Scraping Done...", imgArray);
        }
    });
    // console.log(res);
}
// get_data();

function get_data2() {
    // original : https://rukminim1.flixcart.com/image/128/128/kll7bm80/kids-dress/n/l/1/4-5-years-mcgdss20dr003-disney-by-miss-chief-original-imagyzj83shzkunn.jpeg?q=70
    // updated : https://rukminim1.flixcart.com/image/kll7bm80/kids-dress/n/l/1/4-5-years-mcgdss20dr003-disney-by-miss-chief-original-imagyzj83shzkunn.jpeg?q=70
    let x = document.getElementsByClassName("q6DClP");
    window.title = document.getElementsByClassName("B_NuCI")[0].innerText;
    // let r = /\/\d+\/\d+/g;
    let r = /\/128\/128/g;

    for (const [key, value] of Object.entries(x)) {
        let backgroundImage = value.style.backgroundImage;
        var img_link = backgroundImage.match(/url\(["']?([^"']*)["']?\)/)[1];
        console.log(img_link);
        let resize_image = img_link.replace(r, "");
        imgArray.push(resize_image);
    }
}
//  get_data2();
function get_data3(choice) {
    // aliexpress
    // https://ae01.alicdn.com/kf/H7888911039b44e9997758f4217b990d9A/FLD-5-15Pcs-Makeup-Brushes-Tool-Set-Cosmetic-Powder-Eye-Shadow-Foundation-Blush-Blending-Beauty-Make.jpg_.jpg_.webp
    var x;
    if (choice == "main") {
        x = document.getElementsByClassName("images-view-wrap");
    }
    if (choice == "category") {
        x = document.getElementsByClassName("sku-property-list");
    }
    let l = x[0].getElementsByTagName("img").length;
    console.log(typeof x);
    window.title =
        document.getElementsByClassName("product-title-text")[0].innerText;
    console.log(title);
    r = /\_\d{2}x\d{2}.jpg_.webp/g;
    // r=/\_50x/g
    for (let i = 0; i < l; i++) {
        let img_link = x[0].getElementsByTagName("img")[i].src;
        let resize_image = img_link.replace(r, "");
        console.log(resize_image);
        imgArray.push(resize_image);
    }
}
//  get_data3('category');

function get_data4() {
    // alibaba
    // https://sc04.alicdn.com/kf/H8d26b0f3dcda4a3b9273899b7a08b5e65.png
    let x = document.getElementsByClassName("main-image-thumb-ul");
    let l = x[0].getElementsByTagName("img").length;
    console.log(typeof x);
    window.title =
        document.getElementsByClassName("module-pdp-title")[0].innerText;
    console.log(title);

    r = /\_\d{2}x\d{2}.png/g;
    // r=/\_50x/g
    for (let i = 0; i < l; i++) {
        let img_link = x[0].getElementsByTagName("img")[i].src;
        let resize_image = img_link.replace(r, "");
        if (!resize_image.includes(".svg")) {
            console.log(resize_image);
            imgArray.push(resize_image);
        }
    }
}
// get_data4()
function1();

let loc = window.location.hostname;
let final_list2 = JSON.parse(localStorage.getItem("final_list2"));
for (let index = 0; index < final_list2.length; index++) {
    console.log("hi", final_list2);
    if (!(final_list2[index].checked_not == "")) {
        // console.log("noooo",final_list2[index].website_list);

        var regex = new RegExp("www." + final_list2[index].website_list, "gi");
        console.log(loc.match(regex));
        if (loc.match(regex) !== null) {
            // console.log("matcheeee");
            run_js(loc);
            break;
        }
    } else {
        console.log(
            "❌❌❌❌❌❌❌❌❌❌you have disabled chrome extension for this website.❌❌❌❌❌❌❌❌❌❌"
        );
        break;
    }
}

// console.log(final_list2);
function run_js(loc) {
    switch (loc) {
        case "www.amazon.in":
            get_data();
            ///amazon
            window.ul1 = document.getElementById("ivThumbs");
            window.ul2 = document.getElementById("leftCol");
            ul1.insertAdjacentHTML("beforeend", html_button);
            ul2.insertAdjacentHTML("afterbegin", html_button);
            break;
        case "www.flipkart.com":
            get_data2();
            window.ul3 = document.querySelector("._331-kn");
            console.log(ul3);
            ul3.insertAdjacentHTML("afterend", html_button);

            break;
        case "www.aliexpress.com":
            get_data3("category");
            window.ul4 = document.querySelector(".product-title-text");
            console.log(ul4);
            ul4.insertAdjacentHTML("afterend", html_button);

            break;
        case "www.alibaba.com":
            get_data4();
            window.ul5 = document.querySelector(".detail-title-section");
            console.log(ul5);
            ///error : ablibaba is not giving permission for manipulate DOM
            // ul5.insertAdjacentHTML("afterend", html_button);
            break;
        default:
            console.log("nothing");
            break;
    }
}
function function1() {
    ///amazon
    //  window.ul1 = document.getElementById("ivThumbs");
    // window.ul2 = document.getElementById("leftCol");

    ///flipkart
    //  window.ul3 = document.querySelector("._331-kn");
    //  console.log(ul3);

    ///aliexpress
    // window.ul4 = document.querySelector(".product-title-text");
    // console.log(ul4);

    ///alibaba
    // window.ul5 = document.querySelector(".detail-title-section");
    // console.log(ul5);

    // console.log(ul1);
    html_button = `
    <head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
    <style>  
    .btn {
        color: #FFFFFF;
   background-color: #224522;
   margin: 10px 10px 10px 0px;
   padding:10px;
   border: 1px solid white;
   border-radius: 10px;
   font-size: 1rem;

        }
        .btn:hover {
            background-color: 1a331a; /* Green */
          
          }
    </style>
  
    <button type="button" class="btn" id="download_zip"><i class="fa fa-file-archive-o" aria-hidden="true" ></i>
    Download .zip</button>



    `;

    // ul1.insertAdjacentHTML("beforeend", html_button);
    // ul2.insertAdjacentHTML("afterbegin", html_button);

    // ul3.insertAdjacentHTML("afterend", html_button);

    // ul4.insertAdjacentHTML("afterend", html_button);

    ///error : ablibaba is not giving permission for manipulate DOM
    // ul5.insertAdjacentHTML("afterend", html_button);

    // let btn=document.getElementById("btn")
    // btn.addEventListener("click",download_all_photo("original"))

    // console.log(ul1);
}
// function1();
// setTimeout(function () {
//     download_zip();
// }, 3000);

let download_zip1 = document.getElementById("download_zip");
download_zip1.addEventListener("click", download_zip);
// download_zip();
function download_zip() {
    console.log("in download_zip");
    console.log(imgArray);
    let zip = new JSZip();
    var count = 0;
    let updated_title;
    let updated_folder_title;
    let extension_name = "--->Download_photo";
    if (title.length > 110) {
        updated_title = title.substring(0, 100) + extension_name;
        updated_folder_title = title.substring(0, 20) + extension_name;
        console.log(updated_title, "uuuuu");
    } else {
        updated_title = title;
    }

    // var zipFilename = `${updated_folder_title}.zip`;
    var zipFilename = "zipfolder.zip";
    // var urls = [
    //   'http://image-url-1',
    //   'http://image-url-2',
    //   'http://image-url-3'
    // ];

    imgArray.forEach(function (url) {
        console.log("images_list----");
        // loading a file and add it in a zip file
        JSZipUtils.getBinaryContent(url, function (err, data) {
            // if (err) {
            //     throw err; // or handle the error
            // }
            var filename = `${count}.${updated_title}.jpg`;
            console.log(filename);
            // var filename = `${count}.hihihi.jpg`;
            zip.folder(zipFilename).file(filename, data, { binary: true });
            // zip.file(filename, data, { binary: true });
            count++;
            if (count == imgArray.length) {
                // var zipFile = zip.generate({ type: "blob" });
                // FileSaver.saveAs(zipFile, zipFilename);

                zip.generateAsync({ type: "blob" }).then(function (content) {
                    FileSaver.saveAs(content, zipFilename);
                });
            }
        });
    });
}
