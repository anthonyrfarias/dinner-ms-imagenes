FROM node:12
RUN mkdir -p /home/anthony/proyectos/dinner/backend/ms-imagenes/
WORKDIR /home/anthony/proyectos/dinner/backend/ms-imagenes/

COPY ./package.json /home/anthony/proyectos/dinner/backend/ms-imagenes/
RUN npm install

RUN mkdir -p /home/anthony/proyectos/dinner/backend/ms-imagenes/src
COPY ./src /home/anthony/proyectos/dinner/backend/ms-imagenes/src
EXPOSE 6063
#CMD [ "node", "app.js" ]
CMD [ "npm", "start" ]