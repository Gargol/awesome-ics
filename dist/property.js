"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _util = require("./util");

var _propertyParameter = require("./property-parameter");

var _propertyValue = require("./property-value");

var Property = (function () {
    function Property(content) {
        _classCallCheck(this, Property);

        this.original = content;
        this.parameters = [];
        this.name = null;
        this.value = null;

        if (!content) {
            return;
        }

        this.name = (0, _util.splitSafe)(content, Property.__format.separatorProperty)[0];
        this.value = content.slice(this.name.length + 1);

        var parameters = (0, _util.splitSafe)(this.name, Property.__format.separatorParameter);

        if (this.name.indexOf(Property.__format.separatorParameter) !== -1) {
            this.name = parameters[0];
            this.parameters = parameters.slice(1).map(function (paramContent) {
                return new _propertyParameter.PropertyParameter(paramContent);
            });
        }

        this.value = (0, _propertyValue.getValue)(this.name, this.value, this.parameters);
    }

    _createClass(Property, [{
        key: "toString",
        value: function toString() {
            var name = this.name;

            if (this.parameters.length) {
                var parameters = this.parameters.map(_util.mapToString).join(Property.__format.separatorParameter);
                name = [name, parameters].join(Property.__format.separatorParameter);
            }

            var value = name + Property.__format.separatorProperty + this.value.toString();
            var returnValue = value.slice(0, Property.__format.lineMaxLength);
            var rest = value.slice(Property.__format.lineMaxLength);

            while (rest.length) {
                rest = " " + rest;
                returnValue = returnValue.concat(Property.__format.newLine + rest.slice(0, Property.__format.lineMaxLength));
                rest = rest.slice(Property.__format.lineMaxLength);
            }

            return returnValue;
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return {
                name: this.name,
                parameters: this.parameters.map(_util.mapToJSON),
                value: (0, _util.mapToJSON)(this.value)
            };
        }
    }]);

    return Property;
})();

exports.Property = Property;

Property.__format = {
    separatorProperty: ":",
    separatorParameter: ";",
    lineMaxLength: 72,
    newLine: "\n",
    multiLineBegin: " "
};
