import fs from "node:fs/promises";

const DATABASE_PATH = new URL("db.json", import.meta.url);

export class Database {
  //uso do '#' torna a prop ou method privado
  #database = {};

  constructor() {
    fs.readFile(DATABASE_PATH, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.persist();
      });
  }

  #persist() {
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database));
  }

  insert(table, data) {
    //verifica se é um Array e se dentro da coleção existe uma tabela
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      //caso exista, insere um novo dado na tabela
      this.#database[table] = [data];
    }
    this.#persist();
  }

  select(table) {
    return this.#database[table] ?? [];
  }
}

/**
  {
     "table": [{},{},{}]
  }
 */
