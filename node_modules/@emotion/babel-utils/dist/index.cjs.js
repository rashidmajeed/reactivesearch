'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// babel-plugin-styled-components
// https://github.com/styled-components/babel-plugin-styled-components/blob/8d44acc36f067d60d4e09f9c22ff89695bc332d2/src/minify/index.js
var multilineCommentRegex = /\/\*[^!](.|[\r\n])*?\*\//g;
var lineCommentStart = /\/\//g;
var symbolRegex = /(\s*[;:{},]\s*)/g; // Counts occurences of substr inside str

var countOccurences = function countOccurences(str, substr) {
  return str.split(substr).length - 1;
}; // Joins substrings until predicate returns true


var reduceSubstr = function reduceSubstr(substrs, join, predicate) {
  var length = substrs.length;
  var res = substrs[0];

  if (length === 1) {
    return res;
  }

  for (var i = 1; i < length; i++) {
    if (predicate(res)) {
      break;
    }

    res += join + substrs[i];
  }

  return res;
}; // Joins at comment starts when it's inside a string or parantheses
// effectively removing line comments


var stripLineComment = function stripLineComment(line) {
  return reduceSubstr(line.split(lineCommentStart), '//', function (str) {
    return !str.endsWith(':') && // NOTE: This is another guard against urls, if they're not inside strings or parantheses.
    countOccurences(str, "'") % 2 === 0 && countOccurences(str, '"') % 2 === 0 && countOccurences(str, '(') === countOccurences(str, ')');
  });
};
var compressSymbols = function compressSymbols(code) {
  return code.split(symbolRegex).reduce(function (str, fragment, index) {
    // Even-indices are non-symbol fragments
    if (index % 2 === 0) {
      return str + fragment;
    } // Only manipulate symbols outside of strings


    if (countOccurences(str, "'") % 2 === 0 && countOccurences(str, '"') % 2 === 0) {
      return str + fragment.trim();
    }

    return str + fragment;
  }, '');
}; // Detects lines that are exclusively line comments

var isLineComment = function isLineComment(line) {
  return line.trim().startsWith('//');
};

var linebreakRegex = /[\r\n]\s*/g;
var minify = function minify(code) {
  var newCode = code.replace(multilineCommentRegex, '\n') // Remove multiline comments
  .split(linebreakRegex) // Split at newlines
  .filter(function (line) {
    return line.length > 0 && !isLineComment(line);
  }) // Removes lines containing only line comments
  .map(stripLineComment) // Remove line comments inside text
  .join(' '); // Rejoin all lines

  return compressSymbols(newCode);
};

function getExpressionsFromTemplateLiteral(node, t) {
  var raw = createRawStringFromTemplateLiteral(node);
  var minified = minify(raw);
  return replacePlaceholdersWithExpressions(minified, node.expressions || [], t);
}

var interleave = function interleave(strings, interpolations) {
  return interpolations.reduce(function (array, interp, i) {
    return array.concat([interp], strings[i + 1]);
  }, [strings[0]]);
};

function getDynamicMatches(str) {
  var re = /xxx(\d+)xxx/gm;
  var match;
  var matches = [];

  while ((match = re.exec(str)) !== null) {
    matches.push({
      value: match[0],
      p1: parseInt(match[1], 10),
      index: match.index
    });
  }

  return matches;
}

function replacePlaceholdersWithExpressions(str, expressions, t) {
  var matches = getDynamicMatches(str);

  if (matches.length === 0) {
    if (str === '') {
      return [];
    }

    return [t.stringLiteral(str)];
  }

  var strings = [];
  var finalExpressions = [];
  var cursor = 0;
  matches.forEach(function (_ref, i) {
    var value = _ref.value,
        p1 = _ref.p1,
        index = _ref.index;
    var preMatch = str.substring(cursor, index);
    cursor = cursor + preMatch.length + value.length;

    if (preMatch) {
      strings.push(t.stringLiteral(preMatch));
    } else if (i === 0) {
      strings.push(t.stringLiteral(''));
    }

    finalExpressions.push(expressions[p1]);

    if (i === matches.length - 1) {
      strings.push(t.stringLiteral(str.substring(index + value.length)));
    }
  });
  return interleave(strings, finalExpressions).filter( // $FlowFixMe
  function (node) {
    return node.value !== '';
  });
}

function createRawStringFromTemplateLiteral(quasi) {
  var strs = quasi.quasis.map(function (x) {
    return x.value.cooked;
  });
  var src = strs.reduce(function (arr, str, i) {
    arr.push(str);

    if (i !== strs.length - 1) {
      arr.push("xxx" + i + "xxx");
    }

    return arr;
  }, []).join('').trim();
  return src;
}

function getLabelFromPath(path, t) {
  return getIdentifierName(path, t);
}

function getDeclaratorName(path, t) {
  // $FlowFixMe
  var parent = path.findParent(function (p) {
    return p.isVariableDeclarator();
  });
  return parent && t.isIdentifier(parent.node.id) ? parent.node.id.name : '';
}

function getIdentifierName(path, t) {
  var classParent;

  if (path) {
    // $FlowFixMe
    classParent = path.findParent(function (p) {
      return t.isClass(p);
    });
  }

  if (classParent && classParent.node.id) {
    return t.isIdentifier(classParent.node.id) ? classParent.node.id.name : '';
  } else if (classParent && classParent.node.superClass && classParent.node.superClass.name) {
    return getDeclaratorName(path, t) + "(" + classParent.node.superClass.name + ")";
  }

  return getDeclaratorName(path, t);
}

exports.getExpressionsFromTemplateLiteral = getExpressionsFromTemplateLiteral;
exports.getLabelFromPath = getLabelFromPath;
//# sourceMappingURL=index.cjs.js.map
