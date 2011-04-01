var testCase = require('nodeunit').testCase;
var Argo = require("../argo.js");

var tmpl = Argo.renderTmpl;

exports["Plain-text pass-through"] = function(test) {
    test.equals(tmpl("abc", {}), "abc");
    test.done();
};

exports["Simple expressions"] = testCase({
    "simple expression": function(test) {
        test.equals(tmpl("a{{x}}b", {x: "1"}), "a1b");
        test.done();
    },
    "non-existent variable": function(test) {
        test.equals(tmpl("a{{x}}b", {}), "ab");
        test.done();
    }
});

exports["Complex expressions"] = testCase({
    "existing": function(test) {
        test.equals(tmpl("{{a.b.c}}", {a:{b:{c:1}}}), "1");
        test.done();
    },
    "non-existent": function(test) {
        test.equals(tmpl("{{a.b.c}}", {}), "");
        test.done();
    }
});

exports["Stray mustaches"] = function(test) {
    var s = "}}}foo{bar}}baz{";
    test.equals(tmpl(s, {}), s);
    test.done();
};
