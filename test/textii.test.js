var assert = require("assert"),
    textii = require('../index');

describe('textii', function() {

  describe('new()', function() {

    describe('when NO options given', function() {

      it('should set default options', function() {
        var tii = new textii("example1.txt", null, function() {});
        assert.equal(tii.default_options, tii.options);
      })

    });

    describe('when SOME options given', function() {

      it('should set merged options', function() {
        var opts = { "min_word_length": 1, "something": "else" },
            tii = new textii("example1.txt", opts, function() {});
        assert.equal(1, tii.options.min_word_length);
        assert.equal(tii.default_options.word_separator, tii.options.word_separator);
        assert.equal("else", tii.options.something);
      })

    });

  })

  describe('#get()', function() {

    describe('section name NOT given', function() {

      it('should create reverted index without sections', function(done) {
        var tii = new textii("test/txt/sample1.txt", null, function(err, data) {
              if (err) throw err;
              var expected = {
                "zero":[0], "three":[3], "five":[5], "six":[6], "seven":[7,8],
                "included":[18],
                "one":[19], "test":[21,22], "good":[24], "alwai":[25]
              };
              assert(expected.equals(data));

              done();
            });
        tii.get();
      })

    });

    describe('section name given', function() {

      it('should create reverted index with section', function(done) {
        var tii = new textii("test/txt/sample1.txt", null, function(err, data) {
              if (err) throw err;
              var expected = {
                "zero":{"page":[0]}, "three":{"page":[3]}, "five":{"page":[5]}, "six":{"page":[6]}, "seven":{"page":[7,8]},
                "included":{"page":[18]},
                "one":{"page":[19]}, "test":{"page":[21,22]}, "good":{"page":[24]}, "alwai":{"page":[25]}
              };
              assert(expected.equals(data));
              done();
            }),
            get_opts = {"section": "page"}
        tii.get(get_opts);
      })

    });

  });

})