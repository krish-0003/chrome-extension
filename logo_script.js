console.log("hi");
console.log(document.getElementsByClassName("container"));
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

if (localStorage.getItem("final_list") === null) {
    console.log("1111");
    window.final_list = [];
    window.active_url = [];
    for (let index = 0; index < website_list.length; index++) {
        let sample = {
            website_list: website_list[index],
            website_image: website_image[index],
            website_url: website_url[index],
            checked_not: "checked",
        };
        final_list.push(sample);
        active_url.concat(Object.values(website_url[index]));
    }
    console.log("iiiiiii", active_url);
    // chrome.storage.sync.set({ final_list: final_list }, function () {
    //     console.log("Value is set to " + final_list);
    // });
    localStorage.setItem("final_list", JSON.stringify(final_list));
} else {
    // chrome.storage.sync.get(["final_list"], function (result) {
    //     console.log("Value currently is " + result.final_list);
    // });
    final_list = JSON.parse(localStorage.getItem("final_list"));
}

let final_html = "";
for (let index = 0; index < final_list.length; index++) {
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
                        for="${final_list[index].website_list}"
                        ><img
                            src="${final_list[index].website_image}"
                            alt=""
                            style="width: 3rem; height: 3rem"
                            class="me-2"
                        />${final_list[index].website_list}</label
                    >
                    <input
                        class="form-check-input mt-2 me-4 on_off"
                        type="checkbox"
                        id="${final_list[index].website_list}"
                        value="${final_list[index].website_list}"
                        ${final_list[index].checked_not}
                    />
                </div>
            </div>`;
}

// console.log(final_list);
let u = document.getElementsByClassName("website_activation")[0];
u.insertAdjacentHTML("afterend", final_html);

// console.log(final_list);
var activated_website = [];
document.getElementById("save").addEventListener("click", (event) => {
    var checkboxes = document.querySelectorAll(".on_off");
    // console.log(checkboxes);

    for (var index = 0; index < checkboxes.length; index++) {
        if (!checkboxes[index].checked) {
            console.log("nnnnn");
            final_list[index].checked_not = "";
        } else {
            final_list[index].checked_not = "checked";
            // activated_website.push(index);
            // active_url.push(website_url[index])
        }
    }
    console.log(activated_website);
    console.log(final_list);
    localStorage["final_list"] = JSON.stringify(final_list);

    ///send msg popup to content-script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let final = JSON.parse(localStorage.getItem("final_list"));
        const payload = {
            final_list: final,
        };
        chrome.tabs.sendMessage(tabs[0].id, payload);
    });
});

///send msg popup to content-script
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let final = JSON.parse(localStorage.getItem("final_list"));
    const payload = {
        final_list: final,
    };
    chrome.tabs.sendMessage(tabs[0].id, payload);
});

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


