Vue.component("LswAgendaLimitadorViewer", {
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-agenda-limitador-viewer.data");
    return {
      isLoaded: false,
      limitadores: undefined,
      infracciones: [],
    };
  },
  methods: {
    fixAsyncCode(asyncCode) {
      if(asyncCode.trim().startsWith("async ")) {
        return `return await (${asyncCode}).call(this)`
      }
      return asyncCode;
    },
    async executeLimitadores() {
      const lims = this.limitadores;
      for(let index=0; index<lims.length; index++) {
        const limitador = lims[index];
        const asyncCode = limitador.tiene_funcion;
        const AsyncFunc = (async function() {}).constructor;
        const fixedAsyncCode = this.fixAsyncCode(asyncCode);
        const asyncFunc = new AsyncFunc(fixedAsyncCode);
        console.log(asyncFunc);
        try {
          await asyncFunc.call(this);
        } catch (error) {
          this.infracciones.push(error);
        }
      }
    },
    async loadLimitadores() {
      this.$trace("lsw-agenda-limitador-viewer.methods.loadLimitadores");
      const limitadores = await this.$lsw.database.selectMany("Limitador");
      this.limitadores = limitadores;
      await this.executeLimitadores();
    }
  },
  watch: {},
  async mounted() {
    try {
      this.$trace("lsw-agenda-limitador-viewer.mounted");
      await this.loadLimitadores();
      this.isLoaded = true;
    } catch(error) {
      console.log(error);
    }
  }
});