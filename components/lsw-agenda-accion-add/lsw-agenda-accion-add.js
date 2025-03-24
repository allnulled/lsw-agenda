Vue.component("LswAgendaAccionAdd", {
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-agenda-accion-add.data");
    return {
      en_concepto_de: "",
      tiene_duracion: "",
      tiene_inicio: "",
      tiene_emociones: "",
      tiene_detalles: "",
      tiene_descripcion: "",
      tiene_pasos: "",
      tiene_razonamiento: "",
      tiene_expectativas: "",
      has_learning: "",
      tiene_intenciones: "",
      tiene_resultados: "",
      tiene_historial: "",
      tiene_consecuencias: "",
      // Campos para el formulario:
      formScope: Object.freeze({}), // El scope que usará el formulario que queremos.
      formMetadata: false, // Los metadatos, que incluyen fields y form.
    };
  },
  methods: {
    loadFormMetadata() {
      const outterFormScope = {};
      const fields = [{
        type: "input",
        enunciate: "Concepto al que se refiere:",
        code1: "it.en_concepto_de",
        code2: "en_concepto_de",
        code3: "string",
        explanation: "tiene que coincidir con el «tiene_nombre» del concepto para que funcionen los propagadores correspondientes.",
        placeholder: "Ej: Desayunar",
        errorConfig: {
          parentId: "en_concepto_de",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "en_concepto_de",
          selfScope: outterFormScope,
          name: "en_concepto_de"
        }
      }, {
        type: "input",
        enunciate: "Duración:",
        code1: "it.tiene_duracion",
        code2: "tiene_duracion",
        code3: "string",
        explanation: "tiene que cumplir con el formato «0y 0mon 0d 0h 0min 0s» para referir a una duración.",
        placeholder: "Ej: 0y 0mon 0d 0h 0min",
        errorConfig: {
          parentId: "tiene_duracion",
          parentScope: outterFormScope,
          onSuccessStatus: {
            name: "OK",
            message: "El campo cumple con un formato válido."
          }
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "tiene_duracion",
          selfScope: outterFormScope,
          name: "tiene_duracion",
          onValidate: function(value) {
            const result = Timeformat_parser.parse(value);
            if(result.length !== 1) {
              throw new Error("Only 1 expression allowed");
            }
            if(result[0].tipo !== "Duracion") {
              throw new Error("Only 1 expression of type «Duración» allowed");
            }
          }
        }
      }, {
        type: "input",
        enunciate: "Inicio:",
        code1: "it.tiene_inicio",
        code2: "tiene_inicio",
        code3: "string",
        explanation: "tiene que cumplir con el formato «2025/01/01 23:59» para ser válido.",
        placeholder: "2025/01/01 00:00",
        errorConfig: {
          parentId: "tiene_inicio",
          parentScope: outterFormScope,
          onSuccessStatus: {
            name: "OK",
            message: "El campo cumple con un formato válido."
          }
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "tiene_inicio",
          selfScope: outterFormScope,
          name: "tiene_inicio",
          onValidate: function(value) {
            const result = Timeformat_parser.parse(value);
            if(result.length !== 1) {
              throw new Error("Only 1 expression allowed");
            }
            if(result[0].tipo !== "FechaHora") {
              throw new Error("Only 1 expression of type «FechaHora» allowed");
            }
          }
        }
      }, {
        type: "select",
        enunciate: "Estado:",
        code1: "it.has_state",
        code2: "has_state",
        code3: "string",
        explanation: "tiene que ser uno entre «pendiente», «fallido» y «completo»",
        options: [{
          value: "pendiente",
          text: "Pendiente"
        }, {
          value: "fallido",
          text: "Fallido"
        }, {
          value: "completo",
          text: "Completo"
        }],
        errorConfig: {
          parentId: "has_state",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_state",
          selfScope: outterFormScope,
          name: "has_state"
        }
      }, {
        type: "input",
        enunciate: "Emociones asociadas:",
        code1: "it.tiene_emociones",
        code2: "tiene_emociones",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "tiene_emociones",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "tiene_emociones",
          selfScope: outterFormScope,
          name: "tiene_emociones"
        }
      }, {
        type: "input",
        enunciate: "Detalles:",
        code1: "it.tiene_detalles",
        code2: "tiene_detalles",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "tiene_detalles",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "tiene_detalles",
          selfScope: outterFormScope,
          name: "tiene_detalles"
        }
      }, {
        type: "input",
        enunciate: "Descripción:",
        code1: "it.tiene_descripcion",
        code2: "tiene_descripcion",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "tiene_descripcion",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "tiene_descripcion",
          selfScope: outterFormScope,
          name: "tiene_descripcion"
        }
      }, {
        type: "input",
        enunciate: "Pasos:",
        code1: "it.tiene_pasos",
        code2: "tiene_pasos",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "tiene_pasos",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "tiene_pasos",
          selfScope: outterFormScope,
          name: "tiene_pasos"
        }
      }, {
        type: "input",
        enunciate: "Razonamiento:",
        code1: "it.tiene_razonamiento",
        code2: "tiene_razonamiento",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "tiene_razonamiento",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "tiene_razonamiento",
          selfScope: outterFormScope,
          name: "tiene_razonamiento"
        }
      }, {
        type: "input",
        enunciate: "Expectativas:",
        code1: "it.tiene_expectativas",
        code2: "tiene_expectativas",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "tiene_expectativas",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "tiene_expectativas",
          selfScope: outterFormScope,
          name: "tiene_expectativas"
        }
      }, {
        type: "input",
        enunciate: "Aprendizaje:",
        code1: "it.has_learning",
        code2: "has_learning",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "has_learning",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_learning",
          selfScope: outterFormScope,
          name: "has_learning"
        }
      }, {
        type: "input",
        enunciate: "Intención:",
        code1: "it.tiene_intenciones",
        code2: "tiene_intenciones",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "tiene_intenciones",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "tiene_intenciones",
          selfScope: outterFormScope,
          name: "tiene_intenciones"
        }
      }, {
        type: "input",
        enunciate: "Resultado:",
        code1: "it.tiene_resultados",
        code2: "tiene_resultados",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "tiene_resultados",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "tiene_resultados",
          selfScope: outterFormScope,
          name: "tiene_resultados"
        }
      }, {
        type: "input",
        enunciate: "Historia:",
        code1: "it.tiene_historial",
        code2: "tiene_historial",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "tiene_historial",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "tiene_historial",
          selfScope: outterFormScope,
          name: "tiene_historial"
        }
      }, {
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
      }, ];
      this.formMetadata = Object.freeze({
        form: {
          selfScope: outterFormScope,
          selfId: "formularioInicial",
          onSubmit: async (value) => {
            const id = await this.$lsw.database.insert("accion", value);
            console.log("ID:", id);
            this.$parent.selectContext("agenda");
          }
        },
        fields: fields,
      });
    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-accion-add.mounted");
      this.loadFormMetadata();
    } catch(error) {
      console.log(error);
    }
  }
});