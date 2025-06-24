<template>
  <div class="container">
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Selecione um arquivo</h1>

      <!-- Upload -->
      <div class="mb-8 flex flex-col items-start gap-2">
        <input
          ref="fileInput"
          type="file"
          class="hidden"
          @change="handleFileUpload"
          accept=".txt,.json,.md,.js,.html,.css,.xml,.csv"
        />

        <button
          type="button"
          class="btn-primary"
          @click="triggerFileUpload"
        >
          Escolher Arquivo
        </button>

        <div v-if="fileName" class="text-sm text-gray-600">
          <span class="font-medium">Arquivo carregado:</span> {{ fileName }}
        </div>
      </div>

      <!-- Conteúdo -->
      <div class="mb-6 w-full">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Conteúdo do arquivo
        </label>
        <textarea
          v-model="fileContent"
          class="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          placeholder="O conteúdo do arquivo aparecerá aqui..."
          :readonly="isReadOnly"
        ></textarea>
      </div>

      <!-- Ações -->
      <div class="flex gap-4">
        <button
          @click="saveFile"
          :disabled="!uploadedFile"
          class="btn-primary"
        >
          Salvar
        </button>
        <button
          @click="clearContent"
          :disabled="!fileContent"
          class="btn-secondary"
        >
          Limpar
        </button>
      </div>

      <!-- Status -->
      <div v-if="statusMessage" class="mt-4 p-3 rounded-md" :class="statusClass">
        {{ statusMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fileContent = ref('')
const fileName = ref('')
const uploadedFile = ref(null)
const statusMessage = ref('')
const statusClass = ref('')
const isReadOnly = ref(false)
const config = useRuntimeConfig();

const fileInput = ref(null)
const migracao_dados = `${config.public.managemant}/migracao_dados`
const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  fileName.value = file.name
  uploadedFile.value = file

  const reader = new FileReader()
  reader.onload = (e) => {
    fileContent.value = e.target.result
    showStatus('Arquivo carregado com sucesso!', 'success')
  }
  reader.onerror = () => {
    showStatus('Erro ao carregar o arquivo.', 'error')
  }
  reader.readAsText(file)
}

const saveFile = async () => {
  if (!uploadedFile.value) {
    showStatus('Nenhum arquivo selecionado para envio.', 'error')
    return
  }

  const formData = new FormData()
  formData.append('file', uploadedFile.value)

  try {
    const response = await fetch(migracao_dados, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`)

    showStatus('Arquivo enviado com sucesso!', 'success')
  } catch (err) {
    console.error(err)
    showStatus('Falha ao enviar o arquivo.', 'error')
  }
}

const clearContent = () => {
  fileContent.value = ''
  fileName.value = ''
  uploadedFile.value = null
  statusMessage.value = ''
  if (fileInput.value) fileInput.value.value = ''
  showStatus('Conteúdo limpo.', 'info')
}

const showStatus = (message, type) => {
  statusMessage.value = message
  switch (type) {
    case 'success':
      statusClass.value = 'status status-success'
      break
    case 'error':
      statusClass.value = 'status status-error'
      break
    case 'info':
      statusClass.value = 'status status-info'
      break
    default:
      statusClass.value = 'status'
  }

  setTimeout(() => {
    statusMessage.value = ''
  }, 3000)
}

useHead({
  title: 'Upload de Arquivo',
  meta: [
    { name: 'description', content: 'Ferramenta para enviar arquivos via FormData' }
  ]
})
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  padding: 2rem;
}

.bg-white {
  background-color: white;
  width: 100%;
  max-width: 800px;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 0 0 1px #e5e7eb;
}

h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #111827;
}

textarea {
  width: 100%;
  height: 300px;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-family: monospace;
  font-size: 0.875rem;
  color: #111827;
  background-color: #f9fafb;
  resize: vertical;
}

button {
  padding: 0.5rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: background-color 0.2s, transform 0.1s;
}
button:active {
  transform: scale(0.98);
}
button:disabled {
  background-color: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}
.btn-primary:hover {
  background-color: #2563eb;
}

.btn-secondary {
  background-color: #6b7280;
  color: white;
}
.btn-secondary:hover {
  background-color: #4b5563;
}

.status {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}
.status-success {
  background-color: #ecfdf5;
  color: #065f46;
}
.status-error {
  background-color: #fef2f2;
  color: #991b1b;
}
.status-info {
  background-color: #eff6ff;
  color: #1e3a8a;
}

@media (max-width: 640px) {
  .bg-white {
    padding: 1rem;
  }

  textarea {
    height: 200px;
  }

  button {
    width: 100%;
  }

  .flex.gap-4 {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
