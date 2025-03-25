Vue.component("LswAgendaConceptoAdd", {
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-agenda-concepto-add.data");
    return {
      // 
    };
  },
  methods: {
    async insertConcepto(v) {
      this.$trace("lsw-agenda-concepto-add.methods.insertConcepto");
      await this.$lsw.database.insert("Concepto", v);
      // @TODO: should redirect
    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-concepto-add.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});