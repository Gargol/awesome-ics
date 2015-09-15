import { splitSafe, isEmptyString } from "./util";

const propertyTypes = [
    "ALTREP",
    "CN",
    "CUTYPE",
    "DELEGATED-FROM",
    "DELEGATED-TO",
    "DIR",
    "ENCODING",
    "FMTTYPE",
    "FBTYPE",
    "LANGUAGE",
    "MEMBER",
    "PARTSTAT",
    "RANGE",
    "RELATED",
    "RELTYPE",
    "ROLE",
    "RSVP",
    "SENT-BY",
    "TZID",
    "VALUE"
];

export class PropertyParameter {
    constructor() {
        this.clear();
    }
    clear() {
        this.name   = null;
        this.value  = null;

        return this;
    }
    toString() {
        return [ this.name, this.value ].join(PropertyParameter.__format.separator);
    }
    toJSON() {
        return {
            name    : this.name,
            value   : this.value
        };
    }
    convertFromString(string) {
        if (isEmptyString(string)) { return this.clear(); }

        this.name       = splitSafe(string, PropertyParameter.__format.separator)[0];
        this.value      = string.slice(this.name.length + 1);

        return this;
    }
    setName(name) {
        this.name = name;
        return this;
    }
    setValue(value) {
        this.value = value;
        return this;
    }
}

PropertyParameter.__format = {
    separator: "="
};