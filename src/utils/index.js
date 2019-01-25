/**
 * Function to fix native charCodeAt()
 *
 * Now, we can use fixedCharCodeAt("foo€", 3); for multibyte (non-bmp) chars too.
 *
 * @access public
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/charCodeAt
 * @note If you hit a non-bmp surrogate, the function will return false
 * @param str String Mixed string to get charcodes
 * @param idx Integer Position of the char to get
 * @return code Integer Result charCodeAt();
 */
function fixedCharCodeAt(str, idx) {
  idx = idx || 0;
  var code = str.charCodeAt(idx);
  var hi, low;
  if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
    hi = code;
    low = str.charCodeAt(idx + 1);
    if (isNaN(low)) {
      throw 'Kein gültiges Schriftzeichen oder Speicherfehler!';
    }
    return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
  }
  if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
    // We return false to allow loops to skip this iteration since should have already handled high surrogate above in the previous iteration
    return false;
    /*hi = str.charCodeAt(idx-1);
     low = code;
     return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;*/
  }
  return code;
}

/**
 * Gets size of a UTF-8 string in bytes
 *
 * @autor Frank Neff <fneff89@gmail.com>
 * @license GPL v2
 * @access public
 * @param str String Input string to get bytesize
 * @return result String Size of the input string in bytes
 */

export const countUtf8 = (str) => {
  var result = 0;
  for (var n = 0; n < str.length; n++) {
    var charCode = fixedCharCodeAt(str, n);
    if (typeof charCode === "number") {
      if (charCode < 128) {
        result = result + 1;
      } else if (charCode < 2048) {
        result = result + 2;
      } else if (charCode < 65536) {
        result = result + 3;
      } else if (charCode < 2097152) {
        result = result + 4;
      } else if (charCode < 67108864) {
        result = result + 5;
      } else {
        result = result + 6;
      }
    }
  }
  return result;
};
