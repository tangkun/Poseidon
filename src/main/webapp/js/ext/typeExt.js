///-----------基础扩展start----------------//
(function($)
{
    $.valid = function (v) {
        return v != null && typeof (v) != "undefined";
    };
    $.times = function () {
        return (new Date()) * 1000 + Math.floor(Math.random() * 1000);        
    }
    $.fn.extend(
    {
        serializeObject: function () {
            function arrayToObject(arr) {
                var ret = {};
                for (var i = 0; i < arr.length; i++) {
                    ret[arr[i].name] = arr[i].value;
                }
                return ret;
            }
            var arrobj;
            var myform = $(this);
            var disabled = myform.find(':input:disabled').removeAttr('disabled');
            try {
                arrobj = myform.serializeArray();
            }
            finally {
                disabled.attr('disabled', 'disabled');
            }
            return arrayToObject(arrobj);
        }
    });
    
    
    Array.prototype.removeAt = function (dx) {
        if (isNaN(dx) || dx > this.length) { return false; }
        for (var i = 0, n = 0; i < this.length; i++) {
            if (this[i] != this[dx]) {
                this[n++] = this[i]
            }
        }
        this.length -= 1
    }
})(jQuery)