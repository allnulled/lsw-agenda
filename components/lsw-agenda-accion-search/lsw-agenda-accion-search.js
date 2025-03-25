Vue.component("LswAgendaAccionSearch", {
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-agenda-accion-search.data");
    return {
      isLoaded: false,
    };
  },
  methods: {
    async loadRows() {
      this.$trace("lsw-agenda-accion-search.methods.loadRows");
      this.rows = await this.$lsw.database.selectMany("Accion", it => true);
      this.isLoaded = true;
    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-accion-search.mounted");
      this.loadRows();
    } catch(error) {
      console.log(error);
    }
  }
});