import { exec } from "child_process";
import dotenv from "dotenv";
import readline from "readline";

// Carrega as variáveis do arquivo .env (se existir)
dotenv.config();

// Define variáveis de ambiente manualmente (como estava no package.json)
const envVars = {
  // DEV
  dev: {
    MS_AUTH_DESENV: "http://157.230.216.74:40176",
    MS_MANAGEMENT_DESENV: "http://157.230.216.74:14193",
    BIOMETRIA: "http://localhost:5000/apiservice",
    OBSERVER: "http://localhost:3500",
    LICENSE_KEY:
      "Ngo9BigBOggjHTQxAR8/V1NNaF5cXmBCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWXpec3VXRmhfVUx2WUFWYUA=",
    WEB_SERVICE: "http://localhost:3333",
    DEV_MODE: "true",
  },
  // PROD
  prod: {
    MS_AUTH: "https://www.cartorio360.com.br:40176",
    MS_MANAGEMENT: "https://www.cartorio360.com.br:14193",
    BIOMETRIA: "http://localhost:5000/apiservice",
    OBSERVER: "http://localhost:3500",
    LICENSE_KEY:
      "Ngo9BigBOggjHTQxAR8/V1NNaF5cXmBCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWXpec3VXRmhfVUx2WUFWYUA=",
    WEB_SERVICE: "http://localhost:3333",
    DEV_MODE: "false",
  },
};

// Descobre se é build:dev ou build:prod pela env NODE_ENV
const mode = process.env.BUILD_MODE || "dev"; // default = dev
const varsToUse = envVars[mode];

// Seta variáveis no process.env
for (const [key, value] of Object.entries(varsToUse)) {
  process.env[key] = value;
}

console.log(
  `Variáveis de ambiente (${mode.toUpperCase()}) enviadas para o build:`
);
Object.entries(varsToUse).forEach(([k, v]) => {
  console.log(`${k}: ${v}`);
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
      const buildProcess = exec("npx nuxi build", { env: process.env });

      buildProcess.stdout.on("data", (data) => {
        process.stdout.write(data);
      });

      buildProcess.stderr.on("data", (data) => {
        process.stderr.write(data);
      });

      buildProcess.on("close", (code) => {
        rl.close();
      });
    } else {
      console.log("Build cancelado.");
      rl.close();
    }
  }
);
