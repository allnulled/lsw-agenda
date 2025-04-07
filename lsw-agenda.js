/*
  @artifact:  Lite Starter Web Dependency
  @url:       https://github.com/allnulled/lsw-agenda.git
  @name:      @allnulled/lsw-agenda
  @version:   1.0.0
*/(function(factory) {
  const mod = factory();
  if(typeof window !== 'undefined') {
    window["Lsw_agenda_components"] = mod;
  }
  if(typeof global !== 'undefined') {
    global["Lsw_agenda_components"] = mod;
  }
  if(typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function() {
Vue.component("LswAgenda", {
  name: "LswAgenda",
  template: `<div class="lsw_agenda">
    <div v-descriptor="'agenda.calendar.buttons_panel_1'"
        class="flex_1 flex_row"
        style="gap: 4px;">
        <div class="flex_1">
            <button class="width_100 nowrap"
                v-on:click="() => selectSubmenu1('add')"
                :class="{activated: selectedSubmenu1 === 'add'}">+</button>
            <div class="hidden_menu"
                v-if="selectedSubmenu1 === 'add'">
                <div class="hidden_menu_fixed_layer"
                    v-on:click="() => selectSubmenu1('none')"></div>
                <div class="hidden_menu_box"
                    style="min-width: 160px;">
                    <div class="hidden_menu_items">
                        <div class="title">
                            <div class="flex_100"
                                style="padding-left: 4px;">
                                Insertar info
                            </div>
                            <div class="flex_1">
                                <button v-on:click="() => selectSubmenu1('none')">❌</button>
                            </div>
                        </div>
                        <div class="button_cell">
                            <button v-on:click="() => selectContext('accion.add', { initialValues: { tiene_inicio: selectedDate } })">Crear
                                acción</button>
                        </div>
                        <div class="button_cell">
                            <button v-on:click="() => selectContext('concepto.add')">Crear concepto</button>
                        </div>
                        <div class="button_cell">
                            <button v-on:click="() => selectContext('limitador.add')">Crear limitador</button>
                        </div>
                        <div class="button_cell">
                            <button v-on:click="() => selectContext('impresion.add')">Crear impresión</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex_1">
            <button class="width_100 nowrap"
                v-on:click="() => selectSubmenu1('search')"
                :class="{activated: selectedSubmenu1 === 'search'}">🔎</button>
            <div class="hidden_menu"
                v-if="selectedSubmenu1 === 'search'">
                <div class="hidden_menu_fixed_layer"
                    v-on:click="() => selectSubmenu1('none')"></div>
                <div class="hidden_menu_box">
                    <div class="hidden_menu_items">
                        <div class="title">
                            <div class="flex_100"
                                style="padding-left: 4px;">
                                Buscar info
                            </div>
                            <div class="flex_1">
                                <button v-on:click="() => selectSubmenu1('none')">❌</button>
                            </div>
                        </div>
                        <div class="separator">
                            <div class="flex_100"
                                style="padding-left: 4px;">Tablas físicas:</div>
                        </div>
                        <div class="button_cell">
                            <button v-on:click="() => selectContext('accion.search')">Buscar por acción</button>
                        </div>
                        <div class="button_cell">
                            <button v-on:click="() => selectContext('concepto.search')">Buscar por concepto</button>
                        </div>
                        <div class="button_cell">
                            <button v-on:click="() => selectContext('propagador.search')">Buscar por propagador</button>
                        </div>
                        <div class="button_cell">
                            <button v-on:click="() => selectContext('limitador.search')">Buscar por límite</button>
                        </div>
                        <div class="button_cell">
                            <button v-on:click="() => selectContext('impresion.search')">Buscar por impresión</button>
                        </div>
                        <div class="separator">
                            <div class="flex_100"
                                style="padding-left: 4px;">Tablas virtuales:</div>
                        </div>
                        <div class="button_cell">
                            <button v-on:click="() => selectContext('propagacion.search')">Buscar por propagación</button>
                        </div>
                        <div class="button_cell">
                            <button v-on:click="() => selectContext('infraccion.search')">Buscar por infracción</button>
                        </div>
                        <div class="button_cell">
                            <button v-on:click="() => selectContext('postimpresion.search')">Buscar por postimpresión</button>
                        </div>
                        <div class="button_cell">
                            <button v-on:click="() => selectContext('evento.search')">Buscar por evento</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex_1">
            <button class="width_100 nowrap"
                v-on:click="() => selectSubmenu1('reports')">📊</button>
        </div>
        <div class="flex_1">
            <button class="width_100 nowrap"
                v-on:click="() => selectSubmenu1('settings')">⚙️</button>
        </div>
        <div class="flex_100"></div>
    </div>

    <div class="calendar_main_panel">
        <div v-if="selectedContext === 'accion.add'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb :agenda="this"
                    :path-items="[{label:'Añadir acción'}]" />
            </div>
            <lsw-agenda-accion-add :initial-data="selectedContextParameters.values" />
        </div>
        <div v-else-if="selectedContext === 'accion.search'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb :agenda="this"
                    :path-items="[{label:'Buscar acción'}]" />
            </div>
            <lsw-agenda-accion-search />
        </div>
        <div v-else-if="selectedContext === 'concepto.add'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb :agenda="this"
                    :path-items="[{label:'Añadir concepto'}]" />
            </div>
            <lsw-agenda-concepto-add />
        </div>
        <div v-else-if="selectedContext === 'concepto.search'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb :agenda="this"
                    :path-items="[{label:'Buscar concepto'}]" />
            </div>
            <lsw-agenda-concepto-search />
        </div>
        <div v-else-if="selectedContext === 'limitador.add'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb :agenda="this"
                    :path-items="[{label:'Añadir límite'}]" />
            </div>
            <lsw-agenda-limitador-add />
        </div>
        <div v-else-if="selectedContext === 'limitador.search'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb :agenda="this"
                    :path-items="[{label:'Buscar límite'}]" />
            </div>
            <lsw-agenda-limitador-search />
        </div>
        <div v-else-if="selectedContext === 'impresion.add'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb :agenda="this"
                    :path-items="[{label:'Añadir impresión'}]" />
            </div>
            <lsw-agenda-impresion-add />
        </div>
        <div v-else-if="selectedContext === 'impresion.search'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb :agenda="this"
                    :path-items="[{label:'Buscar impresión'}]" />
            </div>
            <lsw-agenda-impresion-search />
        </div>
        <div v-else-if="selectedContext === 'propagacion.search'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb :agenda="this"
                    :path-items="[{label:'Buscar propagación'}]" />
            </div>
            <lsw-agenda-propagacion-search />
        </div>
        <div v-else-if="selectedContext === 'postimpresion.search'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb :agenda="this"
                    :path-items="[{label:'Buscar postimpresión'}]" />
            </div>
            <lsw-agenda-postimpresion-search />
        </div>
        <div v-else-if="selectedContext === 'infraccion.search'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb :agenda="this"
                    :path-items="[{label:'Buscar infracción'}]" />
            </div>
            <lsw-agenda-infraccion-search />
        </div>
        <div v-else-if="selectedContext === 'evento.search'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb :agenda="this"
                    :path-items="[{label:'Buscar evento'}]" />
            </div>
            <lsw-agenda-evento-search />
        </div>
        <div v-else-if="selectedContext === 'propagador.search'">
            <div class="breadcrumb_box">
                <lsw-agenda-breadcrumb :agenda="this"
                    :path-items="[{label:'Buscar propagador'}]" />
            </div>
            <lsw-agenda-propagador-search />
        </div>
    </div>
    <div v-if="selectedContext === 'agenda'">
        <div class="breadcrumb_box"
            style="padding-left: 8px; padding-right: 8px;">
            <lsw-agenda-breadcrumb :agenda="this"
                :path-items="[{label:'Día ' + \$lsw.timer.utils.formatDatestringFromDate(selectedDate, true),noop:true}]" />
        </div>
        <div class="calendar_viewer">
            <lsw-calendario ref="calendario"
                modo="date"
                :al-cambiar-valor="(v, cal) => loadDateTasks(v, cal)" />
        </div>
        <div class="limitador_viewer">
            <lsw-agenda-limitador-viewer :agenda="this" />
        </div>
        <div class="tasks_viewer">
            <div class="selected_day_title"
                v-if="selectedDate">
                <div class="flex_row centered">
                    <div class="flex_1 margin_right_1"><button class="bright_border" v-on:click="() => selectHour('new')" :class="{activated: selectedForm === 'new'}">#️⃣</button></div>
                    <div class="flex_100">{{ \$lsw.timer.utils.formatDateToSpanish(selectedDate, true) }} {{ selectedDate.getMonth() }}</div>
                    <div class="flex_1 nowrap" :style="(!isLoading) && Array.isArray(selectedDateTasksFormattedPerHour) && selectedDateTasksFormattedPerHour.length ? '' : 'visibility: hidden'">
                        <button class="bright_border" v-on:click="togglePsicodelia" :class="{activated: hasPsicodelia}">❤️</button>
                        <button class="bright_border" v-on:click="showAllHours">🔓*</button>
                        <button class="bright_border" v-on:click="hideAllHours">🔒*</button>
                    </div>
                </div>
            </div>
            <div v-if="selectedForm === 'new'">
                <lsw-schema-based-form
                    :on-submit="v => onInsertTask(v)"
                    :on-delete-row="refreshTasks"
                    :overriden-values="{
                        tiene_inicio: \$lsw.timer.utils.formatDatestringFromDate(selectedDate, 1)
                        + ' '
                        + \$lsw.timer.utils.formatHour(0, 0)
                    }"
                    :model="{
                        connection: \$lsw.database,
                        databaseId: 'lsw_default_database',
                        rowId: -1,
                        tableId: 'Accion',
                    }" />
            </div>
            <div class="no_tasks_message"
                v-if="isLoading">
                Por favor, aguarde hasta recuperar los datos.
            </div>
            <div class="box_for_date_details"
                v-else-if="(!isLoading) && Array.isArray(selectedDateTasksFormattedPerHour) && selectedDateTasksFormattedPerHour.length">
                <div class="hour_table"
                    v-for="franja, franjaIndex in selectedDateTasksFormattedPerHour"
                    v-bind:key="'franja_horaria_' + franjaIndex">
                    <div class="hour_lapse_separator">
                        <div class="flex_row centered">
                            <div class="flex_1 pad_right_1">
                                <button class="bright_border nowrap"
                                    style="margin-right: 1px;"
                                    v-on:click="() => selectHour(franja.hora)"
                                    :class="{activated: selectedForm === franja.hora}">#️⃣</button>
                            </div>
                            <div class="flex_100">
                                <span>{{ \$lsw.timer.utils.formatHourFromMomento(franja) }}</span>
                                <span> · </span>
                                <span class="hour_compromises">{{ \$lsw.utils.pluralizar("compromiso", "compromisos", "%i %s", Object.keys(franja.tareas).length) }}</span>
                            </div>
                            <div class="flex_1">
                                <div class="flex_1 flex_row centered">
                                    <span v-on:click="() => toggleHour(franja.hora)">
                                        <button class="bright_border nowrap activated"
                                            v-if="hiddenDateHours.indexOf(franja.hora) === -1">🔓</button>
                                        <button class="bright_border nowrap"
                                            v-else>🔒</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <lsw-schema-based-form v-if="selectedForm === franja.hora"
                        :on-submit="v => \$lsw.database.insert('Accion', v).then(refreshTasks)"
                        :on-delete-row="refreshTasks"
                        :overriden-values="{
                            tiene_inicio: \$lsw.timer.utils.formatDatestringFromDate(selectedDate, 1)
                            + ' '
                            + \$lsw.timer.utils.formatHour(franja.hora, franja.minuto || 0)
                        }"
                        :model="{
                            connection: \$lsw.database,
                            databaseId: 'lsw_default_database',
                            rowId: -1,
                            tableId: 'Accion',
                        }" />
                    <div class="hour_lapse_list"
                        v-show="hiddenDateHours.indexOf(franja.hora) === -1">
                        <template v-for="tarea, tareaIndex in franja.tareas">
                            <div class="hour_task_block"
                                :class="{is_completed: tarea.tiene_estado === 'completada', is_failed: tarea.tiene_estado === 'fallida', is_pending: tarea.tiene_estado === 'pendiente'}"
                                v-bind:key="'franja_horaria_' + franjaIndex + '_tarea_' + tareaIndex">
                                <div class="hour_task_pill pill">
                                    <div class="flex_1 hour_task_dragger pill_start"
                                        style="padding-top: 4px;">
                                        <div class=""
                                            style="min-width: 20px;padding-left: 3px;padding-top: 2px;">❗️</div>
                                    </div>
                                    <div class="flex_1 hour_task_details_start pill_middle">
                                        <div class="lighted_cell" :class="{psicodelic_cell: hasPsicodelia}">{{ \$lsw.timer.utils.formatHourFromMomentoCode(tarea.tiene_inicio, true) ?? '💩' }}
                                        </div>
                                    </div>
                                    <div class="flex_1 hour_task_details_duration pill_middle">
                                        <div class="lighted_cell">{{ tarea.tiene_duracion || '🤔' }}</div>
                                    </div>
                                    <div class="flex_100 hour_task_name pill_middle" style="overflow: hidden;" v-on:click="() => advanceTaskState(tarea)">
                                        <div class="lighted_cell" style="text-overflow: ellipsis; overflow: clip; max-width: 100%;">{{ tarea.en_concepto || '🤔' }}</div>
                                    </div>
                                    <div class="flex_1 hour_task_editer pill_middle button_pill_cell">
                                        <button v-on:click="() => openUpdateTaskDialog(tarea)"
                                            :class="{activated: selectedForm === tarea.id}">#️⃣</button>
                                    </div>
                                    <div class="flex_1 hour_task_editer pill_end button_pill_cell">
                                        <button class="danger_button" v-on:click="(e) => openDeleteTaskDialog(tarea, e)">❌</button>
                                    </div>
                                </div>
                                <lsw-schema-based-form v-if="selectedForm === tarea.id"
                                    :on-submit="v => onUpdateTask(v, tarea)"
                                    :on-delete-row="refreshTasks"
                                    :overriden-values="{
                                        tiene_inicio: \$lsw.timer.utils.formatDatestringFromDate(selectedDate, 1)
                                        + ' '
                                        + \$lsw.timer.utils.formatHour(franja.hora, franja.minuto || 0)
                                    }"
                                    :model="{
                                        connection: \$lsw.database,
                                        databaseId: 'lsw_default_database',
                                        rowId: tarea.id,
                                        tableId: 'Accion',
                                    }" />
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="no_tasks_message"
                v-else>
                No hay tareas asignadas para este día.
            </div>
        </div>
    </div>
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda.data");
    return {
      counter: 0,
      isLoading: false,
      hasPsicodelia: true,
      selectedContext: "agenda",
      selectedSubmenu1: 'none',
      selectedDate: undefined,
      selectedDateTasks: undefined,
      selectedDateTasksFormattedPerHour: undefined,
      selectedForm: undefined,
      hiddenDateHours: [],
    };
  },
  methods: {
    showAllHours() {
      this.$trace("lsw-agenda.methods.showAllHours");
      this.hiddenDateHours = [];
    },
    hideAllHours() {
      this.$trace("lsw-agenda.methods.hideAllHours");
      this.hiddenDateHours = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
    },
    selectContext(id, parameters = {}) {
      this.$trace("lsw-agenda.methods.selectContext");
      this.selectedSubmenu1 = "none";
      this.selectedContextParameters = parameters;
      this.selectedContext = id;
    },
    selectSubmenu1(id) {
      this.$trace("lsw-agenda.methods.selectSubmenu1");
      this.selectedSubmenu1 = id;
    },
    togglePsicodelia() {
      this.$trace("lsw-agenda.methods.togglePsicodelia");
      this.hasPsicodelia = !this.hasPsicodelia;
    },
    toggleHour(hourInt) {
      this.$trace("lsw-agenda.methods.toggleHour");
      const pos = this.hiddenDateHours.indexOf(hourInt);
      if (pos === -1) {
        this.hiddenDateHours.push(hourInt);
      } else {
        this.hiddenDateHours.splice(pos, 1);
      }
    },
    async loadDateTasks(newDate, calendario) {
      this.$trace("lsw-agenda.methods.loadDateTasks");
      this.isLoading = true;
      console.log("Loading date tasks of: " + newDate);
      try {
        this.selectedDate = newDate;
        const selectedDate = this.selectedDate;
        const selectedDateTasks = await this.$lsw.database.selectMany("Accion", valueBrute => {
          try {
            const valueList = Timeformat_parser.parse(valueBrute.tiene_inicio);
            const value = valueList[0];
            const isSameYear = value.anio === selectedDate.getFullYear();
            const isSameMonth = value.mes === (selectedDate.getMonth() + 1);
            const isSameDay = value.dia === selectedDate.getDate();
            const isAccepted = isSameYear && isSameMonth && isSameDay;
            return isAccepted;
          } catch (error) {
            return true;
          }
        });
        this.selectedDateTasks = selectedDateTasks;
        this.propagateDateTasks();
      } catch (error) {
        console.log("Error loading date taskes:", error);
      } finally {
        setTimeout(() => {this.isLoading = false}, 100);
      }
      if(calendario) {
        const selectedDate = this.selectedDate;
        const tasksOfMonth = await this.$lsw.database.selectMany("Accion", valueBrute => {
          const valueList = Timeformat_parser.parse(valueBrute.tiene_inicio);
          const value = valueList[0];
          const isSameYear = value.anio === selectedDate.getFullYear();
          const isSameMonth = value.mes === (selectedDate.getMonth() + 1);
          const isAccepted = isSameYear && isSameMonth;
          return isAccepted;
        });
        const tasksOfMonthByDay = tasksOfMonth.reduce((out, item) => {
          const valueList = Timeformat_parser.parse(item.tiene_inicio);
          const value = valueList[0];
          const day = value.dia;
          if(!(day in out)) {
            out[day] = [];
          }
          out[day].push(item);
          return out;
        }, {});
        calendario.establecer_marcadores_del_mes(tasksOfMonthByDay);
      }
    },
    groupTasksByHour(tareas = this.selectedDateTasks) {
      this.$trace("lsw-agenda.methods.groupTasksByHour");
      const mapaHoras = {};
      Agrupacion_inicial:
      for (let i = 0; i < tareas.length; i++) {
        const tarea = tareas[i];
        const { tiene_inicio } = tarea;
        const [inicioObject] = Timeformat_parser.parse(tiene_inicio);
        const { hora, minuto } = inicioObject;
        if(typeof hora !== "number") {
          continue Agrupacion_inicial;
        }
        if (!(hora in mapaHoras)) {
          mapaHoras[hora] = [];
        }
        mapaHoras[hora].push(tarea);
      }
      //return mapaHoras;
      const segunHoras = [];
      Formateo_final:
      for(let hora in mapaHoras) {
        const lista = mapaHoras[hora];
        segunHoras.push({
          hora,
          tareas: lista,
        });
      }
      return segunHoras;
    },
    propagateDateTasks() {
      this.$trace("lsw-agenda.methods.propagateDateTasks");
      this.selectedDateTasksFormattedPerHour = this.groupTasksByHour();
    },
    async openInsertTaskDialog() {
      this.$trace("lsw-agenda.methods.openInsertTaskDialog");
      // @TODO: 
    },
    async openUpdateTaskDialog(tarea) {
      this.$trace("lsw-agenda.methods.openUpdateTaskDialog");
      // @TODO: 
      this.selectHour(tarea.id);
    },
    async openDeleteTaskDialog(tarea, e) {
      this.$trace("lsw-agenda.methods.openDeleteTaskDialog");
      const confirmed = await Vue.prototype.$dialogs.open({
        title: "Eliminar registro",
        template: `
          <div>
            <div class="pad_2">¿Seguro que quieres eliminar el registro?</div>
            <hr class="margin_0" />
            <div class="pad_2 text_align_right">
              <button class="danger_button" v-on:click="() => accept(true)">Eliminar</button>
              <button class="" v-on:click="() => accept(false)">Cancelar</button>
            </div>
          </div>
        `,
      });
      console.log(confirmed);
      if(!confirmed) return false;
      await this.$lsw.database.delete("Accion", tarea.id);
      this.selectedForm = undefined;
      this.refreshTasks();
    },
    selectHour(hora) {
      this.$trace("lsw-agenda.methods.selectHour");
      if(this.selectedForm === hora) {
        this.selectedForm = undefined;
      } else {
        this.selectedForm = hora;
      }
    },
    async refreshTasks() {
      this.$trace("lsw-agenda.methods.refreshTasks");
      this.loadDateTasks(new Date(this.selectedDate));
    },
    async onUpdateTask(v, tarea) {
      this.$trace("lsw-agenda.methods.onUpdateTask");
      await this.$lsw.database.update('Accion', tarea.id, v);
      this.selectedForm = tarea.id;
      this.refreshTasks();
    },
    async onInsertTask(v, tarea) {
      this.$trace("lsw-agenda.methods.onInsertTask");
      const id = await this.$lsw.database.insert('Accion', v);
      this.selectedForm = id;
      this.refreshTasks();
    },
    async advanceTaskState(tarea) {
      this.$trace("lsw-agenda.methods.onInsertTask");
      const siguienteEstado = (() => {
        switch(tarea.tiene_estado) {
          case "pendiente": return "completada";
          case "completada": return "fallida";
          case "fallida": return "pendiente";
          default: return "pendiente";
        }
      })();
      await this.$lsw.database.overwrite('Accion', tarea.id, {
        tiene_estado: siguienteEstado
      });
      this.refreshTasks();
    }
  },
  watch: {
  },
  async mounted() {
    try {
      this.$trace("lsw-agenda.mounted");
      const selectedDate = this.$refs.calendario.getValue();
      this.loadDateTasks(selectedDate);
    } catch (error) {
      console.log(error);
    }
  }
});
Vue.component("LswAgendaAccionAdd", {
  template: `<div class="LswAgendaAccionAdd" style="padding-top: 4px;">
  <template>
    <lsw-schema-based-form
      :on-submit="insertAccion"
      :model="{
        databaseId: 'lsw_default_database',
        tableId: 'Accion',
        rowId: -1,
      }"
    />
  </template>
</div>`,
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
Vue.component("LswAgendaAccionSearch", {
  template: `<div class="LswAgendaAccionSearch">
  <lsw-table v-if="isLoaded"
    :initial-input="rows"></lsw-table>
</div>`,
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
Vue.component("LswAgendaBreadcrumb", {
  name: "LswAgendaBreadcrumb",
  template: `<div class="lsw_agenda_breadcrumb">
    <div class="flex_row centered">
        <div class="right_padded_1">
            <button v-on:click="() => goToSection('agenda')">📆</button>
        </div>
        <div class="agenda_breadcrumb flex_100">
            <div class="agenda_bradcrumb_item"
                v-for="pathItem, pathIndex in pathItems"
                v-bind:key="'agenda-breadcrumb-path-item-' + pathIndex">
                <span v-if="pathIndex !== 0"> » </span>
                <span class="agenda_breadcrumb_link"
                    v-if="pathItem.link">
                    <a :href="pathItem.link">{{ pathItem.label }}</a>
                </span>
                <span class="agenda_breadcrumb_link"
                    v-else-if="pathItem.section">
                    <span v-on:click="() => goToSection(pathItem.section)">{{ pathItem.label }}</span>
                </span>
                <span class="agenda_breadcrumb_link"
                    v-else-if="pathItem.event">
                    <span v-on:click="pathItem.event">{{ pathItem.label }}</span>
                </span>
                <span class="agenda_breadcrumb_link only_label"
                    v-else-if="pathItem.label">
                    <span>{{ pathItem.label }}</span>
                </span>
            </div>
        </div>
    </div>
</div>`,
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
Vue.component("LswAgendaConceptoAdd", {
  template: `<div class="LswAgendaConceptoAdd">
  <template>
    <lsw-schema-based-form
      :on-submit="insertConcepto"
      :model="{
        databaseId: 'lsw_default_database',
        tableId: 'Concepto',
        rowId: -1,
      }"
    />
  </template>
</div>`,
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
Vue.component("LswAgendaConceptoSearch", {
  template: `<div class="LswAgendaConceptoSearch">
  <lsw-table v-if="isLoaded"
    :initial-input="rows"></lsw-table>
</div>`,
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
Vue.component("LswAgendaEventoSearch", {
  template: `<div class="LswAgendaEventoSearch">
  LswAgendaEventoSearch
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda-evento-search.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-evento-search.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});

Vue.component("LswAgendaForm", {
  template: `<div>
    
</div>`,
  props: {
    formMetadata: {
      type: Object,
      required: true,
    }
  },
  data() {
    this.$trace("lsw-agenda-form.data");
    this.validateFormMetadata(this.formMetadata);
    return {
      expandedExplanations: [],
      formScope: {},
      formState: {}
    };
  },
  methods: {
    validateFormMetadata(v) {
      const isObject = typeof v === "object";
      const hasFormAsObject = typeof v.form === "object";
      const hasFieldsAsArray = Array.isArray(v.fields);
      if(!isObject) {
        throw new Error("Required parameter «formMetadata» to be an object on «LswAgendaForm.methods.validateFormMetadata»");
      }
      if(!hasFormAsObject) {
        throw new Error("Required parameter «formMetadata.form» to be an object on «LswAgendaForm.methods.validateFormMetadata»");
      }
      if(!hasFieldsAsArray) {
        throw new Error("Required parameter «formMetadata.fields» to be an array on «LswAgendaForm.methods.validateFormMetadata»");
      }
    },
    toggleExplanation(id) {
      const pos = this.expandedExplanations.indexOf(id);
      if(pos === -1) {
        this.expandedExplanations.push(id);
      } else {
        this.expandedExplanations.splice(pos, 1);
      }
    },
    loadFields() {
      this.$window.F = this.$refs.agenda_form;
    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-form.mounted");
      this.loadFields();
    } catch(error) {
      console.log(error);
    }
  }
});
Vue.component("LswAgendaImpresionAdd", {
  template: `<div class="LswAgendaImpresionAdd">
  LswAgendaImpresionAdd
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda-impresion-add.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-impresion-add.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});
Vue.component("LswAgendaImpresionSearch", {
  template: `<div class="LswAgendaImpresionSearch">
  LswAgendaImpresionSearch
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda-impresion-search.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-impresion-search.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});
Vue.component("LswAgendaInfraccionSearch", {
  template: `<div class="LswAgendaInfraccionSearch">
  LswAgendaInfraccionSearch
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda-infraccion-search.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-infraccion-search.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});
Vue.component("LswAgendaLimitadorAdd", {
  template: `<div class="LswAgendaLimitadorAdd">
  <template>
    <lsw-schema-based-form
      :on-submit="insertLimitador"
      :model="{
        databaseId: 'lsw_default_database',
        tableId: 'Limitador',
        rowId: -1,
      }"
    />
  </template>
</div>`,
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
Vue.component("LswAgendaLimitadorSearch", {
  template: `<div class="LswAgendaLimitadorSearch">
  <lsw-table v-if="isLoaded"
    :initial-input="rows"></lsw-table>
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda-limitador-search.data");
    return {
      isLoaded: false,
    };
  },
  methods: {
    async loadRows() {
      this.$trace("lsw-agenda-limitador-search.methods.loadRows");
      this.rows = await this.$lsw.database.selectMany("Limitador", it => true);
      this.isLoaded = true;
    }
  },
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-limitador-search.mounted");
      this.loadRows();
    } catch(error) {
      console.log(error);
    }
  }
});
Vue.component("LswAgendaLimitadorViewer", {
  template: `<div class="LswAgendaLimitadorViewer">
    <div v-if="isLoaded">
      <div class="infracciones_list" v-if="infracciones.length">
        <template v-for="infraccion, infraccionIndex in infracciones">
          <div class="infraccion_item" v-bind:key="'infraccion_' + infraccionIndex">
            <div class="infraccion_text">⚠️ <b style="text-decoration: underline;">Infracción {{ infraccionIndex + 1 }}.</b> {{ infraccion.message }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>`,
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
Vue.component("LswAgendaPostimpresionSearch", {
  template: `<div class="LswAgendaPostimpresionSearch">
  LswAgendaPostimpresionSearch
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda-postimpresion-search.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-postimpresion-search.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});
Vue.component("LswAgendaPropagacionSearch", {
  template: `<div class="LswAgendaPropagacionSearch">
  LswAgendaPropagacionSearch
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda-propagacion-search.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-propagacion-search.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});
Vue.component("LswAgendaPropagadorSearch", {
  template: `<div class="LswAgendaPropagadorSearch">
  LswAgendaPropagadorSearch
</div>`,
  props: {},
  data() {
    this.$trace("lsw-agenda-propagador-search.data");
    return {};
  },
  methods: {},
  watch: {},
  mounted() {
    try {
      this.$trace("lsw-agenda-propagador-search.mounted");
    } catch(error) {
      console.log(error);
    }
  }
});
});

