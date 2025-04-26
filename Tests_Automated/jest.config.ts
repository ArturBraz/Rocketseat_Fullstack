import type { Config } from "jest";

const config: Config = {
  bail: true, //interrompe a execução dos testes se houver uma falha
  preset: "ts-jest",
  testEnvironment: "node", //define que o ambiente que o Jest usará
};

export default config;
