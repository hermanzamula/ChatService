Demo = function() {

  var output = document.getElementById('output'),
      demo   = document.getElementById('demo'),
      panic  = document.getElementById('panic'),
      warn   = document.getElementById('warn'),
      calm   = document.getElementById('calm'),
      clear  = document.getElementById('clear'),
      count  = 0;

  var log = function(msg, separate) {
    count = count + (separate ? 1 : 0);
    output.value = count + ": " + msg + "\n" + (separate ? "\n" : "") + output.value;
    demo.className = fsm.current;
    panic.disabled = fsm.cannot('panic');
    warn.disabled  = fsm.cannot('warn');
    calm.disabled  = fsm.cannot('calm');
    clear.disabled = fsm.cannot('clear');
  };

  var fsm = StateMachine.create({

    events: [
      { name: 'start', from: 'none',   to: 'green'  },
      { name: 'warn',  from: 'green',  to: 'yellow' },
      { name: 'panic', from: 'green',  to: 'red'    },
      { name: 'panic', from: 'yellow', to: 'red'    },
      { name: 'calm',  from: 'red',    to: 'yellow' },
      { name: 'clear', from: 'red',    to: 'green'  },
      { name: 'clear', from: 'yellow', to: 'green'  }
    ],

    callbacks: {
      onbeforestart: function(event, from, to) { log("STARTING UP"); },
      onstart:       function(event, from, to) { log("READY");       },

      onbeforewarn:  function(event, from, to) { log("START   EVENT: warn!"  + "from: " + from + " to: " + to + " event: " + event,  true);  },
      onbeforepanic: function(event, from, to) { log("START   EVENT: panic!"  + "from: " + from + " to: " + to + " event: " + event, true);  },
      onbeforecalm:  function(event, from, to) { log("START   EVENT: calm!"  + "from: " + from + " to: " + to + " event: " + event,  true);  },
      onbeforeclear: function(event, from, to) { log("START   EVENT: clear!"  + "from: " + from + " to: " + to + " event: " + event, true);  },

      onwarn:        function(event, from, to) { log("FINISH  EVENT: warn!"  + "from: " + from + " to: " + to + " event: " + event);         },
      onpanic:       function(event, from, to) { log("FINISH  EVENT: panic!"  + "from: " + from + " to: " + to + " event: " + event);        },
      oncalm:        function(event, from, to) { log("FINISH  EVENT: calm!"  + "from: " + from + " to: " + to + " event: " + event);         },
      onclear:       function(event, from, to) { log("FINISH  EVENT: clear!"  + "from: " + from + " to: " + to + " event: " + event);        },

      onleavegreen:  function(event, from, to) { log("LEAVE   STATE: green"  + "from: " + from + " to: " + to + " event: " + event);  },
      onleaveyellow: function(event, from, to) { log("LEAVE   STATE: yellow"  + "from: " + from + " to: " + to + " event: " + event); },
      onleavered:    function(event, from, to) { log("LEAVE   STATE: red"  + "from: " + from + " to: " + to + " event: " + event);    async(to); return StateMachine.ASYNC; },

      ongreen:       function(event, from, to) { log("ENTER   STATE: green"  + "from: " + from + " to: " + to + " event: " + event);  },
      onyellow:      function(event, from, to) { log("ENTER   STATE: yellow"  + "from: " + from + " to: " + to + " event: " + event); },
      onred:         function(event, from, to) { log("ENTER   STATE: red"  + "from: " + from + " to: " + to + " event: " + event);    },

      onchangestate: function(event, from, to) { log("CHANGED STATE: " + from + " to " + to); }
    }
  });

  var async = function(to) {
    pending(to, 3);
    setTimeout(function() {
      pending(to, 2);
      setTimeout(function() {
        pending(to, 1);
        setTimeout(function() {
          fsm.transition(); // trigger deferred state transition
        }, 1000);
      }, 1000);
    }, 1000);
  };

  var pending = function(to, n) { log("PENDING STATE: " + to + " in ..." + n); };

  fsm.start();
  return fsm;

}();

