<template>
    <v-dialog persistent v-model="isVisible" max-width="650">
        <v-card>
            <v-container>
                <v-row class="mb-5 mt-1 ml-2">
                    <h1>Cancelamento de Ato</h1>
                    <h1 style="color: red; margin-left: 18px">
                    </h1>
                </v-row>
                <v-container>
                    <v-card variant="outlined" class="mb-5">
                        <v-card-text>
                            {{ analiseCancela }}
                        </v-card-text>
                    </v-card>
                    <v-textarea label="Motivo" v-model="state.motivo" required
                        :error-messages="v$.motivo.$errors.map((e) => e.$message)" @blur="v$.motivo.$touch"
                        @input="v$.motivo.$touch"></v-textarea>
                </v-container>
            </v-container>

            <div class="mb-5" style="display: flex; justify-content: flex-start">
                <div class="ml-6">
                    <v-btn size="large" color="red" @click="closeModal">Fechar</v-btn>
                </div>
                <div class="ml-6">
                    <v-btn size="large" color="green" :disabled="!state.motivo || state.motivo.trim() === ''"
                        @click="cancelaAto">
                        Salvar
                    </v-btn>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";

const props = defineProps({
    show: Boolean,
    ato_token: String,
});

const isVisible = ref(props.show);
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const usuario_token = ref(useCookie("auth_token").value);
const cancelaLavratura = `${config.public.managemant}/cancela_lavratura`;

const state = reactive({
    motivo: null,
});

// const analiseCancela = ref(null)
const analiseCancela = "O cancelamento de atos é definitivo e não pode ser revertido. Informe o motivo do cancelamento para confirmar"
const emit = defineEmits(["close"]);

const rules = {
    motivo: {
        required: helpers.withMessage("O campo é obrigatorio", required),
    },
};

const v$ = useVuelidate(rules, state);

watch(
    () => props.show,
    (newVal) => {
        isVisible.value = newVal;
    }
);
const closeModal = () => {
    isVisible.value = false;
    emit("close");
};

const cancelaAto = async () => {
    if (await v$.value.$validate()) {
        try {
            const { data, status } = await useFetch(cancelaLavratura, {
                method: "POST",
                body: {
                    ato_token: props.ato_token,
                    user_token: usuario_token.value,
                    cancelar_selo: false,
                    motivo_cancelamento: state.motivo
                },
            });

            if (status.value === "success" && Array.isArray(data.value) && data.value[0]?.status === "OK") {
                $toast.success("Ato cancelado com sucesso!");
                closeModal();
            } else if (Array.isArray(data.value) && data.value[0]?.status === "ERRO") {
                $toast.error(data.value[0].status_mensagem || "Erro ao cancelar ato");
            } else {
                $toast.error("Erro inesperado ao cancelar ato");
            }
        } catch (error) {
            console.error("Erro ao cancelar ato:", error);
            $toast.error("Erro ao cancelar ato");
        }
    }
};

</script>