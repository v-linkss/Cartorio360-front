import { exec } from "child_process";
import readline from "readline";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const varsToCheck = ["MS_AUTH", "MS_MANAGEMENT"];

console.log(
  "Variáveis de ambiente enviadas para o build(Lembrar de olhar a aplicação depois de subir):"
);
varsToCheck.forEach((v) => {
  console.log(`${v}: ${process.env[v] || "não definida"}`);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Tem certeza que deseja continuar com o build? (s/n) ",
  (answer) => {
    if (answer.toLowerCase() === "s" || answer.toLowerCase() === "sim") {
      console.log("Iniciando build...");
      const buildProcess = exec("npx nuxi build");

      buildProcess.stdout.on("data", (data) => {
        process.stdout.write(data);
      });

      buildProcess.stderr.on("data", (data) => {
        process.stderr.write(data);
      });

      buildProcess.on("close", (code) => {
        console.log(`Build finalizado com código ${code}`);
        rl.close();
      });
    } else {
      console.log("Build cancelado.");
      rl.close();
    }
  }
);
