# #!/bin/bash

# echo "🕒 Iniciando limpeza de cache... ($(date))"

# echo "🧹 Limpando cache do npm e yarn..."
# npm cache clean --force
# yarn cache clean

# #!/bin/bash
# echo "Limpando cache do PM2 em $(date)" >> /home/ewerto/Documentos/Projetos/Cartorio360-front/limpeza.log
# pm2 flush
# pm2 restart all
# echo "Limpeza concluída em $(date)" >> /home/ewerto/Documentos/Projetos/Cartorio360-front/limpeza.log

# # echo "🔄 Reiniciando processos do PM2 um por um..."
# # for app in $(pm2 list --no-color | awk '{print $2}' | grep -E '^[0-9]+$'); do
# #     pm2 restart $app
# #     sleep 5  # Pequeno delay para evitar queda brusca
# # done

# echo "🚀 Liberando memória RAM de forma segura..."
# sync; echo 1 > /proc/sys/vm/drop_caches

# echo "✅ Limpeza concluída!"

#!/bin/bash

#!/bin/bash

#!/bin/bash

LOG_FILE="/home/ewerto/Documentos/Projetos/Cartorio360-front/limpeza.log"

echo "🕒 Iniciando limpeza de cache... ($(date))" | tee -a $LOG_FILE

# Captura o uso de memória antes da limpeza
echo "📊 Memória antes da limpeza:" | tee -a $LOG_FILE
free -h | tee -a $LOG_FILE
MEM_BEFORE=$(free -m | awk '/Mem:/ {print $3}') # Captura a memória usada em MB

echo "🧹 Limpando cache do npm, yarn e Node.js..." | tee -a $LOG_FILE
npm cache clean --force
yarn cache clean
rm -rf ~/.npm/_cache
rm -rf ~/.node-gyp
rm -rf ~/.pm2/node_modules

echo "🧹 Limpando cache do PM2..." | tee -a $LOG_FILE
pm2 flush
pm2 restart all

echo "🚀 Liberando memória RAM de forma segura..." | tee -a $LOG_FILE
sync; echo 1 > /proc/sys/vm/drop_caches

# Captura o uso de memória depois da limpeza
echo "📊 Memória depois da limpeza:" | tee -a $LOG_FILE
free -h | tee -a $LOG_FILE
MEM_AFTER=$(free -m | awk '/Mem:/ {print $3}') # Captura a memória usada em MB

# Calcula a memória liberada
MEM_FREED=$((MEM_BEFORE - MEM_AFTER))
echo "✅ Memória liberada: ${MEM_FREED}MB" | tee -a $LOG_FILE

echo "✅ Limpeza concluída!" | tee -a $LOG_FILE
