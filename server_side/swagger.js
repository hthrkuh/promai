const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./app/routes/authRoutes.js", "./app/routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles);
