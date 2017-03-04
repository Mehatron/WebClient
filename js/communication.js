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

    if(data.mode == "lock")
    {
        $("#btnMode").prop("disabled", true);
        $("#btnUp").prop("disabled", true);
        $("#btnDown").prop("disabled", true);
        $("#btnRight").prop("disabled", true);
        $("#btnLeft").prop("disabled", true);
        $("#btnRotate").prop("disabled", true);
        $("#btnExtend").prop("disabled", true);
        $("#btnGrab").prop("disabled", true);
    } else
    {
        $("#btnMode").prop("disabled", false);
        $("#btnUp").prop("disabled", false);
        $("#btnDown").prop("disabled", false);
        $("#btnRight").prop("disabled", false);
        $("#btnLeft").prop("disabled", false);
        $("#btnRotate").prop("disabled", false);
        $("#btnExtend").prop("disabled", false);
        $("#btnGrab").prop("disabled", false);

        if(data.mode == "automatic")
            $("#btnMode").html("Manual");
        else
            $("#btnMode").html("Automatic");
    }

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
