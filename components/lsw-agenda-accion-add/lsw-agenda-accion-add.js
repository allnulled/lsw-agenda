Vue.component("LswAgendaAccionAdd", {
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-agenda-accion-add.data");
    return {
      // 
    };
  },
  methods: {
    async insertAccion(v) {
      this.$trace("lsw-agenda-accion-add.methods.insertAccion");
      await this.$lsw.database.insert("Accion", v);
      // @TODO: should redirect
    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-accion-add.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});