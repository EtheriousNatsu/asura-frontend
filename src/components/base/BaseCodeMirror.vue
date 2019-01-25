<template>
    <codemirror
        v-model="code"
        :options="cmOptions">
    </codemirror>
</template>



<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";

// language
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/javascript/javascript.js";

// autoCloseBrackets
import "codemirror/addon/edit/closebrackets.js";
// autoCloseTags
import "codemirror/addon/edit/closetag.js";
// styleActiveLine
import "codemirror/addon/selection/active-line.js";
// matchtags
import "codemirror/addon/edit/matchtags.js";
// styleSelectedText
import "codemirror/addon/selection/mark-selection.js";
// highlightSelectionMatches
import "codemirror/addon/search/match-highlighter.js";

// scrollbar
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.js";

// search
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";

// foldGutter
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/xml-fold.js";

// lint
var jsonlint = require("jsonlint");
window.jsonlint = jsonlint;
import "codemirror/addon/lint/lint.js";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/lint/json-lint.js";
import "codemirror/addon/lint/html-lint.js";

export default {
  name: "BaseCodeMirror",
  components: {
    codemirror
  },
  props: {
    value: {
      type: String
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      code: this.value,
      defaultOptions: {
        tabSize: 4,
        lineNumbers: true,
        line: true,
        autoCloseBrackets: true,
        styleActiveLine: false,
        autoCloseTags: true,
        matchTags: false,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        foldGutter: true,
        highlightSelectionMatches: { annotateScrollbar: true },
        lint: true
      }
    };
  },
  computed: {
    cmOptions() {
      return Object.assign({}, this.defaultOptions, this.options);
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.code = newVal;
    },
    code(newVal, oldVal) {
      this.$emit("input", newVal);
    }
  },
  mounted() {
    this.$emit("input", this.value);
  }
};
</script>


<style>
.CodeMirror {
  border: 1px solid #eee;
}
.CodeMirror-focused .cm-matchhighlight {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFklEQVQI12NgYGBgkKzc8x9CMDAwAAAmhwSbidEoSQAAAABJRU5ErkJggg==);
  background-position: bottom;
  background-repeat: repeat-x;
}
.cm-matchhighlight {
  background-color: lightgreen;
}
.CodeMirror-selection-highlight-scrollbar {
  background-color: green;
}
</style>

