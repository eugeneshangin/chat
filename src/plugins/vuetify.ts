import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import ru from 'vuetify/es5/locale/ru';

Vue.use(Vuetify);

/**
 * Настройки vuetify
 */
export default new Vuetify({
  theme: {
    dark: false,
    options: {
      minifyTheme: (css) => (process.env.NODE_ENV === 'production'
        ? css.replace(/[\r\n|\r|\n]/g, '') : css),
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
