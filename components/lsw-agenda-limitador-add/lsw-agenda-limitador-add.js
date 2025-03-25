Vue.component("LswAgendaLimitadorAdd", {
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-agenda-limitador-add.data");
    return {
      // 
    };
  },
  methods: {
    async insertLimitador(v) {
      this.$trace("lsw-agenda-limitador-add.methods.insertLimitador");
      await this.$lsw.database.insert("Limitador", v);
      // @TODO: should redirect
    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-limitador-add.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});