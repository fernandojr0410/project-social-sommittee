import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    light: true,
    themes: {
      light: {
        primary: '#000', // Azul escuro para representar confiabilidade e seriedade
        secondary: '#005580', // Azul médio para representar estabilidade e tranquilidade
        accent: '#10B981', // Laranja para representar entusiasmo e inovação
        error: '#cc0000', // Vermelho para representar alerta e atenção
        info: '#006699', // Azul claro para representar confiabilidade e estabilidade
        success: '#009933', // Verde para representar prosperidade e crescimento
        warning: '#FFCC33', // Amarelo para representar precaução e atenção
        grayPrimary: '#F5F5F5', // Cinza claro
        graySecondary: '#A0A0A0',
      },
      dark: {
        primary: '#0d47a1', // Azul escuro para representar confiabilidade e seriedade
        secondary: '#1e88e5', // Azul médio para representar estabilidade e tranquilidade
        accent: '#ff6f00', // Laranja para representar entusiasmo e inovação
        error: '#ef5350', // Vermelho para representar alerta e atenção
        info: '#42a5f5', // Azul claro para representar confiabilidade e estabilidade
        success: '#4caf50', // Verde para representar prosperidade e crescimento
        warning: '#ffd54f', // Amarelo para representar precaução e atenção
      },
    },
  },
})
