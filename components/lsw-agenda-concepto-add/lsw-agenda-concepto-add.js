const outterFormScope = {};

Vue.component("LswAgendaConceptoAdd", {
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-agenda-concepto-add.data");
    return {
      formMetadata: false
    };
  },
  methods: {
    sendForm(v) {
      this.$trace("lsw-agenda-concepto-add.methods.sendForm");
      console.log("Sedingin form...", v);
    },
    loadFormMetadata() {
      this.$trace("lsw-agenda-concepto-add.methods.loadFormMetadata");
      this.formMetadata = {
        form: {
          selfScope: outterFormScope,
          selfId: "formularioInicial",
          expectedChildren: 1,
          onSubmit: (v) => {
            this.sendForm(v);
          }
        },
        fields: [{
          type: "input",
          enunciate: "Consequencias:",
          code1: "it.tiene_consecuencias",
          code2: "tiene_consecuencias",
          code3: "string",
          explanation: "blablabla.",
          placeholder: "blabla",
          errorConfig: {
            parentId: "tiene_consecuencias",
            parentScope: outterFormScope,
          },
          inputConfig: {
            parentId: "formularioInicial",
            parentScope: outterFormScope,
            selfId: "tiene_consecuencias",
            selfScope: outterFormScope,
            name: "tiene_consecuencias"
          }
        }]
      }
    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-concepto-add.mounted");
      this.loadFormMetadata();
    } catch (error) {
      console.log(error);
    }
  }
});