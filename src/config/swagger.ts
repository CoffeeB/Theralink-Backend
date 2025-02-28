import swaggerJsdoc from "swagger-jsdoc";
import path from 'path'
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Theralink API Documentation",
      version: "1.0.0",
      description: "API documentation for Theralink Healthcare Platform",
    },
    servers: [
      {
        url: "https://theralink-backend.onrender.com",
        description: "Production server",
      },
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        SendMessageEvent: {
          type: "object",
          properties: {
            toUserId: {
              type: "string",
              description: "Recipient user ID",
            },
            body: {
              type: "string",
              description: "Message content",
            },
            subject: {
              type: "string",
              description: "Message subject",
            },
          },
        },
        ReceiveMessageEvent: {
          type: "object",
          properties: {
            fromUserId: {
              type: "string",
              description: "Sender user ID",
            },
            body: {
              type: "string",
              description: "Message content",
            },
            subject: {
              type: "string",
              description: "Message subject",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", path.resolve(__dirname, "../docs/socketDoc.yml")],
};
export const specs = swaggerJsdoc(options);
