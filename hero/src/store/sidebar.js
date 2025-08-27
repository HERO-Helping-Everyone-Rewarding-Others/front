import { reactive } from "vue";

export const sidebar = reactive({
  aberto: false,
  toggleSidebar() {
    this.aberto = !this.aberto;
  },
  fecharSidebar() {
    this.aberto = false;
  }
});
