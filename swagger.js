import swaggerAutogen from 'swagger-autogen';

const swaggerAutogenInstance = swaggerAutogen({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'My API',
    description: 'Automatically generated swagger docs',
  },
  host: 'recruitmentapp.webndroid.in',
  schemes: ['https'],
  // You can add default responses, security etc. here if you want
};

const outputFile = './swagger-output.json'; // generated swagger file
const endpointsFiles = ['./server.js']; // your main route file(s)

swaggerAutogenInstance(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger file generated successfully.');
  // Optionally, you can start your server here after generating swagger
});
