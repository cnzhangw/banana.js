onmessage = function (e) {
    var a = e.data;
    if (a && a.__THREAD_TASK__) {
        var d = a.__THREAD_TASK__;
        try {
            var f = (new Function("return " + d))(),
            b = {
                threadSignal: !0,
                sleep: function (a) {
                    b.threadSignal = !1;
                    setTimeout(c, a)
                },
                runOnUiThread: function (b) {
                    postMessage({
                        __UI_TASK__: b.toString(),
                        sharedObj: a.sharedObj
                    });
                }
            },
            c = function () {
                b.threadSignal = !0;
                var c = f.call(b, a.sharedObj);
                postMessage({
                    error: null,
                    returnValue: c,
                    __THREAD_TASK__: d,
                    sharedObj: a.sharedObj,
                    taskId: a.taskId
                });
            };
            c();
        } catch (g) {
            postMessage({
                error: g.toString(),
                returnValue: null,
                sharedObj: a.sharedObj
            });
        }
    }
};