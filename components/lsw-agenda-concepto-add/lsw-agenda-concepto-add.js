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
          code1: "it.has_consequences",
          code2: "has_consequences",
          code3: "string",
          explanation: "blablabla.",
          placeholder: "blabla",
          errorConfig: {
            parentId: "has_consequences",
            parentScope: outterFormScope,
          },
          inputConfig: {
            parentId: "formularioInicial",
            parentScope: outterFormScope,
            selfId: "has_consequences",
            selfScope: outterFormScope,
            name: "has_consequences"
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