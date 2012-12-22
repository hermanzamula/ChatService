var State = {
    BOLD: "*",
    UNDERLINE: "_",
    OVERCROSSED: "-",
    LINK_START: "[",
    LINK_START_ADDRESS: "!",
    LINK_END: "]",
    TEXT: "^[*|_|-|*|[|]|!"
};

var Transitions = {
    INITIAL: {name: 'initial', from: "", to: [State.TEXT, State.UNDERLINE, State.OVERCROSSED, State.LINK_START]},
    BOLD: { name: 'bold', from: State.BOLD, to: [State.TEXT, State.UNDERLINE, State.OVERCROSSED, State.LINK_START]},
    UNDERLINE: { name: 'underline', from: State.UNDERLINE, to: [State.BOLD, State.TEXT, State.OVERCROSSED, State.LINK_START]},
    OVERCROSSED: { name: 'overcrossed', from: State.OVERCROSSED, to: [State.BOLD, State.UNDERLINE, State.TEXT, State.LINK_START]},
    LINK_START: { name: 'link_start', from: State.LINK_START, to: [State.TEXT, State.LINK_START_ADDRESS] },
    LINK_START_ADDRESS: { name: 'link_start_address', from: State.LINK_START_ADDRESS, to: [State.TEXT]},
    LINK_END: { name: 'link_end', from: State.LINK_END, to: [State.BOLD, State.UNDERLINE, State.OVERCROSSED, State.LINK_START, State.TEXT]},
    TEXT: {name: 'text', from: State.TEXT, to: [State.BOLD, State.LINK_START, State.LINK_START_ADDRESS, State.LINK_END, State.UNDERLINE, State.OVERCROSSED]}
};


//TODO: make parser
var Parsers = {
    onbold: function (event, from, to) {

    },
    onunderline: function (event, from, to) {
    },
    onovercrossed: function (event, from, to) {
    },
    onlink_start: function (event, from, to) {
    },
    onlink_start_address: function (event, from, to) {
    },
    onlink_end: function (event, from, to) {
    },
    ontext: function (event, from, to) {
    }
};


ChatMessageParser = function () {

    var output = document.getElementById('output'),
        demo = document.getElementById('demo'),
        panic = document.getElementById('panic'),
        warn = document.getElementById('warn'),
        calm = document.getElementById('calm'),
        clear = document.getElementById('clear'),
        count = 0;

    var log = function (msg, separate) {
        count = count + (separate ? 1 : 0);
        output.value = count + ": " + msg + "\n" + (separate ? "\n" : "") + output.value;
        demo.className = fsm.current;
        panic.disabled = fsm.cannot('panic');
        warn.disabled = fsm.cannot('warn');
        calm.disabled = fsm.cannot('calm');
        clear.disabled = fsm.cannot('clear');
    };

    var fsm = StateMachine.create({

        events: [
            Transitions.BOLD,
            Transitions.UNDERLINE,
            Transitions.OVERCROSSED,
            Transitions.LINK_END,
            Transitions.LINK_START,
            Transitions.LINK_START_ADDRESS,
            Transitions.TEXT
        ],

        callbacks: {
            onbeforestart: function (event, from, to) {
                log("STARTING UP");
            },
            onstart: function (event, from, to) {
                log("READY");
            },

            onbeforewarn: function (event, from, to) {
                log("START   EVENT: warn!", true);
            },
            onbeforepanic: function (event, from, to) {
                log("START   EVENT: panic!", true);
            },
            onbeforecalm: function (event, from, to) {
                log("START   EVENT: calm!", true);
            },
            onbeforeclear: function (event, from, to) {
                log("START   EVENT: clear!", true);
            },

            onwarn: function (event, from, to) {
                log("FINISH  EVENT: warn!");
            },
            onpanic: function (event, from, to) {
                log("FINISH  EVENT: panic!");
            },
            oncalm: function (event, from, to) {
                log("FINISH  EVENT: calm!");
            },
            onclear: function (event, from, to) {
                log("FINISH  EVENT: clear!");
            },

            onleavegreen: function (event, from, to) {
                log("LEAVE   STATE: green");
            },
            onleaveyellow: function (event, from, to) {
                log("LEAVE   STATE: yellow");
            },
            onleavered: function (event, from, to) {
                log("LEAVE   STATE: red");
                async(to);
                return StateMachine.ASYNC;
            },

            ongreen: function (event, from, to) {
                log("ENTER   STATE: green");
            },
            onyellow: function (event, from, to) {
                log("ENTER   STATE: yellow");
            },
            onred: function (event, from, to) {
                log("ENTER   STATE: red");
            },

            onchangestate: function (event, from, to) {
                log("CHANGED STATE: " + from + " to " + to);
            }
        }
    });

    var async = function (to) {
        pending(to, 3);
        setTimeout(function () {
            pending(to, 2);
            setTimeout(function () {
                pending(to, 1);
                setTimeout(function () {
                    fsm.transition(); // trigger deferred state transition
                }, 1000);
            }, 1000);
        }, 1000);
    };

    var pending = function (to, n) {
        log("PENDING STATE: " + to + " in ..." + n);
    };

    fsm.start();
    return fsm;

}();