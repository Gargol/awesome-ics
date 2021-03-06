
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.getEmptyValue = getEmptyValue;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _util = require("./util");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var PropertyValue = (function () {

    function PropertyValue() {
        _classCallCheck(this, PropertyValue);

        this.clear();
    }

    _createClass(PropertyValue, [{
        key: "clear",
        value: function clear() {
            this.value = null;
            return this;
        }
    }, {
        key: "toString",
        value: function toString() {
            return this.value && this.value.toString();
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return this.value;
        }
    }, {
        key: "setValue",
        value: function setValue(value) {
            this.value = value;
            return this;
        }
    }, {
        key: "convertFromString",
        value: function convertFromString(string) {
            if ((0, _util.isEmptyString)(string)) {
                return this.clear();
            }

            return this.setValue(string);
        }
    }]);

    return PropertyValue;
})();

exports.PropertyValue = PropertyValue;

var PropertyMultipleValue = (function () {
    function PropertyMultipleValue(mapping) {
        _classCallCheck(this, PropertyMultipleValue);

        if (!mapping || typeof mapping !== "function" || !(new mapping() instanceof PropertyValue)) {
            throw new Error("[PropertyMultipleValue] [constructor()] The mapping must be an instance of `PropertyValue`");
        }

        this.mapping = mapping;
        this.clear();
    }

    _createClass(PropertyMultipleValue, [{
        key: "clear",
        value: function clear() {
            this.value = [];
            return this;
        }
    }, {
        key: "toString",
        value: function toString() {
            return this.value.map(_util.mapToString).join(PropertyMultipleValue.__format.separator);
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return this.value.map(_util.mapToJSON);
        }
    }, {
        key: "setValue",
        value: function setValue(value) {
            if (!Array.isArray(value)) {
                throw new Error("[PropertyMultipleValue] [setValue()] The value must be an array");
            }

            this.value = value;
            return this;
        }
    }, {
        key: "convertFromString",
        value: function convertFromString(string) {
            if ((0, _util.isEmptyString)(string)) {
                return this.clear();
            }

            this.value = (0, _util.splitSafe)(string, PropertyMultipleValue.__format.separator).map(function (singleContent) {
                return new this.mapping().convertFromString(singleContent);
            }, this);

            return this;
        }
    }]);

    return PropertyMultipleValue;
})();

exports.PropertyMultipleValue = PropertyMultipleValue;
PropertyMultipleValue.__format = {
    separator: ","
};

var Binary = (function (_PropertyValue) {
    _inherits(Binary, _PropertyValue);

    function Binary() {
        _classCallCheck(this, Binary);

        _get(Object.getPrototypeOf(Binary.prototype), "constructor", this).apply(this, arguments);
    }
    return Binary;
})(PropertyValue);

exports.Binary = Binary;

var Boolean = (function (_PropertyValue2) {
    _inherits(Boolean, _PropertyValue2);

    function Boolean() {
        _classCallCheck(this, Boolean);

        _get(Object.getPrototypeOf(Boolean.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Boolean, [{
        key: "toString",
        value: function toString() {
            if (typeof this.value === "undefined" || this.value === null) {
                return "";
            }

            return this.value.toString().toUpperCase();
        }
    }, {
        key: "setValue",
        value: function setValue(value) {
            if (typeof value !== "boolean" && !(value instanceof Boolean)) {
                throw new Error("[Boolean] [setValue()] The value must be an instance of `Boolean`");
            }

            return _get(Object.getPrototypeOf(Boolean.prototype), "setValue", this).call(this, value);
        }
    }, {
        key: "convertFromString",
        value: function convertFromString(string) {
            if ((0, _util.isEmptyString)(string)) {
                return _get(Object.getPrototypeOf(Boolean.prototype), "clear", this).call(this);
            }

            try {
                this.value = JSON.parse(string.toLowerCase());
            } catch (error) {
                return this.clear();
            }

            return this;
        }
    }]);

    return Boolean;
})(PropertyValue);

exports.Boolean = Boolean;

var CalendarUserAddress = (function (_PropertyValue3) {
    _inherits(CalendarUserAddress, _PropertyValue3);

    function CalendarUserAddress() {
        _classCallCheck(this, CalendarUserAddress);

        _get(Object.getPrototypeOf(CalendarUserAddress.prototype), "constructor", this).apply(this, arguments);
    }
    return CalendarUserAddress;
})(PropertyValue);

exports.CalendarUserAddress = CalendarUserAddress;

var Date = (function (_PropertyValue4) {
    _inherits(Date, _PropertyValue4);

    function Date() {
        _classCallCheck(this, Date);

        _get(Object.getPrototypeOf(Date.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Date, [{
        key: "toString",
        value: function toString() {
            return this.value && this.value.format(Date.__format.date);
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return this.value && this.value.format(Date.__format.date) || null;
        }
    }, {
        key: "setValue",
        value: function setValue(value) {
            if (!_moment2["default"].isMoment(value)) {
                throw new Error("[Date] [setValue()] The value must be an instance of `Moment`");
            }

            return _get(Object.getPrototypeOf(Date.prototype), "setValue", this).call(this, value);
        }
    }, {
        key: "convertFromString",
        value: function convertFromString(string) {
            if ((0, _util.isEmptyString)(string)) {
                return _get(Object.getPrototypeOf(Date.prototype), "clear", this).call(this);
            }

            this.value = _moment2["default"].utc(string, Date.__format.date);

            return this;
        }
    }]);

    return Date;
})(PropertyValue);

exports.Date = Date;

Date.__format = {
    date: "YYYYMMDD"
};

var DateTime = (function (_PropertyValue5) {
    _inherits(DateTime, _PropertyValue5);

    function DateTime(content) {
        _classCallCheck(this, DateTime);

        _get(Object.getPrototypeOf(DateTime.prototype), "constructor", this).call(this, content);
    }

    _createClass(DateTime, [{
        key: "clear",
        value: function clear() {
            this.value = { date: null, time: null };
            return this;
        }
    }, {
        key: "toString",
        value: function toString() {
            if (!this.value || !this.value.date || !this.value.time) {
                return "";
            }

            return "" + this.value.date.toString() + DateTime.__format.separator + this.value.time.toString();
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return {
                date: this.value && this.value.date && this.value.date.toJSON() || null,
                time: this.value && this.value.time && this.value.time.toJSON() || null
            };
        }
    }, {
        key: "convertFromString",
        value: function convertFromString(string) {
            if ((0, _util.isEmptyString)(string)) {
                return this.clear();
            }

            var parts = string.split(DateTime.__format.separator);

            this.value = {
                date: new Date().convertFromString(parts[0]),
                time: new Time().convertFromString(parts[1])
            };

            return this;
        }
    }, {
        key: "setValue",
        value: function setValue(value) {
            if (typeof value !== "object") {
                throw new Error("[DateTime] [setValue()] The value must be an instance of `Object`");
            }

            _get(Object.getPrototypeOf(DateTime.prototype), "setValue", this).call(this, value);

            if (value.date) {
                this.setDate(value.date);
            }
            if (value.time) {
                this.setTime(value.time);
            }

            return this;
        }
    }, {
        key: "setDate",
        value: function setDate(date) {
            if (!(date instanceof Date)) {
                throw new Error("[DateTime] [setDate()] The date must be an instance of `Date`");
            }

            this.value.date = date;
            return this;
        }
    }, {
        key: "setTime",
        value: function setTime(time) {
            if (!(time instanceof Time)) {
                throw new Error("[DateTime] [setTime()] The time must be an instance of `Time`");
            }

            this.value.time = time;
            return this;
        }
    }, {
        key: "setDateValue",
        value: function setDateValue(date) {
            this.value.date = new Date().setValue(date);
            return this;
        }
    }, {
        key: "setTimeValue",
        value: function setTimeValue(time) {
            if (!this.value.time) {
                this.value.time = new Time();
            }
            this.value.time.setTime(time);
            return this;
        }
    }, {
        key: "setIsFixedValue",
        value: function setIsFixedValue(isFixed) {
            if (!this.value.time) {
                this.value.time = new Time();
            }
            this.value.time.setIsFixed(isFixed);
            return this;
        }
    }]);

    return DateTime;
})(PropertyValue);

exports.DateTime = DateTime;

DateTime.__format = {
    separator: "T"
};

var Duration = (function (_PropertyValue6) {
    _inherits(Duration, _PropertyValue6);

    function Duration() {
        _classCallCheck(this, Duration);

        _get(Object.getPrototypeOf(Duration.prototype), "constructor", this).apply(this, arguments);
    }
    return Duration;
})(PropertyValue);

exports.Duration = Duration;

var Float = (function (_PropertyValue7) {
    _inherits(Float, _PropertyValue7);

    function Float() {
        _classCallCheck(this, Float);

        _get(Object.getPrototypeOf(Float.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Float, [{
        key: "setValue",
        value: function setValue(value) {
            if (typeof value !== "number" && !(value instanceof Number)) {
                throw new Error("[Float] [setValue()] The value must be an instance of `Number`");
            }

            return _get(Object.getPrototypeOf(Float.prototype), "setValue", this).call(this, value);
        }
    }, {
        key: "convertFromString",
        value: function convertFromString(string) {
            if ((0, _util.isEmptyString)(string)) {
                return _get(Object.getPrototypeOf(Float.prototype), "clear", this).call(this);
            }

            this.value = parseFloat(string);
            return this;
        }
    }]);

    return Float;
})(PropertyValue);

exports.Float = Float;

var Geo = (function (_PropertyValue8) {
    _inherits(Geo, _PropertyValue8);

    function Geo() {
        _classCallCheck(this, Geo);

        _get(Object.getPrototypeOf(Geo.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Geo, [{
        key: "clear",
        value: function clear() {
            this.value = { latitude: null, longitude: null };
            return this;
        }
    }, {
        key: "toString",
        value: function toString() {
            if (!this.value || !this.value.latitude || !this.value.latitude) {
                return "";
            }

            return "" + this.value.latitude.toString() + Geo.__format.separator + this.value.longitude.toString();
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return this.value && {
                latitude: this.value && this.value.latitude && this.value.latitude.toJSON() || null,
                longitude: this.value && this.value.longitude && this.value.longitude.toJSON() || null
            };
        }
    }, {
        key: "convertFromString",
        value: function convertFromString(string) {
            if ((0, _util.isEmptyString)(string)) {
                return this.clear();
            }

            var coordinates = string.split(Geo.__format.separator);

            this.value = {
                latitude: new Float().convertFromString(coordinates[0]),
                longitude: new Float().convertFromString(coordinates[1])
            };

            return this;
        }
    }, {
        key: "setValue",
        value: function setValue(value) {
            if (typeof value !== "object") {
                throw new Error("[Geo] [setValue()] The value must be an instance of `Object`");
            }

            _get(Object.getPrototypeOf(Geo.prototype), "setValue", this).call(this, value);

            if (value.latitude) {
                this.setLatitude(value.latitude);
            }
            if (value.longitude) {
                this.setLatitude(value.longitude);
            }

            return this;
        }
    }, {
        key: "setLatitude",
        value: function setLatitude(latitude) {
            if (!(latitude instanceof Float)) {
                throw new Error("[Geo] [setLatitude()] The latitude must be an instance of `Float`");
            }

            this.value.latitude = latitude;
            return this;
        }
    }, {
        key: "setLongitude",
        value: function setLongitude(longitude) {
            if (!(longitude instanceof Float)) {
                throw new Error("[Geo] [setLongitude()] The longitude must be an instance of `Float`");
            }

            this.value.longitude = longitude;
            return this;
        }
    }, {
        key: "setLatitudeValue",
        value: function setLatitudeValue(latitude) {
            this.value.latitude = new Float().setValue(latitude);
            return this;
        }
    }, {
        key: "setLongitudeValue",
        value: function setLongitudeValue(longitude) {
            this.value.longitude = new Float().setValue(longitude);
            return this;
        }
    }]);

    return Geo;
})(PropertyValue);

exports.Geo = Geo;

Geo.__format = {
    separator: ";"
};

var Integer = (function (_PropertyValue9) {
    _inherits(Integer, _PropertyValue9);

    function Integer() {
        _classCallCheck(this, Integer);

        _get(Object.getPrototypeOf(Integer.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Integer, [{
        key: "setValue",
        value: function setValue(value) {
            if (typeof value !== "number" && !(value instanceof Number)) {
                throw new Error("[Integer] [setValue()] The value must be an instance of `Number`");
            }

            return _get(Object.getPrototypeOf(Integer.prototype), "setValue", this).call(this, value);
        }
    }, {
        key: "convertFromString",
        value: function convertFromString(string) {
            if ((0, _util.isEmptyString)(string)) {
                return _get(Object.getPrototypeOf(Integer.prototype), "clear", this).call(this);
            }

            this.value = parseInt(string);
            return this;
        }
    }]);

    return Integer;
})(PropertyValue);

exports.Integer = Integer;

var PeriodOfTime = (function (_PropertyValue10) {
    _inherits(PeriodOfTime, _PropertyValue10);

    function PeriodOfTime() {
        _classCallCheck(this, PeriodOfTime);

        _get(Object.getPrototypeOf(PeriodOfTime.prototype), "constructor", this).apply(this, arguments);
    }
    return PeriodOfTime;
})(PropertyValue);

exports.PeriodOfTime = PeriodOfTime;

var RecurrenceRule = (function (_PropertyValue11) {
    _inherits(RecurrenceRule, _PropertyValue11);

    function RecurrenceRule() {
        _classCallCheck(this, RecurrenceRule);

        _get(Object.getPrototypeOf(RecurrenceRule.prototype), "constructor", this).apply(this, arguments);
    }
    return RecurrenceRule;
})(PropertyValue);

exports.RecurrenceRule = RecurrenceRule;

var Text = (function (_PropertyValue12) {
    _inherits(Text, _PropertyValue12);

    function Text() {
        _classCallCheck(this, Text);

        _get(Object.getPrototypeOf(Text.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Text, [{
        key: "setValue",
        value: function setValue(value) {
            if (typeof value !== "string" && !(value instanceof String)) {
                throw new Error("[Integer] [setValue()] The value must be an instance of `Number`");
            }

            return _get(Object.getPrototypeOf(Text.prototype), "setValue", this).call(this, value);
        }
    }]);

    return Text;
})(PropertyValue);

exports.Text = Text;

var Time = (function (_PropertyValue13) {
    _inherits(Time, _PropertyValue13);

    function Time() {
        _classCallCheck(this, Time);

        _get(Object.getPrototypeOf(Time.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Time, [{
        key: "clear",
        value: function clear() {
            this.value = { time: null, isFixed: null };
            return this;
        }
    }, {
        key: "toString",
        value: function toString() {
            if (!this.value || !this.value.time) {
                return "";
            }

            return "" + this.value.time.format(Time.__format.time) + (!this.value.isFixed ? Time.__format.timeUTC : "");
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            if (!this.value) {
                return { isFixed: null, time: null };
            }

            return {
                isFixed: this.value.isFixed,
                time: this.value.time && this.value.time.format(Time.__format.time) || null
            };
        }
    }, {
        key: "convertFromString",
        value: function convertFromString(string) {
            if ((0, _util.isEmptyString)(string)) {
                return this.clear();
            }

            this.value = {
                time: (0, _moment2["default"])(string.slice(0, 6), Time.__format.time),
                isFixed: string.slice(-1) !== Time.__format.timeUTC
            };

            return this;
        }
    }, {
        key: "setValue",
        value: function setValue(value) {
            if (typeof value !== 'object') {
                throw new Error("[Time] [setValue()] The value must be an instance of `Object`");
            }
            _get(Object.getPrototypeOf(Time.prototype), "setValue", this).call(this, value);

            if (value.time) {
                this.setTime(value.time);
            }
            if (value.isFixed) {
                this.setIsFixed(value.isFixed);
            }

            return this;
        }
    }, {
        key: "setTime",
        value: function setTime(time) {
            if (!_moment2["default"].isMoment(time)) {
                throw new Error("[Time] [setTime()] The time must be an instance of `Moment`");
            }

            this.value.time = time;
            return this;
        }
    }, {
        key: "setIsFixed",
        value: function setIsFixed(isFixed) {
            if (typeof isFixed !== "boolean" && !(isFixed instanceof Boolean)) {
                throw new Error("[Time] [setIsFixed()] The isFixed must be an instance of `Boolean`");
            }

            this.value.isFixed = isFixed;
            return this;
        }
    }]);

    return Time;
})(PropertyValue);

exports.Time = Time;

Time.__format = {
    time: "HHmmSS",
    timeUTC: "Z"
};

var URI = (function (_PropertyValue14) {
    _inherits(URI, _PropertyValue14);

    function URI() {
        _classCallCheck(this, URI);

        _get(Object.getPrototypeOf(URI.prototype), "constructor", this).apply(this, arguments);
    }
    return URI;
})(PropertyValue);

exports.URI = URI;

var UTCOffset = (function (_PropertyValue15) {
    _inherits(UTCOffset, _PropertyValue15);

    function UTCOffset() {
        _classCallCheck(this, UTCOffset);

        _get(Object.getPrototypeOf(UTCOffset.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(UTCOffset, [{
        key: "toString",
        value: function toString() {
            return this.value && this.value.format(UTCOffset.__format.offset);
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return this.value && this.value.format(UTCOffset.__format.date) || null;
        }
    }, {
        key: "setValue",
        value: function setValue(value) {
            if (!_moment2["default"].isMoment(value)) {
                throw new Error("[Date] [setValue()] The value must be an instance of `Moment`");
            }

            return _get(Object.getPrototypeOf(UTCOffset.prototype), "setValue", this).call(this, value);
        }
    }, {
        key: "convertFromString",
        value: function convertFromString(string) {
            if ((0, _util.isEmptyString)(string)) {
                return _get(Object.getPrototypeOf(UTCOffset.prototype), "clear", this).call(this);
            }

            this.value = (0, _moment2["default"])().utcOffset(string);
            return this;
        }
    }]);

    return UTCOffset;
})(PropertyValue);

exports.UTCOffset = UTCOffset;

UTCOffset.__format = {
    offset: "ZZ"
};
Date.isMultiple = true;
DateTime.isMultiple = true;
Duration.isMultiple = true;
Float.isMultiple = true;
Integer.isMultiple = true;
PeriodOfTime.isMultiple = true;
Time.isMultiple = true;
Text.isMultiple = false;
var valueMapping = {
    "CALSCALE": Text,
    "METHOD": Text,
    "PRODID": Text,
    "VERSION": Text,
    "ATTACH": [URI, Binary],
    "CATEGORIES": Text,
    "CLASS": Text,
    "COMMENT": Text,
    "DESCRIPTION": Text,
    "GEO": Geo,
    "LOCATION": Text,
    "PERCENT-COMPLETE": Integer,
    "PRIORITY": Integer,
    "RESOURCES": Text,
    "STATUS": Text,
    "SUMMARY": Text,
    "COMPLETED": DateTime,
    "DTEND": [DateTime, Date],
    "DUE": [DateTime, Date],
    "DTSTART": [DateTime, Date],
    "DURATION": Duration,
    "FREEBUSY": PeriodOfTime,
    "TRANSP": Text,
    "TZID": Text,
    "TZNAME": Text,
    "TZOFFSETFROM": UTCOffset,
    "TZOFFSETTO": UTCOffset,
    "TZURL": URI,
    "ATTENDEE": CalendarUserAddress,
    "CONTACT": Text,
    "ORGANIZER": CalendarUserAddress,
    "RECURRENCE-ID": [DateTime, Date],
    "RELATED-TO": Text,
    "URL": URI,
    "UID": Text,
    "EXDATE": [DateTime, Date],
    "RDATE": [DateTime, Date, PeriodOfTime],
    "RRULE": RecurrenceRule,
    "ACTION": Text,
    "REPEAT": Integer,
    "TRIGGER": [Duration, DateTime],
    "CREATED": DateTime,
    "DTSTAMP": DateTime,
    "LAST-MODIFIED": DateTime,
    "SEQUENCE": Integer,
    "REQUEST-STATUS": Text,
    "DEFAULT": Text
};
var valuePropertyParameterMapping = {
    "BINARY": Binary,
    "BOOLEAN": Boolean,
    "CAL-ADDRESS": URI,
    "DATE": Date,
    "DATE-TIME": DateTime,
    "DURATION": Duration,
    "FLOAT": Float,
    "INTEGER": Integer,
    "PERIOD": PeriodOfTime,
    "RECUR": RecurrenceRule,
    "TEXT": Text,
    "TIME": Time,
    "URI": URI,
    "UTC-OFFSET": UTCOffset
};
function getValueParameter(propertyParameters) {
    if (!propertyParameters || !propertyParameters.length) {
        return;
    }

    for (var i = 0; i < propertyParameters.length; i++) {
        if (propertyParameters[i].name === "VALUE") {
            return propertyParameters[i];
        }
    }
}

function getEmptyValue(propertyName, propertyValue, propertyParameters) {
    var mapping = valuePropertyParameterMapping[(getValueParameter(propertyParameters) || {}).value] || valueMapping[propertyName] || valueMapping["DEFAULT"];
    var containsMultipleSeparator = propertyValue && (0, _util.splitSafe)(propertyValue, PropertyMultipleValue.__format.separator).length > 1;

    mapping = Array.isArray(mapping) ? mapping[0] : mapping;

    if (mapping.isMultiple === true && containsMultipleSeparator) {
        return new PropertyMultipleValue(mapping);
    }

    return new mapping();
}
