console.log("hi");
document.getElementById("linkedin").addEventListener("click", () => {
    chrome.tabs.create({
        url: "https://www.linkedin.com/in/gondaliya-krish-6407701b8/",
        active: true,
    });
});
document.getElementById("github").addEventListener("click", () => {
    chrome.tabs.create({
        url: "https://github.com/krish-0003",
        active: true,
    });
});
// document.getElementById("sponser").addEventListener("click",()=>{
//     chrome.tabs.create({
//         url: "https://www.cheaperzone.in/",
//         active: true
//     });
// })

// Once the DOM is ready...
window.addEventListener("DOMContentLoaded", () => {
    // ...query for the active tab...
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true,
        },
        (tabs) => {
            // ...and send a request for the DOM info...
            chrome.tabs.sendMessage(
                tabs[0].id,
                { from: "popup", subject: "DOMInfo" },
                // ...also specifying a callback to be called
                //    from the receiving end (content script).
                setDOMInfo
            );
        }
    );
});

let url_list = [
    "www.amazon.in",
    "www.flipkart.com",
    "www.alibaba.com",
    "www.aliexpress.com",
];
// Update the relevant fields with the new data.

const setDOMInfo = (info) => {
    // document.getElementsByClassName("Wait")[0].innerHTML=`<h5 class="Wait text-primary">Wait for some time , once page gets loaded</h5>`;

    window.images_list_for_popup = info.images_list;
    window.original_images_list_popup = info.original_images_list;
    // console.log("SCdfbb", info.image_title);
    window.title_for_popup = info.image_title; //
    // console.log("SCddffvsfbb", title_for_popup);

    ///for display use original imaage
    let result = showImages(info.images_list);

    console.log(info.original_images_list);
    console.log(document.getElementsByClassName("slider-for"));
    // console.log(document.getElementsByClassName("slider-for").innerHTML);
    console.log(result);
    let s_for = document.getElementsByClassName("slider-for")[0];

    s_for.insertAdjacentHTML("afterbegin", result);
    /// $(document).ready(function () {
    document.getElementById(
        "title_for_popup_"
    ).innerHTML = `<h6 style="size=3rem">${title_for_popup}</h6>`;
    $(s_for).slick({
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: true,
        centerMode: false,
        autoplaySpeed: 1000,
        infinite: true,
    });
    document.getElementsByClassName("download_button")[0].innerHTML = `  <button
        class="btn btn-outline-success mt-3"
        type="button"
        id="download_now"

    >
    Download Now
    </button>


    `;
    document
        .getElementById("download_now")
        .addEventListener("click", download_zip);
    // document.getElementById("toggle_loader").classList.remove("spinner-border")
    document.getElementById("loading").innerHTML = ``;
    /// });
};

function showImages(images_list) {
    let html_for = "";
    let html_nav = "";
    for (let index = 0; index < images_list.length; index++) {
        let element = images_list[index];
        html_for += ` <div class="container" style="position: relative;">
        <img
            src="${element}"
            alt=""
        />
        <div class="topleft" style=" position: absolute;
        top: 20px;
        left: 20px;
        "><img src="./cheaperzone-finel-logo-01-90x90.png" alt="" srcset="" style=""></div>
    </div>`;
    }
    return html_for;
}

// const request = require("request");
// const cheerio = require("cheerio");
const fs = require("fs");
var JSZip = require("jszip");
var JSZipUtils = require("jszip-utils");
var FileSaver = require("file-saver");
// const { html } = require("cheerio/lib/api/manipulation");

function download_zip() {
    console.log("in download_zip");
    console.log(images_list_for_popup);
    let zip = new JSZip();
    var count = 0;
    let updated_title;
    let updated_folder_title;
    let extension_name = "--->Download_photo";
    updated_folder_title =
        (title_for_popup.substring(0, 80)) + "-cheaperzone"

    if (title_for_popup.length > 110) {
        updated_title = title_for_popup.substring(0, 100) + extension_name;
        console.log(updated_title, "uuuuu");
    } else {
        updated_title = title_for_popup;
        // updated_folder_title =title_for_popup;
    }

    var zipFilename = `${updated_folder_title}.zip`;
    // var zipFilename = "zipfolder.zip";
    // var zipFilename = "";

    images_list_for_popup.forEach(function (url) {
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
            // zip.file(filename, data, { binary: true });
            count++;
            if (count == images_list_for_popup.length) {
                // var zipFile = zip.generate({ type: "blob" });
                // FileSaver.saveAs(zipFile, zipFilename);

                zip.generateAsync({ type: "blob" }).then(function (content) {
                    // FileSaver.saveAs(content, zipFilename);
                    FileSaver.saveAs(content, "");
                });
            }
        });
    });
}

let website_list = ["Amazon", "Flipkart", "Alibaba", "Aliexpress"];
let website_url = [
    { Amazon: ["www.amazon.in", "www.amazon.com"] },
    { Flipkart: ["www.flipkart.com"] },
    { Alibaba: ["www.alibaba.com"] },
    { Aliexpress: ["www.aliexpress.com"] },
];
let website_image = [
    "./website_logo/amazon_logo.png",
    "./website_logo/flipkart_logo.png",
    "./website_logo/alibaba_logo.png",
    "./website_logo/aliexpress_logo.png",
];

let final_html = "";
for (let index = 0; index < website_list.length; index++) {
    final_html += `
                <div
                class="
                    position-relative
                    m-2
                    pb-2
                    pt-2
                    sizeofbox
                    d-inline-flex
                    justify-content-around
                    border-primary border-bottom
                "
            >
                <div class="form-check form-switch">
                    <label
                        class="form-check-label me-4"
                        for="${website_image[index]}"
                        style="font-size:1rem"
                        ><img
                            src="${website_image[index]}"
                            alt=""
                            style="width: 3rem; height: 3rem; border-radius: 50%;"
                            class="me-2"

                        />${website_list[index]}</label
                    >
                   
                </div>
            </div>`;
}
document.getElementById("selection_box").innerHTML = final_html;
// u.insertAdjacentHTML("afterend", final_html);

// console.log(document.getElementsByClassName("container"));
// let website_list = ["Amazon", "Flipkart", "Alibaba", "Aliexpress"];
// let website_url = [
//     { Amazon: ["www.amazon.in", "www.amazon.com"] },
//     { Flipkart: ["www.flipkart.com"] },
//     { Alibaba: ["www.alibaba.com"] },
//     { Aliexpress: ["www.aliexpress.com"] },
// ];
// let website_image = [
//     "./website_logo/amazon_logo.png",
//     "./website_logo/flipkart_logo.png",
//     "./website_logo/alibaba_logo.png",
//     "./website_logo/aliexpress_logo.png",
// ];

// if (localStorage.getItem("final_list") === null) {
//     console.log("1111");
//     window.final_list = [];
//     window.active_url = [];
//     for (let index = 0; index < website_list.length; index++) {
//         let sample = {
//             website_list: website_list[index],
//             website_image: website_image[index],
//             website_url: website_url[index],
//             checked_not: "checked",
//         };
//         final_list.push(sample);
//         active_url.concat(Object.values(website_url[index]));
//     }
//     console.log("iiiiiii", active_url);
//     // chrome.storage.sync.set({ final_list: final_list }, function () {
//     //     console.log("Value is set to " + final_list);
//     // });
//     localStorage.setItem("final_list", JSON.stringify(final_list));
// } else {
//     // chrome.storage.sync.get(["final_list"], function (result) {
//     //     console.log("Value currently is " + result.final_list);
//     // });
//     final_list = JSON.parse(localStorage.getItem("final_list"));
// }

// let final_html = "";
// for (let index = 0; index < final_list.length; index++) {
//     final_html += `
//     <div
//     class="
//         position-relative
//         m-2
//         pb-2
//         pt-2
//         sizeofbox
//         d-inline-flex
//         justify-content-around
//         border-primary border-bottom
//     "
// >
//     <div class="form-check form-switch">
//         <label
//             class="form-check-label me-4"
//             for="${final_list[index].website_list}"
//             ><img
//                 src="${final_list[index].website_image}"
//                 alt=""
//                 style="width: 3rem; height: 3rem"
//                 class="me-2"
//             />${final_list[index].website_list}</label
//         >
//         <input
//             class="form-check-input mt-2 me-4 on_off"
//             type="checkbox"
//             id="${final_list[index].website_list}"
//             value="${final_list[index].website_list}"
//             ${final_list[index].checked_not}
//         />
//     </div>
// </div>`;
// }

// // console.log(final_list);
// let u = document.getElementsByClassName("website_activation")[0];
// u.insertAdjacentHTML("afterend", final_html);

// // console.log(final_list);
// var activated_website = [];
// document.getElementById("save").addEventListener("click", (event) => {
//     var checkboxes = document.querySelectorAll(".on_off");
//     // console.log(checkboxes);

//     for (var index = 0; index < checkboxes.length; index++) {
//         if (!checkboxes[index].checked) {
//             console.log("nnnnn");
//             final_list[index].checked_not = "";
//         } else {
//             final_list[index].checked_not = "checked";
//             // activated_website.push(index);
//             // active_url.push(website_url[index])
//         }
//     }
//     console.log(activated_website);
//     console.log(final_list);
//     localStorage["final_list"] = JSON.stringify(final_list);

//     ///send msg popup to content-script
//     // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     //     let final = JSON.parse(localStorage.getItem("final_list"));
//     //     const payload = {
//     //         final_list: final,
//     //     };
//     //     chrome.tabs.sendMessage(tabs[0].id, payload);
//     // });
// });

///send msg popup to content-script
// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     let final = JSON.parse(localStorage.getItem("final_list"));
//     const payload = {
//         final_list: final,
//     };
//     chrome.tabs.sendMessage(tabs[0].id, payload);
// });

// let final = JSON.parse(localStorage.getItem("final_list"));
// const payload = {
//     final_list: final,
// };
// chrome.tabs.query({}, (tabs) => {
//     tabs.forEach((tab) => {
//         console.log("hhh111222");

//         chrome.tabs.sendMessage(tab.id, payload);
//     });
// });
