<template>
  <div class="mx-4">
    <!--{{ $store.state.can_register_lectures }}-->
    <!-- {{ $store.state.registered_lectures }} -->
    <!--{{ $store.state.unit_list }}-->
    <!--{{ $store.state.user }}-->
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-text>計画が立てられたら「登録を保存」ボタンを押して保存してください</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-row justify="space-around">
            <v-checkbox color="success" v-model="compulsory" label="必修"></v-checkbox>
            <v-checkbox color="success" v-model="required_compulsory" label="選択必修"></v-checkbox>
            <v-checkbox color="success" v-model="choice" label="選択"></v-checkbox>
          </v-row>
          <v-row justify="space-around">
            <v-checkbox color="success" v-model="common" label="共通"></v-checkbox>
            <v-checkbox color="success" v-model="specialty" label="専門"></v-checkbox>
            <v-checkbox color="success" v-model="general_A" label="総合A"></v-checkbox>
            <v-checkbox color="success" v-model="general_A_en" label="総合A(英)"></v-checkbox>
            <v-checkbox color="success" v-model="general_B" label="総合B"></v-checkbox>
          </v-row>
          <v-tabs color="white" background-color="indigo" v-model="tabs" show-arrows grow>
            <v-tab
              v-for="timetable in $store.state.timetables"
              :key="timetable.id"
              v-on:click="$store.commit('set_looking_timetable', timetable)"
            >
              <b>{{ timetable.grade }}{{ timetable.semester }}</b>
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tabs">
            <v-tab-item v-for="timetable in timetables" :key="timetable.id">
              <TimeTableShow
                :is_edit="is_edit"
                :now_register="
                  get_grade_half_lectures($store.state.registered_lectures, timetable.grade, timetable.semester)
                "
                :can_register="
                  get_grade_half_sougouB_lectures(
                    $store.state.can_register_lectures,
                    timetable.grade,
                    timetable.semester,
                    common,
                    specialty,
                    general_A,
                    general_A_en,
                    general_B,
                    compulsory,
                    required_compulsory,
                    choice
                  )
                "
                :grade="timetable.grade"
              ></TimeTableShow>
            </v-tab-item>
          </v-tabs-items>
          <v-tabs v-model="tabs" show-arrows grow>
            <v-tab
              v-for="timetable in $store.state.timetables"
              :key="timetable.id"
              v-on:click="$store.commit('set_looking_timetable', timetable)"
            >
              <b>{{ timetable.grade }}{{ timetable.semester }}</b>
            </v-tab>
          </v-tabs>
        </v-col>
      </v-row>
    </v-container>

    <!--ダイアログ-->
    <v-dialog v-model="show_dialog" max-width="290">
      <v-card>
        <v-card-title>確認</v-card-title>

        <v-card-text>
          <template v-if="!this.$store.state.is_enough_unit_graduate"
            >卒業要件を満たしていません</template
          >
          <br />
          <template v-if="!this.$store.state.is_under_unit_kyotu"
            >共通の単位が足りていません</template
          >
          <br />
          <template v-if="!this.$store.state.is_under_unit_senmon"
            >専門の単位が足りていません</template
          >
          <br />
          <template v-if="!this.$store.state.is_under_unit_A"
            >総合Aの単位が足りていません</template
          >
          <br />
          <template v-if="!this.$store.state.is_under_unit_B"
            >総合Bの単位が足りていません</template
          >
          <br />
          <template v-if="!this.$store.state.is_under_unit_english"
            >総合A(英)の単位が足りていません</template
          >
          <br />
          <template v-if="!this.$store.state.is_over_unit"
            >1年間に取得できる単位数をオーバーしています</template
          >
          <br />
          <br />このまま登録しますか？
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="green darken-1" text @click="show_dialog = false">キャンセル</v-btn>

          <v-btn color="green darken-1" text @click="register_on_dialog()">登録する</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="warning_delete" max-width="290">
      <v-card>
        <v-card-title>確認</v-card-title>

        <v-card-text>全ての登録された授業を取り消します</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="green darken-1" text @click="warning_delete = false">キャンセル</v-btn>
          <v-btn color="green darken-1" text @click="delete_registered_lectures()">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--登録ボタン-->

    <v-bottom-navigation fixed>
      <v-btn value="save" v-on:click="save_lectuers">
        <span>保存</span>
        <v-icon>mdi-cloud-upload</v-icon>
      </v-btn>

      <v-btn value="delete" v-on:click="delete_lectuers">
        <span>削除</span>
        <v-icon>mdi-delete</v-icon>
      </v-btn>

      <v-btn value="unit" v-on:click="sheet = !sheet">
        <span>単位確認</span>
        <v-icon>mdi-numeric</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-bottom-sheet v-model="sheet">
      <v-sheet>
        <CreditCalculator></CreditCalculator>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

Vue.use(Vuex);

import TimeTableShow from '../components/ClassSchedule/TimeTableShow';
import CreditCalculator from '../components/ClassSchedule/CreditCalculator';

export default {
  data() {
    return {
      common: true,
      specialty: true,
      general_A: true,
      general_A_en: true,
      general_B: true,
      compulsory: true,
      required_compulsory: true,
      choice: true,
      show_dialog: false,
      warning_delete: false,
      tabs: null,
      user: 1,
      is_edit: true,
      looking_grade: 1,
      looking_semester: '前期',
      major: 'kk',
      grades: [1, 2, 3, 4],
      semesters: ['前期', '後期'],
      timetables: [
        { grade: 1, semester: '前期' },
        { grade: 1, semester: '後期' },
        { grade: 2, semester: '前期' },
        { grade: 2, semester: '後期' },
        { grade: 3, semester: '前期' },
        { grade: 3, semester: '後期' },
        { grade: 4, semester: '前期' },
        { grade: 4, semester: '後期' }
      ],
      timetable: [],
      sheet: false
    };
  },
  components: {
    TimeTableShow,
    CreditCalculator
  },
  created() {
    this.$store.dispatch('get_registered_lectures', this.$store.state.user.id);
    this.$store.dispatch('get_can_register_lectures', this.$store.state.user.id);
  },
  beforeUpdate() {
    this.$store.commit('unit_calculate');
  },
  methods: {
    mold_registered_lectures() {
      let data = [];
      let students_id = this.$store.state.user.id;
      this.$store.state.registered_lectures.forEach(lectures =>
        data.push({
          students_id: students_id,
          subject_code: lectures.subject_code,
          class_code: lectures.class_code,
          course_grade: lectures.grade,
          grade_point: 'Future'
        })
      );
      return data;
    },
    table() {
      return this.$store.state.registered_lectures;
    },
    get_grade_half_lectures(lectures, grade, semester) {
      let c = [];
      lectures.forEach(function(obj) {
        if (obj.grade === grade && obj.semester === semester) {
          c.push(obj);
        }
      });
      return c;
    },
    get_grade_half_sougouB_lectures(
      lectures,
      grade,
      semester,
      common,
      specialty,
      general_A,
      general_A_en,
      general_B,
      compulsory,
      required_compulsory,
      choice
    ) {
      let c = [];
      lectures.forEach(function(obj) {
        if (obj.semester === semester) {
          if (obj.grade === grade) {
            if (compulsory == true && obj.compulsory === '必修') {
              if (common == true && obj.classification === '共通') {
                c.push(obj);
              }
              if (specialty == true && obj.classification === '専門') {
                c.push(obj);
              }
              if (general_A == true && obj.classification === '総合A') {
                c.push(obj);
              }
              if (
                general_A_en == true &&
                obj.classification === '総合A' &&
                obj.isenglish == true &&
                general_A == false
              ) {
                c.push(obj);
              }
              if (general_B == true && obj.classification === '総合B') {
                c.push(obj);
              }
            }
            if (required_compulsory == true && obj.compulsory === '選択必修') {
              if (common == true && obj.classification === '共通') {
                c.push(obj);
              }
              if (specialty == true && obj.classification === '専門') {
                c.push(obj);
              }
              if (general_A == true && obj.classification === '総合A') {
                c.push(obj);
              }
              if (
                general_A_en == true &&
                obj.classification === '総合A' &&
                obj.isenglish == true &&
                general_A == false
              ) {
                c.push(obj);
              }
              if (general_B == true && obj.classification === '総合B') {
                c.push(obj);
              }
            }
            if (choice == true && obj.compulsory === '選択') {
              if (common == true && obj.classification === '共通') {
                c.push(obj);
              }
              if (specialty == true && obj.classification === '専門') {
                c.push(obj);
              }
              if (general_A == true && obj.classification === '総合A') {
                c.push(obj);
              }
              if (
                general_A_en == true &&
                obj.classification === '総合A' &&
                obj.isenglish == true &&
                general_A == false
              ) {
                c.push(obj);
              }
              if (general_B == true && obj.classification === '総合B') {
                c.push(obj);
              }
            }
          } else if (general_B == true && obj.classification === '総合B' && obj.grade <= grade && choice == true) {
            c.push(obj);
          }
        }
      });
      return c;
    },
    put_registered_lectures(data) {
      let d = { data: data };
      axios.put(process.env.VUE_APP_URL_EDITOR, d, {
        headers: {
          Authorization: `Bearer ${this.$store.state.user.token}`
        },
        data: {}
      });
    },
    save_lectuers() {
      if (!this.$store.state.is_enough_unit_graduate || !this.$store.state.is_over_unit) this.show_dialog = true;
      else {
        this.put_registered_lectures(this.mold_registered_lectures());
      }
    },
    delete_lectuers() {
      this.warning_delete = true;
    },
    delete_registered_lectures() {
      Vue.set(this.$store.state, 'registered_lectures', []);
      this.warning_delete = false;
    },
    register_on_dialog() {
      this.put_registered_lectures(this.mold_registered_lectures());
      this.show_dialog = false;
    }
  }
};
</script>
<style scoped></style>
