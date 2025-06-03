FROM node:22.16-alpine
WORKDIR /app

RUN npm install -g serve

COPY dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-p", "5173"]