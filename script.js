'use strict';

var contents = document.getElementById("content_listContainer").children;
for (const item of contents) {
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.className = "selector";
    checkBox.name = "selector";
    checkBox.id = "selector";
    checkBox.style.display = "inline";
    checkBox.style.float = "left";
    let img = item.getElementsByClassName("item_icon")[0];
    item.replaceChild(checkBox, img);
}

var toolbar = document.createElement("div");
toolbar.style.paddingTop = "20px";
var selectall = document.createElement("input");
selectall.setAttribute("type", "checkbox");
toolbar.appendChild(selectall);
var dlbutton = document.createElement("button");
dlbutton.innerHTML = "批量下载";
toolbar.appendChild(dlbutton);
document.getElementById("pageTitleDiv").appendChild(toolbar);


var selectors = document.all('selector');
selectall.addEventListener('click', function () {

    if (selectors.length == undefined) {//一个选项时
        selectors.checked = selectall.checked;
    } else {
        for (var i = 0; i < selectors.length; i++) {//多个选项时
            selectors[i].checked = this.checked;
        }
    }
}, false);

if (selectors.length == undefined) {//一个选项时
    selectors.addEventListener('click', function () {
        selectall.checked = selectors.checked;
    }, false);
} else {
    for (var i = 0; i < selectors.length; i++) {//多个选项时
        selectors[i].addEventListener('click', function () {
            for (var i = 0; i < selectors.length; i++) {
                if (!selectors[i].checked) {
                    selectall.checked = false; //全选自动取消
                    break;
                } else {
                    if (i == selectors.length - 1) { selectall.checked = true; }; //全选自动勾选
                }
            }
        }, false);
    }
}

dlbutton.addEventListener('click', function () {
    var dllist = [];
    for (const item of contents) {
        if (item.getElementsByClassName("selector")[0].checked == true) {
            var atags = item.getElementsByTagName('a');
            for (const atag of atags) {
                if (!atag.classList.contains("cmimg-hide")) {
                    dllist.push([atag.href, atag.innerText]);
                }
            }
        }
    }
    console.log(dllist)
    chrome.runtime.sendMessage(dllist);

}, false);