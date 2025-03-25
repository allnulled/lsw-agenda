Vue.component("LswAgendaConceptoSearch", {
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-agenda-concepto-search.data");
    return {
      isLoaded: false,
    };
  },
  methods: {
    async loadRows() {
      this.$trace("lsw-agenda-concepto-search.methods.loadRows");
      this.rows = await this.$lsw.database.selectMany("Concepto", it => true);
      this.isLoaded = true;
    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-concepto-search.mounted");
      this.loadRows();
    } catch(error) {
      console.log(error);
    }
  }
});