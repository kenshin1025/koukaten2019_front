import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    select_units: {},
    looking_timetable: { grade: 1, semester: '前期' },
    registered_lectures: [],
    can_register_lectures: [],
    unit_list: {
      1: {
        必修: {
          共通: 0,
          専門: 0,
          総合A: 0,
          総合B: 0
        },
        選択: {
          共通: 0,
          専門: 0,
          総合A: 0,
          総合B: 0
        }
      },
      2: {
        必修: {
          共通: 0,
          専門: 0,
          総合A: 0,
          総合B: 0
        },
        選択: {
          共通: 0,
          専門: 0,
          総合A: 0,
          総合B: 0
        }
      },
      3: {
        必修: {
          共通: 0,
          専門: 0,
          総合A: 0,
          総合B: 0
        },
        選択: {
          共通: 0,
          専門: 0,
          総合A: 0,
          総合B: 0
        }
      },
      4: {
        必修: {
          共通: 0,
          専門: 0,
          総合A: 0,
          総合B: 0
        },
        選択: {
          共通: 0,
          専門: 0,
          総合A: 0,
          総合B: 0
        }
      },
      unit: {
        e: {
          advancement_unit: {
            grade_1: 20,
            grade_2: 50,
            grade_3: 91
          },
          detail_graduate_unit: {
            必修: {
              共通: 4,
              専門: 46,
              総合A: 4
            },
            選択: {
              共通: 6,
              専門: 48,
              総合A: 4
            }
          }
        },
        v: {
          advancement_unit: {
            grade_1: 20,
            grade_2: 50,
            grade_3: 91
          },
          detail_graduate_unit: {
            必修: {
              共通: 4,
              専門: 46,
              総合A: 4
            },
            選択: {
              共通: 6,
              専門: 48,
              総合A: 4
            }
          }
        },
        c: {
          advancement_unit: {
            grade_1: 10,
            grade_2: 51,
            grade_3: 99
          },
          detail_graduate_unit: {
            必修: {
              共通: 3,
              専門: 41,
              総合A: 4
            },
            選択: {
              共通: 7,
              専門: 53,
              総合A: 4
            }
          }
        },
        b: {
          advancement_unit: {
            grade_1: 10,
            grade_2: 51,
            grade_3: 99
          },
          detail_graduate_unit: {
            必修: {
              共通: 3,
              専門: 45,
              総合A: 4
            },
            選択: {
              共通: 7,
              専門: 49,
              総合A: 4
            }
          }
        },
        m: {
          advancement_unit: {
            grade_1: 20,
            grade_2: 52,
            grade_3: 100
          },
          detail_graduate_unit: {
            必修: {
              共通: 0,
              専門: 57,
              総合A: 4
            },
            選択: {
              共通: 10,
              専門: 48,
              総合A: 4
            }
          }
        },
        p: {
          advancement_unit: {
            grade_1: 20,
            grade_2: 52,
            grade_3: 100
          },
          detail_graduate_unit: {
            必修: {
              共通: 0,
              専門: 57,
              総合A: 4
            },
            選択: {
              共通: 10,
              専門: 37,
              総合A: 4
            }
          }
        },
        d: {
          advancement_unit: {
            grade_1: 20,
            grade_2: 56,
            grade_3: 102
          },
          detail_graduate_unit: {
            必修: {
              共通: 4,
              専門: 62,
              総合A: 4
            },
            選択: {
              共通: 6,
              専門: 32,
              総合A: 4
            }
          }
        },
        s: {
          advancement_unit: {
            grade_1: 20,
            grade_2: 56,
            grade_3: 102
          },
          detail_graduate_unit: {
            必修: {
              共通: 4,
              専門: 62,
              総合A: 4
            },
            選択: {
              共通: 6,
              専門: 32,
              総合A: 4
            }
          }
        },
        a: {
          advancement_unit: {
            grade_1: 20,
            grade_2: 51,
            grade_3: 94
          },
          detail_graduate_unit: {
            必修: {
              共通: 1,
              専門: 60,
              総合A: 4
            },
            選択: {
              共通: 9,
              専門: 34,
              総合A: 4
            }
          }
        },
        l: {
          advancement_unit: {
            grade_1: 24,
            grade_2: 48,
            grade_3: 96
          },
          detail_graduate_unit: {
            必修: {
              共通: 4,
              専門: 46,
              総合A: 4
            },
            選択: {
              共通: 6,
              専門: 48,
              総合A: 4
            }
          }
        },
        t: {
          advancement_unit: {
            grade_1: 24,
            grade_2: 48,
            grade_3: 96
          },
          detail_graduate_unit: {
            必修: {
              共通: 4,
              専門: 46,
              総合A: 4
            },
            選択: {
              共通: 6,
              専門: 48,
              総合A: 4
            }
          }
        },
        h: {
          advancement_unit: {
            grade_1: 24,
            grade_2: 48,
            grade_3: 96
          },
          detail_graduate_unit: {
            必修: {
              共通: 4,
              専門: 46,
              総合A: 4
            },
            選択: {
              共通: 6,
              専門: 48,
              総合A: 4
            }
          }
        },
        x: {
          advancement_unit: {
            grade_1: 24,
            grade_2: 48,
            grade_3: 96
          },
          detail_graduate_unit: {
            必修: {
              共通: 4,
              専門: 46,
              総合A: 4
            },
            選択: {
              共通: 6,
              専門: 48,
              総合A: 4
            }
          }
        },
        k: {
          advancement_unit: {
            grade_1: 24,
            grade_2: 48,
            grade_3: 96
          },
          detail_graduate_unit: {
            必修: {
              共通: 6,
              専門: 46,
              総合A: 4
            },
            選択: {
              共通: 4,
              専門: 48,
              総合A: 4
            }
          }
        }
      }
    },
    english_unit_list: {
      1: {
        必修: 0,
        選択: 0
      },
      2: {
        必修: 0,
        選択: 0
      },
      3: {
        必修: 0,
        選択: 0
      },
      4: {
        必修: 0,
        選択: 0
      }
    },
    is_enough_unit_graduate: false,
    is_over_unit: true,
    is_under_unit_kyotu: false,
    is_under_unit_senmon: false,
    is_under_unit_A: false,
    is_under_unit_B: false,
    is_under_unit_english: false,
    user: {
      logined: false,
      id: '',
      grade: 0,
      major: '',
      token: ''
    }
  },
  mutations: {
    // get_editor(student) {
    //     return axios.get(process.env.VUE_APP_URL_EDITOR, {
    //         params: {
    //             // ここにクエリパラメータを指定する
    //             student: student,
    //         },
    //     })
    //         .then((res) => {
    //             Vue.set(this, 'timetable_editor', res.data);
    //         });
    // },
    get_unit(state, id) {

    },
    set_is_enough_unit_graduate(state, bool) {
      Vue.set(state, 'is_enough_unit_graduate', bool);
    },
    set_is_over_unit(state, bool) {
      Vue.set(state, 'is_over_unit', bool);
    },
    set_is_under_unit_kyotu(state, bool) {
      Vue.set(state, 'is_under_unit_kyotu', bool);
    },
    set_is_under_unit_senmon(state, bool) {
      Vue.set(state, 'is_under_unit_senmon', bool);
    },
    set_is_under_unit_A(state, bool) {
      Vue.set(state, 'is_under_unit_A', bool);
    },
    set_is_under_unit_B(state, bool) {
      Vue.set(state, 'is_under_unit_B', bool);
    },
    set_is_under_unit_english(state, bool) {
      Vue.set(state, 'is_under_unit_english', bool);
    },
    save(state) {
      localStorage.setItem('logined', state.user.logined);
      localStorage.setItem('id', state.user.id);
      localStorage.setItem('grade', state.user.grade);
      localStorage.setItem('major', state.user.major);
      localStorage.setItem('token', state.user.token);
    },
    load(state) {
      Vue.set(state.user, 'logined', localStorage.getItem('logined'));
      Vue.set(state.user, 'id', localStorage.getItem('id'));
      Vue.set(state.user, 'grade', localStorage.getItem('grade'));
      Vue.set(state.user, 'major', localStorage.getItem('major'));
      Vue.set(state.user, 'token', localStorage.getItem('token'));
    },
    //ユーザー関係
    set_user(state, data) {
      Vue.set(state.user, 'id', data.students_id);
      Vue.set(state.user, 'token', data.token);
      Vue.set(state.user, 'grade', data.grade);
      Vue.set(state.user, 'major', data.students_id.slice(0, 1));
      Vue.set(state.user, 'logined', true);
    },
    //時間割関係
    set_registered_lecture(state, lectures) {
      Vue.set(state, 'registered_lectures', lectures);
      lectures.forEach(function (lecture) {
        if (lecture.continuous > 1) {
          for (let i = 1; i < lecture.continuous; i++) {
            let sublecture;
            sublecture = Vue.util.extend({}, lecture);
            sublecture.lec_time += 1;
            sublecture.unit = 0;
            state.registered_lectures.push(sublecture);
          }
        }
      });
    },
    set_can_register_lectures(state, data) {
      Vue.set(state, 'can_register_lectures', data);
    },
    push_registered_lecture(state, lecture) {
      let index = state.registered_lectures.findIndex(
        registered_lecture =>
          registered_lecture.grade == lecture.grade &&
          registered_lecture.semester == lecture.semester &&
          registered_lecture.weekday == lecture.weekday &&
          registered_lecture.lec_time == lecture.lec_time
      );
      if (index >= 0) {
        state.registered_lectures.splice(index, state.registered_lectures[index].continuous);
      }
      state.registered_lectures.push(lecture);
      if (lecture.continuous == 2) {
        let sublecture;
        sublecture = Vue.util.extend({}, lecture);
        sublecture.lec_time += 1;
        sublecture.unit = 0;
        let index = state.registered_lectures.findIndex(
          registered_lecture =>
            registered_lecture.grade == sublecture.grade &&
            registered_lecture.semester == sublecture.semester &&
            registered_lecture.weekday == sublecture.weekday &&
            registered_lecture.lec_time == sublecture.lec_time
        );
        if (index >= 0) {
          state.registered_lectures.splice(index, state.registered_lectures[index].continuous);
        }
        state.registered_lectures.push(sublecture);
      }
    },
    set_looking_timetable(state, timetable) {
      Vue.set(state, 'looking_timetable', timetable);
    },
    delete_registered_lecture(state, codes) {
      let index = state.registered_lectures.findIndex(
        lecture => lecture.subject_code == codes.subject_code && lecture.class_code == codes.class_code
      );
      if (index >= 0) {
        state.registered_lectures.splice(index, codes.continuous);
      }
    },
    logout(state) {
      Vue.set(state.user, 'logined', false);
      Vue.set(state.user, 'id', '');
      Vue.set(state.user, 'grade', 0);
      Vue.set(state.user, 'major', '');
      Vue.set(state.user, 'taken', '');
      localStorage.removeItem('logined');
      localStorage.removeItem('id');
      localStorage.removeItem('grade');
      localStorage.removeItem('major');
      localStorage.removeItem('taken');
    },
    //単位関係
    unit_calculate(state) {
      let unit_list = {
        1: {
          必修: {
            共通: 0,
            専門: 0,
            総合A: 0,
            総合B: 0
          },
          選択: {
            共通: 0,
            専門: 0,
            総合A: 0,
            総合B: 0
          }
        },
        2: {
          必修: {
            共通: 0,
            専門: 0,
            総合A: 0,
            総合B: 0
          },
          選択: {
            共通: 0,
            専門: 0,
            総合A: 0,
            総合B: 0
          }
        },
        3: {
          必修: {
            共通: 0,
            専門: 0,
            総合A: 0,
            総合B: 0
          },
          選択: {
            共通: 0,
            専門: 0,
            総合A: 0,
            総合B: 0
          }
        },
        4: {
          必修: {
            共通: 0,
            専門: 0,
            総合A: 0,
            総合B: 0
          },
          選択: {
            共通: 0,
            専門: 0,
            総合A: 0,
            総合B: 0
          }
        }
      };
      let english_unit_list = {
        1: {
          必修: 0,
          選択: 0
        },
        2: {
          必修: 0,
          選択: 0
        },
        3: {
          必修: 0,
          選択: 0
        },
        4: {
          必修: 0,
          選択: 0
        }
      };
      state.registered_lectures.forEach(function (lecture) {
        unit_list[lecture.grade][lecture.compulsory][lecture.classification] += lecture.unit;
        if (lecture.isenglish) {
          english_unit_list[lecture.grade][lecture.compulsory] += lecture.unit;
        }
      });

      Vue.set(state, 'unit_list', unit_list);
      Vue.set(state, 'english_unit_list', english_unit_list);
    }
  },
  actions: {
    post_new_user(context, user) {
      axios
        .post(process.env.VUE_APP_URL_USERS, {
          students_id: user.id,
          grade: user.grade,
          password: user.password
        })
        .then(res => {
          // console.log(res.data);
          if (res.data) {
            context.commit('set_user', res.data);
            // trueかfalseを判断する
          }
        });
    },
    login(context, user_entry) {
      axios
        .post(process.env.VUE_APP_URL_SIGN_IN_USERS, {
          students_id: user_entry.ID,
          password: user_entry.password
        })
        .then(res => {
          context.commit('set_user', res.data);
        });
    },
    get_registered_lectures(context, user_id) {
      axios
        .get(process.env.VUE_APP_URL_TIMETABLE, {
          params: {
            student: user_id
          },
          headers: {
            Authorization: `Bearer ${this.state.user.token}`
          }
        })
        .then(res => {
          context.commit('set_registered_lecture', res.data);
        });
    },
    get_can_register_lectures(context, user_id) {
      axios
        .get(process.env.VUE_APP_URL_EDITOR, {
          params: {
            // ここにクエリパラメータを指定する
            student: user_id
          },
          headers: {
            Authorization: `Bearer ${this.state.user.token}`
          }
        })
        .then(res => {
          context.commit('set_can_register_lectures', res.data);
          if (this.state.registered_lectures.length <= 0) {
            this.state.can_register_lectures.forEach(function (lectuer) {
              if (lectuer.compulsory == '必修') {
                context.commit('push_registered_lecture', lectuer);
              }
            });
          }
        });
    },
    doSave({ commit }) {
      commit('save');
    },
    doLoad({ commit }) {
      commit('load');
    }
  }
});
