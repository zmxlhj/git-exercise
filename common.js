
var ww = (function () {
    'use strict';
    // 强制保留2位小数
    function floatTwo(x) {
        let f_x = parseFloat(x);
        if (isNaN(f_x)) {
            return false;
        }
        f_x = Math.round(x * 100) / 100;
        let s_x = f_x.toString();
        let pos_decimal = s_x.indexOf('.');
        if (pos_decimal < 0) {
            pos_decimal = s_x.length;
            s_x += '.';
        }
        while (s_x.length <= pos_decimal + 2) {
            s_x += '0';
        }
        return s_x;
    };

    // 通用事件绑定方法 obj对象，eventType事件类型，fn事件内容
    function listenEvent(obj, eventType, fn) {
        if (obj.addEventListener) { // w3c标准浏览器 
            obj.addEventListener(eventType, fn, false); // false 表示不捕获事件，事件冒泡
        } else if (obj.attachEvent) { // ie低版本浏览器
            obj.attachEvent('on' + eventType, fn);
        } else {
            obj['on' + eventType] = fn;
        }
    };

    // 通用解除事件绑定 obj对象，eventType事件类型，fn事件内容
    function stopListening(obj, eventType, fn) {
        if (obj.removeEventListener) {
            obj.removeEventListener(eventType, fn, false);
        } else if (obj.detachEvent) {
            obj.detachEvent('on' + eventType, fn);
        } else {
            obj['on' + eventType] = null;
        }
    };

    // 通用阻止事件默认行为 ev需要阻止默认行为的元素
    function preventEvent(ev) {
        if (ev.preventDefault) {
            ev.preventDefault();
        } else {
            ev.retuenValue = false;
        }
    };

    // 通用阻止事件冒泡 ev需要阻止事件冒泡的元素
    function cancelPropagation(ev) {
        if (ev.stopPropagation) {
            ev.stopPropagation()
        } else {
            ev.cancelBubble = true;
        }
    };

    //时间戳转成日期
    function toDate(timestamp) {
        try {
            if (getType(timestamp) != 'number') throw '参数' + timestamp + '[timestamp]不是一个数字!';
            if ((timestamp + '').length != 10 && (timestamp + '').length != 13) throw '参数' + timestamp + '[timestamp]不是一个正确的时间戳格式!';
        } catch (err) {
            alert('工具库sliceArr函数异常：' + err);
            return;
        }
        var date = 0;
        if ((timestamp.toString()).length == 10) {
            date = new Date(timestamp * 1000); //时间戳为10位需*1000
        } else {
            date = new Date(timestamp);
        }
        var Y = add0(date.getFullYear());
        var M = add0(date.getMonth() + 1);
        var D = add0(date.getDate());
        var h = add0(date.getHours());
        var m = add0(date.getMinutes());
        var s = add0(date.getSeconds());
        return [Y, M, D, h, m, s];
    }

    // 时间戳形式的时间段转为时间形式的时间段
    function durationToTime(difference) {
        try {
            if (getType(difference) != 'number') throw '参数' + difference + '[difference]不是一个数字!';
            if (difference <= 0) throw '参数' + difference + '[difference]小于0!'; // 时间差为负
        } catch (err) {
            alert('工具库sliceArr函数异常：' + err);
            return;
        }
        // 将时间戳形式的时间差转为日期形式的时间差
        var date = parseInt(difference / (1000 * 60 * 60 * 24));
        difference = difference - date * 1000 * 60 * 60 * 24;
        var hour = parseInt(difference / (1000 * 60 * 60));
        difference = difference - hour * 1000 * 60 * 60;
        var min = parseInt(difference / (1000 * 60));
        difference = difference - min * 1000 * 60;
        var second = parseInt(difference / 1000);
        // 返回
        return [add0(date), add0(hour), add0(min), add0(second)];
    }

    // 十以内补零
    function add0(num) {
        try {
            if (getType(num) != 'number') throw '参数' + num + '[num]不是一个数字!';
        } catch (err) {
            alert('工具库sliceArr函数异常：' + err);
            return;
        }
        return num < 10 ? 0 + num.toString() : num.toString();
    }

    // 类型判断
    function getType(obj) {
        var type = typeof obj;
        if (type != "object") {
            return type;
        }
        return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');
    }
    

    let module = {
        floatTwo: floatTwo,                         // 强制保留2位小数
        listenEvent: listenEvent,                   // 事件绑定
        stopListening: stopListening,               // 解除事件绑定
        preventEvent: preventEvent,                 // 阻止事件默认行为
        cancelPropagation: cancelPropagation,       // 阻止事件冒泡
        getType:getType,                            // 类型判断
        add0: add0,                                 // 十以内补零
        durationToTime: durationToTime,             // 时间戳形式的时间段(456465164614100)转为时间形式的时间段(天/时/分/秒)
        toDate: toDate,                             // 时间戳转成日期
    };
    return module
})();



