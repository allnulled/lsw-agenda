Vue.component("LswAgendaAccionAdd", {
  template: $template,
  props: {},
  data() {
    this.$trace("lsw-agenda-accion-add.data");
    return {
      refers_to_concept: "",
      has_duration: "",
      starts_at: "",
      has_emotions: "",
      has_details: "",
      has_description: "",
      has_steps: "",
      has_reasoning: "",
      has_expectations: "",
      has_learning: "",
      has_intention: "",
      has_result: "",
      has_history: "",
      has_consequences: "",
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
        code1: "it.refers_to_concept",
        code2: "refers_to_concept",
        code3: "string",
        explanation: "tiene que coincidir con el «has_name» del concepto para que funcionen los propagadores correspondientes.",
        placeholder: "Ej: Desayunar",
        errorConfig: {
          parentId: "refers_to_concept",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "refers_to_concept",
          selfScope: outterFormScope,
          name: "refers_to_concept"
        }
      }, {
        type: "input",
        enunciate: "Duración:",
        code1: "it.has_duration",
        code2: "has_duration",
        code3: "string",
        explanation: "tiene que cumplir con el formato «0y 0mon 0d 0h 0min 0s» para referir a una duración.",
        placeholder: "Ej: 0y 0mon 0d 0h 0min",
        errorConfig: {
          parentId: "has_duration",
          parentScope: outterFormScope,
          onSuccessStatus: {
            name: "OK",
            message: "El campo cumple con un formato válido."
          }
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_duration",
          selfScope: outterFormScope,
          name: "has_duration",
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
        code1: "it.starts_at",
        code2: "starts_at",
        code3: "string",
        explanation: "tiene que cumplir con el formato «2025/01/01 23:59» para ser válido.",
        placeholder: "2025/01/01 00:00",
        errorConfig: {
          parentId: "starts_at",
          parentScope: outterFormScope,
          onSuccessStatus: {
            name: "OK",
            message: "El campo cumple con un formato válido."
          }
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "starts_at",
          selfScope: outterFormScope,
          name: "starts_at",
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
        code1: "it.has_emotions",
        code2: "has_emotions",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "has_emotions",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_emotions",
          selfScope: outterFormScope,
          name: "has_emotions"
        }
      }, {
        type: "input",
        enunciate: "Detalles:",
        code1: "it.has_details",
        code2: "has_details",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "has_details",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_details",
          selfScope: outterFormScope,
          name: "has_details"
        }
      }, {
        type: "input",
        enunciate: "Descripción:",
        code1: "it.has_description",
        code2: "has_description",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "has_description",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_description",
          selfScope: outterFormScope,
          name: "has_description"
        }
      }, {
        type: "input",
        enunciate: "Pasos:",
        code1: "it.has_steps",
        code2: "has_steps",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "has_steps",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_steps",
          selfScope: outterFormScope,
          name: "has_steps"
        }
      }, {
        type: "input",
        enunciate: "Razonamiento:",
        code1: "it.has_reasoning",
        code2: "has_reasoning",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "has_reasoning",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_reasoning",
          selfScope: outterFormScope,
          name: "has_reasoning"
        }
      }, {
        type: "input",
        enunciate: "Expectativas:",
        code1: "it.has_expectations",
        code2: "has_expectations",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "has_expectations",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_expectations",
          selfScope: outterFormScope,
          name: "has_expectations"
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
        code1: "it.has_intention",
        code2: "has_intention",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "has_intention",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_intention",
          selfScope: outterFormScope,
          name: "has_intention"
        }
      }, {
        type: "input",
        enunciate: "Resultado:",
        code1: "it.has_result",
        code2: "has_result",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "has_result",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_result",
          selfScope: outterFormScope,
          name: "has_result"
        }
      }, {
        type: "input",
        enunciate: "Historia:",
        code1: "it.has_history",
        code2: "has_history",
        code3: "string",
        explanation: "blablabla.",
        placeholder: "blabla",
        errorConfig: {
          parentId: "has_history",
          parentScope: outterFormScope,
        },
        inputConfig: {
          parentId: "formularioInicial",
          parentScope: outterFormScope,
          selfId: "has_history",
          selfScope: outterFormScope,
          name: "has_history"
        }
      }, {
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