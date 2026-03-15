// node_modules/cm-pgn/src/Header.js
var TAGS = {
  Event: "Event",
  Site: "Site",
  Date: "Date",
  Round: "Round",
  White: "White",
  Black: "Black",
  Result: "Result",
  WhiteTitle: "WhiteTitle",
  BlackTitle: "BlackTitle",
  WhiteElo: "WhiteElo",
  BlackElo: "BlackElo",
  WhiteUSCF: "WhiteUSCF",
  BlackUSCF: "BlackUSCF",
  WhiteNA: "WhiteNA",
  BlackNA: "BlackNA:",
  WhiteType: "WhiteType",
  BlackType: "BlackType",
  EventDate: "EventDate",
  EventSponsor: "EventSponsor",
  Section: "Section",
  Stage: "Stage",
  Board: "Board",
  Opening: "Opening",
  ECO: "ECO",
  Time: "Time",
  UTCTime: "UTCTime",
  UTCDate: "UTCDate",
  TimeControl: "TimeControl",
  SetUp: "SetUp",
  FEN: "FEN",
  Termination: "Termination",
  Annotator: "Annotator",
  Mode: "Mode",
  PlyCount: "PlyCount",
  Variant: "Variant"
};

class Header {
  constructor(headerString = "") {
    this.clear();
    const rows = headerString.match(/\[([^\]]+)]/g);
    if (rows && rows.length > 0) {
      for (let i = 0;i < rows.length; i++) {
        let tag = rows[i].match(/\[(\w+)\s+"([^"]+)"/);
        if (tag) {
          this.tags[tag[1]] = tag[2];
        }
      }
    }
  }
  clear() {
    this.tags = {};
  }
  render() {
    let rendered = "";
    for (const tag in this.tags) {
      rendered += `[${tag} "${this.tags[tag]}"]
`;
    }
    return rendered;
  }
}

// node_modules/cm-pgn/src/parser/pgnParser.js
function peg$subclass(child, parent) {
  function ctor() {
    this.constructor = child;
  }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
}
function peg$SyntaxError(message, expected, found, location) {
  this.message = message;
  this.expected = expected;
  this.found = found;
  this.location = location;
  this.name = "SyntaxError";
  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}
peg$subclass(peg$SyntaxError, Error);
peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
    literal: function(expectation) {
      return '"' + literalEscape(expectation.text) + '"';
    },
    class: function(expectation) {
      var escapedParts = "", i;
      for (i = 0;i < expectation.parts.length; i++) {
        escapedParts += expectation.parts[i] instanceof Array ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1]) : classEscape(expectation.parts[i]);
      }
      return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
    },
    any: function(expectation) {
      return "any character";
    },
    end: function(expectation) {
      return "end of input";
    },
    other: function(expectation) {
      return expectation.description;
    }
  };
  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }
  function literalEscape(s) {
    return s.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
      return "\\x0" + hex(ch);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
      return "\\x" + hex(ch);
    });
  }
  function classEscape(s) {
    return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
      return "\\x0" + hex(ch);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
      return "\\x" + hex(ch);
    });
  }
  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }
  function describeExpected(expected2) {
    var descriptions = new Array(expected2.length), i, j;
    for (i = 0;i < expected2.length; i++) {
      descriptions[i] = describeExpectation(expected2[i]);
    }
    descriptions.sort();
    if (descriptions.length > 0) {
      for (i = 1, j = 1;i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }
    switch (descriptions.length) {
      case 1:
        return descriptions[0];
      case 2:
        return descriptions[0] + " or " + descriptions[1];
      default:
        return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
    }
  }
  function describeFound(found2) {
    return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
  }
  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};
function peg$parse(input, options) {
  options = options !== undefined ? options : {};
  var peg$FAILED = {}, peg$startRuleFunctions = { pgn: peg$parsepgn }, peg$startRuleFunction = peg$parsepgn, peg$c0 = function(pw, all) {
    var arr = all ? all : [];
    arr.unshift(pw);
    return arr;
  }, peg$c1 = function(pb, all) {
    var arr = all ? all : [];
    arr.unshift(pb);
    return arr;
  }, peg$c2 = function() {
    return [[]];
  }, peg$c3 = function(pw) {
    return pw;
  }, peg$c4 = function(pb) {
    return pb;
  }, peg$c5 = function(cm, mn, cb, hm, nag, ca, vari, all) {
    var arr = all ? all : [];
    var move = {};
    move.turn = "w";
    move.moveNumber = mn;
    move.notation = hm;
    move.commentBefore = cb;
    move.commentAfter = ca;
    move.commentMove = cm;
    move.variations = vari ? vari : [];
    move.nag = nag ? nag : null;
    arr.unshift(move);
    return arr;
  }, peg$c6 = function(cm, me, cb, hm, nag, ca, vari, all) {
    var arr = all ? all : [];
    var move = {};
    move.turn = "b";
    move.moveNumber = me;
    move.notation = hm;
    move.commentBefore = cb;
    move.commentAfter = ca;
    move.commentMove = cm;
    move.variations = vari ? vari : [];
    arr.unshift(move);
    move.nag = nag ? nag : null;
    return arr;
  }, peg$c7 = "1:0", peg$c8 = peg$literalExpectation("1:0", false), peg$c9 = function() {
    return ["1:0"];
  }, peg$c10 = "0:1", peg$c11 = peg$literalExpectation("0:1", false), peg$c12 = function() {
    return ["0:1"];
  }, peg$c13 = "1-0", peg$c14 = peg$literalExpectation("1-0", false), peg$c15 = function() {
    return ["1-0"];
  }, peg$c16 = "0-1", peg$c17 = peg$literalExpectation("0-1", false), peg$c18 = function() {
    return ["0-1"];
  }, peg$c19 = "1/2-1/2", peg$c20 = peg$literalExpectation("1/2-1/2", false), peg$c21 = function() {
    return ["1/2-1/2"];
  }, peg$c22 = "*", peg$c23 = peg$literalExpectation("*", false), peg$c24 = function() {
    return ["*"];
  }, peg$c25 = /^[^}]/, peg$c26 = peg$classExpectation(["}"], true, false), peg$c27 = function(cm) {
    return cm.join("").trim();
  }, peg$c28 = "{", peg$c29 = peg$literalExpectation("{", false), peg$c30 = "}", peg$c31 = peg$literalExpectation("}", false), peg$c32 = function(vari, all, me) {
    var arr = all ? all : [];
    arr.unshift(vari);
    return arr;
  }, peg$c33 = function(vari, all) {
    var arr = all ? all : [];
    arr.unshift(vari);
    return arr;
  }, peg$c34 = "(", peg$c35 = peg$literalExpectation("(", false), peg$c36 = ")", peg$c37 = peg$literalExpectation(")", false), peg$c38 = ".", peg$c39 = peg$literalExpectation(".", false), peg$c40 = function(num) {
    return num;
  }, peg$c41 = peg$otherExpectation("integer"), peg$c42 = /^[0-9]/, peg$c43 = peg$classExpectation([["0", "9"]], false, false), peg$c44 = function(digits) {
    return makeInteger(digits);
  }, peg$c45 = " ", peg$c46 = peg$literalExpectation(" ", false), peg$c47 = function() {
    return "";
  }, peg$c48 = function(fig, disc, str, col, row, pr, ch) {
    var hm = {};
    hm.fig = fig ? fig : null;
    hm.disc = disc ? disc : null;
    hm.strike = str ? str : null;
    hm.col = col;
    hm.row = row;
    hm.check = ch ? ch : null;
    hm.promotion = pr;
    hm.notation = (fig ? fig : "") + (disc ? disc : "") + (str ? str : "") + col + row + (pr ? pr : "") + (ch ? ch : "");
    return hm;
  }, peg$c49 = function(fig, cols, rows, str, col, row, pr, ch) {
    var hm = {};
    hm.fig = fig ? fig : null;
    hm.strike = str == "x" ? str : null;
    hm.col = col;
    hm.row = row;
    hm.check = ch ? ch : null;
    hm.notation = (fig && fig !== "P" ? fig : "") + cols + rows + (str == "x" ? str : "-") + col + row + (pr ? pr : "") + (ch ? ch : "");
    hm.promotion = pr;
    return hm;
  }, peg$c50 = function(fig, str, col, row, pr, ch) {
    var hm = {};
    hm.fig = fig ? fig : null;
    hm.strike = str ? str : null;
    hm.col = col;
    hm.row = row;
    hm.check = ch ? ch : null;
    hm.notation = (fig ? fig : "") + (str ? str : "") + col + row + (pr ? pr : "") + (ch ? ch : "");
    hm.promotion = pr;
    return hm;
  }, peg$c51 = "O-O-O", peg$c52 = peg$literalExpectation("O-O-O", false), peg$c53 = function(ch) {
    var hm = {};
    hm.notation = "O-O-O" + (ch ? ch : "");
    hm.check = ch ? ch : null;
    return hm;
  }, peg$c54 = "O-O", peg$c55 = peg$literalExpectation("O-O", false), peg$c56 = function(ch) {
    var hm = {};
    hm.notation = "O-O" + (ch ? ch : "");
    hm.check = ch ? ch : null;
    return hm;
  }, peg$c57 = "+-", peg$c58 = peg$literalExpectation("+-", false), peg$c59 = "+", peg$c60 = peg$literalExpectation("+", false), peg$c61 = function(ch) {
    return ch[1];
  }, peg$c62 = "$$$", peg$c63 = peg$literalExpectation("$$$", false), peg$c64 = "#", peg$c65 = peg$literalExpectation("#", false), peg$c66 = "=", peg$c67 = peg$literalExpectation("=", false), peg$c68 = function(f) {
    return "=" + f;
  }, peg$c69 = function(nag, nags) {
    var arr = nags ? nags : [];
    arr.unshift(nag);
    return arr;
  }, peg$c70 = "$", peg$c71 = peg$literalExpectation("$", false), peg$c72 = function(num) {
    return "$" + num;
  }, peg$c73 = "!!", peg$c74 = peg$literalExpectation("!!", false), peg$c75 = function() {
    return "$3";
  }, peg$c76 = "??", peg$c77 = peg$literalExpectation("??", false), peg$c78 = function() {
    return "$4";
  }, peg$c79 = "!?", peg$c80 = peg$literalExpectation("!?", false), peg$c81 = function() {
    return "$5";
  }, peg$c82 = "?!", peg$c83 = peg$literalExpectation("?!", false), peg$c84 = function() {
    return "$6";
  }, peg$c85 = "!", peg$c86 = peg$literalExpectation("!", false), peg$c87 = function() {
    return "$1";
  }, peg$c88 = "?", peg$c89 = peg$literalExpectation("?", false), peg$c90 = function() {
    return "$2";
  }, peg$c91 = "‼", peg$c92 = peg$literalExpectation("‼", false), peg$c93 = "⁇", peg$c94 = peg$literalExpectation("⁇", false), peg$c95 = "⁉", peg$c96 = peg$literalExpectation("⁉", false), peg$c97 = "⁈", peg$c98 = peg$literalExpectation("⁈", false), peg$c99 = "□", peg$c100 = peg$literalExpectation("□", false), peg$c101 = function() {
    return "$7";
  }, peg$c102 = function() {
    return "$10";
  }, peg$c103 = "∞", peg$c104 = peg$literalExpectation("∞", false), peg$c105 = function() {
    return "$13";
  }, peg$c106 = "⩲", peg$c107 = peg$literalExpectation("⩲", false), peg$c108 = function() {
    return "$14";
  }, peg$c109 = "⩱", peg$c110 = peg$literalExpectation("⩱", false), peg$c111 = function() {
    return "$15";
  }, peg$c112 = "±", peg$c113 = peg$literalExpectation("±", false), peg$c114 = function() {
    return "$16";
  }, peg$c115 = "∓", peg$c116 = peg$literalExpectation("∓", false), peg$c117 = function() {
    return "$17";
  }, peg$c118 = function() {
    return "$18";
  }, peg$c119 = "-+", peg$c120 = peg$literalExpectation("-+", false), peg$c121 = function() {
    return "$19";
  }, peg$c122 = "⨀", peg$c123 = peg$literalExpectation("⨀", false), peg$c124 = function() {
    return "$22";
  }, peg$c125 = "⟳", peg$c126 = peg$literalExpectation("⟳", false), peg$c127 = function() {
    return "$32";
  }, peg$c128 = "→", peg$c129 = peg$literalExpectation("→", false), peg$c130 = function() {
    return "$36";
  }, peg$c131 = "↑", peg$c132 = peg$literalExpectation("↑", false), peg$c133 = function() {
    return "$40";
  }, peg$c134 = "⇆", peg$c135 = peg$literalExpectation("⇆", false), peg$c136 = function() {
    return "$132";
  }, peg$c137 = "D", peg$c138 = peg$literalExpectation("D", false), peg$c139 = function() {
    return "$220";
  }, peg$c140 = /^[RNBQKP]/, peg$c141 = peg$classExpectation(["R", "N", "B", "Q", "K", "P"], false, false), peg$c142 = /^[a-h]/, peg$c143 = peg$classExpectation([["a", "h"]], false, false), peg$c144 = /^[1-8]/, peg$c145 = peg$classExpectation([["1", "8"]], false, false), peg$c146 = "x", peg$c147 = peg$literalExpectation("x", false), peg$c148 = "-", peg$c149 = peg$literalExpectation("-", false), peg$currPos = 0, peg$savedPos = 0, peg$posDetailsCache = [{ line: 1, column: 1 }], peg$maxFailPos = 0, peg$maxFailExpected = [], peg$silentFails = 0, peg$result;
  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
    }
    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }
  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }
  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }
  function expected(description, location2) {
    location2 = location2 !== undefined ? location2 : peg$computeLocation(peg$savedPos, peg$currPos);
    throw peg$buildStructuredError([peg$otherExpectation(description)], input.substring(peg$savedPos, peg$currPos), location2);
  }
  function error(message, location2) {
    location2 = location2 !== undefined ? location2 : peg$computeLocation(peg$savedPos, peg$currPos);
    throw peg$buildSimpleError(message, location2);
  }
  function peg$literalExpectation(text2, ignoreCase) {
    return { type: "literal", text: text2, ignoreCase };
  }
  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts, inverted, ignoreCase };
  }
  function peg$anyExpectation() {
    return { type: "any" };
  }
  function peg$endExpectation() {
    return { type: "end" };
  }
  function peg$otherExpectation(description) {
    return { type: "other", description };
  }
  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos], p;
    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }
      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };
      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }
        p++;
      }
      peg$posDetailsCache[pos] = details;
      return details;
    }
  }
  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos), endPosDetails = peg$computePosDetails(endPos);
    return {
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }
  function peg$fail(expected2) {
    if (peg$currPos < peg$maxFailPos) {
      return;
    }
    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }
    peg$maxFailExpected.push(expected2);
  }
  function peg$buildSimpleError(message, location2) {
    return new peg$SyntaxError(message, null, null, location2);
  }
  function peg$buildStructuredError(expected2, found, location2) {
    return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected2, found), expected2, found, location2);
  }
  function peg$parsepgn() {
    var s0, s1, s2;
    s0 = peg$currPos;
    s1 = peg$parsepgnStartWhite();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsepgnBlack();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c0(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parsepgnStartBlack();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsepgnWhite();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c1(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsewhiteSpace();
        if (s1 === peg$FAILED) {
          s1 = null;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2();
        }
        s0 = s1;
      }
    }
    return s0;
  }
  function peg$parsepgnStartWhite() {
    var s0, s1;
    s0 = peg$currPos;
    s1 = peg$parsepgnWhite();
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c3(s1);
    }
    s0 = s1;
    return s0;
  }
  function peg$parsepgnStartBlack() {
    var s0, s1;
    s0 = peg$currPos;
    s1 = peg$parsepgnBlack();
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c4(s1);
    }
    s0 = s1;
    return s0;
  }
  function peg$parsepgnWhite() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15;
    s0 = peg$currPos;
    s1 = peg$parsewhiteSpace();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsecomment();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsewhiteSpace();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsemoveNumber();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsewhiteSpace();
            if (s5 === peg$FAILED) {
              s5 = null;
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsecomment();
              if (s6 === peg$FAILED) {
                s6 = null;
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parsewhiteSpace();
                if (s7 === peg$FAILED) {
                  s7 = null;
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parsehalfMove();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsewhiteSpace();
                    if (s9 === peg$FAILED) {
                      s9 = null;
                    }
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parsenags();
                      if (s10 === peg$FAILED) {
                        s10 = null;
                      }
                      if (s10 !== peg$FAILED) {
                        s11 = peg$parsewhiteSpace();
                        if (s11 === peg$FAILED) {
                          s11 = null;
                        }
                        if (s11 !== peg$FAILED) {
                          s12 = peg$parsecomment();
                          if (s12 === peg$FAILED) {
                            s12 = null;
                          }
                          if (s12 !== peg$FAILED) {
                            s13 = peg$parsewhiteSpace();
                            if (s13 === peg$FAILED) {
                              s13 = null;
                            }
                            if (s13 !== peg$FAILED) {
                              s14 = peg$parsevariationWhite();
                              if (s14 === peg$FAILED) {
                                s14 = peg$parsevariationBlack();
                              }
                              if (s14 === peg$FAILED) {
                                s14 = null;
                              }
                              if (s14 !== peg$FAILED) {
                                s15 = peg$parsepgnBlack();
                                if (s15 === peg$FAILED) {
                                  s15 = null;
                                }
                                if (s15 !== peg$FAILED) {
                                  peg$savedPos = s0;
                                  s1 = peg$c5(s2, s4, s6, s8, s10, s12, s14, s15);
                                  s0 = s1;
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$parseendGame();
    }
    return s0;
  }
  function peg$parsepgnBlack() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15;
    s0 = peg$currPos;
    s1 = peg$parsewhiteSpace();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsecomment();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsewhiteSpace();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsemoveEllipse();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsewhiteSpace();
            if (s5 === peg$FAILED) {
              s5 = null;
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsecomment();
              if (s6 === peg$FAILED) {
                s6 = null;
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parsewhiteSpace();
                if (s7 === peg$FAILED) {
                  s7 = null;
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parsehalfMove();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsewhiteSpace();
                    if (s9 === peg$FAILED) {
                      s9 = null;
                    }
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parsenags();
                      if (s10 === peg$FAILED) {
                        s10 = null;
                      }
                      if (s10 !== peg$FAILED) {
                        s11 = peg$parsewhiteSpace();
                        if (s11 === peg$FAILED) {
                          s11 = null;
                        }
                        if (s11 !== peg$FAILED) {
                          s12 = peg$parsecomment();
                          if (s12 === peg$FAILED) {
                            s12 = null;
                          }
                          if (s12 !== peg$FAILED) {
                            s13 = peg$parsewhiteSpace();
                            if (s13 === peg$FAILED) {
                              s13 = null;
                            }
                            if (s13 !== peg$FAILED) {
                              s14 = peg$parsevariationBlack();
                              if (s14 === peg$FAILED) {
                                s14 = null;
                              }
                              if (s14 !== peg$FAILED) {
                                s15 = peg$parsepgnWhite();
                                if (s15 === peg$FAILED) {
                                  s15 = null;
                                }
                                if (s15 !== peg$FAILED) {
                                  peg$savedPos = s0;
                                  s1 = peg$c6(s2, s4, s6, s8, s10, s12, s14, s15);
                                  s0 = s1;
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$parseendGame();
    }
    return s0;
  }
  function peg$parseendGame() {
    var s0, s1;
    s0 = peg$currPos;
    if (input.substr(peg$currPos, 3) === peg$c7) {
      s1 = peg$c7;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c8);
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c9();
    }
    s0 = s1;
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 3) === peg$c10) {
        s1 = peg$c10;
        peg$currPos += 3;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c11);
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c12();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 3) === peg$c13) {
          s1 = peg$c13;
          peg$currPos += 3;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c14);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c15();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 3) === peg$c16) {
            s1 = peg$c16;
            peg$currPos += 3;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c17);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c18();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 7) === peg$c19) {
              s1 = peg$c19;
              peg$currPos += 7;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c20);
              }
            }
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c21();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 42) {
                s1 = peg$c22;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c23);
                }
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c24();
              }
              s0 = s1;
            }
          }
        }
      }
    }
    return s0;
  }
  function peg$parsecomment() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = peg$parsecl();
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c25.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c26);
        }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (peg$c25.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c26);
          }
        }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsecr();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c27(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  function peg$parsecl() {
    var s0;
    if (input.charCodeAt(peg$currPos) === 123) {
      s0 = peg$c28;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c29);
      }
    }
    return s0;
  }
  function peg$parsecr() {
    var s0;
    if (input.charCodeAt(peg$currPos) === 125) {
      s0 = peg$c30;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c31);
      }
    }
    return s0;
  }
  function peg$parsevariationWhite() {
    var s0, s1, s2, s3, s4, s5, s6, s7;
    s0 = peg$currPos;
    s1 = peg$parsepl();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsepgnWhite();
      if (s2 !== peg$FAILED) {
        s3 = peg$parsepr();
        if (s3 !== peg$FAILED) {
          s4 = peg$parsewhiteSpace();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsevariationWhite();
            if (s5 === peg$FAILED) {
              s5 = null;
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsewhiteSpace();
              if (s6 === peg$FAILED) {
                s6 = null;
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parsemoveEllipse();
                if (s7 === peg$FAILED) {
                  s7 = null;
                }
                if (s7 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c32(s2, s5, s7);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  function peg$parsevariationBlack() {
    var s0, s1, s2, s3, s4, s5;
    s0 = peg$currPos;
    s1 = peg$parsepl();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsepgnStartBlack();
      if (s2 !== peg$FAILED) {
        s3 = peg$parsepr();
        if (s3 !== peg$FAILED) {
          s4 = peg$parsewhiteSpace();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsevariationBlack();
            if (s5 === peg$FAILED) {
              s5 = null;
            }
            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c33(s2, s5);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  function peg$parsepl() {
    var s0;
    if (input.charCodeAt(peg$currPos) === 40) {
      s0 = peg$c34;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c35);
      }
    }
    return s0;
  }
  function peg$parsepr() {
    var s0;
    if (input.charCodeAt(peg$currPos) === 41) {
      s0 = peg$c36;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c37);
      }
    }
    return s0;
  }
  function peg$parsemoveNumber() {
    var s0, s1, s2;
    s0 = peg$currPos;
    s1 = peg$parseinteger();
    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 46) {
        s2 = peg$c38;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c39);
        }
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c40(s1);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  function peg$parseinteger() {
    var s0, s1, s2;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    if (peg$c42.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c43);
      }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c42.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c43);
          }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c44(s1);
    }
    s0 = s1;
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c41);
      }
    }
    return s0;
  }
  function peg$parsewhiteSpace() {
    var s0, s1, s2;
    s0 = peg$currPos;
    s1 = [];
    if (input.charCodeAt(peg$currPos) === 32) {
      s2 = peg$c45;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c46);
      }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (input.charCodeAt(peg$currPos) === 32) {
          s2 = peg$c45;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c46);
          }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c47();
    }
    s0 = s1;
    return s0;
  }
  function peg$parsehalfMove() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8;
    s0 = peg$currPos;
    s1 = peg$parsefigure();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      peg$silentFails++;
      s3 = peg$parsecheckdisc();
      peg$silentFails--;
      if (s3 !== peg$FAILED) {
        peg$currPos = s2;
        s2 = undefined;
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsediscriminator();
        if (s3 !== peg$FAILED) {
          s4 = peg$parsestrike();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsecolumn();
            if (s5 !== peg$FAILED) {
              s6 = peg$parserow();
              if (s6 !== peg$FAILED) {
                s7 = peg$parsepromotion();
                if (s7 === peg$FAILED) {
                  s7 = null;
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parsecheck();
                  if (s8 === peg$FAILED) {
                    s8 = null;
                  }
                  if (s8 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c48(s1, s3, s4, s5, s6, s7, s8);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parsefigure();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecolumn();
        if (s2 !== peg$FAILED) {
          s3 = peg$parserow();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsestrikeOrDash();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsecolumn();
              if (s5 !== peg$FAILED) {
                s6 = peg$parserow();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parsepromotion();
                  if (s7 === peg$FAILED) {
                    s7 = null;
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parsecheck();
                    if (s8 === peg$FAILED) {
                      s8 = null;
                    }
                    if (s8 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c49(s1, s2, s3, s4, s5, s6, s7, s8);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsefigure();
        if (s1 === peg$FAILED) {
          s1 = null;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsestrike();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsecolumn();
            if (s3 !== peg$FAILED) {
              s4 = peg$parserow();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsepromotion();
                if (s5 === peg$FAILED) {
                  s5 = null;
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parsecheck();
                  if (s6 === peg$FAILED) {
                    s6 = null;
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c50(s1, s2, s3, s4, s5, s6);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 5) === peg$c51) {
            s1 = peg$c51;
            peg$currPos += 5;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c52);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsecheck();
            if (s2 === peg$FAILED) {
              s2 = null;
            }
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c53(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 3) === peg$c54) {
              s1 = peg$c54;
              peg$currPos += 3;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c55);
              }
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$parsecheck();
              if (s2 === peg$FAILED) {
                s2 = null;
              }
              if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c56(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          }
        }
      }
    }
    return s0;
  }
  function peg$parsecheck() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$currPos;
    peg$silentFails++;
    if (input.substr(peg$currPos, 2) === peg$c57) {
      s3 = peg$c57;
      peg$currPos += 2;
    } else {
      s3 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c58);
      }
    }
    peg$silentFails--;
    if (s3 === peg$FAILED) {
      s2 = undefined;
    } else {
      peg$currPos = s2;
      s2 = peg$FAILED;
    }
    if (s2 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 43) {
        s3 = peg$c59;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c60);
        }
      }
      if (s3 !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c61(s1);
    }
    s0 = s1;
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$currPos;
      peg$silentFails++;
      if (input.substr(peg$currPos, 3) === peg$c62) {
        s3 = peg$c62;
        peg$currPos += 3;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c63);
        }
      }
      peg$silentFails--;
      if (s3 === peg$FAILED) {
        s2 = undefined;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 35) {
          s3 = peg$c64;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c65);
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c61(s1);
      }
      s0 = s1;
    }
    return s0;
  }
  function peg$parsepromotion() {
    var s0, s1, s2;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 61) {
      s1 = peg$c66;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c67);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsefigure();
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c68(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  function peg$parsenags() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = peg$parsenag();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsewhiteSpace();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsenags();
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c69(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  function peg$parsenag() {
    var s0, s1, s2;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 36) {
      s1 = peg$c70;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c71);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseinteger();
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c72(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c73) {
        s1 = peg$c73;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c74);
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c75();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c76) {
          s1 = peg$c76;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c77);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c78();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c79) {
            s1 = peg$c79;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c80);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c81();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c82) {
              s1 = peg$c82;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c83);
              }
            }
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c84();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 33) {
                s1 = peg$c85;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c86);
                }
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c87();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 63) {
                  s1 = peg$c88;
                  peg$currPos++;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c89);
                  }
                }
                if (s1 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c90();
                }
                s0 = s1;
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  if (input.charCodeAt(peg$currPos) === 8252) {
                    s1 = peg$c91;
                    peg$currPos++;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c92);
                    }
                  }
                  if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c75();
                  }
                  s0 = s1;
                  if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    if (input.charCodeAt(peg$currPos) === 8263) {
                      s1 = peg$c93;
                      peg$currPos++;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c94);
                      }
                    }
                    if (s1 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c78();
                    }
                    s0 = s1;
                    if (s0 === peg$FAILED) {
                      s0 = peg$currPos;
                      if (input.charCodeAt(peg$currPos) === 8265) {
                        s1 = peg$c95;
                        peg$currPos++;
                      } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c96);
                        }
                      }
                      if (s1 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c81();
                      }
                      s0 = s1;
                      if (s0 === peg$FAILED) {
                        s0 = peg$currPos;
                        if (input.charCodeAt(peg$currPos) === 8264) {
                          s1 = peg$c97;
                          peg$currPos++;
                        } else {
                          s1 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c98);
                          }
                        }
                        if (s1 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c84();
                        }
                        s0 = s1;
                        if (s0 === peg$FAILED) {
                          s0 = peg$currPos;
                          if (input.charCodeAt(peg$currPos) === 9633) {
                            s1 = peg$c99;
                            peg$currPos++;
                          } else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c100);
                            }
                          }
                          if (s1 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c101();
                          }
                          s0 = s1;
                          if (s0 === peg$FAILED) {
                            s0 = peg$currPos;
                            if (input.charCodeAt(peg$currPos) === 61) {
                              s1 = peg$c66;
                              peg$currPos++;
                            } else {
                              s1 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c67);
                              }
                            }
                            if (s1 !== peg$FAILED) {
                              peg$savedPos = s0;
                              s1 = peg$c102();
                            }
                            s0 = s1;
                            if (s0 === peg$FAILED) {
                              s0 = peg$currPos;
                              if (input.charCodeAt(peg$currPos) === 8734) {
                                s1 = peg$c103;
                                peg$currPos++;
                              } else {
                                s1 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c104);
                                }
                              }
                              if (s1 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c105();
                              }
                              s0 = s1;
                              if (s0 === peg$FAILED) {
                                s0 = peg$currPos;
                                if (input.charCodeAt(peg$currPos) === 10866) {
                                  s1 = peg$c106;
                                  peg$currPos++;
                                } else {
                                  s1 = peg$FAILED;
                                  if (peg$silentFails === 0) {
                                    peg$fail(peg$c107);
                                  }
                                }
                                if (s1 !== peg$FAILED) {
                                  peg$savedPos = s0;
                                  s1 = peg$c108();
                                }
                                s0 = s1;
                                if (s0 === peg$FAILED) {
                                  s0 = peg$currPos;
                                  if (input.charCodeAt(peg$currPos) === 10865) {
                                    s1 = peg$c109;
                                    peg$currPos++;
                                  } else {
                                    s1 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                      peg$fail(peg$c110);
                                    }
                                  }
                                  if (s1 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c111();
                                  }
                                  s0 = s1;
                                  if (s0 === peg$FAILED) {
                                    s0 = peg$currPos;
                                    if (input.charCodeAt(peg$currPos) === 177) {
                                      s1 = peg$c112;
                                      peg$currPos++;
                                    } else {
                                      s1 = peg$FAILED;
                                      if (peg$silentFails === 0) {
                                        peg$fail(peg$c113);
                                      }
                                    }
                                    if (s1 !== peg$FAILED) {
                                      peg$savedPos = s0;
                                      s1 = peg$c114();
                                    }
                                    s0 = s1;
                                    if (s0 === peg$FAILED) {
                                      s0 = peg$currPos;
                                      if (input.charCodeAt(peg$currPos) === 8723) {
                                        s1 = peg$c115;
                                        peg$currPos++;
                                      } else {
                                        s1 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                          peg$fail(peg$c116);
                                        }
                                      }
                                      if (s1 !== peg$FAILED) {
                                        peg$savedPos = s0;
                                        s1 = peg$c117();
                                      }
                                      s0 = s1;
                                      if (s0 === peg$FAILED) {
                                        s0 = peg$currPos;
                                        if (input.substr(peg$currPos, 2) === peg$c57) {
                                          s1 = peg$c57;
                                          peg$currPos += 2;
                                        } else {
                                          s1 = peg$FAILED;
                                          if (peg$silentFails === 0) {
                                            peg$fail(peg$c58);
                                          }
                                        }
                                        if (s1 !== peg$FAILED) {
                                          peg$savedPos = s0;
                                          s1 = peg$c118();
                                        }
                                        s0 = s1;
                                        if (s0 === peg$FAILED) {
                                          s0 = peg$currPos;
                                          if (input.substr(peg$currPos, 2) === peg$c119) {
                                            s1 = peg$c119;
                                            peg$currPos += 2;
                                          } else {
                                            s1 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                              peg$fail(peg$c120);
                                            }
                                          }
                                          if (s1 !== peg$FAILED) {
                                            peg$savedPos = s0;
                                            s1 = peg$c121();
                                          }
                                          s0 = s1;
                                          if (s0 === peg$FAILED) {
                                            s0 = peg$currPos;
                                            if (input.charCodeAt(peg$currPos) === 10752) {
                                              s1 = peg$c122;
                                              peg$currPos++;
                                            } else {
                                              s1 = peg$FAILED;
                                              if (peg$silentFails === 0) {
                                                peg$fail(peg$c123);
                                              }
                                            }
                                            if (s1 !== peg$FAILED) {
                                              peg$savedPos = s0;
                                              s1 = peg$c124();
                                            }
                                            s0 = s1;
                                            if (s0 === peg$FAILED) {
                                              s0 = peg$currPos;
                                              if (input.charCodeAt(peg$currPos) === 10227) {
                                                s1 = peg$c125;
                                                peg$currPos++;
                                              } else {
                                                s1 = peg$FAILED;
                                                if (peg$silentFails === 0) {
                                                  peg$fail(peg$c126);
                                                }
                                              }
                                              if (s1 !== peg$FAILED) {
                                                peg$savedPos = s0;
                                                s1 = peg$c127();
                                              }
                                              s0 = s1;
                                              if (s0 === peg$FAILED) {
                                                s0 = peg$currPos;
                                                if (input.charCodeAt(peg$currPos) === 8594) {
                                                  s1 = peg$c128;
                                                  peg$currPos++;
                                                } else {
                                                  s1 = peg$FAILED;
                                                  if (peg$silentFails === 0) {
                                                    peg$fail(peg$c129);
                                                  }
                                                }
                                                if (s1 !== peg$FAILED) {
                                                  peg$savedPos = s0;
                                                  s1 = peg$c130();
                                                }
                                                s0 = s1;
                                                if (s0 === peg$FAILED) {
                                                  s0 = peg$currPos;
                                                  if (input.charCodeAt(peg$currPos) === 8593) {
                                                    s1 = peg$c131;
                                                    peg$currPos++;
                                                  } else {
                                                    s1 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                      peg$fail(peg$c132);
                                                    }
                                                  }
                                                  if (s1 !== peg$FAILED) {
                                                    peg$savedPos = s0;
                                                    s1 = peg$c133();
                                                  }
                                                  s0 = s1;
                                                  if (s0 === peg$FAILED) {
                                                    s0 = peg$currPos;
                                                    if (input.charCodeAt(peg$currPos) === 8646) {
                                                      s1 = peg$c134;
                                                      peg$currPos++;
                                                    } else {
                                                      s1 = peg$FAILED;
                                                      if (peg$silentFails === 0) {
                                                        peg$fail(peg$c135);
                                                      }
                                                    }
                                                    if (s1 !== peg$FAILED) {
                                                      peg$savedPos = s0;
                                                      s1 = peg$c136();
                                                    }
                                                    s0 = s1;
                                                    if (s0 === peg$FAILED) {
                                                      s0 = peg$currPos;
                                                      if (input.charCodeAt(peg$currPos) === 68) {
                                                        s1 = peg$c137;
                                                        peg$currPos++;
                                                      } else {
                                                        s1 = peg$FAILED;
                                                        if (peg$silentFails === 0) {
                                                          peg$fail(peg$c138);
                                                        }
                                                      }
                                                      if (s1 !== peg$FAILED) {
                                                        peg$savedPos = s0;
                                                        s1 = peg$c139();
                                                      }
                                                      s0 = s1;
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return s0;
  }
  function peg$parsediscriminator() {
    var s0;
    s0 = peg$parsecolumn();
    if (s0 === peg$FAILED) {
      s0 = peg$parserow();
    }
    return s0;
  }
  function peg$parsecheckdisc() {
    var s0, s1, s2, s3, s4;
    s0 = peg$currPos;
    s1 = peg$parsediscriminator();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsestrike();
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsecolumn();
        if (s3 !== peg$FAILED) {
          s4 = peg$parserow();
          if (s4 !== peg$FAILED) {
            s1 = [s1, s2, s3, s4];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  function peg$parsemoveEllipse() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = peg$parseinteger();
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (input.charCodeAt(peg$currPos) === 46) {
        s3 = peg$c38;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c39);
        }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (input.charCodeAt(peg$currPos) === 46) {
            s3 = peg$c38;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c39);
            }
          }
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c40(s1);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  function peg$parsefigure() {
    var s0;
    if (peg$c140.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c141);
      }
    }
    return s0;
  }
  function peg$parsecolumn() {
    var s0;
    if (peg$c142.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c143);
      }
    }
    return s0;
  }
  function peg$parserow() {
    var s0;
    if (peg$c144.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c145);
      }
    }
    return s0;
  }
  function peg$parsestrike() {
    var s0;
    if (input.charCodeAt(peg$currPos) === 120) {
      s0 = peg$c146;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c147);
      }
    }
    return s0;
  }
  function peg$parsestrikeOrDash() {
    var s0;
    if (input.charCodeAt(peg$currPos) === 120) {
      s0 = peg$c146;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$c147);
      }
    }
    if (s0 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 45) {
        s0 = peg$c148;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c149);
        }
      }
    }
    return s0;
  }
  function makeInteger(o) {
    return parseInt(o.join(""), 10);
  }
  peg$result = peg$startRuleFunction();
  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }
    throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
  }
}

class pgnParser {
  static parse(history, options) {
    return peg$parse(history, options);
  }
}

// node_modules/cm-pgn/node_modules/chess.mjs/src/Chess.js
var SYMBOLS = "pnbrqkPNBRQK";
var DEFAULT_POSITION = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
var TERMINATION_MARKERS = ["1-0", "0-1", "1/2-1/2", "*"];
var PAWN_OFFSETS = {
  b: [16, 32, 17, 15],
  w: [-16, -32, -17, -15]
};
var PIECE_OFFSETS = {
  n: [-18, -33, -31, -14, 18, 33, 31, 14],
  b: [-17, -15, 17, 15],
  r: [-16, 1, 16, -1],
  q: [-17, -16, -15, 1, 17, 16, 15, -1],
  k: [-17, -16, -15, 1, 17, 16, 15, -1]
};
var ATTACKS = [
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  24,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  2,
  24,
  2,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  53,
  56,
  53,
  2,
  0,
  0,
  0,
  0,
  0,
  0,
  24,
  24,
  24,
  24,
  24,
  24,
  56,
  0,
  56,
  24,
  24,
  24,
  24,
  24,
  24,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  53,
  56,
  53,
  2,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  2,
  24,
  2,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  24,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  0,
  0,
  20
];
var RAYS = [
  17,
  0,
  0,
  0,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  0,
  0,
  0,
  15,
  0,
  0,
  17,
  0,
  0,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  17,
  0,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  0,
  0,
  16,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  0,
  16,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  16,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  -16,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  -16,
  0,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  -16,
  0,
  0,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  0,
  -17,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  0,
  0,
  -17,
  0,
  0,
  -15,
  0,
  0,
  0,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  0,
  0,
  0,
  -17
];
var SHIFTS = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 };
var BITS = {
  NORMAL: 1,
  CAPTURE: 2,
  BIG_PAWN: 4,
  EP_CAPTURE: 8,
  PROMOTION: 16,
  KSIDE_CASTLE: 32,
  QSIDE_CASTLE: 64
};
var RANK_1 = 7;
var RANK_2 = 6;
var RANK_7 = 1;
var RANK_8 = 0;
var SQUARE_MAP = {
  a8: 0,
  b8: 1,
  c8: 2,
  d8: 3,
  e8: 4,
  f8: 5,
  g8: 6,
  h8: 7,
  a7: 16,
  b7: 17,
  c7: 18,
  d7: 19,
  e7: 20,
  f7: 21,
  g7: 22,
  h7: 23,
  a6: 32,
  b6: 33,
  c6: 34,
  d6: 35,
  e6: 36,
  f6: 37,
  g6: 38,
  h6: 39,
  a5: 48,
  b5: 49,
  c5: 50,
  d5: 51,
  e5: 52,
  f5: 53,
  g5: 54,
  h5: 55,
  a4: 64,
  b4: 65,
  c4: 66,
  d4: 67,
  e4: 68,
  f4: 69,
  g4: 70,
  h4: 71,
  a3: 80,
  b3: 81,
  c3: 82,
  d3: 83,
  e3: 84,
  f3: 85,
  g3: 86,
  h3: 87,
  a2: 96,
  b2: 97,
  c2: 98,
  d2: 99,
  e2: 100,
  f2: 101,
  g2: 102,
  h2: 103,
  a1: 112,
  b1: 113,
  c1: 114,
  d1: 115,
  e1: 116,
  f1: 117,
  g1: 118,
  h1: 119
};
var ROOKS = {
  w: [
    { square: SQUARE_MAP.a1, flag: BITS.QSIDE_CASTLE },
    { square: SQUARE_MAP.h1, flag: BITS.KSIDE_CASTLE }
  ],
  b: [
    { square: SQUARE_MAP.a8, flag: BITS.QSIDE_CASTLE },
    { square: SQUARE_MAP.h8, flag: BITS.KSIDE_CASTLE }
  ]
};
var PARSER_STRICT = 0;
var PARSER_SLOPPY = 1;
function get_disambiguator(move, moves) {
  var from = move.from;
  var to = move.to;
  var piece = move.piece;
  var ambiguities = 0;
  var same_rank = 0;
  var same_file = 0;
  for (var i = 0, len = moves.length;i < len; i++) {
    var ambig_from = moves[i].from;
    var ambig_to = moves[i].to;
    var ambig_piece = moves[i].piece;
    if (piece === ambig_piece && from !== ambig_from && to === ambig_to) {
      ambiguities++;
      if (rank(from) === rank(ambig_from)) {
        same_rank++;
      }
      if (file(from) === file(ambig_from)) {
        same_file++;
      }
    }
  }
  if (ambiguities > 0) {
    if (same_rank > 0 && same_file > 0) {
      return algebraic(from);
    } else if (same_file > 0) {
      return algebraic(from).charAt(1);
    } else {
      return algebraic(from).charAt(0);
    }
  }
  return "";
}
function infer_piece_type(san) {
  var piece_type = san.charAt(0);
  if (piece_type >= "a" && piece_type <= "h") {
    var matches = san.match(/[a-h]\d.*[a-h]\d/);
    if (matches) {
      return;
    }
    return PAWN;
  }
  piece_type = piece_type.toLowerCase();
  if (piece_type === "o") {
    return KING;
  }
  return piece_type;
}
function stripped_san(move) {
  return move.replace(/=/, "").replace(/[+#]?[?!]*$/, "");
}
function rank(i) {
  return i >> 4;
}
function file(i) {
  return i & 15;
}
function algebraic(i) {
  var f = file(i), r = rank(i);
  return "abcdefgh".substring(f, f + 1) + "87654321".substring(r, r + 1);
}
function swap_color(c) {
  return c === WHITE ? BLACK : WHITE;
}
function is_digit(c) {
  return "0123456789".indexOf(c) !== -1;
}
function clone(obj) {
  var dupe = obj instanceof Array ? [] : {};
  for (var property in obj) {
    if (typeof property === "object") {
      dupe[property] = clone(obj[property]);
    } else {
      dupe[property] = obj[property];
    }
  }
  return dupe;
}
function trim(str) {
  return str.replace(/^\s+|\s+$/g, "");
}
var BLACK = "b";
var WHITE = "w";
var EMPTY = -1;
var PAWN = "p";
var KNIGHT = "n";
var BISHOP = "b";
var ROOK = "r";
var QUEEN = "q";
var KING = "k";
var SQUARES = function() {
  var keys = [];
  for (var i = SQUARE_MAP.a8;i <= SQUARE_MAP.h1; i++) {
    if (i & 136) {
      i += 7;
      continue;
    }
    keys.push(algebraic(i));
  }
  return keys;
}();
var FLAGS = {
  NORMAL: "n",
  CAPTURE: "c",
  BIG_PAWN: "b",
  EP_CAPTURE: "e",
  PROMOTION: "p",
  KSIDE_CASTLE: "k",
  QSIDE_CASTLE: "q"
};
var Chess = function(fen, options) {
  var board = new Array(128);
  var kings = { w: EMPTY, b: EMPTY };
  var turn = WHITE;
  var castling = { w: 0, b: 0 };
  var ep_square = EMPTY;
  var half_moves = 0;
  var move_number = 1;
  var history = [];
  var header = {};
  var comments = {};
  var isChess960 = !!(options && options.chess960);
  if (typeof fen === "undefined" || typeof fen === "object") {
    if (typeof fen === "object" && !options) {
      options = fen;
      isChess960 = !!(options && options.chess960);
    }
    load(DEFAULT_POSITION);
  } else {
    load(fen);
  }
  function clear(keep_headers) {
    if (typeof keep_headers === "undefined") {
      keep_headers = false;
    }
    board = new Array(128);
    kings = { w: EMPTY, b: EMPTY };
    turn = WHITE;
    castling = { w: 0, b: 0 };
    ep_square = EMPTY;
    half_moves = 0;
    move_number = 1;
    history = [];
    if (!keep_headers)
      header = {};
    comments = {};
    update_setup(generate_fen());
  }
  function prune_comments() {
    var reversed_history = [];
    var current_comments = {};
    var copy_comment = function(fen2) {
      if (fen2 in comments) {
        current_comments[fen2] = comments[fen2];
      }
    };
    while (history.length > 0) {
      reversed_history.push(undo_move());
    }
    copy_comment(generate_fen());
    while (reversed_history.length > 0) {
      make_move(reversed_history.pop());
      copy_comment(generate_fen());
    }
    comments = current_comments;
  }
  function reset() {
    load(DEFAULT_POSITION);
  }
  function load(fen2, keep_headers) {
    if (typeof keep_headers === "undefined") {
      keep_headers = false;
    }
    var tokens = fen2.split(/\s+/);
    var position = tokens[0];
    var square = 0;
    if (!validate_fen(fen2).valid) {
      return false;
    }
    clear(keep_headers);
    for (var i = 0;i < position.length; i++) {
      var piece = position.charAt(i);
      if (piece === "/") {
        square += 8;
      } else if (is_digit(piece)) {
        square += parseInt(piece, 10);
      } else {
        var color = piece < "a" ? WHITE : BLACK;
        put({ type: piece.toLowerCase(), color }, algebraic(square));
        square++;
      }
    }
    turn = tokens[1];
    if (tokens[2].indexOf("K") > -1) {
      castling.w |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf("Q") > -1) {
      castling.w |= BITS.QSIDE_CASTLE;
    }
    if (tokens[2].indexOf("k") > -1) {
      castling.b |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf("q") > -1) {
      castling.b |= BITS.QSIDE_CASTLE;
    }
    ep_square = tokens[3] === "-" ? EMPTY : SQUARE_MAP[tokens[3]];
    half_moves = parseInt(tokens[4], 10);
    move_number = parseInt(tokens[5], 10);
    init_rooks();
    update_setup(generate_fen());
    return true;
  }
  function validate_fen(fen2) {
    var errors = {
      0: "No errors.",
      1: "FEN string must contain six space-delimited fields.",
      2: "6th field (move number) must be a positive integer.",
      3: "5th field (half move counter) must be a non-negative integer.",
      4: "4th field (en-passant square) is invalid.",
      5: "3rd field (castling availability) is invalid.",
      6: "2nd field (side to move) is invalid.",
      7: "1st field (piece positions) does not contain 8 '/'-delimited rows.",
      8: "1st field (piece positions) is invalid [consecutive numbers].",
      9: "1st field (piece positions) is invalid [invalid piece].",
      10: "1st field (piece positions) is invalid [row too large].",
      11: "Illegal en-passant square"
    };
    var tokens = fen2.split(/\s+/);
    if (tokens.length !== 6) {
      return { valid: false, error_number: 1, error: errors[1] };
    }
    if (isNaN(parseInt(tokens[5])) || parseInt(tokens[5], 10) <= 0) {
      return { valid: false, error_number: 2, error: errors[2] };
    }
    if (isNaN(parseInt(tokens[4])) || parseInt(tokens[4], 10) < 0) {
      return { valid: false, error_number: 3, error: errors[3] };
    }
    if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
      return { valid: false, error_number: 4, error: errors[4] };
    }
    if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
      return { valid: false, error_number: 5, error: errors[5] };
    }
    if (!/^(w|b)$/.test(tokens[1])) {
      return { valid: false, error_number: 6, error: errors[6] };
    }
    var rows = tokens[0].split("/");
    if (rows.length !== 8) {
      return { valid: false, error_number: 7, error: errors[7] };
    }
    for (var i = 0;i < rows.length; i++) {
      var sum_fields = 0;
      var previous_was_number = false;
      for (var k = 0;k < rows[i].length; k++) {
        if (!isNaN(rows[i][k])) {
          if (previous_was_number) {
            return { valid: false, error_number: 8, error: errors[8] };
          }
          sum_fields += parseInt(rows[i][k], 10);
          previous_was_number = true;
        } else {
          if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
            return { valid: false, error_number: 9, error: errors[9] };
          }
          sum_fields += 1;
          previous_was_number = false;
        }
      }
      if (sum_fields !== 8) {
        return { valid: false, error_number: 10, error: errors[10] };
      }
    }
    if (tokens[3][1] == "3" && tokens[1] == "w" || tokens[3][1] == "6" && tokens[1] == "b") {
      return { valid: false, error_number: 11, error: errors[11] };
    }
    return { valid: true, error_number: 0, error: errors[0] };
  }
  function generate_fen() {
    var empty = 0;
    var fen2 = "";
    for (var i = SQUARE_MAP.a8;i <= SQUARE_MAP.h1; i++) {
      if (board[i] == null) {
        empty++;
      } else {
        if (empty > 0) {
          fen2 += empty;
          empty = 0;
        }
        var color = board[i].color;
        var piece = board[i].type;
        fen2 += color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
      }
      if (i + 1 & 136) {
        if (empty > 0) {
          fen2 += empty;
        }
        if (i !== SQUARE_MAP.h1) {
          fen2 += "/";
        }
        empty = 0;
        i += 8;
      }
    }
    var cflags = "";
    if (castling[WHITE] & BITS.KSIDE_CASTLE) {
      cflags += "K";
    }
    if (castling[WHITE] & BITS.QSIDE_CASTLE) {
      cflags += "Q";
    }
    if (castling[BLACK] & BITS.KSIDE_CASTLE) {
      cflags += "k";
    }
    if (castling[BLACK] & BITS.QSIDE_CASTLE) {
      cflags += "q";
    }
    cflags = cflags || "-";
    var epflags = ep_square === EMPTY ? "-" : algebraic(ep_square);
    return [fen2, turn, cflags, epflags, half_moves, move_number].join(" ");
  }
  function set_header(args) {
    for (var i = 0;i < args.length; i += 2) {
      if (typeof args[i] === "string" && typeof args[i + 1] === "string") {
        header[args[i]] = args[i + 1];
      }
    }
    return header;
  }
  function update_setup(fen2) {
    if (history.length > 0)
      return;
    if (fen2 !== DEFAULT_POSITION) {
      header["SetUp"] = "1";
      header["FEN"] = fen2;
    } else {
      delete header["SetUp"];
      delete header["FEN"];
    }
  }
  function get(square) {
    var piece = board[SQUARE_MAP[square]];
    return piece ? { type: piece.type, color: piece.color } : null;
  }
  function put(piece, square) {
    if (!(("type" in piece) && ("color" in piece))) {
      return false;
    }
    if (SYMBOLS.indexOf(piece.type.toLowerCase()) === -1) {
      return false;
    }
    if (!(square in SQUARE_MAP)) {
      return false;
    }
    var sq = SQUARE_MAP[square];
    if (piece.type == KING && !(kings[piece.color] == EMPTY || kings[piece.color] == sq)) {
      return false;
    }
    board[sq] = { type: piece.type, color: piece.color };
    if (piece.type === KING) {
      kings[piece.color] = sq;
    }
    update_setup(generate_fen());
    return true;
  }
  function remove(square) {
    var piece = get(square);
    board[SQUARE_MAP[square]] = null;
    if (piece && piece.type === KING) {
      kings[piece.color] = EMPTY;
    }
    update_setup(generate_fen());
    return piece;
  }
  function init_rooks() {
    function set_for(color) {
      var ksq = kings[color];
      if (ksq === EMPTY)
        return;
      var rk = rank(ksq);
      var left_rook = null;
      var right_rook = null;
      for (var f = 0;f < 8; f++) {
        var sq = (rk << 4) + f;
        var p = board[sq];
        if (p && p.type === ROOK && p.color === color) {
          if (f < file(ksq)) {
            left_rook = sq;
          } else if (f > file(ksq) && right_rook === null) {
            right_rook = sq;
          }
        }
      }
      if (left_rook != null) {
        ROOKS[color][0].square = left_rook;
      }
      if (right_rook != null) {
        ROOKS[color][1].square = right_rook;
      }
    }
    set_for(WHITE);
    set_for(BLACK);
  }
  function build_move(board2, from, to, flags, promotion) {
    var move = {
      color: turn,
      from,
      to,
      flags,
      piece: board2[from].type
    };
    if (promotion) {
      move.flags |= BITS.PROMOTION;
      move.promotion = promotion;
    }
    if (board2[to]) {
      move.captured = board2[to].type;
    } else if (flags & BITS.EP_CAPTURE) {
      move.captured = PAWN;
    }
    return move;
  }
  function generate_moves(options2) {
    function add_move(board2, moves2, from, to, flags) {
      if (board2[from].type === PAWN && (rank(to) === RANK_8 || rank(to) === RANK_1)) {
        var pieces = [QUEEN, ROOK, BISHOP, KNIGHT];
        for (var i2 = 0, len2 = pieces.length;i2 < len2; i2++) {
          moves2.push(build_move(board2, from, to, flags, pieces[i2]));
        }
      } else {
        moves2.push(build_move(board2, from, to, flags));
      }
    }
    var moves = [];
    var us = turn;
    var them = swap_color(us);
    var second_rank = { b: RANK_7, w: RANK_2 };
    var first_sq = SQUARE_MAP.a8;
    var last_sq = SQUARE_MAP.h1;
    var single_square = false;
    var legal = typeof options2 !== "undefined" && "legal" in options2 ? options2.legal : true;
    var piece_type = typeof options2 !== "undefined" && "piece" in options2 && typeof options2.piece === "string" ? options2.piece.toLowerCase() : true;
    if (typeof options2 !== "undefined" && "square" in options2) {
      if (options2.square in SQUARE_MAP) {
        first_sq = last_sq = SQUARE_MAP[options2.square];
        single_square = true;
      } else {
        return [];
      }
    }
    for (var i = first_sq;i <= last_sq; i++) {
      if (i & 136) {
        i += 7;
        continue;
      }
      var piece = board[i];
      if (piece == null || piece.color !== us) {
        continue;
      }
      if (piece.type === PAWN && (piece_type === true || piece_type === PAWN)) {
        var square = i + PAWN_OFFSETS[us][0];
        if (board[square] == null) {
          add_move(board, moves, i, square, BITS.NORMAL);
          var square = i + PAWN_OFFSETS[us][1];
          if (second_rank[us] === rank(i) && board[square] == null) {
            add_move(board, moves, i, square, BITS.BIG_PAWN);
          }
        }
        for (j = 2;j < 4; j++) {
          var square = i + PAWN_OFFSETS[us][j];
          if (square & 136)
            continue;
          if (board[square] != null && board[square].color === them) {
            add_move(board, moves, i, square, BITS.CAPTURE);
          } else if (square === ep_square) {
            add_move(board, moves, i, ep_square, BITS.EP_CAPTURE);
          }
        }
      } else if (piece_type === true || piece_type === piece.type) {
        for (var j = 0, len = PIECE_OFFSETS[piece.type].length;j < len; j++) {
          var offset = PIECE_OFFSETS[piece.type][j];
          var square = i;
          while (true) {
            square += offset;
            if (square & 136)
              break;
            if (board[square] == null) {
              add_move(board, moves, i, square, BITS.NORMAL);
            } else {
              if (board[square].color === us)
                break;
              add_move(board, moves, i, square, BITS.CAPTURE);
              break;
            }
            if (piece.type === "n" || piece.type === "k")
              break;
          }
        }
      }
    }
    if (piece_type === true || piece_type === KING) {
      if (!single_square || last_sq === kings[us]) {
        if (isChess960) {
          let path_clear_for_king = function(to, rookFrom2) {
            if (to === kFrom)
              return true;
            var step = file(to) > file(kFrom) ? 1 : -1;
            for (var f = file(kFrom) + step;f != file(to) + step; f += step) {
              var sq = (rankFrom << 4) + f;
              if (sq === rookFrom2)
                continue;
              if (sq !== kFrom && board[sq] != null)
                return false;
            }
            return true;
          }, king_path_safe = function(to) {
            if (to === kFrom) {
              return !attacked(them, kFrom);
            }
            var step = file(to) > file(kFrom) ? 1 : -1;
            if (attacked(them, kFrom))
              return false;
            for (var f = file(kFrom) + step;f != file(to) + step; f += step) {
              var sq = (rankFrom << 4) + f;
              if (attacked(them, sq))
                return false;
            }
            return true;
          }, path_clear_for_rook = function(rookFrom2, rookTo2) {
            var step = file(rookTo2) > file(rookFrom2) ? 1 : -1;
            for (var f = file(rookFrom2) + step;f != file(rookTo2) + step; f += step) {
              var sq = (rankFrom << 4) + f;
              if (sq === kFrom)
                continue;
              if (board[sq] != null)
                return false;
            }
            return true;
          };
          var kFrom = kings[us];
          var rankFrom = rank(kFrom);
          var kside = castling[us] & BITS.KSIDE_CASTLE;
          var qside = castling[us] & BITS.QSIDE_CASTLE;
          if (kside) {
            var kTo = rankFrom === RANK_1 ? SQUARE_MAP.g1 : SQUARE_MAP.g8;
            var rookFrom = ROOKS[us][1].square;
            var rookTo = rankFrom === RANK_1 ? SQUARE_MAP.f1 : SQUARE_MAP.f8;
            if (rookFrom != null && path_clear_for_king(kTo, rookFrom) && path_clear_for_rook(rookFrom, rookTo) && king_path_safe(kTo)) {
              add_move(board, moves, kFrom, kTo, BITS.KSIDE_CASTLE);
            }
          }
          if (qside) {
            var kToQ = rankFrom === RANK_1 ? SQUARE_MAP.c1 : SQUARE_MAP.c8;
            var rookFromQ = ROOKS[us][0].square;
            var rookToQ = rankFrom === RANK_1 ? SQUARE_MAP.d1 : SQUARE_MAP.d8;
            if (rookFromQ != null && path_clear_for_king(kToQ, rookFromQ) && path_clear_for_rook(rookFromQ, rookToQ) && king_path_safe(kToQ)) {
              add_move(board, moves, kFrom, kToQ, BITS.QSIDE_CASTLE);
            }
          }
        } else {
          if (castling[us] & BITS.KSIDE_CASTLE) {
            var castling_from = kings[us];
            var castling_to = castling_from + 2;
            if (board[castling_from + 1] == null && board[castling_to] == null && !attacked(them, kings[us]) && !attacked(them, castling_from + 1) && !attacked(them, castling_to)) {
              add_move(board, moves, kings[us], castling_to, BITS.KSIDE_CASTLE);
            }
          }
          if (castling[us] & BITS.QSIDE_CASTLE) {
            var castling_from = kings[us];
            var castling_to = castling_from - 2;
            if (board[castling_from - 1] == null && board[castling_from - 2] == null && board[castling_from - 3] == null && !attacked(them, kings[us]) && !attacked(them, castling_from - 1) && !attacked(them, castling_to)) {
              add_move(board, moves, kings[us], castling_to, BITS.QSIDE_CASTLE);
            }
          }
        }
      }
    }
    if (!legal) {
      return moves;
    }
    var legal_moves = [];
    for (var i = 0, len = moves.length;i < len; i++) {
      make_move(moves[i]);
      if (!king_attacked(us)) {
        legal_moves.push(moves[i]);
      }
      undo_move();
    }
    return legal_moves;
  }
  function move_to_san(move, moves) {
    var output = "";
    if (move.flags & BITS.KSIDE_CASTLE) {
      output = "O-O";
    } else if (move.flags & BITS.QSIDE_CASTLE) {
      output = "O-O-O";
    } else {
      if (move.piece !== PAWN) {
        var disambiguator = get_disambiguator(move, moves);
        output += move.piece.toUpperCase() + disambiguator;
      }
      if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
        if (move.piece === PAWN) {
          output += algebraic(move.from)[0];
        }
        output += "x";
      }
      output += algebraic(move.to);
      if (move.flags & BITS.PROMOTION) {
        output += "=" + move.promotion.toUpperCase();
      }
    }
    make_move(move);
    if (in_check()) {
      if (in_checkmate()) {
        output += "#";
      } else {
        output += "+";
      }
    }
    undo_move();
    return output;
  }
  function attacked(color, square) {
    for (var i = SQUARE_MAP.a8;i <= SQUARE_MAP.h1; i++) {
      if (i & 136) {
        i += 7;
        continue;
      }
      if (board[i] == null || board[i].color !== color)
        continue;
      var piece = board[i];
      var difference = i - square;
      var index = difference + 119;
      if (ATTACKS[index] & 1 << SHIFTS[piece.type]) {
        if (piece.type === PAWN) {
          if (difference > 0) {
            if (piece.color === WHITE)
              return true;
          } else {
            if (piece.color === BLACK)
              return true;
          }
          continue;
        }
        if (piece.type === "n" || piece.type === "k")
          return true;
        var offset = RAYS[index];
        var j = i + offset;
        var blocked = false;
        while (j !== square) {
          if (board[j] != null) {
            blocked = true;
            break;
          }
          j += offset;
        }
        if (!blocked)
          return true;
      }
    }
    return false;
  }
  function king_attacked(color) {
    return attacked(swap_color(color), kings[color]);
  }
  function in_check() {
    return king_attacked(turn);
  }
  function in_checkmate() {
    return in_check() && generate_moves().length === 0;
  }
  function in_stalemate() {
    return !in_check() && generate_moves().length === 0;
  }
  function insufficient_material() {
    var pieces = {};
    var bishops = [];
    var num_pieces = 0;
    var sq_color = 0;
    for (var i = SQUARE_MAP.a8;i <= SQUARE_MAP.h1; i++) {
      sq_color = (sq_color + 1) % 2;
      if (i & 136) {
        i += 7;
        continue;
      }
      var piece = board[i];
      if (piece) {
        pieces[piece.type] = piece.type in pieces ? pieces[piece.type] + 1 : 1;
        if (piece.type === BISHOP) {
          bishops.push(sq_color);
        }
        num_pieces++;
      }
    }
    if (num_pieces === 2) {
      return true;
    } else if (num_pieces === 3 && (pieces[BISHOP] === 1 || pieces[KNIGHT] === 1)) {
      return true;
    } else if (num_pieces === pieces[BISHOP] + 2) {
      var sum = 0;
      var len = bishops.length;
      for (var i = 0;i < len; i++) {
        sum += bishops[i];
      }
      if (sum === 0 || sum === len) {
        return true;
      }
    }
    return false;
  }
  function in_threefold_repetition() {
    var moves = [];
    var positions = {};
    var repetition = false;
    while (true) {
      var move = undo_move();
      if (!move)
        break;
      moves.push(move);
    }
    while (true) {
      var fen2 = generate_fen().split(" ").slice(0, 4).join(" ");
      positions[fen2] = fen2 in positions ? positions[fen2] + 1 : 1;
      if (positions[fen2] >= 3) {
        repetition = true;
      }
      if (!moves.length) {
        break;
      }
      make_move(moves.pop());
    }
    return repetition;
  }
  function push(move) {
    history.push({
      move,
      kings: { b: kings.b, w: kings.w },
      turn,
      castling: { b: castling.b, w: castling.w },
      ep_square,
      half_moves,
      move_number
    });
  }
  function make_move(move) {
    var us = turn;
    var them = swap_color(us);
    push(move);
    var is960Castle = isChess960 && move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE) && board[move.from] && board[move.from].type === KING;
    if (is960Castle) {
      var rankSide = rank(move.from);
      var isK = !!(move.flags & BITS.KSIDE_CASTLE);
      var rookFromC = isK ? ROOKS[us][1].square : ROOKS[us][0].square;
      var rookToC = isK ? rankSide === RANK_1 ? SQUARE_MAP.f1 : SQUARE_MAP.f8 : rankSide === RANK_1 ? SQUARE_MAP.d1 : SQUARE_MAP.d8;
      if (move.to !== move.from) {
        if (rookFromC === move.to) {
          var kingPiece = board[move.from];
          var rookPiece = board[rookFromC];
          board[move.to] = kingPiece;
          board[rookToC] = rookPiece;
          if (rookToC !== move.from) {
            board[move.from] = null;
          }
          if (rookFromC !== move.to && rookFromC !== rookToC && rookFromC !== move.from) {
            board[rookFromC] = null;
          }
        } else if (rookFromC === move.from) {
          board[move.to] = board[move.from];
          board[move.from] = null;
          if (rookToC !== move.from) {
            board[rookToC] = { type: ROOK, color: us };
          } else {
            board[rookFromC] = { type: ROOK, color: us };
          }
        } else {
          board[move.to] = board[move.from];
          board[move.from] = null;
        }
      } else {
        board[rookToC] = board[rookFromC];
        board[rookFromC] = null;
      }
    } else {
      board[move.to] = board[move.from];
      board[move.from] = null;
    }
    if (move.flags & BITS.EP_CAPTURE) {
      if (turn === BLACK) {
        board[move.to - 16] = null;
      } else {
        board[move.to + 16] = null;
      }
    }
    if (move.flags & BITS.PROMOTION) {
      board[move.to] = { type: move.promotion, color: us };
    }
    if (board[move.to] && board[move.to].type === KING) {
      kings[board[move.to].color] = move.to;
      if (move.flags & BITS.KSIDE_CASTLE) {
        if (isChess960) {
          if (move.to !== move.from) {
            var rTo = rank(move.to) === RANK_1 ? SQUARE_MAP.f1 : SQUARE_MAP.f8;
            var rFrom = ROOKS[us][1].square;
            if (rFrom !== move.from && rFrom !== rTo && (board[rTo] == null || board[rTo] && board[rTo].type !== ROOK)) {
              board[rTo] = board[rFrom];
              board[rFrom] = null;
            }
          }
        } else {
          var castling_to = move.to - 1;
          var castling_from = move.to + 1;
          board[castling_to] = board[castling_from];
          board[castling_from] = null;
        }
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        if (isChess960) {
          if (move.to !== move.from) {
            var rToQ = rank(move.to) === RANK_1 ? SQUARE_MAP.d1 : SQUARE_MAP.d8;
            var rFromQ = ROOKS[us][0].square;
            if (rFromQ !== move.from && rFromQ !== rToQ && (board[rToQ] == null || board[rToQ] && board[rToQ].type !== ROOK)) {
              board[rToQ] = board[rFromQ];
              board[rFromQ] = null;
            }
          }
        } else {
          var castling_to = move.to + 1;
          var castling_from = move.to - 2;
          board[castling_to] = board[castling_from];
          board[castling_from] = null;
        }
      }
      castling[us] = "";
    }
    if (castling[us]) {
      for (var i = 0, len = ROOKS[us].length;i < len; i++) {
        if (move.from === ROOKS[us][i].square && castling[us] & ROOKS[us][i].flag) {
          castling[us] ^= ROOKS[us][i].flag;
          break;
        }
      }
    }
    if (castling[them]) {
      for (var i = 0, len = ROOKS[them].length;i < len; i++) {
        if (move.to === ROOKS[them][i].square && castling[them] & ROOKS[them][i].flag) {
          castling[them] ^= ROOKS[them][i].flag;
          break;
        }
      }
    }
    if (move.flags & BITS.BIG_PAWN) {
      if (turn === "b") {
        ep_square = move.to - 16;
      } else {
        ep_square = move.to + 16;
      }
    } else {
      ep_square = EMPTY;
    }
    if (move.piece === PAWN) {
      half_moves = 0;
    } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      half_moves = 0;
    } else {
      half_moves++;
    }
    if (turn === BLACK) {
      move_number++;
    }
    turn = swap_color(turn);
  }
  function undo_move() {
    var old = history.pop();
    if (old == null) {
      return null;
    }
    var move = old.move;
    kings = old.kings;
    turn = old.turn;
    castling = old.castling;
    ep_square = old.ep_square;
    half_moves = old.half_moves;
    move_number = old.move_number;
    var us = turn;
    var them = swap_color(turn);
    var is960CastleUndo = isChess960 && move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE);
    if (is960CastleUndo) {
      var rFromU, rToU;
      if (move.flags & BITS.KSIDE_CASTLE) {
        rFromU = ROOKS[us][1].square;
        rToU = rank(move.to) === RANK_1 ? SQUARE_MAP.f1 : SQUARE_MAP.f8;
      } else {
        rFromU = ROOKS[us][0].square;
        rToU = rank(move.to) === RANK_1 ? SQUARE_MAP.d1 : SQUARE_MAP.d8;
      }
      var wasTransposition = rFromU === move.to;
      if (move.from === move.to) {
        if (rFromU !== rToU) {
          board[rFromU] = board[rToU];
          board[rToU] = null;
        }
      } else if (wasTransposition) {
        var kingPiece = board[move.to];
        var rookPiece = board[rToU];
        board[move.from] = kingPiece;
        board[rFromU] = rookPiece;
        if (move.to !== rFromU) {
          board[move.to] = null;
        }
        if (rToU !== move.from && rToU !== rFromU) {
          board[rToU] = null;
        }
      } else if (rFromU === move.from) {
        board[move.from] = board[move.to];
        board[move.to] = null;
        if (rToU !== move.from && board[rToU] && board[rToU].type === ROOK) {
          board[rToU] = null;
        }
      } else {
        board[move.from] = board[move.to];
        board[move.to] = null;
        if (rFromU !== rToU) {
          board[rFromU] = board[rToU];
          board[rToU] = null;
        }
      }
    } else {
      if (board[move.to]) {
        board[move.from] = board[move.to];
        board[move.from].type = move.piece;
        board[move.to] = null;
      }
    }
    if (move.flags & BITS.CAPTURE) {
      board[move.to] = { type: move.captured, color: them };
    } else if (move.flags & BITS.EP_CAPTURE) {
      var index;
      if (us === BLACK) {
        index = move.to - 16;
      } else {
        index = move.to + 16;
      }
      board[index] = { type: PAWN, color: them };
    }
    if (!is960CastleUndo && move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
      var castling_to, castling_from;
      if (move.flags & BITS.KSIDE_CASTLE) {
        castling_to = move.to + 1;
        castling_from = move.to - 1;
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        castling_to = move.to - 2;
        castling_from = move.to + 1;
      }
      board[castling_to] = board[castling_from];
      board[castling_from] = null;
    }
    return move;
  }
  function move_from_san(move, sloppy) {
    var clean_move = stripped_san(move);
    for (var parser = 0;parser < 2; parser++) {
      if (parser == PARSER_SLOPPY) {
        if (!sloppy) {
          return null;
        }
        var overly_disambiguated = false;
        var matches = clean_move.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/);
        if (matches) {
          var piece = matches[1];
          var from = matches[2];
          var to = matches[3];
          var promotion = matches[4];
          if (from.length == 1) {
            overly_disambiguated = true;
          }
        } else {
          var matches = clean_move.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/);
          if (matches) {
            var piece = matches[1];
            var from = matches[2];
            var to = matches[3];
            var promotion = matches[4];
            if (from.length == 1) {
              var overly_disambiguated = true;
            }
          }
        }
      }
      var piece_type = infer_piece_type(clean_move);
      var moves = generate_moves({
        legal: true,
        piece: piece ? piece : piece_type
      });
      for (var i = 0, len = moves.length;i < len; i++) {
        switch (parser) {
          case PARSER_STRICT: {
            if (clean_move === stripped_san(move_to_san(moves[i], moves))) {
              return moves[i];
            }
            break;
          }
          case PARSER_SLOPPY: {
            if (matches) {
              if ((!piece || piece.toLowerCase() == moves[i].piece) && SQUARE_MAP[from] == moves[i].from && SQUARE_MAP[to] == moves[i].to && (!promotion || promotion.toLowerCase() == moves[i].promotion)) {
                return moves[i];
              } else if (overly_disambiguated) {
                var square = algebraic(moves[i].from);
                if ((!piece || piece.toLowerCase() == moves[i].piece) && SQUARE_MAP[to] == moves[i].to && (from == square[0] || from == square[1]) && (!promotion || promotion.toLowerCase() == moves[i].promotion)) {
                  return moves[i];
                }
              }
            }
          }
        }
      }
    }
    return null;
  }
  function make_pretty(ugly_move) {
    var move = clone(ugly_move);
    move.san = move_to_san(move, generate_moves({ legal: true }));
    move.to = algebraic(move.to);
    move.from = algebraic(move.from);
    var flags = "";
    for (var flag in BITS) {
      if (BITS[flag] & move.flags) {
        flags += FLAGS[flag];
      }
    }
    move.flags = flags;
    return move;
  }
  function perft(depth) {
    var moves = generate_moves({ legal: false });
    var nodes = 0;
    var color = turn;
    for (var i = 0, len = moves.length;i < len; i++) {
      make_move(moves[i]);
      if (!king_attacked(color)) {
        if (depth - 1 > 0) {
          var child_nodes = perft(depth - 1);
          nodes += child_nodes;
        } else {
          nodes++;
        }
      }
      undo_move();
    }
    return nodes;
  }
  return {
    load: function(fen2) {
      return load(fen2);
    },
    reset: function() {
      return reset();
    },
    moves: function(options2) {
      var ugly_moves = generate_moves(options2);
      var moves = [];
      for (var i = 0, len = ugly_moves.length;i < len; i++) {
        if (typeof options2 !== "undefined" && "verbose" in options2 && options2.verbose) {
          moves.push(make_pretty(ugly_moves[i]));
        } else {
          moves.push(move_to_san(ugly_moves[i], generate_moves({ legal: true })));
        }
      }
      return moves;
    },
    in_check: function() {
      return in_check();
    },
    in_checkmate: function() {
      return in_checkmate();
    },
    in_stalemate: function() {
      return in_stalemate();
    },
    in_draw: function() {
      return half_moves >= 100 || in_stalemate() || insufficient_material() || in_threefold_repetition();
    },
    insufficient_material: function() {
      return insufficient_material();
    },
    in_threefold_repetition: function() {
      return in_threefold_repetition();
    },
    chess960: function() {
      return isChess960;
    },
    game_over: function() {
      return half_moves >= 100 || in_checkmate() || in_stalemate() || insufficient_material() || in_threefold_repetition();
    },
    validate_fen: function(fen2) {
      return validate_fen(fen2);
    },
    fen: function() {
      return generate_fen();
    },
    board: function() {
      var output = [], row = [];
      for (var i = SQUARE_MAP.a8;i <= SQUARE_MAP.h1; i++) {
        if (board[i] == null) {
          row.push(null);
        } else {
          row.push({
            square: algebraic(i),
            type: board[i].type,
            color: board[i].color
          });
        }
        if (i + 1 & 136) {
          output.push(row);
          row = [];
          i += 8;
        }
      }
      return output;
    },
    pgn: function(options2) {
      var newline = typeof options2 === "object" && typeof options2.newline_char === "string" ? options2.newline_char : `
`;
      var max_width = typeof options2 === "object" && typeof options2.max_width === "number" ? options2.max_width : 0;
      var result = [];
      var header_exists = false;
      for (var i in header) {
        result.push("[" + i + ' "' + header[i] + '"]' + newline);
        header_exists = true;
      }
      if (header_exists && history.length) {
        result.push(newline);
      }
      var append_comment = function(move_string2) {
        var comment = comments[generate_fen()];
        if (typeof comment !== "undefined") {
          var delimiter = move_string2.length > 0 ? " " : "";
          move_string2 = `${move_string2}${delimiter}{${comment}}`;
        }
        return move_string2;
      };
      var reversed_history = [];
      while (history.length > 0) {
        reversed_history.push(undo_move());
      }
      var moves = [];
      var move_string = "";
      if (reversed_history.length === 0) {
        moves.push(append_comment(""));
      }
      while (reversed_history.length > 0) {
        move_string = append_comment(move_string);
        var move = reversed_history.pop();
        if (!history.length && move.color === "b") {
          const prefix = `${move_number}. ...`;
          move_string = move_string ? `${move_string} ${prefix}` : prefix;
        } else if (move.color === "w") {
          if (move_string.length) {
            moves.push(move_string);
          }
          move_string = move_number + ".";
        }
        move_string = move_string + " " + move_to_san(move, generate_moves({ legal: true }));
        make_move(move);
      }
      if (move_string.length) {
        moves.push(append_comment(move_string));
      }
      if (typeof header.Result !== "undefined") {
        moves.push(header.Result);
      }
      if (max_width === 0) {
        return result.join("") + moves.join(" ");
      }
      var strip = function() {
        if (result.length > 0 && result[result.length - 1] === " ") {
          result.pop();
          return true;
        }
        return false;
      };
      var wrap_comment = function(width, move2) {
        for (var token of move2.split(" ")) {
          if (!token) {
            continue;
          }
          if (width + token.length > max_width) {
            while (strip()) {
              width--;
            }
            result.push(newline);
            width = 0;
          }
          result.push(token);
          width += token.length;
          result.push(" ");
          width++;
        }
        if (strip()) {
          width--;
        }
        return width;
      };
      var current_width = 0;
      for (var i = 0;i < moves.length; i++) {
        if (current_width + moves[i].length > max_width) {
          if (moves[i].includes("{")) {
            current_width = wrap_comment(current_width, moves[i]);
            continue;
          }
        }
        if (current_width + moves[i].length > max_width && i !== 0) {
          if (result[result.length - 1] === " ") {
            result.pop();
          }
          result.push(newline);
          current_width = 0;
        } else if (i !== 0) {
          result.push(" ");
          current_width++;
        }
        result.push(moves[i]);
        current_width += moves[i].length;
      }
      return result.join("");
    },
    load_pgn: function(pgn, options2) {
      var sloppy = typeof options2 !== "undefined" && "sloppy" in options2 ? options2.sloppy : false;
      function mask(str) {
        return str.replace(/\\/g, "\\");
      }
      function parse_pgn_header(header2, options3) {
        var newline_char2 = typeof options3 === "object" && typeof options3.newline_char === "string" ? options3.newline_char : `\r?
`;
        var header_obj = {};
        var headers2 = header2.split(new RegExp(mask(newline_char2)));
        var key2 = "";
        var value = "";
        for (var i = 0;i < headers2.length; i++) {
          var regex = /^\s*\[([A-Za-z]+)\s*"(.*)"\s*\]\s*$/;
          key2 = headers2[i].replace(regex, "$1");
          value = headers2[i].replace(regex, "$2");
          if (trim(key2).length > 0) {
            header_obj[key2] = value;
          }
        }
        return header_obj;
      }
      pgn = pgn.trim();
      var newline_char = typeof options2 === "object" && typeof options2.newline_char === "string" ? options2.newline_char : `\r?
`;
      var header_regex = new RegExp("^(\\[((?:" + mask(newline_char) + ")|.)*\\])" + "(?:\\s*" + mask(newline_char) + "){2}");
      var header_string = header_regex.test(pgn) ? header_regex.exec(pgn)[1] : "";
      reset();
      var headers = parse_pgn_header(header_string, options2);
      var fen2 = "";
      for (var key in headers) {
        if (key.toLowerCase() === "fen") {
          fen2 = headers[key];
        }
        set_header([key, headers[key]]);
      }
      if (sloppy) {
        if (fen2) {
          if (!load(fen2, true)) {
            return false;
          }
        }
      } else {
        if (headers["SetUp"] === "1") {
          if (!(("FEN" in headers) && load(headers["FEN"], true))) {
            return false;
          }
        }
      }
      var to_hex = function(string) {
        return Array.from(string).map(function(c) {
          return c.charCodeAt(0) < 128 ? c.charCodeAt(0).toString(16) : encodeURIComponent(c).replace(/\%/g, "").toLowerCase();
        }).join("");
      };
      var from_hex = function(string) {
        return string.length == 0 ? "" : decodeURIComponent("%" + string.match(/.{1,2}/g).join("%"));
      };
      var encode_comment = function(string) {
        string = string.replace(new RegExp(mask(newline_char), "g"), " ");
        return `{${to_hex(string.slice(1, string.length - 1))}}`;
      };
      var decode_comment = function(string) {
        if (string.startsWith("{") && string.endsWith("}")) {
          return from_hex(string.slice(1, string.length - 1));
        }
      };
      var ms = pgn.replace(header_string, "").replace(new RegExp(`({[^}]*})+?|;([^${mask(newline_char)}]*)`, "g"), function(match, bracket, semicolon) {
        return bracket !== undefined ? encode_comment(bracket) : " " + encode_comment(`{${semicolon.slice(1)}}`);
      }).replace(new RegExp(mask(newline_char), "g"), " ");
      var rav_regex = /(\([^\(\)]+\))+?/g;
      while (rav_regex.test(ms)) {
        ms = ms.replace(rav_regex, "");
      }
      ms = ms.replace(/\d+\.(\.\.)?/g, "");
      ms = ms.replace(/\.\.\./g, "");
      ms = ms.replace(/\$\d+/g, "");
      var moves = trim(ms).split(new RegExp(/\s+/));
      moves = moves.join(",").replace(/,,+/g, ",").split(",");
      var move = "";
      var result = "";
      for (var half_move = 0;half_move < moves.length; half_move++) {
        var comment = decode_comment(moves[half_move]);
        if (comment !== undefined) {
          comments[generate_fen()] = comment;
          continue;
        }
        move = move_from_san(moves[half_move], sloppy);
        if (move == null) {
          if (TERMINATION_MARKERS.indexOf(moves[half_move]) > -1) {
            result = moves[half_move];
          } else {
            return false;
          }
        } else {
          result = "";
          make_move(move);
        }
      }
      if (result && Object.keys(header).length && !header["Result"]) {
        set_header(["Result", result]);
      }
      return true;
    },
    header: function() {
      return set_header(arguments);
    },
    turn: function() {
      return turn;
    },
    move: function(move, options2) {
      var sloppy = typeof options2 !== "undefined" && "sloppy" in options2 ? options2.sloppy : false;
      var move_obj = null;
      if (typeof move === "string") {
        move_obj = move_from_san(move, sloppy);
      } else if (typeof move === "object") {
        var moves = generate_moves();
        for (var i = 0, len = moves.length;i < len; i++) {
          if (move.from === algebraic(moves[i].from) && move.to === algebraic(moves[i].to) && (!("promotion" in moves[i]) || move.promotion === moves[i].promotion)) {
            move_obj = moves[i];
            break;
          }
        }
      }
      if (!move_obj) {
        return null;
      }
      var pretty_move = make_pretty(move_obj);
      make_move(move_obj);
      return pretty_move;
    },
    undo: function() {
      var move = undo_move();
      return move ? make_pretty(move) : null;
    },
    clear: function() {
      return clear();
    },
    put: function(piece, square) {
      return put(piece, square);
    },
    get: function(square) {
      return get(square);
    },
    ascii() {
      var s = `   +------------------------+
`;
      for (var i = SQUARE_MAP.a8;i <= SQUARE_MAP.h1; i++) {
        if (file(i) === 0) {
          s += " " + "87654321"[rank(i)] + " |";
        }
        if (board[i] == null) {
          s += " . ";
        } else {
          var piece = board[i].type;
          var color = board[i].color;
          var symbol = color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
          s += " " + symbol + " ";
        }
        if (i + 1 & 136) {
          s += `|
`;
          i += 8;
        }
      }
      s += `   +------------------------+
`;
      s += "     a  b  c  d  e  f  g  h";
      return s;
    },
    remove: function(square) {
      return remove(square);
    },
    perft: function(depth) {
      return perft(depth);
    },
    square_color: function(square) {
      if (square in SQUARE_MAP) {
        var sq_0x88 = SQUARE_MAP[square];
        return (rank(sq_0x88) + file(sq_0x88)) % 2 === 0 ? "light" : "dark";
      }
      return null;
    },
    history: function(options2) {
      var reversed_history = [];
      var move_history = [];
      var verbose = typeof options2 !== "undefined" && "verbose" in options2 && options2.verbose;
      while (history.length > 0) {
        reversed_history.push(undo_move());
      }
      while (reversed_history.length > 0) {
        var move = reversed_history.pop();
        if (verbose) {
          move_history.push(make_pretty(move));
        } else {
          move_history.push(move_to_san(move, generate_moves({ legal: true })));
        }
        make_move(move);
      }
      return move_history;
    },
    get_comment: function() {
      return comments[generate_fen()];
    },
    set_comment: function(comment) {
      comments[generate_fen()] = comment.replace(/\{/g, "[").replace(/\}/g, "]");
    },
    delete_comment: function() {
      var comment = comments[generate_fen()];
      delete comments[generate_fen()];
      return comment;
    },
    get_comments: function() {
      prune_comments();
      return Object.keys(comments).map(function(fen2) {
        return { fen: fen2, comment: comments[fen2] };
      });
    },
    delete_comments: function() {
      prune_comments();
      return Object.keys(comments).map(function(fen2) {
        var comment = comments[fen2];
        delete comments[fen2];
        return { fen: fen2, comment };
      });
    }
  };
};

// node_modules/cm-pgn/src/History.js
function IllegalMoveException(fen, notation) {
  this.fen = fen;
  this.notation = notation;
  this.toString = function() {
    return "IllegalMoveException: " + fen + " => " + notation;
  };
}

class History {
  constructor(historyString = null, props = {}) {
    this.props = {
      setUpFen: null,
      sloppy: false,
      chess960: false,
      ...props
    };
    if (typeof props !== "object") {
      console.error("History constructor: setUpFen and sloppy properties are deprecated, use props instead");
    }
    if (!historyString) {
      this.clear();
    } else {
      const parsedMoves = pgnParser.parse(historyString.replace(/\s\s+/g, " ").replace(/\n/g, " "));
      this.moves = this.traverse(parsedMoves[0], this.props.setUpFen, null, 1, this.props.sloppy);
    }
  }
  clear() {
    this.moves = [];
  }
  traverse(parsedMoves, fen, parent = null, ply = 1, sloppy = false) {
    let chess;
    const options = { chess960: !!this.props.chess960 };
    chess = fen ? new Chess(fen, options) : new Chess(options);
    const moves = [];
    let previousMove = parent;
    for (let parsedMove of parsedMoves) {
      if (parsedMove.notation) {
        const notation = parsedMove.notation.notation;
        const move = chess.move(notation, { sloppy });
        if (move) {
          if (previousMove) {
            if (!move.previous) {
              move.previous = previousMove;
            }
            if (!previousMove.next) {
              previousMove.next = move;
            }
          } else {
            move.previous = null;
          }
          move.ply = ply;
          this.fillMoveFromChessState(move, chess);
          if (parsedMove.nag) {
            move.nag = parsedMove.nag[0];
          }
          if (parsedMove.commentBefore) {
            move.commentBefore = parsedMove.commentBefore;
          }
          if (parsedMove.commentMove) {
            move.commentMove = parsedMove.commentMove;
          }
          if (parsedMove.commentAfter) {
            move.commentAfter = parsedMove.commentAfter;
          }
          move.variations = [];
          const parsedVariations = parsedMove.variations;
          if (parsedVariations.length > 0) {
            const lastFen = moves.length > 0 ? moves[moves.length - 1].fen : fen;
            for (let parsedVariation of parsedVariations) {
              move.variations.push(this.traverse(parsedVariation, lastFen, previousMove, ply, sloppy));
            }
          }
          move.variation = moves;
          moves.push(move);
          previousMove = move;
        } else {
          throw new IllegalMoveException(chess.fen(), notation);
        }
      }
      ply++;
    }
    return moves;
  }
  fillMoveFromChessState(move, chess) {
    move.fen = chess.fen();
    move.uci = move.from + move.to + (move.promotion ? move.promotion : "");
    move.variations = [];
    if (chess.game_over()) {
      move.gameOver = true;
      if (chess.in_draw()) {
        move.inDraw = true;
      }
      if (chess.in_stalemate()) {
        move.inStalemate = true;
      }
      if (chess.insufficient_material()) {
        move.insufficientMaterial = true;
      }
      if (chess.in_threefold_repetition()) {
        move.inThreefoldRepetition = true;
      }
      if (chess.in_checkmate()) {
        move.inCheckmate = true;
      }
    }
    if (chess.in_check()) {
      move.inCheck = true;
    }
  }
  historyToMove(move) {
    const moves = [];
    let pointer = move;
    moves.push(pointer);
    while (pointer.previous) {
      moves.push(pointer.previous);
      pointer = pointer.previous;
    }
    return moves.reverse();
  }
  validateMove(notation, previous = null, sloppy = true) {
    if (!previous) {
      if (this.moves.length > 0) {
        previous = this.moves[this.moves.length - 1];
      }
    }
    let chess;
    const options = { chess960: !!this.props.chess960 };
    chess = new Chess(this.props.setUpFen ? this.props.setUpFen : undefined, options);
    if (previous) {
      const historyToMove = this.historyToMove(previous);
      for (const moveInHistory of historyToMove) {
        chess.move(moveInHistory);
      }
    }
    const move = chess.move(notation, { sloppy });
    if (move) {
      this.fillMoveFromChessState(move, chess);
    }
    return move;
  }
  addMove(notation, previous = null, sloppy = true) {
    if (!previous) {
      if (this.moves.length > 0) {
        previous = this.moves[this.moves.length - 1];
      }
    }
    const move = this.validateMove(notation, previous, sloppy);
    if (!move) {
      throw new Error("invalid move");
    }
    move.previous = previous;
    if (previous) {
      move.ply = previous.ply + 1;
      move.uci = move.from + move.to + (move.promotion ? move.promotion : "");
      if (previous.next) {
        previous.next.variations.push([]);
        move.variation = previous.next.variations[previous.next.variations.length - 1];
        move.variation.push(move);
      } else {
        previous.next = move;
        move.variation = previous.variation;
        previous.variation.push(move);
      }
    } else {
      move.variation = this.moves;
      move.ply = 1;
      this.moves.push(move);
    }
    return move;
  }
  render(renderComments = true, renderNags = true) {
    const renderVariation = (variation, needReminder = false) => {
      let result = "";
      for (let move of variation) {
        if (move.ply % 2 === 1) {
          result += Math.floor(move.ply / 2) + 1 + ". ";
        } else if (result.length === 0 || needReminder) {
          result += move.ply / 2 + "... ";
        }
        needReminder = false;
        if (renderNags && move.nag) {
          result += "$" + move.nag + " ";
        }
        if (renderComments && move.commentBefore) {
          result += "{" + move.commentBefore + "} ";
          needReminder = true;
        }
        result += move.san + " ";
        if (renderComments && move.commentMove) {
          result += "{" + move.commentMove + "} ";
          needReminder = true;
        }
        if (renderComments && move.commentAfter) {
          result += "{" + move.commentAfter + "} ";
          needReminder = true;
        }
        if (move.variations.length > 0) {
          for (let variation2 of move.variations) {
            result += "(" + renderVariation(variation2) + ") ";
            needReminder = true;
          }
        }
        result += " ";
      }
      return result;
    };
    let ret = renderVariation(this.moves);
    ret = ret.replace(/\s+\)/g, ")");
    ret = ret.replace(/\s\s+/g, " ").trim();
    return ret;
  }
}

// node_modules/cm-pgn/src/Pgn.js
class Pgn {
  constructor(pgnString = "", props = {}) {
    const lastHeaderElement = pgnString.trim().slice(-1) === "]" ? pgnString.length : pgnString.lastIndexOf(`]

`) + 1;
    const headerString = pgnString.substring(0, lastHeaderElement);
    const historyString = pgnString.substring(lastHeaderElement);
    this.props = {
      sloppy: false,
      chess960: false,
      ...props
    };
    this.header = new Header(headerString);
    const variant = this.header.tags[TAGS.Variant];
    if (variant && (variant.toLowerCase() === "chess960" || variant.toLowerCase() === "freestyle" || variant.toLowerCase() === "fischerandom")) {
      this.props.chess960 = true;
    }
    if (this.header.tags[TAGS.SetUp] === "1" && this.header.tags[TAGS.FEN]) {
      this.history = new History(historyString, {
        setUpFen: this.header.tags[TAGS.FEN],
        sloppy: this.props.sloppy,
        chess960: this.props.chess960
      });
    } else {
      this.history = new History(historyString, { sloppy: this.props.sloppy, chess960: this.props.chess960 });
    }
  }
  wrap(str, maxLength) {
    const words = str.split(" ");
    let lines = [];
    let line = "";
    for (let i = 0;i < words.length; i++) {
      const word = words[i];
      if (line.length + word.length < maxLength) {
        line += word + " ";
      } else {
        lines.push(line.trim());
        line = word + " ";
      }
    }
    lines.push(line.trim());
    return lines.join(`
`);
  }
  render(renderHeader = true, renderComments = true, renderNags = true) {
    const header = renderHeader ? this.header.render() + `
` : "";
    let history = this.history.render(renderComments, renderNags);
    if (this.header.tags[TAGS.Result]) {
      history += " " + this.header.tags[TAGS.Result];
    }
    return header + this.wrap(history, 80);
  }
}

// node_modules/chess.mjs/src/Chess.js
var SYMBOLS2 = "pnbrqkPNBRQK";
var DEFAULT_POSITION2 = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
var TERMINATION_MARKERS2 = ["1-0", "0-1", "1/2-1/2", "*"];
var PAWN_OFFSETS2 = {
  b: [16, 32, 17, 15],
  w: [-16, -32, -17, -15]
};
var PIECE_OFFSETS2 = {
  n: [-18, -33, -31, -14, 18, 33, 31, 14],
  b: [-17, -15, 17, 15],
  r: [-16, 1, 16, -1],
  q: [-17, -16, -15, 1, 17, 16, 15, -1],
  k: [-17, -16, -15, 1, 17, 16, 15, -1]
};
var ATTACKS2 = [
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  24,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  2,
  24,
  2,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  53,
  56,
  53,
  2,
  0,
  0,
  0,
  0,
  0,
  0,
  24,
  24,
  24,
  24,
  24,
  24,
  56,
  0,
  56,
  24,
  24,
  24,
  24,
  24,
  24,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  53,
  56,
  53,
  2,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  2,
  24,
  2,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  24,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  0,
  0,
  20
];
var RAYS2 = [
  17,
  0,
  0,
  0,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  0,
  0,
  0,
  15,
  0,
  0,
  17,
  0,
  0,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  17,
  0,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  0,
  0,
  16,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  0,
  16,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  16,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  -16,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  -16,
  0,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  -16,
  0,
  0,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  0,
  -17,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  0,
  0,
  -17,
  0,
  0,
  -15,
  0,
  0,
  0,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  0,
  0,
  0,
  -17
];
var SHIFTS2 = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 };
var BITS2 = {
  NORMAL: 1,
  CAPTURE: 2,
  BIG_PAWN: 4,
  EP_CAPTURE: 8,
  PROMOTION: 16,
  KSIDE_CASTLE: 32,
  QSIDE_CASTLE: 64
};
var RANK_12 = 7;
var RANK_22 = 6;
var RANK_72 = 1;
var RANK_82 = 0;
var SQUARE_MAP2 = {
  a8: 0,
  b8: 1,
  c8: 2,
  d8: 3,
  e8: 4,
  f8: 5,
  g8: 6,
  h8: 7,
  a7: 16,
  b7: 17,
  c7: 18,
  d7: 19,
  e7: 20,
  f7: 21,
  g7: 22,
  h7: 23,
  a6: 32,
  b6: 33,
  c6: 34,
  d6: 35,
  e6: 36,
  f6: 37,
  g6: 38,
  h6: 39,
  a5: 48,
  b5: 49,
  c5: 50,
  d5: 51,
  e5: 52,
  f5: 53,
  g5: 54,
  h5: 55,
  a4: 64,
  b4: 65,
  c4: 66,
  d4: 67,
  e4: 68,
  f4: 69,
  g4: 70,
  h4: 71,
  a3: 80,
  b3: 81,
  c3: 82,
  d3: 83,
  e3: 84,
  f3: 85,
  g3: 86,
  h3: 87,
  a2: 96,
  b2: 97,
  c2: 98,
  d2: 99,
  e2: 100,
  f2: 101,
  g2: 102,
  h2: 103,
  a1: 112,
  b1: 113,
  c1: 114,
  d1: 115,
  e1: 116,
  f1: 117,
  g1: 118,
  h1: 119
};
var ROOKS2 = {
  w: [
    { square: SQUARE_MAP2.a1, flag: BITS2.QSIDE_CASTLE },
    { square: SQUARE_MAP2.h1, flag: BITS2.KSIDE_CASTLE }
  ],
  b: [
    { square: SQUARE_MAP2.a8, flag: BITS2.QSIDE_CASTLE },
    { square: SQUARE_MAP2.h8, flag: BITS2.KSIDE_CASTLE }
  ]
};
var PARSER_STRICT2 = 0;
var PARSER_SLOPPY2 = 1;
function get_disambiguator2(move, moves) {
  var from = move.from;
  var to = move.to;
  var piece = move.piece;
  var ambiguities = 0;
  var same_rank = 0;
  var same_file = 0;
  for (var i = 0, len = moves.length;i < len; i++) {
    var ambig_from = moves[i].from;
    var ambig_to = moves[i].to;
    var ambig_piece = moves[i].piece;
    if (piece === ambig_piece && from !== ambig_from && to === ambig_to) {
      ambiguities++;
      if (rank2(from) === rank2(ambig_from)) {
        same_rank++;
      }
      if (file2(from) === file2(ambig_from)) {
        same_file++;
      }
    }
  }
  if (ambiguities > 0) {
    if (same_rank > 0 && same_file > 0) {
      return algebraic2(from);
    } else if (same_file > 0) {
      return algebraic2(from).charAt(1);
    } else {
      return algebraic2(from).charAt(0);
    }
  }
  return "";
}
function infer_piece_type2(san) {
  var piece_type = san.charAt(0);
  if (piece_type >= "a" && piece_type <= "h") {
    var matches = san.match(/[a-h]\d.*[a-h]\d/);
    if (matches) {
      return;
    }
    return PAWN2;
  }
  piece_type = piece_type.toLowerCase();
  if (piece_type === "o") {
    return KING2;
  }
  return piece_type;
}
function stripped_san2(move) {
  return move.replace(/=/, "").replace(/[+#]?[?!]*$/, "");
}
function rank2(i) {
  return i >> 4;
}
function file2(i) {
  return i & 15;
}
function algebraic2(i) {
  var f = file2(i), r = rank2(i);
  return "abcdefgh".substring(f, f + 1) + "87654321".substring(r, r + 1);
}
function swap_color2(c) {
  return c === WHITE2 ? BLACK2 : WHITE2;
}
function is_digit2(c) {
  return "0123456789".indexOf(c) !== -1;
}
function clone2(obj) {
  var dupe = obj instanceof Array ? [] : {};
  for (var property in obj) {
    if (typeof property === "object") {
      dupe[property] = clone2(obj[property]);
    } else {
      dupe[property] = obj[property];
    }
  }
  return dupe;
}
function trim2(str) {
  return str.replace(/^\s+|\s+$/g, "");
}
var BLACK2 = "b";
var WHITE2 = "w";
var EMPTY2 = -1;
var PAWN2 = "p";
var KNIGHT2 = "n";
var BISHOP2 = "b";
var ROOK2 = "r";
var QUEEN2 = "q";
var KING2 = "k";
var SQUARES2 = function() {
  var keys = [];
  for (var i = SQUARE_MAP2.a8;i <= SQUARE_MAP2.h1; i++) {
    if (i & 136) {
      i += 7;
      continue;
    }
    keys.push(algebraic2(i));
  }
  return keys;
}();
var FLAGS2 = {
  NORMAL: "n",
  CAPTURE: "c",
  BIG_PAWN: "b",
  EP_CAPTURE: "e",
  PROMOTION: "p",
  KSIDE_CASTLE: "k",
  QSIDE_CASTLE: "q"
};
var Chess2 = function(fen, options) {
  var board = new Array(128);
  var kings = { w: EMPTY2, b: EMPTY2 };
  var turn = WHITE2;
  var castling = { w: 0, b: 0 };
  var ep_square = EMPTY2;
  var half_moves = 0;
  var move_number = 1;
  var history = [];
  var header = {};
  var comments = {};
  var isChess960 = !!(options && options.chess960);
  if (typeof fen === "undefined" || typeof fen === "object") {
    if (typeof fen === "object" && !options) {
      options = fen;
      isChess960 = !!(options && options.chess960);
    }
    load(DEFAULT_POSITION2);
  } else {
    load(fen);
  }
  function clear(keep_headers) {
    if (typeof keep_headers === "undefined") {
      keep_headers = false;
    }
    board = new Array(128);
    kings = { w: EMPTY2, b: EMPTY2 };
    turn = WHITE2;
    castling = { w: 0, b: 0 };
    ep_square = EMPTY2;
    half_moves = 0;
    move_number = 1;
    history = [];
    if (!keep_headers)
      header = {};
    comments = {};
    update_setup(generate_fen());
  }
  function prune_comments() {
    var reversed_history = [];
    var current_comments = {};
    var copy_comment = function(fen2) {
      if (fen2 in comments) {
        current_comments[fen2] = comments[fen2];
      }
    };
    while (history.length > 0) {
      reversed_history.push(undo_move());
    }
    copy_comment(generate_fen());
    while (reversed_history.length > 0) {
      make_move(reversed_history.pop());
      copy_comment(generate_fen());
    }
    comments = current_comments;
  }
  function reset() {
    load(DEFAULT_POSITION2);
  }
  function load(fen2, keep_headers) {
    if (typeof keep_headers === "undefined") {
      keep_headers = false;
    }
    var tokens = fen2.split(/\s+/);
    var position = tokens[0];
    var square = 0;
    if (!validate_fen(fen2).valid) {
      return false;
    }
    clear(keep_headers);
    for (var i = 0;i < position.length; i++) {
      var piece = position.charAt(i);
      if (piece === "/") {
        square += 8;
      } else if (is_digit2(piece)) {
        square += parseInt(piece, 10);
      } else {
        var color = piece < "a" ? WHITE2 : BLACK2;
        put({ type: piece.toLowerCase(), color }, algebraic2(square));
        square++;
      }
    }
    turn = tokens[1];
    if (tokens[2].indexOf("K") > -1) {
      castling.w |= BITS2.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf("Q") > -1) {
      castling.w |= BITS2.QSIDE_CASTLE;
    }
    if (tokens[2].indexOf("k") > -1) {
      castling.b |= BITS2.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf("q") > -1) {
      castling.b |= BITS2.QSIDE_CASTLE;
    }
    ep_square = tokens[3] === "-" ? EMPTY2 : SQUARE_MAP2[tokens[3]];
    half_moves = parseInt(tokens[4], 10);
    move_number = parseInt(tokens[5], 10);
    init_rooks();
    update_setup(generate_fen());
    return true;
  }
  function validate_fen(fen2) {
    var errors = {
      0: "No errors.",
      1: "FEN string must contain six space-delimited fields.",
      2: "6th field (move number) must be a positive integer.",
      3: "5th field (half move counter) must be a non-negative integer.",
      4: "4th field (en-passant square) is invalid.",
      5: "3rd field (castling availability) is invalid.",
      6: "2nd field (side to move) is invalid.",
      7: "1st field (piece positions) does not contain 8 '/'-delimited rows.",
      8: "1st field (piece positions) is invalid [consecutive numbers].",
      9: "1st field (piece positions) is invalid [invalid piece].",
      10: "1st field (piece positions) is invalid [row too large].",
      11: "Illegal en-passant square"
    };
    var tokens = fen2.split(/\s+/);
    if (tokens.length !== 6) {
      return { valid: false, error_number: 1, error: errors[1] };
    }
    if (isNaN(parseInt(tokens[5])) || parseInt(tokens[5], 10) <= 0) {
      return { valid: false, error_number: 2, error: errors[2] };
    }
    if (isNaN(parseInt(tokens[4])) || parseInt(tokens[4], 10) < 0) {
      return { valid: false, error_number: 3, error: errors[3] };
    }
    if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
      return { valid: false, error_number: 4, error: errors[4] };
    }
    if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
      return { valid: false, error_number: 5, error: errors[5] };
    }
    if (!/^(w|b)$/.test(tokens[1])) {
      return { valid: false, error_number: 6, error: errors[6] };
    }
    var rows = tokens[0].split("/");
    if (rows.length !== 8) {
      return { valid: false, error_number: 7, error: errors[7] };
    }
    for (var i = 0;i < rows.length; i++) {
      var sum_fields = 0;
      var previous_was_number = false;
      for (var k = 0;k < rows[i].length; k++) {
        if (!isNaN(rows[i][k])) {
          if (previous_was_number) {
            return { valid: false, error_number: 8, error: errors[8] };
          }
          sum_fields += parseInt(rows[i][k], 10);
          previous_was_number = true;
        } else {
          if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
            return { valid: false, error_number: 9, error: errors[9] };
          }
          sum_fields += 1;
          previous_was_number = false;
        }
      }
      if (sum_fields !== 8) {
        return { valid: false, error_number: 10, error: errors[10] };
      }
    }
    if (tokens[3][1] == "3" && tokens[1] == "w" || tokens[3][1] == "6" && tokens[1] == "b") {
      return { valid: false, error_number: 11, error: errors[11] };
    }
    return { valid: true, error_number: 0, error: errors[0] };
  }
  function generate_fen() {
    var empty = 0;
    var fen2 = "";
    for (var i = SQUARE_MAP2.a8;i <= SQUARE_MAP2.h1; i++) {
      if (board[i] == null) {
        empty++;
      } else {
        if (empty > 0) {
          fen2 += empty;
          empty = 0;
        }
        var color = board[i].color;
        var piece = board[i].type;
        fen2 += color === WHITE2 ? piece.toUpperCase() : piece.toLowerCase();
      }
      if (i + 1 & 136) {
        if (empty > 0) {
          fen2 += empty;
        }
        if (i !== SQUARE_MAP2.h1) {
          fen2 += "/";
        }
        empty = 0;
        i += 8;
      }
    }
    var cflags = "";
    if (castling[WHITE2] & BITS2.KSIDE_CASTLE) {
      cflags += "K";
    }
    if (castling[WHITE2] & BITS2.QSIDE_CASTLE) {
      cflags += "Q";
    }
    if (castling[BLACK2] & BITS2.KSIDE_CASTLE) {
      cflags += "k";
    }
    if (castling[BLACK2] & BITS2.QSIDE_CASTLE) {
      cflags += "q";
    }
    cflags = cflags || "-";
    var epflags = ep_square === EMPTY2 ? "-" : algebraic2(ep_square);
    return [fen2, turn, cflags, epflags, half_moves, move_number].join(" ");
  }
  function set_header(args) {
    for (var i = 0;i < args.length; i += 2) {
      if (typeof args[i] === "string" && typeof args[i + 1] === "string") {
        header[args[i]] = args[i + 1];
      }
    }
    return header;
  }
  function update_setup(fen2) {
    if (history.length > 0)
      return;
    if (fen2 !== DEFAULT_POSITION2) {
      header["SetUp"] = "1";
      header["FEN"] = fen2;
    } else {
      delete header["SetUp"];
      delete header["FEN"];
    }
  }
  function get(square) {
    var piece = board[SQUARE_MAP2[square]];
    return piece ? { type: piece.type, color: piece.color } : null;
  }
  function put(piece, square) {
    if (!(("type" in piece) && ("color" in piece))) {
      return false;
    }
    if (SYMBOLS2.indexOf(piece.type.toLowerCase()) === -1) {
      return false;
    }
    if (!(square in SQUARE_MAP2)) {
      return false;
    }
    var sq = SQUARE_MAP2[square];
    if (piece.type == KING2 && !(kings[piece.color] == EMPTY2 || kings[piece.color] == sq)) {
      return false;
    }
    board[sq] = { type: piece.type, color: piece.color };
    if (piece.type === KING2) {
      kings[piece.color] = sq;
    }
    update_setup(generate_fen());
    return true;
  }
  function remove(square) {
    var piece = get(square);
    board[SQUARE_MAP2[square]] = null;
    if (piece && piece.type === KING2) {
      kings[piece.color] = EMPTY2;
    }
    update_setup(generate_fen());
    return piece;
  }
  function init_rooks() {
    function set_for(color) {
      var ksq = kings[color];
      if (ksq === EMPTY2)
        return;
      var rk = rank2(ksq);
      var left_rook = null;
      var right_rook = null;
      for (var f = 0;f < 8; f++) {
        var sq = (rk << 4) + f;
        var p = board[sq];
        if (p && p.type === ROOK2 && p.color === color) {
          if (f < file2(ksq)) {
            left_rook = sq;
          } else if (f > file2(ksq) && right_rook === null) {
            right_rook = sq;
          }
        }
      }
      if (left_rook != null) {
        ROOKS2[color][0].square = left_rook;
      }
      if (right_rook != null) {
        ROOKS2[color][1].square = right_rook;
      }
    }
    set_for(WHITE2);
    set_for(BLACK2);
  }
  function build_move(board2, from, to, flags, promotion) {
    var move = {
      color: turn,
      from,
      to,
      flags,
      piece: board2[from].type
    };
    if (promotion) {
      move.flags |= BITS2.PROMOTION;
      move.promotion = promotion;
    }
    if (flags & (BITS2.KSIDE_CASTLE | BITS2.QSIDE_CASTLE)) {} else if (board2[to]) {
      move.captured = board2[to].type;
    } else if (flags & BITS2.EP_CAPTURE) {
      move.captured = PAWN2;
    }
    return move;
  }
  function generate_moves(options2) {
    function add_move(board2, moves2, from, to, flags) {
      if (board2[from].type === PAWN2 && (rank2(to) === RANK_82 || rank2(to) === RANK_12)) {
        var pieces = [QUEEN2, ROOK2, BISHOP2, KNIGHT2];
        for (var i2 = 0, len2 = pieces.length;i2 < len2; i2++) {
          moves2.push(build_move(board2, from, to, flags, pieces[i2]));
        }
      } else {
        moves2.push(build_move(board2, from, to, flags));
      }
    }
    var moves = [];
    var us = turn;
    var them = swap_color2(us);
    var second_rank = { b: RANK_72, w: RANK_22 };
    var first_sq = SQUARE_MAP2.a8;
    var last_sq = SQUARE_MAP2.h1;
    var single_square = false;
    var legal = typeof options2 !== "undefined" && "legal" in options2 ? options2.legal : true;
    var piece_type = typeof options2 !== "undefined" && "piece" in options2 && typeof options2.piece === "string" ? options2.piece.toLowerCase() : true;
    if (typeof options2 !== "undefined" && "square" in options2) {
      if (options2.square in SQUARE_MAP2) {
        first_sq = last_sq = SQUARE_MAP2[options2.square];
        single_square = true;
      } else {
        return [];
      }
    }
    for (var i = first_sq;i <= last_sq; i++) {
      if (i & 136) {
        i += 7;
        continue;
      }
      var piece = board[i];
      if (piece == null || piece.color !== us) {
        continue;
      }
      if (piece.type === PAWN2 && (piece_type === true || piece_type === PAWN2)) {
        var square = i + PAWN_OFFSETS2[us][0];
        if (board[square] == null) {
          add_move(board, moves, i, square, BITS2.NORMAL);
          var square = i + PAWN_OFFSETS2[us][1];
          if (second_rank[us] === rank2(i) && board[square] == null) {
            add_move(board, moves, i, square, BITS2.BIG_PAWN);
          }
        }
        for (j = 2;j < 4; j++) {
          var square = i + PAWN_OFFSETS2[us][j];
          if (square & 136)
            continue;
          if (board[square] != null && board[square].color === them) {
            add_move(board, moves, i, square, BITS2.CAPTURE);
          } else if (square === ep_square) {
            add_move(board, moves, i, ep_square, BITS2.EP_CAPTURE);
          }
        }
      } else if (piece_type === true || piece_type === piece.type) {
        for (var j = 0, len = PIECE_OFFSETS2[piece.type].length;j < len; j++) {
          var offset = PIECE_OFFSETS2[piece.type][j];
          var square = i;
          while (true) {
            square += offset;
            if (square & 136)
              break;
            if (board[square] == null) {
              add_move(board, moves, i, square, BITS2.NORMAL);
            } else {
              if (board[square].color === us)
                break;
              add_move(board, moves, i, square, BITS2.CAPTURE);
              break;
            }
            if (piece.type === "n" || piece.type === "k")
              break;
          }
        }
      }
    }
    if (piece_type === true || piece_type === KING2) {
      if (!single_square || last_sq === kings[us]) {
        if (isChess960) {
          let path_clear_for_king = function(to, rookFrom2) {
            if (to === kFrom)
              return true;
            var step = file2(to) > file2(kFrom) ? 1 : -1;
            for (var f = file2(kFrom) + step;f != file2(to) + step; f += step) {
              var sq = (rankFrom << 4) + f;
              if (sq === rookFrom2)
                continue;
              if (sq !== kFrom && board[sq] != null)
                return false;
            }
            return true;
          }, king_path_safe = function(to) {
            if (to === kFrom) {
              return !attacked(them, kFrom);
            }
            var step = file2(to) > file2(kFrom) ? 1 : -1;
            if (attacked(them, kFrom))
              return false;
            for (var f = file2(kFrom) + step;f != file2(to) + step; f += step) {
              var sq = (rankFrom << 4) + f;
              if (attacked(them, sq))
                return false;
            }
            return true;
          }, path_clear_for_rook = function(rookFrom2, rookTo2) {
            var step = file2(rookTo2) > file2(rookFrom2) ? 1 : -1;
            for (var f = file2(rookFrom2) + step;f != file2(rookTo2) + step; f += step) {
              var sq = (rankFrom << 4) + f;
              if (sq === kFrom)
                continue;
              if (board[sq] != null)
                return false;
            }
            return true;
          };
          var kFrom = kings[us];
          var rankFrom = rank2(kFrom);
          var kside = castling[us] & BITS2.KSIDE_CASTLE;
          var qside = castling[us] & BITS2.QSIDE_CASTLE;
          if (kside) {
            var kTo = rankFrom === RANK_12 ? SQUARE_MAP2.g1 : SQUARE_MAP2.g8;
            var rookFrom = ROOKS2[us][1].square;
            var rookTo = rankFrom === RANK_12 ? SQUARE_MAP2.f1 : SQUARE_MAP2.f8;
            if (rookFrom != null && path_clear_for_king(kTo, rookFrom) && path_clear_for_rook(rookFrom, rookTo) && king_path_safe(kTo)) {
              add_move(board, moves, kFrom, rookFrom, BITS2.KSIDE_CASTLE);
            }
          }
          if (qside) {
            var kToQ = rankFrom === RANK_12 ? SQUARE_MAP2.c1 : SQUARE_MAP2.c8;
            var rookFromQ = ROOKS2[us][0].square;
            var rookToQ = rankFrom === RANK_12 ? SQUARE_MAP2.d1 : SQUARE_MAP2.d8;
            if (rookFromQ != null && path_clear_for_king(kToQ, rookFromQ) && path_clear_for_rook(rookFromQ, rookToQ) && king_path_safe(kToQ)) {
              add_move(board, moves, kFrom, rookFromQ, BITS2.QSIDE_CASTLE);
            }
          }
        } else {
          if (castling[us] & BITS2.KSIDE_CASTLE) {
            var castling_from = kings[us];
            var castling_to = castling_from + 2;
            if (board[castling_from + 1] == null && board[castling_to] == null && !attacked(them, kings[us]) && !attacked(them, castling_from + 1) && !attacked(them, castling_to)) {
              add_move(board, moves, kings[us], castling_to, BITS2.KSIDE_CASTLE);
            }
          }
          if (castling[us] & BITS2.QSIDE_CASTLE) {
            var castling_from = kings[us];
            var castling_to = castling_from - 2;
            if (board[castling_from - 1] == null && board[castling_from - 2] == null && board[castling_from - 3] == null && !attacked(them, kings[us]) && !attacked(them, castling_from - 1) && !attacked(them, castling_to)) {
              add_move(board, moves, kings[us], castling_to, BITS2.QSIDE_CASTLE);
            }
          }
        }
      }
    }
    if (!legal) {
      return moves;
    }
    var legal_moves = [];
    for (var i = 0, len = moves.length;i < len; i++) {
      make_move(moves[i]);
      if (!king_attacked(us)) {
        legal_moves.push(moves[i]);
      }
      undo_move();
    }
    return legal_moves;
  }
  function move_to_san(move, moves) {
    var output = "";
    if (move.flags & BITS2.KSIDE_CASTLE) {
      output = "O-O";
    } else if (move.flags & BITS2.QSIDE_CASTLE) {
      output = "O-O-O";
    } else {
      if (move.piece !== PAWN2) {
        var disambiguator = get_disambiguator2(move, moves);
        output += move.piece.toUpperCase() + disambiguator;
      }
      if (move.flags & (BITS2.CAPTURE | BITS2.EP_CAPTURE)) {
        if (move.piece === PAWN2) {
          output += algebraic2(move.from)[0];
        }
        output += "x";
      }
      output += algebraic2(move.to);
      if (move.flags & BITS2.PROMOTION) {
        output += "=" + move.promotion.toUpperCase();
      }
    }
    make_move(move);
    if (in_check()) {
      if (in_checkmate()) {
        output += "#";
      } else {
        output += "+";
      }
    }
    undo_move();
    return output;
  }
  function attacked(color, square) {
    for (var i = SQUARE_MAP2.a8;i <= SQUARE_MAP2.h1; i++) {
      if (i & 136) {
        i += 7;
        continue;
      }
      if (board[i] == null || board[i].color !== color)
        continue;
      var piece = board[i];
      var difference = i - square;
      var index = difference + 119;
      if (ATTACKS2[index] & 1 << SHIFTS2[piece.type]) {
        if (piece.type === PAWN2) {
          if (difference > 0) {
            if (piece.color === WHITE2)
              return true;
          } else {
            if (piece.color === BLACK2)
              return true;
          }
          continue;
        }
        if (piece.type === "n" || piece.type === "k")
          return true;
        var offset = RAYS2[index];
        var j = i + offset;
        var blocked = false;
        while (j !== square) {
          if (board[j] != null) {
            blocked = true;
            break;
          }
          j += offset;
        }
        if (!blocked)
          return true;
      }
    }
    return false;
  }
  function king_attacked(color) {
    return attacked(swap_color2(color), kings[color]);
  }
  function in_check() {
    return king_attacked(turn);
  }
  function in_checkmate() {
    return in_check() && generate_moves().length === 0;
  }
  function in_stalemate() {
    return !in_check() && generate_moves().length === 0;
  }
  function insufficient_material() {
    var pieces = {};
    var bishops = [];
    var num_pieces = 0;
    var sq_color = 0;
    for (var i = SQUARE_MAP2.a8;i <= SQUARE_MAP2.h1; i++) {
      sq_color = (sq_color + 1) % 2;
      if (i & 136) {
        i += 7;
        continue;
      }
      var piece = board[i];
      if (piece) {
        pieces[piece.type] = piece.type in pieces ? pieces[piece.type] + 1 : 1;
        if (piece.type === BISHOP2) {
          bishops.push(sq_color);
        }
        num_pieces++;
      }
    }
    if (num_pieces === 2) {
      return true;
    } else if (num_pieces === 3 && (pieces[BISHOP2] === 1 || pieces[KNIGHT2] === 1)) {
      return true;
    } else if (num_pieces === pieces[BISHOP2] + 2) {
      var sum = 0;
      var len = bishops.length;
      for (var i = 0;i < len; i++) {
        sum += bishops[i];
      }
      if (sum === 0 || sum === len) {
        return true;
      }
    }
    return false;
  }
  function in_threefold_repetition() {
    var moves = [];
    var positions = {};
    var repetition = false;
    while (true) {
      var move = undo_move();
      if (!move)
        break;
      moves.push(move);
    }
    while (true) {
      var fen2 = generate_fen().split(" ").slice(0, 4).join(" ");
      positions[fen2] = fen2 in positions ? positions[fen2] + 1 : 1;
      if (positions[fen2] >= 3) {
        repetition = true;
      }
      if (!moves.length) {
        break;
      }
      make_move(moves.pop());
    }
    return repetition;
  }
  function push(move) {
    history.push({
      move,
      kings: { b: kings.b, w: kings.w },
      turn,
      castling: { b: castling.b, w: castling.w },
      ep_square,
      half_moves,
      move_number
    });
  }
  function make_move(move) {
    var us = turn;
    var them = swap_color2(us);
    push(move);
    var is960Castle = isChess960 && move.flags & (BITS2.KSIDE_CASTLE | BITS2.QSIDE_CASTLE);
    if (is960Castle) {
      var rankSide = rank2(move.from);
      var isK = !!(move.flags & BITS2.KSIDE_CASTLE);
      var kingTo = isK ? rankSide === RANK_12 ? SQUARE_MAP2.g1 : SQUARE_MAP2.g8 : rankSide === RANK_12 ? SQUARE_MAP2.c1 : SQUARE_MAP2.c8;
      var rookTo = isK ? rankSide === RANK_12 ? SQUARE_MAP2.f1 : SQUARE_MAP2.f8 : rankSide === RANK_12 ? SQUARE_MAP2.d1 : SQUARE_MAP2.d8;
      var kingPiece = board[move.from];
      var rookPiece = board[move.to];
      board[move.from] = null;
      board[move.to] = null;
      board[kingTo] = kingPiece;
      board[rookTo] = rookPiece;
      kings[us] = kingTo;
      castling[us] = "";
    } else {
      board[move.to] = board[move.from];
      board[move.from] = null;
    }
    if (move.flags & BITS2.EP_CAPTURE) {
      if (turn === BLACK2) {
        board[move.to - 16] = null;
      } else {
        board[move.to + 16] = null;
      }
    }
    if (move.flags & BITS2.PROMOTION) {
      board[move.to] = { type: move.promotion, color: us };
    }
    if (!is960Castle && board[move.to] && board[move.to].type === KING2) {
      kings[board[move.to].color] = move.to;
      if (move.flags & BITS2.KSIDE_CASTLE) {
        var castling_to = move.to - 1;
        var castling_from = move.to + 1;
        board[castling_to] = board[castling_from];
        board[castling_from] = null;
      } else if (move.flags & BITS2.QSIDE_CASTLE) {
        var castling_to = move.to + 1;
        var castling_from = move.to - 2;
        board[castling_to] = board[castling_from];
        board[castling_from] = null;
      }
      castling[us] = "";
    }
    if (castling[us]) {
      for (var i = 0, len = ROOKS2[us].length;i < len; i++) {
        if (move.from === ROOKS2[us][i].square && castling[us] & ROOKS2[us][i].flag) {
          castling[us] ^= ROOKS2[us][i].flag;
          break;
        }
      }
    }
    if (castling[them]) {
      for (var i = 0, len = ROOKS2[them].length;i < len; i++) {
        if (move.to === ROOKS2[them][i].square && castling[them] & ROOKS2[them][i].flag) {
          castling[them] ^= ROOKS2[them][i].flag;
          break;
        }
      }
    }
    if (move.flags & BITS2.BIG_PAWN) {
      if (turn === "b") {
        ep_square = move.to - 16;
      } else {
        ep_square = move.to + 16;
      }
    } else {
      ep_square = EMPTY2;
    }
    if (move.piece === PAWN2) {
      half_moves = 0;
    } else if (move.flags & (BITS2.CAPTURE | BITS2.EP_CAPTURE)) {
      half_moves = 0;
    } else {
      half_moves++;
    }
    if (turn === BLACK2) {
      move_number++;
    }
    turn = swap_color2(turn);
  }
  function undo_move() {
    var old = history.pop();
    if (old == null) {
      return null;
    }
    var move = old.move;
    kings = old.kings;
    turn = old.turn;
    castling = old.castling;
    ep_square = old.ep_square;
    half_moves = old.half_moves;
    move_number = old.move_number;
    var us = turn;
    var them = swap_color2(turn);
    var is960CastleUndo = isChess960 && move.flags & (BITS2.KSIDE_CASTLE | BITS2.QSIDE_CASTLE);
    if (is960CastleUndo) {
      var rankSide = rank2(move.from);
      var isK = !!(move.flags & BITS2.KSIDE_CASTLE);
      var kingTo = isK ? rankSide === RANK_12 ? SQUARE_MAP2.g1 : SQUARE_MAP2.g8 : rankSide === RANK_12 ? SQUARE_MAP2.c1 : SQUARE_MAP2.c8;
      var rookTo = isK ? rankSide === RANK_12 ? SQUARE_MAP2.f1 : SQUARE_MAP2.f8 : rankSide === RANK_12 ? SQUARE_MAP2.d1 : SQUARE_MAP2.d8;
      var kingPiece = board[kingTo];
      var rookPiece = board[rookTo];
      board[kingTo] = null;
      board[rookTo] = null;
      board[move.from] = kingPiece;
      board[move.to] = rookPiece;
    } else {
      if (board[move.to]) {
        board[move.from] = board[move.to];
        board[move.from].type = move.piece;
        board[move.to] = null;
      }
    }
    if (move.flags & BITS2.CAPTURE) {
      board[move.to] = { type: move.captured, color: them };
    } else if (move.flags & BITS2.EP_CAPTURE) {
      var index;
      if (us === BLACK2) {
        index = move.to - 16;
      } else {
        index = move.to + 16;
      }
      board[index] = { type: PAWN2, color: them };
    }
    if (!is960CastleUndo && move.flags & (BITS2.KSIDE_CASTLE | BITS2.QSIDE_CASTLE)) {
      var castling_to, castling_from;
      if (move.flags & BITS2.KSIDE_CASTLE) {
        castling_to = move.to + 1;
        castling_from = move.to - 1;
      } else if (move.flags & BITS2.QSIDE_CASTLE) {
        castling_to = move.to - 2;
        castling_from = move.to + 1;
      }
      board[castling_to] = board[castling_from];
      board[castling_from] = null;
    }
    return move;
  }
  function move_from_san(move, sloppy) {
    var clean_move = stripped_san2(move);
    for (var parser = 0;parser < 2; parser++) {
      if (parser == PARSER_SLOPPY2) {
        if (!sloppy) {
          return null;
        }
        var overly_disambiguated = false;
        var matches = clean_move.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/);
        if (matches) {
          var piece = matches[1];
          var from = matches[2];
          var to = matches[3];
          var promotion = matches[4];
          if (from.length == 1) {
            overly_disambiguated = true;
          }
        } else {
          var matches = clean_move.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/);
          if (matches) {
            var piece = matches[1];
            var from = matches[2];
            var to = matches[3];
            var promotion = matches[4];
            if (from.length == 1) {
              var overly_disambiguated = true;
            }
          }
        }
      }
      var piece_type = infer_piece_type2(clean_move);
      var moves = generate_moves({
        legal: true,
        piece: piece ? piece : piece_type
      });
      for (var i = 0, len = moves.length;i < len; i++) {
        switch (parser) {
          case PARSER_STRICT2: {
            if (clean_move === stripped_san2(move_to_san(moves[i], moves))) {
              return moves[i];
            }
            break;
          }
          case PARSER_SLOPPY2: {
            if (matches) {
              if ((!piece || piece.toLowerCase() == moves[i].piece) && SQUARE_MAP2[from] == moves[i].from && SQUARE_MAP2[to] == moves[i].to && (!promotion || promotion.toLowerCase() == moves[i].promotion)) {
                return moves[i];
              } else if (overly_disambiguated) {
                var square = algebraic2(moves[i].from);
                if ((!piece || piece.toLowerCase() == moves[i].piece) && SQUARE_MAP2[to] == moves[i].to && (from == square[0] || from == square[1]) && (!promotion || promotion.toLowerCase() == moves[i].promotion)) {
                  return moves[i];
                }
              }
            }
          }
        }
      }
    }
    return null;
  }
  function make_pretty(ugly_move) {
    var move = clone2(ugly_move);
    move.san = move_to_san(move, generate_moves({ legal: true }));
    move.to = algebraic2(move.to);
    move.from = algebraic2(move.from);
    var flags = "";
    for (var flag in BITS2) {
      if (BITS2[flag] & move.flags) {
        flags += FLAGS2[flag];
      }
    }
    move.flags = flags;
    return move;
  }
  function perft(depth) {
    var moves = generate_moves({ legal: false });
    var nodes = 0;
    var color = turn;
    for (var i = 0, len = moves.length;i < len; i++) {
      make_move(moves[i]);
      if (!king_attacked(color)) {
        if (depth - 1 > 0) {
          var child_nodes = perft(depth - 1);
          nodes += child_nodes;
        } else {
          nodes++;
        }
      }
      undo_move();
    }
    return nodes;
  }
  return {
    load: function(fen2) {
      return load(fen2);
    },
    reset: function() {
      return reset();
    },
    moves: function(options2) {
      var ugly_moves = generate_moves(options2);
      var moves = [];
      for (var i = 0, len = ugly_moves.length;i < len; i++) {
        if (typeof options2 !== "undefined" && "verbose" in options2 && options2.verbose) {
          moves.push(make_pretty(ugly_moves[i]));
        } else {
          moves.push(move_to_san(ugly_moves[i], generate_moves({ legal: true })));
        }
      }
      return moves;
    },
    in_check: function() {
      return in_check();
    },
    in_checkmate: function() {
      return in_checkmate();
    },
    in_stalemate: function() {
      return in_stalemate();
    },
    in_draw: function() {
      return half_moves >= 100 || in_stalemate() || insufficient_material() || in_threefold_repetition();
    },
    insufficient_material: function() {
      return insufficient_material();
    },
    in_threefold_repetition: function() {
      return in_threefold_repetition();
    },
    chess960: function() {
      return isChess960;
    },
    game_over: function() {
      return half_moves >= 100 || in_checkmate() || in_stalemate() || insufficient_material() || in_threefold_repetition();
    },
    validate_fen: function(fen2) {
      return validate_fen(fen2);
    },
    fen: function() {
      return generate_fen();
    },
    board: function() {
      var output = [], row = [];
      for (var i = SQUARE_MAP2.a8;i <= SQUARE_MAP2.h1; i++) {
        if (board[i] == null) {
          row.push(null);
        } else {
          row.push({
            square: algebraic2(i),
            type: board[i].type,
            color: board[i].color
          });
        }
        if (i + 1 & 136) {
          output.push(row);
          row = [];
          i += 8;
        }
      }
      return output;
    },
    pgn: function(options2) {
      var newline = typeof options2 === "object" && typeof options2.newline_char === "string" ? options2.newline_char : `
`;
      var max_width = typeof options2 === "object" && typeof options2.max_width === "number" ? options2.max_width : 0;
      var result = [];
      var header_exists = false;
      for (var i in header) {
        result.push("[" + i + ' "' + header[i] + '"]' + newline);
        header_exists = true;
      }
      if (header_exists && history.length) {
        result.push(newline);
      }
      var append_comment = function(move_string2) {
        var comment = comments[generate_fen()];
        if (typeof comment !== "undefined") {
          var delimiter = move_string2.length > 0 ? " " : "";
          move_string2 = `${move_string2}${delimiter}{${comment}}`;
        }
        return move_string2;
      };
      var reversed_history = [];
      while (history.length > 0) {
        reversed_history.push(undo_move());
      }
      var moves = [];
      var move_string = "";
      if (reversed_history.length === 0) {
        moves.push(append_comment(""));
      }
      while (reversed_history.length > 0) {
        move_string = append_comment(move_string);
        var move = reversed_history.pop();
        if (!history.length && move.color === "b") {
          const prefix = `${move_number}. ...`;
          move_string = move_string ? `${move_string} ${prefix}` : prefix;
        } else if (move.color === "w") {
          if (move_string.length) {
            moves.push(move_string);
          }
          move_string = move_number + ".";
        }
        move_string = move_string + " " + move_to_san(move, generate_moves({ legal: true }));
        make_move(move);
      }
      if (move_string.length) {
        moves.push(append_comment(move_string));
      }
      if (typeof header.Result !== "undefined") {
        moves.push(header.Result);
      }
      if (max_width === 0) {
        return result.join("") + moves.join(" ");
      }
      var strip = function() {
        if (result.length > 0 && result[result.length - 1] === " ") {
          result.pop();
          return true;
        }
        return false;
      };
      var wrap_comment = function(width, move2) {
        for (var token of move2.split(" ")) {
          if (!token) {
            continue;
          }
          if (width + token.length > max_width) {
            while (strip()) {
              width--;
            }
            result.push(newline);
            width = 0;
          }
          result.push(token);
          width += token.length;
          result.push(" ");
          width++;
        }
        if (strip()) {
          width--;
        }
        return width;
      };
      var current_width = 0;
      for (var i = 0;i < moves.length; i++) {
        if (current_width + moves[i].length > max_width) {
          if (moves[i].includes("{")) {
            current_width = wrap_comment(current_width, moves[i]);
            continue;
          }
        }
        if (current_width + moves[i].length > max_width && i !== 0) {
          if (result[result.length - 1] === " ") {
            result.pop();
          }
          result.push(newline);
          current_width = 0;
        } else if (i !== 0) {
          result.push(" ");
          current_width++;
        }
        result.push(moves[i]);
        current_width += moves[i].length;
      }
      return result.join("");
    },
    load_pgn: function(pgn, options2) {
      var sloppy = typeof options2 !== "undefined" && "sloppy" in options2 ? options2.sloppy : false;
      function mask(str) {
        return str.replace(/\\/g, "\\");
      }
      function parse_pgn_header(header2, options3) {
        var newline_char2 = typeof options3 === "object" && typeof options3.newline_char === "string" ? options3.newline_char : `\r?
`;
        var header_obj = {};
        var headers2 = header2.split(new RegExp(mask(newline_char2)));
        var key2 = "";
        var value = "";
        for (var i = 0;i < headers2.length; i++) {
          var regex = /^\s*\[([A-Za-z]+)\s*"(.*)"\s*\]\s*$/;
          key2 = headers2[i].replace(regex, "$1");
          value = headers2[i].replace(regex, "$2");
          if (trim2(key2).length > 0) {
            header_obj[key2] = value;
          }
        }
        return header_obj;
      }
      pgn = pgn.trim();
      var newline_char = typeof options2 === "object" && typeof options2.newline_char === "string" ? options2.newline_char : `\r?
`;
      var header_regex = new RegExp("^(\\[((?:" + mask(newline_char) + ")|.)*\\])" + "(?:\\s*" + mask(newline_char) + "){2}");
      var header_string = header_regex.test(pgn) ? header_regex.exec(pgn)[1] : "";
      reset();
      var headers = parse_pgn_header(header_string, options2);
      var fen2 = "";
      for (var key in headers) {
        if (key.toLowerCase() === "fen") {
          fen2 = headers[key];
        }
        set_header([key, headers[key]]);
      }
      if (sloppy) {
        if (fen2) {
          if (!load(fen2, true)) {
            return false;
          }
        }
      } else {
        if (headers["SetUp"] === "1") {
          if (!(("FEN" in headers) && load(headers["FEN"], true))) {
            return false;
          }
        }
      }
      var to_hex = function(string) {
        return Array.from(string).map(function(c) {
          return c.charCodeAt(0) < 128 ? c.charCodeAt(0).toString(16) : encodeURIComponent(c).replace(/\%/g, "").toLowerCase();
        }).join("");
      };
      var from_hex = function(string) {
        return string.length == 0 ? "" : decodeURIComponent("%" + string.match(/.{1,2}/g).join("%"));
      };
      var encode_comment = function(string) {
        string = string.replace(new RegExp(mask(newline_char), "g"), " ");
        return `{${to_hex(string.slice(1, string.length - 1))}}`;
      };
      var decode_comment = function(string) {
        if (string.startsWith("{") && string.endsWith("}")) {
          return from_hex(string.slice(1, string.length - 1));
        }
      };
      var ms = pgn.replace(header_string, "").replace(new RegExp(`({[^}]*})+?|;([^${mask(newline_char)}]*)`, "g"), function(match, bracket, semicolon) {
        return bracket !== undefined ? encode_comment(bracket) : " " + encode_comment(`{${semicolon.slice(1)}}`);
      }).replace(new RegExp(mask(newline_char), "g"), " ");
      var rav_regex = /(\([^\(\)]+\))+?/g;
      while (rav_regex.test(ms)) {
        ms = ms.replace(rav_regex, "");
      }
      ms = ms.replace(/\d+\.(\.\.)?/g, "");
      ms = ms.replace(/\.\.\./g, "");
      ms = ms.replace(/\$\d+/g, "");
      var moves = trim2(ms).split(new RegExp(/\s+/));
      moves = moves.join(",").replace(/,,+/g, ",").split(",");
      var move = "";
      var result = "";
      for (var half_move = 0;half_move < moves.length; half_move++) {
        var comment = decode_comment(moves[half_move]);
        if (comment !== undefined) {
          comments[generate_fen()] = comment;
          continue;
        }
        move = move_from_san(moves[half_move], sloppy);
        if (move == null) {
          if (TERMINATION_MARKERS2.indexOf(moves[half_move]) > -1) {
            result = moves[half_move];
          } else {
            return false;
          }
        } else {
          result = "";
          make_move(move);
        }
      }
      if (result && Object.keys(header).length && !header["Result"]) {
        set_header(["Result", result]);
      }
      return true;
    },
    header: function() {
      return set_header(arguments);
    },
    turn: function() {
      return turn;
    },
    move: function(move, options2) {
      var sloppy = typeof options2 !== "undefined" && "sloppy" in options2 ? options2.sloppy : false;
      var move_obj = null;
      if (typeof move === "string") {
        move_obj = move_from_san(move, sloppy);
      } else if (typeof move === "object") {
        var moves = generate_moves();
        for (var i = 0, len = moves.length;i < len; i++) {
          if (move.from === algebraic2(moves[i].from) && move.to === algebraic2(moves[i].to) && (!("promotion" in moves[i]) || move.promotion === moves[i].promotion)) {
            move_obj = moves[i];
            break;
          }
        }
      }
      if (!move_obj) {
        return null;
      }
      var pretty_move = make_pretty(move_obj);
      make_move(move_obj);
      return pretty_move;
    },
    undo: function() {
      var move = undo_move();
      return move ? make_pretty(move) : null;
    },
    clear: function() {
      return clear();
    },
    put: function(piece, square) {
      return put(piece, square);
    },
    get: function(square) {
      return get(square);
    },
    ascii() {
      var s = `   +------------------------+
`;
      for (var i = SQUARE_MAP2.a8;i <= SQUARE_MAP2.h1; i++) {
        if (file2(i) === 0) {
          s += " " + "87654321"[rank2(i)] + " |";
        }
        if (board[i] == null) {
          s += " . ";
        } else {
          var piece = board[i].type;
          var color = board[i].color;
          var symbol = color === WHITE2 ? piece.toUpperCase() : piece.toLowerCase();
          s += " " + symbol + " ";
        }
        if (i + 1 & 136) {
          s += `|
`;
          i += 8;
        }
      }
      s += `   +------------------------+
`;
      s += "     a  b  c  d  e  f  g  h";
      return s;
    },
    remove: function(square) {
      return remove(square);
    },
    perft: function(depth) {
      return perft(depth);
    },
    square_color: function(square) {
      if (square in SQUARE_MAP2) {
        var sq_0x88 = SQUARE_MAP2[square];
        return (rank2(sq_0x88) + file2(sq_0x88)) % 2 === 0 ? "light" : "dark";
      }
      return null;
    },
    history: function(options2) {
      var reversed_history = [];
      var move_history = [];
      var verbose = typeof options2 !== "undefined" && "verbose" in options2 && options2.verbose;
      while (history.length > 0) {
        reversed_history.push(undo_move());
      }
      while (reversed_history.length > 0) {
        var move = reversed_history.pop();
        if (verbose) {
          move_history.push(make_pretty(move));
        } else {
          move_history.push(move_to_san(move, generate_moves({ legal: true })));
        }
        make_move(move);
      }
      return move_history;
    },
    get_comment: function() {
      return comments[generate_fen()];
    },
    set_comment: function(comment) {
      comments[generate_fen()] = comment.replace(/\{/g, "[").replace(/\}/g, "]");
    },
    delete_comment: function() {
      var comment = comments[generate_fen()];
      delete comments[generate_fen()];
      return comment;
    },
    get_comments: function() {
      prune_comments();
      return Object.keys(comments).map(function(fen2) {
        return { fen: fen2, comment: comments[fen2] };
      });
    },
    delete_comments: function() {
      prune_comments();
      return Object.keys(comments).map(function(fen2) {
        var comment = comments[fen2];
        delete comments[fen2];
        return { fen: fen2, comment };
      });
    }
  };
};

// node_modules/cm-chess/src/Chess.js
var PIECES = {
  p: { name: "pawn", value: 1 },
  n: { name: "knight", value: 3 },
  b: { name: "bishop", value: 3 },
  r: { name: "rook", value: 5 },
  q: { name: "queen", value: 9 },
  k: { name: "king", value: Infinity }
};
var COLOR = {
  white: "w",
  black: "b"
};
var FEN = {
  empty: "8/8/8/8/8/8/8/8 w - - 0 1",
  start: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
};
var EVENT_TYPE = {
  illegalMove: "illegalMove",
  legalMove: "legalMove",
  undoMove: "undoMove",
  initialized: "initialized"
};
var GAME_VARIANT = {
  standard: "standard",
  chess960: "chess960"
};
function publishEvent(observers, event) {
  for (const observer of observers) {
    setTimeout(() => {
      observer(event);
    });
  }
}

class Chess3 {
  constructor(props = {}) {
    this.observers = [];
    this.props = {
      fen: undefined,
      pgn: undefined,
      gameVariant: GAME_VARIANT.standard,
      chess960: undefined,
      sloppy: true,
      ...props
    };
    if (this.props.chess960 !== undefined) {
      console.warn("props.chess960 is deprecated, use GAME_VARIANT");
      this.props.gameVariant = GAME_VARIANT.chess960;
    }
    if (typeof props === "string") {
      console.warn('directly passing a FEN is deprecated, use `{fen: "' + props + '"}`');
      this.props.fen = props;
    }
    if (!this.props.fen && !this.props.pgn) {
      this.props.fen = FEN.start;
    }
    if (this.props.fen) {
      this.load(this.props.fen);
    } else if (this.props.pgn) {
      this.loadPgn(this.props.pgn);
    } else {
      this.load(FEN.start);
    }
  }
  fen(move = this.lastMove()) {
    if (move) {
      return move.fen;
    } else {
      return this.setUpFen();
    }
  }
  setUpFen() {
    if (this.pgn.header.tags[TAGS.SetUp]) {
      return this.pgn.header.tags[TAGS.FEN];
    } else {
      return FEN.start;
    }
  }
  header() {
    return this.pgn.header.tags;
  }
  gameOver(move = this.lastMove()) {
    if (move) {
      return move.gameOver;
    } else {
      return new Chess2(this.fen(), { chess960: this.props.gameVariant === GAME_VARIANT.chess960 }).game_over();
    }
  }
  inDraw(move = this.lastMove()) {
    if (move) {
      return move.inDraw === true;
    } else {
      return new Chess2(this.fen(), { chess960: this.props.gameVariant === GAME_VARIANT.chess960 }).in_draw();
    }
  }
  inStalemate(move = this.lastMove()) {
    if (move) {
      return move.inStalemate === true;
    } else {
      return new Chess2(this.fen(), { chess960: this.props.gameVariant === GAME_VARIANT.chess960 }).in_stalemate();
    }
  }
  insufficientMaterial(move = this.lastMove()) {
    if (move) {
      return move.insufficientMaterial === true;
    } else {
      return new Chess2(this.fen(), { chess960: this.props.gameVariant === GAME_VARIANT.chess960 }).insufficient_material();
    }
  }
  inThreefoldRepetition(move = this.lastMove()) {
    return move && move.inThreefoldRepetition === true;
  }
  inCheckmate(move = this.lastMove()) {
    if (move) {
      return move.inCheckmate === true;
    } else {
      return new Chess2(this.fen(), { chess960: this.props.gameVariant === GAME_VARIANT.chess960 }).in_checkmate();
    }
  }
  inCheck(move = this.lastMove()) {
    if (move) {
      return move.inCheck === true;
    } else {
      return new Chess2(this.fen(), { chess960: this.props.gameVariant === GAME_VARIANT.chess960 }).in_check();
    }
  }
  history() {
    return this.pgn.history.moves;
  }
  lastMove() {
    if (this.pgn.history.moves.length > 0) {
      return this.pgn.history.moves[this.pgn.history.moves.length - 1];
    } else {
      return null;
    }
  }
  load(fen) {
    const chess = new Chess2(fen, { chess960: this.props.gameVariant === GAME_VARIANT.chess960 });
    if (chess && chess.fen() === fen) {
      this.pgn = new Pgn(undefined, { chess960: this.props.gameVariant === GAME_VARIANT.chess960 });
      if (fen !== FEN.start) {
        this.pgn.header.tags[TAGS.SetUp] = "1";
        this.pgn.header.tags[TAGS.FEN] = chess.fen();
        this.pgn.history.props.setUpFen = fen;
      }
    } else {
      throw Error("Invalid fen " + fen);
    }
    publishEvent(this.observers, { type: EVENT_TYPE.initialized, fen });
  }
  loadPgn(pgn, sloppy = this.props.sloppy) {
    this.pgn = new Pgn(pgn, { sloppy });
    if (this.pgn.props.chess960) {
      this.props.gameVariant = GAME_VARIANT.chess960;
    }
    publishEvent(this.observers, { type: EVENT_TYPE.initialized, pgn });
  }
  move(move, previousMove = undefined, sloppy = this.props.sloppy) {
    try {
      const moveResult = this.pgn.history.addMove(move, previousMove, sloppy);
      publishEvent(this.observers, { type: EVENT_TYPE.legalMove, move: moveResult, previousMove });
      return moveResult;
    } catch (e) {
      publishEvent(this.observers, { type: EVENT_TYPE.illegalMove, move, previousMove });
      return null;
    }
  }
  moves(options = undefined, move = this.lastMove()) {
    const chessJs = new Chess2(this.fen(move), { chess960: this.props.gameVariant === GAME_VARIANT.chess960 });
    return chessJs.moves(options);
  }
  validateMove(move, previousMove = undefined, sloppy = this.props.sloppy) {
    return this.pgn.history.validateMove(move, previousMove, sloppy);
  }
  renderPgn(renderHeader = true, renderComments = true, renderNags = true) {
    return this.pgn.render(renderHeader, renderComments, renderNags);
  }
  pieces(type = undefined, color = undefined, move = this.lastMove()) {
    const chessJs = move ? new Chess2(move.fen, { chess960: this.props.gameVariant === GAME_VARIANT.chess960 }) : new Chess2(this.fen(), { chess960: this.props.gameVariant === GAME_VARIANT.chess960 });
    let result = [];
    for (let i = 0;i < 64; i++) {
      const square = SQUARES2[i];
      const piece = chessJs.get(square);
      if (piece) {
        piece.square = square;
      }
      if (!type) {
        if (!color && piece) {
          result.push(piece);
        }
      } else if (!color && piece && piece.type === type) {
        result.push(piece);
      } else if (piece && piece.color === color && piece.type === type) {
        result.push(piece);
      }
    }
    return result;
  }
  piece(square, move = this.lastMove()) {
    const chessJs = move ? new Chess2(move.fen, { chess960: this.props.gameVariant === GAME_VARIANT.chess960 }) : new Chess2(this.fen(), { chess960: this.props.gameVariant === GAME_VARIANT.chess960 });
    return chessJs.get(square);
  }
  turn(move = this.lastMove()) {
    let factor = 0;
    if (this.setUpFen()) {
      const fenParts = this.setUpFen().split(" ");
      if (fenParts[1] === COLOR.black) {
        factor = 1;
      }
    }
    const ply = move ? move.ply : 0;
    return ply % 2 === factor ? COLOR.white : COLOR.black;
  }
  undo(move = this.lastMove()) {
    if (move.previous) {
      move.previous.next = undefined;
    }
    const index = move.variation.findIndex((element) => {
      return element.ply === move.ply;
    });
    move.variation = move.variation.splice(index);
    publishEvent(this.observers, { type: EVENT_TYPE.undoMove, move });
  }
  plyCount() {
    return this.history().length;
  }
  fenOfPly(plyNumber) {
    if (plyNumber > 0) {
      return this.history()[plyNumber - 1].fen;
    } else {
      return this.setUpFen();
    }
  }
  addObserver(callback) {
    this.observers.push(callback);
  }
}

// node_modules/cm-chessboard/src/model/Position.js
var FEN2 = {
  start: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  empty: "8/8/8/8/8/8/8/8"
};

class Position {
  constructor(fen = FEN2.empty) {
    this.squares = new Array(64).fill(null);
    this.setFen(fen);
  }
  setFen(fen = FEN2.empty) {
    const parts = fen.replace(/^\s*/, "").replace(/\s*$/, "").split(/\/|\s/);
    for (let part = 0;part < 8; part++) {
      const row = parts[7 - part].replace(/\d/g, (str) => {
        const numSpaces = parseInt(str);
        let ret = "";
        for (let i = 0;i < numSpaces; i++) {
          ret += "-";
        }
        return ret;
      });
      for (let c = 0;c < 8; c++) {
        const char = row.substring(c, c + 1);
        let piece = null;
        if (char !== "-") {
          if (char.toUpperCase() === char) {
            piece = `w${char.toLowerCase()}`;
          } else {
            piece = `b${char}`;
          }
        }
        this.squares[part * 8 + c] = piece;
      }
    }
  }
  getFen() {
    let parts = new Array(8).fill("");
    for (let part = 0;part < 8; part++) {
      let spaceCounter = 0;
      for (let i = 0;i < 8; i++) {
        const piece = this.squares[part * 8 + i];
        if (!piece) {
          spaceCounter++;
        } else {
          if (spaceCounter > 0) {
            parts[7 - part] += spaceCounter;
            spaceCounter = 0;
          }
          const color = piece.substring(0, 1);
          const name = piece.substring(1, 2);
          if (color === "w") {
            parts[7 - part] += name.toUpperCase();
          } else {
            parts[7 - part] += name;
          }
        }
      }
      if (spaceCounter > 0) {
        parts[7 - part] += spaceCounter;
        spaceCounter = 0;
      }
    }
    return parts.join("/");
  }
  getPieces(pieceColor = undefined, pieceType = undefined, sortBy = ["k", "q", "r", "b", "n", "p"]) {
    const pieces = [];
    const sort = (a, b) => {
      return sortBy.indexOf(a.name) - sortBy.indexOf(b.name);
    };
    for (let i = 0;i < 64; i++) {
      const piece = this.squares[i];
      if (piece) {
        const type = piece.charAt(1);
        const color = piece.charAt(0);
        const square = Position.indexToSquare(i);
        if (pieceType && pieceType !== type || pieceColor && pieceColor !== color) {
          continue;
        }
        pieces.push({
          name: type,
          type,
          color,
          position: square,
          square
        });
      }
    }
    if (sortBy) {
      pieces.sort(sort);
    }
    return pieces;
  }
  movePiece(squareFrom, squareTo) {
    if (!this.squares[Position.squareToIndex(squareFrom)]) {
      console.warn("no piece on", squareFrom);
      return;
    }
    this.squares[Position.squareToIndex(squareTo)] = this.squares[Position.squareToIndex(squareFrom)];
    this.squares[Position.squareToIndex(squareFrom)] = null;
  }
  setPiece(square, piece) {
    this.squares[Position.squareToIndex(square)] = piece;
  }
  getPiece(square) {
    return this.squares[Position.squareToIndex(square)];
  }
  static squareToIndex(square) {
    const coordinates = Position.squareToCoordinates(square);
    return coordinates[0] + coordinates[1] * 8;
  }
  static indexToSquare(index) {
    return this.coordinatesToSquare([Math.floor(index % 8), index / 8]);
  }
  static squareToCoordinates(square) {
    const file3 = square.charCodeAt(0) - 97;
    const rank3 = square.charCodeAt(1) - 49;
    return [file3, rank3];
  }
  static coordinatesToSquare(coordinates) {
    const file3 = String.fromCharCode(coordinates[0] + 97);
    const rank3 = String.fromCharCode(coordinates[1] + 49);
    return file3 + rank3;
  }
  toString() {
    return this.getFen();
  }
  clone() {
    const cloned = new Position;
    cloned.squares = this.squares.slice(0);
    return cloned;
  }
}

// node_modules/cm-chessboard/src/model/ChessboardState.js
class ChessboardState {
  constructor() {
    this.position = new Position;
    this.orientation = undefined;
    this.inputWhiteEnabled = false;
    this.inputBlackEnabled = false;
    this.squareSelectEnabled = false;
    this.moveInputCallback = null;
    this.extensionPoints = {};
    this.moveInputProcess = Promise.resolve();
  }
  inputEnabled() {
    return this.inputWhiteEnabled || this.inputBlackEnabled;
  }
  invokeExtensionPoints(name, data = {}) {
    const extensionPoints = this.extensionPoints[name];
    const dataCloned = Object.assign({}, data);
    dataCloned.extensionPoint = name;
    let returnValue = true;
    if (extensionPoints) {
      for (const extensionPoint of extensionPoints) {
        if (extensionPoint(dataCloned) === false) {
          returnValue = false;
        }
      }
    }
    return returnValue;
  }
}

// node_modules/cm-chessboard/src/lib/Svg.js
var SVG_NAMESPACE = "http://www.w3.org/2000/svg";

class Svg {
  static createSvg(containerElement = undefined) {
    let svg = document.createElementNS(SVG_NAMESPACE, "svg");
    if (containerElement) {
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      containerElement.appendChild(svg);
    }
    return svg;
  }
  static addElement(parent, name, attributes = {}) {
    let element = document.createElementNS(SVG_NAMESPACE, name);
    if (name === "use") {
      attributes["xlink:href"] = attributes["href"];
    }
    for (let attribute in attributes) {
      if (attributes.hasOwnProperty(attribute)) {
        if (attribute.indexOf(":") !== -1) {
          const value = attribute.split(":");
          element.setAttributeNS("http://www.w3.org/1999/" + value[0], value[1], attributes[attribute]);
        } else {
          element.setAttribute(attribute, attributes[attribute]);
        }
      }
    }
    parent.appendChild(element);
    return element;
  }
  static removeElement(element) {
    if (!element) {
      console.warn("removeElement, element is", element);
      return;
    }
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    } else {
      console.warn(element, "without parentNode");
    }
  }
}

// node_modules/cm-chessboard/src/model/Extension.js
var EXTENSION_POINT = {
  positionChanged: "positionChanged",
  boardChanged: "boardChanged",
  moveInputToggled: "moveInputToggled",
  moveInput: "moveInput",
  beforeRedrawBoard: "beforeRedrawBoard",
  afterRedrawBoard: "afterRedrawBoard",
  redrawBoard: "redrawBoard",
  animation: "animation",
  destroy: "destroy"
};

class Extension {
  constructor(chessboard) {
    this.chessboard = chessboard;
  }
  registerExtensionPoint(name, callback) {
    if (name === EXTENSION_POINT.redrawBoard) {
      console.warn("EXTENSION_POINT.redrawBoard is deprecated, use EXTENSION_POINT.afterRedrawBoard");
      name = EXTENSION_POINT.afterRedrawBoard;
    }
    if (!this.chessboard.state.extensionPoints[name]) {
      this.chessboard.state.extensionPoints[name] = [];
    }
    this.chessboard.state.extensionPoints[name].push(callback);
  }
  registerMethod(name, callback) {
    console.warn("registerMethod is deprecated, just add methods directly to the chessboard instance");
    if (!this.chessboard[name]) {
      this.chessboard[name] = (...args) => {
        return callback.apply(this, args);
      };
    } else {
      log.error("method", name, "already exists");
    }
  }
}

// node_modules/cm-chessboard/src/lib/Utils.js
class Utils {
  static delegate(element, eventName, selector, handler) {
    const eventListener = function(event) {
      let target = event.target;
      while (target && target !== this) {
        if (target.matches(selector)) {
          handler.call(target, event);
        }
        target = target.parentNode;
      }
    };
    element.addEventListener(eventName, eventListener);
    return {
      remove: function() {
        element.removeEventListener(eventName, eventListener);
      }
    };
  }
  static mergeObjects(target, source) {
    const isObject = (obj) => obj && typeof obj === "object";
    if (!isObject(target) || !isObject(source)) {
      return source;
    }
    for (const key of Object.keys(source)) {
      if (source[key] instanceof Object) {
        Object.assign(source[key], Utils.mergeObjects(target[key], source[key]));
      }
    }
    Object.assign(target || {}, source);
    return target;
  }
  static createDomElement(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstChild;
  }
  static createTask() {
    let resolve, reject;
    const promise = new Promise(function(_resolve, _reject) {
      resolve = _resolve;
      reject = _reject;
    });
    promise.resolve = resolve;
    promise.reject = reject;
    return promise;
  }
  static isAbsoluteUrl(url) {
    return url.indexOf("://") !== -1 || url.startsWith("/");
  }
}

// node_modules/cm-chessboard/src/view/PositionAnimationsQueue.js
var ANIMATION_EVENT_TYPE = {
  start: "start",
  frame: "frame",
  end: "end"
};

class PromiseQueue {
  constructor() {
    this.queue = [];
    this.workingOnPromise = false;
    this.stop = false;
  }
  async enqueue(promise) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        promise,
        resolve,
        reject
      });
      this.dequeue();
    });
  }
  dequeue() {
    if (this.workingOnPromise) {
      return;
    }
    if (this.stop) {
      this.queue = [];
      this.stop = false;
      return;
    }
    const entry = this.queue.shift();
    if (!entry) {
      return;
    }
    try {
      this.workingOnPromise = true;
      entry.promise().then((value) => {
        this.workingOnPromise = false;
        entry.resolve(value);
        this.dequeue();
      }).catch((err) => {
        this.workingOnPromise = false;
        entry.reject(err);
        this.dequeue();
      });
    } catch (err) {
      this.workingOnPromise = false;
      entry.reject(err);
      this.dequeue();
    }
    return true;
  }
  destroy() {
    this.stop = true;
  }
}
var CHANGE_TYPE = {
  move: 0,
  appear: 1,
  disappear: 2
};

class PositionsAnimation {
  constructor(view, fromPosition, toPosition, duration, callback) {
    this.view = view;
    if (fromPosition && toPosition) {
      this.animatedElements = this.createAnimation(fromPosition.squares, toPosition.squares);
      this.duration = duration;
      this.callback = callback;
      this.frameHandle = requestAnimationFrame(this.animationStep.bind(this));
    } else {
      console.error("fromPosition", fromPosition, "toPosition", toPosition);
    }
    this.view.positionsAnimationTask = Utils.createTask();
    this.view.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.animation, {
      type: ANIMATION_EVENT_TYPE.start
    });
  }
  static seekChanges(fromSquares, toSquares) {
    const appearedList = [], disappearedList = [], changes = [];
    for (let i = 0;i < 64; i++) {
      const previousSquare = fromSquares[i];
      const newSquare = toSquares[i];
      if (newSquare !== previousSquare) {
        if (newSquare) {
          appearedList.push({ piece: newSquare, index: i });
        }
        if (previousSquare) {
          disappearedList.push({ piece: previousSquare, index: i });
        }
      }
    }
    appearedList.forEach((appeared) => {
      let shortestDistance = 8;
      let foundMoved = null;
      disappearedList.forEach((disappeared) => {
        if (appeared.piece === disappeared.piece) {
          const moveDistance = PositionsAnimation.squareDistance(appeared.index, disappeared.index);
          if (moveDistance < shortestDistance) {
            foundMoved = disappeared;
            shortestDistance = moveDistance;
          }
        }
      });
      if (foundMoved) {
        disappearedList.splice(disappearedList.indexOf(foundMoved), 1);
        changes.push({
          type: CHANGE_TYPE.move,
          piece: appeared.piece,
          atIndex: foundMoved.index,
          toIndex: appeared.index
        });
      } else {
        changes.push({ type: CHANGE_TYPE.appear, piece: appeared.piece, atIndex: appeared.index });
      }
    });
    disappearedList.forEach((disappeared) => {
      changes.push({ type: CHANGE_TYPE.disappear, piece: disappeared.piece, atIndex: disappeared.index });
    });
    return changes;
  }
  createAnimation(fromSquares, toSquares) {
    const changes = PositionsAnimation.seekChanges(fromSquares, toSquares);
    const animatedElements = [];
    changes.forEach((change) => {
      const animatedItem = {
        type: change.type
      };
      switch (change.type) {
        case CHANGE_TYPE.move:
          animatedItem.element = this.view.getPieceElement(Position.indexToSquare(change.atIndex));
          animatedItem.element.parentNode.appendChild(animatedItem.element);
          animatedItem.atPoint = this.view.indexToPoint(change.atIndex);
          animatedItem.toPoint = this.view.indexToPoint(change.toIndex);
          break;
        case CHANGE_TYPE.appear:
          animatedItem.element = this.view.drawPieceOnSquare(Position.indexToSquare(change.atIndex), change.piece);
          animatedItem.element.style.opacity = 0;
          break;
        case CHANGE_TYPE.disappear:
          animatedItem.element = this.view.getPieceElement(Position.indexToSquare(change.atIndex));
          break;
      }
      animatedElements.push(animatedItem);
    });
    return animatedElements;
  }
  animationStep(time) {
    if (!this.view || !this.view.chessboard.state) {
      return;
    }
    if (!this.startTime) {
      this.startTime = time;
    }
    const timeDiff = time - this.startTime;
    if (timeDiff <= this.duration) {
      this.frameHandle = requestAnimationFrame(this.animationStep.bind(this));
    } else {
      cancelAnimationFrame(this.frameHandle);
      this.animatedElements.forEach((animatedItem) => {
        if (animatedItem.type === CHANGE_TYPE.disappear) {
          Svg.removeElement(animatedItem.element);
        }
      });
      this.view.positionsAnimationTask.resolve();
      this.view.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.animation, {
        type: ANIMATION_EVENT_TYPE.end
      });
      this.callback();
      return;
    }
    const t = Math.min(1, timeDiff / this.duration);
    let progress = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    if (isNaN(progress) || progress > 0.99) {
      progress = 1;
    }
    this.animatedElements.forEach((animatedItem) => {
      if (animatedItem.element) {
        switch (animatedItem.type) {
          case CHANGE_TYPE.move:
            animatedItem.element.transform.baseVal.removeItem(0);
            const transform = this.view.svg.createSVGTransform();
            transform.setTranslate(animatedItem.atPoint.x + (animatedItem.toPoint.x - animatedItem.atPoint.x) * progress, animatedItem.atPoint.y + (animatedItem.toPoint.y - animatedItem.atPoint.y) * progress);
            animatedItem.element.transform.baseVal.appendItem(transform);
            break;
          case CHANGE_TYPE.appear:
            animatedItem.element.style.opacity = Math.round(progress * 100) / 100;
            break;
          case CHANGE_TYPE.disappear:
            animatedItem.element.style.opacity = Math.round((1 - progress) * 100) / 100;
            break;
        }
      } else {
        console.warn("animatedItem has no element", animatedItem);
      }
    });
    this.view.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.animation, {
      type: ANIMATION_EVENT_TYPE.frame,
      progress
    });
  }
  static squareDistance(index1, index2) {
    const file1 = index1 % 8;
    const rank1 = Math.floor(index1 / 8);
    const file22 = index2 % 8;
    const rank22 = Math.floor(index2 / 8);
    return Math.max(Math.abs(rank22 - rank1), Math.abs(file22 - file1));
  }
}

class PositionAnimationsQueue extends PromiseQueue {
  constructor(chessboard) {
    super();
    this.chessboard = chessboard;
  }
  async enqueuePositionChange(positionFrom, positionTo, animated) {
    if (positionFrom.getFen() === positionTo.getFen()) {
      return Promise.resolve();
    } else {
      return super.enqueue(() => new Promise((resolve) => {
        let duration = animated ? this.chessboard.props.style.animationDuration : 0;
        if (this.queue.length > 0) {
          duration = duration / (1 + Math.pow(this.queue.length / 5, 2));
        }
        new PositionsAnimation(this.chessboard.view, positionFrom, positionTo, animated ? duration : 0, () => {
          if (this.chessboard.view) {
            this.chessboard.view.redrawPieces(positionTo.squares);
          }
          resolve();
        });
      }));
    }
  }
  async enqueueTurnBoard(position, color, animated) {
    return super.enqueue(() => new Promise((resolve) => {
      const emptyPosition = new Position(FEN2.empty);
      let duration = animated ? this.chessboard.props.style.animationDuration : 0;
      if (this.queue.length > 0) {
        duration = duration / (1 + Math.pow(this.queue.length / 5, 2));
      }
      new PositionsAnimation(this.chessboard.view, position, emptyPosition, animated ? duration : 0, () => {
        this.chessboard.state.orientation = color;
        this.chessboard.view.redrawBoard();
        this.chessboard.view.redrawPieces(emptyPosition.squares);
        new PositionsAnimation(this.chessboard.view, emptyPosition, position, animated ? duration : 0, () => {
          this.chessboard.view.redrawPieces(position.squares);
          resolve();
        });
      });
    }));
  }
}

// node_modules/cm-chessboard/src/view/VisualMoveInput.js
var MOVE_INPUT_STATE = {
  waitForInputStart: "waitForInputStart",
  pieceClickedThreshold: "pieceClickedThreshold",
  clickTo: "clickTo",
  secondClickThreshold: "secondClickThreshold",
  dragTo: "dragTo",
  clickDragTo: "clickDragTo",
  moveDone: "moveDone",
  reset: "reset"
};
var MOVE_CANCELED_REASON = {
  secondClick: "secondClick",
  secondaryClick: "secondaryClick",
  movedOutOfBoard: "movedOutOfBoard",
  draggedBack: "draggedBack",
  clickedAnotherPiece: "clickedAnotherPiece"
};
var DRAG_THRESHOLD = 4;

class VisualMoveInput {
  constructor(view) {
    this.view = view;
    this.chessboard = view.chessboard;
    this.moveInputState = null;
    this.fromSquare = null;
    this.toSquare = null;
    this.setMoveInputState(MOVE_INPUT_STATE.waitForInputStart);
  }
  moveInputStartedCallback(square) {
    const result = this.view.moveInputStartedCallback(square);
    if (result) {
      this.chessboard.state.moveInputProcess = Utils.createTask();
      this.chessboard.state.moveInputProcess.then((result2) => {
        if (this.moveInputState === MOVE_INPUT_STATE.waitForInputStart || this.moveInputState === MOVE_INPUT_STATE.moveDone) {
          this.view.moveInputFinishedCallback(this.fromSquare, this.toSquare, result2);
        }
      });
    }
    return result;
  }
  movingOverSquareCallback(fromSquare, toSquare) {
    this.view.movingOverSquareCallback(fromSquare, toSquare);
  }
  validateMoveInputCallback(fromSquare, toSquare) {
    const result = this.view.validateMoveInputCallback(fromSquare, toSquare);
    this.chessboard.state.moveInputProcess.resolve(result);
    return result;
  }
  moveInputCanceledCallback(fromSquare, toSquare, reason) {
    this.view.moveInputCanceledCallback(fromSquare, toSquare, reason);
    this.chessboard.state.moveInputProcess.resolve();
  }
  setMoveInputState(newState, params = undefined) {
    const prevState = this.moveInputState;
    this.moveInputState = newState;
    switch (newState) {
      case MOVE_INPUT_STATE.waitForInputStart:
        break;
      case MOVE_INPUT_STATE.pieceClickedThreshold:
        if (MOVE_INPUT_STATE.waitForInputStart !== prevState && MOVE_INPUT_STATE.clickTo !== prevState) {
          throw new Error("moveInputState");
        }
        if (this.pointerMoveListener) {
          removeEventListener(this.pointerMoveListener.type, this.pointerMoveListener);
          this.pointerMoveListener = null;
        }
        if (this.pointerUpListener) {
          removeEventListener(this.pointerUpListener.type, this.pointerUpListener);
          this.pointerUpListener = null;
        }
        this.fromSquare = params.square;
        this.toSquare = null;
        this.movedPiece = params.piece;
        this.startPoint = params.point;
        if (!this.pointerMoveListener && !this.pointerUpListener) {
          if (params.type === "mousedown") {
            this.pointerMoveListener = this.onPointerMove.bind(this);
            this.pointerMoveListener.type = "mousemove";
            addEventListener("mousemove", this.pointerMoveListener);
            this.pointerUpListener = this.onPointerUp.bind(this);
            this.pointerUpListener.type = "mouseup";
            addEventListener("mouseup", this.pointerUpListener);
          } else if (params.type === "touchstart") {
            this.pointerMoveListener = this.onPointerMove.bind(this);
            this.pointerMoveListener.type = "touchmove";
            addEventListener("touchmove", this.pointerMoveListener);
            this.pointerUpListener = this.onPointerUp.bind(this);
            this.pointerUpListener.type = "touchend";
            addEventListener("touchend", this.pointerUpListener);
          } else {
            throw Error("4b74af");
          }
          if (!this.contextMenuListener) {
            this.contextMenuListener = this.onContextMenu.bind(this);
            this.chessboard.view.svg.addEventListener("contextmenu", this.contextMenuListener);
          }
        } else {
          throw Error("94ad0c");
        }
        break;
      case MOVE_INPUT_STATE.clickTo:
        if (this.draggablePiece) {
          Svg.removeElement(this.draggablePiece);
          this.draggablePiece = null;
        }
        if (prevState === MOVE_INPUT_STATE.dragTo) {
          this.view.setPieceVisibility(params.square, true);
        }
        break;
      case MOVE_INPUT_STATE.secondClickThreshold:
        if (MOVE_INPUT_STATE.clickTo !== prevState) {
          throw new Error("moveInputState");
        }
        this.startPoint = params.point;
        break;
      case MOVE_INPUT_STATE.dragTo:
        if (MOVE_INPUT_STATE.pieceClickedThreshold !== prevState) {
          throw new Error("moveInputState");
        }
        if (this.view.chessboard.state.inputEnabled()) {
          this.view.setPieceVisibility(params.square, false);
          this.createDraggablePiece(params.piece);
        }
        break;
      case MOVE_INPUT_STATE.clickDragTo:
        if (MOVE_INPUT_STATE.secondClickThreshold !== prevState) {
          throw new Error("moveInputState");
        }
        if (this.view.chessboard.state.inputEnabled()) {
          this.view.setPieceVisibility(params.square, false);
          this.createDraggablePiece(params.piece);
        }
        break;
      case MOVE_INPUT_STATE.moveDone:
        if ([MOVE_INPUT_STATE.dragTo, MOVE_INPUT_STATE.clickTo, MOVE_INPUT_STATE.clickDragTo].indexOf(prevState) === -1) {
          throw new Error("moveInputState");
        }
        this.toSquare = params.square;
        if (this.toSquare && this.validateMoveInputCallback(this.fromSquare, this.toSquare)) {
          this.chessboard.movePiece(this.fromSquare, this.toSquare, prevState === MOVE_INPUT_STATE.clickTo).then(() => {
            if (prevState === MOVE_INPUT_STATE.clickTo) {
              this.view.setPieceVisibility(this.toSquare, true);
            }
            this.setMoveInputState(MOVE_INPUT_STATE.reset);
          });
        } else {
          this.view.setPieceVisibility(this.fromSquare, true);
          this.setMoveInputState(MOVE_INPUT_STATE.reset);
        }
        break;
      case MOVE_INPUT_STATE.reset:
        if (this.fromSquare && !this.toSquare && this.movedPiece) {
          this.chessboard.state.position.setPiece(this.fromSquare, this.movedPiece);
        }
        this.fromSquare = null;
        this.toSquare = null;
        this.movedPiece = null;
        if (this.draggablePiece) {
          Svg.removeElement(this.draggablePiece);
          this.draggablePiece = null;
        }
        if (this.pointerMoveListener) {
          removeEventListener(this.pointerMoveListener.type, this.pointerMoveListener);
          this.pointerMoveListener = null;
        }
        if (this.pointerUpListener) {
          removeEventListener(this.pointerUpListener.type, this.pointerUpListener);
          this.pointerUpListener = null;
        }
        if (this.contextMenuListener) {
          removeEventListener("contextmenu", this.contextMenuListener);
          this.contextMenuListener = null;
        }
        this.setMoveInputState(MOVE_INPUT_STATE.waitForInputStart);
        const hiddenPieces = this.view.piecesGroup.querySelectorAll("[visibility=hidden]");
        for (let i = 0;i < hiddenPieces.length; i++) {
          hiddenPieces[i].removeAttribute("visibility");
        }
        break;
      default:
        throw Error(`260b09: moveInputState ${newState}`);
    }
  }
  createDraggablePiece(pieceName) {
    if (this.draggablePiece) {
      throw Error("draggablePiece already exists");
    }
    this.draggablePiece = Svg.createSvg(document.body);
    this.draggablePiece.classList.add("cm-chessboard-draggable-piece");
    this.draggablePiece.setAttribute("width", this.view.squareWidth);
    this.draggablePiece.setAttribute("height", this.view.squareHeight);
    this.draggablePiece.setAttribute("style", "pointer-events: none");
    this.draggablePiece.name = pieceName;
    const spriteUrl = this.chessboard.props.assetsCache ? "" : this.view.getSpriteUrl();
    const piece = Svg.addElement(this.draggablePiece, "use", {
      href: `${spriteUrl}#${pieceName}`
    });
    const scaling = this.view.squareHeight / this.chessboard.props.style.pieces.tileSize;
    const transformScale = this.draggablePiece.createSVGTransform();
    transformScale.setScale(scaling, scaling);
    piece.transform.baseVal.appendItem(transformScale);
  }
  moveDraggablePiece(x, y) {
    this.draggablePiece.setAttribute("style", `pointer-events: none; position: absolute; left: ${x - this.view.squareHeight / 2}px; top: ${y - this.view.squareHeight / 2}px`);
  }
  onPointerDown(e) {
    if (!(e.type === "mousedown" && e.button === 0 || e.type === "touchstart")) {
      return;
    }
    const square = e.target.getAttribute("data-square");
    if (!square) {
      return;
    }
    const pieceName = this.chessboard.getPiece(square);
    let color;
    if (pieceName) {
      color = pieceName ? pieceName.substring(0, 1) : null;
      if (color === "w" && this.chessboard.state.inputWhiteEnabled || color === "b" && this.chessboard.state.inputBlackEnabled) {
        e.preventDefault();
      }
    }
    if (this.moveInputState !== MOVE_INPUT_STATE.waitForInputStart || this.chessboard.state.inputWhiteEnabled && color === "w" || this.chessboard.state.inputBlackEnabled && color === "b") {
      let point;
      if (e.type === "mousedown") {
        point = { x: e.clientX, y: e.clientY };
      } else if (e.type === "touchstart") {
        point = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      if (this.moveInputState === MOVE_INPUT_STATE.waitForInputStart && pieceName && this.moveInputStartedCallback(square)) {
        this.setMoveInputState(MOVE_INPUT_STATE.pieceClickedThreshold, {
          square,
          piece: pieceName,
          point,
          type: e.type
        });
      } else if (this.moveInputState === MOVE_INPUT_STATE.clickTo) {
        if (square === this.fromSquare) {
          this.setMoveInputState(MOVE_INPUT_STATE.secondClickThreshold, {
            square,
            piece: pieceName,
            point,
            type: e.type
          });
        } else {
          const pieceName2 = this.chessboard.getPiece(square);
          const pieceColor = pieceName2 ? pieceName2.substring(0, 1) : null;
          const startPieceName = this.chessboard.getPiece(this.fromSquare);
          const startPieceColor = startPieceName ? startPieceName.substring(0, 1) : null;
          if (color && startPieceColor === pieceColor) {
            const result = this.validateMoveInputCallback(this.fromSquare, square);
            if (!result) {
              this.moveInputCanceledCallback(this.fromSquare, square, MOVE_CANCELED_REASON.clickedAnotherPiece);
              if (this.moveInputStartedCallback(square)) {
                this.setMoveInputState(MOVE_INPUT_STATE.pieceClickedThreshold, {
                  square,
                  piece: pieceName2,
                  point,
                  type: e.type
                });
              } else {
                this.setMoveInputState(MOVE_INPUT_STATE.reset);
              }
            }
          } else {
            this.setMoveInputState(MOVE_INPUT_STATE.moveDone, { square });
          }
        }
      }
    }
  }
  onPointerMove(e) {
    let pageX, pageY, clientX, clientY, target;
    if (e.type === "mousemove") {
      clientX = e.clientX;
      clientY = e.clientY;
      pageX = e.pageX;
      pageY = e.pageY;
      target = e.target;
    } else if (e.type === "touchmove") {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      pageX = e.touches[0].pageX;
      pageY = e.touches[0].pageY;
      target = document.elementFromPoint(clientX, clientY);
    }
    if (this.moveInputState === MOVE_INPUT_STATE.pieceClickedThreshold || this.moveInputState === MOVE_INPUT_STATE.secondClickThreshold) {
      if (Math.abs(this.startPoint.x - clientX) > DRAG_THRESHOLD || Math.abs(this.startPoint.y - clientY) > DRAG_THRESHOLD) {
        if (this.moveInputState === MOVE_INPUT_STATE.secondClickThreshold) {
          this.setMoveInputState(MOVE_INPUT_STATE.clickDragTo, {
            square: this.fromSquare,
            piece: this.movedPiece
          });
        } else {
          this.setMoveInputState(MOVE_INPUT_STATE.dragTo, { square: this.fromSquare, piece: this.movedPiece });
        }
        if (this.view.chessboard.state.inputEnabled()) {
          this.moveDraggablePiece(pageX, pageY);
        }
      }
    } else if (this.moveInputState === MOVE_INPUT_STATE.dragTo || this.moveInputState === MOVE_INPUT_STATE.clickDragTo || this.moveInputState === MOVE_INPUT_STATE.clickTo) {
      if (target && target.getAttribute && target.parentElement === this.view.boardGroup) {
        const square = target.getAttribute("data-square");
        if (square !== this.fromSquare && square !== this.toSquare) {
          this.toSquare = square;
          this.movingOverSquareCallback(this.fromSquare, this.toSquare);
        } else if (square === this.fromSquare && this.toSquare !== null) {
          this.toSquare = null;
          this.movingOverSquareCallback(this.fromSquare, null);
        }
      } else if (this.toSquare !== null) {
        this.toSquare = null;
        this.movingOverSquareCallback(this.fromSquare, null);
      }
      if (this.view.chessboard.state.inputEnabled() && (this.moveInputState === MOVE_INPUT_STATE.dragTo || this.moveInputState === MOVE_INPUT_STATE.clickDragTo)) {
        this.moveDraggablePiece(pageX, pageY);
      }
    }
  }
  onPointerUp(e) {
    let target;
    if (e.type === "mouseup") {
      target = e.target;
    } else if (e.type === "touchend") {
      target = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
    if (target && target.getAttribute) {
      const square = target.getAttribute("data-square");
      if (square) {
        if (this.moveInputState === MOVE_INPUT_STATE.dragTo || this.moveInputState === MOVE_INPUT_STATE.clickDragTo) {
          if (this.fromSquare === square) {
            if (this.moveInputState === MOVE_INPUT_STATE.clickDragTo) {
              this.chessboard.state.position.setPiece(this.fromSquare, this.movedPiece);
              this.view.setPieceVisibility(this.fromSquare);
              this.moveInputCanceledCallback(square, null, MOVE_CANCELED_REASON.draggedBack);
              this.setMoveInputState(MOVE_INPUT_STATE.reset);
            } else {
              this.setMoveInputState(MOVE_INPUT_STATE.clickTo, { square });
            }
          } else {
            this.setMoveInputState(MOVE_INPUT_STATE.moveDone, { square });
          }
        } else if (this.moveInputState === MOVE_INPUT_STATE.pieceClickedThreshold) {
          this.setMoveInputState(MOVE_INPUT_STATE.clickTo, { square });
        } else if (this.moveInputState === MOVE_INPUT_STATE.secondClickThreshold) {
          this.setMoveInputState(MOVE_INPUT_STATE.reset);
          this.moveInputCanceledCallback(square, null, MOVE_CANCELED_REASON.secondClick);
        }
      } else {
        this.view.redrawPieces();
        const moveStartSquare = this.fromSquare;
        this.setMoveInputState(MOVE_INPUT_STATE.reset);
        this.moveInputCanceledCallback(moveStartSquare, null, MOVE_CANCELED_REASON.movedOutOfBoard);
      }
    } else {
      this.view.redrawPieces();
      this.setMoveInputState(MOVE_INPUT_STATE.reset);
    }
  }
  onContextMenu(e) {
    e.preventDefault();
    this.view.redrawPieces();
    this.setMoveInputState(MOVE_INPUT_STATE.reset);
    this.moveInputCanceledCallback(this.fromSquare, null, MOVE_CANCELED_REASON.secondaryClick);
  }
  isDragging() {
    return this.moveInputState === MOVE_INPUT_STATE.dragTo || this.moveInputState === MOVE_INPUT_STATE.clickDragTo;
  }
  destroy() {
    this.setMoveInputState(MOVE_INPUT_STATE.reset);
  }
}

// node_modules/cm-chessboard/src/view/ChessboardView.js
var COLOR2 = {
  white: "w",
  black: "b"
};
var INPUT_EVENT_TYPE = {
  moveInputStarted: "moveInputStarted",
  movingOverSquare: "movingOverSquare",
  validateMoveInput: "validateMoveInput",
  moveInputCanceled: "moveInputCanceled",
  moveInputFinished: "moveInputFinished"
};
var POINTER_EVENTS = {
  pointercancel: "pointercancel",
  pointerdown: "pointerdown",
  pointerenter: "pointerenter",
  pointerleave: "pointerleave",
  pointermove: "pointermove",
  pointerout: "pointerout",
  pointerover: "pointerover",
  pointerup: "pointerup"
};
var BORDER_TYPE = {
  none: "none",
  thin: "thin",
  frame: "frame"
};

class ChessboardView {
  constructor(chessboard) {
    this.chessboard = chessboard;
    this.visualMoveInput = new VisualMoveInput(this);
    if (chessboard.props.assetsCache) {
      this.cacheSpriteToDiv("cm-chessboard-sprite", this.getSpriteUrl());
    }
    this.container = document.createElement("div");
    this.chessboard.context.appendChild(this.container);
    if (chessboard.props.responsive) {
      if (typeof ResizeObserver !== "undefined") {
        this.resizeObserver = new ResizeObserver(() => {
          setTimeout(() => {
            this.handleResize();
          });
        });
        this.resizeObserver.observe(this.chessboard.context);
      } else {
        this.resizeListener = this.handleResize.bind(this);
        window.addEventListener("resize", this.resizeListener);
      }
    }
    this.positionsAnimationTask = Promise.resolve();
    this.pointerDownListener = this.pointerDownHandler.bind(this);
    this.container.addEventListener("mousedown", this.pointerDownListener);
    this.container.addEventListener("touchstart", this.pointerDownListener, { passive: false });
    this.createSvgAndGroups();
    this.handleResize();
  }
  pointerDownHandler(e) {
    this.visualMoveInput.onPointerDown(e);
  }
  destroy() {
    this.visualMoveInput.destroy();
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.chessboard.context);
    }
    if (this.resizeListener) {
      window.removeEventListener("resize", this.resizeListener);
    }
    this.chessboard.context.removeEventListener("mousedown", this.pointerDownListener);
    this.chessboard.context.removeEventListener("touchstart", this.pointerDownListener);
    Svg.removeElement(this.svg);
    this.container.remove();
  }
  cacheSpriteToDiv(wrapperId, url) {
    if (!document.getElementById(wrapperId)) {
      const wrapper = document.createElement("div");
      wrapper.style.transform = "scale(0)";
      wrapper.style.position = "absolute";
      wrapper.setAttribute("aria-hidden", "true");
      wrapper.id = wrapperId;
      document.body.appendChild(wrapper);
      const xhr = new XMLHttpRequest;
      xhr.open("GET", url, true);
      xhr.onload = function() {
        wrapper.insertAdjacentHTML("afterbegin", xhr.response);
      };
      xhr.send();
    }
  }
  createSvgAndGroups() {
    this.svg = Svg.createSvg(this.container);
    let cssClass = this.chessboard.props.style.cssClass ? this.chessboard.props.style.cssClass : "default";
    this.svg.setAttribute("class", "cm-chessboard border-type-" + this.chessboard.props.style.borderType + " " + cssClass);
    this.svg.setAttribute("role", "img");
    this.updateMetrics();
    this.boardGroup = Svg.addElement(this.svg, "g", { class: "board" });
    this.coordinatesGroup = Svg.addElement(this.svg, "g", { class: "coordinates", "aria-hidden": "true" });
    this.markersLayer = Svg.addElement(this.svg, "g", { class: "markers-layer" });
    this.piecesLayer = Svg.addElement(this.svg, "g", { class: "pieces-layer" });
    this.piecesGroup = Svg.addElement(this.piecesLayer, "g", { class: "pieces" });
    this.markersTopLayer = Svg.addElement(this.svg, "g", { class: "markers-top-layer" });
    this.interactiveTopLayer = Svg.addElement(this.svg, "g", { class: "interactive-top-layer" });
  }
  updateMetrics() {
    const piecesTileSize = this.chessboard.props.style.pieces.tileSize;
    this.width = this.container.clientWidth;
    this.height = this.container.clientWidth * (this.chessboard.props.style.aspectRatio || 1);
    if (this.chessboard.props.style.borderType === BORDER_TYPE.frame) {
      this.borderSize = this.width / 25;
    } else if (this.chessboard.props.style.borderType === BORDER_TYPE.thin) {
      this.borderSize = this.width / 320;
    } else {
      this.borderSize = 0;
    }
    this.innerWidth = this.width - 2 * this.borderSize;
    this.innerHeight = this.height - 2 * this.borderSize;
    this.squareWidth = this.innerWidth / 8;
    this.squareHeight = this.innerHeight / 8;
    this.scalingX = this.squareWidth / piecesTileSize;
    this.scalingY = this.squareHeight / piecesTileSize;
    this.pieceXTranslate = this.squareWidth / 2 - piecesTileSize * this.scalingY / 2;
  }
  handleResize() {
    this.container.style.width = this.chessboard.context.clientWidth + "px";
    this.container.style.height = this.chessboard.context.clientWidth * this.chessboard.props.style.aspectRatio + "px";
    if (this.container.clientWidth !== this.width || this.container.clientHeight !== this.height) {
      this.updateMetrics();
      this.redrawBoard();
      this.redrawPieces();
    }
    this.svg.setAttribute("width", "100%");
    this.svg.setAttribute("height", "100%");
  }
  redrawBoard() {
    this.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.beforeRedrawBoard);
    this.redrawSquares();
    this.drawCoordinates();
    this.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.afterRedrawBoard);
    this.visualizeInputState();
  }
  redrawSquares() {
    while (this.boardGroup.firstChild) {
      this.boardGroup.removeChild(this.boardGroup.lastChild);
    }
    let boardBorder = Svg.addElement(this.boardGroup, "rect", { width: this.width, height: this.height });
    boardBorder.setAttribute("class", "border");
    if (this.chessboard.props.style.borderType === BORDER_TYPE.frame) {
      const innerPos = this.borderSize;
      let borderInner = Svg.addElement(this.boardGroup, "rect", {
        x: innerPos,
        y: innerPos,
        width: this.width - innerPos * 2,
        height: this.height - innerPos * 2
      });
      borderInner.setAttribute("class", "border-inner");
    }
    for (let i = 0;i < 64; i++) {
      const index = this.chessboard.state.orientation === COLOR2.white ? i : 63 - i;
      const squareColor = (9 * index & 8) === 0 ? "black" : "white";
      const fieldClass = `square ${squareColor}`;
      const point = this.squareToPoint(Position.indexToSquare(index));
      const squareRect = Svg.addElement(this.boardGroup, "rect", {
        x: point.x,
        y: point.y,
        width: this.squareWidth,
        height: this.squareHeight
      });
      squareRect.setAttribute("class", fieldClass);
      squareRect.setAttribute("data-square", Position.indexToSquare(index));
    }
  }
  drawCoordinates() {
    if (!this.chessboard.props.style.showCoordinates) {
      return;
    }
    while (this.coordinatesGroup.firstChild) {
      this.coordinatesGroup.removeChild(this.coordinatesGroup.lastChild);
    }
    const inline = this.chessboard.props.style.borderType !== BORDER_TYPE.frame;
    for (let file3 = 0;file3 < 8; file3++) {
      let x = this.borderSize + (17 + this.chessboard.props.style.pieces.tileSize * file3) * this.scalingX;
      let y = this.height - this.scalingY * 3.5;
      let cssClass = "coordinate file";
      if (inline) {
        x = x + this.scalingX * 15.5;
        cssClass += file3 % 2 ? " white" : " black";
      }
      const textElement = Svg.addElement(this.coordinatesGroup, "text", {
        class: cssClass,
        x,
        y,
        style: `font-size: ${this.scalingY * 10}px`
      });
      if (this.chessboard.state.orientation === COLOR2.white) {
        textElement.textContent = String.fromCharCode(97 + file3);
      } else {
        textElement.textContent = String.fromCharCode(104 - file3);
      }
    }
    for (let rank3 = 0;rank3 < 8; rank3++) {
      let x = this.borderSize / 3.7;
      let y = this.borderSize + 25 * this.scalingY + rank3 * this.squareHeight;
      let cssClass = "coordinate rank";
      if (inline) {
        cssClass += rank3 % 2 ? " black" : " white";
        if (this.chessboard.props.style.borderType === BORDER_TYPE.frame) {
          x = x + this.scalingX * 10;
          y = y - this.scalingY * 15;
        } else {
          x = x + this.scalingX * 2;
          y = y - this.scalingY * 15;
        }
      }
      const textElement = Svg.addElement(this.coordinatesGroup, "text", {
        class: cssClass,
        x,
        y,
        style: `font-size: ${this.scalingY * 10}px`
      });
      if (this.chessboard.state.orientation === COLOR2.white) {
        textElement.textContent = "" + (8 - rank3);
      } else {
        textElement.textContent = "" + (1 + rank3);
      }
    }
  }
  redrawPieces(squares = this.chessboard.state.position.squares) {
    const childNodes = Array.from(this.piecesGroup.childNodes);
    const isDragging = this.visualMoveInput.isDragging();
    for (let i = 0;i < 64; i++) {
      const pieceName = squares[i];
      if (pieceName) {
        const square = Position.indexToSquare(i);
        this.drawPieceOnSquare(square, pieceName, isDragging && square === this.visualMoveInput.fromSquare);
      }
    }
    for (const childNode of childNodes) {
      this.piecesGroup.removeChild(childNode);
    }
  }
  drawPiece(parentGroup, pieceName, point) {
    const pieceGroup = Svg.addElement(parentGroup, "g", {});
    pieceGroup.setAttribute("data-piece", pieceName);
    const transform = this.svg.createSVGTransform();
    transform.setTranslate(point.x, point.y);
    pieceGroup.transform.baseVal.appendItem(transform);
    const spriteUrl = this.chessboard.props.assetsCache ? "" : this.getSpriteUrl();
    const pieceUse = Svg.addElement(pieceGroup, "use", {
      href: `${spriteUrl}#${pieceName}`,
      class: "piece"
    });
    const transformScale = this.svg.createSVGTransform();
    transformScale.setScale(this.scalingY, this.scalingY);
    pieceUse.transform.baseVal.appendItem(transformScale);
    return pieceGroup;
  }
  drawPieceOnSquare(square, pieceName, hidden = false) {
    const pieceGroup = Svg.addElement(this.piecesGroup, "g", {});
    pieceGroup.setAttribute("data-piece", pieceName);
    pieceGroup.setAttribute("data-square", square);
    if (hidden) {
      pieceGroup.setAttribute("visibility", "hidden");
    }
    const point = this.squareToPoint(square);
    const transform = this.svg.createSVGTransform();
    transform.setTranslate(point.x, point.y);
    pieceGroup.transform.baseVal.appendItem(transform);
    const spriteUrl = this.chessboard.props.assetsCache ? "" : this.getSpriteUrl();
    const pieceUse = Svg.addElement(pieceGroup, "use", {
      href: `${spriteUrl}#${pieceName}`,
      class: "piece"
    });
    const transformTranslate = this.svg.createSVGTransform();
    transformTranslate.setTranslate(this.pieceXTranslate, 0);
    pieceUse.transform.baseVal.appendItem(transformTranslate);
    const transformScale = this.svg.createSVGTransform();
    transformScale.setScale(this.scalingY, this.scalingY);
    pieceUse.transform.baseVal.appendItem(transformScale);
    return pieceGroup;
  }
  setPieceVisibility(square, visible = true) {
    const piece = this.getPieceElement(square);
    if (piece) {
      if (visible) {
        piece.setAttribute("visibility", "visible");
      } else {
        piece.setAttribute("visibility", "hidden");
      }
    } else {
      console.warn("no piece on", square);
    }
  }
  getPieceElement(square) {
    if (!square || square.length < 2) {
      console.warn("invalid square", square);
      return null;
    }
    const piece = this.piecesGroup.querySelector(`g[data-square='${square}']`);
    if (!piece) {
      console.warn("no piece on", square);
      return null;
    }
    return piece;
  }
  enableMoveInput(eventHandler, color = null) {
    if (this.chessboard.state.moveInputCallback) {
      throw Error("moveInput already enabled");
    }
    if (color === COLOR2.white) {
      this.chessboard.state.inputWhiteEnabled = true;
    } else if (color === COLOR2.black) {
      this.chessboard.state.inputBlackEnabled = true;
    } else {
      this.chessboard.state.inputWhiteEnabled = true;
      this.chessboard.state.inputBlackEnabled = true;
    }
    this.chessboard.state.moveInputCallback = eventHandler;
    this.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.moveInputToggled, { enabled: true, color });
    this.visualizeInputState();
  }
  disableMoveInput() {
    this.chessboard.state.inputWhiteEnabled = false;
    this.chessboard.state.inputBlackEnabled = false;
    this.chessboard.state.moveInputCallback = null;
    this.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.moveInputToggled, { enabled: false });
    this.visualizeInputState();
  }
  moveInputStartedCallback(square) {
    const data = {
      chessboard: this.chessboard,
      type: INPUT_EVENT_TYPE.moveInputStarted,
      square,
      squareFrom: square,
      piece: this.chessboard.getPiece(square)
    };
    if (this.chessboard.state.moveInputCallback) {
      data.moveInputCallbackResult = this.chessboard.state.moveInputCallback(data);
    }
    this.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.moveInput, data);
    return data.moveInputCallbackResult;
  }
  movingOverSquareCallback(squareFrom, squareTo) {
    const data = {
      chessboard: this.chessboard,
      type: INPUT_EVENT_TYPE.movingOverSquare,
      squareFrom,
      squareTo,
      piece: this.chessboard.getPiece(squareFrom)
    };
    if (this.chessboard.state.moveInputCallback) {
      data.moveInputCallbackResult = this.chessboard.state.moveInputCallback(data);
    }
    this.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.moveInput, data);
  }
  validateMoveInputCallback(squareFrom, squareTo) {
    const data = {
      chessboard: this.chessboard,
      type: INPUT_EVENT_TYPE.validateMoveInput,
      squareFrom,
      squareTo,
      piece: this.chessboard.getPiece(squareFrom)
    };
    if (this.chessboard.state.moveInputCallback) {
      data.moveInputCallbackResult = this.chessboard.state.moveInputCallback(data);
    }
    this.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.moveInput, data);
    return data.moveInputCallbackResult;
  }
  moveInputCanceledCallback(squareFrom, squareTo, reason) {
    const data = {
      chessboard: this.chessboard,
      type: INPUT_EVENT_TYPE.moveInputCanceled,
      reason,
      squareFrom,
      squareTo
    };
    if (this.chessboard.state.moveInputCallback) {
      this.chessboard.state.moveInputCallback(data);
    }
    this.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.moveInput, data);
  }
  moveInputFinishedCallback(squareFrom, squareTo, legalMove) {
    const data = {
      chessboard: this.chessboard,
      type: INPUT_EVENT_TYPE.moveInputFinished,
      squareFrom,
      squareTo,
      legalMove
    };
    if (this.chessboard.state.moveInputCallback) {
      this.chessboard.state.moveInputCallback(data);
    }
    this.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.moveInput, data);
  }
  visualizeInputState() {
    if (this.chessboard.state) {
      if (this.chessboard.state.inputWhiteEnabled || this.chessboard.state.inputBlackEnabled) {
        this.boardGroup.setAttribute("class", "board input-enabled");
      } else {
        this.boardGroup.setAttribute("class", "board");
      }
    }
  }
  indexToPoint(index) {
    let x, y;
    if (this.chessboard.state.orientation === COLOR2.white) {
      x = this.borderSize + index % 8 * this.squareWidth;
      y = this.borderSize + (7 - Math.floor(index / 8)) * this.squareHeight;
    } else {
      x = this.borderSize + (7 - index % 8) * this.squareWidth;
      y = this.borderSize + Math.floor(index / 8) * this.squareHeight;
    }
    return { x, y };
  }
  squareToPoint(square) {
    const index = Position.squareToIndex(square);
    return this.indexToPoint(index);
  }
  getSpriteUrl() {
    if (Utils.isAbsoluteUrl(this.chessboard.props.style.pieces.file)) {
      return this.chessboard.props.style.pieces.file;
    } else {
      return this.chessboard.props.assetsUrl + this.chessboard.props.style.pieces.file;
    }
  }
}

// node_modules/cm-chessboard/src/Chessboard.js
var PIECE = {
  wp: "wp",
  wb: "wb",
  wn: "wn",
  wr: "wr",
  wq: "wq",
  wk: "wk",
  bp: "bp",
  bb: "bb",
  bn: "bn",
  br: "br",
  bq: "bq",
  bk: "bk"
};
var PIECES_FILE_TYPE = {
  svgSprite: "svgSprite"
};
class Chessboard {
  constructor(context, props = {}) {
    if (!context) {
      throw new Error("container element is " + context);
    }
    this.context = context;
    this.id = (Math.random() + 1).toString(36).substring(2, 8);
    this.extensions = [];
    this.props = {
      position: FEN2.empty,
      orientation: COLOR2.white,
      responsive: true,
      assetsUrl: "./assets/",
      assetsCache: true,
      style: {
        cssClass: "default",
        showCoordinates: true,
        borderType: BORDER_TYPE.none,
        aspectRatio: 1,
        pieces: {
          type: PIECES_FILE_TYPE.svgSprite,
          file: "pieces/standard.svg",
          tileSize: 40
        },
        animationDuration: 300
      },
      extensions: []
    };
    Utils.mergeObjects(this.props, props);
    this.state = new ChessboardState;
    this.view = new ChessboardView(this);
    this.positionAnimationsQueue = new PositionAnimationsQueue(this);
    this.state.orientation = this.props.orientation;
    for (const extensionData of this.props.extensions) {
      this.addExtension(extensionData.class, extensionData.props);
    }
    this.view.redrawBoard();
    this.state.position = new Position(this.props.position);
    this.view.redrawPieces();
    this.state.invokeExtensionPoints(EXTENSION_POINT.positionChanged);
    this.initialized = Promise.resolve();
  }
  async setPiece(square, piece, animated = false) {
    const positionFrom = this.state.position.clone();
    this.state.position.setPiece(square, piece);
    this.state.invokeExtensionPoints(EXTENSION_POINT.positionChanged);
    return this.positionAnimationsQueue.enqueuePositionChange(positionFrom, this.state.position.clone(), animated);
  }
  async movePiece(squareFrom, squareTo, animated = false) {
    const positionFrom = this.state.position.clone();
    this.state.position.movePiece(squareFrom, squareTo);
    this.state.invokeExtensionPoints(EXTENSION_POINT.positionChanged);
    return this.positionAnimationsQueue.enqueuePositionChange(positionFrom, this.state.position.clone(), animated);
  }
  async setPosition(fen, animated = false) {
    const positionFrom = this.state.position.clone();
    const positionTo = new Position(fen);
    if (positionFrom.getFen() !== positionTo.getFen()) {
      this.state.position.setFen(fen);
      this.state.invokeExtensionPoints(EXTENSION_POINT.positionChanged);
    }
    return this.positionAnimationsQueue.enqueuePositionChange(positionFrom, this.state.position.clone(), animated);
  }
  async setOrientation(color, animated = false) {
    const position = this.state.position.clone();
    if (this.boardTurning) {
      console.warn("setOrientation is only once in queue allowed");
      return;
    }
    this.boardTurning = true;
    return this.positionAnimationsQueue.enqueueTurnBoard(position, color, animated).then(() => {
      this.boardTurning = false;
      this.state.invokeExtensionPoints(EXTENSION_POINT.boardChanged);
    });
  }
  getPiece(square) {
    return this.state.position.getPiece(square);
  }
  getPosition() {
    return this.state.position.getFen();
  }
  getOrientation() {
    return this.state.orientation;
  }
  enableMoveInput(eventHandler, color = undefined) {
    this.view.enableMoveInput(eventHandler, color);
  }
  disableMoveInput() {
    this.view.disableMoveInput();
  }
  isMoveInputEnabled() {
    return this.state.inputWhiteEnabled || this.state.inputBlackEnabled;
  }
  enableSquareSelect(eventType = POINTER_EVENTS.pointerdown, eventHandler) {
    if (!this.squareSelectListener) {
      this.squareSelectListener = function(e) {
        const square = e.target.getAttribute("data-square");
        eventHandler({
          eventType: e.type,
          event: e,
          chessboard: this,
          square
        });
      };
    }
    this.context.addEventListener(eventType, this.squareSelectListener);
    this.state.squareSelectEnabled = true;
    this.view.visualizeInputState();
  }
  disableSquareSelect(eventType) {
    this.context.removeEventListener(eventType, this.squareSelectListener);
    this.squareSelectListener = undefined;
    this.state.squareSelectEnabled = false;
    this.view.visualizeInputState();
  }
  isSquareSelectEnabled() {
    return this.state.squareSelectEnabled;
  }
  addExtension(extensionClass, props) {
    if (this.getExtension(extensionClass)) {
      throw Error('extension "' + extensionClass.name + '" already added');
    }
    this.extensions.push(new extensionClass(this, props));
  }
  getExtension(extensionClass) {
    for (const extension of this.extensions) {
      if (extension instanceof extensionClass) {
        return extension;
      }
    }
    return null;
  }
  destroy() {
    this.state.invokeExtensionPoints(EXTENSION_POINT.destroy);
    this.positionAnimationsQueue.destroy();
    this.view.destroy();
    this.view = undefined;
    this.state = undefined;
  }
}

// node_modules/cm-web-modules/src/i18n/I18n.js
class I18n {
  constructor(props = {}) {
    this.props = {
      locale: null,
      fallbackLang: "en"
    };
    Object.assign(this.props, props);
    this.locale = this.props.locale;
    if (!this.locale) {
      const htmlLang = document.documentElement.getAttribute("lang");
      if (htmlLang) {
        this.locale = htmlLang;
      }
      if (!this.locale) {
        this.locale = navigator.language;
      }
    }
    this.lang = this.locale.substr(0, 2);
    this.translations = {};
  }
  load(dictionary) {
    let fetchPromises = [];
    for (const lang in dictionary) {
      if (dictionary.hasOwnProperty(lang)) {
        if (!this.translations[lang]) {
          this.translations[lang] = {};
        }
        const translations = dictionary[lang];
        if (typeof translations === "string") {
          fetchPromises.push(new Promise((resolve) => {
            fetch(translations).then((res) => res.json()).then((json) => {
              Object.assign(this.translations[lang], json);
              resolve();
            }).catch((err) => {
              throw err;
            });
          }));
        } else {
          Object.assign(this.translations[lang], translations);
        }
      }
    }
    if (fetchPromises.length > 0) {
      return Promise.all(fetchPromises);
    } else {
      return Promise.resolve();
    }
  }
  t(code, ...values) {
    let translation;
    if (this.translations[this.locale] && this.translations[this.locale][code]) {
      translation = this.translations[this.locale][code];
    } else if (this.translations[this.lang] && this.translations[this.lang][code]) {
      translation = this.translations[this.lang][code];
    } else if (this.translations[this.props.fallbackLang][code]) {
      translation = this.translations[this.props.fallbackLang][code];
    } else {
      console.warn("Error, no translation found for locale:", this.locale, ", lang: ", this.lang, ", code: ", code);
      return "?" + code + "?";
    }
    if (values && values.length > 0) {
      let i = 0;
      for (const value of values) {
        translation = translation.replace(new RegExp("\\$" + i, "g"), value);
        i++;
      }
    }
    return translation;
  }
}

// node_modules/cm-web-modules/src/message-broker/MessageBroker.js
class MessageBroker {
  constructor() {
    this.topics = [];
  }
  subscribe(topic, callback) {
    if (!topic) {
      const message = "subscribe: topic needed";
      console.error(message, callback);
      throw new Error(message);
    }
    if (!callback) {
      const message = "subscribe: callback needed";
      console.error(message, topic);
      throw new Error(message);
    }
    if (this.topics[topic] === undefined) {
      this.topics[topic] = [];
    }
    if (this.topics[topic].indexOf(callback) === -1) {
      this.topics[topic].push(callback);
    }
  }
  unsubscribe(topic = null, callback = null) {
    if (callback !== null && topic !== null) {
      this.topics[topic].splice(this.topics[topic].indexOf(callback), 1);
    } else if (callback === null && topic !== null) {
      this.topics[topic] = [];
    } else if (topic === null && callback !== null) {
      for (const topicName in this.topics) {
        const topic2 = this.topics[topicName];
        for (const topicSubscriber of topic2) {
          if (topicSubscriber === callback) {
            this.unsubscribe(topicName, callback);
          }
        }
      }
    } else {
      this.topics = [];
    }
    if (topic !== null) {
      if (this.topics[topic] && this.topics[topic].length === 0) {
        delete this.topics[topic];
      }
    }
  }
  publish(topic, object = {}, async = true) {
    if (!topic) {
      const message = "publish: topic needed";
      console.error(message, object);
      throw new Error(message);
    }
    const breadcrumbArray = topic.split("/");
    let wildcardTopic = "";
    for (const topicPart of breadcrumbArray) {
      this.callback(wildcardTopic + "#", topic, object, async);
      wildcardTopic += topicPart + "/";
    }
    this.callback(topic, topic, object, async);
  }
  callback(wildcardTopic, topic, object = {}, async = true) {
    if (this.topics[wildcardTopic]) {
      this.topics[wildcardTopic].forEach(function(callback) {
        if (async) {
          setTimeout(function() {
            callback(object, topic);
          });
        } else {
          return callback(object, topic);
        }
      });
    }
  }
}

// node_modules/cm-chessboard/src/extensions/accessibility/I18n.js
var piecesTranslations = {
  en: {
    colors: {
      w: "w",
      b: "b"
    },
    colors_long: {
      w: "White",
      b: "Black"
    },
    pieces: {
      p: "p",
      n: "n",
      b: "b",
      r: "r",
      q: "q",
      k: "k"
    },
    pieces_long: {
      p: "Pawn",
      n: "Knight",
      b: "Bishop",
      r: "Rook",
      q: "Queen",
      k: "King"
    }
  },
  de: {
    colors: {
      w: "w",
      b: "s"
    },
    colors_long: {
      w: "Weiß",
      b: "Schwarz"
    },
    pieces: {
      p: "b",
      n: "s",
      b: "l",
      r: "t",
      q: "d",
      k: "k"
    },
    pieces_long: {
      p: "Bauer",
      n: "Springer",
      b: "Läufer",
      r: "Turm",
      q: "Dame",
      k: "König"
    }
  }
};
function renderPieceTitle(lang, name, color = undefined) {
  let title = piecesTranslations[lang].pieces_long[name];
  if (color) {
    title += " " + piecesTranslations[lang].colors_long[color];
  }
  return title;
}

// node_modules/cm-web-modules/src/observe/Observe.js
var collectionMutationMethods = {
  array: ["copyWithin", "fill", "pop", "push", "reverse", "shift", "unshift", "sort", "splice"],
  set: ["add", "clear", "delete"],
  map: ["set", "clear", "delete"]
};
var registry = new Map;

class Observe {
  static preFunction(object, functionName, callback) {
    if (Array.isArray(functionName)) {
      let removes = [];
      functionName.forEach((functionNameItem) => {
        removes.push(Observe.preFunction(object, functionNameItem, callback));
      });
      return {
        remove: () => {
          removes.forEach((remove) => {
            remove.remove();
          });
        }
      };
    }
    if (!registry.has(object)) {
      registry.set(object, {});
    }
    const registryObject = registry.get(object);
    if (registryObject.observedPreFunctions === undefined) {
      registryObject.observedPreFunctions = new Map;
    }
    if (!registryObject.observedPreFunctions.has(functionName)) {
      registryObject.observedPreFunctions.set(functionName, new Set);
      const originalMethod = object[functionName];
      object[functionName] = function() {
        let functionArguments = arguments;
        registryObject.observedPreFunctions.get(functionName).forEach(function(callback2) {
          const params = { functionName, arguments: functionArguments };
          const callbackReturn = callback2(params);
          if (callbackReturn) {
            functionArguments = callbackReturn;
          }
        });
        return originalMethod.apply(object, functionArguments);
      };
    }
    registryObject.observedPreFunctions.get(functionName).add(callback);
    return {
      remove: () => {
        registryObject.observedPreFunctions.get(functionName).delete(callback);
      }
    };
  }
  static postFunction(object, functionName, callback) {
    if (Array.isArray(functionName)) {
      let removes = [];
      functionName.forEach((functionNameItem) => {
        removes.push(Observe.postFunction(object, functionNameItem, callback));
      });
      return {
        remove: () => {
          removes.forEach((remove) => {
            remove.remove();
          });
        }
      };
    }
    if (!registry.has(object)) {
      registry.set(object, {});
    }
    const registryObject = registry.get(object);
    if (registryObject.observedPostFunctions === undefined) {
      registryObject.observedPostFunctions = new Map;
    }
    if (!registryObject.observedPostFunctions.has(functionName)) {
      registryObject.observedPostFunctions.set(functionName, new Set);
      const originalMethod = object[functionName];
      object[functionName] = function() {
        let returnValue = originalMethod.apply(object, arguments);
        const functionArguments = arguments;
        registryObject.observedPostFunctions.get(functionName).forEach(function(callback2) {
          const params = { functionName, arguments: functionArguments, returnValue };
          callback2(params);
          returnValue = params.returnValue;
        });
        return returnValue;
      };
    }
    registryObject.observedPostFunctions.get(functionName).add(callback);
    return {
      remove: () => {
        registryObject.observedPostFunctions.get(functionName).delete(callback);
      }
    };
  }
  static property(object, propertyName, callback) {
    if (Array.isArray(propertyName)) {
      let removes = [];
      propertyName.forEach((propertyNameItem) => {
        removes.push(Observe.property(object, propertyNameItem, callback));
      });
      return {
        remove: () => {
          removes.forEach((remove) => {
            remove.remove();
          });
        }
      };
    }
    if (!object.hasOwnProperty(propertyName)) {
      console.error("Observe.property", object, "missing property: " + propertyName);
      return;
    }
    let isCollection = false;
    if (!registry.has(object)) {
      registry.set(object, {});
    }
    const registryObject = registry.get(object);
    if (registryObject.observedProperties === undefined) {
      registryObject.observedProperties = new Map;
    }
    if (!registryObject.observedProperties.has(propertyName)) {
      registryObject.observedProperties.set(propertyName, {
        value: object[propertyName],
        observers: new Set
      });
      const property = object[propertyName];
      let mutationMethods = [];
      if (property instanceof Array) {
        isCollection = true;
        mutationMethods = collectionMutationMethods.array;
      } else if (property instanceof Set || property instanceof WeakSet) {
        isCollection = true;
        mutationMethods = collectionMutationMethods.set;
      } else if (property instanceof Map || property instanceof WeakMap) {
        isCollection = true;
        mutationMethods = collectionMutationMethods.map;
      }
      if (delete object[propertyName]) {
        Object.defineProperty(object, propertyName, {
          get: function() {
            return registryObject.observedProperties.get(propertyName).value;
          },
          set: function(newValue) {
            const oldValue = registryObject.observedProperties.get(propertyName).value;
            if (newValue !== oldValue) {
              registryObject.observedProperties.get(propertyName).value = newValue;
              registryObject.observedProperties.get(propertyName).observers.forEach(function(callback2) {
                const params = { propertyName, oldValue, newValue };
                callback2(params);
              });
            }
          },
          enumerable: true,
          configurable: true
        });
        if (isCollection) {
          mutationMethods.forEach(function(methodName) {
            object[propertyName][methodName] = function() {
              object[propertyName].constructor.prototype[methodName].apply(this, arguments);
              const methodArguments = arguments;
              registryObject.observedProperties.get(propertyName).observers.forEach(function(observer) {
                const params = {
                  propertyName,
                  methodName,
                  arguments: methodArguments,
                  newValue: object[propertyName]
                };
                observer(params);
              });
            };
          });
        }
      } else {
        console.error("Error: Observe.property", propertyName, "failed");
      }
    }
    registryObject.observedProperties.get(propertyName).observers.add(callback);
    return {
      remove: () => {
        registryObject.observedProperties.get(propertyName).observers.delete(callback);
      }
    };
  }
}

// node_modules/chess-console/src/ChessConsoleState.js
class ChessConsoleState {
  constructor(props) {
    this.chess = new Chess3;
    this.orientation = props.playerColor || COLOR2.white;
    this.plyViewed = undefined;
  }
  observeChess(callback) {
    const chessManipulationMethods = [
      "move",
      "clear",
      "load",
      "loadPgn",
      "put",
      "remove",
      "reset",
      "undo"
    ];
    chessManipulationMethods.forEach((methodName) => {
      Observe.postFunction(this.chess, methodName, (params) => {
        callback(params);
      });
    });
  }
}

// node_modules/cm-web-modules/src/utils/DomUtils.js
class DomUtils {
  static onDocumentReady(callback) {
    this.documentReady(callback);
  }
  static documentReady(callback) {
    document.addEventListener("DOMContentLoaded", callback);
    if (document.readyState === "interactive" || document.readyState === "complete") {
      document.removeEventListener("DOMContentLoaded", callback);
      callback();
    }
  }
  static onDomNodeRemoved(elementToWatch, callback, parent = document.querySelector("body")) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === "childList") {
          if (mutation.removedNodes.length > 0 && mutation.removedNodes[0] === elementToWatch) {
            callback(elementToWatch);
          }
        }
      });
    });
    observer.observe(parent, { childList: true });
  }
  static isElementVisible(element) {
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
  }
  static isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  }
  static getFormInputValues(context) {
    const inputs = context.querySelectorAll("input,select");
    const values = {};
    inputs.forEach((input) => {
      if (input.type === "checkbox") {
        values[input.id] = !!input.checked;
      } else {
        values[input.id] = input.value;
      }
    });
    return values;
  }
  static isBrowserDarkMode() {
    return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }
  static browserSupportsPreferredColorScheme() {
    return window.matchMedia && (window.matchMedia("(prefers-color-scheme: dark)").matches || window.matchMedia("(prefers-color-scheme: light)").matches);
  }
  static loadJs(src) {
    const element = document.createElement("script");
    element.setAttribute("type", "text/javascript");
    element.setAttribute("src", src);
    document.getElementsByTagName("head")[0].appendChild(element);
  }
  static loadCss(src) {
    const element = document.createElement("link");
    element.setAttribute("rel", "stylesheet");
    element.setAttribute("type", "text/css");
    element.setAttribute("href", src);
    document.getElementsByTagName("head")[0].appendChild(element);
  }
  static setCustomProperty(name, value, element = document.documentElement) {
    element.style.setProperty("--" + name, value.trim());
  }
  static getCustomProperty(name, element = document.documentElement) {
    return getComputedStyle(element).getPropertyValue("--" + name).trim();
  }
  static createElement(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstChild;
  }
  static removeElement(element) {
    element.parentNode.removeChild(element);
  }
  static clearElement(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
  static insertAfter(newChild, refChild) {
    refChild.parentNode.insertBefore(newChild, refChild.nextSibling);
  }
  static delegate(element, eventName, selector, handler) {
    const eventListener = function(event) {
      let target = event.target;
      while (target && target !== this) {
        if (target.matches(selector)) {
          handler.call(target, event);
        }
        target = target.parentNode;
      }
    };
    element.addEventListener(eventName, eventListener);
    return {
      remove: function() {
        element.removeEventListener(eventName, eventListener);
      }
    };
  }
  static isExternalLink(link) {
    return link.hostname !== window.location.hostname;
  }
  static openExternalLinksBlank(context = document) {
    const links = context.links;
    for (let i = 0;i < links.length; i++) {
      if (this.isExternalLink(links[i]) && links[i].target !== "_self") {
        links[i].target = "_blank";
      }
    }
  }
  static disableButtonsOnSubmit() {
    const buttons = document.querySelectorAll("button[data-disable-on-submit]");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        button.setAttribute("disabled", "disabled");
      });
    });
  }
  static autoBindDataEvents(controller, props = {}) {
    const context = controller.context;
    const eventListenerElements = context.querySelectorAll("[data-event]");
    this.props = {
      debug: false,
      ...props
    };
    if (this.props.debug) {
      console.log("eventListenerElements", context, eventListenerElements);
    }
    for (const eventListenerElement of eventListenerElements) {
      const eventName = eventListenerElement.dataset.event;
      const action = eventListenerElement.dataset.action;
      const delegate = eventListenerElement.dataset.delegate;
      if (!action) {
        console.error("no action defined", eventListenerElement);
      }
      if (!controller.actions[action]) {
        console.error(context, 'You have to add the action "' + action + '" to your component.');
      }
      if (delegate) {
        DomUtils.delegate(eventListenerElement, eventName, delegate, (target) => {
          if (this.props.debug) {
            console.log("delegate", action, target);
          }
          controller.actions[action](target);
        });
      } else {
        if (this.props.debug) {
          console.log("addEventListener", eventName, action);
        }
        if (!controller.actions[action]) {
          console.error("no action", '"' + action + '"', "is defined");
        } else {
          eventListenerElement.addEventListener(eventName, controller.actions[action].bind(controller));
        }
      }
    }
  }
}

// node_modules/chess-console/src/utils/html.js
function html(strings, ...values) {
  return strings.reduce((result, str, i) => {
    let value = values[i] ?? "";
    if (Array.isArray(value)) {
      value = value.join("");
    }
    return result + str + value;
  }, "");
}

// node_modules/chess-console/src/ChessConsole.js
var CONSOLE_MESSAGE_TOPICS = {
  newGame: "game/new",
  initGame: "game/init",
  gameOver: "game/over",
  moveRequest: "game/moveRequest",
  legalMove: "game/move/legal",
  illegalMove: "game/move/illegal",
  moveUndone: "game/move/undone",
  load: "game/load"
};

class ChessConsole {
  constructor(context, player, opponent, props = {}, state = new ChessConsoleState(props)) {
    this.context = context;
    this.state = state;
    this.props = {
      locale: navigator.language,
      playerColor: COLOR2.white,
      gameVariant: GAME_VARIANT.standard,
      pgn: undefined,
      accessible: false
    };
    if (!this.props.figures) {
      this.props.figures = {
        Rw: '<i class="fas fa-fw fa-chess-rook fa-figure-white"></i>',
        Nw: '<i class="fas fa-fw fa-chess-knight fa-figure-white"></i>',
        Bw: '<i class="fas fa-fw fa-chess-bishop fa-figure-white"></i>',
        Qw: '<i class="fas fa-fw fa-chess-queen fa-figure-white"></i>',
        Kw: '<i class="fas fa-fw fa-chess-king fa-figure-white"></i>',
        Pw: '<i class="fas fa-fw fa-chess-pawn fa-figure-white"></i>',
        Rb: '<i class="fas fa-fw fa-chess-rook fa-figure-black"></i>',
        Nb: '<i class="fas fa-fw fa-chess-knight fa-figure-black"></i>',
        Bb: '<i class="fas fa-fw fa-chess-bishop fa-figure-black"></i>',
        Qb: '<i class="fas fa-fw fa-chess-queen fa-figure-black"></i>',
        Kb: '<i class="fas fa-fw fa-chess-king fa-figure-black"></i>',
        Pb: '<i class="fas fa-fw fa-chess-pawn fa-figure-black"></i>'
      };
    }
    const layout = {
      center: "col-xl-7 order-xl-2 col-lg-8 order-lg-1 order-md-1 col-md-12",
      right: "col-xl-3 order-xl-3 col-lg-4 order-lg-2 col-md-8 order-md-3",
      left: "col-xl-2 order-xl-1 order-lg-3 col-lg-12 col-md-4 order-md-2"
    };
    this.initialized = new Promise((resolve) => {
      this.i18n = new I18n({ locale: props.locale });
      this.i18n.load({
        de: {
          ok: "OK",
          cancel: "Abbrechen"
        },
        en: {
          ok: "OK",
          cancel: "Cancel"
        }
      }).then(() => {
        this.i18n.load(piecesTranslations).then(() => {
          resolve(this);
        });
      });
    });
    if (!this.props.template) {
      this.props.template = html`
                <div class="row chess-console">
                    <div class="chess-console-center ${layout.center}">
                        <div class="chess-console-board"></div>
                    </div>
                    <div class="chess-console-right ${layout.right}">
                        <div class="control-buttons buttons-grid mb-4"></div>
                        <div class="chess-console-notifications"></div>
                    </div>
                    <div class="chess-console-left ${layout.left}">
                        <div class="row">
                            <div class="col-xl-12 col-lg-4 col-md-12 col-6">
                                <div class="chess-console-history"></div>
                            </div>
                            <div class="col-xl-12 col-lg-8 col-md-12 col-6">
                                <div class="chess-console-captured"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    }
    Object.assign(this.props, props);
    this.messageBroker = new MessageBroker;
    const innerHTMLElement = DomUtils.createElement(this.context.innerHTML);
    if (!(innerHTMLElement instanceof Element) || !innerHTMLElement.querySelector(".chess-console") && !innerHTMLElement.classList.contains("chess-console")) {
      this.context.innerHTML = this.props.template;
    }
    this.componentContainers = {
      center: this.context.querySelector(".chess-console-center"),
      left: this.context.querySelector(".chess-console-left"),
      right: this.context.querySelector(".chess-console-right"),
      board: this.context.querySelector(".chess-console-board"),
      controlButtons: this.context.querySelector(".control-buttons"),
      notifications: this.context.querySelector(".chess-console-notifications")
    };
    this.components = {};
    this.player = new player.type(this, player.name, player.props);
    this.opponent = new opponent.type(this, opponent.name, opponent.props);
    this.persistence = undefined;
  }
  initGame(props = {}, requestNextMove = true) {
    Object.assign(this.props, props);
    this.state.orientation = this.props.playerColor;
    if (props.pgn) {
      this.state.chess.loadPgn(props.pgn, true);
      this.props.gameVariant = this.state.chess.props.gameVariant;
      this.state.plyViewed = this.state.chess.plyCount();
    } else {
      this.state.chess.load(FEN.start);
      this.state.plyViewed = 0;
    }
    if (requestNextMove) {
      this.nextMove();
    }
    this.messageBroker.publish(CONSOLE_MESSAGE_TOPICS.initGame, { props });
  }
  newGame(props = {}) {
    this.messageBroker.publish(CONSOLE_MESSAGE_TOPICS.newGame, { props });
    this.initGame(props);
    if (this.components.board.chessboard) {
      this.components.board.chessboard.disableMoveInput();
    }
  }
  playerWhite() {
    return this.props.playerColor === COLOR2.white ? this.player : this.opponent;
  }
  playerBlack() {
    return this.props.playerColor === COLOR2.white ? this.opponent : this.player;
  }
  playerToMove() {
    if (this.state.chess.gameOver()) {
      return null;
    } else {
      if (this.state.chess.turn() === "w") {
        return this.playerWhite();
      } else {
        return this.playerBlack();
      }
    }
  }
  nextMove() {
    const playerToMove = this.playerToMove();
    if (playerToMove) {
      this.messageBroker.publish(CONSOLE_MESSAGE_TOPICS.moveRequest, { playerToMove });
      setTimeout(() => {
        playerToMove.moveRequest(this.state.chess.fen(), (move) => {
          return this.handleMoveResponse(move);
        });
      });
    }
  }
  handleMoveResponse(move) {
    const playerMoved = this.playerToMove();
    const moveResult = this.state.chess.move(move);
    if (!moveResult) {
      if (this.props.debug) {
        console.warn("illegalMove", this.state.chess, move);
      }
      this.messageBroker.publish(CONSOLE_MESSAGE_TOPICS.illegalMove, {
        playerMoved,
        move
      });
      return moveResult;
    }
    if (this.state.plyViewed === this.state.chess.plyCount() - 1) {
      this.state.plyViewed++;
    }
    this.messageBroker.publish(CONSOLE_MESSAGE_TOPICS.legalMove, {
      playerMoved,
      move,
      moveResult
    });
    if (!this.state.chess.gameOver()) {
      this.nextMove();
    } else {
      let wonColor = null;
      if (this.state.chess.inCheckmate()) {
        wonColor = this.state.chess.turn() === COLOR2.white ? COLOR2.black : COLOR2.white;
      }
      this.messageBroker.publish(CONSOLE_MESSAGE_TOPICS.gameOver, { wonColor });
    }
    return moveResult;
  }
  undoMove() {
    this.components.board.chessboard.disableMoveInput();
    this.state.chess.undo();
    if (this.playerToMove() !== this.player) {
      this.state.chess.undo();
    }
    if (this.state.plyViewed > this.state.chess.plyCount()) {
      this.state.plyViewed = this.state.chess.plyCount();
    }
    this.messageBroker.publish(CONSOLE_MESSAGE_TOPICS.moveUndone);
    this.nextMove();
  }
}

// node_modules/cm-chessboard/src/extensions/markers/Markers.js
var MARKER_TYPE = {
  frame: { class: "marker-frame", slice: "markerFrame" },
  framePrimary: { class: "marker-frame-primary", slice: "markerFrame" },
  frameDanger: { class: "marker-frame-danger", slice: "markerFrame" },
  circle: { class: "marker-circle", slice: "markerCircle" },
  circlePrimary: { class: "marker-circle-primary", slice: "markerCircle" },
  circleDanger: { class: "marker-circle-danger", slice: "markerCircle" },
  circleDangerFilled: { class: "marker-circle-danger-filled", slice: "markerCircleFilled" },
  square: { class: "marker-square", slice: "markerSquare" },
  dot: { class: "marker-dot", slice: "markerDot", position: "above" },
  bevel: { class: "marker-bevel", slice: "markerBevel" }
};

class Markers extends Extension {
  constructor(chessboard, props = {}) {
    super(chessboard);
    this.registerExtensionPoint(EXTENSION_POINT.afterRedrawBoard, () => {
      this.onRedrawBoard();
    });
    this.props = {
      autoMarkers: MARKER_TYPE.frame,
      sprite: "extensions/markers/markers.svg"
    };
    Object.assign(this.props, props);
    if (chessboard.props.assetsCache) {
      chessboard.view.cacheSpriteToDiv("cm-chessboard-markers", this.getSpriteUrl());
    }
    chessboard.addMarker = this.addMarker.bind(this);
    chessboard.getMarkers = this.getMarkers.bind(this);
    chessboard.removeMarkers = this.removeMarkers.bind(this);
    chessboard.addLegalMovesMarkers = this.addLegalMovesMarkers.bind(this);
    chessboard.removeLegalMovesMarkers = this.removeLegalMovesMarkers.bind(this);
    this.markerGroupDown = Svg.addElement(chessboard.view.markersLayer, "g", { class: "markers" });
    this.markerGroupUp = Svg.addElement(chessboard.view.markersTopLayer, "g", { class: "markers" });
    this.markers = [];
    if (this.props.autoMarkers) {
      Object.assign(this.props.autoMarkers, this.props.autoMarkers);
      this.registerExtensionPoint(EXTENSION_POINT.moveInput, (event) => {
        this.drawAutoMarkers(event);
      });
    }
  }
  drawAutoMarkers(event) {
    if (event.type !== INPUT_EVENT_TYPE.moveInputFinished) {
      this.removeMarkers(this.props.autoMarkers);
    }
    if (event.type === INPUT_EVENT_TYPE.moveInputStarted && !event.moveInputCallbackResult) {
      return;
    }
    if (event.type === INPUT_EVENT_TYPE.moveInputStarted || event.type === INPUT_EVENT_TYPE.movingOverSquare) {
      if (event.squareFrom) {
        this.addMarker(this.props.autoMarkers, event.squareFrom);
      }
      if (event.squareTo) {
        this.addMarker(this.props.autoMarkers, event.squareTo);
      }
    }
  }
  onRedrawBoard() {
    while (this.markerGroupUp.firstChild) {
      this.markerGroupUp.removeChild(this.markerGroupUp.firstChild);
    }
    while (this.markerGroupDown.firstChild) {
      this.markerGroupDown.removeChild(this.markerGroupDown.firstChild);
    }
    this.markers.forEach((marker) => {
      this.drawMarker(marker);
    });
  }
  addLegalMovesMarkers(moves) {
    for (const move of moves) {
      if (move.promotion && move.promotion !== "q") {
        continue;
      }
      if (this.chessboard.getPiece(move.to)) {
        this.chessboard.addMarker(MARKER_TYPE.bevel, move.to);
      } else {
        this.chessboard.addMarker(MARKER_TYPE.dot, move.to);
      }
    }
  }
  removeLegalMovesMarkers() {
    this.chessboard.removeMarkers(MARKER_TYPE.bevel);
    this.chessboard.removeMarkers(MARKER_TYPE.dot);
  }
  drawMarker(marker) {
    let markerGroup;
    if (marker.type.position === "above") {
      markerGroup = Svg.addElement(this.markerGroupUp, "g");
    } else {
      markerGroup = Svg.addElement(this.markerGroupDown, "g");
    }
    markerGroup.setAttribute("data-square", marker.square);
    const point = this.chessboard.view.squareToPoint(marker.square);
    const transform = this.chessboard.view.svg.createSVGTransform();
    transform.setTranslate(point.x, point.y);
    markerGroup.transform.baseVal.appendItem(transform);
    const spriteUrl = this.chessboard.props.assetsCache ? "" : this.getSpriteUrl();
    const markerUse = Svg.addElement(markerGroup, "use", { href: `${spriteUrl}#${marker.type.slice}`, class: "marker " + marker.type.class });
    const transformScale = this.chessboard.view.svg.createSVGTransform();
    transformScale.setScale(this.chessboard.view.scalingX, this.chessboard.view.scalingY);
    markerUse.transform.baseVal.appendItem(transformScale);
    return markerGroup;
  }
  addMarker(type, square) {
    if (typeof type === "string" || typeof square === "object") {
      console.error("changed the signature of `addMarker` to `(type, square)` with v5.1.x");
      return;
    }
    this.markers.push(new Marker(square, type));
    this.onRedrawBoard();
  }
  getMarkers(type = undefined, square = undefined) {
    if (typeof type === "string" || typeof square === "object") {
      console.error("changed the signature of `getMarkers` to `(type, square)` with v5.1.x");
      return;
    }
    let markersFound = [];
    this.markers.forEach((marker) => {
      if (marker.matches(square, type)) {
        markersFound.push(marker);
      }
    });
    return markersFound;
  }
  removeMarkers(type = undefined, square = undefined) {
    if (typeof type === "string" || typeof square === "object") {
      console.error("changed the signature of `removeMarkers` to `(type, square)` with v5.1.x");
      return;
    }
    this.markers = this.markers.filter((marker) => !marker.matches(square, type));
    this.onRedrawBoard();
  }
  getSpriteUrl() {
    if (Utils.isAbsoluteUrl(this.props.sprite)) {
      return this.props.sprite;
    } else {
      return this.chessboard.props.assetsUrl + this.props.sprite;
    }
  }
}

class Marker {
  constructor(square, type) {
    this.square = square;
    this.type = type;
  }
  matches(square = undefined, type = undefined) {
    if (!type && !square) {
      return true;
    } else if (!type) {
      if (square === this.square) {
        return true;
      }
    } else if (!square) {
      if (this.type === type) {
        return true;
      }
    } else if (this.type === type && square === this.square) {
      return true;
    }
    return false;
  }
}

// node_modules/cm-web-modules/src/utils/CoreUtils.js
class CoreUtils {
  static debounce(callback, wait = 0, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
      if (immediate && !timeout) {
        callback(...args);
        timeout = true;
      } else {
        const debounced = () => {
          clearTimeout(timeout);
          callback(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(debounced, wait);
      }
    };
  }
  static mergeObjects(target, source) {
    const isObject = (obj) => obj && typeof obj === "object";
    if (!isObject(target) || !isObject(source)) {
      return source;
    }
    for (const key of Object.keys(source)) {
      if (source[key] instanceof Object) {
        Object.assign(source[key], CoreUtils.mergeObjects(target[key], source[key]));
      }
    }
    Object.assign(target || {}, source);
    return target;
  }
  static createTask() {
    let resolve, reject;
    const promise = new Promise(function(_resolve, _reject) {
      resolve = _resolve;
      reject = _reject;
    });
    promise.resolve = resolve;
    promise.reject = reject;
    return promise;
  }
}

// node_modules/cm-chessboard/src/extensions/promotion-dialog/PromotionDialog.js
var DISPLAY_STATE = {
  hidden: "hidden",
  displayRequested: "displayRequested",
  shown: "shown"
};
var translations = {
  de: {
    choosePromotion: "Bauernumwandlung wählen",
    promotionDialogTitle: "Bauernumwandlung",
    pieces: { q: "Dame", r: "Turm", b: "Läufer", n: "Springer" },
    promoteTo: "Umwandeln in"
  },
  en: {
    choosePromotion: "Choose promotion piece",
    promotionDialogTitle: "Pawn promotion",
    pieces: { q: "Queen", r: "Rook", b: "Bishop", n: "Knight" },
    promoteTo: "Promote to"
  }
};
var PROMOTION_DIALOG_RESULT_TYPE = {
  pieceSelected: "pieceSelected",
  canceled: "canceled"
};

class PromotionDialog extends Extension {
  constructor(chessboard, props = {}) {
    super(chessboard);
    this.props = {
      language: navigator.language.substring(0, 2).toLowerCase()
    };
    Object.assign(this.props, props);
    if (this.props.language !== "de" && this.props.language !== "en") {
      this.props.language = "en";
    }
    this.t = translations[this.props.language];
    this.pieceOrder = ["q", "r", "b", "n"];
    this.focusedIndex = 0;
    this.previouslyFocusedElement = null;
    this.registerExtensionPoint(EXTENSION_POINT.afterRedrawBoard, this.extensionPointRedrawBoard.bind(this));
    this.registerExtensionPoint(EXTENSION_POINT.destroy, this.destroy.bind(this));
    chessboard.showPromotionDialog = this.showPromotionDialog.bind(this);
    chessboard.isPromotionDialogShown = this.isPromotionDialogShown.bind(this);
    this.promotionDialogGroup = Svg.addElement(chessboard.view.interactiveTopLayer, "g", {
      class: "promotion-dialog-group",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": this.t.choosePromotion
    });
    this.liveRegion = document.createElement("div");
    this.liveRegion.setAttribute("aria-live", "polite");
    this.liveRegion.setAttribute("aria-atomic", "true");
    this.liveRegion.className = "cm-chessboard-promotion-live-region visually-hidden";
    this.liveRegion.style.cssText = "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;";
    chessboard.context.appendChild(this.liveRegion);
    this.state = {
      displayState: DISPLAY_STATE.hidden,
      callback: null,
      dialogParams: {
        square: null,
        color: null
      }
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  showPromotionDialog(square, color, callback) {
    this.previouslyFocusedElement = document.activeElement;
    this.focusedIndex = 0;
    this.state.dialogParams.square = square;
    this.state.dialogParams.color = color;
    this.state.callback = callback;
    this.setDisplayState(DISPLAY_STATE.displayRequested);
    setTimeout(() => {
      this.chessboard.view.positionsAnimationTask.then(() => {
        this.setDisplayState(DISPLAY_STATE.shown);
        this.announce(this.t.choosePromotion + ": " + this.pieceOrder.map((p) => this.t.pieces[p]).join(", "));
      });
    });
  }
  isPromotionDialogShown() {
    return this.state.displayState === DISPLAY_STATE.shown || this.state.displayState === DISPLAY_STATE.displayRequested;
  }
  extensionPointRedrawBoard() {
    this.redrawDialog();
  }
  drawPieceButton(piece, point, index) {
    const squareWidth = this.chessboard.view.squareWidth;
    const squareHeight = this.chessboard.view.squareHeight;
    const pieceType = piece.charAt(1);
    const pieceName = this.t.pieces[pieceType];
    const buttonGroup = Svg.addElement(this.promotionDialogGroup, "g", {
      class: "promotion-dialog-button-group",
      role: "button",
      tabindex: index === 0 ? "0" : "-1",
      "aria-label": pieceName,
      "data-piece": piece,
      "data-index": index
    });
    Svg.addElement(buttonGroup, "rect", {
      x: point.x,
      y: point.y,
      width: squareWidth,
      height: squareHeight,
      class: "promotion-dialog-button",
      "data-piece": piece
    });
    this.chessboard.view.drawPiece(buttonGroup, piece, point);
  }
  redrawDialog() {
    while (this.promotionDialogGroup.firstChild) {
      this.promotionDialogGroup.removeChild(this.promotionDialogGroup.firstChild);
    }
    if (this.state.displayState === DISPLAY_STATE.shown) {
      const squareWidth = this.chessboard.view.squareWidth;
      const squareHeight = this.chessboard.view.squareHeight;
      const squareCenterPoint = this.chessboard.view.squareToPoint(this.state.dialogParams.square);
      squareCenterPoint.x = squareCenterPoint.x + squareWidth / 2;
      squareCenterPoint.y = squareCenterPoint.y + squareHeight / 2;
      let turned = false;
      const rank3 = parseInt(this.state.dialogParams.square.charAt(1), 10);
      if (this.chessboard.getOrientation() === COLOR2.white && rank3 < 5 || this.chessboard.getOrientation() === COLOR2.black && rank3 >= 5) {
        turned = true;
      }
      const offsetY = turned ? -4 * squareHeight : 0;
      const offsetX = squareCenterPoint.x + squareWidth > this.chessboard.view.width ? -squareWidth : 0;
      Svg.addElement(this.promotionDialogGroup, "rect", {
        x: squareCenterPoint.x + offsetX,
        y: squareCenterPoint.y + offsetY,
        width: squareWidth,
        height: squareHeight * 4,
        class: "promotion-dialog"
      });
      const dialogParams = this.state.dialogParams;
      if (turned) {
        this.drawPieceButton(PIECE[dialogParams.color + "q"], {
          x: squareCenterPoint.x + offsetX,
          y: squareCenterPoint.y - squareHeight
        }, 0);
        this.drawPieceButton(PIECE[dialogParams.color + "r"], {
          x: squareCenterPoint.x + offsetX,
          y: squareCenterPoint.y - squareHeight * 2
        }, 1);
        this.drawPieceButton(PIECE[dialogParams.color + "b"], {
          x: squareCenterPoint.x + offsetX,
          y: squareCenterPoint.y - squareHeight * 3
        }, 2);
        this.drawPieceButton(PIECE[dialogParams.color + "n"], {
          x: squareCenterPoint.x + offsetX,
          y: squareCenterPoint.y - squareHeight * 4
        }, 3);
      } else {
        this.drawPieceButton(PIECE[dialogParams.color + "q"], {
          x: squareCenterPoint.x + offsetX,
          y: squareCenterPoint.y
        }, 0);
        this.drawPieceButton(PIECE[dialogParams.color + "r"], {
          x: squareCenterPoint.x + offsetX,
          y: squareCenterPoint.y + squareHeight
        }, 1);
        this.drawPieceButton(PIECE[dialogParams.color + "b"], {
          x: squareCenterPoint.x + offsetX,
          y: squareCenterPoint.y + squareHeight * 2
        }, 2);
        this.drawPieceButton(PIECE[dialogParams.color + "n"], {
          x: squareCenterPoint.x + offsetX,
          y: squareCenterPoint.y + squareHeight * 3
        }, 3);
      }
    }
  }
  promotionDialogOnClickPiece(event) {
    if (event.button !== 2) {
      let piece = event.target.dataset.piece;
      if (!piece && event.target.closest) {
        const buttonGroup = event.target.closest(".promotion-dialog-button-group");
        if (buttonGroup) {
          piece = buttonGroup.dataset.piece;
        }
      }
      if (piece) {
        this.selectPiece(piece);
      } else {
        this.promotionDialogOnCancel(event);
      }
    }
  }
  selectPiece(piece) {
    if (this.state.callback) {
      this.state.callback({
        type: PROMOTION_DIALOG_RESULT_TYPE.pieceSelected,
        square: this.state.dialogParams.square,
        piece
      });
    }
    this.setDisplayState(DISPLAY_STATE.hidden);
  }
  promotionDialogOnCancel(event) {
    if (this.state.displayState === DISPLAY_STATE.shown) {
      event.preventDefault();
      this.setDisplayState(DISPLAY_STATE.hidden);
      if (this.state.callback) {
        this.state.callback({ type: PROMOTION_DIALOG_RESULT_TYPE.canceled });
      }
    }
  }
  contextMenu(event) {
    event.preventDefault();
    this.setDisplayState(DISPLAY_STATE.hidden);
    if (this.state.callback) {
      this.state.callback({ type: PROMOTION_DIALOG_RESULT_TYPE.canceled });
    }
  }
  setDisplayState(displayState) {
    this.state.displayState = displayState;
    if (displayState === DISPLAY_STATE.shown) {
      this.clickDelegate = Utils.delegate(this.chessboard.view.svg, "pointerdown", "*", this.promotionDialogOnClickPiece.bind(this));
      this.contextMenuListener = this.contextMenu.bind(this);
      this.chessboard.view.svg.addEventListener("contextmenu", this.contextMenuListener);
      document.addEventListener("keydown", this.handleKeyDown);
    } else if (displayState === DISPLAY_STATE.hidden) {
      this.clickDelegate.remove();
      this.chessboard.view.svg.removeEventListener("contextmenu", this.contextMenuListener);
      document.removeEventListener("keydown", this.handleKeyDown);
      if (this.previouslyFocusedElement && this.previouslyFocusedElement.focus) {
        this.previouslyFocusedElement.focus();
      }
    }
    this.redrawDialog();
    if (displayState === DISPLAY_STATE.shown) {
      setTimeout(() => {
        this.focusButton(0);
      }, 0);
    }
  }
  handleKeyDown(event) {
    if (this.state.displayState !== DISPLAY_STATE.shown) {
      return;
    }
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        this.focusedIndex = (this.focusedIndex + 1) % 4;
        this.focusButton(this.focusedIndex);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        this.focusedIndex = (this.focusedIndex - 1 + 4) % 4;
        this.focusButton(this.focusedIndex);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        const buttons = this.promotionDialogGroup.querySelectorAll(".promotion-dialog-button-group");
        if (buttons[this.focusedIndex]) {
          const piece = buttons[this.focusedIndex].dataset.piece;
          this.selectPiece(piece);
        }
        break;
      case "Escape":
        event.preventDefault();
        this.setDisplayState(DISPLAY_STATE.hidden);
        if (this.state.callback) {
          this.state.callback({ type: PROMOTION_DIALOG_RESULT_TYPE.canceled });
        }
        break;
      case "Tab":
        event.preventDefault();
        if (event.shiftKey) {
          this.focusedIndex = (this.focusedIndex - 1 + 4) % 4;
        } else {
          this.focusedIndex = (this.focusedIndex + 1) % 4;
        }
        this.focusButton(this.focusedIndex);
        break;
    }
  }
  focusButton(index) {
    const buttons = this.promotionDialogGroup.querySelectorAll(".promotion-dialog-button-group");
    buttons.forEach((btn, i) => {
      btn.setAttribute("tabindex", i === index ? "0" : "-1");
    });
    if (buttons[index]) {
      buttons[index].focus();
      const pieceType = this.pieceOrder[index];
      this.announce(this.t.pieces[pieceType]);
    }
  }
  announce(message) {
    this.liveRegion.textContent = "";
    setTimeout(() => {
      this.liveRegion.textContent = message;
    }, 50);
  }
  destroy() {
    document.removeEventListener("keydown", this.handleKeyDown);
    if (this.liveRegion && this.liveRegion.parentNode) {
      this.liveRegion.parentNode.removeChild(this.liveRegion);
    }
  }
}

// node_modules/cm-chessboard/src/extensions/accessibility/Accessibility.js
var translations2 = {
  de: {
    chessboard: "Schachbrett",
    pieces_lists: "Figurenlisten",
    board_as_table: "Schachbrett als Tabelle",
    move_piece: "Figur bewegen",
    from: "Zug von",
    to: "Zug nach",
    move: "Zug ausführen",
    input_white_enabled: "Eingabe Weiß aktiviert",
    input_black_enabled: "Eingabe Schwarz aktiviert",
    input_disabled: "Eingabe deaktiviert",
    pieces: "Figuren"
  },
  en: {
    chessboard: "Chessboard",
    pieces_lists: "Pieces lists",
    board_as_table: "Chessboard as table",
    move_piece: "Move piece",
    from: "Move from",
    to: "Move to",
    move: "Make move",
    input_white_enabled: "Input white enabled",
    input_black_enabled: "Input black enabled",
    input_disabled: "Input disabled",
    pieces: "Pieces"
  }
};

class Accessibility extends Extension {
  constructor(chessboard, props) {
    super(chessboard);
    this.props = {
      language: navigator.language.substring(0, 2).toLowerCase(),
      brailleNotationInAlt: true,
      movePieceForm: true,
      boardAsTable: true,
      piecesAsList: true,
      visuallyHidden: true
    };
    Object.assign(this.props, props);
    if (this.props.language !== "de" && this.props.language !== "en") {
      this.props.language = "en";
    }
    this.lang = this.props.language;
    this.tPieces = piecesTranslations[this.lang];
    this.t = translations2[this.lang];
    this.components = [];
    if (this.props.movePieceForm || this.props.boardAsTable || this.props.piecesAsList) {
      const container = document.createElement("div");
      container.classList.add("cm-chessboard-accessibility");
      this.chessboard.context.appendChild(container);
      if (this.props.visuallyHidden) {
        container.classList.add("visually-hidden");
      }
      if (this.props.movePieceForm) {
        this.components.push(new MovePieceForm(container, this));
      }
      if (this.props.boardAsTable) {
        this.components.push(new BoardAsTable(container, this));
      }
      if (this.props.piecesAsList) {
        this.components.push(new PiecesAsList(container, this));
      }
    }
    if (this.props.brailleNotationInAlt) {
      this.components.push(new BrailleNotationInAlt(this));
    }
  }
}

class BrailleNotationInAlt {
  constructor(extension) {
    this.extension = extension;
    extension.registerExtensionPoint(EXTENSION_POINT.positionChanged, () => {
      this.redraw();
    });
  }
  redraw() {
    const pieces = this.extension.chessboard.state.position.getPieces();
    let listW = piecesTranslations[this.extension.lang].colors.w.toUpperCase() + ":";
    let listB = piecesTranslations[this.extension.lang].colors.b.toUpperCase() + ":";
    for (const piece of pieces) {
      const pieceName = piece.type === "p" ? "" : piecesTranslations[this.extension.lang].pieces[piece.type].toUpperCase();
      if (piece.color === "w") {
        listW += " " + pieceName + piece.position;
      } else {
        listB += " " + pieceName + piece.position;
      }
    }
    const altText = `${listW}
${listB}`;
    this.extension.chessboard.view.svg.setAttribute("alt", altText);
  }
}

class MovePieceForm {
  constructor(container, extension) {
    this.chessboard = extension.chessboard;
    this.movePieceFormContainer = Utils.createDomElement(`
<div>
    <h3 id="hl_form_${this.chessboard.id}">${extension.t.move_piece}</h3>
    <form aria-labelledby="hl_form_${this.chessboard.id}">
        <label for="move_piece_input_from_${this.chessboard.id}">${extension.t.from}</label>
        <input class="input-from" type="text" size="2" id="move_piece_input_from_${this.chessboard.id}"/>
        <label for="move_piece_input_to_${this.chessboard.id}">${extension.t.to}</label>
        <input class="input-to" type="text" size="2" id="move_piece_input_to_${this.chessboard.id}"/>
        <button type="submit" class="button-move">${extension.t.move}</button>
    </form>
</div>`);
    this.form = this.movePieceFormContainer.querySelector("form");
    this.inputFrom = this.form.querySelector(".input-from");
    this.inputTo = this.form.querySelector(".input-to");
    this.moveButton = this.form.querySelector(".button-move");
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this.chessboard.state.moveInputCallback({
        chessboard: this.chessboard,
        type: INPUT_EVENT_TYPE.validateMoveInput,
        squareFrom: this.inputFrom.value,
        squareTo: this.inputTo.value
      })) {
        this.chessboard.movePiece(this.inputFrom.value, this.inputTo.value, true).then(() => {
          this.inputFrom.value = "";
          this.inputTo.value = "";
        });
      }
    });
    container.appendChild(this.movePieceFormContainer);
    extension.registerExtensionPoint(EXTENSION_POINT.moveInputToggled, () => {
      this.redraw();
    });
    this.keydownListener = (event) => {
      if (event.shiftKey && event.altKey && event.code === "KeyE") {
        event.preventDefault();
        this.inputFrom.focus();
      }
    };
    document.addEventListener("keydown", this.keydownListener);
    extension.registerExtensionPoint(EXTENSION_POINT.destroy, () => {
      document.removeEventListener("keydown", this.keydownListener);
    });
  }
  redraw() {
    if (this.inputFrom) {
      if (this.chessboard.state.inputWhiteEnabled || this.chessboard.state.inputBlackEnabled) {
        this.inputFrom.disabled = false;
        this.inputTo.disabled = false;
        this.moveButton.disabled = false;
      } else {
        this.inputFrom.disabled = true;
        this.inputTo.disabled = true;
        this.moveButton.disabled = true;
      }
    }
  }
}

class BoardAsTable {
  constructor(container, extension) {
    this.extension = extension;
    this.chessboard = extension.chessboard;
    this.boardAsTableContainer = Utils.createDomElement(`<div><h3 id="hl_table_${this.chessboard.id}">${extension.t.board_as_table}</h3><div class="table"></div></div>`);
    this.boardAsTable = this.boardAsTableContainer.querySelector(".table");
    container.appendChild(this.boardAsTableContainer);
    extension.registerExtensionPoint(EXTENSION_POINT.positionChanged, () => {
      this.redraw();
    });
    extension.registerExtensionPoint(EXTENSION_POINT.boardChanged, () => {
      this.redraw();
    });
  }
  redraw() {
    const squares = this.chessboard.state.position.squares.slice();
    const ranks = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const files = ["8", "7", "6", "5", "4", "3", "2", "1"];
    if (this.chessboard.state.orientation === COLOR2.black) {
      ranks.reverse();
      files.reverse();
      squares.reverse();
    }
    let html2 = `<table aria-labelledby="hl_table_${this.chessboard.id}"><tr><th></th>`;
    for (const rank3 of ranks) {
      html2 += `<th scope='col'>${rank3}</th>`;
    }
    html2 += "</tr>";
    for (let x = 7;x >= 0; x--) {
      html2 += `<tr><th scope="row">${files[7 - x]}</th>`;
      for (let y = 0;y < 8; y++) {
        const pieceCode = squares[y % 8 + x * 8];
        let color, name;
        if (pieceCode) {
          color = pieceCode.charAt(0);
          name = pieceCode.charAt(1);
          html2 += `<td>${renderPieceTitle(this.extension.lang, name, color)}</td>`;
        } else {
          html2 += `<td></td>`;
        }
      }
      html2 += "</tr>";
    }
    html2 += "</table>";
    this.boardAsTable.innerHTML = html2;
  }
}

class PiecesAsList {
  constructor(container, extension) {
    this.extension = extension;
    this.chessboard = extension.chessboard;
    this.piecesListContainer = Utils.createDomElement(`<div><h3 id="hl_lists_${this.chessboard.id}">${extension.t.pieces_lists}</h3><div class="list"></div></div>`);
    this.piecesList = this.piecesListContainer.querySelector(".list");
    container.appendChild(this.piecesListContainer);
    extension.registerExtensionPoint(EXTENSION_POINT.positionChanged, () => {
      this.redraw();
    });
  }
  redraw() {
    const pieces = this.chessboard.state.position.getPieces();
    let listW = "";
    let listB = "";
    for (const piece of pieces) {
      if (piece.color === "w") {
        listW += `<li class="list-inline-item">${renderPieceTitle(this.extension.lang, piece.type)} ${piece.position}</li>`;
      } else {
        listB += `<li class="list-inline-item">${renderPieceTitle(this.extension.lang, piece.type)} ${piece.position}</li>`;
      }
    }
    this.piecesList.innerHTML = `
        <h4 id="white_${this.chessboard.id}">${this.extension.t.pieces} ${this.extension.tPieces.colors_long.w}</h4>
        <ul aria-labelledby="white_${this.chessboard.id}" class="list-inline">${listW}</ul>
        <h4 id="black_${this.chessboard.id}">${this.extension.t.pieces} ${this.extension.tPieces.colors_long.b}</h4>
        <ul aria-labelledby="black_${this.chessboard.id}" class="list-inline">${listB}</ul>`;
  }
}

// node_modules/cm-chessboard/src/extensions/auto-border-none/AutoBorderNone.js
class AutoBorderNone extends Extension {
  constructor(chessboard, props = {}) {
    super(chessboard);
    this.props = {
      chessboardBorderType: chessboard.props.style.borderType,
      borderNoneBelow: 540
    };
    Object.assign(this.props, props);
    this.registerExtensionPoint(EXTENSION_POINT.beforeRedrawBoard, this.extensionPointBeforeRedrawBoard.bind(this));
  }
  extensionPointBeforeRedrawBoard() {
    let newBorderType;
    if (this.chessboard.view.width < this.props.borderNoneBelow) {
      newBorderType = "none";
    } else {
      newBorderType = this.props.chessboardBorderType;
    }
    if (newBorderType !== this.chessboard.props.style.borderType) {
      this.chessboard.props.style.borderType = newBorderType;
      this.chessboard.view.updateMetrics();
    }
  }
}

// node_modules/chess-console/src/components/Board.js
var CONSOLE_MARKER_TYPE = {
  moveInput: { class: "marker-frame", slice: "markerFrame" },
  check: { class: "marker-circle-danger", slice: "markerCircle" },
  wrongMove: { class: "marker-frame-danger", slice: "markerFrame" },
  premove: { class: "marker-frame-primary", slice: "markerFrame" },
  legalMove: { class: "marker-dot", slice: "markerDot" },
  legalMoveCapture: { class: "marker-bevel", slice: "markerBevel" }
};

class Board {
  constructor(chessConsole, props = {}) {
    this.context = chessConsole.componentContainers.board;
    chessConsole.components.board = this;
    this.initialized = new Promise((resolve) => {
      this.i18n = chessConsole.i18n;
      this.i18n.load({
        de: {
          chessBoard: "Schachbrett"
        },
        en: {
          chessBoard: "Chess Board"
        }
      }).then(() => {
        this.chessConsole = chessConsole;
        this.elements = {
          playerTop: document.createElement("div"),
          playerBottom: document.createElement("div"),
          chessboard: document.createElement("div")
        };
        this.elements.playerTop.setAttribute("class", "player top");
        this.elements.playerTop.innerHTML = "&nbsp;";
        this.elements.playerBottom.setAttribute("class", "player bottom");
        this.elements.playerBottom.innerHTML = "&nbsp;";
        this.elements.chessboard.setAttribute("class", "chessboard");
        this.context.appendChild(DomUtils.createElement("<h2 class='visually-hidden'>" + this.i18n.t("chessBoard") + "</h2>"));
        this.context.appendChild(this.elements.playerTop);
        this.context.appendChild(this.elements.chessboard);
        this.context.appendChild(this.elements.playerBottom);
        this.chessConsole.state.observeChess((params) => {
          let animated = true;
          if (params.functionName === "load_pgn") {
            animated = false;
          }
          this.setPositionOfPlyViewed(animated);
          this.markLastMove();
        });
        Observe.property(this.chessConsole.state, "plyViewed", (props2) => {
          this.setPositionOfPlyViewed(props2.oldValue !== undefined);
          this.markLastMove();
        });
        this.props = {
          position: FEN2.empty,
          orientation: chessConsole.state.orientation,
          assetsUrl: undefined,
          markLegalMoves: true,
          style: {
            aspectRatio: 0.98
          },
          accessibility: {
            active: true,
            brailleNotationInAlt: true,
            movePieceForm: true,
            boardAsTable: true,
            piecesAsList: true,
            visuallyHidden: true
          },
          markers: {
            moveInput: CONSOLE_MARKER_TYPE.moveInput,
            check: CONSOLE_MARKER_TYPE.check,
            wrongMove: CONSOLE_MARKER_TYPE.wrongMove,
            premove: CONSOLE_MARKER_TYPE.premove,
            legalMove: CONSOLE_MARKER_TYPE.legalMove,
            legalMoveCapture: CONSOLE_MARKER_TYPE.legalMoveCapture
          },
          extensions: [{ class: PromotionDialog }, {
            class: ChessConsoleMarkers,
            props: {
              board: this,
              autoMarkers: props.markers && props.markers.moveInput ? { ...props.markers.moveInput } : { ...CONSOLE_MARKER_TYPE.moveInput }
            }
          }, { class: AutoBorderNone, props: { borderNoneBelow: 580 } }]
        };
        CoreUtils.mergeObjects(this.props, props);
        if (this.props.accessibility.active) {
          this.props.extensions.push({
            class: Accessibility,
            props: this.props.accessibility
          });
        }
        this.chessboard = new Chessboard(this.elements.chessboard, this.props);
        Observe.property(chessConsole.state, "orientation", () => {
          this.setPlayerNames();
          this.chessboard.setOrientation(chessConsole.state.orientation).then(() => {
            this.markPlayerToMove();
          });
        });
        Observe.property(chessConsole.player, "name", () => {
          this.setPlayerNames();
        });
        Observe.property(chessConsole.opponent, "name", () => {
          this.setPlayerNames();
        });
        chessConsole.messageBroker.subscribe(CONSOLE_MESSAGE_TOPICS.moveRequest, () => {
          this.markPlayerToMove();
        });
        this.chessConsole.messageBroker.subscribe(CONSOLE_MESSAGE_TOPICS.illegalMove, (message) => {
          this.chessboard.removeMarkers(this.props.markers.wrongMove);
          clearTimeout(this.removeMarkersTimeout);
          if (message.move.from) {
            this.chessboard.addMarker(this.props.markers.wrongMove, message.move.from);
          } else {
            console.warn("illegalMove without `message.move.from`");
          }
          if (message.move.to) {
            this.chessboard.addMarker(this.props.markers.wrongMove, message.move.to);
          }
          this.removeMarkersTimeout = setTimeout(() => {
            this.chessboard.removeMarkers(this.props.markers.wrongMove);
          }, 500);
        });
        this.setPositionOfPlyViewed(false);
        this.setPlayerNames();
        this.markPlayerToMove();
        this.markLastMove();
        resolve(this);
      });
    });
    this.initialization = this.initialized;
  }
  setPositionOfPlyViewed(animated = true) {
    clearTimeout(this.setPositionOfPlyViewedDebounced);
    this.setPositionOfPlyViewedDebounced = setTimeout(() => {
      const to = this.chessConsole.state.chess.fenOfPly(this.chessConsole.state.plyViewed);
      this.chessboard.setPosition(to, animated);
    });
  }
  markLastMove() {
    window.clearTimeout(this.markLastMoveDebounce);
    this.markLastMoveDebounce = setTimeout(() => {
      this.chessboard.removeMarkers(this.props.markers.moveInput);
      this.chessboard.removeMarkers(this.props.markers.check);
      if (this.chessConsole.state.plyViewed > 0) {
        const lastMove = this.chessConsole.state.chess.history()[this.chessConsole.state.plyViewed - 1];
        if (lastMove) {
          this.chessboard.addMarker(this.props.markers.moveInput, lastMove.from);
          this.chessboard.addMarker(this.props.markers.moveInput, lastMove.to);
          if (this.chessConsole.state.chess.inCheck(lastMove) || this.chessConsole.state.chess.inCheckmate(lastMove)) {
            const kingSquare = this.chessConsole.state.chess.pieces("k", this.chessConsole.state.chess.turn(lastMove), lastMove)[0];
            this.chessboard.addMarker(this.props.markers.check, kingSquare.square);
          }
        }
      }
    });
  }
  setPlayerNames() {
    window.clearTimeout(this.setPlayerNamesDebounce);
    this.setPlayerNamesDebounce = setTimeout(() => {
      if (this.chessConsole.props.playerColor === this.chessConsole.state.orientation) {
        this.elements.playerBottom.innerHTML = this.chessConsole.player.name;
        this.elements.playerTop.innerHTML = this.chessConsole.opponent.name;
      } else {
        this.elements.playerBottom.innerHTML = this.chessConsole.opponent.name;
        this.elements.playerTop.innerHTML = this.chessConsole.player.name;
      }
    });
  }
  markPlayerToMove() {
    clearTimeout(this.markPlayerToMoveDebounce);
    this.markPlayerToMoveDebounce = setTimeout(() => {
      this.elements.playerTop.classList.remove("to-move");
      this.elements.playerBottom.classList.remove("to-move");
      this.elements.playerTop.classList.remove("not-to-move");
      this.elements.playerBottom.classList.remove("not-to-move");
      const playerMove = this.chessConsole.playerToMove();
      if (this.chessConsole.state.orientation === COLOR2.white && playerMove === this.chessConsole.playerWhite() || this.chessConsole.state.orientation === COLOR2.black && playerMove === this.chessConsole.playerBlack()) {
        this.elements.playerBottom.classList.add("to-move");
        this.elements.playerTop.classList.add("not-to-move");
      } else {
        this.elements.playerTop.classList.add("to-move");
        this.elements.playerBottom.classList.add("not-to-move");
      }
    }, 10);
  }
}

class ChessConsoleMarkers extends Markers {
  drawAutoMarkers(event) {
    clearTimeout(this.drawAutoMarkersDebounced);
    this.drawAutoMarkersDebounced = setTimeout(() => {
      this.removeMarkers(this.props.autoMarkers);
      const board = this.props.board;
      const chess = this.props.board.chessConsole.state.chess;
      const moves = chess.moves({ square: event.square, verbose: true });
      if (board.props.markLegalMoves) {
        if (event.type === INPUT_EVENT_TYPE.moveInputStarted || event.type === INPUT_EVENT_TYPE.validateMoveInput || event.type === INPUT_EVENT_TYPE.moveInputCanceled || event.type === INPUT_EVENT_TYPE.moveInputFinished) {
          event.chessboard.removeMarkers(board.props.markers.legalMove);
          event.chessboard.removeMarkers(board.props.markers.legalMoveCapture);
        }
        if (event.type === INPUT_EVENT_TYPE.moveInputStarted) {
          for (const move of moves) {
            if (move.promotion && move.promotion !== "q") {
              continue;
            }
            const hasPiece = event.chessboard.getPiece(move.to);
            if (hasPiece) {
              event.chessboard.addMarker(board.props.markers.legalMoveCapture, move.to);
            } else {
              event.chessboard.addMarker(board.props.markers.legalMove, move.to);
            }
          }
        }
      }
      if (event.type === INPUT_EVENT_TYPE.moveInputStarted) {
        if (event.moveInputCallbackResult) {
          this.addMarker(this.props.autoMarkers, event.squareFrom);
        }
      } else if (event.type === INPUT_EVENT_TYPE.movingOverSquare) {
        this.addMarker(this.props.autoMarkers, event.squareFrom);
        if (event.squareTo) {
          this.addMarker(this.props.autoMarkers, event.squareTo);
        }
      }
    });
  }
}

// node_modules/chess-console/src/components/CapturedPieces.js
var zeroWithSpace = "&#8203;";

class CapturedPieces {
  constructor(chessConsole) {
    this.chessConsole = chessConsole;
    this.element = document.createElement("div");
    this.element.setAttribute("class", "captured-pieces");
    this.chessConsole.componentContainers.left.querySelector(".chess-console-captured").appendChild(this.element);
    this.chessConsole.state.observeChess(() => {
      this.redraw();
    });
    Observe.property(this.chessConsole.state, "plyViewed", () => {
      this.redraw();
    });
    Observe.property(this.chessConsole.state, "orientation", () => {
      this.redraw();
    });
    this.i18n = chessConsole.i18n;
    this.i18n.load({
      de: {
        captured_pieces: "Geschlagene Figuren"
      },
      en: {
        captured_pieces: "Captured pieces"
      }
    }).then(() => {
      this.redraw();
    });
    DomUtils.delegate(this.element, "click", ".piece", (event) => {
      const ply = event.target.getAttribute("data-ply");
      this.chessConsole.state.plyViewed = parseInt(ply, 10);
    });
  }
  redraw() {
    window.clearTimeout(this.redrawDebounce);
    this.redrawDebounce = setTimeout(() => {
      const capturedPiecesWhite = [];
      const capturedPiecesWhiteAfterPlyViewed = [];
      const capturedPiecesBlack = [];
      const capturedPiecesBlackAfterPlyViewed = [];
      const history = this.chessConsole.state.chess.history({ verbose: true });
      let pointsWhite = 0;
      let pointsBlack = 0;
      history.forEach((move, index) => {
        if (move.flags.indexOf("c") !== -1 || move.flags.indexOf("e") !== -1) {
          const pieceCaptured = move.captured.toUpperCase();
          if (move.color === "b") {
            const pieceHtml = `<span class="piece" role='button' data-ply='${move.ply}'>` + this.chessConsole.props.figures[pieceCaptured + "w"] + "</span>";
            if (index < this.chessConsole.state.plyViewed) {
              capturedPiecesWhite.push(pieceHtml);
            } else {
              capturedPiecesWhiteAfterPlyViewed.push(pieceHtml);
            }
            pointsWhite += PIECES[pieceCaptured.toLowerCase()].value;
          } else if (move.color === "w") {
            const pieceHtml = `<span class="piece" role='button' data-ply='${move.ply}'>` + this.chessConsole.props.figures[pieceCaptured + "b"] + "</span>";
            if (index < this.chessConsole.state.plyViewed) {
              capturedPiecesBlack.push(pieceHtml);
            } else {
              capturedPiecesBlackAfterPlyViewed.push(pieceHtml);
            }
            pointsBlack += PIECES[pieceCaptured.toLowerCase()].value;
          }
        }
      });
      const outputWhite = this.renderPieces(capturedPiecesWhite, capturedPiecesWhiteAfterPlyViewed, pointsWhite);
      const outputBlack = this.renderPieces(capturedPiecesBlack, capturedPiecesBlackAfterPlyViewed, pointsBlack);
      this.element.innerHTML = "<h2 class='visually-hidden'>" + this.i18n.t("captured_pieces") + "</h2>" + (this.chessConsole.state.orientation === "w" ? outputWhite + outputBlack : outputBlack + outputWhite);
    });
  }
  renderPieces(capturedPieces, capturedPiecesAfterPlyViewed, points) {
    let output = "<div>";
    if (capturedPieces.length > 0) {
      output += capturedPieces.join(zeroWithSpace);
    }
    if (capturedPiecesAfterPlyViewed.length > 0) {
      output += "<span class='text-muted'>" + capturedPiecesAfterPlyViewed.join(zeroWithSpace) + "</span>";
    }
    output += "<small> " + (points > 0 ? points : "") + "</small></div>";
    return output;
  }
}

// node_modules/chess-console/src/tools/ChessRender.js
var PIECES2 = {
  notation: {
    de: {
      R: "T",
      N: "S",
      B: "L",
      Q: "D",
      K: "K",
      P: ""
    }
  },
  figures: {
    utf8: {
      Rw: "♖",
      Nw: "♘",
      Bw: "♗",
      Qw: "♕",
      Kw: "♔",
      Pw: "♙",
      Rb: "♜",
      Nb: "♞",
      Bb: "♝",
      Qb: "♛",
      Kb: "♚",
      Pb: "♟"
    },
    fontAwesomePro: {
      Rw: '<i class="far fa-fw fa-chess-rook"></i>',
      Nw: '<i class="far fa-fw fa-chess-knight"></i>',
      Bw: '<i class="far fa-fw fa-chess-bishop"></i>',
      Qw: '<i class="far fa-fw fa-chess-queen"></i>',
      Kw: '<i class="far fa-fw fa-chess-king"></i>',
      Pw: '<i class="far fa-fw fa-chess-pawn"></i>',
      Rb: '<i class="fas fa-fw fa-chess-rook"></i>',
      Nb: '<i class="fas fa-fw fa-chess-knight"></i>',
      Bb: '<i class="fas fa-fw fa-chess-bishop"></i>',
      Qb: '<i class="fas fa-fw fa-chess-queen"></i>',
      Kb: '<i class="fas fa-fw fa-chess-king"></i>',
      Pb: '<i class="fas fa-fw fa-chess-pawn"></i>'
    }
  }
};

class ChessRender {
  static san(san, color = COLOR.white, lang = "en", mode = "text", pieces = PIECES2.figures.utf8) {
    if (mode === "figures") {
      if (color === COLOR.white) {
        return this.replaceAll(san, {
          R: pieces.Rw,
          N: pieces.Nw,
          B: pieces.Bw,
          Q: pieces.Qw,
          K: pieces.Kw
        });
      } else {
        return this.replaceAll(san, {
          R: pieces.Rb,
          N: pieces.Nb,
          B: pieces.Bb,
          Q: pieces.Qb,
          K: pieces.Kb
        });
      }
    } else if (mode === "text") {
      return this.replaceAll(san, PIECES2.notation[lang]);
    } else {
      console.error("mode must be 'text' or 'figures'");
    }
  }
  static replaceAll(str, replacementsObj, ignoreCase = false) {
    let retStr = str;
    const flags = ignoreCase ? "gi" : "g";
    for (let needle in replacementsObj) {
      retStr = retStr.replace(new RegExp(needle, flags), replacementsObj[needle]);
    }
    return retStr;
  }
}

// node_modules/chess-console/src/components/History.js
class History2 {
  constructor(chessConsole, props) {
    this.context = chessConsole.componentContainers.left.querySelector(".chess-console-history");
    this.chessConsole = chessConsole;
    this.element = document.createElement("div");
    this.element.setAttribute("class", "history");
    this.context.appendChild(this.element);
    this.props = {
      notationType: "figures",
      makeClickable: true
    };
    Object.assign(this.props, props);
    this.chessConsole.state.observeChess(() => {
      this.redraw();
    });
    Observe.property(chessConsole.state, "plyViewed", () => {
      this.redraw();
    });
    if (this.props.makeClickable) {
      this.addClickEvents();
    }
    this.i18n = chessConsole.i18n;
    this.i18n.load({
      de: {
        game_history: "Spielnotation"
      },
      en: {
        game_history: "Game notation"
      }
    }).then(() => {
      this.redraw();
    });
  }
  addClickEvents() {
    this.clickHandler = DomUtils.delegate(this.element, "click", ".ply", (event) => {
      const ply = parseInt(event.target.getAttribute("data-ply"), 10);
      if (ply <= this.chessConsole.state.chess.history().length) {
        this.chessConsole.state.plyViewed = ply;
      }
    });
    this.element.classList.add("clickable");
  }
  removeClickEvents() {
    this.clickHandler.remove();
    this.element.classList.remove("clickable");
  }
  getPlyClass(plyNumber) {
    const plyViewed = this.chessConsole.state.plyViewed;
    if (plyViewed === plyNumber)
      return "active";
    if (plyViewed < plyNumber)
      return "text-muted";
    return "";
  }
  redraw() {
    window.clearTimeout(this.redrawDebounce);
    this.redrawDebounce = setTimeout(() => {
      const history = this.chessConsole.state.chess.history();
      const rows = [];
      for (let i = 0;i < history.length; i += 2) {
        const moveNumber = i / 2 + 1;
        const whitePly = i + 1;
        const blackPly = i + 2;
        const moveWhite = history[i];
        const moveBlack = history[i + 1];
        const sanWhite = moveWhite ? ChessRender.san(moveWhite.san, COLOR.white, this.i18n.lang, this.props.notationType, this.chessConsole.props.figures) : "";
        const sanBlack = moveBlack ? ChessRender.san(moveBlack.san, COLOR.black, this.i18n.lang, this.props.notationType, this.chessConsole.props.figures) : "";
        rows.push(html`
                    <tr>
                        <td class="num">${moveNumber}.</td>
                        <td data-ply="${whitePly}" class="ply ${this.getPlyClass(whitePly)} ply${whitePly}">${sanWhite}</td>
                        <td data-ply="${blackPly}" class="ply ${this.getPlyClass(blackPly)} ply${blackPly}">${sanBlack}</td>
                    </tr>
                `);
      }
      this.element.innerHTML = html`
                <h2 class="visually-hidden">${this.i18n.t("game_history")}</h2>
                <table>${rows}</table>
            `;
      if (this.chessConsole.state.plyViewed > 0) {
        const plyElement = this.element.querySelector(".ply" + this.chessConsole.state.plyViewed);
        if (plyElement) {
          this.element.scrollTop = 0;
          this.element.scrollTop = plyElement.offsetTop - 68;
        }
      }
    });
  }
}

// node_modules/chess-console/src/components/HistoryControl.js
class HistoryControl {
  constructor(chessConsole, props = {}) {
    this.context = chessConsole.componentContainers.controlButtons;
    this.chessConsole = chessConsole;
    const i18n = chessConsole.i18n;
    this.props = {
      autoPlayDelay: 1500
    };
    Object.assign(this.props, props);
    i18n.load({
      de: {
        to_game_start: "Zum Spielstart",
        one_move_back: "Ein Zug zurück",
        one_move_forward: "Ein Zug weiter",
        to_last_move: "Zum letzen Zug",
        auto_run: "Automatisch abspielen",
        turn_board: "Brett drehen"
      },
      en: {
        to_game_start: "To game start",
        one_move_back: "One move back",
        one_move_forward: "One move forward",
        to_last_move: "To last move",
        auto_run: "Auto play",
        turn_board: "Turn board"
      }
    }).then(() => {
      this.btnFirst = DomUtils.createElement(`<button type="button" title="${i18n.t("to_game_start")}" class="btn btn-link text-black first"><i class="fa fa-fw fa-fast-backward" aria-hidden="true"></i></button>`);
      this.btnBack = DomUtils.createElement(`<button type="button" title="${i18n.t("one_move_back")}" class="btn btn-link text-black back"><i class="fa fa-fw fa-step-backward" aria-hidden="true"></i></button>`);
      this.btnForward = DomUtils.createElement(`<button type="button" title="${i18n.t("one_move_forward")}" class="btn btn-link text-black forward"><i class="fa fa-fw fa-step-forward" aria-hidden="true"></i></button>`);
      this.btnLast = DomUtils.createElement(`<button type="button" title="${i18n.t("to_last_move")}" class="btn btn-link text-black last"><i class="fa fa-fw fa-fast-forward" aria-hidden="true"></i></button>`);
      this.btnAutoplay = DomUtils.createElement(`<button type="button" title="${i18n.t("auto_run")}" class="btn btn-link text-black autoplay"><i class="fa fa-fw fa-play" aria-hidden="true"></i><i class="fa fa-fw fa-stop" aria-hidden="true"></i></button>`);
      this.btnOrientation = DomUtils.createElement(`<button type="button" title="${i18n.t("turn_board")}" class="btn btn-link text-black orientation"><i class="fa fa-fw fa-exchange-alt fa-rotate-90" aria-hidden="true"></i></button>`);
      this.context.appendChild(this.btnFirst);
      this.context.appendChild(this.btnBack);
      this.context.appendChild(this.btnForward);
      this.context.appendChild(this.btnLast);
      this.context.appendChild(this.btnAutoplay);
      this.context.appendChild(this.btnOrientation);
      this.chessConsole.state.observeChess(() => {
        this.setButtonStates();
      });
      Observe.property(this.chessConsole.state, "plyViewed", () => {
        this.setButtonStates();
      });
      Observe.property(this.chessConsole.state, "orientation", () => {
        if (this.chessConsole.state.orientation !== this.chessConsole.props.playerColor) {
          this.btnOrientation.classList.add("btn-active");
        } else {
          this.btnOrientation.classList.remove("btn-active");
        }
      });
      this.btnFirst.addEventListener("click", () => {
        this.chessConsole.state.plyViewed = 0;
        this.resetAutoPlay();
      });
      this.btnBack.addEventListener("click", () => {
        this.chessConsole.state.plyViewed--;
        this.resetAutoPlay();
      });
      this.btnForward.addEventListener("click", () => {
        this.chessConsole.state.plyViewed++;
        this.resetAutoPlay();
      });
      this.btnLast.addEventListener("click", () => {
        this.chessConsole.state.plyViewed = this.chessConsole.state.chess.plyCount();
        this.resetAutoPlay();
      });
      this.btnOrientation.addEventListener("click", () => {
        this.chessConsole.state.orientation = this.chessConsole.state.orientation === COLOR2.white ? COLOR2.black : COLOR2.white;
      });
      this.btnAutoplay.addEventListener("click", () => {
        if (this.autoplay) {
          clearInterval(this.autoplay);
          this.autoplay = null;
        } else {
          this.chessConsole.state.plyViewed++;
          this.autoplay = setInterval(this.autoPlayMove.bind(this), this.props.autoPlayDelay);
        }
        this.updatePlayIcon();
      });
      document.addEventListener("keydown", (e) => {
        if (e.metaKey || e.ctrlKey || e.altKey) {
          return;
        }
        if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
          return;
        }
        if (e.key === "ArrowLeft" || e.key === "j") {
          if (this.chessConsole.state.plyViewed > 0) {
            this.chessConsole.state.plyViewed--;
            this.resetAutoPlay();
            e.preventDefault();
          }
        } else if (e.key === "ArrowRight" || e.key === "k") {
          if (this.chessConsole.state.plyViewed < this.chessConsole.state.chess.plyCount()) {
            this.chessConsole.state.plyViewed++;
            this.resetAutoPlay();
            e.preventDefault();
          }
        } else if (e.key === "ArrowUp") {
          this.chessConsole.state.plyViewed = 0;
          this.resetAutoPlay();
          e.preventDefault();
        } else if (e.key === "ArrowDown") {
          this.chessConsole.state.plyViewed = this.chessConsole.state.chess.plyCount();
          this.resetAutoPlay();
          e.preventDefault();
        } else if (e.key === "f") {
          this.chessConsole.state.orientation = this.chessConsole.state.orientation === COLOR2.white ? COLOR2.black : COLOR2.white;
          e.preventDefault();
        } else if (e.key === " ") {
          if (this.autoplay) {
            clearInterval(this.autoplay);
            this.autoplay = null;
          } else {
            if (this.chessConsole.state.plyViewed < this.chessConsole.state.chess.plyCount()) {
              this.chessConsole.state.plyViewed++;
              this.autoplay = setInterval(this.autoPlayMove.bind(this), this.props.autoPlayDelay);
            }
          }
          this.updatePlayIcon();
          e.preventDefault();
        }
      });
      this.setButtonStates();
    });
  }
  resetAutoPlay() {
    if (this.autoplay) {
      clearInterval(this.autoplay);
      this.autoplay = setInterval(this.autoPlayMove.bind(this), this.props.autoPlayDelay);
    }
  }
  autoPlayMove() {
    if (this.chessConsole.state.plyViewed >= this.chessConsole.state.chess.plyCount()) {
      clearInterval(this.autoplay);
      this.autoplay = null;
      this.updatePlayIcon();
    } else {
      this.chessConsole.state.plyViewed++;
      if (this.chessConsole.state.plyViewed >= this.chessConsole.state.chess.plyCount()) {
        clearInterval(this.autoplay);
        this.autoplay = null;
        this.updatePlayIcon();
      }
    }
  }
  updatePlayIcon() {
    const playIcon = this.btnAutoplay.querySelector(".fa-play");
    const stopIcon = this.btnAutoplay.querySelector(".fa-stop");
    if (this.autoplay) {
      playIcon.style.display = "none";
      stopIcon.style.display = "";
    } else {
      playIcon.style.display = "";
      stopIcon.style.display = "none";
    }
  }
  setButtonStates() {
    window.clearTimeout(this.redrawDebounce);
    this.redrawDebounce = setTimeout(() => {
      if (this.chessConsole.state.plyViewed > 0) {
        this.btnFirst.disabled = false;
        this.btnBack.disabled = false;
      } else {
        this.btnFirst.disabled = true;
        this.btnBack.disabled = true;
      }
      if (this.chessConsole.state.plyViewed < this.chessConsole.state.chess.plyCount()) {
        this.btnLast.disabled = false;
        this.btnForward.disabled = false;
        this.btnAutoplay.disabled = false;
      } else {
        this.btnLast.disabled = true;
        this.btnForward.disabled = true;
        this.btnAutoplay.disabled = true;
      }
    });
    this.updatePlayIcon();
  }
}

// node_modules/cm-web-modules/src/app/Component.js
class Component {
  constructor(props = {}, state = {}) {
    this.props = props;
    this.state = state;
  }
}

class UiComponent extends Component {
  constructor(context, props = {}, state = {}) {
    super(props, state);
    this.context = context;
    this.actions = {};
  }
  addDataEventListeners(context = this.context) {
    const eventListenerElements = context.querySelectorAll("[data-event-listener]");
    if (this.props.debug) {
      console.log("eventListenerElements", context, eventListenerElements);
    }
    for (const eventListenerElement of eventListenerElements) {
      const eventName = eventListenerElement.dataset.eventListener;
      const action = eventListenerElement.dataset.action;
      const delegate = eventListenerElement.dataset.delegate;
      if (!this.actions[action]) {
        console.error(context, 'You have to add the action "' + action + '" to your component.');
      }
      if (delegate) {
        DomUtils.delegate(eventListenerElement, eventName, delegate, (target) => {
          if (this.props.debug) {
            console.log("delegate", action, target);
          }
          this.actions[action](target);
        });
      } else {
        if (this.props.debug) {
          console.log("addEventListener", eventName, action);
        }
        if (!this.actions[action]) {
          console.error("no action", '"' + action + '"', "is defined");
        } else {
          eventListenerElement.addEventListener(eventName, this.actions[action].bind(this));
        }
      }
    }
    return this;
  }
}

// node_modules/chess-console/src/components/Persistence.js
class Persistence extends Component {
  constructor(chessConsole, props) {
    super(props);
    this.chessConsole = chessConsole;
    if (!this.props.savePrefix) {
      this.props.savePrefix = "ChessConsole";
    }
    this.chessConsole.state.observeChess(() => {
      this.save();
    });
    this.chessConsole.messageBroker.subscribe(CONSOLE_MESSAGE_TOPICS.newGame, () => {
      this.save();
    });
    this.chessConsole.persistence = this;
  }
  load(prefix = this.props.savePrefix) {
    const props = {};
    try {
      if (this.loadValue("PlayerColor") !== null) {
        props.playerColor = this.loadValue("PlayerColor");
      } else {
        props.playerColor = COLOR.white;
      }
      if (localStorage.getItem(prefix + "Pgn") !== null) {
        props.pgn = localStorage.getItem(prefix + "Pgn");
      }
      this.chessConsole.messageBroker.publish(CONSOLE_MESSAGE_TOPICS.load);
      this.chessConsole.initGame(props);
    } catch (e) {
      localStorage.clear();
      console.warn(e);
      this.chessConsole.initGame({ playerColor: COLOR.white });
    }
  }
  loadValue(valueName, prefix = this.props.savePrefix) {
    let item = null;
    try {
      item = localStorage.getItem(prefix + valueName);
      return JSON.parse(item);
    } catch (e) {
      console.error("error loading ", prefix + valueName);
      console.error("item:" + item);
      console.error(e);
    }
  }
  save(prefix = this.props.savePrefix) {
    localStorage.setItem(prefix + "PlayerColor", JSON.stringify(this.chessConsole.props.playerColor));
    localStorage.setItem(prefix + "Pgn", this.chessConsole.state.chess.renderPgn());
  }
  saveValue(valueName, value, prefix = this.props.savePrefix) {
    localStorage.setItem(prefix + valueName, JSON.stringify(value));
  }
}

// node_modules/chess-console/src/ChessConsolePlayer.js
class ChessConsolePlayer {
  constructor(chessConsole, name) {
    this.chessConsole = chessConsole;
    this.name = name;
  }
  moveRequest(fen, moveResponse) {}
}

// node_modules/chess-console/src/players/PremoveManager.js
class PremoveManager {
  constructor(chessConsole) {
    this.chessConsole = chessConsole;
    this.queue = [];
    this.contextMenuInitialized = false;
  }
  initContextMenu() {
    if (this.contextMenuInitialized)
      return;
    const chessboard = this.chessConsole.components.board.chessboard;
    chessboard.context.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      if (this.queue.length > 0) {
        this.clear();
      }
    });
    this.contextMenuInitialized = true;
  }
  add(event) {
    this.queue.push(event);
    this.updateMarkers();
  }
  shift() {
    const event = this.queue.shift();
    this.updateMarkers();
    return event;
  }
  hasPremoves() {
    return this.queue.length > 0;
  }
  clear() {
    this.queue = [];
    this.updateMarkers();
    this.resetBoardPosition();
  }
  clearQueue() {
    this.queue = [];
    this.updateMarkers();
  }
  updateMarkers() {
    const board = this.chessConsole.components.board;
    const chessboard = board.chessboard;
    const premoveMarker = board.props.markers.premove;
    chessboard.removeMarkers(premoveMarker);
    for (const premove of this.queue) {
      chessboard.addMarker(premoveMarker, premove.squareTo);
    }
  }
  resetBoardPosition() {
    const chessboard = this.chessConsole.components.board.chessboard;
    const fen = this.chessConsole.state.chess.fen();
    chessboard.setPosition(fen, true);
  }
}

// node_modules/chess-console/src/players/LocalPlayer.js
class LocalPlayer extends ChessConsolePlayer {
  constructor(chessConsole, name, props) {
    super(chessConsole, name);
    this.props = {
      allowPremoves: false
    };
    Object.assign(this.props, props);
    this.premoveManager = new PremoveManager(chessConsole);
  }
  validateMoveAndPromote(fen, squareFrom, squareTo, callback) {
    const isChess960 = this.chessConsole.state.chess.props.gameVariant === GAME_VARIANT.chess960;
    const tmpChess = new Chess2(fen, isChess960 ? { chess960: true } : undefined);
    const move = { from: squareFrom, to: squareTo };
    const moveResult = tmpChess.move(move);
    if (moveResult) {
      callback(moveResult);
      return true;
    }
    const piece = tmpChess.get(squareFrom);
    if (piece && piece.type === "p") {
      const possibleMoves = tmpChess.moves({ square: squareFrom, verbose: true });
      for (const possibleMove of possibleMoves) {
        if (possibleMove.to === squareTo && possibleMove.promotion) {
          this.showPromotionDialog(squareTo, tmpChess.turn(), move, tmpChess, callback);
          return true;
        }
      }
    }
    callback(null);
    return false;
  }
  showPromotionDialog(square, color, move, chess, callback) {
    const chessboard = this.chessConsole.components.board.chessboard;
    chessboard.showPromotionDialog(square, color, (event) => {
      if (event.piece) {
        move.promotion = event.piece.charAt(1);
        callback(chess.move(move));
      } else {
        callback(null);
      }
    });
  }
  chessboardMoveInputCallback(event, moveResponse) {
    const isPlayerTurn = this.chessConsole.playerToMove() === this;
    if (isPlayerTurn) {
      return this.handlePlayerMove(event, moveResponse);
    } else {
      return this.handlePremove(event);
    }
  }
  handlePlayerMove(event, moveResponse) {
    if (event.type === INPUT_EVENT_TYPE.validateMoveInput) {
      const gameFen = this.chessConsole.state.chess.fen();
      return this.validateMoveAndPromote(gameFen, event.squareFrom, event.squareTo, (moveResult) => {
        let result;
        if (moveResult) {
          result = moveResponse(moveResult);
        } else {
          result = moveResponse({ from: event.squareFrom, to: event.squareTo });
          this.premoveManager.clearQueue();
        }
        if (result && !this.props.allowPremoves) {
          this.chessConsole.components.board.chessboard.disableMoveInput();
        }
      });
    }
    if (event.type === INPUT_EVENT_TYPE.moveInputStarted) {
      return this.handleMoveInputStarted(event);
    }
  }
  handleMoveInputStarted(event) {
    if (this.chessConsole.state.plyViewed !== this.chessConsole.state.chess.plyCount()) {
      this.chessConsole.state.plyViewed = this.chessConsole.state.chess.plyCount();
      return false;
    }
    const possibleMoves = this.chessConsole.state.chess.moves({ square: event.square });
    if (possibleMoves.length > 0) {
      return true;
    }
    this.chessConsole.messageBroker.publish(CONSOLE_MESSAGE_TOPICS.illegalMove, {
      move: { from: event.squareFrom }
    });
    return false;
  }
  handlePremove(event) {
    if (event.type === INPUT_EVENT_TYPE.validateMoveInput) {
      this.premoveManager.add(event);
    }
    return true;
  }
  moveRequest(fen, moveResponse) {
    this.premoveManager.initContextMenu();
    if (this.chessConsole.state.chess.gameOver()) {
      return;
    }
    if (this.premoveManager.hasPremoves()) {
      const premoveEvent = this.premoveManager.shift();
      setTimeout(() => {
        this.chessboardMoveInputCallback(premoveEvent, moveResponse);
      }, 20);
      return;
    }
    const chessboard = this.chessConsole.components.board.chessboard;
    if (!chessboard.isMoveInputEnabled()) {
      const color = this.chessConsole.state.chess.turn() === "w" ? COLOR2.white : COLOR2.black;
      chessboard.enableMoveInput((event) => this.chessboardMoveInputCallback(event, moveResponse), color);
    }
  }
}

// src/Config.js
var ENGINE_CONFIG = {
  WORKER_PATH: "/engine/stockfish-17.1-8e4d048.js",
  BOOK_PATH: "./assets/books/openings.bin",
  DEFAULT_SKILL_LEVEL: 20,
  DEFAULT_DEPTH: 16,
  DEFAULT_DEBUG: true,
  DEFAULT_ANALYSIS_DEPTH: 18,
  ANALYSIS_SKILL_LEVEL: 20,
  DEFAULT_ELO: 1320,
  DEFAULT_MOVE_TIME: 1000,
  MIN_SKILL_LEVEL: 1,
  MAX_SKILL_LEVEL: 20,
  MIN_DEPTH: 1,
  MAX_DEPTH: 36,
  MIN_ANALYSIS_DEPTH: 16,
  MAX_ANALYSIS_DEPTH: 36,
  MIN_ELO: 1320,
  MAX_ELO: 3190,
  MIN_MOVE_TIME: 100,
  MAX_MOVE_TIME: 1e4,
  DEFAULT_THREADS: navigator.hardwareConcurrency || 4
};
var GAME_CONFIG = {
  START_FEN: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  SAVE_PREFIX: "Stockfish"
};
var STYLING_CONFIG = {
  DEFAULT_THEME: "brown-wood",
  DEFAULT_PIECES: "standard",
  THEMES: [
    { id: "black-stone", name: "Black Stone" },
    { id: "blue-sky", name: "Blue Sky" },
    { id: "brown-wood", name: "Brown Wood" },
    { id: "bw-paper", name: "B&W Paper" },
    { id: "gray-iron", name: "Gray Iron" },
    { id: "green-forest", name: "Green Forest" },
    { id: "navy-ocean", name: "Navy Ocean" },
    { id: "pink-bubblegum", name: "Pink Bubblegum" },
    { id: "purple-mist", name: "Purple Mist" },
    { id: "red-wine", name: "Red Wine" },
    { id: "teal-pond", name: "Teal Pond" },
    { id: "yellow-sand", name: "Yellow Sand" }
  ],
  PIECE_SETS: [
    { id: "standard", name: "Standard (Wikipedia)" },
    { id: "staunty", name: "Staunty" }
  ]
};

// node_modules/cm-chessboard/src/extensions/arrows/Arrows.js
var ARROW_TYPE = {
  default: { class: "arrow-success" },
  success: { class: "arrow-success" },
  secondary: { class: "arrow-secondary" },
  warning: { class: "arrow-warning" },
  info: { class: "arrow-info" },
  danger: { class: "arrow-danger" }
};

class Arrows extends Extension {
  constructor(chessboard, props = {}) {
    super(chessboard);
    this.registerExtensionPoint(EXTENSION_POINT.afterRedrawBoard, () => {
      this.onRedrawBoard();
    });
    this.props = {
      sprite: "extensions/arrows/arrows.svg",
      slice: "arrowDefault",
      headSize: 7,
      offsetFrom: 0,
      offsetTo: 0.55
    };
    Object.assign(this.props, props);
    if (this.chessboard.props.assetsCache) {
      this.chessboard.view.cacheSpriteToDiv("cm-chessboard-arrows", this.getSpriteUrl());
    }
    chessboard.addArrow = this.addArrow.bind(this);
    chessboard.getArrows = this.getArrows.bind(this);
    chessboard.removeArrows = this.removeArrows.bind(this);
    this.arrowGroup = Svg.addElement(chessboard.view.markersTopLayer, "g", { class: "arrows" });
    this.arrows = [];
  }
  onRedrawBoard() {
    while (this.arrowGroup.firstChild) {
      this.arrowGroup.removeChild(this.arrowGroup.firstChild);
    }
    this.arrows.forEach((arrow) => {
      this.drawArrow(arrow);
    });
  }
  drawArrow(arrow) {
    const view = this.chessboard.view;
    const arrowsGroup = Svg.addElement(this.arrowGroup, "g");
    arrowsGroup.setAttribute("data-arrow", arrow.from + arrow.to);
    arrowsGroup.setAttribute("class", "arrow " + arrow.type.class);
    const ptFrom = view.squareToPoint(arrow.from);
    const ptTo = view.squareToPoint(arrow.to);
    const spriteUrl = this.chessboard.props.assetsCache ? "" : this.getSpriteUrl();
    const defs = Svg.addElement(arrowsGroup, "defs");
    const id = "arrow-" + arrow.from + arrow.to;
    const marker = Svg.addElement(defs, "marker", {
      id,
      markerWidth: this.props.headSize,
      markerHeight: this.props.headSize,
      refX: 20,
      refY: 20,
      viewBox: "0 0 40 40",
      orient: "auto",
      class: "arrow-head"
    });
    Svg.addElement(marker, "use", {
      href: `${spriteUrl}#${this.props.slice}`
    });
    const cx1 = ptFrom.x + view.squareWidth / 2;
    const cy1 = ptFrom.y + view.squareHeight / 2;
    const cx2 = ptTo.x + view.squareWidth / 2;
    const cy2 = ptTo.y + view.squareHeight / 2;
    const dx = cx2 - cx1;
    const dy = cy2 - cy1;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const halfMin = Math.min(view.squareWidth, view.squareHeight) / 2;
    const clamp01 = (v) => Math.max(0, Math.min(1, v));
    const rFrom = halfMin * clamp01(this.props.offsetFrom);
    const rTo = halfMin * clamp01(this.props.offsetTo);
    const x1 = cx1 + ux * rFrom;
    const y1 = cy1 + uy * rFrom;
    const x2 = cx2 - ux * rTo;
    const y2 = cy2 - uy * rTo;
    const width = (view.scalingX + view.scalingY) / 2 * 8;
    let lineFill = Svg.addElement(arrowsGroup, "line");
    lineFill.setAttribute("x1", x1.toString());
    lineFill.setAttribute("x2", x2.toString());
    lineFill.setAttribute("y1", y1.toString());
    lineFill.setAttribute("y2", y2.toString());
    lineFill.setAttribute("class", "arrow-line");
    lineFill.setAttribute("marker-end", "url(#" + id + ")");
    lineFill.setAttribute("stroke-width", width + "px");
  }
  addArrow(type, from, to) {
    this.arrows.push(new Arrow(from, to, type));
    this.chessboard.view.redrawBoard();
  }
  getArrows(type = undefined, from = undefined, to = undefined) {
    let arrows = [];
    this.arrows.forEach((arrow) => {
      if (arrow.matches(from, to, type)) {
        arrows.push(arrow);
      }
    });
    return arrows;
  }
  removeArrows(type = undefined, from = undefined, to = undefined) {
    this.arrows = this.arrows.filter((arrow) => !arrow.matches(from, to, type));
    this.chessboard.view.redrawBoard();
  }
  getSpriteUrl() {
    if (Utils.isAbsoluteUrl(this.props.sprite)) {
      return this.props.sprite;
    } else {
      return this.chessboard.props.assetsUrl + this.props.sprite;
    }
  }
}

class Arrow {
  constructor(from, to, type) {
    this.from = from;
    this.to = to;
    this.type = type;
  }
  matches(from = undefined, to = undefined, type = undefined) {
    if (from && from !== this.from) {
      return false;
    }
    if (to && to !== this.to) {
      return false;
    }
    return !(type && type !== this.type);
  }
}

// src/extensions/RightClickAnnotator.js
var ARROW_TYPE2 = {
  success: { class: "arrow-success" },
  warning: { class: "arrow-warning" },
  info: { class: "arrow-info" },
  danger: { class: "arrow-danger" }
};
var MARKER_TYPE2 = {
  success: { class: "marker-circle-success", slice: "markerCircle" },
  warning: { class: "marker-circle-warning", slice: "markerCircle" },
  info: { class: "marker-circle-info", slice: "markerCircle" },
  danger: { class: "marker-circle-danger", slice: "markerCircle" }
};

class RightClickAnnotator extends Extension {
  constructor(chessboard, props = {}) {
    super(chessboard);
    this.props = props || {};
    if (!this.chessboard.getExtension(Arrows)) {
      this.chessboard.addExtension(Arrows);
    }
    if (!this.chessboard.getExtension(Markers)) {
      this.chessboard.addExtension(Markers);
    }
    this.onContextMenu = this.onContextMenu.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.dragStart = undefined;
    this.previewActiveTo = undefined;
    this.chessboard.context.addEventListener("contextmenu", this.onContextMenu);
    this.chessboard.context.addEventListener("mousedown", this.onMouseDown);
    this.chessboard.context.addEventListener("mousemove", this.onMouseMove);
    this.chessboard.context.addEventListener("mouseup", this.onMouseUp);
    this.chessboard.context.addEventListener("mouseleave", this.onMouseUp);
    this.registerExtensionPoint(EXTENSION_POINT.destroy, () => {
      this.chessboard.context.removeEventListener("contextmenu", this.onContextMenu);
      this.chessboard.context.removeEventListener("mousedown", this.onMouseDown);
      this.chessboard.context.removeEventListener("mousemove", this.onMouseMove);
      this.chessboard.context.removeEventListener("mouseup", this.onMouseUp);
      this.chessboard.context.removeEventListener("mouseleave", this.onMouseUp);
    });
    this.chessboard.getAnnotations = this.getAnnotations.bind(this);
    this.chessboard.setAnnotations = this.setAnnotations.bind(this);
  }
  getAnnotations() {
    return {
      arrows: this.chessboard.getArrows(),
      markers: this.chessboard.getMarkers()
    };
  }
  setAnnotations(annotations) {
    this.chessboard.removeArrows();
    this.chessboard.removeMarkers();
    if (annotations.arrows) {
      for (const arrow of annotations.arrows) {
        this.chessboard.addArrow(arrow.type, arrow.from, arrow.to);
      }
    }
    if (annotations.markers) {
      for (const marker of annotations.markers) {
        this.chessboard.addMarker(marker.type, marker.square);
      }
    }
  }
  onContextMenu(event) {
    event.preventDefault();
  }
  onMouseDown(event) {
    if (event.button !== 2) {
      return;
    }
    const square = this.findSquareFromEvent(event);
    if (!square) {
      return;
    }
    this.dragStart = {
      square,
      modifiers: {
        alt: event.altKey,
        shift: event.shiftKey
      }
    };
  }
  onMouseUp(event) {
    this.removePreviewArrow();
    const start = this.dragStart;
    this.dragStart = undefined;
    if (!start || event.button !== 2) {
      return;
    }
    const endSquare = this.findSquareFromEvent(event) || start.square;
    const colorKey = this.modifiersToColorKey(start.modifiers);
    const { arrowType, circleType } = this.typesForColorKey(colorKey);
    if (start.square && endSquare && start.square !== endSquare) {
      const existing = this.chessboard.getArrows(arrowType, start.square, endSquare);
      if (existing && existing.length > 0) {
        this.chessboard.removeArrows(arrowType, start.square, endSquare);
      } else {
        this.chessboard.removeArrows(undefined, start.square, endSquare);
        this.chessboard.addArrow(arrowType, start.square, endSquare);
      }
    } else if (start.square) {
      const existingMarkers = this.chessboard.getMarkers(circleType, start.square);
      if (existingMarkers && existingMarkers.length > 0) {
        this.chessboard.removeMarkers(circleType, start.square);
      } else {
        this.chessboard.removeMarkers(undefined, start.square);
        this.chessboard.addMarker(circleType, start.square);
      }
    }
  }
  findSquareFromEvent(event) {
    const target = event.target;
    if (!target)
      return;
    if (target.getAttribute?.("data-square")) {
      return target.getAttribute("data-square");
    }
    const el = target.closest?.("[data-square]");
    return el ? el.getAttribute("data-square") : undefined;
  }
  onMouseMove(event) {
    if (!this.dragStart) {
      return;
    }
    const toSquare = this.findSquareFromEvent(event);
    if (!toSquare || toSquare === this.dragStart.square) {
      return;
    }
    if (this.previewActiveTo === toSquare) {
      return;
    }
    this.previewActiveTo = toSquare;
    const colorKey = this.modifiersToColorKey(this.dragStart.modifiers);
    const { arrowType } = this.typesForColorKey(colorKey);
    this.drawPreviewArrow(this.dragStart.square, toSquare, arrowType);
  }
  drawPreviewArrow(from, to, type) {
    if (!this.previewArrowType) {
      this.previewArrowType = { ...type };
    }
    this.chessboard.removeArrows(this.previewArrowType);
    this.chessboard.addArrow(this.previewArrowType, from, to);
  }
  removePreviewArrow() {
    if (this.previewArrowType) {
      this.chessboard.removeArrows(this.previewArrowType);
      this.previewArrowType = undefined;
    }
  }
  modifiersToColorKey(modifiers) {
    if (modifiers.shift && modifiers.alt)
      return "warning";
    if (modifiers.shift)
      return "danger";
    if (modifiers.alt)
      return "info";
    return "success";
  }
  typesForColorKey(colorKey) {
    switch (colorKey) {
      case "info":
        return { arrowType: ARROW_TYPE2.info, circleType: MARKER_TYPE2.info };
      case "danger":
        return { arrowType: ARROW_TYPE2.danger, circleType: MARKER_TYPE2.danger };
      case "warning":
        return {
          arrowType: ARROW_TYPE2.warning,
          circleType: MARKER_TYPE2.warning
        };
      default:
        return {
          arrowType: ARROW_TYPE2.success,
          circleType: MARKER_TYPE2.success
        };
    }
  }
}

// node_modules/cm-engine-runner/src/EngineRunner.js
var ENGINE_STATE = {
  LOADING: 1,
  LOADED: 2,
  READY: 3,
  THINKING: 4
};

class EngineRunner {
  constructor(props) {
    this.props = {
      debug: false,
      responseDelay: 1000
    };
    Object.assign(this.props, props);
    this.engineState = ENGINE_STATE.LOADING;
    this.initialized = this.init();
  }
  init() {
    return Promise.reject("you have to implement `init()` in the EngineRunner");
  }
  calculateMove(fen, props = {}) {}
}

// node_modules/cm-engine-runner/src/StockfishRunner.js
var LEVELS = {
  1: [3, 0],
  2: [3, 1],
  3: [4, 2],
  4: [5, 3],
  5: [5, 4],
  6: [6, 5],
  7: [7, 6],
  8: [8, 7],
  9: [9, 8],
  10: [10, 10],
  11: [11, 11],
  12: [12, 12],
  13: [13, 13],
  14: [14, 14],
  15: [15, 15],
  16: [16, 16],
  17: [17, 17],
  18: [18, 18],
  19: [19, 19],
  20: [20, 20]
};

class StockfishRunner extends EngineRunner {
  constructor(props) {
    super(props);
  }
  init() {
    return new Promise((resolve, reject) => {
      const listener = (event) => {
        this.workerListener(event);
        if (this.engineState === ENGINE_STATE.READY) {
          resolve();
        }
      };
      if (this.engineWorker) {
        this.engineWorker.removeEventListener("message", listener);
        this.engineWorker.terminate();
      }
      this.engineWorker = new Worker(this.props.workerUrl);
      this.engineWorker.addEventListener("message", listener);
      this.engineWorker.addEventListener("error", () => {
        reject(new Error("Engine worker failed to load from: " + this.props.workerUrl));
      });
      this.uciCmd("uci");
      this.uciCmd("ucinewgame");
      this.uciCmd("isready");
    });
  }
  workerListener(event) {
    if (this.props.debug) {
      if (event.type === "message") {
        console.log("  msg", event.data);
      } else {
        console.log(event);
      }
    }
    const line = event.data;
    if (line === "uciok") {
      this.engineState = ENGINE_STATE.LOADED;
    } else if (line === "readyok") {
      this.engineState = ENGINE_STATE.READY;
    } else {
      let match = line.match(/^info .*\bscore (\w+) (-?\d+)/);
      if (match) {
        const score = parseInt(match[2], 10);
        let tmpScore;
        if (match[1] === "cp") {
          tmpScore = (score / 100).toFixed(1);
        } else if (match[1] === "mate") {
          tmpScore = "#" + Math.abs(score);
        }
        this.score = tmpScore;
      }
      match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?( ponder ([a-h][1-8])?([a-h][1-8])?)?/);
      if (match) {
        this.engineState = ENGINE_STATE.READY;
        if (match[4] !== undefined) {
          this.ponder = { from: match[5], to: match[6] };
        } else {
          this.ponder = undefined;
        }
        const move = { from: match[1], to: match[2], promotion: match[3], score: this.score, ponder: this.ponder };
        this.moveResponse(move);
      } else {
        match = line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/);
        if (match) {
          this.engineState = ENGINE_STATE.THINKING;
          this.search = "Depth: " + match[1] + " Nps: " + match[2];
        }
      }
    }
  }
  calculateMove(fen, props = { level: 4 }) {
    this.engineState = ENGINE_STATE.THINKING;
    this.score = undefined;
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(async () => {
        resolve();
      }, this.props.responseDelay);
    });
    const calculationPromise = new Promise((resolve) => {
      setTimeout(() => {
        this.uciCmd("setoption name Skill Level value " + LEVELS[props.level][1]);
        this.uciCmd("position fen " + fen);
        this.uciCmd("go depth " + LEVELS[props.level][0]);
        this.moveResponse = (move) => {
          resolve(move);
        };
      }, this.props.responseDelay);
    });
    return new Promise((resolve) => {
      Promise.all([this.initialisation, timeoutPromise, calculationPromise]).then((values) => {
        this.engineState = ENGINE_STATE.READY;
        resolve(values[2]);
      });
    });
  }
  uciCmd(cmd) {
    if (this.props.debug) {
      console.log("  uci ->", cmd);
    }
    this.engineWorker.postMessage(cmd);
  }
}

// src/CustomStockfishRunner.js
class CustomStockfishRunner extends StockfishRunner {
  calculateMove(fen, props = { skillLevel: 20, depth: 16 }) {
    this.engineState = ENGINE_STATE.THINKING;
    return new Promise((resolve) => {
      setTimeout(async () => {
        await this.initialized;
        if (props.threads !== undefined) {
          this.uciCmd(`setoption name Threads value ${props.threads}`);
        }
        if (props.elo !== undefined) {
          this.uciCmd("setoption name UCI_LimitStrength value true");
          this.uciCmd(`setoption name UCI_Elo value ${props.elo}`);
        } else {
          this.uciCmd("setoption name UCI_LimitStrength value false");
          if (props.skillLevel !== undefined) {
            this.uciCmd(`setoption name Skill Level value ${props.skillLevel}`);
          }
        }
        this.uciCmd(`position fen ${fen}`);
        if (props.moveTime !== undefined) {
          this.uciCmd(`go movetime ${props.moveTime}`);
        } else {
          this.uciCmd(`go depth ${props.depth || 16}`);
        }
        this.moveResponse = (move) => {
          this.engineState = ENGINE_STATE.READY;
          resolve(move);
        };
      }, this.props.responseDelay);
    });
  }
  static parseInfoLine(line) {
    let score = "n/a";
    let scoreRaw = 0;
    if (line.includes("score cp")) {
      const match = line.match(/score cp (-?\d+)/);
      if (match) {
        scoreRaw = parseInt(match[1], 10);
        score = (scoreRaw / 100).toFixed(2);
        if (scoreRaw > 0)
          score = `+${score}`;
      }
    } else if (line.includes("score mate")) {
      const match = line.match(/score mate (-?\d+)/);
      if (match) {
        scoreRaw = parseInt(match[1], 10) * 1e4;
        score = `M${match[1]}`;
      }
    }
    const depthMatch = line.match(/depth (\d+)/);
    const depth = depthMatch ? depthMatch[1] : "?";
    const pvIndex = line.indexOf(" pv ");
    const pvRaw = pvIndex !== -1 ? line.substring(pvIndex + 4) : "";
    const pvArray = pvRaw.split(" ");
    const pvtruncated = pvArray.slice(0, 5).join(" ");
    return {
      score,
      scoreRaw,
      depth,
      pv: pvtruncated,
      pvArray
    };
  }
}

// src/StockfishAnalysis.js
class StockfishAnalysis {
  constructor(container, props = {}) {
    this.container = container;
    this.board = props.board;
    this.props = {
      worker: ENGINE_CONFIG.WORKER_PATH,
      depth: ENGINE_CONFIG.DEFAULT_ANALYSIS_DEPTH,
      skillLevel: ENGINE_CONFIG.ANALYSIS_SKILL_LEVEL,
      multiPV: 2,
      ...props
    };
    this.runner = new CustomStockfishRunner({
      workerUrl: this.props.worker,
      debug: false
    });
    this.lines = {};
    this.showArrows = true;
    this.i18n = props.i18n || { t: (key) => key };
    this.i18n.load({
      en: {
        analysis: "Analysis",
        eval: "Eval",
        depth: "D",
        line: "Line"
      }
    });
    this.runner.initialized.then(() => {
      console.log("Analysis Engine Initialized");
    });
    this.renderUI();
    this.workerListener = (e) => {
      const line = e.data;
      if (line.startsWith("info") && line.includes("pv")) {
        this.updateDisplay(line);
      }
    };
  }
  renderUI() {
    this.container.innerHTML = "";
    const controls = document.createElement("div");
    controls.className = "d-flex justify-content-between align-items-center mb-2";
    const title = document.createElement("strong");
    title.innerText = this.i18n.t("analysis");
    controls.appendChild(title);
    const toggleContainer = document.createElement("div");
    toggleContainer.className = "form-check form-switch ms-2";
    toggleContainer.innerHTML = `
            <input class="form-check-input" type="checkbox" id="toggle-analysis-arrows">
            <label class="form-check-label small" for="toggle-analysis-arrows">Arrows</label>
        `;
    const toggleInput = toggleContainer.querySelector("input");
    toggleInput.checked = this.showArrows;
    toggleInput.addEventListener("change", (e) => {
      this.showArrows = e.target.checked;
      if (!this.showArrows) {
        this.board.removeArrows(ARROW_TYPE.danger);
        this.board.removeArrows(ARROW_TYPE.info);
      } else {
        this.drawAnalysisArrows();
      }
    });
    controls.appendChild(toggleContainer);
    this.container.appendChild(controls);
    this.outputTable = document.createElement("table");
    this.outputTable.className = "table table-sm table-light table-striped mt-1";
    this.outputTable.style.fontSize = "0.85em";
    this.outputTable.innerHTML = `
            <thead>
                <tr>
                    <th style="width: 20%">${this.i18n.t("eval")}</th>
                    <th style="width: 15%">${this.i18n.t("depth")}</th>
                    <th>${this.i18n.t("line")}</th>
                </tr>
            </thead>
            <tbody id="analysis-lines"></tbody>
        `;
    this.container.appendChild(this.outputTable);
    this.tbody = this.outputTable.querySelector("tbody");
  }
  setDepth(depth) {
    this.props.depth = depth;
  }
  async analyze(fen) {
    this.lastFen = fen;
    await this.runner.initialized;
    this.lines = {};
    this.renderLines();
    this.tbody.classList.add("text-muted");
    this.runner.moveResponse = () => {};
    this.runner.uciCmd(`stop`);
    this.runner.uciCmd(`setoption name Skill Level value ${this.props.skillLevel}`);
    this.runner.uciCmd(`setoption name MultiPV value ${this.props.multiPV}`);
    this.runner.uciCmd(`position fen ${fen}`);
    this.runner.uciCmd(`go depth ${this.props.depth}`);
    if (!this.loggerAttached && this.runner.engineWorker) {
      this.runner.engineWorker.addEventListener("message", this.workerListener);
      this.loggerAttached = true;
    }
  }
  updateDisplay(infoLine) {
    const multipvMatch = infoLine.match(/multipv (\d+)/);
    const multipv = multipvMatch ? parseInt(multipvMatch[1], 10) : 1;
    if (multipv > this.props.multiPV)
      return;
    const data = CustomStockfishRunner.parseInfoLine(infoLine);
    const turn = new Chess2(this.lastFen).turn();
    if (turn === "b") {
      data.scoreRaw = -data.scoreRaw;
      if (typeof data.score === "string" && !data.score.startsWith("M")) {
        let val = parseFloat(data.score);
        val = -val;
        data.score = (val > 0 ? "+" : "") + val.toFixed(2);
      } else if (data.score.startsWith("M")) {
        const mateIn = parseInt(data.score.substring(1), 10);
        data.score = `M${-mateIn}`;
      }
    }
    this.lines[multipv] = data;
    this.renderLines();
    this.tbody.classList.remove("text-muted");
    if (this.showArrows) {
      this.drawAnalysisArrows();
    }
  }
  drawAnalysisArrows() {
    if (!this.board)
      return;
    this.board.removeArrows(ARROW_TYPE.danger);
    this.board.removeArrows(ARROW_TYPE.info);
    if (this.lines[1]) {
      this.drawArrowForPV(this.lines[1], ARROW_TYPE.danger);
    }
    if (this.lines[2]) {
      this.drawArrowForPV(this.lines[2], ARROW_TYPE.info);
    }
  }
  drawArrowForPV(data, type) {
    if (data.pvArray && data.pvArray.length > 0) {
      const moveStr = data.pvArray[0];
      const from = moveStr.substring(0, 2);
      const to = moveStr.substring(2, 4);
      this.board.addArrow(type, from, to);
    }
  }
  hint() {
    if (this.lines[1]) {
      this.drawArrowForPV(this.lines[1], ARROW_TYPE.danger);
      if (!this.showArrows) {
        setTimeout(() => {
          this.board.removeArrows(ARROW_TYPE.danger);
        }, 3000);
      }
    }
  }
  renderLines() {
    this.tbody.innerHTML = "";
    Object.keys(this.lines).sort().forEach((key) => {
      const line = this.lines[key];
      const tr = document.createElement("tr");
      const scoreClass = "text-dark";
      tr.innerHTML = `
                <td class="${scoreClass} font-weight-bold">${line.score}</td>
                <td>${line.depth}</td>
                <td class="text-dark" style="word-break: break-word;">${line.pv}</td>
            `;
      this.tbody.appendChild(tr);
    });
  }
  destroy() {
    this.runner.uciCmd("stop");
    if (this.runner.engineWorker) {
      this.runner.engineWorker.removeEventListener("message", this.workerListener);
      this.runner.engineWorker.terminate();
    }
    this.container.innerHTML = "";
  }
}

// node_modules/bootstrap-show-modal/src/ShowModal.js
class Modal {
  constructor(props) {
    this.props = {
      title: "",
      body: "",
      footer: "",
      modalClass: "fade",
      modalDialogClass: "",
      headerClass: "",
      bodyClass: "",
      footerClass: "",
      theme: undefined,
      options: {
        backdrop: "static"
      },
      draggable: false,
      onCreate: null,
      onShown: null,
      onDispose: null,
      onSubmit: null
    };
    Object.assign(this.props, props);
    this.id = "bootstrap-show-modal-" + i;
    i++;
    this.show();
    if (this.props.onCreate) {
      this.props.onCreate(this);
    }
  }
  createContainerElement() {
    const self = this;
    this.element = document.createElement("div");
    this.element.id = this.id;
    let cssClass = "modal " + this.props.modalClass;
    if (this.props.theme === "dark") {
      cssClass += " text-light";
    }
    this.element.setAttribute("class", cssClass);
    this.element.setAttribute("tabindex", "-1");
    this.element.setAttribute("role", "dialog");
    this.element.setAttribute("aria-labelledby", this.id);
    if (this.props.theme) {
      this.element.setAttribute("data-bs-theme", this.props.theme);
    }
    this.element.innerHTML = `
<div class="modal-dialog ${this.props.modalDialogClass}" role="document">
    <div class="modal-content">
    <div class="modal-header ${this.props.headerClass}">
        <h5 class="modal-title"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body ${this.props.bodyClass}"></div>
    <div class="modal-footer ${this.props.footerClass}"></div>
    </div>
</div>`;
    document.body.appendChild(this.element);
    this.titleElement = this.element.querySelector(".modal-title");
    this.bodyElement = this.element.querySelector(".modal-body");
    this.footerElement = this.element.querySelector(".modal-footer");
    this.element.addEventListener("hidden.bs.modal", function() {
      self.dispose();
    });
    this.element.addEventListener("shown.bs.modal", function() {
      if (self.props.onShown) {
        self.props.onShown(self);
      }
    });
  }
  show() {
    if (!this.element) {
      this.createContainerElement();
      if (this.props.options) {
        const modalInstance = new bootstrap.Modal(this.element, this.props.options);
        if (modalInstance) {
          modalInstance.show();
        }
      } else {
        const modalInstance = new bootstrap.Modal(this.element);
        if (modalInstance) {
          modalInstance.show();
        }
      }
    } else {
      const modalInstance = bootstrap.Modal.getInstance(this.element);
      if (modalInstance) {
        modalInstance.show();
      }
    }
    if (this.props.title) {
      this.titleElement.style.display = "";
      this.titleElement.innerHTML = this.props.title;
    } else {
      this.titleElement.style.display = "none";
    }
    if (this.props.body) {
      this.bodyElement.style.display = "";
      this.bodyElement.innerHTML = this.props.body;
    } else {
      this.bodyElement.style.display = "none";
    }
    if (this.props.footer) {
      this.footerElement.style.display = "";
      this.footerElement.innerHTML = this.props.footer;
    } else {
      this.footerElement.style.display = "none";
    }
  }
  hide() {
    const modalInstance = bootstrap.Modal.getInstance(this.element);
    if (modalInstance) {
      modalInstance.hide();
    }
  }
  dispose() {
    const modalInstance = bootstrap.Modal.getInstance(this.element);
    if (modalInstance) {
      modalInstance.dispose();
    }
    document.body.removeChild(this.element);
    if (this.props.onDispose) {
      this.props.onDispose(this);
    }
  }
}
var i = 0;
bootstrap.showModal = (props) => {
  if (props.buttons) {
    let footer = "";
    for (let key in props.buttons) {
      const buttonText = props.buttons[key];
      footer += `<button type="button" class="btn btn-primary" data-value="${key}" data-bs-dismiss="modal">${buttonText}</button>`;
    }
    props.footer = footer;
  }
  return new Modal(props);
};
bootstrap.showAlert = (props) => {
  props.buttons = { OK: "OK" };
  return bootstrap.showModal(props);
};
bootstrap.showConfirm = (props) => {
  props.footer = `<button class="btn btn-secondary btn-false btn-cancel">${props.textFalse}</button><button class="btn btn-primary btn-true">${props.textTrue}</button>`;
  props.onCreate = (modal) => {
    const modalInstance = bootstrap.Modal.getInstance(modal.element);
    modal.element.querySelector(".btn-false").addEventListener("click", function() {
      if (modalInstance) {
        modalInstance.hide();
      }
      modal.props.onSubmit(false, modal);
    });
    modal.element.querySelector(".btn-true").addEventListener("click", function() {
      if (modalInstance) {
        modalInstance.hide();
      }
      modal.props.onSubmit(true, modal);
    });
  };
  return bootstrap.showModal(props);
};

// node_modules/chess-console/src/components/GameControl/NewGameDialog.js
class NewGameDialog {
  constructor(module, props) {
    const i18n = module.i18n;
    i18n.load({
      de: {
        color: "Farbe",
        white: "Weiss",
        black: "Schwarz",
        auto: "automatisch"
      },
      en: {
        color: "Color",
        white: "White",
        black: "Black",
        auto: "automatically"
      }
    }).then(() => {
      const newGameColor = module.persistence.loadValue("newGameColor");
      const colorOptions = [
        { value: "auto", label: i18n.t("auto") },
        { value: "w", label: i18n.t("white") },
        { value: "b", label: i18n.t("black") }
      ];
      props.modalClass = "fade";
      props.body = html`
                <form class="form">
                    <div class="form-group row">
                        <div class="col-3">
                            <label for="color" class="col-form-label">${i18n.t("color")}</label>
                        </div>
                        <div class="col-9">
                            <select id="color" class="form-select">
                                ${colorOptions.map((opt) => html`
                                    <option value="${opt.value}" ${opt.value === newGameColor ? "selected" : ""}>
                                        ${opt.label}
                                    </option>
                                `)}
                            </select>
                        </div>
                    </div>
                </form>
            `;
      props.footer = html`
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${i18n.t("cancel")}</button>
                <button type="submit" class="btn btn-primary">${i18n.t("ok")}</button>
            `;
      props.onCreate = (modal) => {
        modal.element.querySelector("button[type='submit']").addEventListener("click", function(event) {
          event.preventDefault();
          const formElement = modal.element.querySelector(".form");
          let color = formElement.querySelector("#color").value;
          module.persistence.saveValue("newGameColor", color);
          if (color !== COLOR.white && color !== COLOR.black) {
            color = module.props.playerColor === COLOR.white ? COLOR.black : COLOR.white;
          }
          modal.hide();
          module.newGame({ playerColor: color });
        });
      };
      bootstrap.showModal(props);
    });
  }
}

// node_modules/chess-console/src/components/GameControl/GameControl.js
class GameControl {
  constructor(chessConsole, props) {
    this.context = chessConsole.componentContainers.controlButtons;
    this.chessConsole = chessConsole;
    this.props = props;
    const i18n = chessConsole.i18n;
    i18n.load({
      de: {
        start_game: "Ein neues Spiel starten",
        undo_move: "Zug zurück nehmen"
      },
      en: {
        start_game: "Start a new game",
        undo_move: "Undo move"
      }
    }).then(() => {
      this.btnUndoMove = DomUtils.createElement(`<button type="button" title="${i18n.t("undo_move")}" class="btn btn-icon btn-light undoMove"><i class="fa fa-fw fa-undo-alt" aria-hidden="true"></i></button>`);
      this.btnStartNewGame = DomUtils.createElement(`<button type="button" title="${i18n.t("start_game")}" class="btn btn-icon btn-light startNewGame"><i class="fa fa-fw fa-plus" aria-hidden="true"></i></button>`);
      this.context.appendChild(this.btnUndoMove);
      this.context.appendChild(this.btnStartNewGame);
      this.btnUndoMove.addEventListener("click", () => {
        this.chessConsole.undoMove();
      });
      this.btnStartNewGame.addEventListener("click", () => {
        this.showNewGameDialog();
      });
      this.chessConsole.state.observeChess(() => {
        this.setButtonStates();
      });
      this.setButtonStates();
    });
  }
  showNewGameDialog() {
    new NewGameDialog(this.chessConsole, {
      title: this.chessConsole.i18n.t("start_game")
    });
  }
  setButtonStates() {
    if (this.chessConsole.state.chess.plyCount() < 2) {
      this.btnUndoMove.disabled = true;
    } else {
      this.btnUndoMove.disabled = false;
    }
  }
}

// src/StockfishNewGameDialog.js
class StockfishNewGameDialog {
  constructor(chessConsole, props) {
    this.chessConsole = chessConsole;
    this.props = props;
    const i18n = chessConsole.i18n;
    i18n.load({
      en: {
        color: "Color",
        white: "White",
        black: "Black",
        skillLevel: "Skill Level",
        depth: "Fixed Depth",
        elo: "Elo Rating",
        moveTime: "Thinking Time",
        searchMode: "Search Mode",
        modeSkill: "By Skill Level",
        modeElo: "By Elo Rating",
        modeDepth: "By Fixed Depth",
        modeTime: "By Thinking Time",
        gameMode: "Game Mode",
        pve: "vs. Stockfish (Engine)",
        pvp: "Local PvP (Pass-and-Play)",
        analysis: "Analysis Mode",
        styling: "Styling",
        gameSettings: "Game Settings",
        boardTheme: "Board Theme",
        pieceSet: "Piece Set",
        "theme_black-stone": "Black Stone",
        "theme_blue-sky": "Blue Sky",
        "theme_brown-wood": "Brown Wood",
        "theme_bw-paper": "B&W Paper",
        "theme_gray-iron": "Gray Iron",
        "theme_green-forest": "Green Forest",
        "theme_navy-ocean": "Navy Ocean",
        "theme_pink-bubblegum": "Pink Bubblegum",
        "theme_purple-mist": "Purple Mist",
        "theme_red-wine": "Red Wine",
        "theme_teal-pond": "Teal Pond",
        "theme_yellow-sand": "Yellow Sand",
        pieces_standard: "Standard",
        pieces_staunty: "Staunty",
        engineSettings: "Engine search settings",
        analysisSettings: "Analysis settings",
        analysisDepthLabel: "Analysis Engine Depth"
      }
    }).then(() => {
      const newGameColor = chessConsole.persistence.loadValue("newGameColor") || "w";
      const savedSkillLevel = chessConsole.persistence.loadValue("skillLevel") || ENGINE_CONFIG.DEFAULT_SKILL_LEVEL;
      const savedDepth = chessConsole.persistence.loadValue("depth") || ENGINE_CONFIG.DEFAULT_DEPTH;
      const savedAnalysisDepth = chessConsole.persistence.loadValue("analysisDepth") || ENGINE_CONFIG.DEFAULT_ANALYSIS_DEPTH;
      const savedMode = chessConsole.persistence.loadValue("gameMode") || "pve";
      const savedElo = chessConsole.persistence.loadValue("elo") || ENGINE_CONFIG.DEFAULT_ELO;
      const savedMoveTime = chessConsole.persistence.loadValue("moveTime") || ENGINE_CONFIG.DEFAULT_MOVE_TIME;
      const savedSearchMode = chessConsole.persistence.loadValue("searchMode") || "skill";
      const savedTheme = chessConsole.persistence.loadValue("boardTheme") || STYLING_CONFIG.DEFAULT_THEME;
      const savedPieceSet = chessConsole.persistence.loadValue("pieceSet") || STYLING_CONFIG.DEFAULT_PIECES;
      props.modalClass = "fade";
      props.body = `<div class="form">
                        <ul class="nav nav-tabs mb-3" id="dialogTabs" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="game-tab" data-bs-toggle="tab" data-bs-target="#game-pane" type="button" role="tab">${i18n.t("gameSettings")}</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="styling-tab" data-bs-toggle="tab" data-bs-target="#styling-pane" type="button" role="tab">${i18n.t("styling")}</button>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <!-- Game Settings Tab -->
                            <div class="tab-pane fade show active" id="game-pane" role="tabpanel">
                                <div class="row mb-3">
                                    <label for="gameMode" class="col-sm-4 col-form-label">${i18n.t("gameMode")}</label>
                                    <div class="col-sm-8">
                                        <select id="gameMode" class="form-select">
                                            <option value="pve" ${savedMode === "pve" ? "selected" : ""}>${i18n.t("pve")}</option>
                                            <option value="pvp" ${savedMode === "pvp" ? "selected" : ""}>${i18n.t("pvp")}</option>
                                            <option value="analysis" ${savedMode === "analysis" ? "selected" : ""}>${i18n.t("analysis")}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mb-3" id="colorRow">
                                    <label for="color" class="col-sm-4 col-form-label">${i18n.t("color")}</label>
                                    <div class="col-sm-8">
                                        <select id="color" class="form-select">
                                            <option value="w" ${newGameColor === "w" ? "selected" : ""}>${i18n.t("white")}</option>
                                            <option value="b" ${newGameColor === "b" ? "selected" : ""}>${i18n.t("black")}</option>
                                        </select>
                                    </div>
                                </div>
                                <hr>
                                <h6>${i18n.t("engineSettings")}</h6>
                                <div class="row mb-3" id="searchModeRow">
                                    <label for="searchMode" class="col-sm-4 col-form-label">${i18n.t("searchMode")}</label>
                                    <div class="col-sm-8">
                                        <select class="form-select" id="searchMode">
                                            <option value="skill" ${savedSearchMode === "skill" ? "selected" : ""}>${i18n.t("modeSkill")}</option>
                                            <option value="elo" ${savedSearchMode === "elo" ? "selected" : ""}>${i18n.t("modeElo")}</option>
                                            <option value="depth" ${savedSearchMode === "depth" ? "selected" : ""}>${i18n.t("modeDepth")}</option>
                                            <option value="time" ${savedSearchMode === "time" ? "selected" : ""}>${i18n.t("modeTime")}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mb-3" id="skillLevelRow">
                                    <label for="skillLevel" class="col-sm-4 col-form-label">${i18n.t("skillLevel")} (${ENGINE_CONFIG.MIN_SKILL_LEVEL}-${ENGINE_CONFIG.MAX_SKILL_LEVEL})</label>
                                    <div class="col-sm-8">
                                        <input type="range" class="form-range" id="skillLevel" min="${ENGINE_CONFIG.MIN_SKILL_LEVEL}" max="${ENGINE_CONFIG.MAX_SKILL_LEVEL}" value="${savedSkillLevel}">
                                        <div class="text-muted small">Value: <span id="skillLevelValue">${savedSkillLevel}</span></div>
                                    </div>
                                </div>
                                <div class="row mb-3" id="eloRow">
                                    <label for="elo" class="col-sm-4 col-form-label">${i18n.t("elo")} (${ENGINE_CONFIG.MIN_ELO}-${ENGINE_CONFIG.MAX_ELO})</label>
                                    <div class="col-sm-8">
                                        <input type="range" class="form-range" id="elo" min="${ENGINE_CONFIG.MIN_ELO}" max="${ENGINE_CONFIG.MAX_ELO}" value="${savedElo}">
                                        <div class="text-muted small">Value: <span id="eloValue">${savedElo}</span></div>
                                    </div>
                                </div>
                                <div class="row mb-3" id="depthRow">
                                    <label for="depth" class="col-sm-4 col-form-label">${i18n.t("depth")} (${ENGINE_CONFIG.MIN_DEPTH}-${ENGINE_CONFIG.MAX_DEPTH})</label>
                                    <div class="col-sm-8">
                                        <input type="range" class="form-range" id="depth" min="${ENGINE_CONFIG.MIN_DEPTH}" max="${ENGINE_CONFIG.MAX_DEPTH}" value="${savedDepth}">
                                        <div class="text-muted small">Value: <span id="depthValue">${savedDepth}</span></div>
                                    </div>
                                </div>
                                <div class="row mb-3" id="moveTimeRow">
                                    <label for="moveTime" class="col-sm-4 col-form-label">${i18n.t("moveTime")} (${ENGINE_CONFIG.MIN_MOVE_TIME}-${ENGINE_CONFIG.MAX_MOVE_TIME}ms)</label>
                                    <div class="col-sm-8">
                                        <input type="range" class="form-range" id="moveTime" min="${ENGINE_CONFIG.MIN_MOVE_TIME}" max="${ENGINE_CONFIG.MAX_MOVE_TIME}" step="100" value="${savedMoveTime}">
                                        <div class="text-muted small">Value: <span id="moveTimeValue">${savedMoveTime}</span>ms</div>
                                    </div>
                                </div>
                                <hr>
                                <h6>${i18n.t("analysisSettings")}</h6>
                                <div class="row mb-3">
                                    <label for="analysisDepth" class="col-sm-4 col-form-label">${i18n.t("analysisDepthLabel")} (${ENGINE_CONFIG.MIN_ANALYSIS_DEPTH}-${ENGINE_CONFIG.MAX_ANALYSIS_DEPTH})</label>
                                    <div class="col-sm-8">
                                        <input type="range" class="form-range" id="analysisDepth" min="${ENGINE_CONFIG.MIN_ANALYSIS_DEPTH}" max="${ENGINE_CONFIG.MAX_ANALYSIS_DEPTH}" value="${savedAnalysisDepth}">
                                        <div class="text-muted small">Value: <span id="analysisDepthValue">${savedAnalysisDepth}</span></div>
                                    </div>
                                </div>
                            </div>
                            <!-- Styling Tab -->
                            <div class="tab-pane fade" id="styling-pane" role="tabpanel">
                                <div class="row mb-3">
                                    <label for="boardTheme" class="col-sm-4 col-form-label">${i18n.t("boardTheme")}</label>
                                    <div class="col-sm-8">
                                        <select id="boardTheme" class="form-select">
                                            ${STYLING_CONFIG.THEMES.map((t) => `<option value="${t.id}" ${savedTheme === t.id ? "selected" : ""}>${i18n.t(`theme_${t.id}`)}</option>`).join("")}
                                        </select>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label for="pieceSet" class="col-sm-4 col-form-label">${i18n.t("pieceSet")}</label>
                                    <div class="col-sm-8">
                                        <select id="pieceSet" class="form-select">
                                            ${STYLING_CONFIG.PIECE_SETS.map((p) => `<option value="${p.id}" ${savedPieceSet === p.id ? "selected" : ""}>${i18n.t(`pieces_${p.id}`)}</option>`).join("")}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
      props.footer = `<button type="button" class="btn btn-link" data-bs-dismiss="modal">${i18n.t("cancel")}</button>
            <button type="submit" class="btn btn-primary">${i18n.t("ok")}</button>`;
      props.onCreate = (modal2) => {
        const $form = $(modal2.element).find(".form");
        const $gameMode = $form.find("#gameMode");
        const $searchMode = $form.find("#searchMode");
        const $skillLevelInput = $form.find("#skillLevel");
        const $skillLevelValue = $form.find("#skillLevelValue");
        const $depthInput = $form.find("#depth");
        const $depthValue = $form.find("#depthValue");
        const $eloInput = $form.find("#elo");
        const $eloValue = $form.find("#eloValue");
        const $moveTimeInput = $form.find("#moveTime");
        const $moveTimeValue = $form.find("#moveTimeValue");
        const $analysisDepthInput = $form.find("#analysisDepth");
        const $analysisDepthValue = $form.find("#analysisDepthValue");
        const $searchModeRow = $form.find("#searchModeRow");
        const $skillLevelRow = $form.find("#skillLevelRow");
        const $depthRow = $form.find("#depthRow");
        const $eloRow = $form.find("#eloRow");
        const $moveTimeRow = $form.find("#moveTimeRow");
        const $colorRow = $form.find("#colorRow");
        const updateVisibility = () => {
          const gameMode = $gameMode.val();
          if (gameMode === "analysis" || gameMode === "pvp") {
            $colorRow.hide();
            $searchModeRow.hide();
            $skillLevelRow.hide();
            $depthRow.hide();
            $eloRow.hide();
            $moveTimeRow.hide();
          } else {
            $colorRow.show();
            $searchModeRow.show();
            const searchModeValue = $searchMode.val();
            $skillLevelRow.toggle(searchModeValue === "skill");
            $eloRow.toggle(searchModeValue === "elo");
            $depthRow.toggle(searchModeValue === "depth");
            $moveTimeRow.toggle(searchModeValue === "time");
          }
        };
        $gameMode.on("change", updateVisibility);
        $searchMode.on("change", updateVisibility);
        updateVisibility();
        $skillLevelInput.on("input", () => {
          $skillLevelValue.text($skillLevelInput.val());
        });
        $depthInput.on("input", () => {
          $depthValue.text($depthInput.val());
        });
        $eloInput.on("input", () => {
          $eloValue.text($eloInput.val());
        });
        $moveTimeInput.on("input", () => {
          $moveTimeValue.text($moveTimeInput.val());
        });
        $analysisDepthInput.on("input", () => {
          $analysisDepthValue.text($analysisDepthInput.val());
        });
        $(modal2.element).on("click", "button[type='submit']", (event) => {
          event.preventDefault();
          const color = $form.find("#color").val();
          chessConsole.persistence.saveValue("newGameColor", color);
          const skillLevel = parseInt($skillLevelInput.val(), 10);
          const depth = parseInt($depthInput.val(), 10);
          const elo = parseInt($eloInput.val(), 10);
          const moveTime = parseInt($moveTimeInput.val(), 10);
          const analysisDepth = parseInt($analysisDepthInput.val(), 10);
          const gameMode = $gameMode.val();
          const searchMode = $searchMode.val();
          const boardTheme = $form.find("#boardTheme").val();
          const pieceSet = $form.find("#pieceSet").val();
          chessConsole.persistence.saveValue("elo", elo);
          chessConsole.persistence.saveValue("moveTime", moveTime);
          chessConsole.persistence.saveValue("gameMode", gameMode);
          chessConsole.persistence.saveValue("analysisDepth", analysisDepth);
          chessConsole.persistence.saveValue("searchMode", searchMode);
          chessConsole.persistence.saveValue("boardTheme", boardTheme);
          chessConsole.persistence.saveValue("pieceSet", pieceSet);
          modal2.hide();
          chessConsole.newGame({
            playerColor: color,
            engineSkillLevel: skillLevel,
            engineDepth: depth,
            engineElo: elo,
            engineMoveTime: moveTime,
            engineSearchMode: searchMode,
            analysisDepth,
            gameMode,
            boardTheme,
            pieceSet
          });
        });
      };
      const modalId = "new-game-modal";
      let modalElement = document.getElementById(modalId);
      if (!modalElement) {
        modalElement = document.createElement("div");
        modalElement.id = modalId;
        modalElement.className = "modal fade";
        modalElement.setAttribute("tabindex", "-1");
        modalElement.setAttribute("aria-hidden", "true");
        document.body.appendChild(modalElement);
      }
      modalElement.innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${props.title || "New Game"}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">${props.body}</div>
                        <div class="modal-footer">${props.footer}</div>
                    </div>
                </div>
            `;
      const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
      if (props.onCreate) {
        props.onCreate({
          element: modalElement,
          hide: () => modal.hide()
        });
      }
      modal.show();
      modalElement.addEventListener("hidden.bs.modal", () => {
        if (chessConsole.components?.board?.elements?.chessboard) {
          chessConsole.components.board.elements.chessboard.focus();
        }
      }, { once: true });
    });
  }
}

// src/StockfishGameControl.js
class StockfishGameControl extends GameControl {
  constructor(chessConsole, props) {
    super(chessConsole, props);
    this.chessConsole.i18n.load({
      en: {
        hint: "Hint",
        swap_sides: "Swap Sides",
        setup_import: "Setup / Import",
        clear_annotations: "Clear Annotations"
      }
    }).then(() => {
      this.$btnSetup = $(`<button type="button" id="btn-setup" class="btn btn-icon btn-primary" title="${this.chessConsole.i18n.t("setup_import")}"><i class="fas fa-paste"></i></button>`);
      this.$btnClearAnnotations = $(`<button type="button" id="btn-clear-annotations" class="btn btn-icon btn-danger" title="${this.chessConsole.i18n.t("clear_annotations")}"><i class="fas fa-eraser"></i></button>`);
      this.$btnHint = $(`<button type="button" id="btn-hint" class="btn btn-icon btn-warning" title="${this.chessConsole.i18n.t("hint")}"><i class="fas fa-lightbulb"></i></button>`);
      this.$btnSwapSides = $(`<button type="button" id="btn-swap-sides" class="btn btn-icon btn-secondary" title="${this.chessConsole.i18n.t("swap_sides")}"><i class="fas fa-retweet"></i></button>`);
      this.context.appendChild(this.$btnSetup[0]);
      this.context.appendChild(this.$btnClearAnnotations[0]);
      this.context.appendChild(this.$btnHint[0]);
      this.context.appendChild(this.$btnSwapSides[0]);
      const icon = this.btnStartNewGame.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-plus");
        icon.classList.add("fa-cog");
      }
    });
  }
  showNewGameDialog() {
    new StockfishNewGameDialog(this.chessConsole, {
      title: this.chessConsole.i18n.t("start_game"),
      player: this.props.player
    });
  }
  setAnalysis(analysis) {
    this.analysis = analysis;
  }
}

// node_modules/cm-polyglot/lib/stakelbase/Book.js
class BookEntry {
  constructor(bookdata, ofs) {
    this.ofs = ofs;
    let key = BigInt(0);
    let i2;
    let byt;
    for (i2 = 0;i2 < 8; ++i2) {
      byt = bookdata.charCodeAt(ofs++);
      key = key << BigInt(8) | BigInt(byt);
    }
    this.key = key;
    let raw_move = 0;
    for (i2 = 0;i2 < 2; ++i2) {
      byt = bookdata.charCodeAt(ofs++);
      raw_move = raw_move << 8 | byt;
    }
    this.raw_move = raw_move;
    let weight = 0;
    for (i2 = 0;i2 < 2; ++i2) {
      byt = bookdata.charCodeAt(ofs++);
      weight = weight << 8 | byt;
    }
    this.weight = weight;
    let learn = 0;
    for (i2 = 0;i2 < 4; ++i2) {
      byt = bookdata.charCodeAt(ofs++);
      learn = learn << 8 | byt;
    }
    this.learn = learn;
  }
  get_key() {
    return this.key;
  }
  get_from_row() {
    return this.raw_move >> 9 & 7;
  }
  get_from_col() {
    return this.raw_move >> 6 & 7;
  }
  get_to_row() {
    return this.raw_move >> 3 & 7;
  }
  get_to_col() {
    return this.raw_move & 7;
  }
  get_promo_piece() {
    return this.raw_move >> 12 & 7;
  }
  isOOW() {
    return this.raw_move === 263;
  }
  isOOB() {
    return this.raw_move === 3903;
  }
  isOOOW() {
    return this.raw_move === 256;
  }
  isOOOB() {
    return this.raw_move === 3896;
  }
}

class Book {
  constructor(bookdata) {
    this.bookdata = bookdata;
    this.cache = [];
    if (this.bookdata.length >= 32) {
      this.first = new BookEntry(this.bookdata, 0);
      this.last = new BookEntry(this.bookdata, this.get_last_index());
    } else {
      this.first = null;
      this.last = null;
    }
  }
  get_length() {
    return this.bookdata.length / 16;
  }
  get_last_index() {
    return this.get_length() - 1;
  }
  get_offset(idx) {
    return idx * 16;
  }
  get_entry(idx) {
    let e;
    if (this.cache[idx] === undefined) {
      e = new BookEntry(this.bookdata, this.get_offset(idx));
      this.cache[idx] = e;
    } else {
      e = this.cache[idx];
    }
    return e;
  }
  find_first_hash(weed) {
    if (this.first === null || this.last === null) {
      return -1;
    }
    if (weed < this.first || weed > this.last) {
      return -1;
    }
    if (weed === this.first) {
      return 0;
    }
    let i0 = 0;
    let i1 = this.bookdata.length / 16 - 1;
    let i2 = i1;
    let ky = 0n;
    if (weed !== this.last) {
      while (i1 - i0 > 1) {
        i2 = Math.floor((i0 + i1) / 2);
        const e = this.get_entry(i2);
        ky = e.get_key();
        if (ky === weed) {
          break;
        }
        if (ky < weed) {
          i0 = i2;
        } else {
          i1 = i2;
        }
      }
    }
    if (ky !== weed) {
      return -1;
    }
    while (i2 > 0) {
      if (this.get_entry(i2 - 1).get_key() === weed) {
        i2 = i2 - 1;
      } else {
        break;
      }
    }
    return i2;
  }
  get_all_moves(weed) {
    let i2 = this.find_first_hash(weed);
    if (i2 < 0) {
      return [];
    }
    const lst = [];
    let e = this.get_entry(i2);
    while (e !== undefined && e.get_key() === weed) {
      lst.push(e);
      e = this.get_entry(++i2);
    }
    return lst;
  }
}

// node_modules/cm-polyglot/lib/stakelbase/KeyGenerator.js
var random64 = [
  0x9D39247E33776D41n,
  0x2AF7398005AAA5C7n,
  0x44DB015024623547n,
  0x9C15F73E62A76AE2n,
  0x75834465489C0C89n,
  0x3290AC3A203001BFn,
  0x0FBBAD1F61042279n,
  0xE83A908FF2FB60CAn,
  0x0D7E765D58755C10n,
  0x1A083822CEAFE02Dn,
  0x9605D5F0E25EC3B0n,
  0xD021FF5CD13A2ED5n,
  0x40BDF15D4A672E32n,
  0x011355146FD56395n,
  0x5DB4832046F3D9E5n,
  0x239F8B2D7FF719CCn,
  0x05D1A1AE85B49AA1n,
  0x679F848F6E8FC971n,
  0x7449BBFF801FED0Bn,
  0x7D11CDB1C3B7ADF0n,
  0x82C7709E781EB7CCn,
  0xF3218F1C9510786Cn,
  0x331478F3AF51BBE6n,
  0x4BB38DE5E7219443n,
  0xAA649C6EBCFD50FCn,
  0x8DBD98A352AFD40Bn,
  0x87D2074B81D79217n,
  0x19F3C751D3E92AE1n,
  0xB4AB30F062B19ABFn,
  0x7B0500AC42047AC4n,
  0xC9452CA81A09D85Dn,
  0x24AA6C514DA27500n,
  0x4C9F34427501B447n,
  0x14A68FD73C910841n,
  0xA71B9B83461CBD93n,
  0x03488B95B0F1850Fn,
  0x637B2B34FF93C040n,
  0x09D1BC9A3DD90A94n,
  0x3575668334A1DD3Bn,
  0x735E2B97A4C45A23n,
  0x18727070F1BD400Bn,
  0x1FCBACD259BF02E7n,
  0xD310A7C2CE9B6555n,
  0xBF983FE0FE5D8244n,
  0x9F74D14F7454A824n,
  0x51EBDC4AB9BA3035n,
  0x5C82C505DB9AB0FAn,
  0xFCF7FE8A3430B241n,
  0x3253A729B9BA3DDEn,
  0x8C74C368081B3075n,
  0xB9BC6C87167C33E7n,
  0x7EF48F2B83024E20n,
  0x11D505D4C351BD7Fn,
  0x6568FCA92C76A243n,
  0x4DE0B0F40F32A7B8n,
  0x96D693460CC37E5Dn,
  0x42E240CB63689F2Fn,
  0x6D2BDCDAE2919661n,
  0x42880B0236E4D951n,
  0x5F0F4A5898171BB6n,
  0x39F890F579F92F88n,
  0x93C5B5F47356388Bn,
  0x63DC359D8D231B78n,
  0xEC16CA8AEA98AD76n,
  0x5355F900C2A82DC7n,
  0x07FB9F855A997142n,
  0x5093417AA8A7ED5En,
  0x7BCBC38DA25A7F3Cn,
  0x19FC8A768CF4B6D4n,
  0x637A7780DECFC0D9n,
  0x8249A47AEE0E41F7n,
  0x79AD695501E7D1E8n,
  0x14ACBAF4777D5776n,
  0xF145B6BECCDEA195n,
  0xDABF2AC8201752FCn,
  0x24C3C94DF9C8D3F6n,
  0xBB6E2924F03912EAn,
  0x0CE26C0B95C980D9n,
  0xA49CD132BFBF7CC4n,
  0xE99D662AF4243939n,
  0x27E6AD7891165C3Fn,
  0x8535F040B9744FF1n,
  0x54B3F4FA5F40D873n,
  0x72B12C32127FED2Bn,
  0xEE954D3C7B411F47n,
  0x9A85AC909A24EAA1n,
  0x70AC4CD9F04F21F5n,
  0xF9B89D3E99A075C2n,
  0x87B3E2B2B5C907B1n,
  0xA366E5B8C54F48B8n,
  0xAE4A9346CC3F7CF2n,
  0x1920C04D47267BBDn,
  0x87BF02C6B49E2AE9n,
  0x092237AC237F3859n,
  0xFF07F64EF8ED14D0n,
  0x8DE8DCA9F03CC54En,
  0x9C1633264DB49C89n,
  0xB3F22C3D0B0B38EDn,
  0x390E5FB44D01144Bn,
  0x5BFEA5B4712768E9n,
  0x1E1032911FA78984n,
  0x9A74ACB964E78CB3n,
  0x4F80F7A035DAFB04n,
  0x6304D09A0B3738C4n,
  0x2171E64683023A08n,
  0x5B9B63EB9CEFF80Cn,
  0x506AACF489889342n,
  0x1881AFC9A3A701D6n,
  0x6503080440750644n,
  0xDFD395339CDBF4A7n,
  0xEF927DBCF00C20F2n,
  0x7B32F7D1E03680ECn,
  0xB9FD7620E7316243n,
  0x05A7E8A57DB91B77n,
  0xB5889C6E15630A75n,
  0x4A750A09CE9573F7n,
  0xCF464CEC899A2F8An,
  0xF538639CE705B824n,
  0x3C79A0FF5580EF7Fn,
  0xEDE6C87F8477609Dn,
  0x799E81F05BC93F31n,
  0x86536B8CF3428A8Cn,
  0x97D7374C60087B73n,
  0xA246637CFF328532n,
  0x043FCAE60CC0EBA0n,
  0x920E449535DD359En,
  0x70EB093B15B290CCn,
  0x73A1921916591CBDn,
  0x56436C9FE1A1AA8Dn,
  0xEFAC4B70633B8F81n,
  0xBB215798D45DF7AFn,
  0x45F20042F24F1768n,
  0x930F80F4E8EB7462n,
  0xFF6712FFCFD75EA1n,
  0xAE623FD67468AA70n,
  0xDD2C5BC84BC8D8FCn,
  0x7EED120D54CF2DD9n,
  0x22FE545401165F1Cn,
  0xC91800E98FB99929n,
  0x808BD68E6AC10365n,
  0xDEC468145B7605F6n,
  0x1BEDE3A3AEF53302n,
  0x43539603D6C55602n,
  0xAA969B5C691CCB7An,
  0xA87832D392EFEE56n,
  0x65942C7B3C7E11AEn,
  0xDED2D633CAD004F6n,
  0x21F08570F420E565n,
  0xB415938D7DA94E3Cn,
  0x91B859E59ECB6350n,
  0x10CFF333E0ED804An,
  0x28AED140BE0BB7DDn,
  0xC5CC1D89724FA456n,
  0x5648F680F11A2741n,
  0x2D255069F0B7DAB3n,
  0x9BC5A38EF729ABD4n,
  0xEF2F054308F6A2BCn,
  0xAF2042F5CC5C2858n,
  0x480412BAB7F5BE2An,
  0xAEF3AF4A563DFE43n,
  0x19AFE59AE451497Fn,
  0x52593803DFF1E840n,
  0xF4F076E65F2CE6F0n,
  0x11379625747D5AF3n,
  0xBCE5D2248682C115n,
  0x9DA4243DE836994Fn,
  0x066F70B33FE09017n,
  0x4DC4DE189B671A1Cn,
  0x51039AB7712457C3n,
  0xC07A3F80C31FB4B4n,
  0xB46EE9C5E64A6E7Cn,
  0xB3819A42ABE61C87n,
  0x21A007933A522A20n,
  0x2DF16F761598AA4Fn,
  0x763C4A1371B368FDn,
  0xF793C46702E086A0n,
  0xD7288E012AEB8D31n,
  0xDE336A2A4BC1C44Bn,
  0x0BF692B38D079F23n,
  0x2C604A7A177326B3n,
  0x4850E73E03EB6064n,
  0xCFC447F1E53C8E1Bn,
  0xB05CA3F564268D99n,
  0x9AE182C8BC9474E8n,
  0xA4FC4BD4FC5558CAn,
  0xE755178D58FC4E76n,
  0x69B97DB1A4C03DFEn,
  0xF9B5B7C4ACC67C96n,
  0xFC6A82D64B8655FBn,
  0x9C684CB6C4D24417n,
  0x8EC97D2917456ED0n,
  0x6703DF9D2924E97En,
  0xC547F57E42A7444En,
  0x78E37644E7CAD29En,
  0xFE9A44E9362F05FAn,
  0x08BD35CC38336615n,
  0x9315E5EB3A129ACEn,
  0x94061B871E04DF75n,
  0xDF1D9F9D784BA010n,
  0x3BBA57B68871B59Dn,
  0xD2B7ADEEDED1F73Fn,
  0xF7A255D83BC373F8n,
  0xD7F4F2448C0CEB81n,
  0xD95BE88CD210FFA7n,
  0x336F52F8FF4728E7n,
  0xA74049DAC312AC71n,
  0xA2F61BB6E437FDB5n,
  0x4F2A5CB07F6A35B3n,
  0x87D380BDA5BF7859n,
  0x16B9F7E06C453A21n,
  0x7BA2484C8A0FD54En,
  0xF3A678CAD9A2E38Cn,
  0x39B0BF7DDE437BA2n,
  0xFCAF55C1BF8A4424n,
  0x18FCF680573FA594n,
  0x4C0563B89F495AC3n,
  0x40E087931A00930Dn,
  0x8CFFA9412EB642C1n,
  0x68CA39053261169Fn,
  0x7A1EE967D27579E2n,
  0x9D1D60E5076F5B6Fn,
  0x3810E399B6F65BA2n,
  0x32095B6D4AB5F9B1n,
  0x35CAB62109DD038An,
  0xA90B24499FCFAFB1n,
  0x77A225A07CC2C6BDn,
  0x513E5E634C70E331n,
  0x4361C0CA3F692F12n,
  0xD941ACA44B20A45Bn,
  0x528F7C8602C5807Bn,
  0x52AB92BEB9613989n,
  0x9D1DFA2EFC557F73n,
  0x722FF175F572C348n,
  0x1D1260A51107FE97n,
  0x7A249A57EC0C9BA2n,
  0x04208FE9E8F7F2D6n,
  0x5A110C6058B920A0n,
  0x0CD9A497658A5698n,
  0x56FD23C8F9715A4Cn,
  0x284C847B9D887AAEn,
  0x04FEABFBBDB619CBn,
  0x742E1E651C60BA83n,
  0x9A9632E65904AD3Cn,
  0x881B82A13B51B9E2n,
  0x506E6744CD974924n,
  0xB0183DB56FFC6A79n,
  0x0ED9B915C66ED37En,
  0x5E11E86D5873D484n,
  0xF678647E3519AC6En,
  0x1B85D488D0F20CC5n,
  0xDAB9FE6525D89021n,
  0x0D151D86ADB73615n,
  0xA865A54EDCC0F019n,
  0x93C42566AEF98FFBn,
  0x99E7AFEABE000731n,
  0x48CBFF086DDF285An,
  0x7F9B6AF1EBF78BAFn,
  0x58627E1A149BBA21n,
  0x2CD16E2ABD791E33n,
  0xD363EFF5F0977996n,
  0x0CE2A38C344A6EEDn,
  0x1A804AADB9CFA741n,
  0x907F30421D78C5DEn,
  0x501F65EDB3034D07n,
  0x37624AE5A48FA6E9n,
  0x957BAF61700CFF4En,
  0x3A6C27934E31188An,
  0xD49503536ABCA345n,
  0x088E049589C432E0n,
  0xF943AEE7FEBF21B8n,
  0x6C3B8E3E336139D3n,
  0x364F6FFA464EE52En,
  0xD60F6DCEDC314222n,
  0x56963B0DCA418FC0n,
  0x16F50EDF91E513AFn,
  0xEF1955914B609F93n,
  0x565601C0364E3228n,
  0xECB53939887E8175n,
  0xBAC7A9A18531294Bn,
  0xB344C470397BBA52n,
  0x65D34954DAF3CEBDn,
  0xB4B81B3FA97511E2n,
  0xB422061193D6F6A7n,
  0x071582401C38434Dn,
  0x7A13F18BBEDC4FF5n,
  0xBC4097B116C524D2n,
  0x59B97885E2F2EA28n,
  0x99170A5DC3115544n,
  0x6F423357E7C6A9F9n,
  0x325928EE6E6F8794n,
  0xD0E4366228B03343n,
  0x565C31F7DE89EA27n,
  0x30F5611484119414n,
  0xD873DB391292ED4Fn,
  0x7BD94E1D8E17DEBCn,
  0xC7D9F16864A76E94n,
  0x947AE053EE56E63Cn,
  0xC8C93882F9475F5Fn,
  0x3A9BF55BA91F81CAn,
  0xD9A11FBB3D9808E4n,
  0x0FD22063EDC29FCAn,
  0xB3F256D8ACA0B0B9n,
  0xB03031A8B4516E84n,
  0x35DD37D5871448AFn,
  0xE9F6082B05542E4En,
  0xEBFAFA33D7254B59n,
  0x9255ABB50D532280n,
  0xB9AB4CE57F2D34F3n,
  0x693501D628297551n,
  0xC62C58F97DD949BFn,
  0xCD454F8F19C5126An,
  0xBBE83F4ECC2BDECBn,
  0xDC842B7E2819E230n,
  0xBA89142E007503B8n,
  0xA3BC941D0A5061CBn,
  0xE9F6760E32CD8021n,
  0x09C7E552BC76492Fn,
  0x852F54934DA55CC9n,
  0x8107FCCF064FCF56n,
  0x098954D51FFF6580n,
  0x23B70EDB1955C4BFn,
  0xC330DE426430F69Dn,
  0x4715ED43E8A45C0An,
  0xA8D7E4DAB780A08Dn,
  0x0572B974F03CE0BBn,
  0xB57D2E985E1419C7n,
  0xE8D9ECBE2CF3D73Fn,
  0x2FE4B17170E59750n,
  0x11317BA87905E790n,
  0x7FBF21EC8A1F45ECn,
  0x1725CABFCB045B00n,
  0x964E915CD5E2B207n,
  0x3E2B8BCBF016D66Dn,
  0xBE7444E39328A0ACn,
  0xF85B2B4FBCDE44B7n,
  0x49353FEA39BA63B1n,
  0x1DD01AAFCD53486An,
  0x1FCA8A92FD719F85n,
  0xFC7C95D827357AFAn,
  0x18A6A990C8B35EBDn,
  0xCCCB7005C6B9C28Dn,
  0x3BDBB92C43B17F26n,
  0xAA70B5B4F89695A2n,
  0xE94C39A54A98307Fn,
  0xB7A0B174CFF6F36En,
  0xD4DBA84729AF48ADn,
  0x2E18BC1AD9704A68n,
  0x2DE0966DAF2F8B1Cn,
  0xB9C11D5B1E43A07En,
  0x64972D68DEE33360n,
  0x94628D38D0C20584n,
  0xDBC0D2B6AB90A559n,
  0xD2733C4335C6A72Fn,
  0x7E75D99D94A70F4Dn,
  0x6CED1983376FA72Bn,
  0x97FCAACBF030BC24n,
  0x7B77497B32503B12n,
  0x8547EDDFB81CCB94n,
  0x79999CDFF70902CBn,
  0xCFFE1939438E9B24n,
  0x829626E3892D95D7n,
  0x92FAE24291F2B3F1n,
  0x63E22C147B9C3403n,
  0xC678B6D860284A1Cn,
  0x5873888850659AE7n,
  0x0981DCD296A8736Dn,
  0x9F65789A6509A440n,
  0x9FF38FED72E9052Fn,
  0xE479EE5B9930578Cn,
  0xE7F28ECD2D49EECDn,
  0x56C074A581EA17FEn,
  0x5544F7D774B14AEFn,
  0x7B3F0195FC6F290Fn,
  0x12153635B2C0CF57n,
  0x7F5126DBBA5E0CA7n,
  0x7A76956C3EAFB413n,
  0x3D5774A11D31AB39n,
  0x8A1B083821F40CB4n,
  0x7B4A38E32537DF62n,
  0x950113646D1D6E03n,
  0x4DA8979A0041E8A9n,
  0x3BC36E078F7515D7n,
  0x5D0A12F27AD310D1n,
  0x7F9D1A2E1EBE1327n,
  0xDA3A361B1C5157B1n,
  0xDCDD7D20903D0C25n,
  0x36833336D068F707n,
  0xCE68341F79893389n,
  0xAB9090168DD05F34n,
  0x43954B3252DC25E5n,
  0xB438C2B67F98E5E9n,
  0x10DCD78E3851A492n,
  0xDBC27AB5447822BFn,
  0x9B3CDB65F82CA382n,
  0xB67B7896167B4C84n,
  0xBFCED1B0048EAC50n,
  0xA9119B60369FFEBDn,
  0x1FFF7AC80904BF45n,
  0xAC12FB171817EEE7n,
  0xAF08DA9177DDA93Dn,
  0x1B0CAB936E65C744n,
  0xB559EB1D04E5E932n,
  0xC37B45B3F8D6F2BAn,
  0xC3A9DC228CAAC9E9n,
  0xF3B8B6675A6507FFn,
  0x9FC477DE4ED681DAn,
  0x67378D8ECCEF96CBn,
  0x6DD856D94D259236n,
  0xA319CE15B0B4DB31n,
  0x073973751F12DD5En,
  0x8A8E849EB32781A5n,
  0xE1925C71285279F5n,
  0x74C04BF1790C0EFEn,
  0x4DDA48153C94938An,
  0x9D266D6A1CC0542Cn,
  0x7440FB816508C4FEn,
  0x13328503DF48229Fn,
  0xD6BF7BAEE43CAC40n,
  0x4838D65F6EF6748Fn,
  0x1E152328F3318DEAn,
  0x8F8419A348F296BFn,
  0x72C8834A5957B511n,
  0xD7A023A73260B45Cn,
  0x94EBC8ABCFB56DAEn,
  0x9FC10D0F989993E0n,
  0xDE68A2355B93CAE6n,
  0xA44CFE79AE538BBEn,
  0x9D1D84FCCE371425n,
  0x51D2B1AB2DDFB636n,
  0x2FD7E4B9E72CD38Cn,
  0x65CA5B96B7552210n,
  0xDD69A0D8AB3B546Dn,
  0x604D51B25FBF70E2n,
  0x73AA8A564FB7AC9En,
  0x1A8C1E992B941148n,
  0xAAC40A2703D9BEA0n,
  0x764DBEAE7FA4F3A6n,
  0x1E99B96E70A9BE8Bn,
  0x2C5E9DEB57EF4743n,
  0x3A938FEE32D29981n,
  0x26E6DB8FFDF5ADFEn,
  0x469356C504EC9F9Dn,
  0xC8763C5B08D1908Cn,
  0x3F6C6AF859D80055n,
  0x7F7CC39420A3A545n,
  0x9BFB227EBDF4C5CEn,
  0x89039D79D6FC5C5Cn,
  0x8FE88B57305E2AB6n,
  0xA09E8C8C35AB96DEn,
  0xFA7E393983325753n,
  0xD6B6D0ECC617C699n,
  0xDFEA21EA9E7557E3n,
  0xB67C1FA481680AF8n,
  0xCA1E3785A9E724E5n,
  0x1CFC8BED0D681639n,
  0xD18D8549D140CAEAn,
  0x4ED0FE7E9DC91335n,
  0xE4DBF0634473F5D2n,
  0x1761F93A44D5AEFEn,
  0x53898E4C3910DA55n,
  0x734DE8181F6EC39An,
  0x2680B122BAA28D97n,
  0x298AF231C85BAFABn,
  0x7983EED3740847D5n,
  0x66C1A2A1A60CD889n,
  0x9E17E49642A3E4C1n,
  0xEDB454E7BADC0805n,
  0x50B704CAB602C329n,
  0x4CC317FB9CDDD023n,
  0x66B4835D9EAFEA22n,
  0x219B97E26FFC81BDn,
  0x261E4E4C0A333A9Dn,
  0x1FE2CCA76517DB90n,
  0xD7504DFA8816EDBBn,
  0xB9571FA04DC089C8n,
  0x1DDC0325259B27DEn,
  0xCF3F4688801EB9AAn,
  0xF4F5D05C10CAB243n,
  0x38B6525C21A42B0En,
  0x36F60E2BA4FA6800n,
  0xEB3593803173E0CEn,
  0x9C4CD6257C5A3603n,
  0xAF0C317D32ADAA8An,
  0x258E5A80C7204C4Bn,
  0x8B889D624D44885Dn,
  0xF4D14597E660F855n,
  0xD4347F66EC8941C3n,
  0xE699ED85B0DFB40Dn,
  0x2472F6207C2D0484n,
  0xC2A1E7B5B459AEB5n,
  0xAB4F6451CC1D45ECn,
  0x63767572AE3D6174n,
  0xA59E0BD101731A28n,
  0x116D0016CB948F09n,
  0x2CF9C8CA052F6E9Fn,
  0x0B090A7560A968E3n,
  0xABEEDDB2DDE06FF1n,
  0x58EFC10B06A2068Dn,
  0xC6E57A78FBD986E0n,
  0x2EAB8CA63CE802D7n,
  0x14A195640116F336n,
  0x7C0828DD624EC390n,
  0xD74BBE77E6116AC7n,
  0x804456AF10F5FB53n,
  0xEBE9EA2ADF4321C7n,
  0x03219A39EE587A30n,
  0x49787FEF17AF9924n,
  0xA1E9300CD8520548n,
  0x5B45E522E4B1B4EFn,
  0xB49C3B3995091A36n,
  0xD4490AD526F14431n,
  0x12A8F216AF9418C2n,
  0x001F837CC7350524n,
  0x1877B51E57A764D5n,
  0xA2853B80F17F58EEn,
  0x993E1DE72D36D310n,
  0xB3598080CE64A656n,
  0x252F59CF0D9F04BBn,
  0xD23C8E176D113600n,
  0x1BDA0492E7E4586En,
  0x21E0BD5026C619BFn,
  0x3B097ADAF088F94En,
  0x8D14DEDB30BE846En,
  0xF95CFFA23AF5F6F4n,
  0x3871700761B3F743n,
  0xCA672B91E9E4FA16n,
  0x64C8E531BFF53B55n,
  0x241260ED4AD1E87Dn,
  0x106C09B972D2E822n,
  0x7FBA195410E5CA30n,
  0x7884D9BC6CB569D8n,
  0x0647DFEDCD894A29n,
  0x63573FF03E224774n,
  0x4FC8E9560F91B123n,
  0x1DB956E450275779n,
  0xB8D91274B9E9D4FBn,
  0xA2EBEE47E2FBFCE1n,
  0xD9F1F30CCD97FB09n,
  0xEFED53D75FD64E6Bn,
  0x2E6D02C36017F67Fn,
  0xA9AA4D20DB084E9Bn,
  0xB64BE8D8B25396C1n,
  0x70CB6AF7C2D5BCF0n,
  0x98F076A4F7A2322En,
  0xBF84470805E69B5Fn,
  0x94C3251F06F90CF3n,
  0x3E003E616A6591E9n,
  0xB925A6CD0421AFF3n,
  0x61BDD1307C66E300n,
  0xBF8D5108E27E0D48n,
  0x240AB57A8B888B20n,
  0xFC87614BAF287E07n,
  0xEF02CDD06FFDB432n,
  0xA1082C0466DF6C0An,
  0x8215E577001332C8n,
  0xD39BB9C3A48DB6CFn,
  0x2738259634305C14n,
  0x61CF4F94C97DF93Dn,
  0x1B6BACA2AE4E125Bn,
  0x758F450C88572E0Bn,
  0x959F587D507A8359n,
  0xB063E962E045F54Dn,
  0x60E8ED72C0DFF5D1n,
  0x7B64978555326F9Fn,
  0xFD080D236DA814BAn,
  0x8C90FD9B083F4558n,
  0x106F72FE81E2C590n,
  0x7976033A39F7D952n,
  0xA4EC0132764CA04Bn,
  0x733EA705FAE4FA77n,
  0xB4D8F77BC3E56167n,
  0x9E21F4F903B33FD9n,
  0x9D765E419FB69F6Dn,
  0xD30C088BA61EA5EFn,
  0x5D94337FBFAF7F5Bn,
  0x1A4E4822EB4D7A59n,
  0x6FFE73E81B637FB3n,
  0xDDF957BC36D8B9CAn,
  0x64D0E29EEA8838B3n,
  0x08DD9BDFD96B9F63n,
  0x087E79E5A57D1D13n,
  0xE328E230E3E2B3FBn,
  0x1C2559E30F0946BEn,
  0x720BF5F26F4D2EAAn,
  0xB0774D261CC609DBn,
  0x443F64EC5A371195n,
  0x4112CF68649A260En,
  0xD813F2FAB7F5C5CAn,
  0x660D3257380841EEn,
  0x59AC2C7873F910A3n,
  0xE846963877671A17n,
  0x93B633ABFA3469F8n,
  0xC0C0F5A60EF4CDCFn,
  0xCAF21ECD4377B28Cn,
  0x57277707199B8175n,
  0x506C11B9D90E8B1Dn,
  0xD83CC2687A19255Fn,
  0x4A29C6465A314CD1n,
  0xED2DF21216235097n,
  0xB5635C95FF7296E2n,
  0x22AF003AB672E811n,
  0x52E762596BF68235n,
  0x9AEBA33AC6ECC6B0n,
  0x944F6DE09134DFB6n,
  0x6C47BEC883A7DE39n,
  0x6AD047C430A12104n,
  0xA5B1CFDBA0AB4067n,
  0x7C45D833AFF07862n,
  0x5092EF950A16DA0Bn,
  0x9338E69C052B8E7Bn,
  0x455A4B4CFE30E3F5n,
  0x6B02E63195AD0CF8n,
  0x6B17B224BAD6BF27n,
  0xD1E0CCD25BB9C169n,
  0xDE0C89A556B9AE70n,
  0x50065E535A213CF6n,
  0x9C1169FA2777B874n,
  0x78EDEFD694AF1EEDn,
  0x6DC93D9526A50E68n,
  0xEE97F453F06791EDn,
  0x32AB0EDB696703D3n,
  0x3A6853C7E70757A7n,
  0x31865CED6120F37Dn,
  0x67FEF95D92607890n,
  0x1F2B1D1F15F6DC9Cn,
  0xB69E38A8965C6B65n,
  0xAA9119FF184CCCF4n,
  0xF43C732873F24C13n,
  0xFB4A3D794A9A80D2n,
  0x3550C2321FD6109Cn,
  0x371F77E76BB8417En,
  0x6BFA9AAE5EC05779n,
  0xCD04F3FF001A4778n,
  0xE3273522064480CAn,
  0x9F91508BFFCFC14An,
  0x049A7F41061A9E60n,
  0xFCB6BE43A9F2FE9Bn,
  0x08DE8A1C7797DA9Bn,
  0x8F9887E6078735A1n,
  0xB5B4071DBFC73A66n,
  0x230E343DFBA08D33n,
  0x43ED7F5A0FAE657Dn,
  0x3A88A0FBBCB05C63n,
  0x21874B8B4D2DBC4Fn,
  0x1BDEA12E35F6A8C9n,
  0x53C065C6C8E63528n,
  0xE34A1D250E7A8D6Bn,
  0xD6B04D3B7651DD7En,
  0x5E90277E7CB39E2Dn,
  0x2C046F22062DC67Dn,
  0xB10BB459132D0A26n,
  0x3FA9DDFB67E2F199n,
  0x0E09B88E1914F7AFn,
  0x10E8B35AF3EEAB37n,
  0x9EEDECA8E272B933n,
  0xD4C718BC4AE8AE5Fn,
  0x81536D601170FC20n,
  0x91B534F885818A06n,
  0xEC8177F83F900978n,
  0x190E714FADA5156En,
  0xB592BF39B0364963n,
  0x89C350C893AE7DC1n,
  0xAC042E70F8B383F2n,
  0xB49B52E587A1EE60n,
  0xFB152FE3FF26DA89n,
  0x3E666E6F69AE2C15n,
  0x3B544EBE544C19F9n,
  0xE805A1E290CF2456n,
  0x24B33C9D7ED25117n,
  0xE74733427B72F0C1n,
  0x0A804D18B7097475n,
  0x57E3306D881EDB4Fn,
  0x4AE7D6A36EB5DBCBn,
  0x2D8D5432157064C8n,
  0xD1E649DE1E7F268Bn,
  0x8A328A1CEDFE552Cn,
  0x07A3AEC79624C7DAn,
  0x84547DDC3E203C94n,
  0x990A98FD5071D263n,
  0x1A4FF12616EEFC89n,
  0xF6F7FD1431714200n,
  0x30C05B1BA332F41Cn,
  0x8D2636B81555A786n,
  0x46C9FEB55D120902n,
  0xCCEC0A73B49C9921n,
  0x4E9D2827355FC492n,
  0x19EBB029435DCB0Fn,
  0x4659D2B743848A2Cn,
  0x963EF2C96B33BE31n,
  0x74F85198B05A2E7Dn,
  0x5A0F544DD2B1FB18n,
  0x03727073C2E134B1n,
  0xC7F6AA2DE59AEA61n,
  0x352787BAA0D7C22Fn,
  0x9853EAB63B5E0B35n,
  0xABBDCDD7ED5C0860n,
  0xCF05DAF5AC8D77B0n,
  0x49CAD48CEBF4A71En,
  0x7A4C10EC2158C4A6n,
  0xD9E92AA246BF719En,
  0x13AE978D09FE5557n,
  0x730499AF921549FFn,
  0x4E4B705B92903BA4n,
  0xFF577222C14F0A3An,
  0x55B6344CF97AAFAEn,
  0xB862225B055B6960n,
  0xCAC09AFBDDD2CDB4n,
  0xDAF8E9829FE96B5Fn,
  0xB5FDFC5D3132C498n,
  0x310CB380DB6F7503n,
  0xE87FBB46217A360En,
  0x2102AE466EBB1148n,
  0xF8549E1A3AA5E00Dn,
  0x07A69AFDCC42261An,
  0xC4C118BFE78FEAAEn,
  0xF9F4892ED96BD438n,
  0x1AF3DBE25D8F45DAn,
  0xF5B4B0B0D2DEEEB4n,
  0x962ACEEFA82E1C84n,
  0x046E3ECAAF453CE9n,
  0xF05D129681949A4Cn,
  0x964781CE734B3C84n,
  0x9C2ED44081CE5FBDn,
  0x522E23F3925E319En,
  0x177E00F9FC32F791n,
  0x2BC60A63A6F3B3F2n,
  0x222BBFAE61725606n,
  0x486289DDCC3D6780n,
  0x7DC7785B8EFDFC80n,
  0x8AF38731C02BA980n,
  0x1FAB64EA29A2DDF7n,
  0xE4D9429322CD065An,
  0x9DA058C67844F20Cn,
  0x24C0E332B70019B0n,
  0x233003B5A6CFE6ADn,
  0xD586BD01C5C217F6n,
  0x5E5637885F29BC2Bn,
  0x7EBA726D8C94094Bn,
  0x0A56A5F0BFE39272n,
  0xD79476A84EE20D06n,
  0x9E4C1269BAA4BF37n,
  0x17EFEE45B0DEE640n,
  0x1D95B0A5FCF90BC6n,
  0x93CBE0B699C2585Dn,
  0x65FA4F227A2B6D79n,
  0xD5F9E858292504D5n,
  0xC2B5A03F71471A6Fn,
  0x59300222B4561E00n,
  0xCE2F8642CA0712DCn,
  0x7CA9723FBB2E8988n,
  0x2785338347F2BA08n,
  0xC61BB3A141E50E8Cn,
  0x150F361DAB9DEC26n,
  0x9F6A419D382595F4n,
  0x64A53DC924FE7AC9n,
  0x142DE49FFF7A7C3Dn,
  0x0C335248857FA9E7n,
  0x0A9C32D5EAE45305n,
  0xE6C42178C4BBB92En,
  0x71F1CE2490D20B07n,
  0xF1BCC3D275AFE51An,
  0xE728E8C83C334074n,
  0x96FBF83A12884624n,
  0x81A1549FD6573DA5n,
  0x5FA7867CAF35E149n,
  0x56986E2EF3ED091Bn,
  0x917F1DD5F8886C61n,
  0xD20D8C88C8FFE65Fn,
  0x31D71DCE64B2C310n,
  0xF165B587DF898190n,
  0xA57E6339DD2CF3A0n,
  0x1EF6E6DBB1961EC9n,
  0x70CC73D90BC26E24n,
  0xE21A6B35DF0C3AD7n,
  0x003A93D8B2806962n,
  0x1C99DED33CB890A1n,
  0xCF3145DE0ADD4289n,
  0xD0E4427A5514FB72n,
  0x77C621CC9FB3A483n,
  0x67A34DAC4356550Bn,
  0xF8D626AAAF278509n
];

class KeyGenerator {
  constructor() {
    this.bail_out = false;
    this.en_passant_row = -1;
    this.en_passant_column = -1;
    this.can_take_ep = false;
  }
  bn2hex(bn, the_size) {
    let hex = bn.toString();
    while (hex.length < the_size) {
      hex = "0" + hex;
    }
    return "0x" + hex;
  }
  xor_with_random(weed, num) {
    return weed ^ random64[num];
  }
  parse_en_passant(str) {
    if (!str || str === "-") {
      return;
    }
    if (str.length !== 2) {
      this.bail_out = true;
      return;
    }
    const col = str.charCodeAt(0) - 97;
    const row = str.charCodeAt(1) - 49;
    if (col < 0 || col > 7 || row < 0 || row > 7) {
      this.bail_out = true;
      return;
    }
    this.en_passant_column = col;
    this.en_passant_row = row;
  }
  hash_color_to_move(arr, str) {
    if (str === "w") {
      return this.xor_with_random(arr, 780);
    } else if (str !== "b") {
      this.bail_out = true;
    }
    return arr;
  }
  hash_castle(weed, str) {
    if (str === "-") {
      return weed;
    }
    if (str.search("K") !== -1) {
      weed = this.xor_with_random(weed, 768);
    }
    if (str.search("Q") !== -1) {
      weed = this.xor_with_random(weed, 769);
    }
    if (str.search("k") !== -1) {
      weed = this.xor_with_random(weed, 770);
    }
    if (str.search("q") !== -1) {
      weed = this.xor_with_random(weed, 771);
    }
    return weed;
  }
  hash_pieces(weed, str) {
    const rows = str.split("/");
    if (rows.length !== 8) {
      this.bail_out = true;
      return weed;
    }
    for (let i2 = 0;i2 < 8; i2++) {
      let col = 0;
      const row = 7 - i2;
      for (let j = 0;j < rows[i2].length; j++) {
        switch (rows[i2][j]) {
          case "p":
            weed = this.xor_with_random(weed, 8 * row + col);
            if (this.en_passant_row === 2 && row === 3 && this.en_passant_column > 0 && col === this.en_passant_column - 1)
              this.can_take_ep = true;
            if (this.en_passant_row === 2 && row === 3 && this.en_passant_column < 7 && col === this.en_passant_column + 1)
              this.can_take_ep = true;
            col++;
            break;
          case "P":
            weed = this.xor_with_random(weed, 64 + 8 * row + col);
            if (this.en_passant_row === 5 && row === 4 && this.en_passant_column > 0 && col === this.en_passant_column - 1)
              this.can_take_ep = true;
            if (this.en_passant_row === 5 && row === 4 && this.en_passant_column < 7 && col === this.en_passant_column + 1)
              this.can_take_ep = true;
            col++;
            break;
          case "n":
            weed = this.xor_with_random(weed, 64 * 2 + 8 * row + col);
            col++;
            break;
          case "N":
            weed = this.xor_with_random(weed, 64 * 3 + 8 * row + col);
            col++;
            break;
          case "b":
            weed = this.xor_with_random(weed, 64 * 4 + 8 * row + col);
            col++;
            break;
          case "B":
            weed = this.xor_with_random(weed, 64 * 5 + 8 * row + col);
            col++;
            break;
          case "r":
            weed = this.xor_with_random(weed, 64 * 6 + 8 * row + col);
            col++;
            break;
          case "R":
            weed = this.xor_with_random(weed, 64 * 7 + 8 * row + col);
            col++;
            break;
          case "q":
            weed = this.xor_with_random(weed, 64 * 8 + 8 * row + col);
            col++;
            break;
          case "Q":
            weed = this.xor_with_random(weed, 64 * 9 + 8 * row + col);
            col++;
            break;
          case "k":
            weed = this.xor_with_random(weed, 64 * 10 + 8 * row + col);
            col++;
            break;
          case "K":
            weed = this.xor_with_random(weed, 64 * 11 + 8 * row + col);
            col++;
            break;
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
            const r = rows[i2].charCodeAt(j) - 48;
            col += r;
            break;
          default:
            this.bail_out = true;
            return weed;
        }
      }
      if (col !== 8)
        this.bail_out = true;
    }
    return weed;
  }
  compute_fen_hash(fenstring) {
    this.en_passant_row = -1;
    this.en_passant_column = -1;
    this.can_take_ep = false;
    let hash = 0n;
    const fen = fenstring.trim().split(" ");
    if (fen.length !== 6) {
      return null;
    }
    this.parse_en_passant(fen[3]);
    hash = this.hash_pieces(hash, fen[0]);
    if (this.can_take_ep) {
      hash = this.xor_with_random(hash, 772 + this.en_passant_column);
    }
    hash = this.hash_color_to_move(hash, fen[1]);
    hash = this.hash_castle(hash, fen[2]);
    return hash;
  }
}

// node_modules/cm-polyglot/src/Polyglot.js
class Polyglot {
  constructor(url) {
    this.book = null;
    this.initialisation = new Promise((resolve) => {
      this.fetchBook(url).then((book) => {
        this.book = book;
        resolve();
      });
    });
    this.keyGenerator = new KeyGenerator;
  }
  entryToMove(bookEntry) {
    const move = {
      from: undefined,
      to: undefined,
      promotion: undefined
    };
    const files = "abcdefgh";
    const promoPieces = " nbrq";
    move.from = files[bookEntry.get_from_col()];
    move.from = "" + move.from + (bookEntry.get_from_row() + 1);
    move.to = files[bookEntry.get_to_col()];
    move.to = "" + move.to + (bookEntry.get_to_row() + 1);
    if (bookEntry.get_promo_piece() > 0) {
      move.promotion = promoPieces[bookEntry.get_promo_piece()];
    }
    if (bookEntry.isOOW()) {
      move.to = "g1";
    } else if (bookEntry.isOOOW()) {
      move.to = "c1";
    } else if (bookEntry.isOOB()) {
      move.to = "g8";
    } else if (bookEntry.isOOOB()) {
      move.to = "c8";
    }
    move.weight = bookEntry.weight;
    return move;
  }
  async getMovesFromFen(fen, weightPower = 0.2) {
    return new Promise((resolve) => {
      this.initialisation.then(() => {
        const hash = this.keyGenerator.compute_fen_hash(fen);
        const bookEntries = this.book.get_all_moves(hash);
        const moves = [];
        let weightSum = 0;
        for (const bookEntry of bookEntries) {
          moves.push(this.entryToMove(bookEntry));
          weightSum += bookEntry.weight;
        }
        for (const move of moves) {
          move.probability = Math.pow(move.weight / weightSum, weightPower).toFixed(1);
        }
        resolve(moves);
      });
    });
  }
  fetchBook(url) {
    return new Promise((resolve, reject) => {
      fetch(url).then((response) => {
        response.blob().then((blob) => {
          let reader = new FileReader;
          reader.readAsBinaryString(blob);
          reader.onload = () => {
            resolve(new Book(reader.result));
          };
          reader.onerror = () => {
            reject(reader.error);
          };
        });
      });
    });
  }
}

// node_modules/cm-engine-runner/src/PolyglotRunner.js
class PolyglotRunner extends EngineRunner {
  constructor(props) {
    super(props);
  }
  init() {
    this.polyglot = new Polyglot(this.props.bookUrl);
    this.polyglot.initialisation.then(() => {
      this.engineState = ENGINE_STATE.READY;
      return Promise.resolve();
    });
  }
  calculateMove(fen, props = {}) {
    this.engineState = ENGINE_STATE.THINKING;
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(async () => {
        resolve();
      }, this.props.responseDelay);
    });
    const calculationPromise = new Promise(async (resolve) => {
      const moves = await this.polyglot.getMovesFromFen(fen);
      if (this.props.debug) {
        console.log(fen, "moves found in opening book", moves);
      }
      const propabilityMatrix = [];
      for (const move of moves) {
        for (let i2 = 0;i2 < move.probability * 10; i2++) {
          propabilityMatrix.push(move);
        }
      }
      const luckyIndex = Math.floor(Math.random() * propabilityMatrix.length);
      resolve(propabilityMatrix[luckyIndex]);
    });
    return new Promise((resolve) => {
      Promise.all([this.initialized, timeoutPromise, calculationPromise]).then((values) => {
        this.engineState = ENGINE_STATE.READY;
        resolve(values[2]);
      });
    });
  }
}

// src/StockfishPlayer.js
class StockfishPlayer extends ChessConsolePlayer {
  constructor(chessConsole, name, props) {
    super(chessConsole, name);
    this.props = {
      debug: false,
      skillLevel: ENGINE_CONFIG.DEFAULT_SKILL_LEVEL,
      depth: ENGINE_CONFIG.DEFAULT_DEPTH,
      elo: ENGINE_CONFIG.DEFAULT_ELO,
      moveTime: ENGINE_CONFIG.DEFAULT_MOVE_TIME,
      threads: props.threads || chessConsole.persistence.loadValue("threads") || ENGINE_CONFIG.DEFAULT_THREADS,
      gameMode: "pve"
    };
    Object.assign(this.props, props);
    this.engineRunner = new CustomStockfishRunner({
      workerUrl: props.worker,
      debug: props.debug
    });
    this.openingRunner = props.book ? new PolyglotRunner({ bookUrl: props.book }) : this.engineRunner;
    this.state = {
      scoreHistory: {},
      score: null,
      skillLevel: parseInt(props.skillLevel, 10),
      depth: parseInt(props.depth, 10),
      elo: props.elo !== undefined ? parseInt(props.elo, 10) : undefined,
      moveTime: props.moveTime !== undefined ? parseInt(props.moveTime, 10) : undefined,
      threads: props.threads || chessConsole.persistence.loadValue("threads") || ENGINE_CONFIG.DEFAULT_THREADS,
      searchMode: props.searchMode || "skill",
      gameMode: props.gameMode || "pve",
      engineState: ENGINE_STATE.LOADING,
      currentRunner: this.openingRunner
    };
    this.initialisation = Promise.all([
      this.openingRunner.initialization,
      this.engineRunner.initialization
    ]);
    this.initialisation.then(() => {
      this.state.engineState = ENGINE_STATE.LOADED;
    });
    this.i18n = chessConsole.i18n;
    this.i18n.load({
      en: {
        score: "Score",
        skillLevel: "Skill Level",
        depth: "Depth",
        engine_failed: "Engine failed to find a move. Please try again or undo."
      }
    });
    this.chessConsole.messageBroker.subscribe(CONSOLE_MESSAGE_TOPICS.load, () => {
      if (this.chessConsole.persistence.loadValue("skillLevel")) {
        this.state.skillLevel = parseInt(this.chessConsole.persistence.loadValue("skillLevel"), 10);
      }
      if (this.chessConsole.persistence.loadValue("depth")) {
        this.state.depth = parseInt(this.chessConsole.persistence.loadValue("depth"), 10);
      }
      if (this.chessConsole.persistence.loadValue("gameMode")) {
        this.state.gameMode = this.chessConsole.persistence.loadValue("gameMode");
      }
      if (this.chessConsole.persistence.loadValue("searchMode")) {
        this.state.searchMode = this.chessConsole.persistence.loadValue("searchMode");
      }
      if (this.chessConsole.persistence.loadValue("scoreHistory")) {
        this.state.scoreHistory = this.chessConsole.persistence.loadValue("scoreHistory");
        let score = this.state.scoreHistory[this.chessConsole.state.plyViewed];
        if (!score && this.chessConsole.state.plyViewed > 0) {
          score = this.state.scoreHistory[this.chessConsole.state.plyViewed - 1];
        }
        this.state.score = score;
      }
    });
    this.chessConsole.messageBroker.subscribe(CONSOLE_MESSAGE_TOPICS.moveUndone, () => {
      this.state.currentRunner = this.openingRunner;
    });
    this.chessConsole.messageBroker.subscribe(CONSOLE_MESSAGE_TOPICS.newGame, (data) => {
      this.state.scoreHistory = {};
      this.state.score = 0;
      if (data.props?.gameMode) {
        this.state.gameMode = data.props.gameMode;
      }
    });
    this.subscriptionInitGame = this.chessConsole.messageBroker.subscribe(CONSOLE_MESSAGE_TOPICS.initGame, (data) => {
      if (data.props.engineThreads) {
        this.state.threads = data.props.engineThreads;
      }
      if (data.props.engineSkillLevel) {
        this.state.skillLevel = data.props.engineSkillLevel;
      }
      if (data.props.engineDepth) {
        this.state.depth = data.props.engineDepth;
      }
      if (data.props.engineElo) {
        this.state.elo = data.props.engineElo;
      }
      if (data.props.engineMoveTime) {
        this.state.moveTime = data.props.engineMoveTime;
      }
      if (data.props.engineSearchMode) {
        this.state.searchMode = data.props.engineSearchMode;
      }
      if (data.props.gameMode) {
        this.state.gameMode = data.props.gameMode;
      }
      if (data.props.playerColor) {
        this.chessConsole.props.playerColor = data.props.playerColor === "w" ? COLOR2.white : COLOR2.black;
      }
      this.state.currentRunner = this.openingRunner;
    });
    Observe.property(this.state, "skillLevel", () => {
      this.chessConsole.persistence.saveValue("skillLevel", this.state.skillLevel);
    });
    Observe.property(this.state, "depth", () => {
      this.chessConsole.persistence.saveValue("depth", this.state.depth);
    });
    Observe.property(this.state, "score", () => {
      this.chessConsole.persistence.saveValue("score", this.state.score);
      this.chessConsole.persistence.saveValue("scoreHistory", this.state.scoreHistory);
    });
    Observe.property(this.state, "threads", () => {
      this.chessConsole.persistence.saveValue("threads", this.state.threads);
    });
  }
  destroy() {
    this.openingRunner.uciCmd("stop");
    this.engineRunner.uciCmd("stop");
    if (this.openingRunner.engineWorker) {
      this.openingRunner.engineWorker.terminate();
    }
    if (this.engineRunner.engineWorker && this.engineRunner.engineWorker !== this.openingRunner.engineWorker) {
      this.engineRunner.engineWorker.terminate();
    }
    this.chessConsole.messageBroker.unsubscribe(this.subscriptionInitGame);
  }
  moveRequest(fen, moveResponse) {
    if (this.state.gameMode === "analysis" || this.state.gameMode === "pvp") {
      const color = this.chessConsole.state.chess.turn() === "w" ? COLOR2.white : COLOR2.black;
      if (!this.chessConsole.state.chess.gameOver()) {
        if (!this.chessConsole.components.board.chessboard.isMoveInputEnabled()) {
          this.chessConsole.components.board.chessboard.enableMoveInput((event) => {
            return this.chessboardMoveInputCallback(event, moveResponse);
          }, color);
        }
      }
      return;
    }
    const turn = this.chessConsole.state.chess.turn();
    const playerColor = this.chessConsole.props.playerColor === COLOR2.white ? "w" : "b";
    if (turn === playerColor) {
      if (!this.chessConsole.state.chess.gameOver()) {
        if (!this.chessConsole.components.board.chessboard.isMoveInputEnabled()) {
          this.chessConsole.components.board.chessboard.enableMoveInput((event) => {
            return this.chessboardMoveInputCallback(event, moveResponse);
          }, this.chessConsole.props.playerColor);
        }
      }
      return;
    }
    if (this.props.debug) {
      console.log("moveRequest", fen);
    }
    this.initialisation.then(async () => {
      this.state.engineState = ENGINE_STATE.THINKING;
      const searchParams = {
        threads: this.state.threads
      };
      if (this.state.searchMode === "skill") {
        searchParams.skillLevel = this.state.skillLevel;
      } else if (this.state.searchMode === "elo") {
        searchParams.elo = this.state.elo;
      } else if (this.state.searchMode === "depth") {
        searchParams.depth = this.state.depth;
      } else if (this.state.searchMode === "time") {
        searchParams.moveTime = this.state.moveTime;
      }
      const nextMove = await this.state.currentRunner.calculateMove(fen, searchParams);
      if (!nextMove) {
        if (this.props.debug) {
          console.log("no move found with", this.state.currentRunner.constructor.name);
        }
        if (this.state.currentRunner === this.openingRunner) {
          this.state.currentRunner = this.engineRunner;
          this.moveRequest(fen, moveResponse);
        } else {
          console.error("Engine failed to find a move", fen);
          this.chessConsole.messageBroker.publish(CONSOLE_MESSAGE_TOPICS.info, {
            message: this.chessConsole.i18n.t("engine_failed")
          });
          this.state.engineState = ENGINE_STATE.READY;
          moveResponse(null);
        }
      } else {
        if (this.props.debug) {
          console.log("this.state.currentRunner", this.state.currentRunner);
          console.log("nextMove", nextMove, this.state.currentRunner.constructor.name);
        }
        let newScore;
        if (nextMove.score !== undefined) {
          if (!Number.isNaN(nextMove.score)) {
            const turn2 = this.chessConsole.state.chess.turn();
            if (turn2 === "w") {
              newScore = nextMove.score;
            } else {
              newScore = -nextMove.score;
            }
          } else {
            newScore = nextMove.score;
          }
          this.state.scoreHistory[this.chessConsole.state.chess.plyCount()] = newScore;
          this.state.score = newScore;
        } else {
          this.state.score = undefined;
        }
        this.state.engineState = ENGINE_STATE.READY;
        moveResponse(nextMove);
      }
    });
  }
  validateMoveAndPromote(fen, squareFrom, squareTo, callback) {
    const tmpChess = new Chess2(fen);
    const move = { from: squareFrom, to: squareTo };
    const moveResult = tmpChess.move(move);
    if (moveResult) {
      callback(moveResult);
      return true;
    } else {
      if (tmpChess.get(squareFrom) && tmpChess.get(squareFrom).type === "p") {
        const possibleMoves = tmpChess.moves({
          square: squareFrom,
          verbose: true
        });
        for (const possibleMove of possibleMoves) {
          if (possibleMove.to === squareTo && possibleMove.promotion) {
            const chessboard = this.chessConsole.components.board.chessboard;
            chessboard.showPromotionDialog(squareTo, tmpChess.turn(), (event) => {
              if (event.piece) {
                move.promotion = event.piece.charAt(1);
                callback(tmpChess.move(move));
              } else {
                callback(null);
              }
            });
            return true;
          }
        }
      }
    }
    callback(null);
    return false;
  }
  chessboardMoveInputCallback(event, moveResponse) {
    const gameFen = this.chessConsole.state.chess.fen();
    if (event.type === INPUT_EVENT_TYPE.validateMoveInput) {
      return this.validateMoveAndPromote(gameFen, event.squareFrom, event.squareTo, (moveResult) => {
        let result;
        if (moveResult) {
          result = moveResponse(moveResult);
        } else {
          result = moveResponse({
            from: event.squareFrom,
            to: event.squareTo
          });
        }
        if (result) {
          this.chessConsole.components.board.chessboard.disableMoveInput();
        }
      });
    } else if (event.type === INPUT_EVENT_TYPE.moveInputStarted) {
      if (this.chessConsole.state.plyViewed !== this.chessConsole.state.chess.plyCount()) {
        this.chessConsole.state.plyViewed = this.chessConsole.state.chess.plyCount();
        return false;
      } else {
        const possibleMoves = this.chessConsole.state.chess.moves({
          square: event.square
        });
        if (possibleMoves.length > 0) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
}

// src/StockfishStateView.js
class StockfishStateView extends UiComponent {
  constructor(chessConsole, player, props = {}) {
    super(undefined, props);
    this.chessConsole = chessConsole;
    this.player = player;
    const i18n = chessConsole.i18n;
    if (!this.props.spinnerIcon) {
      this.props.spinnerIcon = "spinner";
    }
    this.numberFormat = new Intl.NumberFormat(i18n.locale, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    });
    this.element = this.chessConsole.context.querySelector(".engine-state");
    this.element.innerHTML = `
            <div class="card border-0 shadow-sm bg-light overflow-hidden">
                <div class="card-body p-2 d-flex align-items-center gap-3">
                    <div class="flex-shrink-0 d-flex align-items-center">
                        <div class="engine-status-indicator pulse-animation-ready rounded-circle" 
                             style="width: 12px; height: 12px; background-color: var(--bs-success);"></div>
                    </div>
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <small class="text-muted fw-bold text-uppercase engine-name-label" style="font-size: 0.65rem;">Engine Status</small>
                            <span class="badge score-badge bg-secondary" style="font-size: 0.75rem;">Score: 0.0</span>
                        </div>
                        <div class="progress" style="height: 6px; background-color: rgba(0,0,0,0.05);">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" 
                                 role="progressbar" style="width: 0%; transition: width 0.3s ease;"></div>
                        </div>
                    </div>
                    <div class="flex-shrink-0 status-label-container">
                        <span class="badge status-badge rounded-pill bg-white text-dark border fw-medium" 
                              style="font-size: 0.7rem; min-width: 70px;">Ready</span>
                    </div>
                </div>
            </div>
        `;
    this.statusIndicator = this.element.querySelector(".engine-status-indicator");
    this.scoreBadge = this.element.querySelector(".score-badge");
    this.progressBar = this.element.querySelector(".progress-bar");
    this.statusBadge = this.element.querySelector(".status-badge");
    this.nameLabel = this.element.querySelector(".engine-name-label");
    Observe.property(player.state, "skillLevel", () => {
      this.updatePlayerName();
    });
    Observe.property(player.state, "depth", () => {
      this.updatePlayerName();
    });
    Observe.property(player.state, "engineState", () => {
      const state = player.state.engineState;
      if (state === ENGINE_STATE.THINKING) {
        this.statusIndicator.style.backgroundColor = "var(--bs-primary)";
        this.statusIndicator.classList.add("pulse-animation-thinking");
        this.statusIndicator.classList.remove("pulse-animation-ready");
        this.progressBar.style.width = "100%";
        this.statusBadge.innerText = "Thinking";
        this.statusBadge.classList.remove("bg-white", "text-dark");
        this.statusBadge.classList.add("bg-primary", "text-white");
      } else if (state === ENGINE_STATE.LOADING) {
        this.statusIndicator.style.backgroundColor = "var(--bs-warning)";
        this.progressBar.style.width = "30%";
        this.statusBadge.innerText = "Loading";
      } else {
        this.statusIndicator.style.backgroundColor = "var(--bs-success)";
        this.statusIndicator.classList.add("pulse-animation-ready");
        this.statusIndicator.classList.remove("pulse-animation-thinking");
        this.progressBar.style.width = "0%";
        this.statusBadge.innerText = "Ready";
        this.statusBadge.classList.add("bg-white", "text-dark");
        this.statusBadge.classList.remove("bg-primary", "text-white");
      }
    });
    Observe.property(player.state, "score", (event) => {
      this.updateScoreDisplay(event.newValue);
    });
    Observe.property(this.chessConsole.state, "plyViewed", () => {
      let score = player.state.scoreHistory[this.chessConsole.state.plyViewed];
      if (!score && this.chessConsole.state.plyViewed > 0) {
        score = player.state.scoreHistory[this.chessConsole.state.plyViewed - 1];
      }
      this.updateScoreDisplay(score);
    });
    this.updatePlayerName();
  }
  updateScoreDisplay(score) {
    if (score !== undefined && score !== null) {
      let scoreFormatted;
      if (Number.isNaN(score)) {
        scoreFormatted = score;
      } else {
        scoreFormatted = (score > 0 ? "+" : "") + this.numberFormat.format(score);
      }
      this.scoreBadge.innerHTML = `Score: ${scoreFormatted}`;
      if (!Number.isNaN(score)) {
        const playerColor = this.chessConsole.props.playerColor;
        const isWinning = playerColor === 0 ? score > 0.5 : score < -0.5;
        const isLosing = playerColor === 0 ? score < -0.5 : score > 0.5;
        if (isWinning) {
          this.scoreBadge.className = "badge score-badge bg-success";
        } else if (isLosing) {
          this.scoreBadge.className = "badge score-badge bg-danger";
        } else {
          this.scoreBadge.className = "badge score-badge bg-secondary";
        }
      } else {
        this.scoreBadge.className = "badge score-badge bg-secondary";
      }
    } else {
      this.scoreBadge.innerHTML = `Score: 0.0`;
      this.scoreBadge.className = "badge score-badge bg-secondary";
    }
  }
  updatePlayerName() {
    this.player.name = `Stockfish (${this.chessConsole.i18n.t("skillLevel")} ${this.player.state.skillLevel}, ${this.chessConsole.i18n.t("depth")} ${this.player.state.depth})`;
  }
}

// src/main.js
var i18n = new I18n({ locale: "en" });
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (isMobile) {
  console.log("Mobile device detected, enforcing single-threading for engine.");
}
i18n.load({
  en: {
    playerName: "Player",
    analysis: "Analysis"
  }
});
var chessConsole = new ChessConsole(document.getElementById("console-container"), { name: i18n.t("playerName"), type: LocalPlayer }, {
  name: "Stockfish 17.1",
  type: StockfishPlayer,
  props: {
    worker: ENGINE_CONFIG.WORKER_PATH,
    book: ENGINE_CONFIG.BOOK_PATH,
    skillLevel: ENGINE_CONFIG.DEFAULT_SKILL_LEVEL,
    depth: ENGINE_CONFIG.DEFAULT_DEPTH,
    debug: ENGINE_CONFIG.DEFAULT_DEBUG,
    gameMode: "pve",
    threads: isMobile ? 1 : ENGINE_CONFIG.DEFAULT_THREADS || 4
  }
});
new Board(chessConsole, {
  assetsUrl: "./assets/cm-chessboard/",
  assetsCache: false
}).initialized.then((board) => {
  const persistence = new Persistence(chessConsole, {
    savePrefix: GAME_CONFIG.SAVE_PREFIX
  });
  persistence.load();
  const applyBoardStyle = (theme, pieces) => {
    const props = board.chessboard.props;
    props.style.cssClass = theme || STYLING_CONFIG.DEFAULT_THEME;
    props.style.pieces.file = `pieces/${pieces || STYLING_CONFIG.DEFAULT_PIECES}.svg`;
    const svg = board.chessboard.view.svg;
    svg.setAttribute("class", `cm-chessboard border-type-${props.style.borderType} ${props.style.cssClass}`);
    board.chessboard.view.redrawPieces();
  };
  applyBoardStyle(persistence.loadValue("boardTheme"), persistence.loadValue("pieceSet"));
  board.chessboard.addExtension(RightClickAnnotator);
  const clearAnnotations = () => {
    board.chessboard.removeArrows();
    board.chessboard.removeMarkers();
  };
  document.body.addEventListener("click", (e) => {
    const target = e.target.closest("button");
    if (!target)
      return;
    if (target.id === "btn-clear-annotations") {
      clearAnnotations();
    } else if (target.id === "btn-setup") {
      document.getElementById("fen-text").value = chessConsole.state.chess.fen();
      document.getElementById("pgn-text").value = chessConsole.state.chess.renderPgn();
      setupModal.show();
    } else if (target.id === "btn-load-fen") {
      const fen = document.getElementById("fen-text").value.trim();
      if (fen) {
        const pgn = `[FEN "${fen}"]
[SetUp "1"]

*`;
        chessConsole.newGame({ pgn });
        setupModal.hide();
        showNotification("FEN Loaded Successfully");
      }
    } else if (target.id === "btn-load-pgn") {
      const pgn = document.getElementById("pgn-text").value;
      chessConsole.newGame({ pgn });
      setupModal.hide();
      showNotification("PGN Loaded Successfully");
    } else if (target.id === "btn-copy-fen") {
      navigator.clipboard.writeText(document.getElementById("fen-text").value);
      showNotification("FEN Copied to Clipboard!");
    } else if (target.id === "btn-copy-pgn") {
      navigator.clipboard.writeText(document.getElementById("pgn-text").value);
      showNotification("PGN Copied to Clipboard!");
    } else if (target.id === "btn-hint") {
      analysis.hint();
    } else if (target.id === "btn-swap-sides") {
      if (chessConsole.opponent.state.gameMode === "pve") {
        board.chessboard.disableMoveInput();
        const currentColor = chessConsole.props.playerColor;
        chessConsole.props.playerColor = currentColor === COLOR2.white ? COLOR2.black : COLOR2.white;
        board.chessboard.setOrientation(chessConsole.props.playerColor);
        chessConsole.nextMove();
        showNotification("Sides Swapped!");
      } else {
        showNotification("Swap only available in vs. Engine mode.");
      }
    }
  });
  const analysis = new StockfishAnalysis(document.getElementById("analysis-output"), {
    board: board.chessboard,
    i18n: chessConsole.i18n
  });
  const savedAnalysisDepth = chessConsole.persistence.loadValue("analysisDepth");
  if (savedAnalysisDepth)
    analysis.setDepth(savedAnalysisDepth);
  const updateAnalysis = () => {
    const fen = chessConsole.state.chess.fen();
    analysis.analyze(fen);
  };
  chessConsole.messageBroker.subscribe(CONSOLE_MESSAGE_TOPICS.legalMove, updateAnalysis);
  chessConsole.messageBroker.subscribe(CONSOLE_MESSAGE_TOPICS.moveUndone, updateAnalysis);
  chessConsole.messageBroker.subscribe(CONSOLE_MESSAGE_TOPICS.load, updateAnalysis);
  chessConsole.messageBroker.subscribe(CONSOLE_MESSAGE_TOPICS.newGame, updateAnalysis);
  chessConsole.messageBroker.subscribe(CONSOLE_MESSAGE_TOPICS.initGame, (data) => {
    if (data.props.analysisDepth) {
      analysis.setDepth(data.props.analysisDepth);
    }
    if (data.props.boardTheme || data.props.pieceSet) {
      applyBoardStyle(data.props.boardTheme, data.props.pieceSet);
    }
    updateAnalysis();
  });
  chessConsole.messageBroker.subscribe(CONSOLE_MESSAGE_TOPICS.newGame, (data) => {
    if (data.props.boardTheme || data.props.pieceSet) {
      applyBoardStyle(data.props.boardTheme, data.props.pieceSet);
    }
  });
  new History2(chessConsole);
  new HistoryControl(chessConsole);
  new CapturedPieces(chessConsole);
  const gameControl = new StockfishGameControl(chessConsole, {
    player: chessConsole.opponent
  });
  gameControl.setAnalysis(analysis);
  new StockfishStateView(chessConsole, chessConsole.opponent);
  const setupModal = new bootstrap.Modal(document.getElementById("setupModal"));
  const focusBoard = () => {
    if (board?.chessboard) {
      board.chessboard.view.svg.focus();
    }
  };
  document.getElementById("setupModal").addEventListener("hidden.bs.modal", focusBoard);
  const newGameModalEl = document.getElementById("new-game-modal");
  if (newGameModalEl) {
    newGameModalEl.addEventListener("hidden.bs.modal", focusBoard);
  }
});
var showNotification = (message) => {
  const toastEl = document.getElementById("notificationToast");
  const toastBody = document.getElementById("toastMessage");
  toastBody.innerText = message;
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
};
