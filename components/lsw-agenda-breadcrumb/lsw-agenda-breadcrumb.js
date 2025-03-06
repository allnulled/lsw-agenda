Vue.component("LswAgendaBreadcrumb", {
  name: "LswAgendaBreadcrumb",
  template: $template,
  props: {
    agenda: {
      type: Object,
      default: () => null
    },
    pathItems: {
      type: Array,
      required: true
    }
  },
  data() {
    this.$trace("lsw-agenda-breadcrumb.data");
    return {
      
    };
  },
  methods: {
    goToSection(section) {
      this.$trace("lsw-agenda-breadcrumb.methods.goToSection");
      if(this.agenda) {
        this.agenda.selectContext(section);
      }
    }
  },
  watch: {

  },
  async mounted() {
    try {
      this.$trace("lsw-agenda-breadcrumb.mounted");
    } catch (error) {
      console.log(error);
    }
  }
});