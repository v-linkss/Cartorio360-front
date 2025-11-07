import { defineStore } from "pinia";

export const useCartoriosStore = defineStore('useCartoriosStore',{
    state : () => {
        return {
           cartorioInfos: []
        }
    },
}) 