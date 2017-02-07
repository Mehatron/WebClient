var socket;

function connect() {
    socket = new WebSocket("ws://" + document.domain + ":8272/");

    socket.onmessage = function(e) {
        recived(e.data);
    };
};

function disconnect() {
    socket.close();
};

function send(data) {
    socket.send(data);
};

function recived(msg) {
    data = JSON.parse(msg);

    if(data.mode == "automatic")
        $("#btnModeSelect").html("Manual");
    else
        $("#btnModeSelect").html("Automatic")

    if(data.rotation_down)
        $("#btnRotate").html("Rotate Up");
    else if(data.rotation_up)
        $("#btnRotate").html("Rotate Down");

    if(data.extends_unextended)
        $("#btnExtend").html("Extend");
    else if(data.extends_extended)
        $("#btnExtend").html("Un Extend");

    if(data.picked)
        $("#btnGrab").html("Place");
    else
        $("#btnGrab").html("Pick");
};
