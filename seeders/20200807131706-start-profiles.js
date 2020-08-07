"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Profiles", [
      {
        name: "Leanne Graham",
        email: "Sincere@april.biz",
        address: "Address",
        image_url: "https://robohash.org/1?set=any",
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        description:
          "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ervin Howell",
        email: "Shanna@melissa.tv",
        address: "Address",
        image_url: "https://robohash.org/12?set=any",
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
        description:
          "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Clementine Bauch",
        email: "Nathan@yesenia.net",
        address: "Address",
        image_url: "https://robohash.org/13?set=any",
        phone: "1-463-123-4447",
        website: "ramiro.info",
        description:
          "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Patricia Lebsack",
        email: "Julianne.OConner@kory.org",
        address: "Address",
        image_url: "https://robohash.org/14?set=any",
        phone: "493-170-9623 x156",
        website: "kale.biz",
        description:
          "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chelsey Dietrich",
        email: "Lucio_Hettinger@annie.ca",
        address: "Address",
        image_url: "https://robohash.org/15?set=any",
        phone: "(254)954-1289",
        website: "demarco.info",
        description:
          "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mrs. Dennis Schulist",
        email: "Karley_Dach@jasper.info",
        address: "Address",
        image_url: "https://robohash.org/16?set=any",
        phone: "1-477-935-8478 x6430",
        website: "ola.org",
        description:
          "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kurtis Weissnat",
        email: "Telly.Hoeger@billy.biz",
        address: "Address",
        image_url: "https://robohash.org/17?set=any",
        phone: "210.067.6132",
        website: "elvis.io",
        description:
          "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nicholas Runolfsdottir V",
        email: "Sherwood@rosamond.me",
        address: "Address",
        image_url: "https://robohash.org/18?set=any",
        phone: "586.493.6943 x140",
        website: "jacynthe.com",
        description:
          "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Glenna Reichert",
        email: "Chaim_McDermott@dana.io",
        address: "Address",
        image_url: "https://robohash.org/19?set=any",
        phone: "(775)976-6794 x41206",
        website: "conrad.com",
        description:
          "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Clementina DuBuque",
        email: "Rey.Padberg@karina.biz",
        address: "Address",
        image_url: "https://robohash.org/20?set=any",
        phone: "024-648-3804",
        website: "ambrose.net",
        description:
          "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Profiles", null, {});
  },
};
