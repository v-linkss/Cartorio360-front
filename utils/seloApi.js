

// export async function useGetSelosTipos(options = {}){
//     const { data, error } = await useApi('tipo-selos', {method:'GET', ...options})
//     console.log(data, error)
//     if (error.value) {
//         console.error('Erro ao buscar selos:', error.value);
//         return null;
//       }
//       return data.value;
// } 

// export async function useGetSeloTipoById(id, options = {}) {
//     const {data, error } = await  useApi(`tipo-selos/${id}`, {method: 'GET', ...options})

//     if (error.value) {
//         console.error('Erro ao buscar selo:', error.value);
//         return null;
//       }
//       return data.value;
// }

// export async function useCreateSeloTipo(options = {}) {
//     const {data, error } = await  useApi('tipo-selos', {method: 'POST', ...options})

//     if (error.value) {
//         console.error('Erro ao criar selo:', error.value);
//         return null;
//       }
//       return data.value;
// }

// export async function useUpdateSeloTipo(id, options = {}) {
//     const {data, error } = await  useApi(`tipo-selos/${id}`, {method: 'PUT', ...options})

//     if (error.value) {
//         console.error('Erro ao atualizar selo:', error.value);
//         return null;
//       }
//       return data.value;
// }

// export async function useDeleteSelotTipo(id, options = {}) {
//     const {data, error } = await  useApi(`tipo-selos/${id}`, {method: 'DELETE', ...options})

//     if (error.value) {
//         console.error('Erro ao :', error.value);
//         return null;
//       }
//       return data.value;
// }
