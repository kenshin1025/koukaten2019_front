<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-alert type="warning" v-if="show_alert">学席番号かパスワードが間違っています</v-alert>
            <v-card class="elevation-12">
              <v-toolbar color="#78BBE6">
                <v-toolbar-title class="white--text">ログイン</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    style="width: 80%; margin:5% auto"
                    v-model="ID"
                    :counter="6"
                    :rules="id_rules"
                    label="学籍番号(例 k19000)"
                    required
                  ></v-text-field>

                  <v-text-field
                    style="width: 80%; margin:5% auto"
                    v-model="password"
                    :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show_pass ? 'text' : 'password'"
                    :rules="pass_rules"
                    label="パスワード"
                    hint="半角アルファベットで8文字以上、小文字大文字数字をそれぞれ1文字以上含む"
                    counter
                    @click:append="show_pass = !show_pass"
                  ></v-text-field>

                  <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">ログインする</v-btn>
                  <div v-if="Screen_transition($store.state.user.logined)"></div>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'LoginForm',
  data: () => ({
    show_alert: false,
    valid: true,
    ID: '',
    password: '',
    show_pass: false,
    id_rules: [
      v => !!v || '必ず入力してください',
      v => {
        const pattern = /^[evcbmpdsalthkx][0-9]{5}$/;
        return pattern.test(v) || '学籍番号のフォーマットが違います';
      }
    ],
    pass_rules: [
      v => !!v || '必ず入力してください',
      v => (v && v.length >= 8 && v.length <= 72) || '８文字以上７２文字以内で入力してください',
      v => {
        const pattern = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,72}$/;
        return pattern.test(v) || '半角英小文字大文字数字をそれぞれ1文字以上含んでください';
      }
    ]
  }),

  methods: {
    login() {
      this.$store.dispatch('login', { ID: this.ID, password: this.password });
      if (this.$store.state.user.logined == false) {
        setTimeout(this.enable, 1500);
      }
    },
    enable: function() {
      this.show_alert = true;
    },
    save: function() {
      this.$store.dispatch('doSave');
    },
    Screen_transition(h) {
      // console.log(h);
      if (h) {
        this.$router.push('ClassSchedule');
        this.save();
        return true;
      }
    }
  }
};
</script>

<style scoped></style>
