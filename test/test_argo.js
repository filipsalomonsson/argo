var testCase = require('nodeunit').testCase;
var Argo = require("../argo.js");

var tmpl = Argo.renderTmpl;

exports["Plain-text pass-through"] = function(test) {
    test.expect(1);
    test.equals(tmpl("abc", {}), "abc");
    test.done();
};

exports["Simple expressions"] = testCase({
    "simple expression": function(test) {
        test.expect(1);
        test.equals(tmpl("a{{x}}b", {x: "1"}), "a1b");
        test.done();
    },
    "non-existent variable": function(test) {
        test.expect(1);
        test.equals(tmpl("a{{x}}b", {}), "ab");
        test.done();
    }
});

exports["Complex expressions"] = testCase({
    "existing": function(test) {
        test.expect(1);
        test.equals(tmpl("{{a.b.c}}", {a:{b:{c:1}}}), "1");
        test.done();
    },
    "non-existent": function(test) {
        test.expect(1);
        test.equals(tmpl("{{a.b.c}}", {}), "");
        test.done();
    }
});

exports["Stray mustaches"] = function(test) {
    var s = "}}}foo{bar}}baz{";
    test.expect(1);
    test.equals(tmpl(s, {}), s);
    test.done();
};

exports["If tags"] = testCase({
    "simple": function(test) {
        test.expect(1);
        test.equals(tmpl("{% if a %}a{% /if %}", {a: true}), "a");
        test.done();
    },
    "with else": function(test) {
        test.expect(2);
        test.equals(tmpl("{% if a %}a{% else %}b{% /if %}", {a: true}), "a");
        test.equals(tmpl("{% if a %}a{% else %}b{% /if %}", {a: false}), "b");
        test.done();
    }
});

exports["For tags"] = testCase({
    simple: function(test) {
        test.expect(1);
        test.equals(tmpl("{% for x in a %}{{x}}{% /for %}", {a: [1,2,3]}), "123");
        test.done();
    }
});
