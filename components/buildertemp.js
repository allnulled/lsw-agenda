const fs = require("fs");
const files = [
  "lsw-agenda-accion-add",
  "lsw-agenda-accion-search",
  "lsw-agenda-concepto-add",
  "lsw-agenda-concepto-search",
  "lsw-agenda-limitador-add",
  "lsw-agenda-limitador-search",
  "lsw-agenda-impresion-add",
  "lsw-agenda-impresion-search",
  "lsw-agenda-propagador-search",
  "lsw-agenda-propagacion-search",
  "lsw-agenda-postimpresion-search",
  "lsw-agenda-infraccion-search",
  "lsw-agenda-evento-search",
];
const toPascalCase = function(str) {
  return str.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('');
};
files.forEach(file => {
  const componentId = toPascalCase(file);
  // fs.mkdirSync(`${__dirname}/${file}`);
  fs.writeFileSync(`${__dirname}/${file}/${file}.html`, `<div class="${componentId}">
  ${componentId}
</div>`, "utf8");
  fs.writeFileSync(`${__dirname}/${file}/${file}.css`, `.${componentId} {

}`, "utf8");
  fs.writeFileSync(`${__dirname}/${file}/${file}.js`, `Vue.component("${componentId}", {
  template: $template,
  props: {},
  data() {
    this.$trace("${file}.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("${file}.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});`, "utf8");
});