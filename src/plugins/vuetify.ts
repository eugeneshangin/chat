import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import ru from 'vuetify/es5/locale/ru';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: localStorage.vuetifyThemeDark !== 'false',
    options: {
      minifyTheme: (css) => (process.env.NODE_ENV === 'production'
        ? css.replace(/[\r\n|\r|\n]/g, '') : css),
    },
    themes: {
      dark: {
        primary: '#1c7ed6',
      },
    },
  },
  icons: {
    iconfont: 'md',
  },
  lang: {
    locales: { ru },
    current: 'ru',
  },
});
