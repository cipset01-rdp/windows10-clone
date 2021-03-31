const folders = document.querySelectorAll(".folder");
const folderOptions = document.querySelector(".folderOptions");

// move folders
interact(".folder")
    .styleCursor(false)
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: "parent",
                endOnly: true,
            }),
        ],
        // enable autoScroll
        autoScroll: true,

        listeners: {
            // call this function on every dragmove event
            move: dragMoveListener,

            // call this function on every dragend event
            end(event) {},
        },
    });

function dragMoveListener(event) {
    var target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";

    // update the posiion attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

// open folders options
folders.forEach((div) => {
    // folder options
    window.addEventListener("click", function (e) {
        if (folderOptions.contains(e.target)) {
            return;
        } else {
            folderOptions.style.display = "none";
        }
    });

    //cliking on folder options
    if (div.addEventListener) {
        div.addEventListener(
            "contextmenu",
            function (e) {
                desktopOptions.style.display = "none";

                folderOptions.style.display = "block";
                folderOptions.style.right = e.clientX + "px";
                folderOptions.style.left = e.clientX + "px";
                folderOptions.style.top = e.clientY + "px";

                e.preventDefault();
            },
            false
        );
    } else {
        div.attachEvent("oncontextmenu", function () {
            alert("You've tried to open context menu");
            desktop.event.returnValue = false;
        });
    }
});

// adding custom right click
const desktop = document.querySelector(".desktop");
const desktopOptions = document.querySelector(".desktopOptions");

// click outside box
window.addEventListener("click", function (e) {
    if (desktopOptions.contains(e.target)) {
        return;
    } else {
        desktopOptions.style.display = "none";
    }
});

if (desktop.addEventListener) {
    desktop.addEventListener(
        "contextmenu",
        function (e) {
            e.preventDefault();

            desktopOptions.style.display = "block";
            desktopOptions.style.right = e.clientX + "px";
            desktopOptions.style.left = e.clientX + "px";
            desktopOptions.style.top = e.clientY + "px";
        },
        false
    );
} else {
    document.attachEvent("oncontextmenu", function () {
        alert("You've tried to open context menu");
        desktop.event.returnValue = false;
    });
}

//drag selector
new DragSelect({
    selectables: document.querySelectorAll(".folder"),
    callback: (e) => console.log(e),
});
